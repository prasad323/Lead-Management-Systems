
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LeadTable = ({ leads }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>Leads List</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Budget</th>
            <th>Location</th>
            <th>Property Type</th>
            <th>Source</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr><td colSpan="6">No Leads Found</td></tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id} onClick={() => navigate(`/lead/${lead.id}`)}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.budget}</td>
                <td>{lead.location}</td>
                <td>{lead.property_type}</td>
                <td>{lead.source}</td>
                <td>{lead.status}</td>
                <td>{lead.notes}</td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;