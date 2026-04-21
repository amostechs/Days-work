const API = "http://YOUR-SERVER-IP/api/tasks";

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

async function loadTasks() {
  const todayRes = await fetch(API + "/get_today.php");
  const today = await todayRes.json();

  const unRes = await fetch(API + "/get_uncompleted.php");
  const uncompleted = await unRes.json();

  document.getElementById("today").innerHTML =
    today.map(t => `<li>${t.title} <button onclick="complete(${t.id})">✔</button></li>`).join("");

  document.getElementById("uncompleted").innerHTML =
    uncompleted.map(t => `<li>${t.title}</li>`).join("");
}

async function complete(id) {
  await fetch(API + "/update.php", {
    method: "PUT",
    body: JSON.stringify({ id, status: "completed" }),
  });

  loadTasks();
}

loadTasks();
