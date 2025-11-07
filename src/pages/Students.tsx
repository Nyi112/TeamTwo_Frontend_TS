/** @format */

// /** @format */

// // FOR TESTING

// import { useEffect, useState } from "react";
// import API from "../api/api.js";
// // import { removeTokens } from "../auth";
// import { useNavigate } from "react-router-dom";

// export default function Students() {
//   const [students, setStudents] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await API.get("/api/user/students");
//         setStudents(res.data);
//       } catch (err) {
//         setError("Unauthorized or invalid token");
//         console.error(err);
//         localStorage.removeItem("accessToken");
//         navigate("/login");
//       }
//     };
//     fetchStudents();
//   }, []);

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Students</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <ul>
//         {students.map((s) => (
//           <li key={s.id}>
//             {s.name} — {s.marks} marks
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
