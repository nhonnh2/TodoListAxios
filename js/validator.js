function validator() {
    this.isEmtyTask = function() {
        var value = getElById('newTask').value;
        if (value === '') {
            alert(" task is emty");
            return false;
        }
        return true;
    }
    this.isExistTask = function() {
        var tasks = getLocalStorage();
        var name = getElById('newTask').value; {
            var findTaskName = tasks.findIndex(function(task) {
                return name === task.name;
            });
            if (findTaskName !== -1) {
                alert(" task is exist in list");
                return false;
            }
            return true;
        }
    }
}