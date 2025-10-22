const cytoscapeDefaultStyles = [
  {
    selector: 'node',
    style: {
      'background-color': '#3B82F6', // blue-500
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      color: '#FFFFFF', // text-primary-inverse
      'font-size': 6,
      width: 30,
      height: 30,
    },
  },
  {
    selector: 'edge',
    style: {
      width: 2,
      'line-color': '#D1D5DB', // gray-300
      'target-arrow-color': '#D1D5DB', // gray-300
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      label: 'data(label)',
      'font-size': 10,
      color: '#6B7280', // text-secondary
    },
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': '#EF4444', // red-500
      'border-width': 3,
      'border-color': '#B91C1C', // red-600
    },
  },
  {
    selector: 'edge:selected',
    style: {
      'line-color': '#EF4444', // red-500
      'target-arrow-color': '#EF4444', // red-500
      width: 4,
    },
  },
];


const cytoscapeDefaultLayout = {
  name: 'cose',
  idealEdgeLength: 100,
  nodeOverlap: 20,
  refresh: 20,
  fit: true,
  padding: 30,
  randomize: false,
  componentSpacing: 40,
  nodeRepulsion: 400000,
  edgeElasticity: 100,
  nestingFactor: 5,
  gravity: 80,
  numIter: 1000,
  initialTemp: 200,
  coolingFactor: 0.95,
  minTemp: 1.0,
};

export { cytoscapeDefaultStyles, cytoscapeDefaultLayout };
