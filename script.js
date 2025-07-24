const inputField = document.querySelector("#text-input");
const addBtn = document.querySelector("#add-btn");
const todosContainer = document.querySelector(".todos-container");

// add todo 😎😎
const addTodo = () => {
  if (inputField.value.trim().length == "") {
    alert("Enter text");
    return;
  }

  let inputValue = inputField.value.trim();

  let webtask = localStorage.getItem("localtask");
  if (!webtask) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }

  // create id for task
  let id;
  if (taskObj.length === 0) {
    id = 0;
  } else {
    id = taskObj[taskObj.length - 1].id + 1;
  }
  let value = {
    task: inputValue,
    id: id,
  };
  // adding value to array
  taskObj.push(value);

  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showTask();
  inputField.value = "";
};

// Show task 😎😎
const showTask = () => {
  let webtask = localStorage.getItem("localtask");
  if (!webtask) return;
  let taskObj = JSON.parse(webtask);

  let html = ``;
  taskObj.forEach((item, index) => {
    html += `
 <div class="todo-item-container" data-id="${item.id}">
    <span id="num">${index + 1}.</span>
    <p id="todo-text" ondblclick="enableEdit(${item.id}, '${item.task.replace(/'/g, "\\'")}')">${item.task}</p>
   <button id="delete-btn">
     <img src="images/delete.png" alt="delete" onClick="deleteTask(${item.id})" />
   </button>
</div> `;
  });
  todosContainer.innerHTML = html;

  if (!taskObj.length) {
    todosContainer.innerHTML = "";
  }
};

showTask();
addBtn.addEventListener("click", addTodo);

// edit task

// Enable editing mode for a todo
window.enableEdit = function(id, task) {
  const todoDiv = Array.from(document.querySelectorAll('.todo-item-container')).find(div => div.getAttribute('data-id') == id);
  if (!todoDiv) return;
  const numSpan = todoDiv.querySelector('#num');
  todoDiv.innerHTML = `
    ${numSpan.outerHTML}
    <input type="text" id="edit-input" value="${task}" style="width: 220px; font-size: 18px;" />
    <button id="tick-btn">
      <img src="images/tick.png" alt="save" style="width:30px;height:30px;filter: drop-shadow(0 0 2px #0f0);" />
    </button>
  `;
  const input = todoDiv.querySelector('#edit-input');
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  // Save on tick click
  todoDiv.querySelector('#tick-btn').onclick = function() {
    saveEdit(id);
  };
  // Save on Enter
  input.onkeydown = function(e) {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') showTask();
  };
};

// Save the edited todo
window.saveEdit = function(id) {
  const todoDiv = Array.from(document.querySelectorAll('.todo-item-container')).find(div => div.getAttribute('data-id') == id);
  if (!todoDiv) return;
  const input = todoDiv.querySelector('#edit-input');
  const newValue = input.value.trim();
  if (!newValue) {
    alert('Task cannot be empty');
    return;
  }
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  const idx = taskObj.findIndex(t => t.id == id);
  if (idx !== -1) {
    taskObj[idx].task = newValue;
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask();
  }
};

// Delete Task
const deleteTask = (id) => {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);

  let newTask = taskObj.filter((ele) => {
    return ele.id != id;
  });

  localStorage.setItem("localtask", JSON.stringify(newTask));
  showTask();
};
