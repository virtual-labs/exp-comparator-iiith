import * as gatejs from "./gate.js";
import { wireColours } from "./layout.js";
'use strict';
let num_wires = 0;

document.getScroll = function () {
    if (window.pageYOffset != undefined) {
        return [pageXOffset, pageYOffset];
    } else {
        let sx, sy, d = document,
            r = d.documentElement,
            b = d.body;
        sx = r.scrollLeft || b.scrollLeft || 0;
        sy = r.scrollTop || b.scrollTop || 0;
        return [sx, sy];
    }
}
const workingArea = document.getElementById("working-area");
export const jsPlumbInstance = jsPlumbBrowserUI.newInstance({
    container: workingArea,
    maxConnections: -1,
    endpoint: {
        type: "Dot",
        options: { radius: 7 },
    },
    dragOptions: {
        containment: "parentEnclosed",
        containmentPadding: 5,
    },
    connector: "Flowchart",
    paintStyle: { strokeWidth: 4, stroke: "#888888" },
    connectionsDetachable: false,
});

// This is an event listener for establishing connections between gates
export const connectGate = function () {
    jsPlumbInstance.bind("beforeDrop", function (data) {
        const fromEndpoint = data.connection.endpoints[0];
        const toEndpoint = data.dropEndpoint;

        const start_uuid = fromEndpoint.uuid.split(":")[0];
        const end_uuid = toEndpoint.uuid.split(":")[0];

        if (fromEndpoint.elementId === toEndpoint.elementId) {
            return false;
        }

        if (start_uuid === "input" && end_uuid === "input") {
            return false;
        } else if (start_uuid === "output" && end_uuid === "output") {
            return false;
        } else if ((end_uuid==="input" && toEndpoint.connections.length > 0) || (start_uuid==="input" && fromEndpoint.connections.length>1)) {
            // If it already has a connection, do not establish a new connection
            return false;
        } else {
            // console.log("connected");
            jsPlumbInstance.connect({
                uuids: [fromEndpoint.uuid, toEndpoint.uuid],
                paintStyle: { stroke: wireColours[num_wires], strokeWidth: 4 },
            });
            num_wires++;
            num_wires = num_wires % wireColours.length;
            if (start_uuid === "output") {
                let input = gatejs.gates[fromEndpoint.elementId];
                input.isConnected = true;
                gatejs.gates[toEndpoint.elementId].addInput(input);
            } else if (end_uuid === "output") {
                let input = gatejs.gates[toEndpoint.elementId];
                input.isConnected = true;
                gatejs.gates[fromEndpoint.elementId].addInput(input);
            }
        }
    });
};



export const unbindEvent = () => {
    jsPlumbInstance.unbind("beforeDrop");
}


export function registerGate(id, gate) {
    const element = document.getElementById(id);
    const gateType = id.split("-")[0];

    if (
        gateType === "AND" ||
        gateType === "OR" ||
        gateType === "XOR" ||
        gateType === "XNOR" ||
        gateType === "NAND" ||
        gateType === "NOR"
    ) {
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, -9],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
            })
        );
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, 10],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:1:" + id,
            })
        );
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.5, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
            })
        );
    } else if (gateType === "NOT") {
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
            })
        );
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.5, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
            })
        );
    } 
    else if (gateType === "THREEIPNAND") {
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, -11],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
            })
        );
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:1:" + id,
            })
        );
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, 12],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:2:" + id,
            })
        );
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.5, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
            })
        );
    } else if (gateType === "Input") {
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.5, 0, 1, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
            })
        );
    } else if (gateType === "Output") {
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
            })
        );
    }
}
export function initComparator() {
    const ids = ["Input-0", "Input-1", "Input-2", "Input-3", "Output-4", "Output-5", "Output-6"]; // [A B Sum Carry Out]
    const types = ["Input", "Input", "Input", "Input", "Output", "Output", "Output"];
    const names = ["A0", "A1", "B0", "B1", "A&gt;B", "A&lt;B", "A=B"];
    const positions = [
        { x: 230, y: 50 },
        { x: 160, y: 50 },
        { x: 90, y: 50 },
        { x: 20, y: 50 },
        { x: 820, y: 400 },
        { x: 820, y: 600 },
        { x: 820, y: 200 },
    ];
    for (let i = 0; i < ids.length; i++) {
        let gate = new gatejs.Gate(types[i]);
        gate.setId(ids[i]);
        gate.setName(names[i]);
        const component = gate.generateComponent();
        const parent = document.getElementById("working-area");
        parent.insertAdjacentHTML('beforeend', component);
        gate.registerComponent("working-area", positions[i].x, positions[i].y);;
    }
}


export function refreshWorkingArea() {
    jsPlumbInstance.reset();
    window.numComponents = 0;

    gatejs.clearGates();
}

// window.getInfo = function () {
//     console.log(gatejs.gates);
// }



window.currentTab = "task1";
connectGate();
refreshWorkingArea();
initComparator();
