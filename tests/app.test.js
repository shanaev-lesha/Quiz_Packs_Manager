import request from "supertest";
import app from '../src/app';


describe("Functional tests", () => {

  describe("Endpoint /health", () => {
    it("should return 200", async () => {
      const res = await request(app)
        .get('/health');
      expect(res.status).toBe(200);
    })
  })

  describe("Error handling", () => {
    it("should return 404 if path not exists", () => {
      
    })
  })
})