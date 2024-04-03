// Initialize counters data from localStorage or empty array if it's not available
let countersData = JSON.parse(localStorage.getItem("countersData")) || [];

// Add event listener for the "Add Counter" button
const addButton = document.querySelector(".substitute");
const countersContainer = document.querySelector("#counters-container");

window.addEventListener("load", function () {
  clearAndCountersInData();
  console.log("Page loaded");
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter, index) => {
    console.log(`hi im working duh` + counter + index);
    // countersData.push({ title: counter.querySelector(".counter-name").textContent, count: 0 });
    setupCounterEvents(counter, index);
  });
});

function clearAndCountersInData() {
  countersContainer.innerHTML = "";
  for (let i = 0; i < countersData.length; i++) {
    const newCounters = document.createElement("div");
    newCounters.classList = "counter";
    newCounters.innerHTML = `<div class="counter-name-container">
                                <p class="counter-name">${countersData[i].title}</p>
                                <button class="edit">edit</button>
                            </div>
                            <div class="count-stack">
                                <div class="minus">-</div>
                                <div class="count">${countersData[i].count}</div>
                                <div class="plus">+</div>
                            </div>`;

    // Append the newCounters to countersContainer
    countersContainer.appendChild(newCounters);
  }
}

function setupCounterEvents(counter, index) {
  const minus = counter.querySelector(".minus");
  const plus = counter.querySelector(".plus");
  const editButton = counter.querySelector(".edit");
  const counterNameElement = counter.querySelector(".counter-name");
  const counterNameContainer = counter.querySelector(".counter-name-container");
  let count = countersData[index] ? countersData[index].count : 0;

  // Update the count display
  counter.querySelector(".count").textContent = count;

  minus.addEventListener("click", () => {
    if (count <= 0) {
      return;
    }
    count--;
    counter.querySelector(".count").textContent = count;
    countersData[index].count = count;
    saveCountersData();
  });

  plus.addEventListener("click", () => {
    count++;
    counter.querySelector(".count").textContent = count;
    countersData[index].count = count;
    saveCountersData();
  });

  editButton.addEventListener("click", () => {
    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", counterNameElement.textContent);

    // Replace counter name with input field
    counterNameElement.textContent = "";
    counterNameElement.appendChild(inputField);
    inputField.focus();

    // Change counter name and update countersData array on blur
    inputField.addEventListener("blur", () => {
      console.log(index);
      const newCounterName = inputField.value.trim();
      counterNameElement.textContent = newCounterName;
      countersData[index].title = newCounterName;
      console.log(countersData[index].title);
      counterNameContainer.appendChild(editButton);
      saveCountersData();
    });
    console.table(countersData);
  });
}

function saveCountersData() {
  localStorage.setItem("countersData", JSON.stringify(countersData));
}

addButton.addEventListener("click", () => {
  const newCounter = document.createElement("div");
  newCounter.classList.add("counter");
  newCounter.innerHTML = `
        <div class="counter-name-container">
            <p class="counter-name">Counter ${countersData.length + 1}</p>
            <button class="edit">edit</button>
        </div>
        <div class="count-stack">
            <div class="minus">-</div>
            <div class="count">0</div>
            <div class="plus">+</div>
        </div>
    `;
  countersContainer.appendChild(newCounter);

  countersData.push({ title: `Counter ${countersData.length + 1}`, count: 0 });

  setupCounterEvents(newCounter, countersData.length - 1);
  console.table(countersData);
  saveCountersData();
});

// Set up event listeners for existing counters
