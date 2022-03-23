const asyncHandler = require("express-async-handler");
const Clients = require("../models/Clients");

const inputClient = asyncHandler(async (req, res) => {
  const { name, email, phone, address, price, obs } = req.body;

  if (!name || !email || !phone || !address || !price) {
    res.status(400);
    throw new Error("Please add all required fields");
  }
  //check is client exists
  const clientExists = await Clients.findOne({ email, phone });
  if (clientExists) {
    res.status(400);
    throw new Error("Client already registered");
  }

  //create client
  const client = await Clients.create({
    name,
    email,
    phone,
    address,
    price,
    obs,
  });
  if (client) {
    res.status(200).json({
      _id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      price: client.price,
      obs: client.obs,
    });
  } else {
    res.status(400);
    throw new Error("Invalid client data");
  }
});

module.exports = { inputClient };
