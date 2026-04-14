import { useState, useEffect } from "react";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  department: "",
  salary: "",
  status: "Active",
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(form.phone.trim())) {
    errors.phone = "Phone must be exactly 10 digits";
  }
  if (!form.department) errors.department = "Department is required";
  if (!form.salary) {
    errors.salary = "Salary is required";
  } else if (isNaN(form.salary) || Number(form.salary) <= 0) {
    errors.salary = "Enter a valid salary";
  }
  return errors;
}

function EmployeeForm({ editEmployee, onAdd, onUpdate, onCancelEdit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const isEditMode = !!editEmployee;

  useEffect(() => {
    if (editEmployee) {
      setForm({
        name: editEmployee.name,
        email: editEmployee.email,
        phone: editEmployee.phone,
        department: editEmployee.department,
        salary: String(editEmployee.salary),
        status: editEmployee.status,
      });
      setErrors({});
    } else {
      setForm(INITIAL_FORM);
      setErrors({});
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const data = { ...form, salary: Number(form.salary) };
    if (isEditMode) {
      onUpdate(editEmployee.id, data);
    } else {
      onAdd(data);
    }
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    onCancelEdit();
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>{isEditMode ? "Edit Employee" : "Add Employee"}</h2>
        <span className={`mode-badge ${isEditMode ? "mode-edit" : "mode-add"}`}>
          {isEditMode ? "Edit Mode" : "Add Mode"}
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Yash Bulchandani"
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              className={errors.phone ? "input-error" : ""}
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              className={errors.department ? "input-error" : ""}
            >
              <option value="">Select department</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>HR</option>
              <option>Operations</option>
              <option>Sales</option>
            </select>
            {errors.department && <span className="error-msg">{errors.department}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary (₹)</label>
            <input
              id="salary"
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. 50000"
              className={errors.salary ? "input-error" : ""}
            />
            {errors.salary && <span className="error-msg">{errors.salary}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditMode ? "Update Employee" : "Add Employee"}
          </button>
          {isEditMode && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
