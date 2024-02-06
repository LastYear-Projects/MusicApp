const {app, startServers, stopServers} = require("../index");
const request = require("supertest");
const {connection, disconnect} = require("mongoose");
const {findById} = require("../models/OrderSchema");
const Order = require("../models/OrderSchema").default;
const orderService = require("../services/orders.service.ts").default;

let orderId = "64e89a3861acef3b5b6aea77";
let orderId2;
let userId = "65bb502fae8c66d8aa9154c8";
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
        const response = await request(app).get("/orders/user/");
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
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmI1MDJmYWU4YzY2ZDhhYTkxNTRjOCIsImlhdCI6MTcwNjc3NDU3NywiZXhwIjoxNzA3NjM4NTc3fQ.6RFGVpbVr1Z7MowSWjDj5Ij_BqNaeQQZ_W5nF9saRZ8"
            });
        orderId2 = response.body._id;
        const orderDate = new Date(response.body.date);

        expect(response.statusCode).toEqual(200);

        const timeDifference = Math.abs(orderDate - expectedDate);
        expect(timeDifference).toBeLessThan(15 * 60 * 1000); // Tolerance of 5 minutes

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

    it("test delete order", async () => {
        const deleteResponse = await orderService.deleteOrder(orderId2);
        expect(deleteResponse).toBeDefined();
    });
    it('should throw an error if no id is provided', async () => {
        await expect(orderService.deleteOrder()).rejects.toThrow('Id is required');
    });

    it('should throw an error if no order is found with the provided id', async () => {

        jest.spyOn(Order, 'findByIdAndDelete').mockResolvedValue(null);

        await expect(orderService.deleteOrder('nonexistentId')).rejects.toThrow('Order not found');

        // Clean up the mock
        jest.restoreAllMocks();
    });

    it('should throw an error if Order.findByIdAndDelete throws an error', async () => {

        jest.spyOn(Order, 'findByIdAndDelete').mockImplementation(() => {
            throw new Error('Database error');
        });

        await expect(orderService.deleteOrder('validId')).rejects.toThrow('Database error');

        // Clean up the mock
        jest.restoreAllMocks();
    });


    it("test get all orders to get error 500", async () => {
        await disconnect()
        const response = await request(app).get("/orders");
        expect(response.statusCode).toEqual(500);
    });
});
