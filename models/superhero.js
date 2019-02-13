module.exports = function(sequelize, DataTypes) {
  var superHero = sequelize.define("superHero", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },

    abilities: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    weapons: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },

    placeOfOrigin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },

    firstAppearance: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },

    teamAffiliations: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },

    strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 3]
      }
    },

    healthpoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 3]
      }
    }
  });
  return superHero;
};
