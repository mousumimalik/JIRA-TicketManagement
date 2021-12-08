let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");

let addFlag = false;

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

modalCont.addEventListener("keydown", (e) => {
    let key = e.key;
    if(key === "Shift") {
        createTicket();
        modalCont.style.display = "none";
        addFlag = false;
        textareaCont.value = "";
    }
});

function createTicket() {
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color"></div>
        <div class="ticket-id">
            #Sample_id
        </div>
        <div class="task-area">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus repellat, officiis nisi delectus ducimus eum quidem distinctio eos sequi molestias provident fugit asperiores rem nemo repudiandae blanditiis porro sit aperiam.
        </div>
    `;
    mainCont.appendChild(ticketCont);
}