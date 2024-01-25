const {app, startServers, stopServers} = require("../index");
const request = require("supertest");
const {connection, disconnect} = require("mongoose");
const {findById} = require("../models/OrderSchema");
const orderService = require("../services/orders.service.ts");

let orderId = "64e89a3861acef3b5b6aea77";
let orderId2;
let userId = "64e34fee5c01bef6a85b754f";
let server;
beforeAll(async () => {
    startServers()
});

afterAll(async () => {
    stopServers()
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
    it("should throw an error if no id is provided", async () => {
        const response = await request(app).get("/orders/user/" );
        expect(response.body.error).toBeUndefined();
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
        const now = new Date();
        // Add 3 hours to the current date and time
        const expectedDate = new Date(now.getTime());
        expectedDate.setHours(expectedDate.getHours() + 3);

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
        const orderDate = new Date(response.body.date);

        const timeDifference = Math.abs(orderDate - expectedDate);
        expect(timeDifference).toBeLessThan(15 * 60 * 1000); // Tolerance of 5 minutes


        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
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

    it("test get all orders to get error 500", async () => {
        await disconnect()
        const response = await request(app).get("/orders");
        expect(response.statusCode).toEqual(500);
    });
});
