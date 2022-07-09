'use strict'
// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");
// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;
if (width < 1024) {
  circuitBoard.style.height = 600 + "px";
} else {
  circuitBoard.style.height = windowHeight - circuitBoardTop - 20 + "px";
}
sidePanels[0].style.height = circuitBoard.style.height;


const svg = document.querySelector(".svg");
const inputpath1 = document.querySelector("#inputpath1");
const svgns = "http://www.w3.org/2000/svg";
gsap.registerPlugin(MotionPathPlugin);

let newCircle = document.createElementNS(svgns, "circle");
gsap.set(newCircle, {
    attr: { cx: 20, cy: 20, r: 15, fill: "#FF0000" }
});
let newCircle1 = document.createElementNS(svgns, "circle");
gsap.set(newCircle1, {
    attr: { cx: 20, cy: 120, r: 15, fill: "#FF0000" }
});
let newCircle2 = document.createElementNS(svgns, "circle");
gsap.set(newCircle2, {
    attr: { cx: 20, cy: 220, r: 15, fill: "#FF0000" }
});
let newCircle3 = document.createElementNS(svgns, "circle");
gsap.set(newCircle3, {
    attr: { cx: 20, cy: 320, r: 15, fill: "#FF0000" }
});

let newCircle4 = document.createElementNS(svgns, "circle");
gsap.set(newCircle4, {
    attr: { cx: 20, cy: 20, r: 15, fill: "#FF0000" }
});

let newCircle5 = document.createElementNS(svgns, "circle");
gsap.set(newCircle5, {
    attr: { cx: 20, cy: 320, r: 15, fill: "#FF0000" }
});

let newCircle6 = document.createElementNS(svgns, "circle");
gsap.set(newCircle6, {
    attr: { cx: 100, cy: 471, r: 15, fill: "#FF0000" }
});
let newCircle7 = document.createElementNS(svgns, "circle");
gsap.set(newCircle7, {
    attr: { cx: 20, cy: 120, r: 15, fill: "#FF0000" }
});
let newCircle8 = document.createElementNS(svgns, "circle");
gsap.set(newCircle8, {
    attr: { cx: 20, cy: 220, r: 15, fill: "#FF0000" }
});
let newCircle9 = document.createElementNS(svgns, "circle");
gsap.set(newCircle9, {
    attr: { cx: 150, cy: 471, r: 15, fill: "#FF0000" }
});

let newCircle10 = document.createElementNS(svgns, "circle");
gsap.set(newCircle10, {
    attr: { cx: 100, cy: 471, r: 15, fill: "#FF0000" }
});

let newCircle11 = document.createElementNS(svgns, "circle");
gsap.set(newCircle11, {
    attr: { cx: 20, cy: 220, r: 15, fill: "#FF0000" }
});

let newCircle12 = document.createElementNS(svgns, "circle");
gsap.set(newCircle12, {
    attr: { cx: 20, cy: 120, r: 15, fill: "#FF0000" }
});

let newCircle13 = document.createElementNS(svgns, "circle");
gsap.set(newCircle13, {
    attr: { cx: 338, cy: 70, r: 15, fill: "#FF0000" }
});

let newCircle14 = document.createElementNS(svgns, "circle");
gsap.set(newCircle14, {
    attr: { cx: 338, cy: 270, r: 15, fill: "#FF0000" }
});

let newCircle15 = document.createElementNS(svgns, "circle");
gsap.set(newCircle15, {
    attr: { cx: 346, cy: 555, r: 15, fill: "#FF0000" }
});

let newCircle16 = document.createElementNS(svgns, "circle");
gsap.set(newCircle16, {
    attr: { cx: 346, cy: 625, r: 15, fill: "#FF0000" }
});

let newCircle17 = document.createElementNS(svgns, "circle");
gsap.set(newCircle17, {
    attr: { cx: 346, cy: 695, r: 15, fill: "#FF0000" }
});

