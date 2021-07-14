var getElById = function(id) {
    return document.getElementById(id);
}
var getEl = function(selector) {
    return document.querySelector(selector);
}
var taskService = new TaskService();
var validator = new validator();
var isLoading = false;
var getListTask = function() {
    taskService
        .getListTask()
        .then(function(res) {
            renderTasks(res.data);
            setLocalStorage(res.data);
        }).catch(function(err) {
            alert(err);
        });
}
getListTask();

var addTask = function() {
    if (!validate()) return;
    var taskName = getElById('newTask').value;
    var newTast = new Task(taskName, "todo");
    isLoading = true;
    checkLoading();
    taskService
        .addTask(newTast)
        .then(function(res) {
            alert("Add success !");
            getListTask();
            console.log(res);
        })
        .catch(function(err) {
            alert(err)
        })
        .finally(function() {
            isLoading = false;
            checkLoading();
        });
}

var deleteTask = function(id) {
    var confi = confirm('Are you sure you want to delete this task?');
    if (confi == true) {
        isLoading = true;
        checkLoading();
        taskService
            .deleteTask(id)
            .then(function(res) {

                alert("this task is deleted");
                getListTask();
            })
            .catch(function(err) {

                alert(err)
            })
            .finally(function() {
                isLoading = false;
                checkLoading();
            });;

    }
}
var changeStatus = function(id) {

    isLoading = true;
    checkLoading();
    taskService
        .getTaskById(id)
        .then(function(res) {
            var task = res.data;
            if (task.status === "todo") {
                task.status = "completed";
                alert("change status from todo to completed");
            } else {
                task.status = "todo";
                alert("change status from completed to todo");
            }
            return taskService.updateTask(task);
        })
        .then(function(res) {

            getListTask();
        })
        .catch(function(err) {

            alert(err)
        })
        .finally(function() {
            isLoading = false;
            checkLoading();
        });;
}

function renderTasks(tasks) {
    var contentTodo = '';
    var contentCompleted = '';
    tasks.forEach(el => {
        var itemInner = `<li>
                            <span>${el.name}</span>
                            <div class="buttons">
                            <button class="remove" onclick="deleteTask(${el.id})">
                                <i class="fa fa-trash-alt"></i>
                            </button>
                            <button class="complete" onclick="changeStatus(${el.id})">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-check-circle"></i>
                            </button>
                            </div>
                        </li>`;
        if (el.status === "todo") {
            contentTodo += itemInner;
        } else if (el.status === "completed") {
            contentCompleted += itemInner;
        }
    });
    getElById('todo').innerHTML = contentTodo;
    getElById('completed').innerHTML = contentCompleted;
}

function validate() {
    var isValid = true;
    isValid &= validator.isEmtyTask();
    isValid &= validator.isExistTask();
    return isValid;
}

function checkLoading() {
    var cardBody = getEl(".card .card__body");
    if (isLoading === true) {
        cardBody.innerHTML += `<div class="loader"></div>`;
    } else {
        getEl(".card__body .loader").remove();
    }
}


function setLocalStorage(listTask) {
    localStorage.setItem('listTask', JSON.stringify(listTask));
}

function getLocalStorage() {
    if (localStorage.getItem('listTask')) {
        return JSON.parse(localStorage.getItem('listTask'));
    }
}