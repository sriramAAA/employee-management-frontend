import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api/employees";

const emptyForm = {
  name: "",
  email: "",
  department: "",
  salary: "",
};

async function fetchEmployees() {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Unable to load employees");
  }

  return response.json();
}

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const monthlyPayroll = employees.reduce(
    (total, employee) => total + Number(employee.salary || 0),
    0
  );

  async function loadEmployees() {
    try {
      setEmployees(await fetchEmployees());
      setError("");
    } catch {
      setError("Backend connect aagala. Spring Boot check pannunga.");
    }
  }

  useEffect(() => {
    let ignore = false;

    void fetchEmployees()
      .then((data) => {
        if (!ignore) {
          setEmployees(data);
          setError("");
        }
      })
      .catch(() => {
        if (!ignore) {
          setError("Backend connect aagala. Spring Boot check pannunga.");
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        editId === null ? API : `${API}/${editId}`,
        {
          method: editId === null ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            salary: Number(form.salary),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to save employee");
      }

      setForm(emptyForm);
      setEditId(null);
      await loadEmployees();
    } catch {
      setError("Employee save panna mudiyala. Please try again.");
    }
  }

  function handleEdit(employee) {
    setEditId(employee.id);

    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: String(employee.salary),
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this employee?")) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete employee");
      }

      await loadEmployees();
    } catch {
      setError("Employee delete panna mudiyala.");
    }
  }

  function cancelEdit() {
    setEditId(null);
    setForm(emptyForm);
  }

  return (
    <main className="container">
      <header className="header">
        <div className="header-copy">
          <p className="eyebrow">People operations</p>
          <h1>Employee directory</h1>
          <p className="header-description">
            Manage your team and keep employee details up to date.
          </p>
        </div>
        <div className="header-mark" aria-hidden="true">
          ED
        </div>
      </header>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <section className="overview" aria-label="Team overview">
        <article className="metric-card">
          <span className="metric-label">Team members</span>
          <strong className="metric-value">{employees.length}</strong>
        </article>
        <article className="metric-card">
          <span className="metric-label">Monthly payroll</span>
          <strong className="metric-value">
            ₹{monthlyPayroll.toLocaleString("en-IN")}
          </strong>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>{editId === null ? "Add an employee" : "Edit employee"}</h2>
            <p className="panel-description">
              {editId === null
                ? "Enter the details below to add someone to your team."
                : "Update the employee details and save your changes."}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="field">
            <label htmlFor="employee-name">Full name</label>
            <input
              id="employee-name"
              name="name"
              placeholder="e.g. Aditi Sharma"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="employee-email">Work email</label>
            <input
              id="employee-email"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="employee-department">Department</label>
            <input
              id="employee-department"
              name="department"
              placeholder="e.g. Engineering"
              value={form.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="employee-salary">Monthly salary (₹)</label>
            <input
              id="employee-salary"
              name="salary"
              type="number"
              min="0"
              placeholder="e.g. 75000"
              value={form.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">
              {editId === null ? "Add employee" : "Save changes"}
            </button>

            {editId !== null && (
              <button type="button" className="secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="list-heading">
          <div>
            <h2>All employees</h2>
            <p className="panel-description">Your team directory and details.</p>
          </div>
          <span className="employee-count">
            {employees.length}{" "}
            {employees.length === 1 ? "employee" : "employees"}
          </span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td className="employee-name">{employee.name}</td>
                  <td className="employee-email">{employee.email}</td>
                  <td>{employee.department}</td>
                  <td className="salary">
                    ₹{Number(employee.salary).toLocaleString("en-IN")}
                  </td>
                  <td className="actions">
                    <button
                      type="button"
                      className="edit"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty">
                    No employees yet. Add your first team member using the form
                    above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;