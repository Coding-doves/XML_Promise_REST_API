let tasks = document.querySelector(".tasks");

let addtask = (obj) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(obj.method, obj.url);

        xhr.onload = () => {
            if (xhr.status !== 200) { reject(xhr.statusText); }
            else { resolve(xhr.responseText); }
        };
        xhr.onerror = () => {reject(xhr.statusText)};
        xhr.send(obj.body);
    });
}

let obj = {
    "method": "GET",
    "url": "https://jsonplaceholder.typicode.com/todos",
    "body": null
}

let results = [];
addtask(obj).then(
    (result) => {
        let resultsObj = JSON.parse(result);
        displayTask(resultsObj);
    }
).catch(err => console.error(err));

function displayTask(resultsObj) {
    let i = 0;

    for (let item of resultsObj) {
        let list = document.createElement("li");
        let todo = document.createElement("span");
        let box = document.createElement("input");

        box.type = "checkbox";
        box.checked = item.completed;
        todo.innerHTML = item.title;
        todo.style.paddingLeft = "20px";

        if (box.checked) { 
            todo.classList.add("checked");
        } 

        list.appendChild(box);
        list.appendChild(todo);
        tasks.appendChild(list);

        i++;
        if (i >= 10) { break; } // Limit to 10 tasks
    }  
}