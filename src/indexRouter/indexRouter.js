import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  res.render("Layout");
});

router.get("/signup", async (req, res) => {
  res.render("Layout");
});
router.get("/signin", async (req, res) => {
  res.render("Layout");
});
router.get("/direction/:id", async (req, res) => {
  res.render("Layout");
});

router.get("/addposts/:id", async (req, res) => {
  res.render("Layout");
});
router.get("/postlists/:id", async (req, res) => {
  res.render("Layout");
});
router.get("/changeposts/:id", async (req, res) => {
  res.render("Layout");
});
export default router;
