describe("Edit Events", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="loginEmail"]').type("admin@admin.com");
    cy.get('input[name="loginPassword"]').type("admin123");
    cy.get('button[name="loginbutton"]').click();
    cy.wait(500);
    cy.visit("/event-details?eventId=1");
    cy.contains("Edit Event").click({ force: true });
  });
  afterEach(() => {
    cy.contains("Logout").click();
  });

  describe("Test empty inputs", () => {
    it("Shows alert on empty inputs", () => {
      cy.contains("Update Event").click({ force: true });
      cy.on("window:alert", (str) => {
        expect(str).to.contains(
          "Please fill in at least one field to update the event"
        );
      });
    });
    it("Shows alert on empty date but filled in time", () => {
      cy.contains("Time").parent().find("input").type("12:00", { force: true });
      cy.on("window:alert", (str) => {
        expect(str).to.contains("Please fill in the date of the event");
      });
      cy.contains("Update Event").click({ force: true });
    });
    it("Shows alert on empty time but filled in date", () => {
      cy.contains("Date")
        .parent()
        .find("input")
        .type("2023-05-05", { force: true });
      cy.on("window:alert", (str) => {
        expect(str).to.contains("Please fill in the time of the event");
      });
      cy.contains("Update Event").click({ force: true });
    });
  });

  describe("Test invalid inputs", () => {
    it("Error thrown for whitespace input in Name field", () => {
      cy.contains("Name").parent().find("input").type(" ", { force: true });
      // cy.contains('Name').click()
      cy.contains("Description").click({ force: true });
      cy.contains("Event name must be at least 3 characters");
    });
    it("Shows error on invalid description", () => {
      cy.contains("Description")
        .parent()
        .find("textarea")
        .type("a", { force: true });
      cy.contains("Description").click({ force: true });
      cy.contains("Event description must be at least 30 characters");
    });
    it("Error thrown for whitespace input in Description field", () => {
      cy.contains("Description")
        .parent()
        .find("textarea")
        .type(" ", { force: true });
      cy.contains("Description").click({ force: true });
      cy.contains("Event description must be at least 30 characters");
    });
    it("Error thrown for whitespace input in Location field", () => {
      cy.contains("Location").parent().find("input").type(" ", { force: true });
      cy.contains("Location").click({ force: true });
      cy.contains("Event location must be at least 3 characters");
    });

    it("Error thrown for past date as input in Date field", () => {
      cy.contains("Date")
        .parent()
        .find("input")
        .type("2023-03-01", { force: true });
      cy.contains("Date").click({ force: true });
      cy.contains("Event date must be in the future.");
    });
    // it('Error thrown for whitespace input in Time field', () =>{
    //   cy.contains('').parent().find('input').type(' ')
    //   cy.contains('').parent().click()
    //   cy.contains('Event location must be at least 3 characters')
    // })
  });

  describe("Test valid inputs", () => {
    it("Valid name input", () => {
      cy.contains("Name")
        .parent()
        .find("input")
        .type("Bush House Coding Event", { force: true });
      cy.contains("Update Event").click({ force: true });
      cy.url().should("include", "/event-details?eventId=");
    });
    it("Valid description input", () => {
      cy.contains("Description")
        .parent()
        .find("textarea")
        .type("This is a test event in KCL........................", {
          force: true,
        });
      cy.contains("Update Event").click({ force: true });
      cy.url().should("include", "/event-details?eventId=");
    });
    it("Valid location input", () => {
      cy.contains("Location")
        .parent()
        .find("input")
        .type("Bush House campus", { force: true });
      cy.contains("Update Event").click({force:true});
      cy.url().should("include", "/event-details?eventId=");
    });
    it("Valid Date and Time input", () => {
      cy.contains("Date")
        .parent()
        .find("input")
        .type("2023-04-19", { force: true });
      cy.contains("Time").parent().find("input").type("12:00", { force: true });
      cy.contains("Update Event").click({ force: true });
      cy.url().should("include", "/event-details?eventId=");
    });
    it("Valid input for all forms filled", () => {
      cy.contains("Name")
        .parent()
        .find("input")
        .type("Event 1", { force: true });
      cy.contains("Description")
        .parent()
        .find("textarea")
        .type("This is a special hackathon event in KCL...................", {
          force: true,
        });
      cy.contains("Location")
        .parent()
        .find("input")
        .type("Strand campus", { force: true });
      cy.contains("Date")
        .parent()
        .find("input")
        .type("2023-05-20", { force: true });
      cy.contains("Time").parent().find("input").type("13:00", { force: true });
      cy.contains("Update Event").click({ force: true });
      cy.url().should("include", "/event-details?eventId=");
    });
  });
});
