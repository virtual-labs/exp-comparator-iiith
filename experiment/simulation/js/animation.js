import { setCoordinates,fillInputDots,fillColor,objectDisappear,objectAppear,setColor,unsetColor,calculateAnd,calculateNot,calculateXor,calculateOr} from "./animation-utility.js";

'use strict'

window.appendInputA1 = appendInputA1;
window.appendInputB1 = appendInputB1;
window.appendInputB0 = appendInputB0;
window.appendInputA0 = appendInputA0;
window.simulationStatus = simulationStatus;
window.restartCircuit = restartCircuit;
window.setSpeed=setSpeed;



// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");
// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;

const svg = document.querySelector(".svg");
const svgns = "http://www.w3.org/2000/svg";

const EMPTY="";
// stroing the necessary div elements in const
const status = document.getElementById("play-or-pause");
const observ = document.getElementById("observations");
const speed = document.getElementById("speed");

// global varaibles declared here
const objects = [
    document.getElementById("inputa1"),
    document.getElementById("inputb1"),
    document.getElementById("inputb0"),
    document.getElementById("inputa0"),
    document.getElementById("output1"),
    document.getElementById("output2"),
    document.getElementById("output3")
];
const textInput = [
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text")
];
const textOutput = [
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text")
];
const dots = [
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle")
];
// First 3 dots emerge from A1
// Next 3 dots emerge from B1
// Next 3 dots emerge from B0
// Next 3 dots emerge from A0



// decide help to decide the speed
let decide = false;
// circuitStarted is initialised to 0 which depicts that demo hasn't started whereas circuitStarted 1 depicts that the demo has started.
let circuitStarted = false;


// function to take care of width
function demoWidth() {
    if (width < 1024) {
        circuitBoard.style.height = "600px";
    } else {
        circuitBoard.style.height = `${windowHeight - circuitBoardTop - 20}px`;
    }
    sidePanels[0].style.height = circuitBoard.style.height;
}

// function to initialise the input text i.e. either 0/1 that gets displayed after user click on them
function textIOInit() {
    for( const text of textInput){
        text.textContent = 2;
    }
}


// function to mark the output coordinates
function outputCoordinates() {
    setCoordinates(908,174,textOutput[0]);
    svg.append(textOutput[0]);
    setCoordinates(908,401.5,textOutput[1]);
    svg.append(textOutput[1]);
    setCoordinates(908,629,textOutput[2]);
    svg.append(textOutput[2]);
}

// function to mark the input dots
function inputDots() {
    for(const dot of dots){
        fillInputDots(dot,20,550,15,"#FF0000");
        svg.append(dot);
    }
}

// function to disappear the input dots
function inputDotDisappear() {
    for(const dot of dots){
        objectDisappear(dot);
    }
}

// function to appear the input dots
function inputDotVisible() {
    for(const dot of dots){
        objectAppear(dot);
    }
}
// function to disappear the output text
function outputDisappear() {
    for(const text of textOutput){
        objectDisappear(text);
    }
}
// function to appear the output text
function outputVisible() {
    for(const text of textOutput){
        objectAppear(text);
    }
}
// function to diappear the input text
function inputTextDisappear() {
    for(const text of textInput){
        objectDisappear(text);
    }
}

function clearObservation() {
    observ.innerHTML = EMPTY;
}
function allDisappear() {
    inputDotDisappear();
    outputDisappear();
    inputTextDisappear();
    for(const object of objects){
        fillColor(object,"#008000");
    }
}

function appendInputA1() {
    if (textInput[0].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,24,0,0);
    }
    else if (textInput[0].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,24,0,0);
    }
    for(let i=0;i<3;i++){
        setter(textInput[0].textContent,dots[i]);
    }
}
function appendInputB1() {
    if (textInput[1].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,124,1,1);
    }
    else if (textInput[1].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,124,1,1);
    }
    for(let i=3;i<6;i++){
        setter(textInput[1].textContent,dots[i]);
    }
}
function appendInputB0() {
    if (textInput[2].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,224,2,2);
    }
    else if (textInput[2].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,224,2,2);
    }
    for(let i=6;i<9;i++){
        setter(textInput[2].textContent,dots[i]);
    }
}
function appendInputA0() {
    if (textInput[3].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,324,3,3);
    }
    else if (textInput[3].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,324,3,3);
    }
    for(let i=9;i<12;i++){
        setter(textInput[3].textContent,dots[i]);
    }
}


