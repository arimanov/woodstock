import { PrismaClient } from '@prisma/client';
import { Account } from "@woodstock/common/Account";
import express from 'express';

const app = express();
const port = 8080;

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const users = await prisma.account.findMany()
  res.send(users);
});

app.post("/test-add", async (req, res) => {
  await prisma.account.create({ data: {
    email: 'mail@test',
    name: 'Test',
    password: 'Password',
    createdAt: new Date()
  }})
  res.send("201");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
