import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: ""
  });

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:8080/users").then((res) => setUsers(res.data));
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      // Update existing user
      axios.put(`http://localhost:8080/users/${form.id}`, form).then(() => {
        fetchUsers();
        resetForm();
      });
    } else {
      // Create new user
      axios.post("http://localhost:8080/users", form).then(() => {
        fetchUsers();
        resetForm();
      });
    }
  };

  // Edit user (load into form)
  const handleEdit = (user) => {
    setForm(user);
  };

  // Delete user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:8080/users/${id}`).then(() => {
        fetchUsers();
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({ id: null, name: "", email: "", phone: "", age: "", gender: "" });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management System</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-4 shadow mb-4">
        <h4>{form.id ? "Update User" : "Add User"}</h4>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Phone"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="form-control"
            placeholder="Age"
            required
          />
        </div>
        <div className="mb-3">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success me-2">
          {form.id ? "Update" : "Add"}
        </button>
        {form.id && (
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* User List */}
      <h3>User List</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Age</th><th>Gender</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.age}</td>
              <td>{u.gender}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(u)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

