var db = require("../models");

module.exports = function(app) {
  // this route should find all superheroes in the table and display them as JSON
  app.get("/api/characters", function(req, res) {
    db.superHero
      .findAll()
      .then(function(characters) {
        res.json(characters);
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  // Create a new example
  // this route should add a new character to the table
  app.post("/api/characters", function(req, res) {
    db.superHero.create(req.body).then(function(characters) {
      res.json(characters);
    });
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(characters) {
  //     res.json(dbExample);
  //   });
  // });
};
