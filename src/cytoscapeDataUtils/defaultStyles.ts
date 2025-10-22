const cytoscapeDefaultStyles = [
  {
    selector: 'node',
    style: {
      'background-color': 'token:color-blue-500',
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      color: 'token:color-text-primary-inverse',
      'font-size': 12,
      width: 30,
      height: 30,
    },
  },
  {
    selector: 'edge',
    style: {
      width: 2,
      'line-color': 'token:color-gray-300',
      'target-arrow-color': 'token:color-gray-300',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      label: 'data(label)',
      'font-size': 10,
      color: 'token:color-text-secondary',
    },
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': 'token:color-red-500',
      'border-width': 3,
      'border-color': 'token:color-red-600',
    },
  },
  {
    selector: 'edge:selected',
    style: {
      'line-color': 'token:color-red-500',
      'target-arrow-color': 'token:color-red-500',
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
