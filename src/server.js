import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import jsxRender from "./jsxRender/jsxReneder";

dotenv.config();

const app = express();
const { PORT } = process.env;

app.engine("jsx", jsxRender);
app.set("view engine", "jsx");
app.set("views", path.join(__dirname, "components"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("Layout");
});

app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
