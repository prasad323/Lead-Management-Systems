import React, { useState } from 'react';
import api from '../api/api';

const LeadForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    location: '',
    property_type: '',
    source: '',
    notes: '' // ✅ added
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name required";
    if (!form.phone || form.phone.length < 10) err.phone = "Valid phone required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email";
    if (!form.source) err.source = "Source required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    setApiError('');
    setSuccess('');

    if (!validate()) return;

    try {
      const res = await api.post('/addleads', form);

      if (!res.data.success) {
        setApiError(res.data.message);
        return;
      }

      setSuccess("Lead added successfully");

      setForm({
        name: '',
        phone: '',
        email: '',
        budget: '',
        location: '',
        property_type: '',
        source: '',
        notes: '' // ✅ reset
      });

      refresh();

    } catch (err) {
      console.log(err);

      if (err.response) {
        setApiError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        setApiError("Server not responding");
      } else {
        setApiError("Unexpected error");
      }
    }
  };

  return (
    <div className="card">
      <h3>Add Lead</h3>

      {/* 🔥 API ERROR */}
      {apiError && <p className="error">{apiError}</p>}

      {/* ✅ SUCCESS */}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      {errors.name && <p className="error">{errors.name}</p>}

      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      {errors.email && <p className="error">{errors.email}</p>}

      <input name="budget" placeholder="Budget" value={form.budget} onChange={handleChange} />

      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
           
     <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />

      <select name="property_type" value={form.property_type} onChange={handleChange}>
        <option value="">Select Property</option>
        <option value="1BHK">1BHK</option>
        <option value="2BHK">2BHK</option>
        <option value="3BHK">3BHK</option>
        <option value="Plot">Plot</option>
      </select>

      <select name="source" value={form.source} onChange={handleChange}>
        <option value="">Select Source</option>
        <option value="Facebook">Facebook</option>
        <option value="Google">Google</option>
        <option value="Instagram">Instagram</option>
        <option value="Referral">Referral</option>
      </select>
      {errors.source && <p className="error">{errors.source}</p>}


      <button onClick={submit}>Add Lead</button>
    </div>
  );
};

export default LeadForm;