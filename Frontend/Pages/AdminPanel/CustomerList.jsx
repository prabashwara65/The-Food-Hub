import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "http://foodhub.local:30000/api/auth/users?role=customer"
      );
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setEditedData({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({ name: "", email: "", phoneNumber: "" });
  };

  const handleSave = async (userId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/auth/users/${userId}`,
        editedData
      );
      fetchCustomers();
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/users/${userId}`);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Back to Home
      </button>

      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Customer ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((user, index) => (
            <tr key={user._id}>
              <td className="p-2 border">cus{index + 1}</td>
              <td className="p-2 border">
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="p-2 border">
                {editingId === user._id ? (
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) =>
                      setEditedData({ ...editedData, email: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-2 border">
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={editedData.phoneNumber}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  user.phoneNumber
                )}
              </td>
              <td className="p-2 border space-x-2">
                {editingId === user._id ? (
                  <>
                    <button
                      onClick={() => handleSave(user._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
