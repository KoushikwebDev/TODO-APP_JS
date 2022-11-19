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
 <div class="todo-item-container">
    <span id="num">${index + 1}.</span>
    <p id="todo-text">${item.task}</p>
   <button id="delete-btn">
     <img src="images/delete.png" alt="delete" onClick="deleteTask(${
       item.id
     })" />
   </button>
</div> `;
    todosContainer.innerHTML = html;
  });

  if (!taskObj.length) {
    todosContainer.innerHTML = "";
  }
};

showTask();
addBtn.addEventListener("click", addTodo);

// edit task

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