let newCircle18 = document.createElementNS(svgns, "circle");
gsap.set(newCircle18, {
    attr: { cx: 562, cy: 170, r: 15, fill: "#FF0000" }
});

let newCircle19 = document.createElementNS(svgns, "circle");
gsap.set(newCircle19, {
    attr: { cx: 578, cy: 625, r: 15, fill: "#FF0000" }
});

let newCircle20 = document.createElementNS(svgns, "circle");
gsap.set(newCircle20, {
    attr: { cx: 578, cy: 625, r: 15, fill: "#FF0000" }
});

let newCircle21 = document.createElementNS(svgns, "circle");
gsap.set(newCircle21, {
    attr: { cx: 562, cy: 170, r: 15, fill: "#FF0000" }
});

let newCircle22 = document.createElementNS(svgns, "circle");
gsap.set(newCircle22, {
    attr: { cx: 802, cy: 397.5, r: 15, fill: "#FF0000" }
});

let newCircle23 = document.createElementNS(svgns, "circle");
gsap.set(newCircle23, {
    attr: { cx: 150, cy: 471, r: 15, fill: "#FF0000" }
});

let texta0 = document.createElementNS(svgns, "text");
let texta1 = document.createElementNS(svgns, "text");
let textb0 = document.createElementNS(svgns, "text");
let textb1 = document.createElementNS(svgns, "text");
let textOutput1 = document.createElementNS(svgns, "text");
let textOutput2 = document.createElementNS(svgns, "text");
let textOutput3 = document.createElementNS(svgns, "text");

texta0.textContent = 2;
texta1.textContent = 2;
textb0.textContent = 2;
textb1.textContent = 2;
textOutput1.textContent = 2;
textOutput2.textContent = 2;
textOutput3.textContent = 2;
svg.appendChild(newCircle);
svg.appendChild(newCircle1);
svg.appendChild(newCircle2);
svg.appendChild(newCircle3);
svg.appendChild(newCircle4);
svg.appendChild(newCircle5);
svg.appendChild(newCircle6);
svg.appendChild(newCircle7);
svg.appendChild(newCircle8);
svg.appendChild(newCircle9);
svg.appendChild(newCircle10);
svg.appendChild(newCircle11);
svg.appendChild(newCircle12);
svg.appendChild(newCircle13);
svg.appendChild(newCircle22);
svg.appendChild(newCircle14);
svg.appendChild(newCircle15);
svg.appendChild(newCircle16);
svg.appendChild(newCircle17);
svg.appendChild(newCircle18);
svg.appendChild(newCircle19);
svg.appendChild(newCircle20);
svg.appendChild(newCircle21);
svg.appendChild(newCircle22);
svg.appendChild(newCircle23);

gsap.set(texta0, {
    x: 16,
    y: 24,
});
gsap.set(texta1, {
    x: 16,
    y: 124,
});
gsap.set(textb0, {
    x: 16,
    y: 224,
});
gsap.set(textb1, {
    x: 16,
    y: 324,
});

gsap.set(textOutput3, {
    x: 908,
    y: 629,

});
gsap.set(textOutput1, {
    x: 908,
    y: 174,

});

gsap.set(textOutput2, {
    x: 908,
    y: 401.5,

});

svg.appendChild(texta0);
svg.appendChild(texta1);
svg.appendChild(textb0);
svg.appendChild(textb1);
svg.appendChild(textOutput1);
svg.appendChild(textOutput2);
svg.appendChild(textOutput3);

const a1 = document.getElementById("input1");
const b1 = document.getElementById("input2");
const b0 = document.getElementById("input3");
const a0 = document.getElementById("input4");
const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");
const output3 = document.getElementById("output3");

function free() {
    document.getElementById("Observations").innerHTML = "";
}
function and(a,b,c) {
    if (a === "1" && b === "1") {
        setter("1", c);
    }
    else {
        setter("0", c);
    }
    if(a === "1" && b === "1"){
        return "1";
    }
    else{
        return "0";
    }
}

