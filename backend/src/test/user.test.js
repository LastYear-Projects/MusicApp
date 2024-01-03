const { app, closeServers } = require("../index");
const request = require("supertest");
const { connection } = require("mongoose");
const jwt = require("jsonwebtoken");

const userId = "64e1e2eff734e0042c496a46";
const userEmail = "tal.mekler11@gmail.com";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTFlMmVmZjczNGUwMDQyYzQ5NmE0NiIsImlhdCI6MTcwNDI4Njg3OCwiZXhwIjoxNzM1ODIyODc4fQ.85CntfLlxM_-YeU_ziuQ1jtNXNhiLkRFuF6cGhb6g1E";
const songId = "64eb643fcdf4ece499ec1e4e";

beforeAll(async () => {});

afterAll(async () => {
  await closeServers();
  await connection.close();
});

describe("User Tests", () => {
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
