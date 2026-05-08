export const initialVolunteers = [
  { id: 1, name: "Alice Johnson", skills: "First Aid, Logistics", availability: "Weekends", location: "Downtown" },
  { id: 2, name: "Bob Smith", skills: "Driving, Communication", availability: "Weekdays", location: "North Side" },
  { id: 3, name: "Charlie Brown", skills: "Medical, Counseling", availability: "Evenings", location: "West End" }
];

export const initialTasks = [
  { id: 1, problem: "Water Supply Disruption", area: "Sector 4", severity: "High", peopleAffected: 500, assignedVolunteer: "Alice Johnson", status: "Active" },
  { id: 2, problem: "Road Blockage", area: "Sector 2", severity: "Medium", peopleAffected: 150, assignedVolunteer: "Bob Smith", status: "Completed" },
  { id: 3, problem: "Medical Camp Setup", area: "Sector 7", severity: "High", peopleAffected: 300, assignedVolunteer: "Unassigned", status: "Active" }
];

export const initialSurveys = [
  { id: 1, area: "Sector 4", problem: "Water Supply Disruption", severity: "High", peopleAffected: 500 },
  { id: 2, area: "Sector 2", problem: "Road Blockage", severity: "Medium", peopleAffected: 150 },
  { id: 3, area: "Sector 7", problem: "Need for Medical Camp", severity: "High", peopleAffected: 300 },
  { id: 4, area: "Sector 1", problem: "Power Outage", severity: "Low", peopleAffected: 50 }
];

export const initialActivities = [
  { id: 1, message: "Alice Johnson completed Task: Road Blockage", time: "2 hours ago" },
  { id: 2, message: "New survey reported: Power Outage in Sector 1", time: "4 hours ago" },
  { id: 3, message: "Charlie Brown joined as a Volunteer", time: "1 day ago" }
];
