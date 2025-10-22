
# kya-instance-cytoscape-lib
Cytoscape Wrapper


# index.ts
import {
  createCytoscapeInstance,
} from "kya-instance-cytoscape-lib";



createCytoscapeInstance(document.getElementById("cy"), {
  elements: [
    { data: { id: "a", label: "Node A" } },
    { data: { id: "b", label: "Node B" } },
    { data: { id: "c", label: "Node C" } },
    { data: { source: "a", target: "b" } },
    { data: { source: "b", target: "c" } },
  ],
  layout: {
    name: "cose", 
    springLength: 150,
    springCoeff: 0.03,
    mass: 50, 
    gravity: -2, 
    pull: 0.0002,
    theta: 0.7, 
    dragCoeff: 0.02, 
    movementThreshold: 1,
    timeStep: 20,
    refresh: 20, 
    animate: false, 
    maxIterations: 1000,
    maxSimulationTime: 4000,
    fit: true,
    padding: 50, 
  },
});

# index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Cytoscape Lib</title>
  <style>
    #cy {
      width: 800px;
      height: 600px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <div id="cy"></div>
  <script type="module" src="./index.js"></script>
</body>
</html>


