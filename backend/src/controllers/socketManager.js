import { Server } from "socket.io"

// Store active room connections (path → list of socket IDs)
let connections = {}
// Store chat messages per room (path → array of {sender, data, socket-id-sender})
let messages = {}
// Store when each socket connected (socket.id → Date)
let timeOnline = {}

const connectToSocket = (server) => {
    // Create a new Socket.IO server attached to our HTTP server
    const io = new Server(server, {
        cors: { // CORS config so frontend apps can connect
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    // Fired whenever a client connects to the server
    io.on("connection", (socket) => {
        console.log("SOMETHING CONNECTED")

        // --- JOIN CALL ---
        socket.on("join-call", (path) => {
            // If room doesn't exist yet, create it
            if (connections[path] === undefined) {
                connections[path] = []
            }
            // Add this socket to the room
            connections[path].push(socket.id)

            // Record the time the user connected
            timeOnline[socket.id] = new Date();

            // Notify all users in this room that a new user has joined
            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
            }

            // If there are old messages in this room, send them to the newly joined user
            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", 
                        messages[path][a]['data'],
                        messages[path][a]['sender'], 
                        messages[path][a]['socket-id-sender']
                    )
                }
            }
        })

        // --- SIGNAL EVENT (WebRTC handshake data) ---
        socket.on("signal", (toId, message) => {
            // Forward signaling message (SDP/ICE) from one peer to another
            io.to(toId).emit("signal", socket.id, message);
        })

        // --- CHAT MESSAGE ---
        socket.on("chat-message", (data, sender) => {
            // Find which room this socket belongs to
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ['', false]);

            if (found === true) {
                // If no message history for this room, create it
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                // Save message into the room's chat history
                messages[matchingRoom].push({ 
                    'sender': sender, 
                    "data": data, 
                    "socket-id-sender": socket.id 
                })

                console.log("message", matchingRoom, ":", sender, data)

                // Broadcast the message to everyone in the room
                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }
        })

        // --- DISCONNECT ---
        socket.on("disconnect", () => {
            // Calculate how long user was connected
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key
            // Loop over all rooms and remove this socket if present
            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        // Notify everyone in the room that user left
                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        // Remove user from connections list
                        var index = connections[key].indexOf(socket.id)
                        connections[key].splice(index, 1)

                        // If room is empty, delete it
                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }
            }
        })
    })

    return io;
}

export default connectToSocket
