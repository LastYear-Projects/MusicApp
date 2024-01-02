const app = require("../index")
const request = require("supertest");
const {connection} = require("mongoose");


const song = {
    name: "test song",
    id: "64e30d14fc68b9a5b37ba5bd",
    artist: "AC/DC",
}
let userId
let token
beforeAll(async () => {


});

afterAll(async () => {
    await connection.close();

});


describe("Auth Tests", () => {
    it("test get song by id", async () => {
        const response = await request(app).get("/songs/" + song.id);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    })
    it("test get song by id that will fail because id is not valid", async () => {
        const response = await request(app).get("/songs/" + "123");
        expect(response.statusCode).toEqual(500);
    })
    it("test getAllSongs", async () => {
        const response = await request(app).get("/songs");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    })

    it("test get songs by year", async () => {
        const response = await request(app).get("/songs/year/" + "1980");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    })




});
