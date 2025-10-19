const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const themeSwitch = document.getElementById("themeSwitch");

let current = "";
let operator = "";
let previous = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

function addToHistory(expression, result) {
  const item = document.createElement("li");
  item.textContent = `${expression} = ${result}`;
  historyList.prepend(item);
}

function calculate() {
  try {
    const expression = `${previous}${operator}${current}`;
    const result = eval(expression);
    current = result.toString();
    updateDisplay(current);
    addToHistory(expression, result);
    previous = "";
    operator = "";
  } catch {
    updateDisplay("Error");
  }
}

// 🔘 Button Clicks
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;
    const action = btn.dataset.action;

    if (action === "clear") {
      current = "";
      previous = "";
      operator = "";
      updateDisplay("0");
    } else if (action === "backspace") {
      current = current.slice(0, -1);
      updateDisplay(current);
    } else if (action === "operator") {
      if (current) {
        operator = val;
        previous = current;
        current = "";
      }
    } else if (action === "equal") {
      if (previous && operator && current) {
        calculate();
      }
    } else {
      current += val;
      updateDisplay(current);
    }
  });
});

// 🎹 Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    current += key;
    updateDisplay(current);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    if (current) {
      operator = key;
      previous = current;
      current = "";
    }
  } else if (key === "Enter") {
    if (previous && operator && current) {
      calculate();
    }
  } else if (key === "Backspace") {
    current = current.slice(0, -1);
    updateDisplay(current);
  } else if (key === "Escape") {
    current = "";
    previous = "";
    operator = "";
    updateDisplay("0");
  }
});

// 🌗 Theme Switcher
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeSwitch.checked);
  localStorage.setItem("theme", themeSwitch.checked ? "dark" : "light");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeSwitch.checked = true;
}