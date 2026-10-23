import * as gatejs from "./gate.js";
import * as fajs from "./fa.js";
import { wireColours } from "./layout.js";
import { deleteElement } from "./gate.js";
import { deleteFA } from "./fa.js";
("use strict");
let num_wires = 0;

// Utility function to safely delete JSPlumb connections
function safeDeleteConnection(connection) {
  try {
    jsPlumbInstance.deleteConnection(connection);
    return true;
  } catch (error) {
    console.log("JSPlumb deleteConnection failed:", error);
    // Try to remove the DOM element as fallback
    try {
      if (
        connection.connector &&
        connection.connector.canvas &&
        connection.connector.canvas.parentNode
      ) {
        connection.connector.canvas.parentNode.removeChild(
          connection.connector.canvas
        );
        return true;
      }
    } catch (domError) {
      console.log("DOM removal also failed:", domError);
    }
    return false;
  }
}

document.getScroll = function () {
  if (window.scrollY != undefined) {
    return [scrollX, scrollY];
  } else {
    let sx,
      sy,
      d = document,
      r = d.documentElement,
      b = d.body;
    sx = r.scrollLeft || b.scrollLeft || 0;
    sy = r.scrollTop || b.scrollTop || 0;
    return [sx, sy];
  }
};
const workingArea = document.getElementById("working-area");
export const jsPlumbInstance = jsPlumbBrowserUI.newInstance({
  container: workingArea,
  maxConnections: -1,
  endpoint: {
    type: "Dot",
    options: { radius: 6 },
  },
  dragOptions: {
    containment: "parentEnclosed",
    containmentPadding: 5,
  },
  connector: "Flowchart",
  paintStyle: { strokeWidth: 4, stroke: "#888888" },
  connectionsDetachable: false,
});

// Returns the component (gate, input/output bit or full adder) with the given id
function findComponent(id) {
  return gatejs.gates[id] || fajs.fullAdder[id] || null;
}

// Returns the id of the label overlay of an endpoint (the pin name); it is empty for gates and input/output bits
function pinLabel(endpoint) {
  const keys = Object.keys(endpoint.overlays || {});
  return keys.length > 0 ? keys[0] : "";
}

// Tells which output of a component a wire starts from: "Sum" or "Carry" for a full adder, "" for everything else
function outputPos(component, endpoint) {
  if (component instanceof fajs.FullAdder) {
    return pinLabel(endpoint).includes("sum") ? "Sum" : "Carry";
  }
  return "";
}

// Returns the output endpoint and the input endpoint of a wire, whichever way it was drawn
function splitEndpoints(epA, epB) {
  return epA.uuid.startsWith("output") ? [epA, epB] : [epB, epA];
}

// Records a new wire in the circuit model. It works the same for gates, input/output bits and full adders, and for both
// directions in which a wire can be dragged (from an output point to an input point or the other way round).
function linkEndpoints(fromEndpoint, toEndpoint) {
  const [outEp, inEp] = splitEndpoints(fromEndpoint, toEndpoint);
  const driver = findComponent(outEp.elementId);
  const sink = findComponent(inEp.elementId);
  if (!driver || !sink) {
    return;
  }
  const pos = outputPos(driver, outEp);

  // the component that drives the wire
  if (driver instanceof fajs.FullAdder) {
    if (pos === "Sum") {
      driver.addSum(sink);
    } else {
      driver.addCout(sink);
    }
    driver.setConnected(true, pos);
  } else {
    driver.addOutput(sink);
    driver.setConnected(true);
  }

  // the component that receives the wire
  if (sink instanceof fajs.FullAdder) {
    const pin = pinLabel(inEp);
    if (pin.includes("a0")) {
      sink.setA0([driver, pos]);
    } else if (pin.includes("b0")) {
      sink.setB0([driver, pos]);
    } else if (pin.includes("cin")) {
      sink.setCin([driver, pos]);
    }
  } else {
    sink.addInput(driver, pos);
    if (sink.isOutput) {
      fajs.finalOutputs[sink.id] = [driver, pos];
    }
  }
}

