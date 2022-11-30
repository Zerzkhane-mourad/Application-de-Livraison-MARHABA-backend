const request = require('supertest')
const app = require('../index');

describe("  Login ",()=>{

    test("Email Not Found", async()=>{
        const res = await request(app).post('/signin').send({
            email:"cccc@gmail.com",
            password:"vvvvvvvvvvvv"

        })

        expect(res.statusCode).toBe(400);
    })

    test("Password Not Found", async()=>{
        const res = await request(app).post('/signin').send({
            email:"mouradzerzkhane2000@gmail.com",
            password:"123456789"
        })

        expect(res.statusCode).toBe(400);
    })

    

    test("login success", async()=>{
        const res = await request(app).post('/signin').send({

            email: "mouradzerzkhane2000@gmail.com",
            password: "123456789"

        })

        expect(res.statusCode).toBe(200)
    })
    

})    


