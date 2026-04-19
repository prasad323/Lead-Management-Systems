import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Dashboard = () => {
  const [data, setData] = useState({
    total: 0,
    bySource: [],
    byStatus: []
  });

  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await api.get('/dashboard');

    console.log("DASHBOARD API:", res.data);

    const apiData = res.data.data || res.data;

    setData({
      total: apiData.total || 0,
      bySource: apiData.bySource || [],
      byStatus: apiData.byStatus || []
    });

  } catch (err) {
    console.log(err);
  }
};

    fetchData();
  }, []);

  const closed = data.byStatus.find(s => s.status === "Closed")?.count || 0;
  const conversionRate = data.total
    ? ((closed / data.total) * 100).toFixed(1)
    : 0;

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="card">
        <h3>Overview</h3>
        <p><b>Total Leads:</b> {data.total}</p>
        <p><b>Closed Leads:</b> {closed}</p>
        <p><b>Conversion Rate:</b> {conversionRate}%</p>
      </div>

      <div className="card">
        <h3>Leads by Source</h3>

        {data.bySource.length === 0 ? (
          <p>No data</p>
        ) : (
          data.bySource.map((item, i) => (
            <p key={i}>
              <b>{item.source}</b>: {item.count}
            </p>
          ))
        )}
      </div>

      <div className="card">
        <h3>Status Distribution</h3>

        {data.byStatus.length === 0 ? (
          <p>No data</p>
        ) : (
          data.byStatus.map((item, i) =>
            item.status ? (
              <p key={i}>
                <b>{item.status}</b>: {item.count}
              </p>
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;