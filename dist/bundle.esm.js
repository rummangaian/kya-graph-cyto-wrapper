import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import euler from 'cytoscape-euler';

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

// default layout options
const colaDefaultLayout = {
    name: 'cola',
    animate: true, // whether to show the layout as it's running
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    // maxSimulationTime: 4000, // max length in ms to run the layout
    // ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    // fit: true, // on every layout reposition of nodes, fit the viewport
    // padding: 30, // padding around the simulation
    // boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    // nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
    // // layout event callbacks
    // ready: function () {}, // on layoutready
    // stop: function () {}, // on layoutstop
    // // positioning options
    // randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    // convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
    // flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    // alignment: undefined, // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
    // gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]
    // centerGraph: true, // adjusts the node positions initially to center the graph (pass false if you want to start the layout from the current position)
    // // different methods of specifying edge length
    // // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: 80, // sets edge length directly in simulation
    // edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    // edgeJaccardLength: undefined, // jaccard edge length in simulation
    // // iterations of cola algorithm; uses default values on undefined
    // unconstrIter: undefined, // unconstrained initial layout iterations
    // userConstIter: undefined, // initial layout iterations with user-specified constraints
    // allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
};

const themeData = {
    Light: {
        'color-bg-surface-white': 'white',
        'color-bg-surface': '#f9bfbf',
        'color-bg-surface2': '#d9d9d9',
        'color-bg-surface3': '#3f83f8',
        'color-bg-surface4': '#2a1e1e',
        'color-bg-surface5': '#ffffff',
        'color-bg-surface6': '#98a2b3',
        'color-bg-surface7': '#000000',
        'color-bg-surface8': '#eff6ff',
        'color-bg-surface9': '#43CBFF',
        'color-bg-surface10': '#4B5565',
        'color-bg-surface11': '#364152',
        'color-bg-surface12': '#CDD5DF',
        'color-bg-surface13': '#5145CD',
        'color-bg-surface14': '#697586',
        'color-bg-surface15': '#111928',
        'color-bg-surface16': '#5850EC',
        'color-bg-surface17': '#F7FAFF',
        'color-bg-surface18': '#111827',
        'color-bg-surface19': '#9AA4B2',
        'color-bg-surface20': '#121926',
        'color-bg-surface21': '#E5EDFF',
        'color-bg-surface22': '#42389D',
        'color-bg-surface23': '#A995D3',
        'color-bg-surface24': '#C3CFE2',
        'color-bg-surface25': '#F5F7FA',
        'color-bg-surface26': '#f9fafb',
        'color-bg-surface27': '#aaaaaa30',
        'color-bg-surface28': '#0acf83',
        'color-bg-surface29': '#ff7262',
        'color-bg-surface30': '#f24e1e',
        'color-bg-surface31': '#a259ff',
        'color-bg-surface32': '#202939',
        'color-bg-surface33': '#1e3a8a',
        'color-bg-surface34': '#1A56DB',
        'color-bg-surface35': '#F8FAFC',
        'color-bg-surface36': '#20293999',
        'color-bg-surface37': '#1e40af',
        'font-heading-xl-size': '32px',
        'font-heading-xl-weight': '700',
        'font-heading-xl-line-height': '40px',
        'font-heading-lg-size': '24px',
        'font-heading-lg-weight': '600',
        'font-heading-lg-line-height': '32px',
        'font-heading-md-size': '20px',
        'font-heading-md-weight': '600',
        'font-heading-md-line-height': '28px',
        'font-heading-sm-size': '16px',
        'font-heading-sm-weight': '600',
        'font-heading-sm-line-height': '24px',
        'font-body-size': '14px',
        'font-body-weight': '400',
        'font-body-line-height': '20px',
        'font-caption-size': '12px',
        'font-caption-weight': '400',
        'font-caption-line-height': '16px',
        'font-weight-normal': '400',
        'font-weight-medium': '500',
        'font-weight-semibold': '600',
        'font-weight-bold': '700',
        'text-align-left': 'left',
        'text-align-center': 'center',
        'text-align-right': 'right',
        'space-025': '2px',
        'space-050': '4px',
        'space-100': '8px',
        'space-200': '16px',
        'space-300': '24px',
        'space-400': '32px',
        'space-500': '40px',
        'space-600': '48px',
        'space-700': '56px',
        'space-800': '64px',
        'space-900': '72px',
        'space-1000': '80px',
        'radius-sm': '4px',
        'radius-md': '8px',
        'radius-lg': '12px',
        'radius-xl': '16px',
        'border-none': 'none',
        'border-default': '1px solid',
        'border-width-default': '1px',
        'border-width-2': '2px',
        'border-width-3': '3px',
        'border-width-4': '4px',
        'color-bg-primary': '#0066cc',
        'color-bg-secondary': '#f0f0f0',
        'color-bg-danger': '#d32f2f',
        'color-bg-transparent': 'transparent',
        'color-bg-overlay': 'rgba(0,0,0,0.5)',
        'color-text-primary': '#333333',
        'color-text-secondary': '#666666',
        'color-text-primary-inverse': '#ffffff',
        'color-text-danger-inverse': '#ffffff',
        'color-text-white': '#ffffff',
        // {
        // 										"type": "ColourAtom",
        // 										"config": {
        // 											"role": "text",
        // 											"value": "token:color-text-primary"
        // 										}
        // 									},
        'color-text-3': '#ffffff',
        'color-text-4': '#000000',
        'color-text-5': '#9AA4B2',
        'color-text-6': '#5850EC',
        'color-text-7': '#111827',
        'color-text-8': '#121926',
        'color-text-9': '#697586',
        'color-text-10': '#202939',
        'color-text-11': '#111928',
        'color-text-12': '#5145CD',
        'color-text-13': '#43CBFF',
        'color-text-14': '#4B5565',
        'color-text-15': '#CDD5DF',
        'color-text-16': '#364152',
        'color-text-17': '#1c64f2',
        'color-text-18': '#1e3a8a',
        'color-text-19': '#0f172a',
        'color-text-22': '#42389D',
        'color-text-24': '#C3CFE2',
        'color-text-25': '#F5F7FA',
        'color-text-32': '#202939',
        'color-text-40': '#131212ff',
        'color-border-1': '#1A56DB1A',
        'flex-align-center': 'center',
        'flex-justify-center': 'center',
        'size-80': '80%',
        'scroll-auto': 'auto',
        'scroll-hidden': 'hidden',
        'scroll-visible': 'visible',
        'size-auto': 'auto',
        'size-full': '100%',
        'size-fit': 'fit-content',
        'display-flex': 'flex',
        'display-block': 'block',
        'flex-direction-row': 'row',
        'flex-direction-column': 'column',
        'content-text': 'text',
        'content-placeholder': 'placeholder',
    },
    Dark: {
        'color-bg-surface-white': '#0d1117',
        'color-bg-surface': '#0d1117',
        'color-bg-surface2': '#161b22',
        'color-bg-surface3': '#1f2937',
        'color-bg-surface4': '#24292f',
        'color-bg-surface5': '#414141',
        'color-bg-surface6': '#2d333b',
        'color-bg-surface7': '#000000',
        'color-bg-surface8': '#1a1e26',
        'color-bg-surface9': '#219ebc',
        'color-bg-surface10': '#6b7280',
        'color-bg-surface11': '#4b5563',
        'color-bg-surface12': '#334155',
        'color-bg-surface13': '#4338ca',
        'color-bg-surface14': '#64748b',
        'color-bg-surface15': '#0f172a',
        'color-bg-surface16': '#4f46e5',
        'color-bg-surface17': '#1e293b',
        'color-bg-surface18': '#1a202e',
        'color-bg-surface19': '#6c757d',
        'color-bg-surface20': '#111827',
        'color-bg-surface21': '#1e3a8a',
        'color-bg-surface22': '#3730a3',
        'color-bg-surface23': '#6b5ca5',
        'color-bg-surface24': '#3b4252',
        'color-bg-surface25': '#1c1f26',
        'color-bg-surface26': '#1a1a1a',
        'color-bg-surface27': '#44444430',
        'color-bg-surface28': '#0acf83',
        'color-bg-surface29': '#ff7262',
        'color-bg-surface30': '#f24e1e',
        'color-bg-surface31': '#a259ff',
        'color-bg-surface32': '#202939',
        'color-bg-surface33': '#1e3a8a',
        'color-bg-surface34': '#1A56DB',
        'color-bg-surface35': '#111827',
        'color-bg-surface36': '#1e293b',
        'color-bg-surface37': '6366f1',
        'color-bg-primary': '#1e90ff',
        'color-bg-secondary': '#2f2f2f',
        'color-bg-danger': '#ff4c4c',
        'color-bg-transparent': 'transparent',
        'color-bg-overlay': 'rgba(0,0,0,0.7)',
        'color-text-primary': '#ffffff',
        'color-text-white': '#ffffff',
        'color-text-secondary': '#e0e0e0',
        'color-text-primary-inverse': '#000000',
        'color-text-danger-inverse': '#000000',
        'color-text-3': '#1a1a1a',
        'color-text-4': '#e6e6e6',
        'color-text-5': '#a7bcdb',
        'color-text-6': '#312bc1',
        'color-text-7': '#0e1420',
        'color-text-8': '#e0e4eb',
        'color-text-9': '#CBD5E1',
        'color-text-13': '#199EC9',
        'color-text-14': '#CBD5E1',
        'color-text-15': '#9FA9B4',
        'color-text-16': '#cbd5e4',
        'color-text-19': '#090f19',
        'color-text-22': '#BFA5FF',
        'color-text-24': '#a0aec4',
        'color-text-25': '#d1ddee',
        'color-text-32': '#D6E4FF',
        'color-text-40': '#F87171',
        'color-border-1': '#EEF3FD99',
        'font-heading-xl-size': '32px',
        'font-heading-xl-weight': '700',
        'font-heading-xl-line-height': '40px',
        'font-heading-lg-size': '24px',
        'font-heading-lg-weight': '600',
        'font-heading-lg-line-height': '32px',
        'font-heading-md-size': '20px',
        'font-heading-md-weight': '600',
        'font-heading-md-line-height': '28px',
        'font-heading-sm-size': '16px',
        'font-heading-sm-weight': '600',
        'font-heading-sm-line-height': '24px',
        'font-body-size': '14px',
        'font-body-weight': '400',
        'font-body-line-height': '20px',
        'font-caption-size': '12px',
        'font-caption-weight': '400',
        'font-caption-line-height': '16px',
        'font-weight-normal': '400',
        'font-weight-medium': '500',
        'font-weight-semibold': '600',
        'font-weight-bold': '700',
        'text-align-left': 'left',
        'text-align-center': 'center',
        'text-align-right': 'right',
        'space-025': '2px',
        'space-050': '4px',
        'space-100': '8px',
        'space-200': '16px',
        'space-300': '24px',
        'space-400': '32px',
        'space-500': '40px',
        'space-600': '48px',
        'space-700': '56px',
        'space-800': '64px',
        'space-900': '72px',
        'space-1000': '80px',
        'size-80': '80%',
        'size-auto': 'auto',
        'size-full': '100%',
        'size-fit': 'fit-content',
        'flex-align-center': 'center',
        'flex-justify-center': 'center',
        'flex-direction-row': 'row',
        'flex-direction-column': 'column',
        'display-flex': 'flex',
        'display-block': 'block',
        'scroll-auto': 'auto',
        'scroll-hidden': 'hidden',
        'scroll-visible': 'visible',
        'radius-sm': '4px',
        'radius-md': '8px',
        'radius-lg': '12px',
        'radius-xl': '16px',
        'border-none': 'none',
        'border-default': '1px solid',
        'border-width-default': '1px',
        'border-width-2': '2px',
        'border-width-3': '3px',
        'border-width-4': '4px',
        'content-text': 'text',
        'content-placeholder': 'placeholder',
    },
};

