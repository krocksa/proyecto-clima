const request = require("supertest");
const app = require("../app");

describe("POST /earthquakes", () => {
  it("debería crear un reporte sísmico válido", async () => {
    const res = await request(app).post("/earthquakes").send({
      region: "Andes",
      magnitude: 5.6,
      depth: 10,
      date: "2025-07-10"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
});