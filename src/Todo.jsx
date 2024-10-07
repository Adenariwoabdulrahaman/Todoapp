import { useEffect, useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTask, setNewTask] = useState('');
  const [firstVisit, setFirstVisit] = useState(true);

  const filteredTodos = todos.filter(todo =>
    todo.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
      setFirstVisit(false); 
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTask.trim() === '') return;

    const newTodo = {
      id: todos.length + 1,
      task: newTask,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTask('');
    setFirstVisit(false);  
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="centered-div">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Add task"
          className="task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodo} className="add-button">
          Add
        </button>
      </div>
      <ul>
        {firstVisit && todos.length === 0 && (
          <li className="info">📝 Please enter a new task</li>
        )}
        {!firstVisit && filteredTodos.length > 0 && filteredTodos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
        {!firstVisit && searchQuery && filteredTodos.length === 0 && (
          <li className="error">❌ No tasks found</li>
        )}
      </ul>
    </div>
  );
};

export default TodoApp;

