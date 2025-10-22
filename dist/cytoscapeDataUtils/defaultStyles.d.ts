declare const cytoscapeDefaultStyles: ({
    selector: string;
    style: {
        'background-color': string;
        label: string;
        'text-valign': string;
        'text-halign': string;
        color: string;
        'font-size': number;
        width: number;
        height: number;
        'line-color'?: undefined;
        'target-arrow-color'?: undefined;
        'target-arrow-shape'?: undefined;
        'curve-style'?: undefined;
        'border-width'?: undefined;
        'border-color'?: undefined;
    };
} | {
    selector: string;
    style: {
        width: number;
        'line-color': string;
        'target-arrow-color': string;
        'target-arrow-shape': string;
        'curve-style': string;
        label: string;
        'font-size': number;
        color: string;
        'background-color'?: undefined;
        'text-valign'?: undefined;
        'text-halign'?: undefined;
        height?: undefined;
        'border-width'?: undefined;
        'border-color'?: undefined;
    };
} | {
    selector: string;
    style: {
        'background-color': string;
        'border-width': number;
        'border-color': string;
        label?: undefined;
        'text-valign'?: undefined;
        'text-halign'?: undefined;
        color?: undefined;
        'font-size'?: undefined;
        width?: undefined;
        height?: undefined;
        'line-color'?: undefined;
        'target-arrow-color'?: undefined;
        'target-arrow-shape'?: undefined;
        'curve-style'?: undefined;
    };
} | {
    selector: string;
    style: {
        'line-color': string;
        'target-arrow-color': string;
        width: number;
        'background-color'?: undefined;
        label?: undefined;
        'text-valign'?: undefined;
        'text-halign'?: undefined;
        color?: undefined;
        'font-size'?: undefined;
        height?: undefined;
        'target-arrow-shape'?: undefined;
        'curve-style'?: undefined;
        'border-width'?: undefined;
        'border-color'?: undefined;
    };
})[];
declare const cytoscapeDefaultLayout: {
    name: string;
    idealEdgeLength: number;
    nodeOverlap: number;
    refresh: number;
    fit: boolean;
    padding: number;
    randomize: boolean;
    componentSpacing: number;
    nodeRepulsion: number;
    edgeElasticity: number;
    nestingFactor: number;
    gravity: number;
    numIter: number;
    initialTemp: number;
    coolingFactor: number;
    minTemp: number;
};
export { cytoscapeDefaultStyles, cytoscapeDefaultLayout };
