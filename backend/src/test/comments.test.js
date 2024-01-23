const commentController = require('../controllers/comments.controller.ts');
const { app, closeServers, server} = require("../index");
const request = require("supertest");
const data = require('../config/mongo.ts')
const {connection} = require("mongoose");
const jwt = require('jsonwebtoken')

let comment = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDEwMjY0MSwiZXhwIjoxNzM1NjM4NjQxfQ.x8uQNF7D4piMn5KgUy62MVdGt9Mzozda5Ldi-QJt_2I',
    comment: 'THIS IS TEST COMMENT',
    songId: '64e30d14fc68b9a5b37ba5bd'
}
let comment2 = {
    token: 'WrongTokenHere',
    comment: 'THIS IS TEST COMMENT TO FAIL',
    songId: '64e30d14fc68b9a5b37ba5bd'
}
let comment3 = {
    comment: 'THIS IS TEST COMMENT TO FAIL',
    songId: '64e30d14fc68b9a5b37ba5bd'
}

let comment4 = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDEwMjY0MSwiZXhwIjoxNzM1NjM4NjQxfQ.x8uQNF7D4piMn5KgUy62MVdGt9Mzozda5Ldi-QJt_2I',
    comment: 'THIS IS TEST COMMENT',
    songId: ''
}

let commentId
beforeAll(async () => {

});

afterAll(async () => {
    // await closeServers();
    // await connection.close();

});


describe("comments tests", () => {

    it("crate new comment", async () => {
        const response = await request(app).post("/comments").send(comment);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        commentId = response.body._id

    })

    it("crate new comment -Fail", async () => {
        const response = await request(app).post("/comments").send(comment4);
        expect(response.statusCode).toBe(500);

    })

    it("get comment by her id", async () => {
        const response = await request(app).get("/comments/" + commentId);
        expect(response.statusCode).toBe(200);

    })
    //
    it("crate new comment that will fail", async () => {
        const response = await request(app).post("/comments").send(comment2);
        expect(response.statusCode).toBe(403);

    })

    it("crate new comment that will fail-no token provided", async () => {
        const response = await request(app).post("/comments").send(comment3);
        expect(response.statusCode).toBe(401);

    })
    //
    it("get comment by song id", async () => {
        const response = await request(app).get("/comments/song/" + comment.songId);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();

    })
    //
    it("get comment by song id that will fail", async () => {
        const response = await request(app).get("/comments/song/" + "123");
        expect(response.statusCode).toBe(500);


    })

    it("get comment by user id", async () => {
        const userId = jwt.decode(comment.token).id
        const response = await request(app).get("/comments/user/" + userId);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();

    })
    it("get comment by user id - to get error 500", async () => {
        const userId = jwt.decode(comment.token).id
        const response = await request(app).get("/comments/user/");
        expect(response.statusCode).toBe(500);
    })

    it(" update comment ", async () => {
        let updateComment = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDEwMjY0MSwiZXhwIjoxNzM1NjM4NjQxfQ.x8uQNF7D4piMn5KgUy62MVdGt9Mzozda5Ldi-QJt_2I',
            comment: 'THIS IS TEST COMMENT UPDATE',
            songId: '64e30d14fc68b9a5b37ba5bd'}

        const response = await request(app).put("/comments/" + commentId).send(updateComment);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();

    })

    it(" update comment to fail ", async () => {
        let updateComment = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDEwMjY0MSwiZXhwIjoxNzM1NjM4NjQxfQ.x8uQNF7D4piMn5KgUy62MVdGt9Mzozda5Ldi-QJt_2I',
            comment: 'THIS IS TEST COMMENT UPDATE',
            songId: '64e30d14fc68b9a5b37ba5bdREMOVETHIS'}

        const response = await request(app).put("/comments/" + updateComment.songId).send(updateComment);
        expect(response.statusCode).toBe(500);


    })

    it(" delete comment ", async () => {
        const response = await request(app).delete("/comments/" + commentId).send(comment);
        expect(response.statusCode).toBe(200);

    })
    it(" delete comment to fail ", async () => {
        const response = await request(app).delete("/comments/" + comment.comment);
        expect(response.statusCode).toBe(500);

    })

})