# 2-bit Comparator

## Components Required - 

* 2 XNOR gates
* 2 NOT gates
* 1 AND gate
* 1 2-input NAND gate
* 3 3-input NAND gates
* 1 NOR gate

## Circuit Connections - 

* Drag the first XNOR gate and connect its input points to input bits A1 and B1. 
* Drag the second XNOR gate and connect its input points to input bits A0 and B0. 
* Drag two NOT gates and connect their input points with A1 and A0 input bits respectively.
* Drag the 2-input NAND gate and connect its input points with input bit B1 and the output of the first NOT gate.
* Drag the first 3-input NAND gate and connect its input points with input bit B0 and the outputs of both the NOT gates.
* Drag the second 3-input NAND gate and connect its input points with input bits B0 and B1 and the output of the second NOT gate.   
* Drag the third 3-input NAND gate and connect its input points with the output points of the 2-input NAND gate and the other two 3-input NAND gates. Connect its output point with the A < B output bit.
* Drag an AND gate and connect its input points with the output points of the two XNOR gates. Also, connect its output point with the A = B output bit.
* Drag the NOR gate and connect its input points with the output points of the AND gate and the third 3-input NAND gate.
* Connect output of the NOR gate to the A > B output bit and after setting the values of A0,A1,B0,and B1 click "Simulate". 

## Observations - 

* A = B output bit is one when the binary number A1A0 is equal to B1B0 and the other two output bits show 0.
* A < B output bit is one when the binary number A1A0 is less than B1B0 and the other two output bits show 0.
* A > B output bit is one when the binary number A1A0 is greater than B1B0 and the other two output bits show 0.
* If the circuit has been made as described as above, then upon clicking the "Submit" button a "Success" message will be displayed.
