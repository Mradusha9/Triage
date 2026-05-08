import React from 'react';

function SurveyIssues({ surveys }) {
  const getSeverityBadgeClass = (severity) => {
    if (severity === 'High') return 'badge badge-high';
    if (severity === 'Medium') return 'badge badge-medium';
    return 'badge badge-low';
  };

  return (
    <div>
      <h1>Survey & Issue Reports</h1>

      <div className="card">
        <h2>All Reported Issues</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          This table displays all issues reported via the survey system or automatically generated when creating a task.
        </p>

        {surveys.length === 0 ? (
          <p className="empty-state">No survey issues have been reported yet.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Area / Location</th>
                  <th>Reported Problem</th>
                  <th>Severity</th>
                  <th>People Affected</th>
                </tr>
              </thead>
              <tbody>
                {surveys.map(survey => (
                  <tr key={survey.id}>
                    <td>#{survey.id}</td>
                    <td style={{ fontWeight: '500' }}>{survey.area}</td>
                    <td>{survey.problem}</td>
                    <td>
                      <span className={getSeverityBadgeClass(survey.severity)}>{survey.severity}</span>
                    </td>
                    <td>{survey.peopleAffected}</td>
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

export default SurveyIssues;
