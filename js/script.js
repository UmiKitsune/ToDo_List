const addItemForm = document.querySelector('#newTaskForm');
const addNewTaskInput = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#list-group');


getLocalStorage();


addItemForm.addEventListener('submit', addNewTask);
tasksList.addEventListener('click', deleteAndReady);


function addNewTask(event) {

  event.preventDefault();

  const taskText = addNewTaskInput.value;
  const taskHTML =
    `<li class="list-item">
    <span class="task-title">${taskText}</span>
    <div>
      <button type="button" data-action="ready" class="btn-ready">Готово</button>
      <button type="button" data-action="delete-task" class="btn-delete">Удалить</button>
    </div>
  </li>`;

  tasksList.insertAdjacentHTML('afterbegin', taskHTML);

  toggleEmptyListItem();

  addNewTaskInput.value = '';
  addNewTaskInput.focus();

  saveLocalStorage();
  
}

function toggleEmptyListItem() {

  if (tasksList.children.length > 1) {
    document.querySelector('#empty-list-item').style.display = "none";
  } else {
    document.querySelector('#empty-list-item').style.display = "block";
  }
}

function deleteAndReady(event) {

  if(event.target.getAttribute('data-action') =='delete-task') {

    event.target.closest('.list-item').remove();

    toggleEmptyListItem(); 
    saveLocalStorage();
    
  } else if(event.target.getAttribute('data-action') =='ready') {

      const perentLi = event.target.closest('li.list-item');

      perentLi.querySelector('.task-title').classList.add('task-title--done');

      perentLi.querySelector('.task-title').setAttribute('contenteditable', 'false');

      perentLi.querySelector('.task-title').style.color = "#969696";

      tasksList.insertAdjacentElement('beforeend', perentLi);

      perentLi.querySelector('button[data-action="ready"]').remove();

      saveLocalStorage();

  }

}

function saveLocalStorage() {
  localStorage.setItem('toDoList', tasksList.innerHTML);
}

function getLocalStorage() {
  if(localStorage.getItem('toDoList')) {
    tasksList.innerHTML = localStorage.getItem('toDoList');
  }

  toggleEmptyListItem();
}