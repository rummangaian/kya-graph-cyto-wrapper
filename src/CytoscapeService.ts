import cytoscape, {
  Core,
  NodeSingular,
  EdgeSingular,
  SelectionType,
} from 'cytoscape';
import {
  cytoscapeDefaultStyles
} from './cytoscapeDataUtils/defaultStyles';
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import euler from 'cytoscape-euler';
import colaDefaultLayout from './cytoscapeDataUtils/colaLayoutDefault';

import themeData from './cytoscapeDataUtils/themeData';

cytoscape.use(cola);
cytoscape.use(euler);

/**
 * Resolves color tokens to hex values for Cytoscape
 * @param tokenValue - The token value (e.g., "token:color-blue-500")
 * @param theme - The theme to use (default: "Light")
 * @returns Hex color value or original value if not a token
 */
function resolveCytoscapeColorToken(
  tokenValue: string,
  theme: string = 'Light'
): string {
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
  const commonColors: Record<string, string> = {
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
function processColorTokens(
  styleConfig: any[],
  theme: string = 'Light'
): any[] {
  if (!Array.isArray(styleConfig)) {
    return styleConfig;
  }

  return styleConfig.map(rule => {
    if (!rule.style) {
      return rule;
    }

    const processedStyle = { ...rule.style };

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

    return {
      ...rule,
      style: processedStyle,
    };
  });
}

interface CytoscapeConfig {
  elements?: any[];
  layout?: any;
  style?: any[];
  zoom?: number;
  pan?: { x: number; y: number };
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
  onNodeClick?: { state: string };
  onEdgeClick?: (edge: EdgeSingular) => void;
  onNodeHover?: (node: NodeSingular) => void;
  onEdgeHover?: (edge: EdgeSingular) => void;
  onBackgroundClick?: () => void;
  [key: string]: any; // for extensibility
  enableInfoPanel?: boolean;
  infoPanelPosition?: string;
}

interface NodeData {
  id?: string;
  label?: string;
  [key: string]: any;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
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

export class CytoscapeService {
  private cy: Core | null = null;
  private container: HTMLElement | null = null;
  private selectedElement: NodeData | EdgeData = {};
  private cyConfig: CytoscapeConfig = {};
  private eventListeners: Array<{
    event: string;
    selector?: string;
    handler: Function;
  }> = [];
  private isDestroyed: boolean = false;
  private currentTheme: string = 'Light';
  private infoPanel: HTMLElement | null = null;
  private infoPanelData: InfoPanelData | null = null;
  private _isInfoPanelVisible: boolean = false;

  init(context: HTMLElement | string, config: CytoscapeConfig = {}) {
    // Handle string ID by finding the element
    let containerElement: HTMLElement;
    if (typeof context === 'string') {
      containerElement = document.getElementById(context) as HTMLElement;
      if (!containerElement) {
        console.error(`Container element with ID '${context}' not found`);
        return;
      }
    } else {
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
    const finalConfig = {
      ...defaultConfig,
      ...config,
      style: processedStyles, // Ensure processed styles take precedence
    };

    this.cyConfig = finalConfig;

    this.cy = cytoscape(finalConfig as any);

    // Clear existing event listeners
    this.removeAllEventListeners();

    // Add node click handler
    const nodeClickHandler = (evt: any) => {
      let nodeData: NodeData = evt.target?.data();
      if (nodeData.id) {
        this.selectedElement = evt.target?.data();

        // Get node position for popup placement
        const node = evt.target;
        const nodePos = node.renderedPosition();
        const containerRect = this.container?.getBoundingClientRect();

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
    const edgeClickHandler = (evt: any) => {
      let edgeData: NodeData = evt.target?.data();
      if (edgeData.id) {
        this.selectedElement = evt.target?.data();

        // Get edge position for popup placement
        const edge = evt.target;
        const edgePos = edge.renderedPosition();
        const containerRect = this.container?.getBoundingClientRect();

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
    const backgroundClickHandler = (evt: any) => {
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
  private createInfoPanel(position: string = 'top-right'): void {
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
  private positionPanelNearElement(elementPosition: {
    x: number;
    y: number;
  }): void {
    if (!this.infoPanel) return;

    const panelRect = this.infoPanel.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 16;
    const arrowOffset = 12; // Distance from edge for arrow

    // Calculate initial position (top-left of panel aligns with node)
    let left = elementPosition.x;
    let top = elementPosition.y;
    let arrowPosition: 'left' | 'right' = 'left'; // Default arrow position

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
  private updateArrowPosition(
    arrowPosition: 'left' | 'right',
    elementPosition: { x: number; y: number },
    panelLeft: number,
    panelTop: number
  ): void {
    if (!this.infoPanel) return;

    const arrow = this.infoPanel.querySelector(
      '#cytoscape-info-panel-arrow'
    ) as HTMLElement;
    if (!arrow) return;

    const panelRect = this.infoPanel.getBoundingClientRect();
    const arrowSize = 6;

    if (arrowPosition === 'left') {
      // Arrow pointing left (panel is to the right of the node)
      arrow.style.left = '-12px';
      arrow.style.top = '20px';
      arrow.style.borderRightColor = 'rgba(255, 255, 255, 0.95)';
      arrow.style.borderLeftColor = 'transparent';
      arrow.style.borderTopColor = 'transparent';
      arrow.style.borderBottomColor = 'transparent';
    } else {
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
  private updateInfoPanelPosition(position: string): void {
    if (!this.infoPanel) return;

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
  showInfoPanel(data: InfoPanelData): void {
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
  hideInfoPanel(): void {
    if (!this.infoPanel) return;

    this._isInfoPanelVisible = false;
    this.infoPanel.style.opacity = '0';
    this.infoPanel.style.transform = 'translateY(-10px)';
  }

  /**
   * Updates the content of the info panel
   */
  private updateInfoPanelContent(data: InfoPanelData): void {
    if (!this.infoPanel) return;

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
    } else {
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
  private formatJsonContent(content: any, type?: string): string {
    const formatValue = (value: any): string => {
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
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Updates the info panel with new data
   */
  updateInfoPanel(data: InfoPanelData): void {
    if (this._isInfoPanelVisible) {
      this.updateInfoPanelContent(data);
      this.infoPanelData = data;
    }
  }

  /**
   * Sets the position of the info panel
   */
  setInfoPanelPosition(
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  ): void {
    this.updateInfoPanelPosition(position);
  }

  /**
   * Gets the current info panel data
   */
  getInfoPanelData(): InfoPanelData | null {
    return this.infoPanelData;
  }

  /**
   * Checks if the info panel is visible
   */
  isInfoPanelVisible(): boolean {
    return this._isInfoPanelVisible;
  }

  elementClick(context: HTMLElement) {
    if (this.cy) {
      return this.selectedElement;
    }
  }

  updateData(context: HTMLElement, elements: any[]) {
    if (this.cy) {
      this.cy.elements().remove();
      this.cy.add(elements);
      this.cy.layout({ ...this.cyConfig.layout }).run();
    }
  }

setZoomLevel(context: HTMLElement, distance: number) {
  if (!this.cy) return; 

  let numericDistance = Number(distance);
  if (isNaN(numericDistance) || numericDistance <= 0) return;

  const newZoomLevel = numericDistance / 100;

  // Smooth animated zoom toward graph center
  this.cy.animate({
    zoom: newZoomLevel,
    center: { eles: this.cy.elements() },
    duration: 1000,
  });
}


  getInstance(context: HTMLElement): Core | null {
    return this.cy;
  }

  destroy(context?: HTMLElement) {
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
      } catch (error) {
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

  remove(): void {
    this.destroy();
  }

  clear(): void {
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

  dispose(): void {
    // Remove all event listeners
    this.removeAllEventListeners();

    // Clear all data
    this.clear();

    // Destroy the instance
    this.destroy();
  }

  private removeAllEventListeners(): void {
    if (this.cy && this.eventListeners.length > 0) {
      this.eventListeners.forEach(listener => {
        try {
          if (listener.selector) {
            this.cy!.off(listener.event, listener.selector);
          } else {
            this.cy!.off(listener.event);
          }
        } catch (error) {
          console.error(
            `Error removing event listener ${listener.event}:`,
            error
          );
        }
      });

      this.eventListeners = [];
    }
  }

  // Utility methods
  fit(): void {
    if (this.cy) {
      this.cy.fit();
    }
  }

  center(): void {
    if (this.cy) {
      this.cy.center();
    }
  }

  zoom(level: number): void {
    if (this.cy) {
      this.cy.zoom(level);
    }
  }

  pan(position: { x: number; y: number }): void {
    if (this.cy) {
      this.cy.pan(position);
    }
  }

  runLayout(layoutOptions?: any): void {
    if (this.cy) {
      const layout = layoutOptions || { name: 'cose' };
      this.cy.layout(layout).run();
    }
  }

  getSelectedElements(): any[] {
    if (!this.cy) return [];
    return this.cy.$(':selected').toArray();
  }

  selectElement(elementId: string): void {
    if (this.cy) {
      this.cy.getElementById(elementId).select();
    }
  }

  unselectAll(): void {
    if (this.cy) {
      this.cy.elements().unselect();
    }
  }

  // Export/Import functionality
  exportData(): any {
    if (!this.cy) return null;
    return this.cy.json();
  }

  importData(data: any): void {
    if (this.cy && data) {
      this.cy.json(data);
    }
  }

  // Style and theming utilities
  updateStyles(newStyles: any[]): void {
    if (this.cy) {
      const processedStyles = processColorTokens(newStyles, this.currentTheme);
      this.cy.style(processedStyles);
    }
  }

  updateElementStyle(elementSelector: string, newStyle: any): void {
    if (this.cy) {
      // Process color tokens in the style object
      const processedStyle = { ...newStyle };
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
        if (
          processedStyle[prop] &&
          typeof processedStyle[prop] === 'string' &&
          processedStyle[prop].startsWith('token:')
        ) {
          processedStyle[prop] = resolveCytoscapeColorToken(
            processedStyle[prop],
            this.currentTheme
          );
        }
      });

      this.cy.style().selector(elementSelector).style(processedStyle).update();
    }
  }

  setTheme(theme: 'light' | 'dark' | string): void {
    if (!this.cy) return;

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

    const themeColors = themes[theme as keyof typeof themes] || themes.light;

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
    const processedThemedStyles = processColorTokens(
      themedStyles,
      this.currentTheme
    );
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
