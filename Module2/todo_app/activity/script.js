let todoInput=document.querySelector(".todo-input");
let addTodoButton=document.querySelector(".add-todo");
let todoList=document.querySelector(".todo-list");


addTodoButton.addEventListener("click",function(){
    addToDo();
});

todoInput.addEventListener("keypress",function(e){
    if(e.key=="Enter")
    {
        addToDo();
    }
});

function addToDo()
{
    let todo=todoInput.value;
    if(todo) // something is typed in box
    {
        let listItem=document.createElement("li"); //creates a li element
        listItem.classList.add("todo-item");

        let pTag=document.createElement("p"); //creates a pTag
        pTag.classList.add("todo");
        pTag.innerHTML=todo;
        
        let deleteButton=document.createElement("button");//creates a button
        deleteButton.classList.add("delete-todo");
        deleteButton.innerHTML='Delete';

        //funtion to delete a todo
        deleteButton.addEventListener("click",function(e){ // it will delete that particular list item (todo);
            e.target.parentNode.remove();
        });

        listItem.append(pTag);
        listItem.append(deleteButton);
        
        todoList.append(listItem);

        todoInput.value="";

    }
    else //if nothing is typed
    {
        alert("You have not typed anything");
    }
}