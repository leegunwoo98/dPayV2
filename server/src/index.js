import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var allowedOrigins = ["http://localhost:19000", "http://localhost:19006"];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.post("/registration", cors(), async (req, res) => {
  const { username, password, email } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
      email: email,
      // deviceID: deviceID
    },
  });

  // console.log(req.body);
  // res.status(201).send('created user');
  res.json(user);
});

app.get("/users", cors(), async (req, res) => {
  res.json("hello");
});

const server = app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
