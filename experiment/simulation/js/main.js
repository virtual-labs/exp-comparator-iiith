import * as gatejs from "./gate.js";
import {wireColours} from "./layout.js";

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

export const bindEvent1 = function () {
    jsPlumbInstance.bind("beforeDrop", function (data) {
        let endpoint = data.connection.endpoints[0];
        let dropEndpoint = data.dropEndpoint;

        const start_uuid = endpoint.uuid.split(":")[0];
        const end_uuid = dropEndpoint.uuid.split(":")[0];
        
        if (endpoint.elementId == dropEndpoint.elementId) {
            return false;
        }

        if (start_uuid == "input" && end_uuid == "input") {
            return false;
        } else if (start_uuid == "output" && end_uuid == "output") {
            return false;
        } else {
            jsPlumbInstance.connect({ uuids: [endpoint.uuid, dropEndpoint.uuid], paintStyle:{ stroke: wireColours[num_wires], strokeWidth:4 }});
            num_wires++;
            num_wires = num_wires % wireColours.length;
            if (start_uuid == "output") {
                let input = gatejs.gates[endpoint.elementId];
                input.isConnected = true;
                gatejs.gates[dropEndpoint.elementId].addInput(input);
            } else if (end_uuid == "output") {
                let input = gatejs.gates[dropEndpoint.elementId];
                input.isConnected = true;
                gatejs.gates[endpoint.elementId].addInput(input);
            }

            // return true;
        }
    });
}



export const unbindEvent = () => {
    jsPlumbInstance.unbind("beforeDrop");
}


export function registerGate(id, gate) {
    const element = document.getElementById(id);
    const gateType = id.split("-")[0];

    if (
        gateType == "AND" ||
        gateType == "OR" ||
        gateType == "XOR" ||
        gateType == "XNOR" ||
        gateType == "NAND" ||
        gateType == "NOR"
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
    } else if (gateType == "NOT") {
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
    } else if (gateType == "Input") {
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.5, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
            })
        );
    } else if (gateType == "Output") {
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
    let ids = ["Input-0", "Input-1", "Input-2", "Input-3", "Output-4", "Output-5", "Output-6"]; // [A B Sum Carry Out]
    let types = ["Input", "Input", "Input", "Input" ,"Output", "Output", "Output"];
    let names = ["A0", "A1", "B0", "B1", "A&gt;B", "A&lt;B", "A=B"];
    let positions = [
        { x: 40, y: 100 },
        { x: 40, y: 300 },
        { x: 40, y: 500 },
        { x: 40, y: 700 },
        { x: 820, y: 200 },
        { x: 820, y: 400 },
        { x: 820, y: 600 },
    ];
    for (let i = 0; i < ids.length; i++) {
        let gate = new gatejs.Gate(types[i]);
        gate.setId(ids[i]);
        gate.setName(names[i]);
        const component = gate.generateComponent();
        const parent = document.getElementById("working-area");
        parent.insertAdjacentHTML('beforeend', component);
        gate.registerComponent("working-area",positions[i].x, positions[i].y);;
    }
}


export function refreshWorkingArea() {
    jsPlumbInstance.reset();
    window.numComponents = 0;

    gatejs.clearGates();
}



window.currentTab = "Task1";
bindEvent1();
refreshWorkingArea();
initComparator();
