import {gates, testSimulation} from './gate.js';
import { fullAdder, testSimulationFA, testSimulationAS } from "./fa.js";
'use strict';

// Helper functions
export function computeXor(a, b) {
    return a != b;
}
export function computeAnd(a, b) {
    return a && b;
}
export function computeOr(a, b) {
    return a || b;
}
export function computeXnor(a, b) {
    return a == b;
}
export function computeNand(a, b) {
    return !(a && b);
}
export function computeNor(a, b) {
    return !(a || b);
}

export function testComparator(inputA,inputB, inputC, inputD, outputA, outputB, outputC)  // This function takes 4 ids of the respective Gates
{
    let gates_list = gates;


    let input0 = gates_list[inputA]; // A0
    let input1 = gates_list[inputB]; // A1
    let input2 = gates_list[inputC]; // B0
    let input3 = gates_list[inputD]; // B1
    let cicuitIsCorrect = true;
    let head = '';
    head = '<tr><th colspan="2">Input</th><th colspan="3">Result</th></tr><tr><th>A1&nbsp;A0</th><th>B1&nbsp;B0</th><th>A&lt;B</th><th>A=B</th><th>A&gt;B</th></tr>'

  document.getElementById("table-head").innerHTML = head;

    let dataTable = ''

    for(let i=0; i<16;i++)
    {
        //convert i to binary
        let binary = i.toString(2).padStart(4, '0');
        binary = binary.split("").reverse().join("");
        

        input3.setOutput(binary[1] === "1");
        input2.setOutput(binary[0] === "1");
        input1.setOutput(binary[3] === "1");
        input0.setOutput(binary[2] === "1");
        const A0 = binary[2] === "1";
        const A1 = binary[3] === "1";
        const B0 = binary[0] === "1";
        const B1 = binary[1] === "1";

        const AgtB = computeAnd(A1, !B1) || (!B0 && ((A0 && !B1) || computeAnd(A1 ,A0))) ? 1 : 0;
        const AltB = computeAnd(B1,!A1) || computeAnd(B0,B1) && !A0 || computeNor(A0,A1) && B0 ? 1 : 0;
        const AeqB = computeAnd(computeXnor(A0,B0),computeXnor(A1,B1)) ? 1 : 0;

        // simulate the circuit
        if(!testSimulation(gates_list)){
            return;
        }
        const agtb = gates_list[outputA].output ? 1 : 0;
        const altb = gates_list[outputB].output ? 1 : 0;
        const aeqb = gates_list[outputC].output ? 1 : 0;

        

        if(AgtB != agtb || AltB != altb || AeqB != aeqb) {
            cicuitIsCorrect = false;
            dataTable += `<tr class="bold-table"><th>${binary[3]}&nbsp;${binary[2]}</th><th>${binary[1]}&nbsp;${binary[0]}</th><td class="failure-table">${altb}</td><td class="failure-table">${aeqb}</td><td class="failure-table">${agtb}</td></tr>`
        }
        else {
            dataTable += `<tr class="bold-table"><th>${binary[3]}&nbsp;${binary[2]}</th><th>${binary[1]}&nbsp;${binary[0]}</th><td class="success-table">${altb}</td><td class="success-table">${aeqb}</td><td class="success-table">${agtb}</td></tr>`
        }
            
    }

    const table_elem = document.getElementById('table-body');
    table_elem.insertAdjacentHTML('beforeend', dataTable);

    const result = document.getElementById('result');

    if(cicuitIsCorrect)
    {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else
    {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}

export function testComparator1(inputA,inputB, inputC, inputD, outputA, outputB, outputC)  // This function takes 4 ids of the respective Gates
{
    let gates_list = gates;
    let fA = fullAdder;

    let inputA0 = gates_list[inputA]; // A0
    let inputA1 = gates_list[inputB]; // A1
    let inputB0 = gates_list[inputC]; // B0
    let inputB1 = gates_list[inputD]; // B1
    let cicuitIsCorrect = true;
    let head = '';
    head = '<tr><th colspan="2">Input</th><th colspan="3">Result</th></tr><tr><th>A1&nbsp;A0</th><th>B1&nbsp;B0</th><th>A&lt;B</th><th>A=B</th><th>A&gt;B</th></tr>'

  document.getElementById("table-head").innerHTML = head;
  let dataTable = ''

  for(let i=0; i<16;i++)
    {
        //convert i to binary
        let binary = i.toString(2).padStart(4, '0');
        binary = binary.split("").reverse().join("");
        

        inputB1.setOutput(binary[1] === "1");
        inputB0.setOutput(binary[0] === "1");
        inputA1.setOutput(binary[3] === "1");
        inputA0.setOutput(binary[2] === "1");
        const A0 = binary[2] === "1";
        const A1 = binary[3] === "1";
        const B0 = binary[0] === "1";
        const B1 = binary[1] === "1";
        const carryIn = true

         // FOR FIRST ADDER
         const aXorb = computeXor(A0, !B0);
         // calculated sum is ((a xor b) xor carry_in)
         const sumS0 = computeXor(aXorb, carryIn);
         // calculated carry is a.b + (a xor b).c
         const carryC1 = computeOr(
             computeAnd(A0, !B0),
             computeAnd(aXorb, carryIn)
         );

         // FOR SECOND ADDER
        const aXorb2 = computeXor(A1, !B1);
        // calculated sum is ((a xor b) xor carry_in)
        const sumS1 = computeXor(aXorb2, carryC1);
        // calculated carry is a.b + (a xor b).c
        const carryC2 = computeOr(
            computeAnd(A1, !B1),
            computeAnd(aXorb2, carryC1)
        );

        const AltB = carryC2 ? 0 : 1;
        const AgtB = ((sumS0 || sumS1) && carryC2) ? 1 : 0;
        const AeqB = (!sumS1 && !sumS0 && carryC2) ? 1 : 0;
        console.log(AltB,AeqB,AgtB)

        // simulate the circuit
        if(!testSimulationAS(fA, gates_list)){
            return;
        }
        
        const agtb = gates_list[outputA].output ? 1 : 0;
        const altb = gates_list[outputB].output ? 1 : 0;
        const aeqb = gates_list[outputC].output ? 1 : 0;

        if(AgtB != agtb || AltB != altb || AeqB != aeqb) {
            cicuitIsCorrect = false;
            dataTable += `<tr class="bold-table"><th>${binary[3]}&nbsp;${binary[2]}</th><th>${binary[1]}&nbsp;${binary[0]}</th><td class="failure-table">${altb}</td><td class="failure-table">${aeqb}</td><td class="failure-table">${agtb}</td></tr>`
        }
        else {
            dataTable += `<tr class="bold-table"><th>${binary[3]}&nbsp;${binary[2]}</th><th>${binary[1]}&nbsp;${binary[0]}</th><td class="success-table">${altb}</td><td class="success-table">${aeqb}</td><td class="success-table">${agtb}</td></tr>`
        }
    }
    const table_elem = document.getElementById('table-body');
    table_elem.insertAdjacentHTML('beforeend', dataTable);

    const result = document.getElementById('result');

    if(cicuitIsCorrect)
    {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else
    {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}
