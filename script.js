let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let toolboxColors = document.querySelectorAll(".color");

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];

let addFlag = false;
let removeFlag = false;

let lockClass = "fa-user-lock";
let unlockClass = "fa-unlock-alt";

let ticketArr = [];

// TOOLBOX COLORS
for(let i = 0; i < toolboxColors.length; i++) {
    toolboxColors[i].addEventListener("click", (e) => {
        let currentToolboxColor = toolboxColors[i].classList[0];

        let filteredTickets = ticketArr.filter((ticketObj, idx) => {
            return currentToolboxColor === ticketObj.ticketColor;
        });
        // remove previous tickets
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }

        // display new filtered tickets
        filteredTickets.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
        });
    });

    toolboxColors[i].addEventListener("dblclick", (e) => {
         // remove previous tickets
         let allTicketsCont = document.querySelectorAll(".ticket-cont");
         for(let i = 0; i < allTicketsCont.length; i++) {
             allTicketsCont[i].remove();
         }
         ticketArr.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
         });
    });
}

// COLORING SELECT
// listener for modal priority coloring 
allPriorityColors.forEach((colorElem, idx) => {
    colorElem.addEventListener("click", (e) => {
        allPriorityColors.forEach((priorityColorElem, idx) => {
            priorityColorElem.classList.remove("border");
        });
        colorElem.classList.add("border");

        modalPriorityColor = colorElem.classList[0];
    });
});

// ADD BUTTON
addBtn.addEventListener("click", (e) => {
    // display modal

    // generate ticket

    // addFlag = true - modal display / addFlag = false - modal none
    addFlag = !addFlag;
    console.log(addFlag);

    if(addFlag) {
        modalCont.style.display = "flex";
    }
    else {
        modalCont.style.display = "none";
    }
});

// REMOVE BUTTON
removeBtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
});

// INPUT ENTER | MODAL CONTAINER
modalCont.addEventListener("keydown", (e) => {
    let key = e.key;
    if(key === "Shift") {
        createTicket(modalPriorityColor, textareaCont.value);
        // modalCont.style.display = "none";
        addFlag = false;
        // textareaCont.value = "";
        setModalToDefault();
    }
});

// TICKET CREATE
function createTicket(ticketColor, ticketTask, ticketID) {
    let id = ticketID || shortid();
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${ticketID}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock">
            <i class="fas fa-user-lock"></i>
        </div>
    `;
    mainCont.appendChild(ticketCont);

    // create obj of ticket & add to array
    if(!ticketID) ticketArr.push({ticketColor, ticketTask, ticketID: id});

    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}

// REMOVE
function handleRemoval(ticket) {
    // removeFlag - true -> remove
    if(removeFlag) ticket.remove();
}

// LOCK & UNLOCK
function handleLock(ticket) {
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");

    ticketLock.addEventListener("click", (e) => {
        if(ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", "true");
        }
        else {
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", "false");
        }
    });
}

// COLOR HANDLER
function handleColor(ticket) {
    let ticketColor = ticket.querySelector(".ticket-color");

    ticketColor.addEventListener("click", (e) => {
        let currentTicketColor = ticketColor.classList[1];

        // get ticket color index
        let currentTicketColorIdx = colors.findIndex((color) => {
            return currentTicketColor === color;
        });
        currentTicketColorIdx++;
        let newTicketColorIdx = currentTicketColorIdx % colors.length;
        let newTicketColor = colors[newTicketColorIdx];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor);
    });
}

// DEFAULT COLOR BORDER SET | SET MODAL
function setModalToDefault() {
   modalCont.style.display = "none";
   textareaCont.value = "";
   modalPriorityColor = colors[colors.length - 1];
   allPriorityColors.forEach((priorityColorElem, idx) => {
       priorityColorElem.classList.remove("border");
   }); 
   allPriorityColors[allPriorityColors.length - 1].classList.add("border");
}