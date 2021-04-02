const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var db = require('../configuration/dbconfig')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(require('../routes/user'));


describe('user test', function() {
    it('should register', function(done) {
        request(app)
        .send({
            firstname:'Yuvraj',
            lastname:'Chaudhary',
            dob:'2007-07-27',
            gender:'male',
            email:'yuvrazzchy71@gmail.com',
            password:'123456789',
            confirm_password:'123456789'
        }).then(response => {
            request(app).post('/api/user/login')
            .send({
                email: 'yuvrazzchy71@gmail.com',
                password: '123456789' 
            }).then(res => {
                const token = res.body.token;
                request(app)
                .post('/api/user/'+ response.body._id +'/delete')
                .set('Authorization', 'Bearer '+token)
                .then(res => {
                    expect(response.statusCode).toBe(200);
                    done();
                })

            });
        })
    })
})
