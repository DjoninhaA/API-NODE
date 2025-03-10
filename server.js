import express from "express";
import cors from "cors"; // Importando o CORS
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", 
    methods: "GET, POST, PUT, DELETE", 
    allowedHeaders: "Content-Type, Authorization", 
  })
);

app.use(express.json());

app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

app.listen(3000, () => {
  console.log("Server On...");
});
