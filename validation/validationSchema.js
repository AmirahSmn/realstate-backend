const { body } = require("express-validator");
const { checkForSite } = require("./validate");

const createBlogSchema = [
  body("title").trim().notEmpty(),
  body("body").trim().notEmpty(),
  body("readTime").trim().notEmpty(),
];

const updateBlogSchema = [
  body("title").optional().trim().notEmpty(),
  body("body").optional().trim().notEmpty(),
  body("readTime").optional().trim().notEmpty(),
];

const createSiteSchema = [
  body("title").trim().notEmpty(),
  body("image").trim().notEmpty(),
  body("location").trim().notEmpty(),
  body("locationName").trim().notEmpty(),
  body("remark").optional().trim().notEmpty(),
];

const updateSiteSchema = [
  body("title").optional().trim().notEmpty(),
  body("location").optional().trim().notEmpty(),
  body("locationName").optional().trim().notEmpty(),
  body("image").optional().trim().notEmpty(),
  body("remark").optional().trim().notEmpty(),
];

const createContactSchema = [
  body("name").trim().notEmpty(),
  body("email").trim().notEmpty(),
  body("subject").trim().notEmpty(),
  body("message").trim().notEmpty(),
];
const updateContactSchema = [
  body("name").optional().trim().notEmpty(),
  body("email").optional().trim().notEmpty(),
  body("subject").optional().trim().notEmpty(),
  body("message").optional().trim().notEmpty(),
];

const createUserSchema = [
  body("username").trim().notEmpty(),
  body("password").trim().notEmpty(),
];

const createPropertySchema = [
  body("name").trim().notEmpty(),
  body("price").isNumeric(),
  body("size").trim().notEmpty(),
  body("bedRoom").isNumeric(),
  body("bathRoom").isNumeric(),
  body("buildingStatus").trim().notEmpty(),
  body("sellingStatus").trim().notEmpty(),
  body("description").trim().notEmpty(),
  body("mapLocation").trim().notEmpty(),
  body("propertyImage").trim().notEmpty(),
  body("siteId").trim().notEmpty().custom(checkForSite),
  body("featured").isBoolean(),
  body("featuredStatement").trim().notEmpty(),
  body("propertyType").trim().notEmpty(),
];

const updatePropertySchema = [
  body("name").optional().trim().notEmpty(),
  body("price").optional().isNumeric(),
  body("size").optional().trim().notEmpty(),
  body("bedRoom").optional().isNumeric(),
  body("bathRoom").optional().isNumeric(),
  body("buildingStatus").optional().trim().notEmpty(),
  body("sellingStatus").optional().trim().notEmpty(),
  body("description").optional().trim().notEmpty(),
  body("mapLocation").optional().trim().notEmpty(),
  body("propertyImage").optional().trim().notEmpty(),
  body("siteId").optional().trim().notEmpty().custom(checkForSite),
  body("featured").optional().isBoolean(),
  body("featuredStatement").optional().trim().notEmpty(),
];

const createFloorPlanSchema = [
  body("image").trim().notEmpty(),
  body("propertyId").trim().notEmpty(),
];
const updateFloorPlanSchema = [
  body("image").trim().notEmpty(),
  body("id").trim().notEmpty(),
];

module.exports = {
  createBlogSchema,
  updateBlogSchema,
  createSiteSchema,
  updateSiteSchema,
  createContactSchema,
  createUserSchema,
  createPropertySchema,
  updatePropertySchema,
  updateContactSchema,
  createFloorPlanSchema,
  updateFloorPlanSchema,
};
