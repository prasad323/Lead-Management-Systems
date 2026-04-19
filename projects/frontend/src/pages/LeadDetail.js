import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';

const LeadDetail = () => {
  const { id } = useParams();
  const [lead, setLead] = useState({});
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  const fetchLead = async () => {
    const res = await api.get(`/${id}`);
    const data = res.data.data;
    const leadObj = Array.isArray(data) ? data[0] : data;

    setLead(leadObj);
    setStatus(leadObj?.status || '');
    setNotes(leadObj?.notes || '');
  };

  const update = async () => {
    if (!status) {
      alert("Status required");
      return;
    }

    await api.put(`/${id}`, { status, notes });
    alert("Updated successfully");
    fetchLead();
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <h2>Lead Detail</h2>

        <p><b>Name:</b> {lead.name}</p>
        <p><b>Phone:</b> {lead.phone}</p>
        <p><b>Email:</b> {lead.email}</p>
        <p><b>Budget:</b> {lead.budget}</p>

        {/* 🔥 FIXED STRUCTURE */}
        <div className="form-row">

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Site Visit">Site Visit</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
            />
          </div>

          <button onClick={update}>Update</button>

        </div>
      </div>
    </div>
  );
};

export default LeadDetail;