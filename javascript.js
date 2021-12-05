const inputBox = document.querySelector('.inputField input')
const addBtn = document.querySelector('.inputField button')
const todoList = document.querySelector('.todoList')
const deleteAllBtn = document.querySelector('.footer button')

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
}

showTasks();
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorage);
    }
    if (userData.length != 0) {
        listArray.push(userData);
    }
    localStorage.setItem('New Todo', JSON.stringify(listArray));
    showTasks();
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector('.pendingNumb');
    pendingNumb.textContent = listArray.length;
    if (listArray.length > 0) {
        deleteAllBtn.classList.add('active');
    } else {
        deleteAllBtn.classList.remove('active');
    }
    let newLiTag = '';
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick=deleteTask(${index}) ><button type="button"
         class='btn btn-danger'>-</button></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = '';
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('New Todo');
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1);
    localStorage.setItem('New Todo', JSON.stringify(listArray));
    showTasks();
}

function clearAll() {
    listArray = [];
    localStorage.setItem('New Todo', JSON.stringify(listArray));
    showTasks();
}