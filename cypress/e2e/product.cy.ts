describe("Product Detail Page", () => {
  it("opens product detail", () => {
    cy.visit("/");

    cy.contains("/").click(); 

    cy.contains("Add to Cart");  
    cy.contains("Back to Home");  
  });
});
