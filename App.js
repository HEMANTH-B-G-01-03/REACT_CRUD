import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which entry is being edited

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleRegisterOrUpdate = () => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    if (editingId) {
      // Update existing entry
      const updatedEntries = entries.map((entry) =>
        entry.id === editingId ? { id: editingId, name, email, password } : entry
      );
      setEntries(updatedEntries);
      localStorage.setItem("userEntries", JSON.stringify(updatedEntries));
      setEditingId(null); // Reset editing state
    } else {
      // Register new entry
      const newEntry = { id: Date.now(), name, email, password };
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      localStorage.setItem("userEntries", JSON.stringify(updatedEntries));
    }

    // Clear input fields
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleEdit = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    setName(entryToEdit.name);
    setEmail(entryToEdit.email);
    setPassword(entryToEdit.password);
    setEditingId(id); // Set editing ID
  };

  const handleDelete = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("userEntries", JSON.stringify(updatedEntries));
  };

  return (
    <div className="container">
      <h2>{editingId ? "Update User" : "Register"}</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegisterOrUpdate}>
          {editingId ? "Update" : "Register"}
        </button>
      </div>

      <h2>Dashboard</h2>
      <div className="dashboard">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.password}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(entry.id)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => handleDelete(entry.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
