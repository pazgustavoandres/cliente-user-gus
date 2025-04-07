import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${apiUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  return (
    <div>
      <button onClick={fetchUsers}>Ver Usuarios</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}
