const Blog = require("../Schema/BlogSchema");
const createBlogService = async (req, res) => {
  try {
    const { title, body, readTime } = req.body;
    const blog = await Blog.create({ title, body, readTime });

    return res.status(201).json({ msg: "Blog successfully created.", blog });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to create blog." });
  }
};
const getAllBlogsService = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res.status(200).json({ blogs });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to fetch all blogs." });
  }
};
const getSingleBlogsService = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
      return res
        .status(404)
        .json({ location: "", path: "", msg: "Blog not found.", type: "" });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to fetch single blog." });
  }
};
const deleteBlogService = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
      return res
        .status(404)
        .json({ location: "", path: "", msg: "Blog not found.", type: "" });
    }
    await Blog.deleteOne({ _id: id });
    return res.status(204).json({ msg: "Blog successfully delete." });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to delete blog." });
  }
};
const updateBlogService = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
      return res
        .status(404)
        .json({ location: "", path: "", msg: "Blog not found.", type: "" });
    }
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ msg: "blog updated", blog: updatedBlog });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to update blog." });
  }
};

module.exports = {
  createBlogService,
  getAllBlogsService,
  getSingleBlogsService,
  deleteBlogService,
  updateBlogService,
};
