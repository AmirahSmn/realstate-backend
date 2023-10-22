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
    const property = await Property.findById({ _id: id });
    if (!property) {
      return res
        .status(404)
        .json({ msg: "Property not found.", location: "", path: "", type: "" });
    }
    const site = await Site.findById({ _id: property.siteId });
    return res.status(200).json({ site, property });
  } catch (error) {
    console.log(error);
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
      description,
      mapLocation,
      propertyImage,
      siteId,
      featured,
      featuredStatement,
      propertyType,
    } = req.body;
    const { title } = req.site;
    const { public_id, secure_url } = await uploadImage(propertyImage);
    const property = await Property.create({
      name,
      price,
      size,
      bedRoom,
      bathRoom,
      buildingStatus,
      sellingStatus,
      description,
      mapLocation,
      propertyImage: { id: public_id, url: secure_url },
      siteName: title,
      siteId,
      featured: featured ? true : false,
      featuredStatement,
      propertyType,
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
      await deleteImage(property.floorPlans[image].id);
    }
    await Property.deleteOne({ _id: id });

    return res.status(204).json();
  } catch (error) {
    console.log(error);
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
    const { propertyImage, siteId, siteName, ...others } = req.body;
    let site = await Site.findById({ _id: siteId });
    if (!site) {
      return res
        .status(404)
        .json({ location: "", path: "", type: "", msg: "Site not found." });
    }
    let updates = {};
    if (propertyImage) {
      await deleteImage(property.propertyImage.id);
      const { secure_url, public_id } = await uploadImage(propertyImage);
      updates.propertyImage = { url: secure_url, id: public_id };
    }
    if (siteId & (siteId !== property.siteId)) {
      const site = await Site.findById({ _id: siteId });
      if (!site) {
        return res
          .status(404)
          .json({ msg: "Site not found.", location: "", path: "", type: "" });
      }
      updates.siteId = siteId;
      updates.siteName = site.title;
    }
    updates = { ...updates, ...others };

    const updatedProperty = await Property.findOneAndUpdate(
      { _id: id },
      { ...updates },
      { new: true }
    );
    return res.status(200).json({
      msg: "Property successfully updated.",
      property: updatedProperty,
    });
  } catch (error) {
    console.log(error);
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
    const { propertyId, image } = req.body;
    let property = await Property.findById({ _id: propertyId });
    if (!property) {
      return res
        .status(404)
        .json({ location: "", path: "", type: "", msg: "Property not found." });
    }
    const { secure_url, public_id } = await uploadImage(image);
    property.floorPlans.push({ url: secure_url, id: public_id });
    await property.save();

    return res.status(201).json({
      msg: "Floor plan successfully created.",
      floorPlan: { url: secure_url, id: public_id },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Failed to create floor plan.",
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
      return res.status(404).json({
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
    const floorPlan = property.floorPlans.find(
      (plan) => plan.id === req.body.id
    );
    if (!floorPlan) {
      return res.status(404).json({
        location: "",
        path: "",
        type: "",
        msg: "Floor plan not found.",
      });
    }
    await deleteImage(req.body.id);

    const floorPlans = property.floorPlans.filter(
      (plan) => plan.id !== req.body.id
    );

    property.floorPlans = floorPlans;
    await property.save();
    return res.status(204).json();
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