cytoscape.use(cola);
cytoscape.use(euler);
/**
 * Resolves color tokens to hex values for Cytoscape
 * @param tokenValue - The token value (e.g., "token:color-blue-500")
 * @param theme - The theme to use (default: "Light")
 * @returns Hex color value or original value if not a token
 */
function resolveCytoscapeColorToken(tokenValue, theme = 'Light') {
    if (typeof tokenValue !== 'string' || !tokenValue.startsWith('token:')) {
        return tokenValue;
    }
    const tokenKey = tokenValue.slice(6); // Remove 'token:' prefix
    // First check in the specified theme
    if (themeData[theme] && themeData[theme][tokenKey]) {
        return themeData[theme][tokenKey];
    }
    // Fallback to Light theme if not found in current theme
    if (theme !== 'Light' && themeData.Light && themeData.Light[tokenKey]) {
        return themeData.Light[tokenKey];
    }
    // If still not found, check common color mappings
    const commonColors = {
        'color-white': '#ffffff',
        'color-black': '#000000',
        'color-blue-50': '#ebf5ff',
        'color-blue-100': '#e1effe',
        'color-blue-200': '#c3ddfd',
        'color-blue-300': '#a4cafe',
        'color-blue-400': '#76a9fa',
        'color-blue-500': '#3f83f8',
        'color-blue-600': '#1c64f2',
        'color-blue-700': '#1a56db',
        'color-blue-800': '#1e429f',
        'color-blue-900': '#233876',
        'color-gray-50': '#f8fafc',
        'color-gray-100': '#eef2f6',
        'color-gray-200': '#e3e8ef',
        'color-gray-300': '#cdd5df',
        'color-gray-400': '#9aa4b2',
        'color-gray-500': '#697586',
        'color-gray-600': '#4b5565',
        'color-gray-700': '#364152',
        'color-gray-800': '#202939',
        'color-gray-900': '#121926',
        'color-red-50': '#fdf2f2',
        'color-red-100': '#fde8e8',
        'color-red-200': '#fbd5d5',
        'color-red-300': '#f8b4b4',
        'color-red-400': '#f98080',
        'color-red-500': '#f05252',
        'color-red-600': '#e02424',
        'color-red-700': '#c81e1e',
        'color-red-800': '#9b1c1c',
        'color-red-900': '#771d1d',
        'color-green-50': '#f3faf7',
        'color-green-100': '#def7ec',
        'color-green-200': '#bcf0da',
        'color-green-300': '#84e1bc',
        'color-green-400': '#31c48d',
        'color-green-500': '#0e9f6e',
        'color-green-600': '#057a55',
        'color-green-700': '#046c4e',
        'color-green-800': '#03543f',
        'color-green-900': '#014737',
        'color-indigo-50': '#f0f5ff',
        'color-indigo-100': '#e5edff',
        'color-indigo-200': '#cddbfe',
        'color-indigo-300': '#b4c6fc',
        'color-indigo-400': '#8da2fb',
        'color-indigo-500': '#6875f5',
        'color-indigo-600': '#5850ec',
        'color-indigo-700': '#5145cd',
        'color-indigo-800': '#42389d',
        'color-indigo-900': '#362f78',
        'color-yellow-50': '#fdfdea',
        'color-yellow-100': '#fdf6b2',
        'color-yellow-200': '#fce96a',
        'color-yellow-300': '#faca15',
        'color-yellow-400': '#e3a008',
        'color-yellow-500': '#c27803',
        'color-yellow-600': '#9f580a',
        'color-yellow-700': '#8e4b10',
        'color-yellow-800': '#723b13',
        'color-yellow-900': '#633112',
        // Semantic colors
        'color-text-primary': '#1a1a1a',
        'color-text-secondary': '#4b5565',
        'color-text-primary-inverse': '#ffffff',
        'color-bg-primary': '#ffffff',
        'color-bg-secondary': '#f8fafc',
    };
    if (commonColors[tokenKey]) {
        return commonColors[tokenKey];
    }
    // If token not found, return original value and log warning
    console.warn(`Cytoscape color token not found: ${tokenValue}`);
    return tokenValue;
}
/**
 * Processes Cytoscape style configuration to resolve color tokens
 * @param styleConfig - The style configuration array
 * @param theme - The theme to use for token resolution
 * @returns Processed style configuration with resolved color tokens
 */
