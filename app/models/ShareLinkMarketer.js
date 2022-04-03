module.exports = (sequelize, Sequelize) => {
  const shareLinkMarketer = sequelize.define(
    "share_link_marketers",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      marketerId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      linkCampaignId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      click: {
        type: Sequelize.INTEGER,
        default: 0,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return shareLinkMarketer;
};
