const express = require("express");
const {
  getAllPropertiesController,
  createPropertyController,
  getSinglePropertyController,
  deletePropertyController,
  updatePropertyController,
  createFloorPlanController,
  updateFloorPlanController,
  deleteFloorPlanController,
} = require("../controllers/property");
const { verifyRequestMiddleWare } = require("../validation/validate");
const {
  createPropertySchema,
  updatePropertySchema,
  createFloorPlanSchema,
  updateFloorPlanSchema,
} = require("../validation/validationSchema");
const router = express.Router();
router
  .route("/")
  .get(getAllPropertiesController)
  .post(
    verifyRequestMiddleWare,
    createPropertySchema,
    createPropertyController
  );
router
  .route("/:id")
  .get(getSinglePropertyController)
  .delete(verifyRequestMiddleWare, deletePropertyController)
  .patch(
    verifyRequestMiddleWare,
    updatePropertySchema,
    updatePropertyController
  );

router
  .route("/floorplan")
  .post(
    verifyRequestMiddleWare,
    createFloorPlanSchema,
    createFloorPlanController
  );
router
  .route("/floorplan/:id")
  .patch(
    verifyRequestMiddleWare,
    updateFloorPlanSchema,
    updateFloorPlanController
  )
  .delete(verifyRequestMiddleWare, deleteFloorPlanController);