// Removes a single occurrence of item from list
function removeOne(list, item) {
  const index = list.indexOf(item);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

// Removes a deleted wire from the circuit model
function unlinkEndpoints(connection, epA, epB) {
  if (!epA || !epB || !epA.uuid || !epB.uuid) {
    return;
  }
  const [outEp, inEp] = splitEndpoints(epA, epB);
  if (!outEp.uuid.startsWith("output") || !inEp.uuid.startsWith("input")) {
    return;
  }
  const driver = findComponent(outEp.elementId);
  const sink = findComponent(inEp.elementId);
  if (!driver || !sink) {
    return;
  }
  const pos = outputPos(driver, outEp);
  // the driver stays connected only if it has another wire
  const lastWire = outEp.connections.filter((c) => c !== connection).length === 0;

  if (driver instanceof fajs.FullAdder) {
    removeOne(pos === "Sum" ? driver.outSum : driver.outCout, sink);
  } else {
    removeOne(driver.outputs, sink);
  }
  if (lastWire) {
    driver.setConnected(false, pos);
  }

  if (sink instanceof fajs.FullAdder) {
    const pin = pinLabel(inEp);
    if (pin.includes("a0")) {
      sink.setA0([]);
    } else if (pin.includes("b0")) {
      sink.setB0([]);
    } else if (pin.includes("cin")) {
      sink.setCin([]);
    }
  } else {
    const index = sink.inputs.findIndex(
      (source, i) => source === driver && sink.input_pos[i] === pos
    );
    if (index !== -1) {
      sink.inputs.splice(index, 1);
      sink.input_pos.splice(index, 1);
    }
    if (sink.isOutput) {
      fajs.finalOutputs[sink.id] = [];
    }
  }
}

// Keep the circuit model in sync when a wire is deleted
jsPlumbInstance.bind("connection:detach", function (info) {
  unlinkEndpoints(info.connection, info.sourceEndpoint, info.targetEndpoint);
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
    } else if (
      (end_uuid === "input" && toEndpoint.connections.length > 0) ||
      (start_uuid === "input" && fromEndpoint.connections.length > 1)
    ) {
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
      linkEndpoints(fromEndpoint, toEndpoint);
    }
  });
};

// This is an event listener for establishing connections between Full adders and gates
export const connectFA = function () {
  jsPlumbInstance.bind("beforeDrop", function (data) {
    const fromEndpoint = data.connection.endpoints[0];
    const toEndpoint = data.dropEndpoint;

    const start_uuid = fromEndpoint.uuid.split(":")[0];
    const end_uuid = toEndpoint.uuid.split(":")[0];

    if (fromEndpoint.elementId == toEndpoint.elementId) {
      return false;
    }

    if (start_uuid === "input" && end_uuid === "input") {
      return false;
    } else if (start_uuid === "output" && end_uuid === "output") {
      return false;
    } else if (
      (end_uuid === "input" && toEndpoint.connections.length > 0) ||
      (start_uuid === "input" && fromEndpoint.connections.length > 1)
    ) {
      // If it already has a connection, do not establish a new connection
      return false;
    } else {
      jsPlumbInstance.connect({
        uuids: [fromEndpoint.uuid, toEndpoint.uuid],
        paintStyle: { stroke: wireColours[num_wires], strokeWidth: 4 },
      });
      num_wires++;
      num_wires = num_wires % wireColours.length;
      linkEndpoints(fromEndpoint, toEndpoint);
    }
  });
};

export const unbindEvent = () => {
  jsPlumbInstance.unbind("beforeDrop");
};

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
  } else if (gateType === "THREEIPNAND") {
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
        anchor: [1, 0.5, 1, 0, 7, 0],
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
  } else if (gateType === "FullAdder") {
    // carry output
    gate.addOutputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [0, 0.5, -1, 0, -7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "output:0:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "Cout", id: "cout", location: [3, 0.2] },
          },
        ],
      })
    );
    // sum output
    gate.addOutputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [0.5, 1, 0, 1, 0, 7],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "output:1:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "Sum", id: "sum", location: [0.3, -1.7] },
          },
        ],
      })
    );
    // input A0
    gate.addInputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [0.5, 0, 0, -1, -25, -7],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "input:0:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "A0", id: "a0", location: [0.3, 1.7] },
          },
        ],
      })
    );
    // input B0
    gate.addInputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [0.5, 0, 0, -1, 25, -7],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "input:1:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "B0", id: "b0", location: [0.3, 1.7] },
          },
        ],
      })
    );
    // carry input
    gate.addInputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [1, 0.5, 1, 0, 7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "input:2:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "Cin", id: "cin", location: [-1, 0.2] },
          },
        ],
      })
    );
  }

  // Make all drag-drop elements draggable
  jsPlumbInstance.setDraggable(element, true);
}
export function initComparator() {
  const ids = [
    "Input-0",
    "Input-1",
    "Input-2",
    "Input-3",
    "Output-4",
    "Output-5",
    "Output-6",
  ]; // [A B Sum Carry Out]
  const types = [
    "Input",
    "Input",
    "Input",
    "Input",
    "Output",
    "Output",
    "Output",
  ];
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
    parent.insertAdjacentHTML("beforeend", component);
    gate.registerComponent("working-area", positions[i].x, positions[i].y);
  }
}
export function initComparator1() {
  const ids = [
    "Input-0",
    "Input-1",
    "Input-2",
    "Input-3",
    "Input-7",
    "Output-4",
    "Output-5",
    "Output-6",
  ]; // [A B Sum Carry Out]
  const types = [
    "Input",
    "Input",
    "Input",
    "Input",
    "Input",
    "Output",
    "Output",
    "Output",
  ];
  const names = ["A0", "A1", "B0", "B1", "Cin", "A&gt;B", "A&lt;B", "A=B"];
  const positions = [
    { x: 300, y: 50 },
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
    parent.insertAdjacentHTML("beforeend", component);
    gate.registerComponent("working-area", positions[i].x, positions[i].y);
  }
}

