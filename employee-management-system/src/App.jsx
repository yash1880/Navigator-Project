import { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Dashboard from "./components/Dashboard";
import "./App.css";

const STORAGE_KEY = "ems_employees";

function App() {
  const [employees, setEmployees] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (data) => {
    setEmployees((prev) => [...prev, { ...data, id: Date.now() }]);
  };
  const updateEmployee = (id, data) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
    setEditEmployee(null);
  };
  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };
  const startEdit = (id) => setEditEmployee(employees.find((e) => e.id === id) || null);
  const cancelEdit = () => setEditEmployee(null);
  const clearAllEmployees = () => { setEmployees([]); setEditEmployee(null); };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="header-icon">👥</span>
          <h1>Employee Management System</h1>
        </div>
        {employees.length > 0 && (
          <button className="btn-clear-all" onClick={clearAllEmployees}>
            Clear All Records
          </button>
        )}
      </header>

      <main className="app-main">
        <Dashboard employees={employees} />
        <div className="content-grid">
          <section>
            <EmployeeForm
              editEmployee={editEmployee}
              onAdd={addEmployee}
              onUpdate={updateEmployee}
              onCancelEdit={cancelEdit}
            />
          </section>
          <section>
            <EmployeeList employees={employees} onDelete={deleteEmployee} onEdit={startEdit} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