function nand(a,b,c) {
    if (a === "1" && b === "1") {
        setter("0", c);
    }
    else {
        setter("1", c);
    }
    
    if(a === "1" && b === "1"){
        return "0";
    }
    else{
        return "1";
    }
}
function nandFor3Gates(a,b,c,d) {
    if (a === "1" && b === "1" && c === "1") {
        setter("0", d);
    }
    else {
        setter("1", d);
    }
    
    if(a === "1" && b === "1" && c === "1"){
        return "0";
    }
    else{
        return "1";
    }
}

function xnor(a,b,c) {
    if (a === "b") {
        setter("1", c);
    }
    else {
        setter("0", c);
    }
    if(a === b){
        return "1";
    }
    else{
        return "0";
    }
}

function nor(a,b,c) {
    if (a === "0" && b === "0") {
        setter("1", c);
    }
    else {
        setter("0", c);
    }
    if(a === "0" && b === "0"){
        return "1";
    }
    else{
        return "0";
    }
}

function not(a,c) {
    if(a === "1"){
        setter("0",c);
        return "0";
    }
    if(a === "0"){
        setter("1",c);
        return "1";
    }
}
function outputHandle(){
    textOutput1.textContent = and(xnor(texta1.textContent,textb1.textContent,newCircle13),xnor(texta0.textContent,textb0.textContent,newCircle14),newCircle21);
    textOutput3.textContent = nandFor3Gates(nand(textb1.textContent,not(texta1.textContent,newCircle6),newCircle15),nandFor3Gates(textb0.textContent,not(texta0.textContent,newCircle9),not(texta1.textContent,newCircle10),newCircle16),nandFor3Gates(textb1.textContent,textb0.textContent,not(texta0.textContent,newCircle23),newCircle17),newCircle20);
    textOutput2.textContent = nor(textOutput1.textContent,textOutput3.textContent,newCircle22);
    setter(textOutput1.textContent,newCircle21);
    setter(textOutput1.textContent,newCircle18);
    setter(textOutput3.textContent,newCircle20);
    setter(textOutput3.textContent,newCircle19);
}