function processColorTokens(styleConfig, theme = 'Light') {
    if (!Array.isArray(styleConfig)) {
        return styleConfig;
    }
    return styleConfig.map(rule => {
        if (!rule.style) {
            return rule;
        }
        const processedStyle = Object.assign({}, rule.style);
        // Define color properties that should be processed for tokens
        const colorProperties = [
            'background-color',
            'color',
            'line-color',
            'target-arrow-color',
            'source-arrow-color',
            'border-color',
            'text-outline-color',
            'overlay-color',
            'underlay-color',
        ];
        // Process each color property
        colorProperties.forEach(prop => {
            if (processedStyle[prop]) {
                const value = processedStyle[prop];
                // Check if the value is a token reference
                if (typeof value === 'string' && value.startsWith('token:')) {
                    processedStyle[prop] = resolveCytoscapeColorToken(value, theme);
                }
            }
        });
        return Object.assign(Object.assign({}, rule), { style: processedStyle });
    });
}
class CytoscapeService {
    constructor() {
        this.cy = null;
        this.container = null;
        this.selectedElement = {};
        this.cyConfig = {};
        this.eventListeners = [];
        this.isDestroyed = false;
        this.currentTheme = 'Light';
        this.infoPanel = null;
        this.infoPanelData = null;
        this._isInfoPanelVisible = false;
    }
    init(context, config = {}) {
        // Handle string ID by finding the element
        let containerElement;
        if (typeof context === 'string') {
            containerElement = document.getElementById(context);
            if (!containerElement) {
                console.error(`Container element with ID '${context}' not found`);
                return;
            }
        }
        else {
            containerElement = context;
        }
        if (!this.container || this.container !== containerElement) {
            this.container = containerElement;
            // Set proper CSS for the container to prevent infinite scroll
            this.container.style.cssText = `
        width: 100%;
        height: 100%;
        min-height: 400px;
        position: relative;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background: #ffffff;
      `;
        }
        // Process style configuration to resolve color tokens
        const processedStyles = config.style
            ? processColorTokens(config.style, this.currentTheme)
            : processColorTokens(cytoscapeDefaultStyles, this.currentTheme);
        // Default configuration
        const defaultConfig = {
            container: this.container,
            elements: config.elements || [],
            style: processedStyles,
            layout: config.layout || colaDefaultLayout,
            // Add zoom constraints to prevent infinite scroll
            minZoom: config.minZoom || 0.1,
            maxZoom: config.maxZoom || 10,
            zoomingEnabled: config.zoomingEnabled !== false,
            userZoomingEnabled: config.userZoomingEnabled !== false,
            panningEnabled: config.panningEnabled !== false,
            userPanningEnabled: config.userPanningEnabled !== false,
            boxSelectionEnabled: config.boxSelectionEnabled !== false,
            autoungrabify: config.autoungrabify !== false,
            autounselectify: config.autounselectify !== false,
        };
        // Merge user config with defaults (excluding style as it's already processed)
        const finalConfig = Object.assign(Object.assign(Object.assign({}, defaultConfig), config), { style: processedStyles });
        this.cyConfig = finalConfig;
        this.cy = cytoscape(finalConfig);
        // Clear existing event listeners
        this.removeAllEventListeners();
        // Add node click handler
        const nodeClickHandler = (evt) => {
            var _a, _b, _c;
            let nodeData = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.data();
            if (nodeData.id) {
                this.selectedElement = (_b = evt.target) === null || _b === void 0 ? void 0 : _b.data();
                // Get node position for popup placement
                const node = evt.target;
                const nodePos = node.renderedPosition();
                const containerRect = (_c = this.container) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();
                if (containerRect) {
                    const position = {
                        x: containerRect.left + nodePos.x,
                        y: containerRect.top + nodePos.y,
                    };
                    // Show info panel with node data if enabled
                    if (config.enableInfoPanel !== false) {
                        this.showInfoPanel({
                            title: `Node: ${nodeData.label || nodeData.id}`,
                            content: nodeData,
                            type: 'node',
                            timestamp: Date.now(),
                            position: position,
                        });
                    }
                }
            }
        };
        this.cy.on('tap', 'node', nodeClickHandler);
        this.eventListeners.push({
            event: 'tap',
            selector: 'node',
            handler: nodeClickHandler,
        });
        // Add edge click handler
        const edgeClickHandler = (evt) => {
            var _a, _b, _c;
            let edgeData = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.data();
            if (edgeData.id) {
                this.selectedElement = (_b = evt.target) === null || _b === void 0 ? void 0 : _b.data();
                // Get edge position for popup placement
                const edge = evt.target;
                const edgePos = edge.renderedPosition();
                const containerRect = (_c = this.container) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();
                if (containerRect) {
                    const position = {
                        x: containerRect.left + edgePos.x,
                        y: containerRect.top + edgePos.y,
                    };
                    // Show info panel with edge data if enabled
                    if (config.enableInfoPanel !== false) {
                        this.showInfoPanel({
                            title: `Edge: ${edgeData.label || edgeData.id}`,
                            content: edgeData,
                            type: 'edge',
                            timestamp: Date.now(),
                            position: position,
                        });
                    }
                }
            }
        };
        this.cy.on('tap', 'edge', edgeClickHandler);
        this.eventListeners.push({
            event: 'tap',
            selector: 'edge',
            handler: edgeClickHandler,
        });
        // Add background click handler to hide info panel
        const backgroundClickHandler = (evt) => {
            if (evt.target === this.cy) {
                this.hideInfoPanel();
            }
        };
        this.cy.on('tap', backgroundClickHandler);
        this.eventListeners.push({
            event: 'tap',
            handler: backgroundClickHandler,
        });
        // Create info panel if enabled
        if (config.enableInfoPanel !== false) {
            this.createInfoPanel(config.infoPanelPosition || 'top-right');
        }
        // Add zoom event handler to prevent layout issues
        const zoomHandler = () => {
            // Ensure the container maintains proper dimensions during zoom
            if (this.container && this.cy) {
                const containerRect = this.container.getBoundingClientRect();
                if (containerRect.width > 0 && containerRect.height > 0) {
                    this.cy.resize();
                }
            }
        };
        this.cy.on('zoom', zoomHandler);
        this.eventListeners.push({
            event: 'zoom',
            handler: zoomHandler,
        });
        return this.cy;
    }
    /**
     * Creates the info panel element
     */
    createInfoPanel(position = 'top-right') {
        if (this.infoPanel) {
            return; // Already exists
        }
        this.infoPanel = document.createElement('div');
        this.infoPanel.id = 'cytoscape-info-panel';
        this.infoPanel.style.cssText = `
      position: absolute;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      min-width: 350px;
      max-width: 450px;
      max-height: 500px;
      overflow-y: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 300;
      line-height: 1.5;
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      backdrop-filter: blur(10px);
    `;
        // Initial position (will be updated when showing)
        this.updateInfoPanelPosition(position);
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      color: #666;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s ease;
    `;
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = '#f0f0f0';
        });
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.backgroundColor = 'transparent';
        });
        closeButton.addEventListener('click', () => {
            this.hideInfoPanel();
        });
        this.infoPanel.appendChild(closeButton);
        // Add arrow element
        const arrow = document.createElement('div');
        arrow.id = 'cytoscape-info-panel-arrow';
        arrow.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      pointer-events: none;
      z-index: 1001;
    `;
        this.infoPanel.appendChild(arrow);
        // Add to document body to avoid layout issues
        document.body.appendChild(this.infoPanel);
    }
    /**
     * Positions the info panel near the clicked element
     */
    positionPanelNearElement(elementPosition) {
        if (!this.infoPanel)
            return;
        const panelRect = this.infoPanel.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const margin = 16;
        // Calculate initial position (top-left of panel aligns with node)
        let left = elementPosition.x;
        let top = elementPosition.y;
        let arrowPosition = 'left'; // Default arrow position
        // Check if panel would go off the right edge
        if (left + panelRect.width > viewportWidth - margin) {
            left = elementPosition.x - panelRect.width; // Position to the left of node
            arrowPosition = 'right';
        }
        // Check if panel would go off the left edge
        if (left < margin) {
            left = margin;
            arrowPosition = 'left';
        }
        // Check if panel would go off the bottom edge
        if (top + panelRect.height > viewportHeight - margin) {
            top = viewportHeight - panelRect.height - margin;
            arrowPosition = arrowPosition === 'left' ? 'left' : 'right';
        }
        // Check if panel would go off the top edge
        if (top < margin) {
            top = margin;
            arrowPosition = arrowPosition === 'left' ? 'left' : 'right';
        }
        // Apply the calculated position
        this.infoPanel.style.left = `${left}px`;
        this.infoPanel.style.top = `${top}px`;
        this.infoPanel.style.right = 'auto';
        this.infoPanel.style.bottom = 'auto';
        // Update arrow position
        this.updateArrowPosition(arrowPosition, elementPosition, left, top);
    }
    /**
     * Updates the arrow position and direction
     */
    updateArrowPosition(arrowPosition, elementPosition, panelLeft, panelTop) {
        if (!this.infoPanel)
            return;
        const arrow = this.infoPanel.querySelector('#cytoscape-info-panel-arrow');
        if (!arrow)
            return;
        const panelRect = this.infoPanel.getBoundingClientRect();
        if (arrowPosition === 'left') {
            // Arrow pointing left (panel is to the right of the node)
            arrow.style.left = '-12px';
            arrow.style.top = '20px';
            arrow.style.borderRightColor = 'rgba(255, 255, 255, 0.95)';
            arrow.style.borderLeftColor = 'transparent';
            arrow.style.borderTopColor = 'transparent';
            arrow.style.borderBottomColor = 'transparent';
        }
        else {
            // Arrow pointing right (panel is to the left of the node)
            arrow.style.left = `${panelRect.width}px`;
            arrow.style.top = '20px';
            arrow.style.borderLeftColor = 'rgba(255, 255, 255, 0.95)';
            arrow.style.borderRightColor = 'transparent';
            arrow.style.borderTopColor = 'transparent';
            arrow.style.borderBottomColor = 'transparent';
        }
    }
    /**
     * Updates the position of the info panel
     */
    updateInfoPanelPosition(position) {
        if (!this.infoPanel)
            return;
        const margin = 16;
        switch (position) {
            case 'top-left':
                this.infoPanel.style.top = `${margin}px`;
                this.infoPanel.style.left = `${margin}px`;
                break;
            case 'top-right':
                this.infoPanel.style.top = `${margin}px`;
                this.infoPanel.style.right = `${margin}px`;
                break;
            case 'bottom-left':
                this.infoPanel.style.bottom = `${margin}px`;
                this.infoPanel.style.left = `${margin}px`;
                break;
            case 'bottom-right':
                this.infoPanel.style.bottom = `${margin}px`;
                this.infoPanel.style.right = `${margin}px`;
                break;
            default:
                this.infoPanel.style.top = `${margin}px`;
                this.infoPanel.style.right = `${margin}px`;
        }
    }
    /**
     * Shows the info panel with the provided data
     */
    showInfoPanel(data) {
        if (!this.infoPanel) {
            this.createInfoPanel();
        }
        this.infoPanelData = data;
        this.updateInfoPanelContent(data);
        this._isInfoPanelVisible = true;
        // Position the panel next to the clicked element if position is provided
        if (data.position && this.infoPanel) {
            this.positionPanelNearElement(data.position);
        }
        // Show the panel with animation
        if (this.infoPanel) {
            this.infoPanel.style.opacity = '1';
            this.infoPanel.style.transform = 'translateY(0)';
        }
    }
    /**
     * Hides the info panel
     */
    hideInfoPanel() {
        if (!this.infoPanel)
            return;
        this._isInfoPanelVisible = false;
        this.infoPanel.style.opacity = '0';
        this.infoPanel.style.transform = 'translateY(-10px)';
    }
    /**
     * Updates the content of the info panel
     */
    updateInfoPanelContent(data) {
        if (!this.infoPanel)
            return;
        // Clear existing content (except close button)
        const closeButton = this.infoPanel.querySelector('button');
        this.infoPanel.innerHTML = '';
        if (closeButton) {
            this.infoPanel.appendChild(closeButton);
        }
        // Create title
        if (data.title) {
            const title = document.createElement('h3');
            title.textContent = data.title;
            title.style.cssText = `
        margin: 0 0 12px 0;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 8px;
      `;
            this.infoPanel.appendChild(title);
        }
        // Create content container
        const contentContainer = document.createElement('div');
        contentContainer.style.cssText = `
      max-height: 400px;
      overflow-y: auto;
      padding-right: 8px;
    `;
        // Format and display the content
        if (typeof data.content === 'object') {
            const formattedContent = this.formatJsonContent(data.content, data.type);
            contentContainer.innerHTML = formattedContent;
        }
        else {
            const textContent = document.createElement('p');
            textContent.textContent = String(data.content);
            textContent.style.cssText = `
        margin: 0;
        color: #666;
      `;
            contentContainer.appendChild(textContent);
        }
        this.infoPanel.appendChild(contentContainer);
    }
    /**
     * Formats JSON content for display in a two-column layout
     */
    formatJsonContent(content, type) {
        const formatValue = (value) => {
            if (value === null || value === undefined) {
                return '<span style="color: #999;">null</span>';
            }
            if (typeof value === 'string') {
                return `<span style="color: #333;">${value}</span>`;
            }
            if (typeof value === 'number') {
                return `<span style="color: #333;">${value}</span>`;
            }
            if (typeof value === 'boolean') {
                return `<span style="color: #333;">${value}</span>`;
            }
            if (Array.isArray(value)) {
                return `<span style="color: #333;">${value.join(', ')}</span>`;
            }
            if (typeof value === 'object') {
                // For nested objects, create a nested two-column layout
                const items = Object.entries(value)
                    .map(([key, val]) => {
                    const formattedVal = formatValue(val);
                    return `
              <div style="display: flex; margin-bottom: 8px; align-items: flex-start;">
                <div style="flex: 0 0 120px; color: #666; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 300; padding-right: 12px;">
                  ${this.capitalizeFirst(key)}:
                </div>
                <div style="flex: 1; color: #333; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 300; word-break: break-word;">
                  ${formattedVal}
                </div>
              </div>
            `;
                })
                    .join('');
                return `<div style="margin-left: 8px;">${items}</div>`;
            }
            return String(value);
        };
        // Create two-column layout for the main content
        const items = Object.entries(content)
            .map(([key, value]) => {
            const formattedValue = formatValue(value);
            return `
          <div style="display: flex; margin-bottom: 12px; align-items: flex-start;">
            <div style="flex: 0 0 120px; color: #666; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 300; padding-right: 12px;">
              ${this.capitalizeFirst(key)}:
            </div>
            <div style="flex: 1; color: #333; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 300; word-break: break-word;">
              ${formattedValue}
            </div>
          </div>
        `;
        })
            .join('');
        return `<div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 300; line-height: 1.4;">${items}</div>`;
    }
    /**
     * Capitalizes the first letter of a string
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /**
     * Updates the info panel with new data
     */
    updateInfoPanel(data) {
        if (this._isInfoPanelVisible) {
            this.updateInfoPanelContent(data);
            this.infoPanelData = data;
        }
    }
    /**
     * Sets the position of the info panel
     */
    setInfoPanelPosition(position) {
        this.updateInfoPanelPosition(position);
    }
    /**
     * Gets the current info panel data
     */
    getInfoPanelData() {
        return this.infoPanelData;
    }
    /**
     * Checks if the info panel is visible
     */
    isInfoPanelVisible() {
        return this._isInfoPanelVisible;
    }
    elementClick(context) {
        if (this.cy) {
            return this.selectedElement;
        }
    }
    updateData(context, elements) {
        if (this.cy) {
            this.cy.elements().remove();
            this.cy.add(elements);
            this.cy.layout(Object.assign({}, this.cyConfig.layout)).run();
        }
    }
    setZoomLevel(context, distance) {
        if (!this.cy)
            return;
        let numericDistance = Number(distance);
        if (isNaN(numericDistance) || numericDistance <= 0)
            return;
        const newZoomLevel = numericDistance / 100;
        // Smooth animated zoom toward graph center
        this.cy.animate({
            zoom: newZoomLevel,
            center: { eles: this.cy.elements() },
            duration: 1000,
        });
    }
    getInstance(context) {
        return this.cy;
    }
    destroy(context) {
        if (this.isDestroyed) {
            console.warn('CytoscapeService is already destroyed');
            return;
        }
        // Remove all event listeners first
        this.removeAllEventListeners();
        // Remove info panel from document body
        if (this.infoPanel) {
            if (document.body.contains(this.infoPanel)) {
                document.body.removeChild(this.infoPanel);
            }
            this.infoPanel = null;
        }
        // Destroy Cytoscape instance
        if (this.cy) {
            try {
                this.cy.destroy();
            }
            catch (error) {
                console.error('Error destroying Cytoscape instance:', error);
            }
            this.cy = null;
        }
        // Clear container
        if (this.container) {
            this.container.innerHTML = '';
            this.container = null;
        }
        // Clear references
        this.selectedElement = {};
        this.cyConfig = {};
        this.infoPanelData = null;
        this._isInfoPanelVisible = false;
        this.isDestroyed = true;
    }
    remove() {
        this.destroy();
    }
    clear() {
        if (this.cy) {
            // Clear all elements from the graph
            this.cy.elements().remove();
            // Reset zoom and pan
            this.cy.zoom(1);
            this.cy.pan({ x: 0, y: 0 });
            // Clear selection
            this.cy.elements().unselect();
        }
        // Clear selected element and hide info panel
        this.selectedElement = {};
        this.hideInfoPanel();
    }
    dispose() {
        // Remove all event listeners
        this.removeAllEventListeners();
        // Clear all data
        this.clear();
        // Destroy the instance
        this.destroy();
    }
    removeAllEventListeners() {
        if (this.cy && this.eventListeners.length > 0) {
            this.eventListeners.forEach(listener => {
                try {
                    if (listener.selector) {
                        this.cy.off(listener.event, listener.selector);
                    }
                    else {
                        this.cy.off(listener.event);
                    }
                }
                catch (error) {
                    console.error(`Error removing event listener ${listener.event}:`, error);
                }
            });
            this.eventListeners = [];
        }
    }
    // Utility methods
    fit() {
        if (this.cy) {
            this.cy.fit();
        }
    }
    center() {
        if (this.cy) {
            this.cy.center();
        }
    }
    zoom(level) {
        if (this.cy) {
            this.cy.zoom(level);
        }
    }
    pan(position) {
        if (this.cy) {
            this.cy.pan(position);
        }
    }
    runLayout(layoutOptions) {
        if (this.cy) {
            const layout = layoutOptions || { name: 'cose' };
            this.cy.layout(layout).run();
        }
    }
    getSelectedElements() {
        if (!this.cy)
            return [];
        return this.cy.$(':selected').toArray();
    }
    selectElement(elementId) {
        if (this.cy) {
            this.cy.getElementById(elementId).select();
        }
    }
    unselectAll() {
        if (this.cy) {
            this.cy.elements().unselect();
        }
    }
    // Export/Import functionality
    exportData() {
        if (!this.cy)
            return null;
        return this.cy.json();
    }
    importData(data) {
        if (this.cy && data) {
            this.cy.json(data);
        }
    }
    // Style and theming utilities
    updateStyles(newStyles) {
        if (this.cy) {
            const processedStyles = processColorTokens(newStyles, this.currentTheme);
            this.cy.style(processedStyles);
        }
    }
    updateElementStyle(elementSelector, newStyle) {
        if (this.cy) {
            // Process color tokens in the style object
            const processedStyle = Object.assign({}, newStyle);
            const colorProperties = [
                'background-color',
                'color',
                'line-color',
                'target-arrow-color',
                'source-arrow-color',
                'border-color',
                'text-outline-color',
                'overlay-color',
                'underlay-color',
            ];
            colorProperties.forEach(prop => {
                if (processedStyle[prop] &&
                    typeof processedStyle[prop] === 'string' &&
                    processedStyle[prop].startsWith('token:')) {
                    processedStyle[prop] = resolveCytoscapeColorToken(processedStyle[prop], this.currentTheme);
                }
            });
            this.cy.style().selector(elementSelector).style(processedStyle).update();
        }
    }
    setTheme(theme) {
        if (!this.cy)
            return;
        // Update current theme
        this.currentTheme =
            theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : theme;
        // Define theme-specific color mappings using tokens (will be resolved later)
        const themes = {
            light: {
                'node-bg': 'token:color-blue-500',
                'node-text': 'token:color-text-primary-inverse',
                'node-selected-bg': 'token:color-red-500',
                'node-selected-border': 'token:color-red-600',
                'edge-line': 'token:color-gray-300',
                'edge-arrow': 'token:color-gray-300',
                'edge-text': 'token:color-text-secondary',
                'edge-selected': 'token:color-red-500',
            },
            dark: {
                'node-bg': 'token:color-blue-400',
                'node-text': 'token:color-text-primary-inverse',
                'node-selected-bg': 'token:color-red-400',
                'node-selected-border': 'token:color-red-500',
                'edge-line': 'token:color-gray-500',
                'edge-arrow': 'token:color-gray-500',
                'edge-text': 'token:color-text-primary-inverse',
                'edge-selected': 'token:color-red-400',
            },
        };
        const themeColors = themes[theme] || themes.light;
        const themedStyles = [
            {
                selector: 'node',
                style: {
                    'background-color': themeColors['node-bg'],
                    color: themeColors['node-text'],
                },
            },
            {
                selector: 'edge',
                style: {
                    'line-color': themeColors['edge-line'],
                    'target-arrow-color': themeColors['edge-arrow'],
                    color: themeColors['edge-text'],
                },
            },
            {
                selector: 'node:selected',
                style: {
                    'background-color': themeColors['node-selected-bg'],
                    'border-color': themeColors['node-selected-border'],
                },
            },
            {
                selector: 'edge:selected',
                style: {
                    'line-color': themeColors['edge-selected'],
                    'target-arrow-color': themeColors['edge-selected'],
                },
            },
        ];
        // Apply the themed styles with hex color resolution
        const processedThemedStyles = processColorTokens(themedStyles, this.currentTheme);
        this.cy.style(processedThemedStyles);
    }
    returnMethods() {
        // this method is compulsory in all our third party services
        return {
            init: this.init.bind(this),
            // setContainer: this.setContainer.bind(this),
            elementClick: this.elementClick.bind(this),
            updateData: this.updateData.bind(this),
            getInstance: this.getInstance.bind(this),
            setZoomLevel: this.setZoomLevel.bind(this),
            // Enhanced cleanup methods
            destroy: this.destroy.bind(this),
            remove: this.remove.bind(this),
            clear: this.clear.bind(this),
            dispose: this.dispose.bind(this),
            // Info panel methods
            showInfoPanel: this.showInfoPanel.bind(this),
            hideInfoPanel: this.hideInfoPanel.bind(this),
            updateInfoPanel: this.updateInfoPanel.bind(this),
            setInfoPanelPosition: this.setInfoPanelPosition.bind(this),
            getInfoPanelData: this.getInfoPanelData.bind(this),
            isInfoPanelVisible: this.isInfoPanelVisible.bind(this),
            // Utility methods
            fit: this.fit.bind(this),
            center: this.center.bind(this),
            zoom: this.zoom.bind(this),
            pan: this.pan.bind(this),
            runLayout: this.runLayout.bind(this),
            getSelectedElements: this.getSelectedElements.bind(this),
            selectElement: this.selectElement.bind(this),
            unselectAll: this.unselectAll.bind(this),
            exportData: this.exportData.bind(this),
            importData: this.importData.bind(this),
            // Style and theming methods
            updateStyles: this.updateStyles.bind(this),
            updateElementStyle: this.updateElementStyle.bind(this),
            setTheme: this.setTheme.bind(this),
        };
    }
}

export { CytoscapeService };
