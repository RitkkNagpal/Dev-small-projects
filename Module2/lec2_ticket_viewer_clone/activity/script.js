let filterCodes = {
    "red": "#e74c3c",
    "blue": "#00bfff",
    "green": "#7fffd4",
    "black": "#0c0b0b"
}

let allFilters=document.querySelectorAll(".ticket-filters div");
let ticketContainer=document.querySelector(".tickets-container");

//goes and attaches an event for all filters
for(let i=0;i<allFilters.length;i++){
    allFilters[i].addEventListener("click",chooseFilter);
}

function chooseFilter(e){
    let filter=e.target.classList[1];
    let filterCode=filterCodes[filter];

    ticketContainer.style.background=filterCode;
}