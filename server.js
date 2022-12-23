import { createServer } from "http";
import { Server } from "socket.io";
import { NEW_CHAT_MESSAGE_EVENT, PORT, OPTIONS } from "./constants"

const httpServer = createServer();
const io = new Server(httpServer, OPTIONS);

io.on("connection", socket => {

  const  { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on(NEW_CHAT_MESSAGE_EVENT, data => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  })

  socket.on("disconnect", () => {
    socket.leave(roomId);
  })
})

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});




