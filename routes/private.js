import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/listar", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } });

    res.status(200).json({ message: "usuarios listados com sucesso", users });
  } catch (err) {
    res.status(500).json({ message: "Falha no servidor" });
  }
});

export default router;
