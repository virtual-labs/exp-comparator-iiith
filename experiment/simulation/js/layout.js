import { simulate, deleteElement } from "./gate.js";
import {connectGate, unbindEvent, initComparator,refreshWorkingArea} from "./main.js";

"use strict";
// Wires Colours
export const wireColours = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#bf6be3",
  "#ff00ff",
  "#00ffff",
  "#ff8000",
  "#00ff80",
  "#80ff00",
  "#ff0080",
  "#8080ff",
  "#c0c0c0",
];

// Contextmenu
const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");
let menuVisible = false;

const toggleMenu = command => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

export const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", e => {
  if (menuVisible) toggleMenu("hide");
  window.selectedComponent = null;
  window.componentType = null;
});

menuOption.addEventListener("click", e => {
  if (e.target.innerHTML === "Delete") {
    if (window.componentType === "gate") {
      deleteElement(window.selectedComponent);
    }
  }
  window.selectedComponent = null;
  window.componentType = null;
});

// Tabs

function changeTabs(e) {
  const task = e.target.parentNode.id;
  if (window.currentTab === task) {
    return;
  }

  if (window.currentTab != null) {
    document.getElementById(window.currentTab).classList.remove("is-active");
  }
  window.currentTab = task;
  document.getElementById(task).classList.add("is-active");

  // Half adder
  if (task === "task1") {
    unbindEvent();
    connectGate();
    refreshWorkingArea();
    initComparator();
    window.simulate= simulate
  }
  updateInstructions();
  updateToolbar();
  clearObservations();

}

window.changeTabs = changeTabs;

function updateInstructions() {
  if (window.currentTab === "task1") {
    document.getElementById("TaskTitle").innerHTML = "2-bit comparator";
    document.getElementById("TaskDescription").innerHTML = 'Implement a 2-bit comparator using logic gates.'
  }
}

// Toolbar

function updateToolbar() {
  let elem = "";
  if (window.currentTab === "task1") {
    elem = '<div class="component-button and" onclick="addGate(event)">AND</div><div class="component-button or" onclick="addGate(event)">OR</div><div class="component-button not" onclick="addGate(event)">NOT</div><div class="component-button nand" onclick="addGate(event)">NAND</div><div class="component-button nor" onclick="addGate(event)">NOR</div><div class="component-button xor" onclick="addGate(event)">XOR</div><div class="component-button xnor" onclick="addGate(event)">XNOR</div>'
  }
  document.getElementById("toolbar").innerHTML = elem;
}

// Clear observations
function clearObservations() {

  document.getElementById("table-body").innerHTML = "";
  let head = '';

  if (window.currentTab === "task1") {
    head = '<tr><th colspan="2">Input</th><th colspan="3">Result</th></tr><tr><th>A1&nbsp;A0</th><th>B1&nbsp;B0</th><th>A&lt;B</th><th>A=B</th><th>A&gt;B</th></tr>'
  }

  document.getElementById("table-head").innerHTML = head;
  document.getElementById('result').innerHTML = "";

}

// Making webpage responsive

// Dimensions of working area
let circuitBoard = document.getElementById("circuit-board");
// Distance of working area from top
let circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
let windowHeight = window.innerHeight;
let width = window.innerWidth;
if (width < 1024) {
  circuitBoard.style.height = 600 + "px";
} else {
  circuitBoard.style.height = windowHeight - circuitBoardTop - 20 + "px";
}

