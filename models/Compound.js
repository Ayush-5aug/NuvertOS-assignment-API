module.exports = (sequelize, Sequelize) => {
    const Compound = sequelize.define("compound", {
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      compundName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      compundDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      attribute: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      dateModified: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, 
    {
      timestamps: false,
    });
    return Compound;
  };