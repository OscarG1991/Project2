var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/characters", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({
      force: true
    });
  });

  it("should find all characters", function(done) {
    // Add some examples to the db to test with
    db.superHero
      .bulkCreate([
        {
          name: "First Character",
          abilities: "Abilities1",
          weapons: "Weapons1",
          placeOfOrigin: "Origin1",
          firstAppearance: "Appeareance1",
          teamAffiliations: "Affiliations1",
          strength: 65,
          healthpoints: 75
        },
        {
          name: "Second Character",
          abilities: "Abilities2",
          weapons: "Weapons2",
          placeOfOrigin: "Origin2",
          firstAppearance: "Appeareance2",
          teamAffiliations: "Affiliations2",
          strength: 60,
          healthpoints: 80
        }
      ])
      .then(function() {
        // Request the route that returns all examples
        request.get("/api/characters").end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;

          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(2);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
              abilities: "Abilities1",
              weapons: "Weapons1",
              placeOfOrigin: "Origin1",
              firstAppearance: "Appeareance1",
              teamAffiliations: "Affiliations1",
              strength: 65,
              healthpoints: 75
            });

          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
              abilities: "Abilities2",
              weapons: "Weapons2",
              placeOfOrigin: "Origin2",
              firstAppearance: "Appeareance2",
              teamAffiliations: "Affiliations2",
              strength: 60,
              healthpoints: 80
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});
