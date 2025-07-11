const request = require("supertest");
const app = require("../app"); // asegúrate de tener app.js exportando tu Express instance

describe("POST /weather", () => {
  it("debería crear un reporte climático válido", async () => {
    const res = await request(app).post("/weather").send({
      city: "Valencia",
      temperature: 29.5,
      humidity: 75,
      condition: "Nublado",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  }); // 🔁 Hasta 10 segundos de espera
  it("debería rechazar datos inválidos y devolver 400", async () => {
    const res = await request(app).post("/weather").send({
      city: "",
      temperature: "caliente",
      humidity: -10,
      condition: "",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errores");
    expect(Array.isArray(res.body.errores)).toBe(true);
    expect(res.body.errores.length).toBeGreaterThan(0);
  });
});

