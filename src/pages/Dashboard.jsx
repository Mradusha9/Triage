import React from 'react';
import StatsCard from '../components/StatsCard';
import { Users, CheckCircle, AlertCircle, Clock } from 'lucide-react';

function Dashboard({ volunteers, tasks, activities }) {

  const totalVolunteers = volunteers.length;
  const activeTasks = tasks.filter(task => task.status === 'Active').length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const highPriorityIssues = tasks.filter(task => task.severity === 'High').length;

  return (
    <div>
      <h1>Dashboard Overview</h1>
      
      <div className="dashboard-grid">
        <StatsCard 
          title="Total Volunteers" 
          value={totalVolunteers} 
          icon={<Users size={24} />} 
          color="var(--primary-color)" 
        />
        <StatsCard 
          title="Active Tasks" 
          value={activeTasks} 
          icon={<Clock size={24} />} 
          color="var(--warning-color)" 
        />
        <StatsCard 
          title="Completed Tasks" 
          value={completedTasks} 
          icon={<CheckCircle size={24} />} 
          color="var(--success-color)" 
        />
        <StatsCard 
          title="High Priority" 
          value={highPriorityIssues} 
          icon={<AlertCircle size={24} />} 
          color="var(--danger-color)" 
        />
      </div>

      <div className="content-grid">
        <div className="card">
          <h2>High Priority Issues</h2>
          {highPriorityIssues === 0 ? (
            <p className="empty-state">No high priority issues right now.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Problem</th>
                    <th>Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks
                    .filter(task => task.severity === 'High' && task.status === 'Active')
                    .map(task => (
                      <tr key={task.id}>
                        <td>{task.area}</td>
                        <td>{task.problem}</td>
                        <td>{task.assignedVolunteer}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <h2>Recent Activity</h2>
          {activities.length === 0 ? (
            <p className="empty-state">No recent activities.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activities.slice(0, 5).map(activity => (
                <div key={activity.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ color: 'var(--primary-color)' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '500' }}>{activity.message}</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
