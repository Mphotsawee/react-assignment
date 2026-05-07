import './App.css';
import StudentTable from './components/StudentTable';
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>
        <p>Student Academic Performance Tracker — Session 2 Redux Integration</p>
      </header>
      <main className="app-main">
        <GpaSummary />
        <AddStudentForm />
        <StudentTable />
      </main>
    </div>
  );
}

export default App;
