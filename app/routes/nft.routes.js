module.exports = app => {
  const nfts = require("../controllers/nft.controller.js");
  const token = require("../controllers/token.controller.js");

  const router = require("express").Router();

  router.post("/", nfts.create);

  app.use('/api/nft', router);
};
