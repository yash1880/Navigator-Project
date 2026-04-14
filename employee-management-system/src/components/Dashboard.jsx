function Dashboard({ employees }) {
  const total = employees.length;
  const active = employees.filter((e) => e.status === "Active").length;
  const inactive = total - active;
  const recent = employees[employees.length - 1];
  const avgSalary =
    total > 0
      ? Math.round(employees.reduce((s, e) => s + Number(e.salary), 0) / total)
      : 0;

  return (
    <div className="dashboard">
      <div className="stat-card">
        <div className="stat-label">Total Employees</div>
        <div className="stat-val">{total}</div>
      </div>

      <div className="stat-card stat-active">
        <div className="stat-label">Active</div>
        <div className="stat-val">{active}</div>
        {total > 0 && (
          <div className="stat-sub">{Math.round((active / total) * 100)}% of workforce</div>
        )}
      </div>

      <div className="stat-card">
        <div className="stat-label">Inactive</div>
        <div className="stat-val">{inactive}</div>
      </div>

      <div className="stat-card stat-salary">
        <div className="stat-label">Avg. Salary</div>
        <div className="stat-val">
          {total ? `₹${avgSalary.toLocaleString("en-IN")}` : "—"}
        </div>
      </div>

      <div className="stat-card stat-recent">
        <div className="stat-label">Recently Added</div>
        <div className="stat-val">{recent ? recent.name : "—"}</div>
        {recent && <div className="stat-sub">{recent.department}</div>}
      </div>
    </div>
  );
}

export default Dashboard;
