import { Router } from "express";
const app = Router();

import user from "./routes/user.router.js"
import moment from "./routes/moment.router.js"


app.get("/", (req, res) => res.send("Server Running 🚀"));

app.use("/user", user)
app.use("/moment", moment)


export default app;