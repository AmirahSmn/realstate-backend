const {
  getAllContactService,
  createContactService,
  deleteContactService,
  getSingleContactService,
  updateContactService,
} = require("../services/contact");
const { validate } = require("../validation/validate");

const getAllContactController = async (req, res) => {
  return getAllContactService(req, res);
};
const createContactController = async (req, res) => {
  const errors = validate(req);
  if (errors.isEmpty()) return createContactService(req, res);
  return res.status(400).json(errors);
};
const updateContactController = async (req, res) => {
  const errors = validate(req);
  if (errors.isEmpty()) return updateContactService(req, res);
  return res.status(400).json(errors);
};

const deleteContactController = async (req, res) => {
  return deleteContactService(req, res);
};
const getSingleContactController = async (req, res) => {
  return getSingleContactService(req, res);
};

module.exports = {
  getAllContactController,
  createContactController,
  deleteContactController,
  getSingleContactController,
  updateContactController,
};
