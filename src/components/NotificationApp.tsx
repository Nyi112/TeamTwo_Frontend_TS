/** @format */

// /** @format */
// import React, { useEffect, useRef, useState } from "react";
// import SockJS from "sockjs-client";
// import { over } from "stompjs";
// import { getAccessToken } from "../auth"; // JWT helper

// const NotificationApp = () => {
//   const stompClientRef = useRef(null); // store single STOMP client
//   const [connected, setConnected] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const token = getAccessToken();
//     if (!token) {
//       console.warn("No token found — please login first.");
//       return;
//     }

//     // Prevent reconnect if already connected
//     if (stompClientRef.current) return;

//     const socket = new SockJS("http://localhost:8080/ws");
//     const stomp = over(socket);
//     stomp.debug = null; // disable logs
//     stompClientRef.current = stomp;

//     // Connect with JWT header
//     stomp.connect(
//       { Authorization: `Bearer ${token}` },
//       () => {
//         console.log("✅ Connected to WebSocket");
//         setConnected(true);

//         // Subscribe only once
//         stomp.subscribe("/topic/notifications", (msg) => {
//           if (msg.body) {
//             setNotifications((prev) => [...prev, msg.body]);
//           }
//         });
//       },
//       (err) => {
//         console.error("❌ WebSocket connection error:", err);
//         setConnected(false);
//       }
//     );

//     // Cleanup on unmount
//     return () => {
//       if (stompClientRef.current && stompClientRef.current.connected) {
//         stompClientRef.current.disconnect(() =>
//           console.log("🔌 Disconnected from WebSocket")
//         );
//       }
//     };
//   }, []);

//   const sendNotification = () => {
//     if (!connected || !stompClientRef.current) {
//       alert("WebSocket not connected yet!");
//       return;
//     }
//     if (input.trim() === "") return;

//     stompClientRef.current.send("/app/notify", {}, input);
//     setInput("");
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Poppins" }}>
//       <h2>🔔 WebSocket Notifications</h2>
//       <p>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</p>

//       <div style={{ marginBottom: "10px" }}>
//         <input
//           type="text"
//           placeholder="Type a notification..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           style={{ padding: "8px", width: "250px" }}
//         />
//         <button
//           onClick={sendNotification}
//           style={{
//             marginLeft: "10px",
//             padding: "8px 12px",
//             cursor: "pointer",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//           }}
//         >
//           Send
//         </button>
//       </div>

//       <h3>📩 Notifications:</h3>
//       <ul>
//         {notifications.map((n, i) => (
//           <li key={i}>{n}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationApp;
