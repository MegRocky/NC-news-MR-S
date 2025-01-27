const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: responds with an array of topic objects with the correct keys", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics.length).toBe(3);
        res.body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET: /api/articles/:article_id", () => {
  test("200: responds with the corresponding article object to the article id", () => {
    return request(app)
      .get("/api/articles/11")
      .expect(200)
      .then((res) => {
        expect(res.body.article).toEqual({
          author: "icellusedkars",
          title: "Am I a cat?",
          article_id: 11,
          body: "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
          topic: "mitch",
          created_at: "2020-01-15T22:21:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("400: sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/bananas")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad Request");
      });
  });
  test("404: sends an appropriate status and error message when given a valid but non existent id", () => {
    return request(app)
      .get("/api/articles/9000")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Article Not Found");
      });
  });
});

describe("404: not found", () => {
  test("should return 404 with appropriate message when given an non-existant endpoint", () => {
    return request(app)
      .get("/api/anything")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("URL not found");
      });
  });
});
