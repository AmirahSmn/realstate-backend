const {
  createSiteService,
  deleteSiteService,
  getAllSitesService,
  getSingleSiteService,
  updateSiteService,
} = require("../services/site");
const { validate } = require("../validation/validate");

const createSiteController = async (req, res) => {
  const errors = validate(req);
  if (errors.isEmpty()) return createSiteService(req, res);
  return res.status(400).json(errors);
};
const deleteSiteController = async (req, res) => {
  return deleteSiteService(req, res);
};
const updateSiteController = async (req, res) => {
  const errors = validate(req);
  if (errors.isEmpty()) return updateSiteService(req, res);
  return res.status(400).json(errors);
};
const getAllSiteController = async (req, res) => {
  return getAllSitesService(req, res);
};
const getSingleSiteController = async (req, res) => {
  return getSingleSiteService(req, res);
};

module.exports = {
  createSiteController,
  deleteSiteController,
  updateSiteController,
  getSingleSiteController,
  getAllSiteController,
};
