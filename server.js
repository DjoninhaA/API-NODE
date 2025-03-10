import express from "express";
import publicRoutes from "./routes/public.js";

const app = express();
app.use(express.json());

app.use("/", publicRoutes);

app.listen(3000, () => {
  console.log("Server On...");
});


// name="djonathan"

// key="xpaqptDlJKRAQ8cr"

// url="mongodb://djonathan:<db_password>@<hostname>/?ssl=true&replicaSet=atlas-p02fqp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=users"
