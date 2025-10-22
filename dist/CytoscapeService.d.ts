import cytoscape, { Core, NodeSingular, EdgeSingular, SelectionType } from 'cytoscape';
interface CytoscapeConfig {
    elements?: any[];
    layout?: any;
    style?: any[];
    zoom?: number;
    pan?: {
        x: number;
        y: number;
    };
    minZoom?: number;
    maxZoom?: number;
    zoomingEnabled?: boolean;
    userZoomingEnabled?: boolean;
    panningEnabled?: boolean;
    userPanningEnabled?: boolean;
    boxSelectionEnabled?: boolean;
    selectionType?: SelectionType;
    autoungrabify?: boolean;
    autounselectify?: boolean;
    onNodeClick?: {
        state: string;
    };
    onEdgeClick?: (edge: EdgeSingular) => void;
    onNodeHover?: (node: NodeSingular) => void;
    onEdgeHover?: (edge: EdgeSingular) => void;
    onBackgroundClick?: () => void;
    [key: string]: any;
    enableInfoPanel?: boolean;
    infoPanelPosition?: string;
}
interface NodeData {
    id?: string;
    label?: string;
    [key: string]: any;
}
interface InfoPanelData {
    title: string;
    content: any;
    type: 'node' | 'edge';
    timestamp: number;
    position?: {
        x: number;
        y: number;
    };
}
export declare class CytoscapeService {
    private cy;
    private container;
    private selectedElement;
    private cyConfig;
    private eventListeners;
    private isDestroyed;
    private currentTheme;
    private infoPanel;
    private infoPanelData;
    private _isInfoPanelVisible;
    init(context: HTMLElement | string, config?: CytoscapeConfig): cytoscape.Core | undefined;
    /**
     * Creates the info panel element
     */
    private createInfoPanel;
    /**
     * Positions the info panel near the clicked element
     */
    private positionPanelNearElement;
    /**
     * Updates the arrow position and direction
     */
    private updateArrowPosition;
    /**
     * Updates the position of the info panel
     */
    private updateInfoPanelPosition;
    /**
     * Shows the info panel with the provided data
     */
    showInfoPanel(data: InfoPanelData): void;
    /**
     * Hides the info panel
     */
    hideInfoPanel(): void;
    /**
     * Updates the content of the info panel
     */
    private updateInfoPanelContent;
    /**
     * Formats JSON content for display in a two-column layout
     */
    private formatJsonContent;
    /**
     * Capitalizes the first letter of a string
     */
    private capitalizeFirst;
    /**
     * Updates the info panel with new data
     */
    updateInfoPanel(data: InfoPanelData): void;
    /**
     * Sets the position of the info panel
     */
    setInfoPanelPosition(position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'): void;
    /**
     * Gets the current info panel data
     */
    getInfoPanelData(): InfoPanelData | null;
    /**
     * Checks if the info panel is visible
     */
    isInfoPanelVisible(): boolean;
    elementClick(context: HTMLElement): NodeData | undefined;
    updateData(context: HTMLElement, elements: any[]): void;
    setZoomLevel(context: HTMLElement, distance: number): void;
    getInstance(context: HTMLElement): Core | null;
    destroy(context?: HTMLElement): void;
    remove(): void;
    clear(): void;
    dispose(): void;
    private removeAllEventListeners;
    fit(): void;
    center(): void;
    zoom(level: number): void;
    pan(position: {
        x: number;
        y: number;
    }): void;
    runLayout(layoutOptions?: any): void;
    getSelectedElements(): any[];
    selectElement(elementId: string): void;
    unselectAll(): void;
    exportData(): any;
    importData(data: any): void;
    updateStyles(newStyles: any[]): void;
    updateElementStyle(elementSelector: string, newStyle: any): void;
    setTheme(theme: 'light' | 'dark' | string): void;
    returnMethods(): {
        init: (context: HTMLElement | string, config?: CytoscapeConfig) => cytoscape.Core | undefined;
        elementClick: (context: HTMLElement) => NodeData | undefined;
        updateData: (context: HTMLElement, elements: any[]) => void;
        getInstance: (context: HTMLElement) => Core | null;
        setZoomLevel: (context: HTMLElement, distance: number) => void;
        destroy: (context?: HTMLElement) => void;
        remove: () => void;
        clear: () => void;
        dispose: () => void;
        showInfoPanel: (data: InfoPanelData) => void;
        hideInfoPanel: () => void;
        updateInfoPanel: (data: InfoPanelData) => void;
        setInfoPanelPosition: (position: "top-right" | "top-left" | "bottom-right" | "bottom-left") => void;
        getInfoPanelData: () => InfoPanelData | null;
        isInfoPanelVisible: () => boolean;
        fit: () => void;
        center: () => void;
        zoom: (level: number) => void;
        pan: (position: {
            x: number;
            y: number;
        }) => void;
        runLayout: (layoutOptions?: any) => void;
        getSelectedElements: () => any[];
        selectElement: (elementId: string) => void;
        unselectAll: () => void;
        exportData: () => any;
        importData: (data: any) => void;
        updateStyles: (newStyles: any[]) => void;
        updateElementStyle: (elementSelector: string, newStyle: any) => void;
        setTheme: (theme: "light" | "dark" | string) => void;
    };
}
export {};
