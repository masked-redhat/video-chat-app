import express from "express";
import { env } from "./constants/env.js";

const app = express();
const port = env.port;

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
