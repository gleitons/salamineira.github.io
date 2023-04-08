function addTask() {
    const taskTitle = document.querySelector('#task-title').value;
   
    if(taskTitle){
       const template = document.querySelector('.template')
       const newTemplate = template.cloneNode(true)

       newTemplate.querySelector('.task-title').textContent = taskTitle
       newTemplate.classList.remove('template')
       newTemplate.classList.remove('hide')

       const list = document.querySelector('#task-list')
       list.appendChild(newTemplate)

       const finalBtn = newTemplate.querySelector('.done-btn').addEventListener('click', function()  {
        concluidaTask(this)
       })

       const removeBtn = newTemplate.querySelector('.remove-btn').addEventListener('click', function()  {
        removeTask(this)
       })
       document.querySelector('#task-title').value = ''

       
       
      
    } 
}
function concluidaTask(task) {
    task.parentNode.classList.toggle('done')
}

function removeTask(task) {
    task.parentNode.remove(true)
    
}

const addButton = document.querySelector('#add-btn');
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask()
})