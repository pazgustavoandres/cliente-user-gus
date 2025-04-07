import { useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/api/users", {
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
