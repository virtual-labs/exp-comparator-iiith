import {gates, testSimulation} from './gate.js';


export function testComparator(Input0,Input1, Input2, Input3, Output0, Output1, Output2)  // This function takes 4 ids of the respective Gates
{
    // Gates[input0].outputs = true;
    // Gates[input1].outputs = true;
    let gates_list = gates;


    let input0 = gates_list[Input0]; // A0
    let input1 = gates_list[Input1]; // A1
    let input2 = gates_list[Input2]; // B0
    let input3 = gates_list[Input3]; // B1
    let flag = 0;

    let dataTable = ''

    for(let i=0; i<16;i++)
    {
        //convert i to binary
        let binary = i.toString(2);
        if(binary.length < 2)
            binary = '0' + binary;
        if(binary.length < 3)
            binary = '0' + binary;
        if(binary.length < 4)
            binary = '0' + binary;
        
        const bit0 = binary[3]; // B0
        const bit1 = binary[2]; // B1
        const bit2 = binary[1]; // A0
        const bit3 = binary[0]; // A1

        input3.setOutput(bit1 == "1");
        input2.setOutput(bit0 == "1");
        input1.setOutput(bit3 == "1");
        input0.setOutput(bit2 == "1");
        const A0 = bit2 == "1";
        const A1 = bit3 == "1";
        const B0 = bit0 == "1";
        const B1 = bit1 == "1";

        const AgtB = A1 && !B1 || (!B0 && ((A0 && !B1) || (A1 && A0))) ? 1 : 0;
        const AltB = B1 && !A1 || B0 && B1 && !A0 || !A0 && !A1 && B0 ? 1 : 0;
        const AeqB = ((A0 && B0) || (!A0 && !B0)) && ((A1 && B1) || (!A1 && !B1)) ? 1 : 0;

        // simulate the circuit
        testSimulation(gates_list);
        const agtb = gates_list[Output0].output ? 1 : 0;
        const altb = gates_list[Output1].output ? 1 : 0;
        const aeqb = gates_list[Output2].output ? 1 : 0;

        dataTable += '<tr><th>'+ bit3+"&nbsp;"+bit2 +'</th><th>'+ bit1+"&nbsp;"+bit0 +'</th><td>'+ altb +'</td><td>'+ aeqb +'</td><td>'+ agtb +'</td></tr>'

        if(AgtB != agtb || AltB != altb || AeqB != aeqb)
            flag = 1;
            
    }

    const table_elem = document.getElementById('table-body');
    table_elem.insertAdjacentHTML('beforeend', dataTable);

    const result = document.getElementById('result');

    if(flag == 0)
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
