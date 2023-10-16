const {
  createPropertyService,
  getAllPropertiesService,
  updatePropertyService,
  deletePropertyService,
  createFloorPlanService,
  updateFloorPlanService,
  deleteFloorPlanService,
} = require("../services/property");
const { validate } = require("../validation/validate");

const createPropertyController = async (req, res) => {
  const errors = validate(req);
  if (errors.isEmpty()) return createPropertyService(req, res);
  return res.status(400).json(errors);
};
const updatePropertyController = async (req, res) => {
  const errors = validate(req);
  if (errors.isEmpty()) return updatePropertyService(req, res);
  return res.status(400).json(errors);
};

const getAllPropertiesController = async (req, res) => {
  return getAllPropertiesService(req, res);
};

const getSinglePropertyController = async (req, res) => {
  return getSinglePropertyService(req, res);
};
const deletePropertyController = async (req, res) => {
  return deletePropertyService(req, res);
};

const createFloorPlanController = async (req, res) => {
  const errors = validate(req);
  if (errors.isEmpty()) return createFloorPlanService(req, res);
  return res.status(400).json(errors);
};
const updateFloorPlanController = async (req, res) => {
  const errors = validate(req);
  if (errors.isEmpty()) return updateFloorPlanService(req, res);
  return res.status(400).json(errors);
};
const deleteFloorPlanController = async (req, res) => {
  return deleteFloorPlanService(req, res);
};

module.exports = {
  deleteFloorPlanController,
  updateFloorPlanController,
  createFloorPlanController,
  deletePropertyController,
  getSinglePropertyController,
  getAllPropertiesController,
  getAllPropertiesController,
  createPropertyController,
  updatePropertyController,
};
