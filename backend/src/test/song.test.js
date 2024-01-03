const { app, closeServers } = require("../index");
const request = require("supertest");
const { connection } = require("mongoose");

const song = {
  title: "test song",
  album: "Back In Black",
  duration: 300000,
  year: 1980,
  genre: ["pop", "rock"],
  artist: "Amy Winehouse",
  creator: "64e1e2eff734e0042c496a46",
  price: 10,
};
const newSong = {
  title: "test song",
  album: "test",
  duration: 300000,
  year: 1980,
  genre: ["pop", "rock"],
  artist: "test",
  creator: "64e1e2eff734e0042c496a46",
  price: 10,
};
const updatedSong = {
  title: "test song update",
  album: "test update",
  duration: 300001,
  year: 1981,
  genre: ["pop", "rock"],
  artist: "test",
  creator: "64e1e2eff734e0042c496a46",
  price: 10,
};
let songId = "64e30d14fc68b9a5b37ba5bd";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTM4YjU1YTA1NmMxZTJlMzljNWU5NSIsImlhdCI6MTcwNDIwMzMxMSwiZXhwIjoxNzM1NzM5MzExfQ.zpQV7HAEsVR8qkS1v6RaunNjgRWYKF5JrQ_aThNhToc";
let creator;
beforeAll(async () => {});

afterAll(async () => {
  await closeServers();
  await connection.close();
});

describe("Songs Tests", () => {
  it("test get song by id", async () => {
    console.log("songId:        ", songId);
    const response = await request(app).get("/songs/" + songId);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
  });

  it("test get song by id that will fail because id is not valid", async () => {
    const response = await request(app).get("/songs/" + "123");
    expect(response.statusCode).toEqual(500);
  });
  it("test getAllSongs", async () => {
    const response = await request(app).get("/songs");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
  });

  //   it("test get songs by year", async () => {
  //     const response = await request(app).get("/songs/year/" + "1980");
  //     expect(response.statusCode).toEqual(200);
  //     expect(response.body).toBeDefined();
  //   });

  //   it("test get songs by year", async () => {
  //     const response = await request(app).get("/songs/year/");
  //     expect(response.statusCode).toEqual(500);
  //     expect(response.body).toBeDefined();
  //   });

  it("test getting all songs by ids", async () => {
    const response = await request(app)
      .post("/songs/get-songs")
      .send({ ids: ["64e30d14fc68b9a5b37ba5bd", "64e30daffc68b9a5b37ba5c1"] });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
  });
  it("test getting all songs by ids that will fail", async () => {
    const response = await request(app)
      .post("/songs/get-songs")
      .send({ ids: ["", ""] });
    expect(response.statusCode).toEqual(500);
  });

  it("get song by artist", async () => {
    const response = await request(app).get("/songs/artist/" + song.artist);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
  });
  it("get song by artist", async () => {
    const response = await request(app).get("/songs/artist/");
    expect(response.statusCode).toEqual(500);
  });

  it("get song by album", async () => {
    const response = await request(app).get("/songs/album/" + song.album);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
  });
  it("get song by album to fail", async () => {
    const response = await request(app).get("/songs/album/");
    expect(response.statusCode).toEqual(500);
  });

  it("get song by genre", async () => {
    const response = await request(app).get("/songs/genre/" + song.genre);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
  });
  it("get song by genre to fail", async () => {
    const response = await request(app).get("/songs/genre/");
    expect(response.statusCode).toEqual(500);
  });

  it("create new song update it and delete it", async () => {
    const response = await request(app)
      .post("/admin/songs/create")
      .send({ song: newSong, token: token });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeDefined();
    updatedSong.creator = response.body.creator;

    const response2 = await request(app)
      .put("/admin/songs/" + songId)
      .send({ token: token, song: updatedSong, updatedSong: updatedSong });
    expect(response2.statusCode).toEqual(200);
    expect(response2.body).toBeDefined();

    updatedSong.duration = -1;
    const response4 = await request(app)
      .put("/admin/songs/" + songId)
      .send({ token: token, song: updatedSong, updatedSong: updatedSong });
    expect(response4.statusCode).toEqual(500);

    updatedSong.price = -1;
    const response5 = await request(app)
      .put("/admin/songs/" + songId)
      .send({ token: token, song: updatedSong, updatedSong: updatedSong });
    expect(response5.statusCode).toEqual(500);

    updatedSong.price = "a";
    const response6 = await request(app)
      .put("/admin/songs/" + songId)
      .send({ token: token, song: updatedSong, updatedSong: updatedSong });
    expect(response6.statusCode).toEqual(500);

    const response3 = await request(app)
      .delete("/admin/songs/" + response.body._id)
      .send({ token: token, song: response.body });
    expect(response3.statusCode).toEqual(200);
  });

  it("song update to fail", async () => {
    const response = await request(app)
      .put("/admin/songs/" + songId)
      .send({ token: token, song: updatedSong });
    expect(response.statusCode).toEqual(500);
  });

  it("create new song to fail 1", async () => {
    newSong.price = -1;
    const response = await request(app)
      .post("/admin/songs/create")
      .send({ song: newSong, token: token });
    expect(response.statusCode).toEqual(500);
  });

  it("create new song to fail 2", async () => {
    newSong.price = -23;
    const response2 = await request(app)
      .post("/admin/songs/create")
      .send({ song: newSong, token: token });
    expect(response2.statusCode).toEqual(500);
  });

  it("create new song to fail3 ", async () => {
    newSong.duration = -50000;
    const response3 = await request(app)
      .post("/admin/songs/create")
      .send({ song: newSong, token: token });
    expect(response3.statusCode).toEqual(500);
  });
});
