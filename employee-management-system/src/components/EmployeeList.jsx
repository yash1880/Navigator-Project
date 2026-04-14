import EmployeeRow from "./EmployeeRow";

function EmployeeList({ employees, onDelete, onEdit }) {
  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Employee Records</h2>
        <span className="count-badge">{employees.length} total</span>
      </div>

      {employees.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"></div>
          <p>No Employees Found</p>
          <span>Add your first employee using the form.</span>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="emp-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <EmployeeRow
                  key={emp.id}
                  employee={emp}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
