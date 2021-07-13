function TaskService() {}
TaskService.prototype.getListTask = function() {
    return axios({
        url: 'https://60edd7b0eb4c0a0017bf4260.mockapi.io/tasks',
        method: 'GET'
    });
}
TaskService.prototype.addTask = function(task) {
    return axios({
        url: 'https://60edd7b0eb4c0a0017bf4260.mockapi.io/tasks',
        method: 'POST',
        data: task,
    });
}
TaskService.prototype.deleteTask = function(id) {
    return axios({
        url: `https://60edd7b0eb4c0a0017bf4260.mockapi.io/tasks/${id}`,
        method: 'DELETE',
    });
}
TaskService.prototype.getTaskById = function(id) {
    return axios({
        url: `https://60edd7b0eb4c0a0017bf4260.mockapi.io/tasks/${id}`,
        method: 'GET',
    });
}
TaskService.prototype.updateTask = function(task) {
    return axios({
        url: `https://60edd7b0eb4c0a0017bf4260.mockapi.io/tasks/${task.id}`,
        method: 'PUT',
        data: task,
    });
}