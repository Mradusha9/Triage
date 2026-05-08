import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

function VolunteerManagement({ volunteers, setVolunteers, showToast, addActivity }) {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    availability: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.skills || !formData.availability || !formData.location) {
      showToast('Please fill in all fields.');
      return;
    }

    const newVolunteer = {
      id: Date.now(),
      ...formData
    };

    setVolunteers([...volunteers, newVolunteer]);
    showToast('Volunteer added successfully!');
    addActivity(`${formData.name} joined as a Volunteer`);
    
    // Reset form
    setFormData({ name: '', skills: '', availability: '', location: '' });
  };

  const handleDelete = (id, name) => {
    const updatedVolunteers = volunteers.filter(v => v.id !== id);
    setVolunteers(updatedVolunteers);
    showToast('Volunteer removed.');
    addActivity(`Volunteer ${name} was removed`);
  };

  return (
    <div>
      <h1>Volunteer Management</h1>

      <div className="content-grid">
        <div className="card">
          <h2>Add New Volunteer</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input 
                type="text" 
                name="skills" 
                value={formData.skills} 
                onChange={handleChange} 
                placeholder="e.g. First Aid, Driving, Logistics"
              />
            </div>
            <div className="form-group">
              <label>Availability</label>
              <select name="availability" value={formData.availability} onChange={handleChange}>
                <option value="">Select availability</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
                <option value="Anytime">Anytime</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Enter area/sector"
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Volunteer</button>
          </form>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h2>Volunteer Roster</h2>
          {volunteers.length === 0 ? (
            <p className="empty-state">No volunteers found.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Skills</th>
                    <th>Availability</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map(volunteer => (
                    <tr key={volunteer.id}>
                      <td style={{ fontWeight: '500' }}>{volunteer.name}</td>
                      <td>{volunteer.skills}</td>
                      <td>{volunteer.availability}</td>
                      <td>{volunteer.location}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-icon" 
                          onClick={() => handleDelete(volunteer.id, volunteer.name)}
                          title="Remove Volunteer"
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
    </div>
  );
}

export default VolunteerManagement;
