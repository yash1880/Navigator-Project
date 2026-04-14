import { useState } from "react";

const DEPT_COLORS = {
  Engineering: "#e0f2fe|#0369a1",
  Design: "#fae8ff|#7e22ce",
  Marketing: "#fef9c3|#854d0e",
  Finance: "#dcfce7|#166534",
  HR: "#ffe4e6|#9f1239",
  Operations: "#ffedd5|#9a3412",
  Sales: "#e0f2fe|#075985",
};

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

function EmployeeRow({ employee, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { id, name, email, phone, department, salary, status } = employee;
  const [bg, fg] = (DEPT_COLORS[department] || "#f1f5f9|#475569").split("|");

  if (confirmDelete) {
    return (
      <tr className="confirm-row">
        <td colSpan={7}>
          <div className="confirm-box">
            <span>
              Delete <strong>{name}</strong>? This cannot be undone.
            </span>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
              <button className="btn-delete-confirm" onClick={() => onDelete(id)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <div className="emp-cell">
          <div
            className="avatar"
            style={{ background: bg, color: fg }}
          >
            {getInitials(name)}
          </div>
          <div>
            <div className="emp-name">{name}</div>
            <div className="emp-dept">{department}</div>
          </div>
        </div>
      </td>
      <td className="text-muted">{email}</td>
      <td className="text-muted">{phone}</td>
      <td>₹{Number(salary).toLocaleString("en-IN")}</td>
      <td>
        <span className={`status-badge ${status === "Active" ? "badge-active" : "badge-inactive"}`}>
          {status}
        </span>
      </td>
      <td>
        <div className="row-actions">
          <button className="btn-edit" onClick={() => onEdit(id)}>
             Edit
          </button>
          <button className="btn-delete" onClick={() => setConfirmDelete(true)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeRow;
