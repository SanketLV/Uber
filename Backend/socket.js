const socketIO = require("socket.io");
const User = require("./models/user.model");
const Captain = require("./models/captain.model");

let io;

const initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected ${socket.id}`);

    socket.on("join", async (data) => {
      console.log("join", data);
      const { userType, userId } = data;

      console.log(userType, userId);

      if (userType === "user") {
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        socket.emit("error", {
          message:
            "Invalid location data. Both latitude and longitude are required.",
        });
        return;
      }

      if (
        typeof location.ltd !== "number" ||
        typeof location.lng !== "number"
      ) {
        socket.emit("error", {
          message: "Latitude and longitude must be numbers.",
        });
        return;
      }

      if (
        location.ltd < -90 ||
        location.ltd > 90 ||
        location.lng < -180 ||
        location.lng > 180
      ) {
        socket.emit("error", {
          message:
            "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180.",
        });
        return;
      }

      await Captain.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected ${socket.id}`);
    });
  });
};

const sendMessageToSecketID = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket is not initialized");
  }
};

module.exports = { initializeSocket, sendMessageToSecketID };
