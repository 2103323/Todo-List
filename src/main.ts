import './style.css'

interface Todo {
  title: string
  isCompleted: boolean,
  readonly id: string;
}

const todos: Todo[] = [];

const todosContainer = document.querySelector('.todoContainer') as HTMLDivElement;

const todosInput = document.getElementsByName('title')[0] as HTMLInputElement;

const myForm = document.getElementById('myForm') as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todosInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000)

  };

  todos.push(todo);
  todosInput.value = '';
  renderTodos(todos);
  // console.log(todo);
  // console.log(todos);
};
const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement('div');
  todo.className = 'todo';


  const checkBox: HTMLInputElement = document.createElement('input');
  checkBox.setAttribute("type", 'checkbox');
  checkBox.className = 'isCompleted';
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find(item => {
      if (item.id === id) {
        item.isCompleted = checkBox.checked;
      }
    });
    paragraph.className = checkBox.checked ? 'textCut' : '';
  }





  const paragraph: HTMLParagraphElement = document.createElement('p');
  paragraph.innerText = title;
  paragraph.className = isCompleted ? 'textCut' : '';

  const btn: HTMLButtonElement = document.createElement('button');
  btn.innerText = 'X';
  btn.className = 'deleteBtn';

  btn.onclick = () => {
    deleteTodo(id);
  }

  todo.append(checkBox, paragraph, btn);
  todosContainer.appendChild(todo);
}

const deleteTodo = (id: string) => {
  const index = todos.findIndex(todo => todo.id === id);
  todos.splice(index, 1);
  renderTodos(todos);
}

const renderTodos = (todos: Todo[]) => {
  todosContainer.innerText = '';
  todos.forEach(item => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  })
};