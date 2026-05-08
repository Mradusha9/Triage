import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, AlertTriangle } from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        NGO Triage
      </div>
      <div className="sidebar-nav">
        <Link to="/" className={isActive('/')}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/volunteers" className={isActive('/volunteers')}>
          <Users size={20} />
          Volunteers
        </Link>
        <Link to="/tasks" className={isActive('/tasks')}>
          <CheckSquare size={20} />
          Tasks
        </Link>
        <Link to="/survey" className={isActive('/survey')}>
          <AlertTriangle size={20} />
          Survey Issues
        </Link>
      </div>
      <div>
        <h1>Hello</h1>
      </div>
    </div>
  );
}

export default Sidebar;
