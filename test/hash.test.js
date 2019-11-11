var assert = require("assert");
var hashPassword = require("../utils/hashPassword");

describe("Test password hash", () => {
  it("should return without errors", () => {
    const email = "email@email.com";
    const password = "securepassword";
    var hash = hashPassword(password, email);
    assert.typeOf(hash, "string");
  });
});