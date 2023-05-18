module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    contract_address: {
      type: Sequelize.STRING
    },
    token_index: {
      type: Sequelize.STRING
    },
    listing_price: {
      type: Sequelize.DOUBLE
    },
    maker: {
      type: Sequelize.STRING
    },    
    listing_from: {
      type: Sequelize.INTEGER
    },    
    listing_to: {
      type: Sequelize.INTEGER
    },    
    event_timestamp: {
      type: Sequelize.DATE
    }
  });

  return Activity;
};