function allDisappear() {
    TweenLite.to(newCircle, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle1, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle2, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle3, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle4, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle5, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle6, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle7, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle8, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle9, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle10, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle11, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle12, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle13, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle14, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle15, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle16, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle17, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle18, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle19, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle20, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle21, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle22, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle23, 0, { autoAlpha: 0 });
    TweenLite.to(texta0, 0, { autoAlpha: 0 });
    TweenLite.to(texta1, 0, { autoAlpha: 0 });
    TweenLite.to(textb0, 0, { autoAlpha: 0 });
    TweenLite.to(textb1, 0, { autoAlpha: 0 });
    TweenLite.to(textOutput1, 0, { autoAlpha: 0 });
    TweenLite.to(textOutput2, 0, { autoAlpha: 0 });
    TweenLite.to(textOutput3, 0, { autoAlpha: 0 });
    gsap.set(a0, {

        fill: "#008000"
    });
    gsap.set(a1, {

        fill: "#008000"
    });
    gsap.set(b0, {

        fill: "#008000"
    });

    gsap.set(b1, {

        fill: "#008000"
    });
    gsap.set(output1, {

        fill: "#008000"
    });
    gsap.set(output2, {
            
            fill: "#008000"
    });
    gsap.set(output3, {
    
        fill: "#008000"
    });
}
function set(a) {
    gsap.set(a, {
        fill: "#eeeb22"
    });
}//output 0
function unset(a) {
    gsap.set(a, {
        fill: "#29e"
    });
}//output 1
function setter(a, b) {
    if (a === "1") {
        unset(b);
    }
    else if (a === "0") {
        set(b);
    }
}
function input1() {
    if (texta1.textContent !== "0") {
        TweenLite.to(texta1, 0, { autoAlpha: 0 });
        texta1.textContent = 0;
        svg.appendChild(texta1);
        gsap.set(texta1, {
            x: 16,
            y: 24,
        });
        gsap.set(a1, {
            fill: "#eeeb22"
        });
        document.getElementById("Observations").innerHTML = "";
        TweenLite.to(texta1, 0, { autoAlpha: 1 });
        setter(texta1.textContent, newCircle);
        setter(texta1.textContent, newCircle4);
    }
    else if (texta1.textContent !== "1") {    
        TweenLite.to(texta1, 0, { autoAlpha: 0 });
        texta1.textContent = 1;
        svg.appendChild(texta1);
        gsap.set(texta1, {
            x: 16,
            y: 24,
        });
        gsap.set(a1, {
            fill: "#29e"
        });
        document.getElementById("Observations").innerHTML = "";
        TweenLite.to(texta1, 0, { autoAlpha: 1 });
        setter(texta1.textContent, newCircle);
        setter(texta1.textContent, newCircle4);
    }
}
function input2() {
    if (textb1.textContent !== "0") {
        TweenLite.to(textb1, 0, { autoAlpha: 0 });
        textb1.textContent = 0;
        svg.appendChild(textb1);
        gsap.set(textb1, {
            x: 16,
            y: 124,
        });
        gsap.set(b1, {
            fill: "#eeeb22"
        });
        document.getElementById("Observations").innerHTML = "";
        TweenLite.to(textb1, 0, { autoAlpha: 1 });
        setter(textb1.textContent, newCircle1);
        setter(textb1.textContent, newCircle7);
        setter(textb1.textContent, newCircle12);
        
    }
    else if (textb1.textContent !== "1") {
        TweenLite.to(textb1, 0, { autoAlpha: 0 });
        textb1.textContent = 1;
        svg.appendChild(textb1);
        gsap.set(textb1, {
            x: 16,
            y: 124,

        });
        gsap.set(b1, {
            fill: "#29e"
        });
        document.getElementById("Observations").innerHTML = "";
        TweenLite.to(textb1, 0, { autoAlpha: 1 });
        setter(textb1.textContent, newCircle1);
        setter(textb1.textContent, newCircle7);
        setter(textb1.textContent, newCircle12);
    }
}

function input3() {
    if (textb0.textContent !== "0") {
        TweenLite.to(textb0, 0, { autoAlpha: 0 });
        textb0.textContent = 0;
        svg.appendChild(textb0);
        gsap.set(textb0, {
            x: 16,
            y: 224,
        });
        gsap.set(b0, {
            fill: "#eeeb22"
        });
        document.getElementById("Observations").innerHTML = "";
        TweenLite.to(textb0, 0, { autoAlpha: 1 });
        setter(textb0.textContent, newCircle2);
        setter(textb0.textContent, newCircle8);
        setter(textb0.textContent, newCircle11);
    }
    else if (textb0.textContent !== "1") {
        TweenLite.to(textb0, 0, { autoAlpha: 0 });
        textb0.textContent = 1;
        svg.appendChild(textb0);
        gsap.set(textb0, {
            x: 16,
            y: 224,
        });
        gsap.set(b0, {
            fill: "#29e"
        });
        document.getElementById("Observations").innerHTML = "";
        TweenLite.to(textb0, 0, { autoAlpha: 1 });
        setter(textb0.textContent, newCircle2);
        setter(textb0.textContent, newCircle8);
        setter(textb0.textContent, newCircle11);
    }
}

function input4() {
    if (texta0.textContent !== "0") {
        TweenLite.to(texta0, 0, { autoAlpha: 0 });
        texta0.textContent = 0;
        svg.appendChild(texta0);
        gsap.set(texta0, {
            x: 16,
            y: 324,
        });
        gsap.set(a0, {
            fill: "#eeeb22"
        });
        document.getElementById("Observations").innerHTML = "";
        TweenLite.to(texta0, 0, { autoAlpha: 1 });
        setter(texta0.textContent, newCircle3);
        setter(texta0.textContent, newCircle5);
    }
    else if (texta0.textContent !== "1") {
        TweenLite.to(texta0, 0, { autoAlpha: 0 });
        texta0.textContent = 1;
        svg.appendChild(texta0);
        gsap.set(texta0, {
            x: 16,
            y: 324,

        });
        gsap.set(a0, {
            fill: "#29e"
        });
        document.getElementById("Observations").innerHTML = "";
        TweenLite.to(texta0, 0, { autoAlpha: 1 });
        setter(texta0.textContent, newCircle3);
        setter(texta0.textContent, newCircle5);
    }
}
function outputSetter() {
    setter(textOutput1.textContent, output1);
    setter(textOutput2.textContent, output2);
    setter(textOutput3.textContent, output3);

}

