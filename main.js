const button = document.getElementById('addButton');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const completion = document.getElementById('completion');


const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


const getTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks ? tasks : [];
};


const createTaskItem = (taskText, completed = false) => {
    const li = document.createElement('li');
    li.className = 'todo__list-item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    const taskTextElement = document.createElement('span');
    taskTextElement.innerText = taskText;
    li.appendChild(checkbox);
    li.appendChild(taskTextElement);
    list.appendChild(li);

    checkbox.addEventListener('change', () => {
        taskTextElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        saveTasksToLocalStorage(getAllTasks());
        updateCompletion();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        list.removeChild(li);
        saveTasksToLocalStorage(getAllTasks());
        updateCompletion();
    });
};


const getAllTasks = () => {
    const taskElements = document.querySelectorAll('.todo__list-item');
    const tasks = [];
    taskElements.forEach((taskElement) => {
        tasks.push({
            text: taskElement.querySelector('span').innerText,
            completed: taskElement.querySelector('input').checked,
        });
    });
    return tasks;
};

const updateCompletion = () => {
    const tasks = getAllTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
    completion.innerText = `Completion: ${completionPercentage}%`;
};


button.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText !== '') {
        createTaskItem(taskText);
        saveTasksToLocalStorage(getAllTasks());
        input.value = '';
        updateCompletion();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((task) => {
        createTaskItem(task.text, task.completed);
    });
    updateCompletion();
});
