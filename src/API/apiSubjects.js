import express from "express";
import { Subject, Direction } from "../db/models";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findDirectionID = await Direction.findOne({ where: { id } });
    const subjectsID = await Subject.findAll({
      where: { direction_id: findDirectionID.id },
    });
    res.json(subjectsID);
  } catch (error) {
    console.log(error);
  }
});
router.get("/getonesubject/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findSubject = await Subject.findOne({ where: { id } });
    res.json(findSubject);
  } catch (error) {
    console.log(error);
  }
});

export default router;
