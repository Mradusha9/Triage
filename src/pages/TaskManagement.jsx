import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

function TaskManagement({ tasks, setTasks, volunteers, surveys, setSurveys, showToast, addActivity }) {
  const [formData, setFormData] = useState({
    problem: '',
    area: '',
    severity: 'Medium',
    peopleAffected: '',
    assignedVolunteer: 'Unassigned',
    status: 'Active'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.problem || !formData.area || !formData.peopleAffected) {
      showToast('Please fill in required fields.');
      return;
    }

    const newTask = {
      id: Date.now(),
      ...formData,
      peopleAffected: parseInt(formData.peopleAffected, 10)
    };

    // 1. Create task
    setTasks([newTask, ...tasks]);
    
    // 2. Automatically create a related survey issue
    const newSurvey = {
      id: Date.now() + 1, // Ensure unique ID
      area: formData.area,
      problem: formData.problem,
      severity: formData.severity,
      peopleAffected: parseInt(formData.peopleAffected, 10)
    };
    setSurveys([newSurvey, ...surveys]);

    showToast('Task created and issue reported successfully!');
    addActivity(`New task created: ${formData.problem} in ${formData.area}`);
    
    // Reset form
    setFormData({
      problem: '',
      area: '',
      severity: 'Medium',
      peopleAffected: '',
      assignedVolunteer: 'Unassigned',
      status: 'Active'
    });
  };

  const handleStatusChange = (id, newStatus, problem) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    if (newStatus === 'Completed') {
      showToast('Task marked as completed!');
      addActivity(`Task completed: ${problem}`);
    }
  };

  const handleAssignVolunteer = (id, volunteerName, problem) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, assignedVolunteer: volunteerName } : task
    );
    setTasks(updatedTasks);
    showToast(`Volunteer assigned to task.`);
    addActivity(`${volunteerName} assigned to task: ${problem}`);
  };

  const handleDelete = (id, problem) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    showToast('Task deleted.');
    addActivity(`Task deleted: ${problem}`);
  };

  const getSeverityBadgeClass = (severity) => {
    if (severity === 'High') return 'badge badge-high';
    if (severity === 'Medium') return 'badge badge-medium';
    return 'badge badge-low';
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'Active') return 'badge badge-active';
    return 'badge badge-completed';
  };

  return (
    <div>
      <h1>Task Management</h1>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label>Problem Description</label>
              <input 
                type="text" 
                name="problem" 
                value={formData.problem} 
                onChange={handleChange} 
                placeholder="e.g. Broken Water Pipe"
              />
            </div>
            <div className="form-group">
              <label>Area / Location</label>
              <input 
                type="text" 
                name="area" 
                value={formData.area} 
                onChange={handleChange} 
                placeholder="e.g. Sector 4"
              />
            </div>
            <div className="form-group">
              <label>Severity</label>
              <select name="severity" value={formData.severity} onChange={handleChange}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label>People Affected (Approx)</label>
              <input 
                type="number" 
                name="peopleAffected" 
                value={formData.peopleAffected} 
                onChange={handleChange} 
                placeholder="e.g. 50"
              />
            </div>
            <div className="form-group">
              <label>Assign Volunteer</label>
              <select name="assignedVolunteer" value={formData.assignedVolunteer} onChange={handleChange}>
                <option value="Unassigned">Unassigned</option>
                {volunteers.map(v => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Create Task & Report Issue
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks available.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Area</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td style={{ fontWeight: '500' }}>{task.problem}</td>
                    <td>{task.area}</td>
                    <td>
                      <span className={getSeverityBadgeClass(task.severity)}>{task.severity}</span>
                    </td>
                    <td>
                      <select 
                        value={task.status} 
                        onChange={(e) => handleStatusChange(task.id, e.target.value, task.problem)}
                        style={{ padding: '0.25rem', width: 'auto' }}
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <select 
                        value={task.assignedVolunteer} 
                        onChange={(e) => handleAssignVolunteer(task.id, e.target.value, task.problem)}
                        style={{ padding: '0.25rem', width: 'auto' }}
                      >
                        <option value="Unassigned">Unassigned</option>
                        {volunteers.map(v => (
                          <option key={v.id} value={v.name}>{v.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger btn-icon" 
                        onClick={() => handleDelete(task.id, task.problem)}
                        title="Delete Task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskManagement;
