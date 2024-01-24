const {app, startServers, stopServers} = require("../index");
const request = require("supertest");
const {connection, disconnect} = require("mongoose");

let orderId = "64e89a3861acef3b5b6aea77";
let orderId2;
let userId = "64e34fee5c01bef6a85b754f";
let server;
beforeAll(async () => {
    startServers()
});

afterAll(async () => {
    stopServers()


    // await closeServers();
    // await connection.close();
    // await disconnect();
});

describe("Order Tests", () => {
    it("test get all orders", async () => {
        const response = await request(app).get("/orders/");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("test get order by id", async () => {
        const response = await request(app).get("/orders/" + orderId);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("test get order by id -> fail", async () => {
        const response = await request(app).get("/orders/" + 123);
        expect(response.statusCode).toEqual(500);
    });

    it("test get order by user id", async () => {
        const response = await request(app).get("/orders/user/" + userId);
        expect(response.statusCode).toEqual(200);
    });

    it("test get order by user id -> fail", async () => {
        const response = await request(app).get("/orders/user/");
        expect(response.statusCode).toEqual(500);
    });

    it("test create order", async () => {
        const response = await request(app)
            .post("/orders/")
            .send({
                order: {
                    user: userId,
                    songs: ["6586b18ed330cce3dd395419", "6586b27da4f89cc16ecc9ee6"],
                },
                token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjBiNTA5ZWE0MGJhYjc3ZDdlZTViNiIsImlhdCI6MTcwNjA3OTQ5NywiZXhwIjoxNzA2OTQzNDk3fQ.9XK69QR8Lt9WtLWZfSiTf6mvDAHM1oLjmNpjPz9K5NQ",
            });
        orderId2 = response.body._id;
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();

        // Check the date field
        const orderDate = new Date(response.body.date);
        const expectedDate = new Date();
        expectedDate.setHours(expectedDate.getHours() + 3);

        // Allow some tolerance for the time it takes to make the request and process it
        const timeDifference = Math.abs(orderDate - expectedDate);
        expect(timeDifference).toBeLessThan(5 * 60 * 1000); // Tolerance of 5 minutes
    });

    it("test create order -> fail", async () => {
        const response = await request(app).post("/orders/").send({
            token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDIwMzMxMSwiZXhwIjoxNzM1NzM5MzExfQ.zpQV7HAEsVR8qkS1v6RaunNjgRWYKF5JrQ_aThNhToc",
        });
        expect(response.statusCode).toEqual(500);
    });

    it("test update order", async () => {
        const response = await request(app)
            .put("/admin/orders/" + orderId2)
            .send({
                token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDIwMzMxMSwiZXhwIjoxNzM1NzM5MzExfQ.zpQV7HAEsVR8qkS1v6RaunNjgRWYKF5JrQ_aThNhToc",
                updatedOrder: {
                    user: userId,
                    songs: ["64e30d14fc68b9a5b37ba5bd", "64e765a17c0cb30c562a594c"],
                },
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("test update order -> fail", async () => {
        const response = await request(app)
            .put("/admin/orders/" + 1)
            .send({
                token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDIwMzMxMSwiZXhwIjoxNzM1NzM5MzExfQ.zpQV7HAEsVR8qkS1v6RaunNjgRWYKF5JrQ_aThNhToc",
                updatedOrder: {
                    user: 0,
                    songs: ["64e30d14fc68b9a5b37ba5bd", "64e765a17c0cb30c562a594c"],
                },
            });
        expect(response.statusCode).toEqual(500);
        expect(response.body).toBeDefined();
    });


});
