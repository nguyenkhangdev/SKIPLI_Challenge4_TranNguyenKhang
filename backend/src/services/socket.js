import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { corsOptions } from "..";
import { db } from "./firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("socket.io connected");

  //identify user when join chat
  socket.on("joinChat", (userId) => {
    socket.userId = userId;
  });

  socket.on("sendMessage", async ({ chatRoomId, to, text }) => {
    //get id who send the message
    const from = socket.userId;

    const chatGet = await db.collection("chatrooms").doc(chatRoomId).get();

    //not found chat room
    if (!chatGet.exists) {
      return;
    }

    //create message
    const message = {
      from,
      to,
      text,
      time: Timestamp.now(),
    };
    //save message to firestore
    await db.collection("chatrooms").doc(chatRoomId).set(message);

    //send new  message to orther user with socket.userId
    
  });
});

export { app, server, io };
