const {app, startServers, stopServers} = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const usersService = require("../services/users.service").default;
const usersController = require("../controllers/users.controller").default;
const User = require("../models/UserScheme").default;
const userService = require('../services/users.service.ts').default;
const songService = require('../services/songs.service.ts').default;

const userEmail = "davidovich.dan@gmail.com";
const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmI1MDJmYWU4YzY2ZDhhYTkxNTRjOCIsImlhdCI6MTcwNjc3NDU3NywiZXhwIjoxNzA3NjM4NTc3fQ.6RFGVpbVr1Z7MowSWjDj5Ij_BqNaeQQZ_W5nF9saRZ8"

const songId = "64eb643fcdf4ece499ec1e4e";
let resultFromGoogle
let userResponseId
const user = {
    name: "Dan Tests",
    email: "dantestsa@gmail.com",
    password: "12345678",
    profile_image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fs"
};
const userNoName = {
    name:"",
    email: "dantestsb@gmail.com",
    password: "12345678",
};
let userId;

beforeAll(async () => {
    startServers()
});

afterAll(async () => {
    const deleteUser = await User.findByIdAndDelete(userResponseId);
    expect(deleteUser).toBeDefined();
    stopServers()
});



describe("User Tests", () => {
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
        console.log(response.body)
        console.log(response.body.message)

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

    it('should return a status code of 200 and a valid token response', () => {
        // Mock the req object
        const req = {};

        // Mock the res object
        const res = {
            status: jest.fn().mockReturnThis(), // Chainable
            json: jest.fn()
        };

        // Call the checkToken function with the mocked req and res objects
        usersController.checkToken(req, res);

        // Check that res.status and res.json were called with the right arguments
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ isValidToken: true });
    });

        it('should return a status code of 403 and an invalid token message', async () => {
            // Mock the req object
            const req = {
                body: {
                    refreshToken: 'invalidToken'
                }
            };

            // Mock the res object
            const res = {
                status: jest.fn().mockReturnThis(), // Chainable
                json: jest.fn()
            };

            // Mock the next function
            const next = jest.fn();

            // Mock the jwt.decode function to return an object with an id
            jest.spyOn(jwt, 'decode').mockReturnValue({ id: 'invalidId' });

            // Mock the userService.getUserById function to return null
            jest.spyOn(userService, 'getUserById').mockResolvedValue(null);

            // Call the isRefreshTokenExist function with the mocked req, res, and next objects
            await usersController.isRefreshTokenExist(req, res, next);

            // Check that res.status and res.json were called with the right arguments
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });

            // Clean up the mocks
            jest.restoreAllMocks();
        });

 let refreshToken;
 let user3Id
    it('test generateAccessToken', async () => {
        const user3=await usersService.getUserByEmail("aaaaa@gmail.com");
        user3Id=user3._id
        refreshToken=user3.refreshTokens[0]
        const req = {
            body: {
                refreshToken:  user3.refreshTokens[0]
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(), // Chainable
            json: jest.fn()
        };

        jest.spyOn(jwt, 'decode').mockReturnValue({ id: 'validId' });

        jest.spyOn(userService, 'getUserById').mockResolvedValue({
            _id: user3._id,
        });

        jest.spyOn(jwt, 'sign').mockReturnValue(user3.refreshTokens[0]);

        await usersController.generateAccessToken(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: user3.refreshTokens[0], refreshToken: user3.refreshTokens[0] });
        jest.restoreAllMocks();
    });

    it('should verify the refresh token successfully and call next', async () => {
        const req = {
            body: {
                refreshToken: refreshToken
            }
        };

        const res = {};
        const next = jest.fn();

        jest.spyOn(jwt, 'decode').mockReturnValue({ id: user3Id });
        jest.spyOn(userService, 'getUserById').mockResolvedValue({
            _id: user3Id
        });

        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(null, { id: user3Id });
        });

        await usersController.verifyRefreshToken(req, res, next);
        expect(next).toHaveBeenCalled();
        jest.restoreAllMocks();
    });

    it("should return error when userService.getAllUsers() throws an error", async () => {
        jest.spyOn(userService, 'getAllUsers').mockImplementationOnce(() => {
            throw new Error('Test error');
        });
        const response = await request(app).get("/users");
        expect(response.statusCode).toEqual(500);
        jest.restoreAllMocks();
    });

});


