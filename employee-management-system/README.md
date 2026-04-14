# Employee Management System

A React-based offline CRUD application for managing employee records with localStorage persistence.

## Features
- Add, Edit, Delete employee records
- Dashboard with total/active/inactive/average salary stats
- Form validation (email, phone, salary)
- Confirmation prompt before deletion
- Data persists in localStorage (no backend needed)

## Components

| Component | Responsibility |
|---|---|
| `App.jsx` | Central state, localStorage sync, event handlers |
| `Dashboard.jsx` | Summary stats (total, active, inactive, avg salary, last added) |
| `EmployeeForm.jsx` | Add/Edit form with validation, switches between Add Mode and Edit Mode |
| `EmployeeList.jsx` | Renders the table, handles empty state |
| `EmployeeRow.jsx` | Individual row with Edit/Delete buttons and delete confirmation |

## How to Run

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## Marking Scheme Coverage
- **Events + Handlers (2)** — onChange, onSubmit, onClick throughout all components
- **Conditional Rendering (2)** — Add/Edit mode toggle, empty state, error messages, delete confirmation
- **LocalStorage Operations (2)** — Read on load, write on every state change, clear all
- **Argument Passing + List Rendering (2)** — deleteEmployee(id), startEdit(id), updateEmployee(id), clearAllEmployees()
- **GitHub + README + Screenshots (2)** — This README

## Screenshots
Add screenshots of:
1. Add Employee Form
2. Employee List Table
3. Edit Employee Mode
4. Delete Confirmation
5. localStorage in DevTools (Application > Local Storage > `ems_employees`)
