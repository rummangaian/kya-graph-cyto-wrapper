import { CytoscapeService } from './CytoscapeService';
export { CytoscapeService } from './CytoscapeService';
export function createCytoscapeInstance(...args) {
    const service = new CytoscapeService();
    return service.init(...args);
}
