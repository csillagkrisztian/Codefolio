const { cyan } = require("@material-ui/core/colors");

describe("My First Test", () => {
  it("homepage messing around", () => {
    cy.visit("http://localhost:3000/");
  });
});
