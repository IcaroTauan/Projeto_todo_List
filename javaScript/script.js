const todoForm =document.querySelector('#todo-form');
const todoinput =document.querySelector('#todo-input');
const todoList =document.querySelector('.todo-list');
const editeForm =document.querySelector('#edite-form');
const editeInput =document.querySelector('#edit-input');
const cancelEditBtn =document.querySelector('#cancel-edit-btn');
const searchInput =document.querySelector('#search-input');
const eraseButton =document.querySelector('#erase-button');
const filterSelect =document.querySelector('#filter-select')


let oldInputValue;
const saveTodo = (text, done = 0 , save = 1)=>{
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoTittle= document.createElement('h3');
  todoTittle.innerText = text;
  todo.appendChild(todoTittle);
  
  const doneBtn = document.createElement('button');
  doneBtn.classList.add('finish-todo');
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement('button');
  editBtn.classList.add('Edit-tudo');
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('remove-todo');
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);
// utilizando dados da localStorage
if(done){
  todo.classList.add('done')
}
if(save){
 //saveTodoLocalStorage({text,done})
}
  todoList.appendChild(todo)
  todoinput.value = ''
  todoinput.focus();
}
todoForm.addEventListener('submit',(e)=>{
    e.preventDefault();
  const inputValue = todoinput.value;
 
  if(inputValue){
saveTodo(inputValue)  }
})
const getsearchTodo = (search)=>{
  const todos = document.querySelectorAll('.todo');
  todos.forEach((todo)=>{
    const todoTitle = todo.querySelector('h3').innerText.toLowerCase();
    const normalizaSearch = search.toLowerCase();
    
    todo.style.display = 'flex';

    if(!todoTitle.includes(normalizaSearch)){
      todo.style.display = 'none'
    }
   
  })
}
const toggleForms = ()=>{
  todoForm.classList.toggle('hide');
  editeForm.classList.toggle('hide');
  todoList.classList.toggle('hide');
}
const updatetodo = (text)=>{
  const todos = document.querySelectorAll('.todo');
  todos.forEach((todo)=>{

    let todotitle = todo.querySelector('h3');
    let tittleTitle = todotitle;
    
    if(tittleTitle.innerText === oldInputValue){
      todotitle.innerText = text;
    }
  })

}
const filterTodos = (filterValue)=>{
  const todos = document.querySelectorAll('.todo');

  switch(filterValue){
    case 'all':
      todos.forEach((todo)=>todo.style.display='flex')
      break
    
    case 'done':
        todos.forEach((todo)=> 
        todo.classList.contains('done')
        ? (todo.style.display='flex')
        : (todo.style.display='none') );
        break 
    case 'todo':
          todos.forEach((todo)=> 
          !todo.classList.contains('done')
          ? (todo.style.display='flex')
          : (todo.style.display='none') );
          break
    default:
      break;      
  }
}
cancelEditBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  toggleForms();
})

document.addEventListener('click',(e)=>{
  const eltarget = e.target;
  const parents = eltarget.closest('div');
  let title;
  if(parents && parents.querySelector('h3')){
    title = parents.querySelector('h3').innerText;
  }

  if(eltarget.classList.contains('finish-todo')){
    parents.classList.toggle('done');
   // updateTodoStatusLocalStorage(title);
  }
  if(eltarget.classList.contains('Edit-tudo')){
    toggleForms()
    editeInput.value = title;
    oldInputValue = title

  }

  if(eltarget.classList.contains('remove-todo')){
    parents.remove();
    //removeTodoLocalStorage(title);
  }
})


editeForm.addEventListener('submit', (e)=>{
  
  e.preventDefault()
  
 
 const editeInputvalue = editeInput.value;
 if(editeInputvalue){
  updatetodo(editeInputvalue);
 }
 toggleForms()
 
})

searchInput.addEventListener('keyup', (e)=>{
  const search = e.target.value;

  getsearchTodo(search);
}
)

eraseButton.addEventListener('click',(e)=>{
  e.preventDefault();
  searchInput.value = '';
  searchInput.dispatchEvent(new Event('keyup'));

})
filterSelect.addEventListener('change', (e)=>{
 const filterValue = e.target.value;

 filterTodos(filterValue);
})
// local storage
 /* const getTodosLocalStorage = ()=>{
  const todos = JSON.parse(localStorage.getItem('todos'))|| [];
  return todos;
 }

const loadTodos = ()=>{
  const todos = getTodosLocalStorage()
  todos.forEach((todo)=>{
    saveTodo(todo.text, todo.done, 0);
  })
}

const saveTodoLocalStorage = (todo)=>{
  const todos = getTodosLocalStorage()

  todos.push(todo)

  localStorage.setItem('todos',JSON.stringify(todos))
} 

const removeTodoLocalStorage =(todoText)=>{
  const todos = getTodosLocalStorage()
  const filterTodos = todos.filter((todo)=> todo.text !== todoText);

  localStorage.setItem('todos',JSON.stringify(filterTodos))
}

const updateTodoStatusLocalStorage = (todotext)=>{
  const todos = getTodosLocalStorage()
   todos.map((todo)=> todo.text === todotext ? (todo.done = !todo.done) : null
   );

  localStorage.setItem ('todos',JSON.stringify(todos))
}
loadTodos(); */