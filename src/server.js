import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import store from "session-file-store";
import jsxRender from "./jsxRender/jsxReneder";
import indexRouter from "./indexRouter/indexRouter";
import apiUsers from "./API/apiUsers";
import { Direction, Post, Comment } from "./db/models";
import apiSubjects from "./API/apiSubjects";
import apiPosts from "./API/apiPosts";
import apiComments from "./API/apiComments";
import apiLikes from "./API/apiLikes";
import apiDisLikes from "./API/apiDislikes";

dotenv.config();

const app = express();
const { PORT } = process.env;
const FileStore = store(session);
app.engine("jsx", jsxRender);
app.set("view engine", "jsx");
app.set("views", path.join(__dirname, "components"));

const sessionConfig = {
  name: "user_sid", // Имя куки для хранения id сессии. По умолчанию - connect.sid
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? "dialog", // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(session(sessionConfig));

app.use(async (req, res, next) => {
  const direction = await Direction.findAll();
  const allPosts = await Post.findAll();
  const allComments = await Comment.findAll({ order: [["createdAt", "DESC"]] });
  res.locals.path = req.originalUrl;
  res.locals.userID = req.session?.userID;
  res.locals.userName = req.session?.userName;
  res.locals.direction = direction;
  res.locals.allPosts = allPosts;
  res.locals.allComments = allComments;
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/api/users", apiUsers);
app.use("/api/subjects", apiSubjects);
app.use("/api/posts", apiPosts);
app.use("/api/comments", apiComments);
app.use("/api/likes", apiLikes);
app.use("/api/dislikes", apiDisLikes);
app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
