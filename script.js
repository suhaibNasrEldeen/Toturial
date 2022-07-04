//vars
let input = document.querySelector(".input");
let sub = document.querySelector(".sub");
let tasks = document.querySelector(".tasks");
let deleteAll = document.querySelector(".delete-all");

//arrays
let taskArr = [];
if (localStorage.getItem("tasks")) {
  taskArr = JSON.parse(window.localStorage.getItem("tasks"));
}
getDataFromLocal();

//add tasks
deleteAll.onclick = function () {
  tasks.innerHTML = "";
  window.localStorage.removeItem("tasks");
};

window.onload = () => input.focus();
input.onblur = () => {
  sub.click();
  input.focus();
};
sub.onclick = () => {
  if (input.value.trim() !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};
//click on task element
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
    // console.log(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    //toggle in local storage
    localToggle(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTaskToArray(el) {
  const task = {
    id: Date.now(),
    title: el,
    completed: false,
  };
  taskArr.push(task);
  addElementsToPageFrom(taskArr);
  //add data to local storage
  addDataToLocal(taskArr);
}
function addElementsToPageFrom(taskArr) {
  //empty tasks div
  tasks.innerHTML = "";
  //   make task
  taskArr.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    //check if task is done
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let del = document.createElement("span");
    del.className = "del";
    del.appendChild(document.createTextNode("delete"));
    div.appendChild(del);
    // console.log(div);
    tasks.append(div);
  });
}
function addDataToLocal(taskArr) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArr));
}
function getDataFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
function deleteTaskWith(taskId) {
  // for (let i = 0; i < taskArr.length; i++) {
  //   console.log(`${taskArr[i].id} ==== ${taskId}`);
  // }
  taskArr = taskArr.filter((el) => el.id != taskId);
  addDataToLocal(taskArr);
}
function localToggle(taskId) {
  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].id == taskId) {
      taskArr[i].completed == false
        ? (taskArr[i].completed = true)
        : (taskArr[i].completed = false);
    }
  }
  addDataToLocal(taskArr);
}
