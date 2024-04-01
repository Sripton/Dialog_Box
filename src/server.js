import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import React from "react";
import { renderToString } from "react-dom/server";
import Layout from "./Layout";

dotenv.config();

const app = express();
const { PORT } = process.env;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const initState = req.originalUrl;
  const layoutComponents = React.createElement(Layout, { initState });
  const htmlRender = renderToString(layoutComponents);
  res.send(`<!DOCTYPE html>${htmlRender}`);
});

app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
