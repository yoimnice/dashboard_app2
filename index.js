/* jshint esversion: 8 */


// ----------------- Todo List ----------------- //

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const LOCAL_STORAGE_KEY = 'todoList';

function saveToLocalStorage(todos) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

function getFromLocalStorage() {
    const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
}

function renderTodoItem(text) {
    const todoItem = document.createElement('li');
    
    const todoText = document.createElement('span');
    todoText.innerText = text;
    todoItem.appendChild(todoText);

    const okButton = document.createElement('button');
    okButton.innerText = 'OK';
    okButton.style.display = 'none';
    todoItem.appendChild(okButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.style.display = 'none';
    todoItem.appendChild(deleteButton);

    todoText.addEventListener('dblclick', () => {
        todoText.style.display = 'none';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = todoText.innerText;
        input.className = 'todo-input';
        todoItem.insertBefore(input, todoText);

        okButton.style.display = 'inline';
        deleteButton.style.display = 'inline';
        input.focus();
    });

    okButton.addEventListener('click', () => {
        const newText = todoItem.querySelector('.todo-input').value;
        if (newText) {
            const todos = getFromLocalStorage();
            const index = todos.indexOf(todoText.innerText);
            todos[index] = newText;
            saveToLocalStorage(todos);
            todoText.innerText = newText;
        }
        todoItem.removeChild(todoItem.querySelector('.todo-input'));
        todoText.style.display = 'inline';
        okButton.style.display = 'none';
        deleteButton.style.display = 'none';
    });

    deleteButton.addEventListener('click', () => {
        const todos = getFromLocalStorage();
        const index = todos.indexOf(todoText.innerText);
        todos.splice(index, 1);
        saveToLocalStorage(todos);
        todoList.removeChild(todoItem);
    });

    todoItem.addEventListener('click', (e) => {
        if (e.target !== okButton && e.target !== deleteButton) {
            todoItem.classList.toggle('completed');
        }
    });

    todoItem.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const todos = getFromLocalStorage();
        const index = todos.indexOf(todoText.innerText);
        todos.splice(index, 1);
        saveToLocalStorage(todos);
        todoList.removeChild(todoItem);
    });

    todoList.appendChild(todoItem);
}

function addTodo(text) {
    const todos = getFromLocalStorage();

    // Check if the item already exists in the list
    if (todos.includes(text)) {
        return;
    }

    renderTodoItem(text);

    todos.push(text);
    saveToLocalStorage(todos);
}


todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todoInput.value.trim()) {
        addTodo(todoInput.value.trim());
        todoInput.value = '';
    }
});

function loadTodos() {
    const todos = getFromLocalStorage();
    todos.forEach(todo => renderTodoItem(todo));
}

document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

// ----------------- Background Image ----------------- //

const unsplashImages = ['https://images.unsplash.com/photo-1676676701269-65de47175adf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80', 
'https://images.unsplash.com/photo-1677297680558-df5641e505ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1677297680174-63fea98df131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2228&q=80',
'https://images.unsplash.com/photo-1677297680059-a0061c35d894?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1677504212021-43df09f3a64a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1677297680113-d508d9d01eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1677297679380-46df420f8a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1679108316238-d8c188a66145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1679189789333-cf24f75b0de7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1679189790392-98ce5a4ef47c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1679108319531-278564f267ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1678491453160-adba1d738cd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1677504209077-2f28a85bf924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1678845535919-8351c40cf700?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1679362004077-d282575a36a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
'https://images.unsplash.com/photo-1678491451801-4c98a0e50552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',];


function getRandomBackgroundImage(){
    const randomIndex = Math.floor(Math.random() * unsplashImages.length);
    return unsplashImages[randomIndex];
}

document.body.style.backgroundImage = `url(${getRandomBackgroundImage()})`;

// ----------------- Background Image API (turned off because of too long rendering) ----------------- //

// fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
//     .then(res => res.json())
//     .then(data => {
//         document.body.style.backgroundImage = `url(${data.urls.full})`;
// 		document.getElementById("author").textContent = `By: ${data.user.name}`;
//     })
//     .catch(err => {
//         // Use a default background image/author
//         document.body.style.backgroundImage = `url(${unsplashImages[0]})`;
// 		   document.getElementById("author").textContent = `By: Dodi Achmad`;
// });

// ----------------- Current Time ----------------- //

function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("de", {timeStyle: "short"});
}

setInterval(getCurrentTime, 1000);

// ----------------- Weather API ----------------- //

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            return res.json();
        })
        .then(data => {
            let degreeInCelsius = (Math.round(data.main.temp) - 32) * 5 / 9;
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(degreeInCelsius)}<span class="degree-symbol">º</span></p>
                <p class="weather-city">${data.name}</p>
            `;
        })
        .catch(err => console.error(err));
});

// ----------------- Browser Bookmarks ----------------- //

function extractWebsiteName(url) {
    const parsedUrl = new URL(url);
    const hostnameParts = parsedUrl.hostname.split('.');
    const domain = hostnameParts.length > 1 ? hostnameParts[hostnameParts.length - 2] : hostnameParts[0];
    return domain;
}

function toggleDropdown(dropdownMenu) {
    dropdownMenu.classList.toggle('hide-dropdown');
}

chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    let bookmarks = bookmarkTreeNodes[0].children[0].children;

    bookmarks.forEach(bookmark => {
        // first i check if the item a folder or a bookmark (because some people save folders to the bookmarks)
        if (bookmark.hasOwnProperty("children")) {
            const dropdown = document.createElement('a');
            dropdown.innerHTML = `
                <div class="bookmark">
                    <img class="icon" src="./folder-icon.png">
                    <p>${bookmark.title}</p>  
                    <div class='dropdown-menu hide-dropdown'>
                        ${bookmark.children.map(child => `<a href='${child.url}'><p>${extractWebsiteName(child.url)}</p></a>`).join('')}
                    </div>
                </div>
            `;
            dropdown.addEventListener('click', () => {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                toggleDropdown(dropdownMenu);
            });
            document.addEventListener('click', (e) => {
                const bookmarkElement = e.target.closest('.bookmark');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
                if (!bookmarkElement) {
                    dropdownMenu.classList.add('hide-dropdown')
                }
            });
            document.getElementById('bookmarks').appendChild(dropdown);
        } else {
            const bookmarkElement = document.createElement('a');
            bookmarkElement.href = bookmark.url;
            bookmarkElement.innerHTML = `
                <div class='bookmark'>
                    <img class="icon" src="https://www.google.com/s2/favicons?domain=${bookmark.url}">
                    <p>${extractWebsiteName(bookmark.url)}</p>  
                </div>
            `;
            document.getElementById('bookmarks').appendChild(bookmarkElement);
        }
    });
});