function changeto1(coordinateX,coordinateY,object,textObject) {
    textInput[textObject].textContent = 1;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX,coordinateY,textInput[textObject]);
    fillColor(objects[object],"#29e");
    clearObservation();
    objectAppear(textInput[textObject]);
}

function changeto0(coordinateX,coordinateY,object,textObject) {
    textInput[textObject].textContent = 0;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX,coordinateY,textInput[textObject]);
    fillColor(objects[object],"#eeeb22");
    clearObservation();
    objectAppear(textInput[textObject]);
}
let not1 = "0";
let not2 = "0";
let nand1 = "0";
let nand2 = "0";
let nand3 = "0";
let nand4 = "0";
let xnor1 = "0";
let xnor2 = "0";
let and = "0";
let nor = "0";

function stage1() {
    not1 = calculateNot(textInput[0].textContent);
    not2 = calculateNot(textInput[3].textContent);
    setter(not1,dots[1]);
    setter(not1,dots[2]);
    setter(not2,dots[10]);
    setter(not2,dots[11]);
}
function stage2() {
    xnor1 = calculateNot(calculateXor(textInput[0].textContent,textInput[1].textContent));
    xnor2 = calculateNot(calculateXor(textInput[2].textContent,textInput[3].textContent));
    nand1 = calculateNot(calculateAnd(not1,textInput[1].textContent));
    nand2 = calculateNot(calculateAnd(textInput[2].textContent,calculateAnd(not1,not2)));
    nand3 = calculateNot(calculateAnd(not2,calculateAnd(textInput[1].textContent,textInput[2].textContent)));
    setter(xnor1,dots[0]);
    objectDisappear(dots[3]);
    setter(xnor2,dots[6]);
    objectDisappear(dots[9]);
    setter(nand1,dots[1]);
    setter(nand2,dots[2]);
    setter(nand3,dots[5]);
    objectDisappear(dots[4]);
    objectDisappear(dots[7]);
    objectDisappear(dots[10]);
    objectDisappear(dots[8]);
    objectDisappear(dots[11]);
}
function stage3() {
    and = calculateAnd(xnor1,xnor2);
    nand4 = calculateNot(calculateAnd(calculateAnd(nand1,nand2),nand3));
    setter(and,dots[0]);
    setter(and,dots[6]);
    setter(nand4,dots[1]);
    setter(nand4,dots[2]);
    objectDisappear(dots[5]);
}
function stage4() {
    nor = calculateNot(calculateOr(and,nand4));
    setter(nor,dots[2]);
    objectDisappear(dots[6]);
}



function outputSetter(){
    inputDotDisappear();
    textOutput[0].textContent = and;
    textOutput[1].textContent = nor;
    textOutput[2].textContent = nand4;
    setter(textOutput[0].textContent,objects[4]);
    setter(textOutput[1].textContent,objects[5]);
    setter(textOutput[2].textContent,objects[6]);

}

function display() {
    observ.innerHTML = "Simulation has finished. Press Restart to start again"
}

function reboot() {
    for(const text of textInput){
        text.textContent = 2;
    }
}

function setter(value, component) {
    if (value === "1") {
        unsetColor(component);
    }
    else if (value === "0") {
        setColor(component);
    }
}

function setSpeed(speed) {
    if (circuitStarted) {
        timeline.timeScale(parseInt(speed));
        observ.innerHTML = `${speed}x speed`;
    }
}

function restartCircuit() {
    if (circuitStarted) {
        circuitStarted = false;
    }
    timeline.seek(0);
    timeline.pause();
    allDisappear();
    reboot();
    clearObservation();
    decide = false;
    status.innerHTML = "Start";
    observ.innerHTML = "Successfully restored";
    speed.selectedIndex = 0;
}

