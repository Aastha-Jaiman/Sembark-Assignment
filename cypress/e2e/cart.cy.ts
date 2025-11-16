describe("Cart Page", () => {
  it("opens cart page", () => {
    cy.visit("/cart");
    cy.contains("Total");
  });
});
 