function observation() {
    document.getElementById("Observations").innerHTML = "Simulation has finished. Press Restart the simulation.";
}
let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });

let speedCircuit = 1;
function setSpeed(speed) {
    if (speed === "1") {
        if (texta0.textContent !== "2" && texta1.textContent !== "2" && textb0.textContent !== "2" && textb1.textContent !== "2" && tl.progress()!==1) {
            tl.timeScale(1);
        }
    }
    else if (speed === "2") {
        if (texta0.textContent !== "2" && texta1.textContent !== "2" && textb0.textContent !== "2" && textb1.textContent !== "2" && tl.progress()!==1) {
            tl.timeScale(2);
        }
    }
    else if (speed === "4") {
        if (texta0.textContent !== "2" && texta1.textContent !== "2" && textb0.textContent !== "2" && textb1.textContent !== "2" && tl.progress()!==1) {
            tl.timeScale(4);
        }
    }
    if(tl.progress()===0){
        speedCircuit = speed;
    }

}
function workCircuit() {
    let a = document.getElementById("currentwork").innerHTML;
    if (a === "Start") {
        startCircuit();
    }
    else if (a === "Stop") {
        stopCircuit();
    }
}
function stopCircuit() {
    if (tl.time() !== 0 && tl.progress() !==1) {
        tl.pause();
        document.getElementById("currentwork").innerHTML = "Start";
        document.getElementById("Observations").innerHTML = "Simulation has been stopped."
    }
    else if(tl.progress() === 1){
        document.getElementById("Observations").innerHTML = "Please Restart the simulation"
    }
}


function startCircuit() {
    
    if (texta0.textContent !== "2" && texta1.textContent !== "2" && textb0.textContent !== "2" && textb1.textContent !== "2" && tl.progress()!==1) {
        document.getElementById("currentwork").innerHTML = "Stop";
        tl.play();
        tl.timeScale(speedCircuit);
        document.getElementById("Observations").innerHTML = "Simulation has started."
    }
    else if (texta0.textContent === "2" || texta1.textContent === "2" || textb0.textContent === "2" || textb1.textContent === "2") {
        document.getElementById("Observations").innerHTML = "Please select the values"
    }
    else if(tl.progress() === 1){
        document.getElementById("Observations").innerHTML = "Please Restart the simulation"  
    }
}


function free() {
    document.getElementById("Observations").innerHTML = "";
}

