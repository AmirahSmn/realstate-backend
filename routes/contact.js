const express = require("express");
const {
  getAllContactController,
  createContactController,
  getSingleContactController,
  deleteContactController,
  updateContactController,
} = require("../controllers/contact");
const { verifyRequestMiddleWare } = require("../validation/validate");
const {
  createContactSchema,
  updateContactSchema,
} = require("../validation/validationSchema");
const router = express.Router();

router
  .route("/")
  .get(verifyRequestMiddleWare, getAllContactController)
  .post(createContactSchema, createContactController);
router
  .route("/:id")
  .get(verifyRequestMiddleWare, getSingleContactController)
  .delete(verifyRequestMiddleWare, deleteContactController)
  .patch(updateContactSchema, updateContactController);

module.exports = router;
