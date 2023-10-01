const router = require("express").Router();
const Post = require("../models/postsModel");
const authMiddleware = require("../middlewares/authMiddleware");

// dodaj blog
router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    return res.send({ success: true, message: "Blog uspešno dodat" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// izmeni blog
router.put("/update-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    return res.send({ success: true, message: "Blog uspešno izmenjen" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// obriši blog
router.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "Blog uspešno obrisan" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// dohvati sve blogove
router.get("/get-all-posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: posts });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});
// dohvati blog po id-ju
router.get("/get-post-by-id/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.send({ success: true, data: post });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
