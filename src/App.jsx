import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import VolunteerManagement from './pages/VolunteerManagement';
import TaskManagement from './pages/TaskManagement';
import SurveyIssues from './pages/SurveyIssues';

import { initialVolunteers, initialTasks, initialSurveys, initialActivities } from './dummyData';

function App() {

  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('triage_volunteers');
    return saved ? JSON.parse(saved) : initialVolunteers;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('triage_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [surveys, setSurveys] = useState(() => {
    const saved = localStorage.getItem('triage_surveys');
    return saved ? JSON.parse(saved) : initialSurveys;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('triage_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [toastMessage, setToastMessage] = useState('');


  useEffect(() => {
    localStorage.setItem('triage_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('triage_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('triage_surveys', JSON.stringify(surveys));
  }, [surveys]);

  useEffect(() => {
    localStorage.setItem('triage_activities', JSON.stringify(activities));
  }, [activities]);

  
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000); 
  };


  const addActivity = (message) => {
    const newActivity = {
      id: Date.now(),
      message: message,
      time: 'Just now'
    };
    setActivities([newActivity, ...activities]);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  volunteers={volunteers}
                  tasks={tasks}
                  activities={activities}
                />
              } 
            />
            <Route 
              path="/volunteers" 
              element={
                <VolunteerManagement 
                  volunteers={volunteers} 
                  setVolunteers={setVolunteers}
                  showToast={showToast}
                  addActivity={addActivity}
                />
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <TaskManagement 
                  tasks={tasks}
                  setTasks={setTasks}
                  volunteers={volunteers}
                  surveys={surveys}
                  setSurveys={setSurveys}
                  showToast={showToast}
                  addActivity={addActivity}
                />
              } 
            />
            <Route 
              path="/survey" 
              element={
                <SurveyIssues 
                  surveys={surveys}
                />
              } 
            />
          </Routes>
        </div>
      </div>
      
  
      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
