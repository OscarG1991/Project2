const db = require("../models");

module.exports = app => {
  // Load index page
  app.get("/", (req, res) => {
    db.Example.findAll({}).then(dbExamples => {
      // PASSPORT: checks to see if the user is logged in.  If so then render conditional handlebars via logout render true/false
      let logout = false;
      if (req.user) {
        logout = true;
      }
      console.log(req.user);
      res.render("index", {
        msg: "Welcome!",
        // PASSPORT: logout will be true or false if user is logged in
        logout: logout,
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", (req, res) => {
    db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
      let logout = false;
      if (req.user) {
        logout = true;
      }
      res.render("example", {
        logout: logout,
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
