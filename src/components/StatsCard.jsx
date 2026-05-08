import React from 'react';

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          backgroundColor: color, 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{title}</h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
