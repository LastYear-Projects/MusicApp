const { app, closeServers } = require("../index");
const request = require("supertest");
const { connection } = require("mongoose");

let orderId = "64e89a3861acef3b5b6aea77";
let orderId2;
let userId = "64e1e2eff734e0042c496a46";

beforeAll(async () => {

});

afterAll(async () => {
  await closeServers();
  await connection.close();
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
          songs: ["64e30d14fc68b9a5b37ba5bd", "64e765a17c0cb30c562a594c"],
        },
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDIwNjkxNywiZXhwIjoxNzM1NzQyOTE3fQ.4YWuyPRO2_4X38I0sspEY2phX5g8y_gxAkof8nrv8W4",
      });
    orderId2 = response.body._id;
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
});
