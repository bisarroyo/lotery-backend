// const Payment = require('../models/payment.model');
const axios = require('axios');
const {paypal: { client_id, client_secret, client_sandbox_url}, host} = require('../config/config');
const boom = require('@hapi/boom');

const createOrder = async (req, res, next) => {
  try{ 
    const order = {
      "intent": "CAPTURE",
      "application_context": {
        "brand_name": "Lotery",
        "landind_page": "NO_PREFERENCE",
        "user_action": "PAY_NOW",
        "return_url": `${host}/api/payment/capture-payment`,
        "cancel_url": `${host}/api/payment/cancel-payment`,
      },
      "purchase_units": [
        {
          ammount: {
            currency_code: "USD",
            value: "100.00"
          },
        },
      ],
    };
    //format body
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    //call api
    const {data: {access_token}} = await axios.post(`${client_sandbox_url}/v1/oauth2/token`, params, {
      headers: {
        "content-type": "aplication/x-www-form-urlencoded",
      },
      auth: {
        username: client_id,
        password: client_secret
      }
    });
    console.log({"token": access_token});

    //make request 
    const response = await axios.post(`${client_sandbox_url}/v2/checkout/orders`, order, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log(response.data);
    res.json(access_token);

  }catch(err){
    console.error(err);
    next(boom.badImplementation(err));
  }
};

const captureOrder = async (req, res, next) => {
  const {token} = req.query;
  try{
    const response = await axios.post(`${client_sandbox_url}/v2/checkout/orders/${token}/capture`, {}, {
      auth: {
          username: client_id,
          password: client_secret
      },
    });
    console.log(response.data);
    res.json(response.data);
  }catch(err){
    console.error(err);
    next(boom.badImplementation(err));
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    res.redirect('/');
  } catch (err) {
    next(boom.badImplementation(err));
  }
};

module.exports = {createOrder, captureOrder, cancelOrder};