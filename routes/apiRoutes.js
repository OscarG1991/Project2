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

  app.get("/api/newsfeed", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/newsfeed/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/characters/:id", function(req, res) {
    db.superHero
      .findOne({
        where: {
          id: req.params.id
        }
      })
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
    console.log(req.body);
    db.superHero.create({
      name: req.body.name,
      abilities: req.body.abilities,
      weapons: req.body.weapons,
      placeOfOrigin: req.body.placeOfOrigin,
      firstAppearance: req.body.firstAppearance,
      teamAffiliations: req.body.teamAffiliations,
      strength: req.body.strength,
      healthpoints: req.body.healthpoints
    }).then(function(characters) {
      res.json(characters);
    });
  });

  app.post("/api/newsfeed", function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(characters) {
  //     res.json(dbExample);
  //   });
  // });
  app.delete("/api/newsfeed/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.delete("/api/characters/:id", function(req, res) {
    db.superHero.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(characters) {
      res.json(characters);
    });
  });

  app.put("/api/newsfeed", function(req, res) {
    db.Post.update(req.body,
      {
      where: {
      id: req.body.id
      }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