function simulationStatus() {
    if (!decide) {
        startCircuit();
    }
    else if (decide) {
        stopCircuit();
    }
}
function stopCircuit() {
    if (timeline.time() !== 0 && timeline.progress() !== 1) {
        timeline.pause();
        observ.innerHTML = "Simulation has been stopped.";
        decide = false;
        status.innerHTML = "Start";
        speed.selectedIndex = 0;
    }
    else if (timeline.progress() === 1) {
        observ.innerHTML = "Please Restart the simulation";
    }
}
function startCircuit() {
    for(const text of textInput){
        if (text.textContent === "2") {
            observ.innerHTML = "Please set the input values";
            return;
        }
    }
    if (timeline.progress() !== 1) {
        if (!circuitStarted) {
            circuitStarted = true;
        }
        timeline.play();
        timeline.timeScale(1);
        observ.innerHTML = "Simulation has started.";
        decide = true;
        status.innerHTML = "Pause";
        speed.selectedIndex = 0;
    }
    else if (timeline.progress() === 1) {
        observ.innerHTML = "Please Restart the simulation";
    }
}



// all the execution begin here
let timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
gsap.registerPlugin(MotionPathPlugin);
demoWidth();
// calling all the functions that are going to initialise 
textIOInit();
outputCoordinates();
inputDots();
outputDisappear();

timeline.add(inputDotVisible, 0);
timeline.add(stage1,5);
timeline.add(stage2,10);
timeline.add(stage3,15);
timeline.add(stage4,20);
timeline.add(outputSetter,25);
timeline.add(outputVisible,25);
timeline.eventCallback("onComplete", outputVisible);
timeline.eventCallback("onComplete", display);

timeline.to(dots[0], {
    motionPath: {
        path: "#path1",
        align: "#path1",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[0], {
    motionPath: {
        path: "#path14",
        align: "#path14",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[0], {
    motionPath: {
        path: "#path22",
        align: "#path22",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    delay: 15,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[1], {
    motionPath: {
        path: "#path5",
        align: "#path5",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[1], {
    motionPath: {
        path: "#path7",
        align: "#path7",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[1], {
    motionPath: {
        path: "#path16",
        align: "#path16",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[1], {
    motionPath: {
        path: "#path21",
        align: "#path21",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    delay: 15,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[2], {
    motionPath: {
        path: "#path5",
        align: "#path5",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[2], {
    motionPath: {
        path: "#path11",
        align: "#path11",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[2], {
    motionPath: {
        path: "#path17",
        align: "#path17",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[2], {
    motionPath: {
        path: "#path20",
        align: "#path20",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 15,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[2], {
    motionPath: {
        path: "#path23",
        align: "#path23",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 20,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[3], {
    motionPath: {
        path: "#path2",
        align: "#path2",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[4], {
    motionPath: {
        path: "#path8",
        align: "#path8",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[5], {
    motionPath: {
        path: "#path13",
        align: "#path13",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[5], {
    motionPath: {
        path: "#path18",
        align: "#path18",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[6], {
    motionPath: {
        path: "#path3",
        align: "#path3",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[6], {
    motionPath: {
        path: "#path15",
        align: "#path15",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 10,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[6], {
    motionPath: {
        path: "#path19",
        align: "#path19",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 15,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[7], {
    motionPath: {
        path: "#path9",
        align: "#path9",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[8], {
    motionPath: {
        path: "#path12",
        align: "#path12",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[9], {
    motionPath: {
        path: "#path4",
        align: "#path4",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[10], {
    motionPath: {
        path: "#path6",
        align: "#path6",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[11], {
    motionPath: {
        path: "#path6",
        align: "#path6",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[10], {
    motionPath: {
        path: "#path10",
        align: "#path10",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[11], {
    motionPath: {
        path: "#path24",
        align: "#path24",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    delay: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);




timeline.pause();
inputDotDisappear();