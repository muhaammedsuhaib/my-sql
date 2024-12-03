const API_URL = 'http://localhost:5000/api/tasks';


const taskList = document.getElementById('tasks');
const taskForm = document.getElementById('task-form');
const updateForm = document.getElementById('update-form');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const updateTitle = document.getElementById('update-title');
const updateDescription = document.getElementById('update-description');
const updateTaskSection = document.getElementById('update-task');


async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  renderTasks(tasks);
}


function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.data.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <div>
        <strong>${task.title}</strong><br />
        ${task.description}
      </div>
      <div class="task-actions">
        <button onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newTask = {
    title: taskTitle.value,
    description: taskDescription.value,
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  taskTitle.value = '';
  taskDescription.value = '';
  fetchTasks();
});

function editTask(id, title, description) {
  updateTitle.value = title;
  updateDescription.value = description;
  updateTaskSection.style.display = 'block';
  updateForm.onsubmit = (event) => updateTask(event, id);
}

async function updateTask(event, id) {
  event.preventDefault();

  const updatedTask = {
    title: updateTitle.value,
    description: updateDescription.value,
    completed: true,
  };

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });

  updateTaskSection.style.display = 'none';
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  fetchTasks();
}

fetchTasks();
