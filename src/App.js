import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Button from "./Components/Button";
import AddTask from "./Components/AddTask";
import Tasks from "./Components/Tasks";
import About from "./Components/About";

function App() {
  const taskList = [];
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState(taskList);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks");
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const formHandler = () => {
    setShowForm(!showForm);
  };

  //Submit Form
  const addTaskHandler = async (task) => {
    const res = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([data, ...tasks]);

    // const id = Math.floor(Math.random() * 100000);
    // const newTask = { id, ...task };
    // setTasks([newTask, ...tasks]);
  };
  // Delete Function
  const deleteHandler = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Function
  const toggleHandler = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Button
                  color={!showForm ? "green" : "red"}
                  text="Add New Task"
                  onAdd={formHandler}
                >
                  {!showForm ? "Add New Task" : "Close"}
                </Button>
                {showForm && <AddTask onAddTask={addTaskHandler} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteHandler}
                    onToggle={toggleHandler}
                  />
                ) : (
                  "No Task to Do!"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
