import supertest from "supertest";
import { server } from "./index";
import { expect } from "chai";

describe("supertest should work with http protocol", function () {
  describe("supertest get request to server", function () {
     const request = supertest(server);
    it("should return status code 200", async function () {
       const response= await request.get('/')
       expect(response.statusCode).to.equal(200)

    });
  });
});
