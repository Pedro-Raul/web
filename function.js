
// Carga inicial de tareas del localStorage
const tasks = load() ||[
    { name: "Tarea 1", status: false},// En caso de que no haya nada, carga estas dos tareas
    { name: "Tarea 2", status: true},
];


function addTask(task){
    tasks.push(task)
    render();
}
function deleteTask(index){
    tasks.splice(index, 1);
    render();
}
function toggleTask(index){
    const task = tasks[index];

    tasks[index]= {
        ...task,
        status : !task.status
    }
    render();

}
function save(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
function load(){
    if(!localStorage.getItem("tasks"))return

    return JSON.parse(localStorage.getItem("tasks"))
}
function render(){
    let html="";
    
    for(let i = 0; i < tasks.length; i++){
        const task = tasks[i];

        html += `
        <div class="task">
            <input type="checkbox" onclick="toggleTask(${i})" ${task.status ? "checked" : ""}/>
            <p>${task.name}</p>
            <button onclick="deleteTask(${i})">Borrar</button>
        </div>
        `
    }

    document.querySelector("[tasks-list]").innerHTML = html;
    save();
}
document.querySelector("[form-add-task]").addEventListener("submit", (e) =>{
    e.preventDefault();

    const taskInput = e.target.querySelector("[name=name]")

    const task = {
        name: taskInput.value,
        status: false,
    }
    
    addTask(task)

    taskInput.value = ""; // limpia el input después de agregar

})
document.addEventListener("DOMContentLoaded", render)