import {gates, testSimulation} from './gate.js';
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
        testSimulation(gates_list);
        const agtb = gates_list[outputA].output ? 1 : 0;
        const altb = gates_list[outputB].output ? 1 : 0;
        const aeqb = gates_list[outputC].output ? 1 : 0;

        dataTable += `<tr><th>${binary[3]}&nbsp;${binary[2]}</th><th>${binary[1]}&nbsp;${binary[0]}</th><td>${altb}</td><td>${aeqb}</td><td>${agtb}</td></tr>`

        if(AgtB != agtb || AltB != altb || AeqB != aeqb)
            cicuitIsCorrect = false;
            
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
