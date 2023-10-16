const Site = require("../Schema/SiteSchema");
const { uploadImage, deleteImage } = require("../cloudinary");

const createSiteService = async (req, res) => {
  try {
    const { image, title, location } = req.body;
    const { public_id, secure_url } = await uploadImage(image);

    const site = await Site.create({
      title,
      location,
      siteImage: { id: public_id, url: secure_url },
    });
    return res.status(201).json({ msg: "Site successfully created.", site });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to create site.",
      location: "",
      path: "",
      type: "",
    });
  }
};
const deleteSiteService = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findById({ _id: id });
    if (!site) {
      return res
        .status(404)
        .json({ msg: "Site not found.", location: "", path: "", type: "" });
    }
    const { siteImage } = site;

    await deleteImage(siteImage.id);
    await Site.deleteOne({ _id: id });
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to delete site.",
      location: "",
      path: "",
      type: "",
    });
  }
};
const updateSiteService = async (req, res) => {
  try {
    const { id } = req.params;
    const { siteImage, others } = req.body;
    let site = await Site.findById({ _id: id });
    if (!site) {
      return res
        .status(404)
        .json({ msg: "Site not found.", location: "", path: "", type: "" });
    }

    if (siteImage) {
      await deleteImage(site.siteImage.id);
      const { public_id, secure_url } = await uploadImage(siteImage);
      site.siteImage = { id: public_id, url: secure_url };
    }
    site = { ...site, ...others };
    await site.save();
    return res
      .status(200)
      .json({ msg: "Site successfully updated.", site: newSite });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to update site.",
      location: "",
      path: "",
      type: "",
    });
  }
};
const getAllSitesService = async (req, res) => {
  try {
    const sites = await Site.find({});
    return res.status(200).json({ sites });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to retrieve sites.",
      location: "",
      path: "",
      type: "",
    });
  }
};
const getSingleSiteService = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findById({ _id: id });

    if (!site) {
      return res
        .status(404)
        .json({ location: "", path: "", msg: "Site not found.", type: "" });
    }
    return res.status(200).json({ site });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to retrieve site.",
      location: "",
      path: "",
      type: "",
    });
  }
};

module.exports = {
  createSiteService,
  deleteSiteService,
  updateSiteService,
  getAllSitesService,
  getSingleSiteService,
};
