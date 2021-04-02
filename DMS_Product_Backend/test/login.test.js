const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var db = require('../configuration/dbconfig')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(require('../model/AdminModel'));


describe('login test', function() {
    it('should get token', function(done) {
        request(app).send({
            firstname:'Subharaj',
            lastname:'Chaudhary',
            dob:'1997-05-05',
            gender:'male',
            email:'subharazzchy68@gmail.com',
            password:'123456789',
            confirm_password:'123456789'
        }).then(response => {
            

            request(app).send({
                email: 'subharaj@gmail.com',
                password: '123456789'
            }).then(response => {
                expect(response.body).toHaveProperty('token');
                expect(response.statusCode).toBe(200);
                done()
            })

        })
    })
})