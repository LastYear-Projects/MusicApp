const {app, startServers, stopServers} = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const usersController = require("../controllers/users.controller").default;
const User = require("../models/UserScheme").default;
const userService = require('../services/users.service.ts').default;
const songService = require('../services/songs.service.ts').default;

const userEmail = "tal.mekler11@gmail.com";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjBiNTA5ZWE0MGJhYjc3ZDdlZTViNiIsImlhdCI6MTcwNjA3OTQ5NywiZXhwIjoxNzA2OTQzNDk3fQ.9XK69QR8Lt9WtLWZfSiTf6mvDAHM1oLjmNpjPz9K5NQ";
const songId = "64eb643fcdf4ece499ec1e4e";
let resultFromGoogle
let userResponseId
const user = {
    name: "Dan Tests",
    email: "dantests@gmail.com",
    password: "12345678",
    profile_image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fs"
};

beforeAll(async () => {
    startServers()
});

afterAll(async () => {
    const deleteUser = await User.findByIdAndDelete(userResponseId);
    expect(deleteUser).toBeDefined();
    stopServers()


});



describe("User Tests", () => {


    const userNoName = {
        name:"",
        email: "dantests@gmail.com",
        password: "12345678",
    };
    let userId;


    it("test createUser", async () => {
        const response = await request(app).post("/users/Test").send(user);
        userId = response.body._id;
        expect(response.statusCode).toEqual(201);
        })

    it("test createUser fail with no name user", async () => {
        const response = await request(app).post("/users/Test").send(userNoName);
        expect(response.statusCode).toEqual(500);
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


    it("test the create google user ", async () => {

        const result = await userService.createGoogleUser(user);
        resultFromGoogle=result
        userResponseId = result._id;

        expect(result).toBeDefined();
        expect(result.name).toEqual(user.name);
        expect(result.email).toEqual(user.email);
    });


    it("test add songs to user ",async () => {
        const song = await songService.getSongById("64e30daffc68b9a5b37ba5c1");
        const song1 = await songService.getSongById("64e765a17c0cb30c562a594c");

        const addSong = await userService.addSongsToUser(userResponseId,[song._id,song1._id]);
        expect(addSong).toBeDefined();

    })
    it("test add songs to user and wont find the user ",async () => {
        const song = await songService.getSongById("64e30daffc68b9a5b37ba5c1");
        const song1 = await songService.getSongById("64e765a17c0cb30c562a594c");
        const wrongId=new mongoose.Types.ObjectId("65b51a3bc760666666e8a815");
        try {
            const addSong = await userService.addSongsToUser(wrongId, [song._id, song1._id]);
        } catch (error) {
            expect(error.message).toEqual("User not found");
        }

    })

    it("test addRefreshToken",async () => {
        const addRefreshToken = await userService.addRefreshToken(resultFromGoogle._id,"123456789");
        expect(addRefreshToken).toBeDefined();
    })

    it("test addRefreshToken and wont find the user",async () => {
        const wrongId=new mongoose.Types.ObjectId("65b51a3bc760666666e8a815");
        try {
            const addRefreshToken = await userService.addRefreshToken(wrongId,"123456789");
        } catch (error) {
            expect(error.message).toEqual("User not found");
        }
    })

    it("test removeRefreshToken",async () => {
        const removeRefreshToken = await userService.removeRefreshToken(resultFromGoogle._id,"123456789");
        expect(removeRefreshToken).toBeDefined();
    })

    it("test removeRefreshToken and wont find the user",async () => {
        const wrongId=new mongoose.Types.ObjectId("65b51a3bc760666666e8a815");
        try {
            const removeRefreshToken = await userService.removeRefreshToken(wrongId,"123456789");
        } catch (error) {
            expect(error.message).toEqual("User not found");
        }
    })





});

describe("controller more tests", () => {
    it('should add a song to a user and return a status code of 200', async () => {
        const userId = user._id;
        const songId = '64e30d14fc68b9a5b37ba5bd';

        const req = {
            params: {
                id: userId
            },
            body: songId
        };
        const res = {
            status: jest.fn().mockReturnThis(), // Chainable
            json: jest.fn()
        };

        await usersController.addSongToUser(req, res);

        // Check that res.status and res.json were called with the right arguments
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });



})
describe('Test the userLogin endpoint', () => {
    it('should login a user and return a status code of 400- Wrong password', async () => {
        //create a user at the DB


        const req = {
            body: {
                email: user.email,
                password: user.password+user.email.toLowerCase(),
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(), // Chainable
            json: jest.fn()
        };

        await usersController.userLogin(req, res);

        // Check that res.status and res.json were called with the right arguments
        expect(res.status).toHaveBeenCalledWith(400);

    })


});


