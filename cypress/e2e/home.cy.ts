describe("Home Page", () => {
  it("loads home page", () => {
    cy.visit("/");
    cy.contains("Total Products");
  });
});
 