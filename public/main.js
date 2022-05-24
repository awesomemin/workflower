const dateDisplay = document.querySelector("#dateDisplay");
const today = new Date();
dateDisplay.innerText = String(today.getMonth() + 1) + "월 " + String(today.getDate()) + "일";

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

createTable();