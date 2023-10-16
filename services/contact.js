const Contact = require("../Schema/ContactSchema");
const getAllContactService = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.status(200).json({ contacts });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to fetch all contacts." });
  }
};
const updateContactService = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById({ _id: id });
    if (!contact) {
      return res
        .status(404)
        .json({ msg: "Contact not found.", path: "", location: "", type: "" });
    }
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    return res
      .status(200)
      .json({ msg: "Contact successfully updated.", contact: updatedContact });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to fetch all contacts." });
  }
};

const createContactService = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });
    return res
      .status(201)
      .json({ msg: "Contact successfully created.", contact });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to create contact." });
  }
};
const deleteContactService = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById({ _id: id });
    if (!contact) return res.status(404).json({ msg: "Contact not found." });
    await Contact.deleteOne({ _id: id });

    return res.status(204).json({ msg: "Contact successfully deleted." });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to delete contact." });
  }
};

const getSingleContactService = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById({ _id: id });
    if (!contact) return res.status(404).json({ msg: "Contact not found." });

    return res.status(200).json({ contact });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to delete contact." });
  }
};

module.exports = {
  getAllContactService,
  createContactService,
  getSingleContactService,
  deleteContactService,
  updateContactService,
};
