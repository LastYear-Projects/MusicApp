
const app = require("../index")
const request = require("supertest");
const {connection} = require("mongoose");



let userId
let token
beforeAll(async () => {


});

afterAll(async () => {
    await connection.close();

});


describe("Auth Tests", () => {
    it("test get song by id", async () => {
const response = await request(app).get("/songs/:songId/64e30d14fc68b9a5b37ba5bd");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();

    })

});
