const db = require("../models");
const Activity = db.activity;
const Token = db.token;
const cron = require('node-cron');

async function activityProcessingModule() {
  try {
    let activityData = await Activity.findAll({
      order: [
        ['id', 'ASC']
      ],
    });
    console.log('total records');
    for (const activity of activityData) {
      let token = await Token.findOne({
        where: {
          index: activity.token_index, 
          contract_address: activity.contract_address }
      })
      if (!token) {
        await Token.create({
          contract_address: activity.contract_address,
          index: activity.token_index,
          current_price: activity.listing_price
        });
      } else {
        let todayDate = Math.floor(Date.now()/1000);
        let checkLowestListing = await Activity.findAll({
          where: {token_index: activity.token_index, contract_address: activity.contract_address },
          order: [
            ['listing_price', 'ASC']
          ],
          limit: 1
         });
        let listingPrice = activity.listing_to < todayDate ? null :  checkLowestListing[0].listing_price;
        await Token.update({ current_price: listingPrice }, { where: { id: token.id } });

      }
    }
  } catch (error) {
    console.error('Error', error);
  }
}



cron.schedule('*/5 * * * *',() => {
  activityProcessingModule()
});






