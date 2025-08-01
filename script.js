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
  // Remove edit mode from any other todo
  document.querySelectorAll('.todo-item-container.edit-mode').forEach(div => {
    div.classList.remove('edit-mode');
    showTask();
  });
  const todoDiv = Array.from(document.querySelectorAll('.todo-item-container')).find(div => div.getAttribute('data-id') == id);
  if (!todoDiv) return;
  const numSpan = todoDiv.querySelector('#num');
  todoDiv.classList.add('edit-mode');
  todoDiv.innerHTML = `
    ${numSpan.outerHTML}
    <textarea id="edit-input" style="resize: vertical; min-height: 40px; font-size: 18px; width: 100%;">${task}</textarea>
    <button id="tick-btn">
      <img src="images/tick.png" alt="save" style="width:30px;height:30px;filter: drop-shadow(0 0 2px #0f0);" />
    </button>
  `;
  const textarea = todoDiv.querySelector('#edit-input');
  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  // Auto-resize textarea
  textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
  textarea.dispatchEvent(new Event('input'));
  // Save on tick click
  todoDiv.querySelector('#tick-btn').onclick = function() {
    saveEdit(id);
  };
  // Save on Enter (with Ctrl+Enter for textarea)
  textarea.onkeydown = function(e) {
    if ((e.key === 'Enter' && e.ctrlKey) || (e.key === 'Enter' && e.metaKey)) saveEdit(id);
    if (e.key === 'Escape') showTask();
  };
};

// Save the edited todo
window.saveEdit = function(id) {
  const todoDiv = Array.from(document.querySelectorAll('.todo-item-container')).find(div => div.getAttribute('data-id') == id);
  if (!todoDiv) return;
  const textarea = todoDiv.querySelector('#edit-input');
  const newValue = textarea.value.trim();
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
