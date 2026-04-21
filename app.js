const API = "http://192.168.44.133/api/tasks";

async function addTask() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const priority = document.getElementById("priority").value;

  await fetch(API + "/create.php", {
    method: "POST",
    body: JSON.stringify({ title, due_date: date, priority }),
  });

  loadTasks();
}

function renderTasks(list, elementId) {
  document.getElementById(elementId).innerHTML =
    list.map(t => `
      <li class="${t.priority} ${t.status === 'completed' ? 'completed' : ''}">
        <span>${t.title}</span>
        <button onclick="complete(${t.id})">✔</button>
      </li>
    `).join("");
}

async function loadTasks() {
  const today = await fetch(API + "/get_today.php").then(r => r.json());
  const uncompleted = await fetch(API + "/get_uncompleted.php").then(r => r.json());

  renderTasks(today, "today");
  renderTasks(uncompleted, "uncompleted");
}

async function complete(id) {
  await fetch(API + "/update.php", {
    method: "PUT",
    body: JSON.stringify({ id, status: "completed" }),
  });

  loadTasks();
}

loadTasks();
