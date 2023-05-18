module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    index: {
      type: Sequelize.STRING
    },
    contract_address: {
      type: Sequelize.STRING
    },
    current_price: {
      type: Sequelize.DOUBLE
    }
  });

  return Token;
};
