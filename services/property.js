const Property = require("../Schema/PropertySchema");
const Site = require("../Schema/SiteSchema");
const { uploadImage, deleteImage } = require("../cloudinary");

const getAllPropertiesService = async (req, res) => {
  try {
    const properties = await Property.find({});
    return res.status(200).json({ properties });
  } catch (err) {
    return res.status(500).json({
      location: "",
      path: "",
      msg: "Failed to retrieve all properties.",
    });
  }
};

const getSinglePropertyService = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.find({ _id: id });
    const site = await Site.findById({ _id: property.siteId });
    return res.status(200).json({ property, site });
  } catch (error) {
    return res
      .status(500)
      .json({ location: "", path: "", msg: "Failed to retrieve property." });
  }
};

const createPropertyService = async (req, res) => {
  try {
    const {
      name,
      price,
      size,
      bedRoom,
      bathRoom,
      buildingStatus,
      sellingStatus,
      floorPlans,
      description,
      mapLocation,
      propertyImage,
      siteId,
    } = req.body;
    const { siteName } = req.site;
    let floors = [];

    const image = await uploadImage(propertyImage);
    for (image in floorPlans) {
      const { public_id, secure_url } = await uploadImage(image);
      floors.push({ id: public_id, url: secure_url });
    }
    const property = await Property.create({
      name,
      price,
      size,
      bedRoom,
      bathRoom,
      buildingStatus,
      sellingStatus,
      floorPlans,
      description,
      mapLocation,
      image,
      siteName,
      siteId,
    });
    return res
      .status(201)
      .json({ success: "Property successfully created.", property });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to create property",
      path: "",
      location: "",
      type: "",
    });
  }
};

const deletePropertyService = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById({ _id: id });
    if (!property) {
      return res
        .status(404)
        .json({ location: "", path: "", type: "", msg: "Property not found." });
    }
    await deleteImage(property.propertyImage.id);
    for (image in property.floorPlans) {
      await deleteImage(image.id);
    }
    await Property.deleteOne({ _id: id });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to delete property",
      path: "",
      location: "",
      type: "",
    });
  }
};

const updatePropertyService = async (req, res) => {
  try {
    const { id } = req.params;
    let property = await Property.findById({ _id: id });
    if (!property) {
      return res
        .status(404)
        .json({ location: "", path: "", type: "", msg: "Property not found." });
    }
    const { propertyImage, siteId, ...others } = req.body;

    if (propertyImage) {
      await deleteImage(property.propertyImage.id);
      const { secure_url, public_id } = await uploadImage(propertyImage);
      property.propertyImage = { url: secure_url, id: public_id };
    }
    if (siteId & (siteId !== property.siteId)) {
      const site = await Site.findById({ _id: siteId });
      if (!site) {
        return res
          .status(404)
          .json({ msg: "Site not found.", location: "", path: "", type: "" });
      }
      property.siteId = siteId;
      property.siteName = site.title;
    }
    property = { ...property, ...others };
    await property.save();
    return res
      .status(200)
      .json({ msg: "Property successfully updated.", property });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to update property",
      path: "",
      location: "",
      type: "",
    });
  }
};
const createFloorPlanService = async (req, res) => {
  try {
    const { id } = req.params;
    let property = await Property.findById({ _id: id });
    if (!property) {
      return res
        .status(404)
        .json({ location: "", path: "", type: "", msg: "Property not found." });
    }
    const { image } = req.body;
    const { secure_url, public_id } = await uploadImage(image);
    property.floorPlans.push({ url: secure_url, id: public_id });
    await property.save();

    return res.status(201).json({
      msg: "Floor plan successfully created.",
      floorPlan: { url: secure_url, id: public_id },
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to delete floor plan.",
      path: "",
      location: "",
      type: "",
    });
  }
};

const updateFloorPlanService = async (req, res) => {
  try {
    const { id } = req.params;
    let property = await Property.findById({ _id: id });
    if (!property) {
      return res
        .status(404)
        .json({ location: "", path: "", type: "", msg: "Property not found." });
    }
    const { image } = req.body;
    const plan = property.floorPlans.find((plan) => plan.id === req.body.id);
    if (!plan) {
      return res
        .status(404)
        .json({
          location: "",
          path: "",
          type: "",
          msg: "Floor plan not found.",
        });
    }
    await deleteImage(req.body.id);
    const { secure_url, public_id } = await uploadImage(image);
    const floorPlans = property.floorPlans.filter(
      (plan) => plan.id !== req.body.id
    );
    floorPlans.push({ url: secure_url, id: public_id });
    property.floorPlans = floorPlans;
    await property.save();
    return res.status(200).json({
      msg: "Floor plan successfully updated.",
      floorPlan: { url: secure_url, id: public_id },
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to update floor plan.",
      path: "",
      location: "",
      type: "",
    });
  }
};

const deleteFloorPlanService = async (req, res) => {
  try {
    const { id } = req.params;
    let property = await Property.findById({ _id: id });
    if (!property) {
      return res
        .status(404)
        .json({ location: "", path: "", type: "", msg: "Property not found." });
    }

    await deleteImage(req.body.id);

    const floorPlans = property.floorPlans.filter(
      (plan) => plan.id !== req.body.id
    );

    property.floorPlans = floorPlans;
    await property.save();
    return res
      .status(200)
      .json({ msg: "Floor plan successfully deleted.", floorPlans });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to delete floor plan.",
      path: "",
      location: "",
      type: "",
    });
  }
};

module.exports = {
  getAllPropertiesService,
  getSinglePropertyService,
  createPropertyService,
  deletePropertyService,
  updatePropertyService,
  createFloorPlanService,
  updateFloorPlanService,
  deleteFloorPlanService,
};
