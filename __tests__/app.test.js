const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const {
  checkIfArticleExists,
  checkIfValidUserExists,
  checkIfCommentExists,
} = require("../models/model-utils.js");
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
      .get("/api/articles/9")
      .expect(200)
      .then((res) => {
        expect(res.body.article).toEqual({
          author: "butter_bridge",
          title: "They're not exactly dogs, are they?",
          article_id: 9,
          body: "Well? Think about it.",
          topic: "mitch",
          created_at: "2020-06-06T09:10:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          comment_count: 2,
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
describe("GET /api/articles", () => {
  test("200: responds with an array of article objects,sorted by date in decending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted({
          descending: true,
          key: "created_at",
        });
        expect(res.body.articles.length).toBe(13);
        res.body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});
describe("GET /api/articles(sort queries)", () => {
  test("200: when passed queries to change sorting order to ascending response is sorted", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted({
          ascending: true,
          key: "created_at",
        });
      });
  });
  test("200: when passed queries to change what the articles are sorted by and the order the response is sorted", () => {
    return request(app)
      .get("/api/articles?sorted_by=author&order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted({
          ascending: true,
          key: "author",
        });
      });
  });
  test("400: when passed queries not within the bounds of the database columns appropriate status and respone is provided", () => {
    return request(app)
      .get("/api/articles?sorted_by=SQTOINJECT&order=AMHACKER")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad Query");
      });
  });
});

describe("GET /api/articles(filter queries)", () => {
  test("200: when passed topic filter queries to only return articles with that topic", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then((res) => {
        res.body.articles.forEach((article) => {
          expect(article.topic).toEqual("cats");
        });
      });
  });
  test("200: when passed a filter and queries to change what the articles are sorted by and the order the response is sorted and filtered", () => {
    return request(app)
      .get("/api/articles?&topic=mitchsorted_by=author&order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted({
          ascending: true,
          key: "author",
        });
        res.body.articles.forEach((article) => {
          expect(article.topic).toEqual("cats");
        });
      });
  });
  test("200: when passed a valid filter that returns 0 matches an empty array is returned", () => {
    return request(app)
      .get("/api/articles?topic=cooking")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toEqual([]);
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with an array of comment objects,sorted by date in decending order", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments.length).toBe(11);
        expect(res.body.comments).toBeSorted({
          descending: true,
          key: "created_at",
        });
        res.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              article_id: expect.any(Number),
              author: expect.any(String),
              created_at: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
  test("400: sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/bananas/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad Request");
      });
  });
  test("404: sends an appropriate status and error message when given a valid but non existent id", () => {
    return request(app)
      .get("/api/articles/9000/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Article Not Found");
      });
  });
  test("200: when passed a legitamate article id for an article with no comments response array is empty", () => {
    return request(app)
      .get("/api/articles/11/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toEqual([]);
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  test("201: should respond with the added comment", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Smuggling butter in the footwell of a 2cv",
    };
    return request(app)
      .post("/api/articles/11/comments")
      .send(newComment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            votes: 0,
            article_id: 11,
            author: newComment.username,
            created_at: expect.any(String),
            body: newComment.body,
          })
        );
      });
  });
  test("201:should ignore addtional properties on the body of comment request", () => {
    const newCommentExtraProperty = {
      username: "butter_bridge",
      body: "Smuggling butter in the footwell of a 2cv",
      location: "French alsace border",
    };
    return request(app)
      .post("/api/articles/11/comments")
      .send(newCommentExtraProperty)
      .expect(201)
      .then((res) => {
        expect(res.body.comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            votes: 0,
            article_id: 11,
            author: newCommentExtraProperty.username,
            created_at: expect.any(String),
            body: newCommentExtraProperty.body,
          })
        );
      });
  });
  test("400: when passed an invalid object returns appropriate status code and message", () => {
    return request(app)
      .post("/api/articles/11/comments")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("Bad Request");
      });
  });
  test("400: when passed an invalid article id responds with appropriate code and message", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Smuggling butter in the footwell of a 2cv",
    };
    return request(app)
      .post("/api/articles/bananas/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad Request");
      });
  });
  test("404: when passed a valid but non existent article id responds with appropriate code and message", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Smuggling butter in the footwell of a 2cv",
    };
    return request(app)
      .post("/api/articles/9000/comments")
      .send(newComment)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Article Not Found");
      });
  });
  test("404: when passed a non existent username responds with appropriate code and message", () => {
    const newComment = {
      username: "butter_bridge143",
      body: "Smuggling butter in the footwell of a 2cv",
    };
    return request(app)
      .post("/api/articles/11/comments")
      .send(newComment)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("User Not Found");
      });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  test("200: increments votes with the object passed and returns the updated article", () => {
    return request(app)
      .patch("/api/articles/11")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).toEqual(1);
      });
  });
  test("200: reduces votes if passed a minus number", () => {
    return request(app)
      .patch("/api/articles/11")
      .send({ inc_votes: -1 })
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).toEqual(-1);
      });
  });
  test("400: when passed an invalid object returns appropriate status code and message", () => {
    return request(app)
      .patch("/api/articles/11")
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad Request");
      });
  });
  test("400: when passed an object with an invalid value returns appropriate status code and message", () => {
    return request(app)
      .patch("/api/articles/11")
      .send({ inc_votes: "buttons" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad Request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: returns correct status and no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then((res) => {
        expect(res.body).toEqual({});
      });
  });
  test("400: when passed an invalid comment id responds with appropriate code and message", () => {
    return request(app)
      .delete("/api/comments/kittens")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad Request");
      });
  });
  test("404: when passed a valid but non existent comment id responds with appropriate code and message", () => {
    return request(app)
      .delete("/api/comments/9000")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Comment Not Found");
      });
  });
});

describe("GET /api/users", () => {
  test("200: responds with an array of user objects,sorted by date in decending order", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(res.body.users.length).toBe(4);
        res.body.users.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("UTIL checkIfArticleExists", () => {
  test("should reject with a 404 status if invoked with a non existent but valid article ID ", () => {
    expect(checkIfArticleExists(9000)).rejects.toMatchObject({
      status: 404,
      msg: "Article Not Found",
    });
  });
  test("should return undefined if passed a legitimate article ID", () => {
    expect(checkIfArticleExists(11)).resolves.toMatchObject({
      approved: true,
    });
  });
});

describe("UTIL checkIfValidUserExists", () => {
  test("should reject with a 404 status if invoked with a non existent but valid username", () => {
    expect(checkIfValidUserExists("timothy")).rejects.toMatchObject({
      status: 404,
      msg: "User Not Found",
    });
  });
  test("should return true if passed a legitimate username", () => {
    expect(checkIfValidUserExists("butter_bridge")).resolves.toMatchObject({
      approved: true,
    });
  });
});
describe("UTIL checkIfCommentExists", () => {
  test("should reject with a 404 status if invoked with a non existent but valid comment ID ", () => {
    expect(checkIfCommentExists(9000)).rejects.toMatchObject({
      status: 404,
      msg: "Comment Not Found",
    });
  });
  test("should return undefined if passed a legitimate comment ID", () => {
    expect(checkIfCommentExists(1)).resolves.toMatchObject({
      approved: true,
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