function compAtTimeZeroSecsAppear() {
    TweenLite.to(newCircle, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle1, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle2, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle3, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle4, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle5, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle7, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle8, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle11, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle12, 0, { autoAlpha: 1 });
}
function compAtTimeZeroSecsDisappear() {
    TweenLite.to(newCircle4, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle5, 0, { autoAlpha: 0 });
}
function compAtTimeFiveSecsAppear() {
    TweenLite.to(newCircle6, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle9, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle10, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle23, 0, { autoAlpha: 1 });
}
function compAtTimeFiveSecsDisappear() {
    TweenLite.to(newCircle, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle1, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle2, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle3, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle7, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle8, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle11, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle12, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle6, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle9, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle10, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle23, 0, { autoAlpha: 0 });
}
function compAtTimeTenSecsAppear() {
    TweenLite.to(newCircle13, 0, { autoAlpha: 1 }); 
    TweenLite.to(newCircle14, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle15, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle16, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle17, 0, { autoAlpha: 1 });
}
function compAtTimeTenSecsDisappear() {
    TweenLite.to(newCircle13, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle14, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle15, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle16, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle17, 0, { autoAlpha: 0 });
}
function compAtTimeFifteenSecsAppear() {
    TweenLite.to(newCircle18, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle19, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle20, 0, { autoAlpha: 1 });
    TweenLite.to(newCircle21, 0, { autoAlpha: 1 });
}
function compAtTimeFifteenSecsDisappear() {
    TweenLite.to(newCircle18, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle19, 0, { autoAlpha: 0 });
}
function compAtTimeTwentySecsAppear() {
    TweenLite.to(newCircle22, 0, { autoAlpha: 1 });
}
function compAtTimeTwentySecsDisappear() {
    TweenLite.to(newCircle22, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle20, 0, { autoAlpha: 0 });
    TweenLite.to(newCircle21, 0, { autoAlpha: 0 });
}
function compAtTimeTwentyFiveAecsAppear() {
    TweenLite.to(textOutput1, 0, { autoAlpha: 1 });
    TweenLite.to(textOutput2, 0, { autoAlpha: 1 });
    TweenLite.to(textOutput3, 0, { autoAlpha: 1 });
    
    
}

tl.add(compAtTimeZeroSecsAppear,0);
tl.add(compAtTimeZeroSecsDisappear,5);
tl.add(compAtTimeFiveSecsAppear,5);
tl.add(compAtTimeFiveSecsDisappear,10);
tl.add(compAtTimeTenSecsAppear,10);
tl.add(compAtTimeTenSecsDisappear,15);
tl.add(compAtTimeFifteenSecsAppear,15);
tl.add(compAtTimeFifteenSecsDisappear,20);
tl.add(compAtTimeTwentySecsAppear,20);
tl.add(compAtTimeTwentySecsDisappear,25);
tl.add(compAtTimeTwentyFiveAecsAppear,25);
tl.add(outputHandle, 0);
tl.add(outputSetter, 25);
tl.eventCallback("onComplete", observation);
tl.to(newCircle, {
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
tl.to(newCircle1, {
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
tl.to(newCircle2, {
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
tl.to(newCircle3, {
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
tl.to(newCircle4, {
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
tl.to(newCircle5, {
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

tl.to(newCircle6, {
    motionPath: {
        path: "#path7",
        align: "#path7",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 5);
tl.to(newCircle7, {
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

tl.to(newCircle8, {
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

tl.to(newCircle9, {
    motionPath: {
        path: "#path10",
        align: "#path10",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 5);

tl.to(newCircle10, {
    motionPath: {
        path: "#path11",
        align: "#path11",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 5);

tl.to(newCircle11, {
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

tl.to(newCircle12, {
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

tl.to(newCircle13, {
    motionPath: {
        path: "#path14",
        align: "#path14",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 10);

tl.to(newCircle14, {
    motionPath: {
        path: "#path15",
        align: "#path15",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 10);

tl.to(newCircle15, {
    motionPath: {
        path: "#path16",
        align: "#path16",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 10);

tl.to(newCircle16, {
    motionPath: {
        path: "#path17",
        align: "#path17",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 10);

tl.to(newCircle17, {
    motionPath: {
        path: "#path18",
        align: "#path18",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 10);

tl.to(newCircle18, {
    motionPath: {
        path: "#path19",
        align: "#path19",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 15);

tl.to(newCircle19, {
    motionPath: {
        path: "#path20",
        align: "#path20",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 15);

tl.to(newCircle20, {
    motionPath: {
        path: "#path21",
        align: "#path21",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 15);

tl.to(newCircle21, {
    motionPath: {
        path: "#path22",
        align: "#path22",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 15);

tl.to(newCircle22, {
    motionPath: {
        path: "#path23",
        align: "#path23",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 20);

tl.to(newCircle23, {
    motionPath: {
        path: "#path24",
        align: "#path24",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,
}, 5);

tl.pause();
allDisappear();