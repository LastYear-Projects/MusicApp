const { app, closeServers } = require("../index");
const request = require("supertest");
const { connection } = require("mongoose");
const jwt = require("jsonwebtoken");

const userOne = {
  email: "user@example.com",
  password: "12345678",
  name: "userOne",
};

const userTwo = {
  email: "user2@example.com",
  password: "12345678",
  name: "userTwo",
};

const userOneWrongPassWord = {
  email: "user@example.com",
  password: "123456fr432t45tg45g78",
  name: "userOne",
};

let userId;
let token;
beforeAll(async () => {});

afterAll(async () => {
  await closeServers();
  await connection.close();
});

describe("Auth Tests", () => {
  //TODO: after fixing the delete route we can remove the comment
  //   it("test register new user", async () => {
  //     const response = await request(app).post("/auth/register").send(userOne);
  //     expect(response.statusCode).toEqual(201);
  //     expect(response.body).toBeDefined();
  //     userId = response.body._id;
  //   });

  it("test register new user -> Duplicate", async () => {
    const response = await request(app).post("/auth/register").send(userOne);
    expect(response.statusCode).toEqual(500);
  });

  it("test register new user to fail 400", async () => {
    const response = await request(app).post("/auth/register").send();
    expect(response.statusCode).toEqual(400);
  });
  //TODO: after fixing the delete route we can remove the comment

  //   it("delete user", async () => {
  //     const response = await request(app).delete("/admin/users/" + userId);
  //     expect(response.statusCode).toEqual(200);
  //   });

  it("test login", async () => {
    const response = await request(app).post("/auth/login").send(userOne);
    expect(response.statusCode).toEqual(200);
    token = response.body.token;
  });

  it("test login fail-wrong email", async () => {
    const response = await request(app).post("/auth/login").send(userTwo);
    expect(response.statusCode).toEqual(400);
  });
});
