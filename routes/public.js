import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDb = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });
    res.status(201).json(userDb);
  } catch (err) {
    res.status(500).json({ message: "Erro no Servidor." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    const match = await bcrypt.compare(userInfo.password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Senha invalida" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "10m",
    });

    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ message: "Erro no Servidor." });
  }
});

export default router;
