const start = require("../build/app").default;
const request = require("supertest");

const server = start(true);

afterEach(() => server.close());

describe("Afuri Backend Testing", () => {
    test("Root should return 200", async () => {
        const res = await request(server).get("/");
        expect(res.status).toBe(200);
    });
});