export function refreshWorkingArea() {
  jsPlumbInstance.reset();
  window.numComponents = 0;

  gatejs.clearGates();
  fajs.clearFAs();
}

// window.getInfo = function () {
//     console.log(gatejs.gates);
// }
refresh.addEventListener("click", function (event) {
  jsPlumbInstance.reset();
  window.numComponents = 0;

  gatejs.clearGates();
  fajs.clearFAs();
  if (window.currentTab == "task1") initComparator();
  else initComparator1();
});
const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");
let menuVisible = false;

const toggleMenu = (command) => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = command === "show";
};

export const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", () => {
  if (menuVisible) toggleMenu("hide");
  window.selectedComponent = null;
  window.componentType = null;
});

document.addEventListener("contextmenu", function (event) {
  // Only show custom context menu for specific elements
  const target = event.target;
  const isComponent =
    target.closest(".drag-drop") ||
    target.closest(".logic-gate") ||
    target.closest(".high") ||
    target.closest(".low") ||
    target.closest(".output") ||
    target.closest(".fulladder");
  const isConnection = target.closest(".jtk-connector");
  const isWorkingArea =
    target.closest("#working-area") && !isComponent && !isConnection;

  // Only prevent default context menu for our interactive elements
  if (isComponent || isConnection || isWorkingArea) {
    event.preventDefault();
    menu.style.display = "block";
    menu.style.left = `${event.clientX}px`;
    menu.style.top = `${event.clientY}px`;

    // Store the target element and check if it's a connection
    window.contextMenuTarget = event.target;
    window.isConnectionContext =
      event.target.closest(".jtk-connector") !== null;

    toggleMenu("show");
  }
});

// Menu option click handler (moved outside to avoid multiple listeners)
menuOption.addEventListener("click", (e) => {
  if (e.target.innerHTML === "Delete") {
    if (window.componentType === "gate") {
      console.log("Deleting gate component");
      deleteElement(window.selectedComponent);
    } else if (window.componentType === "fullAdder") {
      console.log("Deleting full adder component");
      deleteFA(window.selectedComponent);
    } else {
      // Find the connection that belongs to the right-clicked wire (or to the wire under the mouse) and delete it
      const findConnection = (connectorElement) =>
        jsPlumbInstance
          .getConnections()
          .find((c) => c.connector && c.connector.canvas === connectorElement);

      let connection = null;
      if (window.isConnectionContext && window.contextMenuTarget) {
        const connectorElement = window.contextMenuTarget.closest(".jtk-connector");
        if (connectorElement) {
          connection = findConnection(connectorElement);
        }
      }
      if (!connection) {
        // fall back to the wire that is highlighted because the mouse is over it
        const hovered = document.querySelectorAll(".jtk-connector.jtk-hover");
        for (let i = 0; i < hovered.length && !connection; i++) {
          connection = findConnection(hovered[i]);
        }
      }
      if (connection) {
        safeDeleteConnection(connection);
      }
    }
  }
  // Reset context variables
  window.contextMenuTarget = null;
  window.isConnectionContext = false;
  toggleMenu("hide"); // Hide menu after selection
});

window.currentTab = "task1";
connectGate();
refreshWorkingArea();
initComparator();
