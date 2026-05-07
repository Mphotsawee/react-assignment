import { useSelector } from 'react-redux';
import { selectStudentCount, selectAverageGpa, selectHighAchievers } from '../features/students/selectors';

function GpaSummary() {
  const count = useSelector(selectStudentCount);
  const average = useSelector(selectAverageGpa);
  const highAchievers = useSelector(selectHighAchievers);

  if (count === 0) return null;

  return (
    <div className="gpa-summary">
      <div className="stat-card">
        <span className="stat-label">Total Students</span>
        <span className="stat-value">{count}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Avg GPA</span>
        <span className="stat-value">{average}</span>
      </div>
      <div className="stat-card highlight">
        <span className="stat-label">High Achievers (≥3.5)</span>
        <span className="stat-value">{highAchievers.length}</span>
      </div>
    </div>
  );
}

export default GpaSummary;
