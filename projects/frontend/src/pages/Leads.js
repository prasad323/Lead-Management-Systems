import React, { useEffect, useState } from 'react';
import api from '../api/api';
import LeadForm from '../components/LeadForm';
import LeadTable from '../components/LeadTable';

const Leads = () => {
  const [leads, setLeads] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('');

  // 🔥 FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await api.get('/getleads', {
        params: { search, source, status, sort, page }
      });

      console.log("API RESPONSE:", res.data);

      const data = res.data?.data || res.data;

      setLeads(Array.isArray(data) ? data : []);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.log("Error fetching leads:", err);
      setLeads([]);
    }
  };

  // ✅ LOAD DATA
  useEffect(() => {
    fetchLeads();
  }, [search, source, status, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [search, source, status, sort]);

  return (
    <div className="container">
      <h2>Lead Management System</h2>

      <LeadForm refresh={fetchLeads} />

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search by name or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎯 SOURCE FILTER */}
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">All Sources</option>
        <option value="instagram">Instagram</option>
        <option value="Facebook">Facebook</option>
        <option value="Google">Google</option>
        <option value="Referral">Referral</option>
      </select>

      {/* 🎯 STATUS FILTER */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Site Visit">Site Visit</option>
        <option value="Closed">Closed</option>
      </select>

      {/* 🔽 SORT */}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by Latest</option>
        <option value="budget">Sort by Budget</option>
      </select>

      <LeadTable leads={leads} />

      {/* 🔥 PAGINATION */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leads;