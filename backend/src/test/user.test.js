const {app, startServers, stopServers} = require("../index");
const request = require("supertest");
const {connection, disconnect} = require("mongoose");
const jwt = require("jsonwebtoken");
const {getUserByEmail} = require("../models/UserScheme");
const User = require("../models/UserScheme").default;
const userService = require('../services/users.service.ts').default;


const userId = "64e1e2eff734e0042c496a46";
const userEmail = "tal.mekler11@gmail.com";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjBiNTA5ZWE0MGJhYjc3ZDdlZTViNiIsImlhdCI6MTcwNjA3OTQ5NywiZXhwIjoxNzA2OTQzNDk3fQ.9XK69QR8Lt9WtLWZfSiTf6mvDAHM1oLjmNpjPz9K5NQ";
const songId = "64eb643fcdf4ece499ec1e4e";
let server
beforeAll(async () => {
    startServers()
});

afterAll(async () => {
    stopServers()


});

describe("User Tests", () => {
    const user = {
        name: "Dan Tests",
        email: "dantests@gmail.com",
        password: "12345678",
    };
    let userId;
    it("test createUser", async () => {
        const response = await request(app).post("/users/Test").send(user);
        userId = response.body._id;
        expect(response.statusCode).toEqual(201);

        })

    it("should fail when email already exists", async () => {
        const duplicateEmailUser = {
            name: "Dan Tests 2",
            email: "dantests@gmail.com",
            password: "87654321",
        };
        const response = await request(app).post("/users/Test").send(duplicateEmailUser);
        expect(response.body.message).toEqual("Email already exists");
    });

    it("should delete the user successfully", async () => {
        const deleteResponse = await request(app).delete(`/users/Test/${userId}`);
        expect(deleteResponse.statusCode).toEqual(200);
    });
    it("should fail delete the user successfully becuse there is no ID", async () => {
        const deleteResponse = await request(app).delete(`/users/Test/123`);
        expect(deleteResponse.statusCode).toEqual(500);
    });
    it("should return an error when trying to delete a user that does not exist", async () => {
        const nonExistentUserId = "someRandomId";
        const deleteResponse = await request(app).delete(`/users/Test/${nonExistentUserId}`);
        expect(deleteResponse.body).toBeNull();
    });




    it("Test get all users", async () => {
        const response = await request(app).get("/users/");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("Test get user by id", async () => {
        const response = await request(app).get("/users/" + userId);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("Test get user by id -fail 'ID is required'", async () => {
        let userId;
        const response = await request(app).get("/users/" + userId);
        expect(response.statusCode).toEqual(500);
    });

    it("Test get user by id -> fail", async () => {
        const response = await request(app).get("/users/" + 1);
        expect(response.statusCode).toEqual(500);
    });

    it("Test get user by email", async () => {
        const response = await request(app).post("/users/email").send({
            email: userEmail,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("Test get user by email to null", async () => {
        const response = await request(app).post("/users/email").send({
            email: "d@D",
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("get user by name ", async () => {
        const name = "Idan";
        const response = await request(app).get("/users/name/" + name)

        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    })

    it("get user by name -> to null", async () => {
        const name = "Idan1";
        const response = await request(app).get("/users/name/" + name)
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    })

    it("get user by name-> to fail with 500  ", async () => {
        const response = await request(app).get("/users/name").send({
            name: "David",
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body).toBeDefined();
    })

    it("Test get user by email -> fail", async () => {
        const response = await request(app).post("/users/email").send({});
        expect(response.statusCode).toEqual(500);
    });

    it("Check song by user", async () => {
        const response = await request(app)
            .post("/users/check-song/" + songId)
            .send({
                token: token,
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("Check song by user -> fail", async () => {
        const response = await request(app)
            .post("/users/check-song" + "")
            .send({
                token: token,
            });
        expect(response.statusCode).toEqual(404);
    });

    it("Check user-details", async () => {
        const response = await request(app).post("/users/user-details").send({
            token: token,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("Check user-details -> fail", async () => {
        const response = await request(app).post("/users/user-details").send({
            token: "hey",
        });
        expect(response.statusCode).toEqual(403);
    });

    it("Check update user ", async () => {
        const response = await request(app)
            .put("/users")
            .send({
                updatedUser: {
                    name: "tal",
                    email: userEmail,
                    password: "12345678",
                },
                token: token,
            });
        expect(response.statusCode).toEqual(200);
    });

    it("Check update user -> fail", async () => {
        const response = await request(app)
            .put("/users")
            .send({
                updatedUser: {
                    name: "tal",
                    email: userEmail,
                    password: "12",
                },
                token: token,
            });
        expect(response.statusCode).toEqual(400);
    });

    it("Check update user -> fail", async () => {
        const response = await request(app)
            .put("/users")
            .send({
                updatedUser: {
                    name: "tal",
                    email: "12%$#@$!@",
                    password: "12345678",
                },
                token: token,
            });
        expect(response.statusCode).toEqual(400);
    });

});


