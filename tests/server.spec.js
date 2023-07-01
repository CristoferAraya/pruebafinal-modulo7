const request = require("supertest");
const server = require("index");

describe("Operaciones CRUD de cafes", () => {

    it("Devolviendo status 200", async () => {
        const response = await request(server)
            .get("/cafes")
            .send();
        const status = response.statusCode;
        const product = response.body;
        const total = product.length;

        expect(status).toBe(200);
        expect(product).toBeInstanceOf(Array);
        expect(total).toBeGreaterThan(0);
    })


    it("Obteniendo un 404", async () => {
        const jwt = "token";
        const idToDelete = "id";
        const response = await request(server)
            .delete(`/cafes/${idToDelete}`)
            .set("Authorization", jwt)
            .send();

        expect(response.statusCode).toBe(404);
    })


    it("Probando ruta POST", async () => {
        const cafe = { id: 5, nombre: "nuevo cafe" };
        const response = await request(server)
            .post("/cafes")
            .send(cafe);
        const status = response.statusCode;
        const cafes = response.body

        expect(cafes).toContainEqual(cafe);
        expect(status).toBe(201);
    })


    it('actualizando', async () => {
        const id = "1";
        const cafe = { id: 999, nombre: "Cortado" };
        const response = await request(server)
            .put(`/cafes/${id}`)
            .send(cafe);
        const status = response.statusCode;
        
        expect(status).toBe(400);
    })
});