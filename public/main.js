const dateDisplay = document.querySelector("#dateDisplay");
const dateChangeModal = document.querySelector("#dateChangeModal");
const dateChangeModalCloseButton = dateChangeModal.querySelector(".close-area");
const dateChangeForm = dateChangeModal.querySelector("#dateChangeForm");
const previousDateArrow = document.querySelector("#previousDateArrow");
const nextDateArrow = document.querySelector("#nextDateArrow");
const currentDate = new Date();

const updateDisplayedDate = () => {
  dateDisplay.innerText = String(currentDate.getFullYear()) + "년 " + String(currentDate.getMonth() + 1) + "월 " + String(currentDate.getDate()) + "일";
}

const showChangeDateModal = () => {
  dateChangeModal.style.display = "flex";
}

const hideChangeDateModal = () => {
  dateChangeModal.style.display = "none";
}

previousDateArrow.addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() - 1);
  updateDisplayedDate();
});

nextDateArrow.addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() + 1);
  updateDisplayedDate();
})


dateChangeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  dateChangeModal.style.display = "none";
  const date = e.target[0].value.split("-");
  console.log(parseInt(date[1]));
  currentDate.setFullYear(date[0]);
  currentDate.setMonth(parseInt(date[1]) - 1);
  currentDate.setDate(date[2]);
  updateDisplayedDate();
})


const createTable = () => {
  let hour = 8;
  let minutes = 30;
  const tbody = document.querySelector("#tbody");
  for (i = 0; i < 24; i++) {
    const tr = document.createElement("tr");
    
    const time = document.createElement("th");
    time.innerText = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    tr.appendChild(time);
    
    const keywordDisplay = document.createElement("th");
    const keywordInput = document.createElement("textarea");
    keywordInput.classList.add("tableInput");
    keywordDisplay.appendChild(keywordInput);
    tr.appendChild(keywordDisplay);
    
    const categoryDisplay = document.createElement("th");
    const categoryInput = document.createElement("textarea");
    categoryInput.classList.add("tableInput");
    categoryDisplay.appendChild(categoryInput);
    tr.appendChild(categoryDisplay);
    
    const situationDisplay = document.createElement("th");
    const situationInput = document.createElement("textarea");
    situationInput.classList.add("tableInput");
    situationDisplay.appendChild(situationInput);
    tr.appendChild(situationDisplay);
    
    const processDisplay = document.createElement("th");
    const processStep = document.createElement("div");
    const stepNumber = document.createElement("label");
    stepNumber.innerText = "1.";
    const processInput = document.createElement("input");
    processInput.classList.add("tableProcessInput");
    processInput.addEventListener("keypress", addStep);
    processStep.appendChild(stepNumber);
    processStep.appendChild(processInput);
    processDisplay.appendChild(processStep);
    tr.appendChild(processDisplay);
    tbody.appendChild(tr);
    minutes = minutes + 30;
    if (minutes === 60) {
      hour = hour + 1;
      minutes = 0;
    }
  }
}

const addStep = (e) => {
  if(e.key === "Enter") {
    const processStep = document.createElement("div");
    const stepNumber = document.createElement("label");
    stepNumber.innerText = (parseInt(e.target.previousSibling.innerText.slice(0, -1)) + 1) + ".";
    const processInput = document.createElement("input");
    e.target.blur();
    processInput.classList.add("tableProcessInput");
    processInput.addEventListener("keypress", addStep);
    processStep.appendChild(stepNumber);
    processStep.appendChild(processInput);
    e.target.parentElement.parentElement.appendChild(processStep);
    processStep.childNodes[1].focus();
  }
}

const saveContents = async () => {
  const tbody = document.querySelector("#tbody");
  console.dir(tbody);
  for(i = 0; i < 24; i++) {
    let process = "";
    for(j = 0; j < tbody.children[i].children[4].children.length; j++) {
      process = process + `${j+1}.` + tbody.children[i].children[4].children[j].children[1].value + " ";
    }
    const data = {
      keyword: tbody.children[i].children[1].children[0].value,
      category: tbody.children[i].children[2].children[0].value,
      situation: tbody.children[i].children[3].children[0].value,
      process: process,
      date: currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate(),
      time: i,
    };
    await axios.post('/save', data);
  }
}

dateDisplay.addEventListener('click', showChangeDateModal);
dateChangeModalCloseButton.addEventListener("click", hideChangeDateModal);
updateDisplayedDate();
createTable();
setInterval(saveContents, 5000);