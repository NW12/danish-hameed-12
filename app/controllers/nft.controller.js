const db = require("../models");
const fetch = require("node-fetch")
const Activity = db.activity;
const apiUrl = process.env.API_URL;

exports.create = async (req, res) => {
  let data = await fetchData(apiUrl);
  return res.json({ data: data, msg: 'Data inserted successfuly' });
};


async function fetchData(url) {
  try {
    let response = await fetch(url);
    response = await response.json()
    const mappedData = response.events.map(event => {
      if (event.event.kind === 'new-order') {
        return {
          contract_address: event.order.contract,
          token_index: event.order.criteria.data.token.tokenId,
          listing_price: event.order.price.amount.native,
          maker: event.order.maker,
          listing_from: event.order.validFrom,
          listing_to: event.order.validUntil,
          event_timestamp: event.event.createdAt,
        }
      }
      return null;
    }).filter(Boolean);
    await Activity.bulkCreate(mappedData);
    if (response.continuation) {
      let url = `${apiUrl}&continuation=${response.continuation}`;
      await fetchData(url);
      response.continuation = '';
    }else{
      console.log("finished data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
  }
}



