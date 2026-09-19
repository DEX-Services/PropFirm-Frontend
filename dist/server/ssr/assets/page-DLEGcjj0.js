import { C as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { c as ShieldCheck, l as createLucideIcon } from "./ThemeSwitcher-CSO9oVP4.js";
import { i as ChevronDown, n as X, r as TrendingUp, t as PropShell } from "./PropShell-DWj8H339.js";
//#region node_modules/lucide-react/dist/esm/icons/clock-3.mjs
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$5 = {
	name: "clock-3",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M12 6v6h4",
		key: "135r8i"
	}]]
};
__iconData$5.node;
var Clock3 = createLucideIcon(__iconData$5);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/info.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$4 = {
	name: "info",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]
};
__iconData$4.node;
var Info = createLucideIcon(__iconData$4);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/search.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$3 = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
__iconData$3.node;
var Search = createLucideIcon(__iconData$3);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/settings-2.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$2 = {
	name: "settings-2",
	size: 24,
	node: [
		["path", {
			d: "M14 17H5",
			key: "gfn3mx"
		}],
		["path", {
			d: "M19 7h-9",
			key: "6i9tg"
		}],
		["circle", {
			cx: "17",
			cy: "17",
			r: "3",
			key: "18b49y"
		}],
		["circle", {
			cx: "7",
			cy: "7",
			r: "3",
			key: "dfmy0x"
		}]
	]
};
__iconData$2.node;
var Settings2 = createLucideIcon(__iconData$2);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/star.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$1 = {
	name: "star",
	size: 24,
	node: [["path", {
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
		key: "r04s7s"
	}]]
};
__iconData$1.node;
var Star = createLucideIcon(__iconData$1);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/trending-down.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData = {
	name: "trending-down",
	size: 24,
	node: [["path", {
		d: "M16 17h6v-6",
		key: "t6n2it"
	}], ["path", {
		d: "m22 17-8.5-8.5-5 5L2 7",
		key: "x473p"
	}]]
};
__iconData.node;
var TrendingDown = createLucideIcon(__iconData);
//#endregion
//#region node_modules/react-resizable-panels/dist/react-resizable-panels.browser.esm.js
var PanelGroupContext = (0, import_react.createContext)(null);
PanelGroupContext.displayName = "PanelGroupContext";
var DATA_ATTRIBUTES = {
	group: "data-panel-group",
	groupDirection: "data-panel-group-direction",
	groupId: "data-panel-group-id",
	panel: "data-panel",
	panelCollapsible: "data-panel-collapsible",
	panelId: "data-panel-id",
	panelSize: "data-panel-size",
	resizeHandle: "data-resize-handle",
	resizeHandleActive: "data-resize-handle-active",
	resizeHandleEnabled: "data-panel-resize-handle-enabled",
	resizeHandleId: "data-panel-resize-handle-id",
	resizeHandleState: "data-resize-handle-state"
};
var PRECISION = 10;
var useIsomorphicLayoutEffect = import_react.useLayoutEffect;
var useId$1 = import_react["useId".toString()];
var wrappedUseId = typeof useId$1 === "function" ? useId$1 : () => null;
var counter = 0;
function useUniqueId(idFromParams = null) {
	const idFromUseId = wrappedUseId();
	const idRef = (0, import_react.useRef)(idFromParams || idFromUseId || null);
	if (idRef.current === null) idRef.current = "" + counter++;
	return idFromParams !== null && idFromParams !== void 0 ? idFromParams : idRef.current;
}
function PanelWithForwardedRef({ children, className: classNameFromProps = "", collapsedSize, collapsible, defaultSize, forwardedRef, id: idFromProps, maxSize, minSize, onCollapse, onExpand, onResize, order, style: styleFromProps, tagName: Type = "div", ...rest }) {
	const context = (0, import_react.useContext)(PanelGroupContext);
	if (context === null) throw Error(`Panel components must be rendered within a PanelGroup container`);
	const { collapsePanel, expandPanel, getPanelSize, getPanelStyle, groupId, isPanelCollapsed, reevaluatePanelConstraints, registerPanel, resizePanel, unregisterPanel } = context;
	const panelId = useUniqueId(idFromProps);
	const panelDataRef = (0, import_react.useRef)({
		callbacks: {
			onCollapse,
			onExpand,
			onResize
		},
		constraints: {
			collapsedSize,
			collapsible,
			defaultSize,
			maxSize,
			minSize
		},
		id: panelId,
		idIsFromProps: idFromProps !== void 0,
		order
	});
	(0, import_react.useRef)({ didLogMissingDefaultSizeWarning: false });
	useIsomorphicLayoutEffect(() => {
		const { callbacks, constraints } = panelDataRef.current;
		const prevConstraints = { ...constraints };
		panelDataRef.current.id = panelId;
		panelDataRef.current.idIsFromProps = idFromProps !== void 0;
		panelDataRef.current.order = order;
		callbacks.onCollapse = onCollapse;
		callbacks.onExpand = onExpand;
		callbacks.onResize = onResize;
		constraints.collapsedSize = collapsedSize;
		constraints.collapsible = collapsible;
		constraints.defaultSize = defaultSize;
		constraints.maxSize = maxSize;
		constraints.minSize = minSize;
		if (prevConstraints.collapsedSize !== constraints.collapsedSize || prevConstraints.collapsible !== constraints.collapsible || prevConstraints.maxSize !== constraints.maxSize || prevConstraints.minSize !== constraints.minSize) reevaluatePanelConstraints(panelDataRef.current, prevConstraints);
	});
	useIsomorphicLayoutEffect(() => {
		const panelData = panelDataRef.current;
		registerPanel(panelData);
		return () => {
			unregisterPanel(panelData);
		};
	}, [
		order,
		panelId,
		registerPanel,
		unregisterPanel
	]);
	(0, import_react.useImperativeHandle)(forwardedRef, () => ({
		collapse: () => {
			collapsePanel(panelDataRef.current);
		},
		expand: (minSize) => {
			expandPanel(panelDataRef.current, minSize);
		},
		getId() {
			return panelId;
		},
		getSize() {
			return getPanelSize(panelDataRef.current);
		},
		isCollapsed() {
			return isPanelCollapsed(panelDataRef.current);
		},
		isExpanded() {
			return !isPanelCollapsed(panelDataRef.current);
		},
		resize: (size) => {
			resizePanel(panelDataRef.current, size);
		}
	}), [
		collapsePanel,
		expandPanel,
		getPanelSize,
		isPanelCollapsed,
		panelId,
		resizePanel
	]);
	const style = getPanelStyle(panelDataRef.current, defaultSize);
	return (0, import_react.createElement)(Type, {
		...rest,
		children,
		className: classNameFromProps,
		id: panelId,
		style: {
			...style,
			...styleFromProps
		},
		[DATA_ATTRIBUTES.groupId]: groupId,
		[DATA_ATTRIBUTES.panel]: "",
		[DATA_ATTRIBUTES.panelCollapsible]: collapsible || void 0,
		[DATA_ATTRIBUTES.panelId]: panelId,
		[DATA_ATTRIBUTES.panelSize]: parseFloat("" + style.flexGrow).toFixed(1)
	});
}
var Panel = (0, import_react.forwardRef)((props, ref) => (0, import_react.createElement)(PanelWithForwardedRef, {
	...props,
	forwardedRef: ref
}));
PanelWithForwardedRef.displayName = "Panel";
Panel.displayName = "forwardRef(Panel)";
var nonce;
function getNonce() {
	return nonce;
}
var currentCursorStyle = null;
var enabled = true;
var prevRuleIndex = -1;
var styleElement = null;
function getCursorStyle(state, constraintFlags) {
	if (constraintFlags) {
		const horizontalMin = (constraintFlags & EXCEEDED_HORIZONTAL_MIN) !== 0;
		const horizontalMax = (constraintFlags & EXCEEDED_HORIZONTAL_MAX) !== 0;
		const verticalMin = (constraintFlags & EXCEEDED_VERTICAL_MIN) !== 0;
		const verticalMax = (constraintFlags & EXCEEDED_VERTICAL_MAX) !== 0;
		if (horizontalMin) if (verticalMin) return "se-resize";
		else if (verticalMax) return "ne-resize";
		else return "e-resize";
		else if (horizontalMax) if (verticalMin) return "sw-resize";
		else if (verticalMax) return "nw-resize";
		else return "w-resize";
		else if (verticalMin) return "s-resize";
		else if (verticalMax) return "n-resize";
	}
	switch (state) {
		case "horizontal": return "ew-resize";
		case "intersection": return "move";
		case "vertical": return "ns-resize";
	}
}
function resetGlobalCursorStyle() {
	if (styleElement !== null) {
		document.head.removeChild(styleElement);
		currentCursorStyle = null;
		styleElement = null;
		prevRuleIndex = -1;
	}
}
function setGlobalCursorStyle(state, constraintFlags) {
	var _styleElement$sheet$i, _styleElement$sheet2;
	if (!enabled) return;
	const style = getCursorStyle(state, constraintFlags);
	if (currentCursorStyle === style) return;
	currentCursorStyle = style;
	if (styleElement === null) {
		styleElement = document.createElement("style");
		const nonce = getNonce();
		if (nonce) styleElement.setAttribute("nonce", nonce);
		document.head.appendChild(styleElement);
	}
	if (prevRuleIndex >= 0) {
		var _styleElement$sheet;
		(_styleElement$sheet = styleElement.sheet) === null || _styleElement$sheet === void 0 || _styleElement$sheet.removeRule(prevRuleIndex);
	}
	prevRuleIndex = (_styleElement$sheet$i = (_styleElement$sheet2 = styleElement.sheet) === null || _styleElement$sheet2 === void 0 ? void 0 : _styleElement$sheet2.insertRule(`*{cursor: ${style} !important;}`)) !== null && _styleElement$sheet$i !== void 0 ? _styleElement$sheet$i : -1;
}
function isKeyDown(event) {
	return event.type === "keydown";
}
function isPointerEvent(event) {
	return event.type.startsWith("pointer");
}
function isMouseEvent(event) {
	return event.type.startsWith("mouse");
}
function getResizeEventCoordinates(event) {
	if (isPointerEvent(event)) {
		if (event.isPrimary) return {
			x: event.clientX,
			y: event.clientY
		};
	} else if (isMouseEvent(event)) return {
		x: event.clientX,
		y: event.clientY
	};
	return {
		x: Infinity,
		y: Infinity
	};
}
function getInputType() {
	if (typeof matchMedia === "function") return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
function intersects(rectOne, rectTwo, strict) {
	if (strict) return rectOne.x < rectTwo.x + rectTwo.width && rectOne.x + rectOne.width > rectTwo.x && rectOne.y < rectTwo.y + rectTwo.height && rectOne.y + rectOne.height > rectTwo.y;
	else return rectOne.x <= rectTwo.x + rectTwo.width && rectOne.x + rectOne.width >= rectTwo.x && rectOne.y <= rectTwo.y + rectTwo.height && rectOne.y + rectOne.height >= rectTwo.y;
}
/**
* Determine which of two nodes appears in front of the other —
* if `a` is in front, returns 1, otherwise returns -1
* @param {HTMLElement | SVGElement} a
* @param {HTMLElement | SVGElement} b
*/
function compare(a, b) {
	if (a === b) throw new Error("Cannot compare node with itself");
	const ancestors = {
		a: get_ancestors(a),
		b: get_ancestors(b)
	};
	let common_ancestor;
	while (ancestors.a.at(-1) === ancestors.b.at(-1)) {
		a = ancestors.a.pop();
		b = ancestors.b.pop();
		common_ancestor = a;
	}
	assert(common_ancestor, "Stacking order can only be calculated for elements with a common ancestor");
	const z_indexes = {
		a: get_z_index(find_stacking_context(ancestors.a)),
		b: get_z_index(find_stacking_context(ancestors.b))
	};
	if (z_indexes.a === z_indexes.b) {
		const children = common_ancestor.childNodes;
		const furthest_ancestors = {
			a: ancestors.a.at(-1),
			b: ancestors.b.at(-1)
		};
		let i = children.length;
		while (i--) {
			const child = children[i];
			if (child === furthest_ancestors.a) return 1;
			if (child === furthest_ancestors.b) return -1;
		}
	}
	return Math.sign(z_indexes.a - z_indexes.b);
}
var props = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
/** @param {HTMLElement | SVGElement} node */
function is_flex_item(node) {
	var _get_parent;
	const display = getComputedStyle((_get_parent = get_parent(node)) !== null && _get_parent !== void 0 ? _get_parent : node).display;
	return display === "flex" || display === "inline-flex";
}
/** @param {HTMLElement | SVGElement} node */
function creates_stacking_context(node) {
	const style = getComputedStyle(node);
	if (style.position === "fixed") return true;
	if (style.zIndex !== "auto" && (style.position !== "static" || is_flex_item(node))) return true;
	if (+style.opacity < 1) return true;
	if ("transform" in style && style.transform !== "none") return true;
	if ("webkitTransform" in style && style.webkitTransform !== "none") return true;
	if ("mixBlendMode" in style && style.mixBlendMode !== "normal") return true;
	if ("filter" in style && style.filter !== "none") return true;
	if ("webkitFilter" in style && style.webkitFilter !== "none") return true;
	if ("isolation" in style && style.isolation === "isolate") return true;
	if (props.test(style.willChange)) return true;
	if (style.webkitOverflowScrolling === "touch") return true;
	return false;
}
/** @param {(HTMLElement| SVGElement)[]} nodes */
function find_stacking_context(nodes) {
	let i = nodes.length;
	while (i--) {
		const node = nodes[i];
		assert(node, "Missing node");
		if (creates_stacking_context(node)) return node;
	}
	return null;
}
/** @param {HTMLElement | SVGElement} node */
function get_z_index(node) {
	return node && Number(getComputedStyle(node).zIndex) || 0;
}
/** @param {HTMLElement} node */
function get_ancestors(node) {
	const ancestors = [];
	while (node) {
		ancestors.push(node);
		node = get_parent(node);
	}
	return ancestors;
}
/** @param {HTMLElement} node */
function get_parent(node) {
	const { parentNode } = node;
	if (parentNode && parentNode instanceof ShadowRoot) return parentNode.host;
	return parentNode;
}
var EXCEEDED_HORIZONTAL_MIN = 1;
var EXCEEDED_HORIZONTAL_MAX = 2;
var EXCEEDED_VERTICAL_MIN = 4;
var EXCEEDED_VERTICAL_MAX = 8;
var isCoarsePointer = getInputType() === "coarse";
var intersectingHandles = [];
var isPointerDown = false;
var ownerDocumentCounts = /* @__PURE__ */ new Map();
var panelConstraintFlags = /* @__PURE__ */ new Map();
var registeredResizeHandlers = /* @__PURE__ */ new Set();
function registerResizeHandle(resizeHandleId, element, direction, hitAreaMargins, setResizeHandlerState) {
	var _ownerDocumentCounts$;
	const { ownerDocument } = element;
	const data = {
		direction,
		element,
		hitAreaMargins,
		setResizeHandlerState
	};
	const count = (_ownerDocumentCounts$ = ownerDocumentCounts.get(ownerDocument)) !== null && _ownerDocumentCounts$ !== void 0 ? _ownerDocumentCounts$ : 0;
	ownerDocumentCounts.set(ownerDocument, count + 1);
	registeredResizeHandlers.add(data);
	updateListeners();
	return function unregisterResizeHandle() {
		var _ownerDocumentCounts$2;
		panelConstraintFlags.delete(resizeHandleId);
		registeredResizeHandlers.delete(data);
		const count = (_ownerDocumentCounts$2 = ownerDocumentCounts.get(ownerDocument)) !== null && _ownerDocumentCounts$2 !== void 0 ? _ownerDocumentCounts$2 : 1;
		ownerDocumentCounts.set(ownerDocument, count - 1);
		updateListeners();
		if (count === 1) ownerDocumentCounts.delete(ownerDocument);
		if (intersectingHandles.includes(data)) {
			const index = intersectingHandles.indexOf(data);
			if (index >= 0) intersectingHandles.splice(index, 1);
			updateCursor();
			setResizeHandlerState("up", true, null);
		}
	};
}
function handlePointerDown(event) {
	const { target } = event;
	const { x, y } = getResizeEventCoordinates(event);
	isPointerDown = true;
	recalculateIntersectingHandles({
		target,
		x,
		y
	});
	updateListeners();
	if (intersectingHandles.length > 0) {
		updateResizeHandlerStates("down", event);
		event.preventDefault();
		if (!isWithinResizeHandle(target)) event.stopImmediatePropagation();
	}
}
function handlePointerMove(event) {
	const { x, y } = getResizeEventCoordinates(event);
	if (isPointerDown && event.buttons === 0) {
		isPointerDown = false;
		updateResizeHandlerStates("up", event);
	}
	if (!isPointerDown) {
		const { target } = event;
		recalculateIntersectingHandles({
			target,
			x,
			y
		});
	}
	updateResizeHandlerStates("move", event);
	updateCursor();
	if (intersectingHandles.length > 0) event.preventDefault();
}
function handlePointerUp(event) {
	const { target } = event;
	const { x, y } = getResizeEventCoordinates(event);
	panelConstraintFlags.clear();
	isPointerDown = false;
	if (intersectingHandles.length > 0) {
		event.preventDefault();
		if (!isWithinResizeHandle(target)) event.stopImmediatePropagation();
	}
	updateResizeHandlerStates("up", event);
	recalculateIntersectingHandles({
		target,
		x,
		y
	});
	updateCursor();
	updateListeners();
}
function isWithinResizeHandle(element) {
	let currentElement = element;
	while (currentElement) {
		if (currentElement.hasAttribute(DATA_ATTRIBUTES.resizeHandle)) return true;
		currentElement = currentElement.parentElement;
	}
	return false;
}
function recalculateIntersectingHandles({ target, x, y }) {
	intersectingHandles.splice(0);
	let targetElement = null;
	if (target instanceof HTMLElement || target instanceof SVGElement) targetElement = target;
	registeredResizeHandlers.forEach((data) => {
		const { element: dragHandleElement, hitAreaMargins } = data;
		const dragHandleRect = dragHandleElement.getBoundingClientRect();
		const { bottom, left, right, top } = dragHandleRect;
		const margin = isCoarsePointer ? hitAreaMargins.coarse : hitAreaMargins.fine;
		if (x >= left - margin && x <= right + margin && y >= top - margin && y <= bottom + margin) {
			if (targetElement !== null && document.contains(targetElement) && dragHandleElement !== targetElement && !dragHandleElement.contains(targetElement) && !targetElement.contains(dragHandleElement) && compare(targetElement, dragHandleElement) > 0) {
				let currentElement = targetElement;
				let didIntersect = false;
				while (currentElement) {
					if (currentElement.contains(dragHandleElement)) break;
					else if (intersects(currentElement.getBoundingClientRect(), dragHandleRect, true)) {
						didIntersect = true;
						break;
					}
					currentElement = currentElement.parentElement;
				}
				if (didIntersect) return;
			}
			intersectingHandles.push(data);
		}
	});
}
function reportConstraintsViolation(resizeHandleId, flag) {
	panelConstraintFlags.set(resizeHandleId, flag);
}
function updateCursor() {
	let intersectsHorizontal = false;
	let intersectsVertical = false;
	intersectingHandles.forEach((data) => {
		const { direction } = data;
		if (direction === "horizontal") intersectsHorizontal = true;
		else intersectsVertical = true;
	});
	let constraintFlags = 0;
	panelConstraintFlags.forEach((flag) => {
		constraintFlags |= flag;
	});
	if (intersectsHorizontal && intersectsVertical) setGlobalCursorStyle("intersection", constraintFlags);
	else if (intersectsHorizontal) setGlobalCursorStyle("horizontal", constraintFlags);
	else if (intersectsVertical) setGlobalCursorStyle("vertical", constraintFlags);
	else resetGlobalCursorStyle();
}
var listenersAbortController = new AbortController();
function updateListeners() {
	listenersAbortController.abort();
	listenersAbortController = new AbortController();
	const options = {
		capture: true,
		signal: listenersAbortController.signal
	};
	if (!registeredResizeHandlers.size) return;
	if (isPointerDown) {
		if (intersectingHandles.length > 0) ownerDocumentCounts.forEach((count, ownerDocument) => {
			const { body } = ownerDocument;
			if (count > 0) {
				body.addEventListener("contextmenu", handlePointerUp, options);
				body.addEventListener("pointerleave", handlePointerMove, options);
				body.addEventListener("pointermove", handlePointerMove, options);
			}
		});
		window.addEventListener("pointerup", handlePointerUp, options);
		window.addEventListener("pointercancel", handlePointerUp, options);
	} else ownerDocumentCounts.forEach((count, ownerDocument) => {
		const { body } = ownerDocument;
		if (count > 0) {
			body.addEventListener("pointerdown", handlePointerDown, options);
			body.addEventListener("pointermove", handlePointerMove, options);
		}
	});
}
function updateResizeHandlerStates(action, event) {
	registeredResizeHandlers.forEach((data) => {
		const { setResizeHandlerState } = data;
		setResizeHandlerState(action, intersectingHandles.includes(data), event);
	});
}
function useForceUpdate() {
	const [_, setCount] = (0, import_react.useState)(0);
	return (0, import_react.useCallback)(() => setCount((prevCount) => prevCount + 1), []);
}
function assert(expectedCondition, message) {
	if (!expectedCondition) {
		console.error(message);
		throw Error(message);
	}
}
function fuzzyCompareNumbers(actual, expected, fractionDigits = PRECISION) {
	if (actual.toFixed(fractionDigits) === expected.toFixed(fractionDigits)) return 0;
	else return actual > expected ? 1 : -1;
}
function fuzzyNumbersEqual$1(actual, expected, fractionDigits = PRECISION) {
	return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
function fuzzyNumbersEqual(actual, expected, fractionDigits) {
	return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
function fuzzyLayoutsEqual(actual, expected, fractionDigits) {
	if (actual.length !== expected.length) return false;
	for (let index = 0; index < actual.length; index++) {
		const actualSize = actual[index];
		const expectedSize = expected[index];
		if (!fuzzyNumbersEqual(actualSize, expectedSize, fractionDigits)) return false;
	}
	return true;
}
function resizePanel({ panelConstraints: panelConstraintsArray, panelIndex, size }) {
	const panelConstraints = panelConstraintsArray[panelIndex];
	assert(panelConstraints != null, `Panel constraints not found for index ${panelIndex}`);
	let { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = panelConstraints;
	if (fuzzyCompareNumbers(size, minSize) < 0) if (collapsible) {
		const halfwayPoint = (collapsedSize + minSize) / 2;
		if (fuzzyCompareNumbers(size, halfwayPoint) < 0) size = collapsedSize;
		else size = minSize;
	} else size = minSize;
	size = Math.min(maxSize, size);
	size = parseFloat(size.toFixed(PRECISION));
	return size;
}
function adjustLayoutByDelta({ delta, initialLayout, panelConstraints: panelConstraintsArray, pivotIndices, prevLayout, trigger }) {
	if (fuzzyNumbersEqual(delta, 0)) return initialLayout;
	const nextLayout = [...initialLayout];
	const [firstPivotIndex, secondPivotIndex] = pivotIndices;
	assert(firstPivotIndex != null, "Invalid first pivot index");
	assert(secondPivotIndex != null, "Invalid second pivot index");
	let deltaApplied = 0;
	if (trigger === "keyboard") {
		{
			const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
			const panelConstraints = panelConstraintsArray[index];
			assert(panelConstraints, `Panel constraints not found for index ${index}`);
			const { collapsedSize = 0, collapsible, minSize = 0 } = panelConstraints;
			if (collapsible) {
				const prevSize = initialLayout[index];
				assert(prevSize != null, `Previous layout not found for panel index ${index}`);
				if (fuzzyNumbersEqual(prevSize, collapsedSize)) {
					const localDelta = minSize - prevSize;
					if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) delta = delta < 0 ? 0 - localDelta : localDelta;
				}
			}
		}
		{
			const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
			const panelConstraints = panelConstraintsArray[index];
			assert(panelConstraints, `No panel constraints found for index ${index}`);
			const { collapsedSize = 0, collapsible, minSize = 0 } = panelConstraints;
			if (collapsible) {
				const prevSize = initialLayout[index];
				assert(prevSize != null, `Previous layout not found for panel index ${index}`);
				if (fuzzyNumbersEqual(prevSize, minSize)) {
					const localDelta = prevSize - collapsedSize;
					if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) delta = delta < 0 ? 0 - localDelta : localDelta;
				}
			}
		}
	}
	{
		const increment = delta < 0 ? 1 : -1;
		let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
		let maxAvailableDelta = 0;
		while (true) {
			const prevSize = initialLayout[index];
			assert(prevSize != null, `Previous layout not found for panel index ${index}`);
			const delta = resizePanel({
				panelConstraints: panelConstraintsArray,
				panelIndex: index,
				size: 100
			}) - prevSize;
			maxAvailableDelta += delta;
			index += increment;
			if (index < 0 || index >= panelConstraintsArray.length) break;
		}
		const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
		delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
	}
	{
		let index = delta < 0 ? firstPivotIndex : secondPivotIndex;
		while (index >= 0 && index < panelConstraintsArray.length) {
			const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
			const prevSize = initialLayout[index];
			assert(prevSize != null, `Previous layout not found for panel index ${index}`);
			const unsafeSize = prevSize - deltaRemaining;
			const safeSize = resizePanel({
				panelConstraints: panelConstraintsArray,
				panelIndex: index,
				size: unsafeSize
			});
			if (!fuzzyNumbersEqual(prevSize, safeSize)) {
				deltaApplied += prevSize - safeSize;
				nextLayout[index] = safeSize;
				if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, { numeric: true }) >= 0) break;
			}
			if (delta < 0) index--;
			else index++;
		}
	}
	if (fuzzyLayoutsEqual(prevLayout, nextLayout)) return prevLayout;
	{
		const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
		const prevSize = initialLayout[pivotIndex];
		assert(prevSize != null, `Previous layout not found for panel index ${pivotIndex}`);
		const unsafeSize = prevSize + deltaApplied;
		const safeSize = resizePanel({
			panelConstraints: panelConstraintsArray,
			panelIndex: pivotIndex,
			size: unsafeSize
		});
		nextLayout[pivotIndex] = safeSize;
		if (!fuzzyNumbersEqual(safeSize, unsafeSize)) {
			let deltaRemaining = unsafeSize - safeSize;
			let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
			while (index >= 0 && index < panelConstraintsArray.length) {
				const prevSize = nextLayout[index];
				assert(prevSize != null, `Previous layout not found for panel index ${index}`);
				const unsafeSize = prevSize + deltaRemaining;
				const safeSize = resizePanel({
					panelConstraints: panelConstraintsArray,
					panelIndex: index,
					size: unsafeSize
				});
				if (!fuzzyNumbersEqual(prevSize, safeSize)) {
					deltaRemaining -= safeSize - prevSize;
					nextLayout[index] = safeSize;
				}
				if (fuzzyNumbersEqual(deltaRemaining, 0)) break;
				if (delta > 0) index--;
				else index++;
			}
		}
	}
	if (!fuzzyNumbersEqual(nextLayout.reduce((total, size) => size + total, 0), 100)) return prevLayout;
	return nextLayout;
}
function calculateAriaValues({ layout, panelsArray, pivotIndices }) {
	let currentMinSize = 0;
	let currentMaxSize = 100;
	let totalMinSize = 0;
	let totalMaxSize = 0;
	const firstIndex = pivotIndices[0];
	assert(firstIndex != null, "No pivot index found");
	panelsArray.forEach((panelData, index) => {
		const { constraints } = panelData;
		const { maxSize = 100, minSize = 0 } = constraints;
		if (index === firstIndex) {
			currentMinSize = minSize;
			currentMaxSize = maxSize;
		} else {
			totalMinSize += minSize;
			totalMaxSize += maxSize;
		}
	});
	return {
		valueMax: Math.min(currentMaxSize, 100 - totalMinSize),
		valueMin: Math.max(currentMinSize, 100 - totalMaxSize),
		valueNow: layout[firstIndex]
	};
}
function getResizeHandleElementsForGroup(groupId, scope = document) {
	return Array.from(scope.querySelectorAll(`[${DATA_ATTRIBUTES.resizeHandleId}][data-panel-group-id="${groupId}"]`));
}
function getResizeHandleElementIndex(groupId, id, scope = document) {
	const index = getResizeHandleElementsForGroup(groupId, scope).findIndex((handle) => handle.getAttribute(DATA_ATTRIBUTES.resizeHandleId) === id);
	return index !== null && index !== void 0 ? index : null;
}
function determinePivotIndices(groupId, dragHandleId, panelGroupElement) {
	const index = getResizeHandleElementIndex(groupId, dragHandleId, panelGroupElement);
	return index != null ? [index, index + 1] : [-1, -1];
}
function getPanelGroupElement(id, rootElement = document) {
	var _dataset;
	if (rootElement instanceof HTMLElement && (rootElement === null || rootElement === void 0 ? void 0 : (_dataset = rootElement.dataset) === null || _dataset === void 0 ? void 0 : _dataset.panelGroupId) == id) return rootElement;
	const element = rootElement.querySelector(`[data-panel-group][data-panel-group-id="${id}"]`);
	if (element) return element;
	return null;
}
function getResizeHandleElement(id, scope = document) {
	const element = scope.querySelector(`[${DATA_ATTRIBUTES.resizeHandleId}="${id}"]`);
	if (element) return element;
	return null;
}
function getResizeHandlePanelIds(groupId, handleId, panelsArray, scope = document) {
	var _panelsArray$index$id, _panelsArray$index, _panelsArray$id, _panelsArray;
	const handle = getResizeHandleElement(handleId, scope);
	const handles = getResizeHandleElementsForGroup(groupId, scope);
	const index = handle ? handles.indexOf(handle) : -1;
	return [(_panelsArray$index$id = (_panelsArray$index = panelsArray[index]) === null || _panelsArray$index === void 0 ? void 0 : _panelsArray$index.id) !== null && _panelsArray$index$id !== void 0 ? _panelsArray$index$id : null, (_panelsArray$id = (_panelsArray = panelsArray[index + 1]) === null || _panelsArray === void 0 ? void 0 : _panelsArray.id) !== null && _panelsArray$id !== void 0 ? _panelsArray$id : null];
}
function useWindowSplitterPanelGroupBehavior({ committedValuesRef, eagerValuesRef, groupId, layout, panelDataArray, panelGroupElement, setLayout }) {
	(0, import_react.useRef)({ didWarnAboutMissingResizeHandle: false });
	useIsomorphicLayoutEffect(() => {
		if (!panelGroupElement) return;
		const resizeHandleElements = getResizeHandleElementsForGroup(groupId, panelGroupElement);
		for (let index = 0; index < panelDataArray.length - 1; index++) {
			const { valueMax, valueMin, valueNow } = calculateAriaValues({
				layout,
				panelsArray: panelDataArray,
				pivotIndices: [index, index + 1]
			});
			const resizeHandleElement = resizeHandleElements[index];
			if (resizeHandleElement == null);
			else {
				const panelData = panelDataArray[index];
				assert(panelData, `No panel data found for index "${index}"`);
				resizeHandleElement.setAttribute("aria-controls", panelData.id);
				resizeHandleElement.setAttribute("aria-valuemax", "" + Math.round(valueMax));
				resizeHandleElement.setAttribute("aria-valuemin", "" + Math.round(valueMin));
				resizeHandleElement.setAttribute("aria-valuenow", valueNow != null ? "" + Math.round(valueNow) : "");
			}
		}
		return () => {
			resizeHandleElements.forEach((resizeHandleElement, index) => {
				resizeHandleElement.removeAttribute("aria-controls");
				resizeHandleElement.removeAttribute("aria-valuemax");
				resizeHandleElement.removeAttribute("aria-valuemin");
				resizeHandleElement.removeAttribute("aria-valuenow");
			});
		};
	}, [
		groupId,
		layout,
		panelDataArray,
		panelGroupElement
	]);
	(0, import_react.useEffect)(() => {
		if (!panelGroupElement) return;
		const eagerValues = eagerValuesRef.current;
		assert(eagerValues, `Eager values not found`);
		const { panelDataArray } = eagerValues;
		assert(getPanelGroupElement(groupId, panelGroupElement) != null, `No group found for id "${groupId}"`);
		const handles = getResizeHandleElementsForGroup(groupId, panelGroupElement);
		assert(handles, `No resize handles found for group id "${groupId}"`);
		const cleanupFunctions = handles.map((handle) => {
			const handleId = handle.getAttribute(DATA_ATTRIBUTES.resizeHandleId);
			assert(handleId, `Resize handle element has no handle id attribute`);
			const [idBefore, idAfter] = getResizeHandlePanelIds(groupId, handleId, panelDataArray, panelGroupElement);
			if (idBefore == null || idAfter == null) return () => {};
			const onKeyDown = (event) => {
				if (event.defaultPrevented) return;
				switch (event.key) {
					case "Enter": {
						event.preventDefault();
						const index = panelDataArray.findIndex((panelData) => panelData.id === idBefore);
						if (index >= 0) {
							const panelData = panelDataArray[index];
							assert(panelData, `No panel data found for index ${index}`);
							const size = layout[index];
							const { collapsedSize = 0, collapsible, minSize = 0 } = panelData.constraints;
							if (size != null && collapsible) {
								const nextLayout = adjustLayoutByDelta({
									delta: fuzzyNumbersEqual(size, collapsedSize) ? minSize - collapsedSize : collapsedSize - size,
									initialLayout: layout,
									panelConstraints: panelDataArray.map((panelData) => panelData.constraints),
									pivotIndices: determinePivotIndices(groupId, handleId, panelGroupElement),
									prevLayout: layout,
									trigger: "keyboard"
								});
								if (layout !== nextLayout) setLayout(nextLayout);
							}
						}
						break;
					}
				}
			};
			handle.addEventListener("keydown", onKeyDown);
			return () => {
				handle.removeEventListener("keydown", onKeyDown);
			};
		});
		return () => {
			cleanupFunctions.forEach((cleanupFunction) => cleanupFunction());
		};
	}, [
		panelGroupElement,
		committedValuesRef,
		eagerValuesRef,
		groupId,
		layout,
		panelDataArray,
		setLayout
	]);
}
function areEqual(arrayA, arrayB) {
	if (arrayA.length !== arrayB.length) return false;
	for (let index = 0; index < arrayA.length; index++) if (arrayA[index] !== arrayB[index]) return false;
	return true;
}
function getResizeEventCursorPosition(direction, event) {
	const isHorizontal = direction === "horizontal";
	const { x, y } = getResizeEventCoordinates(event);
	return isHorizontal ? x : y;
}
function calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement) {
	const isHorizontal = direction === "horizontal";
	const handleElement = getResizeHandleElement(dragHandleId, panelGroupElement);
	assert(handleElement, `No resize handle element found for id "${dragHandleId}"`);
	const groupId = handleElement.getAttribute(DATA_ATTRIBUTES.groupId);
	assert(groupId, `Resize handle element has no group id attribute`);
	let { initialCursorPosition } = initialDragState;
	const cursorPosition = getResizeEventCursorPosition(direction, event);
	const groupElement = getPanelGroupElement(groupId, panelGroupElement);
	assert(groupElement, `No group element found for id "${groupId}"`);
	const groupRect = groupElement.getBoundingClientRect();
	const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
	return (cursorPosition - initialCursorPosition) / groupSizeInPixels * 100;
}
function calculateDeltaPercentage(event, dragHandleId, direction, initialDragState, keyboardResizeBy, panelGroupElement) {
	if (isKeyDown(event)) {
		const isHorizontal = direction === "horizontal";
		let delta = 0;
		if (event.shiftKey) delta = 100;
		else if (keyboardResizeBy != null) delta = keyboardResizeBy;
		else delta = 10;
		let movement = 0;
		switch (event.key) {
			case "ArrowDown":
				movement = isHorizontal ? 0 : delta;
				break;
			case "ArrowLeft":
				movement = isHorizontal ? -delta : 0;
				break;
			case "ArrowRight":
				movement = isHorizontal ? delta : 0;
				break;
			case "ArrowUp":
				movement = isHorizontal ? 0 : -delta;
				break;
			case "End":
				movement = 100;
				break;
			case "Home":
				movement = -100;
				break;
		}
		return movement;
	} else {
		if (initialDragState == null) return 0;
		return calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement);
	}
}
function calculateUnsafeDefaultLayout({ panelDataArray }) {
	const layout = Array(panelDataArray.length);
	const panelConstraintsArray = panelDataArray.map((panelData) => panelData.constraints);
	let numPanelsWithSizes = 0;
	let remainingSize = 100;
	for (let index = 0; index < panelDataArray.length; index++) {
		const panelConstraints = panelConstraintsArray[index];
		assert(panelConstraints, `Panel constraints not found for index ${index}`);
		const { defaultSize } = panelConstraints;
		if (defaultSize != null) {
			numPanelsWithSizes++;
			layout[index] = defaultSize;
			remainingSize -= defaultSize;
		}
	}
	for (let index = 0; index < panelDataArray.length; index++) {
		const panelConstraints = panelConstraintsArray[index];
		assert(panelConstraints, `Panel constraints not found for index ${index}`);
		const { defaultSize } = panelConstraints;
		if (defaultSize != null) continue;
		const numRemainingPanels = panelDataArray.length - numPanelsWithSizes;
		const size = remainingSize / numRemainingPanels;
		numPanelsWithSizes++;
		layout[index] = size;
		remainingSize -= size;
	}
	return layout;
}
function callPanelCallbacks(panelsArray, layout, panelIdToLastNotifiedSizeMap) {
	layout.forEach((size, index) => {
		const panelData = panelsArray[index];
		assert(panelData, `Panel data not found for index ${index}`);
		const { callbacks, constraints, id: panelId } = panelData;
		const { collapsedSize = 0, collapsible } = constraints;
		const lastNotifiedSize = panelIdToLastNotifiedSizeMap[panelId];
		if (lastNotifiedSize == null || size !== lastNotifiedSize) {
			panelIdToLastNotifiedSizeMap[panelId] = size;
			const { onCollapse, onExpand, onResize } = callbacks;
			if (onResize) onResize(size, lastNotifiedSize);
			if (collapsible && (onCollapse || onExpand)) {
				if (onExpand && (lastNotifiedSize == null || fuzzyNumbersEqual$1(lastNotifiedSize, collapsedSize)) && !fuzzyNumbersEqual$1(size, collapsedSize)) onExpand();
				if (onCollapse && (lastNotifiedSize == null || !fuzzyNumbersEqual$1(lastNotifiedSize, collapsedSize)) && fuzzyNumbersEqual$1(size, collapsedSize)) onCollapse();
			}
		}
	});
}
function compareLayouts(a, b) {
	if (a.length !== b.length) return false;
	else for (let index = 0; index < a.length; index++) if (a[index] != b[index]) return false;
	return true;
}
function computePanelFlexBoxStyle({ defaultSize, dragState, layout, panelData, panelIndex, precision = 3 }) {
	const size = layout[panelIndex];
	let flexGrow;
	if (size == null) flexGrow = defaultSize != void 0 ? defaultSize.toPrecision(precision) : "1";
	else if (panelData.length === 1) flexGrow = "1";
	else flexGrow = size.toPrecision(precision);
	return {
		flexBasis: 0,
		flexGrow,
		flexShrink: 1,
		overflow: "hidden",
		pointerEvents: dragState !== null ? "none" : void 0
	};
}
function debounce(callback, durationMs = 10) {
	let timeoutId = null;
	let callable = (...args) => {
		if (timeoutId !== null) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			callback(...args);
		}, durationMs);
	};
	return callable;
}
function initializeDefaultStorage(storageObject) {
	try {
		if (typeof localStorage !== "undefined") {
			storageObject.getItem = (name) => {
				return localStorage.getItem(name);
			};
			storageObject.setItem = (name, value) => {
				localStorage.setItem(name, value);
			};
		} else throw new Error("localStorage not supported in this environment");
	} catch (error) {
		console.error(error);
		storageObject.getItem = () => null;
		storageObject.setItem = () => {};
	}
}
function getPanelGroupKey(autoSaveId) {
	return `react-resizable-panels:${autoSaveId}`;
}
function getPanelKey(panels) {
	return panels.map((panel) => {
		const { constraints, id, idIsFromProps, order } = panel;
		if (idIsFromProps) return id;
		else return order ? `${order}:${JSON.stringify(constraints)}` : JSON.stringify(constraints);
	}).sort((a, b) => a.localeCompare(b)).join(",");
}
function loadSerializedPanelGroupState(autoSaveId, storage) {
	try {
		const panelGroupKey = getPanelGroupKey(autoSaveId);
		const serialized = storage.getItem(panelGroupKey);
		if (serialized) {
			const parsed = JSON.parse(serialized);
			if (typeof parsed === "object" && parsed != null) return parsed;
		}
	} catch (error) {}
	return null;
}
function loadPanelGroupState(autoSaveId, panels, storage) {
	var _loadSerializedPanelG, _state$panelKey;
	return (_state$panelKey = ((_loadSerializedPanelG = loadSerializedPanelGroupState(autoSaveId, storage)) !== null && _loadSerializedPanelG !== void 0 ? _loadSerializedPanelG : {})[getPanelKey(panels)]) !== null && _state$panelKey !== void 0 ? _state$panelKey : null;
}
function savePanelGroupState(autoSaveId, panels, panelSizesBeforeCollapse, sizes, storage) {
	var _loadSerializedPanelG2;
	const panelGroupKey = getPanelGroupKey(autoSaveId);
	const panelKey = getPanelKey(panels);
	const state = (_loadSerializedPanelG2 = loadSerializedPanelGroupState(autoSaveId, storage)) !== null && _loadSerializedPanelG2 !== void 0 ? _loadSerializedPanelG2 : {};
	state[panelKey] = {
		expandToSizes: Object.fromEntries(panelSizesBeforeCollapse.entries()),
		layout: sizes
	};
	try {
		storage.setItem(panelGroupKey, JSON.stringify(state));
	} catch (error) {
		console.error(error);
	}
}
function validatePanelGroupLayout({ layout: prevLayout, panelConstraints }) {
	const nextLayout = [...prevLayout];
	const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
	if (nextLayout.length !== panelConstraints.length) throw Error(`Invalid ${panelConstraints.length} panel layout: ${nextLayout.map((size) => `${size}%`).join(", ")}`);
	else if (!fuzzyNumbersEqual(nextLayoutTotalSize, 100) && nextLayout.length > 0) for (let index = 0; index < panelConstraints.length; index++) {
		const unsafeSize = nextLayout[index];
		assert(unsafeSize != null, `No layout data found for index ${index}`);
		nextLayout[index] = 100 / nextLayoutTotalSize * unsafeSize;
	}
	let remainingSize = 0;
	for (let index = 0; index < panelConstraints.length; index++) {
		const unsafeSize = nextLayout[index];
		assert(unsafeSize != null, `No layout data found for index ${index}`);
		const safeSize = resizePanel({
			panelConstraints,
			panelIndex: index,
			size: unsafeSize
		});
		if (unsafeSize != safeSize) {
			remainingSize += unsafeSize - safeSize;
			nextLayout[index] = safeSize;
		}
	}
	if (!fuzzyNumbersEqual(remainingSize, 0)) for (let index = 0; index < panelConstraints.length; index++) {
		const prevSize = nextLayout[index];
		assert(prevSize != null, `No layout data found for index ${index}`);
		const unsafeSize = prevSize + remainingSize;
		const safeSize = resizePanel({
			panelConstraints,
			panelIndex: index,
			size: unsafeSize
		});
		if (prevSize !== safeSize) {
			remainingSize -= safeSize - prevSize;
			nextLayout[index] = safeSize;
			if (fuzzyNumbersEqual(remainingSize, 0)) break;
		}
	}
	return nextLayout;
}
var LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;
var defaultStorage = {
	getItem: (name) => {
		initializeDefaultStorage(defaultStorage);
		return defaultStorage.getItem(name);
	},
	setItem: (name, value) => {
		initializeDefaultStorage(defaultStorage);
		defaultStorage.setItem(name, value);
	}
};
var debounceMap = {};
function PanelGroupWithForwardedRef({ autoSaveId = null, children, className: classNameFromProps = "", direction, forwardedRef, id: idFromProps = null, onLayout = null, keyboardResizeBy = null, storage = defaultStorage, style: styleFromProps, tagName: Type = "div", ...rest }) {
	const groupId = useUniqueId(idFromProps);
	const panelGroupElementRef = (0, import_react.useRef)(null);
	const [dragState, setDragState] = (0, import_react.useState)(null);
	const [layout, setLayout] = (0, import_react.useState)([]);
	const forceUpdate = useForceUpdate();
	const panelIdToLastNotifiedSizeMapRef = (0, import_react.useRef)({});
	const panelSizeBeforeCollapseRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const prevDeltaRef = (0, import_react.useRef)(0);
	const committedValuesRef = (0, import_react.useRef)({
		autoSaveId,
		direction,
		dragState,
		id: groupId,
		keyboardResizeBy,
		onLayout,
		storage
	});
	const eagerValuesRef = (0, import_react.useRef)({
		layout,
		panelDataArray: [],
		panelDataArrayChanged: false
	});
	(0, import_react.useRef)({
		didLogIdAndOrderWarning: false,
		didLogPanelConstraintsWarning: false,
		prevPanelIds: []
	});
	(0, import_react.useImperativeHandle)(forwardedRef, () => ({
		getId: () => committedValuesRef.current.id,
		getLayout: () => {
			const { layout } = eagerValuesRef.current;
			return layout;
		},
		setLayout: (unsafeLayout) => {
			const { onLayout } = committedValuesRef.current;
			const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
			const safeLayout = validatePanelGroupLayout({
				layout: unsafeLayout,
				panelConstraints: panelDataArray.map((panelData) => panelData.constraints)
			});
			if (!areEqual(prevLayout, safeLayout)) {
				setLayout(safeLayout);
				eagerValuesRef.current.layout = safeLayout;
				if (onLayout) onLayout(safeLayout);
				callPanelCallbacks(panelDataArray, safeLayout, panelIdToLastNotifiedSizeMapRef.current);
			}
		}
	}), []);
	useIsomorphicLayoutEffect(() => {
		committedValuesRef.current.autoSaveId = autoSaveId;
		committedValuesRef.current.direction = direction;
		committedValuesRef.current.dragState = dragState;
		committedValuesRef.current.id = groupId;
		committedValuesRef.current.onLayout = onLayout;
		committedValuesRef.current.storage = storage;
	});
	useWindowSplitterPanelGroupBehavior({
		committedValuesRef,
		eagerValuesRef,
		groupId,
		layout,
		panelDataArray: eagerValuesRef.current.panelDataArray,
		setLayout,
		panelGroupElement: panelGroupElementRef.current
	});
	(0, import_react.useEffect)(() => {
		const { panelDataArray } = eagerValuesRef.current;
		if (autoSaveId) {
			if (layout.length === 0 || layout.length !== panelDataArray.length) return;
			let debouncedSave = debounceMap[autoSaveId];
			if (debouncedSave == null) {
				debouncedSave = debounce(savePanelGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);
				debounceMap[autoSaveId] = debouncedSave;
			}
			const clonedPanelDataArray = [...panelDataArray];
			const clonedPanelSizesBeforeCollapse = new Map(panelSizeBeforeCollapseRef.current);
			debouncedSave(autoSaveId, clonedPanelDataArray, clonedPanelSizesBeforeCollapse, layout, storage);
		}
	}, [
		autoSaveId,
		layout,
		storage
	]);
	(0, import_react.useEffect)(() => {});
	const collapsePanel = (0, import_react.useCallback)((panelData) => {
		const { onLayout } = committedValuesRef.current;
		const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
		if (panelData.constraints.collapsible) {
			const panelConstraintsArray = panelDataArray.map((panelData) => panelData.constraints);
			const { collapsedSize = 0, panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
			assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
			if (!fuzzyNumbersEqual$1(panelSize, collapsedSize)) {
				panelSizeBeforeCollapseRef.current.set(panelData.id, panelSize);
				const nextLayout = adjustLayoutByDelta({
					delta: findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1 ? panelSize - collapsedSize : collapsedSize - panelSize,
					initialLayout: prevLayout,
					panelConstraints: panelConstraintsArray,
					pivotIndices,
					prevLayout,
					trigger: "imperative-api"
				});
				if (!compareLayouts(prevLayout, nextLayout)) {
					setLayout(nextLayout);
					eagerValuesRef.current.layout = nextLayout;
					if (onLayout) onLayout(nextLayout);
					callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
				}
			}
		}
	}, []);
	const expandPanel = (0, import_react.useCallback)((panelData, minSizeOverride) => {
		const { onLayout } = committedValuesRef.current;
		const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
		if (panelData.constraints.collapsible) {
			const panelConstraintsArray = panelDataArray.map((panelData) => panelData.constraints);
			const { collapsedSize = 0, panelSize = 0, minSize: minSizeFromProps = 0, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
			const minSize = minSizeOverride !== null && minSizeOverride !== void 0 ? minSizeOverride : minSizeFromProps;
			if (fuzzyNumbersEqual$1(panelSize, collapsedSize)) {
				const prevPanelSize = panelSizeBeforeCollapseRef.current.get(panelData.id);
				const baseSize = prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
				const nextLayout = adjustLayoutByDelta({
					delta: findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1 ? panelSize - baseSize : baseSize - panelSize,
					initialLayout: prevLayout,
					panelConstraints: panelConstraintsArray,
					pivotIndices,
					prevLayout,
					trigger: "imperative-api"
				});
				if (!compareLayouts(prevLayout, nextLayout)) {
					setLayout(nextLayout);
					eagerValuesRef.current.layout = nextLayout;
					if (onLayout) onLayout(nextLayout);
					callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
				}
			}
		}
	}, []);
	const getPanelSize = (0, import_react.useCallback)((panelData) => {
		const { layout, panelDataArray } = eagerValuesRef.current;
		const { panelSize } = panelDataHelper(panelDataArray, panelData, layout);
		assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
		return panelSize;
	}, []);
	const getPanelStyle = (0, import_react.useCallback)((panelData, defaultSize) => {
		const { panelDataArray } = eagerValuesRef.current;
		return computePanelFlexBoxStyle({
			defaultSize,
			dragState,
			layout,
			panelData: panelDataArray,
			panelIndex: findPanelDataIndex(panelDataArray, panelData)
		});
	}, [dragState, layout]);
	const isPanelCollapsed = (0, import_react.useCallback)((panelData) => {
		const { layout, panelDataArray } = eagerValuesRef.current;
		const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panelDataArray, panelData, layout);
		assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
		return collapsible === true && fuzzyNumbersEqual$1(panelSize, collapsedSize);
	}, []);
	const isPanelExpanded = (0, import_react.useCallback)((panelData) => {
		const { layout, panelDataArray } = eagerValuesRef.current;
		const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panelDataArray, panelData, layout);
		assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
		return !collapsible || fuzzyCompareNumbers(panelSize, collapsedSize) > 0;
	}, []);
	const registerPanel = (0, import_react.useCallback)((panelData) => {
		const { panelDataArray } = eagerValuesRef.current;
		panelDataArray.push(panelData);
		panelDataArray.sort((panelA, panelB) => {
			const orderA = panelA.order;
			const orderB = panelB.order;
			if (orderA == null && orderB == null) return 0;
			else if (orderA == null) return -1;
			else if (orderB == null) return 1;
			else return orderA - orderB;
		});
		eagerValuesRef.current.panelDataArrayChanged = true;
		forceUpdate();
	}, [forceUpdate]);
	useIsomorphicLayoutEffect(() => {
		if (eagerValuesRef.current.panelDataArrayChanged) {
			eagerValuesRef.current.panelDataArrayChanged = false;
			const { autoSaveId, onLayout, storage } = committedValuesRef.current;
			const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
			let unsafeLayout = null;
			if (autoSaveId) {
				const state = loadPanelGroupState(autoSaveId, panelDataArray, storage);
				if (state) {
					panelSizeBeforeCollapseRef.current = new Map(Object.entries(state.expandToSizes));
					unsafeLayout = state.layout;
				}
			}
			if (unsafeLayout == null) unsafeLayout = calculateUnsafeDefaultLayout({ panelDataArray });
			const nextLayout = validatePanelGroupLayout({
				layout: unsafeLayout,
				panelConstraints: panelDataArray.map((panelData) => panelData.constraints)
			});
			if (!areEqual(prevLayout, nextLayout)) {
				setLayout(nextLayout);
				eagerValuesRef.current.layout = nextLayout;
				if (onLayout) onLayout(nextLayout);
				callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
			}
		}
	});
	useIsomorphicLayoutEffect(() => {
		const eagerValues = eagerValuesRef.current;
		return () => {
			eagerValues.layout = [];
		};
	}, []);
	const registerResizeHandle = (0, import_react.useCallback)((dragHandleId) => {
		let isRTL = false;
		const panelGroupElement = panelGroupElementRef.current;
		if (panelGroupElement) {
			if (window.getComputedStyle(panelGroupElement, null).getPropertyValue("direction") === "rtl") isRTL = true;
		}
		return function resizeHandler(event) {
			event.preventDefault();
			const panelGroupElement = panelGroupElementRef.current;
			if (!panelGroupElement) return () => null;
			const { direction, dragState, id: groupId, keyboardResizeBy, onLayout } = committedValuesRef.current;
			const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
			const { initialLayout } = dragState !== null && dragState !== void 0 ? dragState : {};
			const pivotIndices = determinePivotIndices(groupId, dragHandleId, panelGroupElement);
			let delta = calculateDeltaPercentage(event, dragHandleId, direction, dragState, keyboardResizeBy, panelGroupElement);
			const isHorizontal = direction === "horizontal";
			if (isHorizontal && isRTL) delta = -delta;
			const panelConstraints = panelDataArray.map((panelData) => panelData.constraints);
			const nextLayout = adjustLayoutByDelta({
				delta,
				initialLayout: initialLayout !== null && initialLayout !== void 0 ? initialLayout : prevLayout,
				panelConstraints,
				pivotIndices,
				prevLayout,
				trigger: isKeyDown(event) ? "keyboard" : "mouse-or-touch"
			});
			const layoutChanged = !compareLayouts(prevLayout, nextLayout);
			if (isPointerEvent(event) || isMouseEvent(event)) {
				if (prevDeltaRef.current != delta) {
					prevDeltaRef.current = delta;
					if (!layoutChanged && delta !== 0) if (isHorizontal) reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_HORIZONTAL_MIN : EXCEEDED_HORIZONTAL_MAX);
					else reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_VERTICAL_MIN : EXCEEDED_VERTICAL_MAX);
					else reportConstraintsViolation(dragHandleId, 0);
				}
			}
			if (layoutChanged) {
				setLayout(nextLayout);
				eagerValuesRef.current.layout = nextLayout;
				if (onLayout) onLayout(nextLayout);
				callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
			}
		};
	}, []);
	const resizePanel = (0, import_react.useCallback)((panelData, unsafePanelSize) => {
		const { onLayout } = committedValuesRef.current;
		const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
		const panelConstraintsArray = panelDataArray.map((panelData) => panelData.constraints);
		const { panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
		assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
		const nextLayout = adjustLayoutByDelta({
			delta: findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1 ? panelSize - unsafePanelSize : unsafePanelSize - panelSize,
			initialLayout: prevLayout,
			panelConstraints: panelConstraintsArray,
			pivotIndices,
			prevLayout,
			trigger: "imperative-api"
		});
		if (!compareLayouts(prevLayout, nextLayout)) {
			setLayout(nextLayout);
			eagerValuesRef.current.layout = nextLayout;
			if (onLayout) onLayout(nextLayout);
			callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
		}
	}, []);
	const reevaluatePanelConstraints = (0, import_react.useCallback)((panelData, prevConstraints) => {
		const { layout, panelDataArray } = eagerValuesRef.current;
		const { collapsedSize: prevCollapsedSize = 0, collapsible: prevCollapsible } = prevConstraints;
		const { collapsedSize: nextCollapsedSize = 0, collapsible: nextCollapsible, maxSize: nextMaxSize = 100, minSize: nextMinSize = 0 } = panelData.constraints;
		const { panelSize: prevPanelSize } = panelDataHelper(panelDataArray, panelData, layout);
		if (prevPanelSize == null) return;
		if (prevCollapsible && nextCollapsible && fuzzyNumbersEqual$1(prevPanelSize, prevCollapsedSize)) {
			if (!fuzzyNumbersEqual$1(prevCollapsedSize, nextCollapsedSize)) resizePanel(panelData, nextCollapsedSize);
		} else if (prevPanelSize < nextMinSize) resizePanel(panelData, nextMinSize);
		else if (prevPanelSize > nextMaxSize) resizePanel(panelData, nextMaxSize);
	}, [resizePanel]);
	const startDragging = (0, import_react.useCallback)((dragHandleId, event) => {
		const { direction } = committedValuesRef.current;
		const { layout } = eagerValuesRef.current;
		if (!panelGroupElementRef.current) return;
		const handleElement = getResizeHandleElement(dragHandleId, panelGroupElementRef.current);
		assert(handleElement, `Drag handle element not found for id "${dragHandleId}"`);
		const initialCursorPosition = getResizeEventCursorPosition(direction, event);
		setDragState({
			dragHandleId,
			dragHandleRect: handleElement.getBoundingClientRect(),
			initialCursorPosition,
			initialLayout: layout
		});
	}, []);
	const stopDragging = (0, import_react.useCallback)(() => {
		setDragState(null);
	}, []);
	const unregisterPanel = (0, import_react.useCallback)((panelData) => {
		const { panelDataArray } = eagerValuesRef.current;
		const index = findPanelDataIndex(panelDataArray, panelData);
		if (index >= 0) {
			panelDataArray.splice(index, 1);
			delete panelIdToLastNotifiedSizeMapRef.current[panelData.id];
			eagerValuesRef.current.panelDataArrayChanged = true;
			forceUpdate();
		}
	}, [forceUpdate]);
	const context = (0, import_react.useMemo)(() => ({
		collapsePanel,
		direction,
		dragState,
		expandPanel,
		getPanelSize,
		getPanelStyle,
		groupId,
		isPanelCollapsed,
		isPanelExpanded,
		reevaluatePanelConstraints,
		registerPanel,
		registerResizeHandle,
		resizePanel,
		startDragging,
		stopDragging,
		unregisterPanel,
		panelGroupElement: panelGroupElementRef.current
	}), [
		collapsePanel,
		dragState,
		direction,
		expandPanel,
		getPanelSize,
		getPanelStyle,
		groupId,
		isPanelCollapsed,
		isPanelExpanded,
		reevaluatePanelConstraints,
		registerPanel,
		registerResizeHandle,
		resizePanel,
		startDragging,
		stopDragging,
		unregisterPanel
	]);
	const style = {
		display: "flex",
		flexDirection: direction === "horizontal" ? "row" : "column",
		height: "100%",
		overflow: "hidden",
		width: "100%"
	};
	return (0, import_react.createElement)(PanelGroupContext.Provider, { value: context }, (0, import_react.createElement)(Type, {
		...rest,
		children,
		className: classNameFromProps,
		id: idFromProps,
		ref: panelGroupElementRef,
		style: {
			...style,
			...styleFromProps
		},
		[DATA_ATTRIBUTES.group]: "",
		[DATA_ATTRIBUTES.groupDirection]: direction,
		[DATA_ATTRIBUTES.groupId]: groupId
	}));
}
var PanelGroup = (0, import_react.forwardRef)((props, ref) => (0, import_react.createElement)(PanelGroupWithForwardedRef, {
	...props,
	forwardedRef: ref
}));
PanelGroupWithForwardedRef.displayName = "PanelGroup";
PanelGroup.displayName = "forwardRef(PanelGroup)";
function findPanelDataIndex(panelDataArray, panelData) {
	return panelDataArray.findIndex((prevPanelData) => prevPanelData === panelData || prevPanelData.id === panelData.id);
}
function panelDataHelper(panelDataArray, panelData, layout) {
	const panelIndex = findPanelDataIndex(panelDataArray, panelData);
	const pivotIndices = panelIndex === panelDataArray.length - 1 ? [panelIndex - 1, panelIndex] : [panelIndex, panelIndex + 1];
	const panelSize = layout[panelIndex];
	return {
		...panelData.constraints,
		panelSize,
		pivotIndices
	};
}
function useWindowSplitterResizeHandlerBehavior({ disabled, handleId, resizeHandler, panelGroupElement }) {
	(0, import_react.useEffect)(() => {
		if (disabled || resizeHandler == null || panelGroupElement == null) return;
		const handleElement = getResizeHandleElement(handleId, panelGroupElement);
		if (handleElement == null) return;
		const onKeyDown = (event) => {
			if (event.defaultPrevented) return;
			switch (event.key) {
				case "ArrowDown":
				case "ArrowLeft":
				case "ArrowRight":
				case "ArrowUp":
				case "End":
				case "Home":
					event.preventDefault();
					resizeHandler(event);
					break;
				case "F6": {
					event.preventDefault();
					const groupId = handleElement.getAttribute(DATA_ATTRIBUTES.groupId);
					assert(groupId, `No group element found for id "${groupId}"`);
					const handles = getResizeHandleElementsForGroup(groupId, panelGroupElement);
					const index = getResizeHandleElementIndex(groupId, handleId, panelGroupElement);
					assert(index !== null, `No resize element found for id "${handleId}"`);
					handles[event.shiftKey ? index > 0 ? index - 1 : handles.length - 1 : index + 1 < handles.length ? index + 1 : 0].focus();
					break;
				}
			}
		};
		handleElement.addEventListener("keydown", onKeyDown);
		return () => {
			handleElement.removeEventListener("keydown", onKeyDown);
		};
	}, [
		panelGroupElement,
		disabled,
		handleId,
		resizeHandler
	]);
}
function PanelResizeHandle({ children = null, className: classNameFromProps = "", disabled = false, hitAreaMargins, id: idFromProps, onBlur, onClick, onDragging, onFocus, onPointerDown, onPointerUp, style: styleFromProps = {}, tabIndex = 0, tagName: Type = "div", ...rest }) {
	var _hitAreaMargins$coars, _hitAreaMargins$fine;
	const elementRef = (0, import_react.useRef)(null);
	const callbacksRef = (0, import_react.useRef)({
		onClick,
		onDragging,
		onPointerDown,
		onPointerUp
	});
	(0, import_react.useEffect)(() => {
		callbacksRef.current.onClick = onClick;
		callbacksRef.current.onDragging = onDragging;
		callbacksRef.current.onPointerDown = onPointerDown;
		callbacksRef.current.onPointerUp = onPointerUp;
	});
	const panelGroupContext = (0, import_react.useContext)(PanelGroupContext);
	if (panelGroupContext === null) throw Error(`PanelResizeHandle components must be rendered within a PanelGroup container`);
	const { direction, groupId, registerResizeHandle: registerResizeHandleWithParentGroup, startDragging, stopDragging, panelGroupElement } = panelGroupContext;
	const resizeHandleId = useUniqueId(idFromProps);
	const [state, setState] = (0, import_react.useState)("inactive");
	const [isFocused, setIsFocused] = (0, import_react.useState)(false);
	const [resizeHandler, setResizeHandler] = (0, import_react.useState)(null);
	const committedValuesRef = (0, import_react.useRef)({ state });
	useIsomorphicLayoutEffect(() => {
		committedValuesRef.current.state = state;
	});
	(0, import_react.useEffect)(() => {
		if (disabled) setResizeHandler(null);
		else {
			const resizeHandler = registerResizeHandleWithParentGroup(resizeHandleId);
			setResizeHandler(() => resizeHandler);
		}
	}, [
		disabled,
		resizeHandleId,
		registerResizeHandleWithParentGroup
	]);
	const coarseHitAreaMargins = (_hitAreaMargins$coars = hitAreaMargins === null || hitAreaMargins === void 0 ? void 0 : hitAreaMargins.coarse) !== null && _hitAreaMargins$coars !== void 0 ? _hitAreaMargins$coars : 15;
	const fineHitAreaMargins = (_hitAreaMargins$fine = hitAreaMargins === null || hitAreaMargins === void 0 ? void 0 : hitAreaMargins.fine) !== null && _hitAreaMargins$fine !== void 0 ? _hitAreaMargins$fine : 5;
	(0, import_react.useEffect)(() => {
		if (disabled || resizeHandler == null) return;
		const element = elementRef.current;
		assert(element, "Element ref not attached");
		let didMove = false;
		const setResizeHandlerState = (action, isActive, event) => {
			if (!isActive) {
				setState("inactive");
				return;
			}
			switch (action) {
				case "down": {
					setState("drag");
					didMove = false;
					assert(event, "Expected event to be defined for \"down\" action");
					startDragging(resizeHandleId, event);
					const { onDragging, onPointerDown } = callbacksRef.current;
					onDragging === null || onDragging === void 0 || onDragging(true);
					onPointerDown === null || onPointerDown === void 0 || onPointerDown();
					break;
				}
				case "move": {
					const { state } = committedValuesRef.current;
					didMove = true;
					if (state !== "drag") setState("hover");
					assert(event, "Expected event to be defined for \"move\" action");
					resizeHandler(event);
					break;
				}
				case "up": {
					setState("hover");
					stopDragging();
					const { onClick, onDragging, onPointerUp } = callbacksRef.current;
					onDragging === null || onDragging === void 0 || onDragging(false);
					onPointerUp === null || onPointerUp === void 0 || onPointerUp();
					if (!didMove) onClick === null || onClick === void 0 || onClick();
					break;
				}
			}
		};
		return registerResizeHandle(resizeHandleId, element, direction, {
			coarse: coarseHitAreaMargins,
			fine: fineHitAreaMargins
		}, setResizeHandlerState);
	}, [
		coarseHitAreaMargins,
		direction,
		disabled,
		fineHitAreaMargins,
		registerResizeHandleWithParentGroup,
		resizeHandleId,
		resizeHandler,
		startDragging,
		stopDragging
	]);
	useWindowSplitterResizeHandlerBehavior({
		disabled,
		handleId: resizeHandleId,
		resizeHandler,
		panelGroupElement
	});
	const style = {
		touchAction: "none",
		userSelect: "none"
	};
	return (0, import_react.createElement)(Type, {
		...rest,
		children,
		className: classNameFromProps,
		id: idFromProps,
		onBlur: () => {
			setIsFocused(false);
			onBlur === null || onBlur === void 0 || onBlur();
		},
		onFocus: () => {
			setIsFocused(true);
			onFocus === null || onFocus === void 0 || onFocus();
		},
		ref: elementRef,
		role: "separator",
		style: {
			...style,
			...styleFromProps
		},
		tabIndex,
		[DATA_ATTRIBUTES.groupDirection]: direction,
		[DATA_ATTRIBUTES.groupId]: groupId,
		[DATA_ATTRIBUTES.resizeHandle]: "",
		[DATA_ATTRIBUTES.resizeHandleActive]: state === "drag" ? "pointer" : isFocused ? "keyboard" : void 0,
		[DATA_ATTRIBUTES.resizeHandleEnabled]: !disabled,
		[DATA_ATTRIBUTES.resizeHandleId]: resizeHandleId,
		[DATA_ATTRIBUTES.resizeHandleState]: state
	});
}
PanelResizeHandle.displayName = "PanelResizeHandle";
//#endregion
//#region app/components/TradingViewChart.tsx
var import_jsx_runtime = require_jsx_runtime();
var scriptPromise = null;
function loadTradingView() {
	if (window.TradingView) return Promise.resolve();
	if (scriptPromise) return scriptPromise;
	scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = "https://s3.tradingview.com/tv.js";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(/* @__PURE__ */ new Error("TradingView failed to load"));
		document.head.appendChild(script);
	});
	return scriptPromise;
}
function TradingViewChart({ symbol }) {
	const containerId = `propfirm-tv-${(0, import_react.useId)().replace(/:/g, "")}`;
	const containerRef = (0, import_react.useRef)(null);
	const widgetRef = (0, import_react.useRef)(null);
	const [theme, setTheme] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "dark";
		const saved = window.localStorage.getItem("propfirm-theme");
		return saved === "light" || saved === "other" ? saved : "dark";
	});
	const [loadFailed, setLoadFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onThemeChange = (event) => {
			setTheme(event.detail);
		};
		window.addEventListener("propfirm-theme-change", onThemeChange);
		return () => window.removeEventListener("propfirm-theme-change", onThemeChange);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const container = containerRef.current;
		if (!container) return;
		container.innerHTML = "";
		setLoadFailed(false);
		loadTradingView().then(() => {
			if (cancelled || !window.TradingView || !document.getElementById(containerId)) return;
			widgetRef.current = new window.TradingView.widget({
				autosize: true,
				symbol: `BINANCE:${symbol}USDT`,
				interval: "15",
				timezone: "Etc/UTC",
				theme: theme === "light" ? "light" : "dark",
				style: "1",
				locale: "en",
				toolbar_bg: theme === "light" ? "#ffffff" : theme === "other" ? "#10111c" : "#0f0f0f",
				enable_publishing: false,
				allow_symbol_change: false,
				save_image: false,
				calendar: false,
				hide_top_toolbar: false,
				hide_legend: false,
				hide_side_toolbar: false,
				studies: ["Volume@tv-basicstudies"],
				container_id: containerId
			});
		}).catch(() => {
			if (!cancelled) setLoadFailed(true);
		});
		return () => {
			cancelled = true;
			try {
				widgetRef.current?.remove?.();
			} catch {}
			widgetRef.current = null;
		};
	}, [
		containerId,
		symbol,
		theme
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tradingview-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			id: containerId,
			className: "tradingview-chart"
		}), loadFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "chart-load-error",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "TradingView chart unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Check your internet connection and refresh the page." })]
		})]
	});
}
//#endregion
//#region app/trade/page.tsx
var markets = [
	{
		symbol: "BI2X",
		pair: "BI2X-BI2XUSD",
		quote: "BI2XUSD",
		chartSymbol: "BTC",
		price: "68,412.50",
		change: "+2.84%",
		up: true
	},
	{
		symbol: "ETH",
		pair: "ETH / BIUSDB",
		quote: "BIUSDB",
		chartSymbol: "ETH",
		price: "3,746.28",
		change: "+1.37%",
		up: true
	},
	{
		symbol: "SOL",
		pair: "SOL / BIUSDB",
		quote: "BIUSDB",
		chartSymbol: "SOL",
		price: "181.42",
		change: "+4.16%",
		up: true
	},
	{
		symbol: "BNB",
		pair: "BNB / BIUSDB",
		quote: "BIUSDB",
		chartSymbol: "BNB",
		price: "612.05",
		change: "-0.82%",
		up: false
	},
	{
		symbol: "LINK",
		pair: "LINK / BIUSDB",
		quote: "BIUSDB",
		chartSymbol: "LINK",
		price: "17.65",
		change: "+0.48%",
		up: true
	}
];
var asks = [
	[
		"68,454.70",
		"0.318",
		"21,772"
	],
	[
		"68,447.60",
		"0.192",
		"13,141"
	],
	[
		"68,438.20",
		"0.284",
		"19,440"
	],
	[
		"68,429.80",
		"0.176",
		"12,043"
	],
	[
		"68,421.10",
		"0.391",
		"26,751"
	],
	[
		"68,415.30",
		"0.227",
		"15,530"
	]
];
var bids = [
	[
		"68,407.90",
		"0.251",
		"17,171"
	],
	[
		"68,399.40",
		"0.438",
		"29,959"
	],
	[
		"68,390.80",
		"0.195",
		"13,336"
	],
	[
		"68,384.20",
		"0.342",
		"23,387"
	],
	[
		"68,375.60",
		"0.163",
		"11,145"
	],
	[
		"68,368.10",
		"0.276",
		"18,872"
	]
];
function TradePage() {
	const [marketMode, setMarketMode] = (0, import_react.useState)("futures");
	const [side, setSide] = (0, import_react.useState)("buy");
	const [orderType, setOrderType] = (0, import_react.useState)("limit");
	const [market, setMarket] = (0, import_react.useState)(markets[0]);
	const [size, setSize] = (0, import_react.useState)(25);
	const [positionTab, setPositionTab] = (0, import_react.useState)("Positions");
	const [bookTab, setBookTab] = (0, import_react.useState)("Order Book");
	const [notice, setNotice] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [rulesOpen, setRulesOpen] = (0, import_react.useState)(false);
	const [tpSlEnabled, setTpSlEnabled] = (0, import_react.useState)(false);
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const [orderValue, setOrderValue] = (0, import_react.useState)("1000.00");
	const [limitPrice, setLimitPrice] = (0, import_react.useState)(markets[0].price.replace(",", ""));
	const [openOrders, setOpenOrders] = (0, import_react.useState)([]);
	const filteredMarkets = markets.filter((item) => item.pair.toLowerCase().includes(query.trim().toLowerCase()));
	const margin = (0, import_react.useMemo)(() => {
		const selectedValue = (Number(orderValue.replace(/,/g, "")) || 0) * size / 100;
		return (marketMode === "futures" ? selectedValue / 5 : selectedValue).toFixed(2);
	}, [
		marketMode,
		orderValue,
		size
	]);
	function changeMarketMode(nextMode) {
		setMarketMode(nextMode);
		setPositionTab(nextMode === "spot" ? "Holdings" : "Positions");
	}
	function placeDemoOrder() {
		setOpenOrders((orders) => [{
			id: Date.now(),
			market: market.pair,
			mode: marketMode,
			side: side.toUpperCase(),
			type: orderType.toUpperCase(),
			value: orderValue,
			status: "Awaiting backend"
		}, ...orders]);
		setPositionTab("Open Orders");
		setNotice(`Demo ${marketMode} ${side} order prepared. The PropFirm backend must approve a real order.`);
		window.setTimeout(() => setNotice(""), 3500);
	}
	function selectMarket(item) {
		setMarket(item);
		setLimitPrice(item.price.replace(",", ""));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropShell, {
		active: "trade",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "trade-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "instrument-strip",
					"aria-label": "Selected market and account status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "instrument-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "asset-icon instrument-icon",
								children: market.symbol.slice(0, 3)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: market.pair }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								market.symbol,
								" / ",
								market.quote,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: marketMode === "spot" ? "SPOT" : "FUTURES" })
							] })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "instrument-price",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: market.price }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: market.up ? "positive" : "negative",
								children: [market.change, " today"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "instrument-stat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "24H HIGH" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "69,124.80" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "instrument-stat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "24H LOW" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "65,907.30" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "instrument-stat",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ACCOUNT" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2-Step Challenge" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Challenge 1 of 2" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "instrument-stat",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MAX LEVERAGE" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "5x" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Server enforced" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "instrument-stat",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STATUS" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "positive",
									children: "Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "5x maximum leverage" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "rule-toggle",
							onClick: () => setRulesOpen((value) => !value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
								" Account Rules ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
							]
						})
					]
				}),
				rulesOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rules-panel",
					"aria-label": "2-Step Challenge rules",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rules-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2-Step Challenge rules" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setRulesOpen(false),
								"aria-label": "Close account rules",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 17 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rules-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CHALLENGE 1 LOSS LIMIT" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Not confirmed" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Original 10% / 8% note is ambiguous" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CHALLENGE 2 LOSS LIMIT" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Not confirmed" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Must be confirmed before enforcement" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FUNDED DAILY LOSS" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "5%" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Confirmed supplied rule" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FUNDED TOTAL LOSS" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "8%" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Confirmed supplied rule" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MAXIMUM LEVERAGE" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "5x" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Applies to every account" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PROFIT TARGET" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Not provided" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No target is assumed" })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { size: 14 }), " Evaluation limits remain informational until the business requirement is confirmed. The backend must calculate and enforce all final rules."] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "metrics-strip",
					"aria-label": "PropFirm risk metrics",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "metric",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STARTING BALANCE" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$10,000.00" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Challenge allocation" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "metric",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CURRENT BALANCE" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$10,240.00" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "positive",
									children: "+$240.00 closed PnL"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "metric",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CURRENT EQUITY" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$10,186.42" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Includes open PnL" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "metric",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DAILY LOSS USED" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$146" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Challenge limit not confirmed" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "metric",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TOTAL LOSS USED" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$214" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Challenge limit not confirmed" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGroup, {
					direction: "horizontal",
					className: "terminal-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							defaultSize: 14,
							minSize: 10,
							maxSize: 24,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
								className: "panel market-panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "panel-title",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Markets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-label": "Market settings",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { size: 16 })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "market-search",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											"aria-label": "Search markets",
											placeholder: "Search markets",
											value: query,
											onChange: (event) => setQuery(event.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "asset-category-tabs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "active",
												children: "Crypto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												disabled: true,
												title: "Supported Forex markets are not confirmed",
												children: "Forex"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												disabled: true,
												title: "Supported stock markets are not confirmed",
												children: "Stocks"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "market-tabs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: marketMode === "spot" ? "active" : "",
											onClick: () => changeMarketMode("spot"),
											children: "Spot"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: marketMode === "futures" ? "active" : "",
											onClick: () => changeMarketMode("futures"),
											children: "Futures"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "market-list-head",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pair" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Price / 24h" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "market-list",
										children: [filteredMarkets.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: market.symbol === item.symbol ? "market-row selected" : "market-row",
											onClick: () => selectMarket(item),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 13 }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.symbol }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: marketMode === "spot" ? "Spot" : "Perpetual" })] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "market-price",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.price }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
														className: item.up ? "positive" : "negative",
														children: item.change
													})]
												})
											]
										}, item.symbol)), filteredMarkets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "market-empty",
											children: "No matching markets"
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelResizeHandle, {
							className: "panel-resize-handle",
							"aria-label": "Resize markets and chart",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							defaultSize: 69,
							minSize: 44,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "terminal-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "panel chart-panel",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "chart-titlebar",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TRADINGVIEW CHART" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live market data" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TradingViewChart, { symbol: market.chartSymbol })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "panel positions-panel",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "position-tabs",
										children: [(marketMode === "spot" ? [
											"Holdings",
											"Open Orders",
											"Trade History",
											"Rule Activity"
										] : [
											"Positions",
											"Open Orders",
											"Trade History",
											"Rule Activity"
										]).map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: positionTab === tab ? "active" : "",
											onClick: () => setPositionTab(tab),
											children: [tab, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab === "Positions" || tab === "Holdings" ? "1" : tab === "Open Orders" ? String(openOrders.length) : "" })]
										}, tab)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "total-pnl",
											children: ["Total PnL: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "+$240.00" })]
										})]
									}), marketMode === "futures" && positionTab === "Positions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "table-scroll",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Market" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Side" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Size" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Entry" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Mark" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Margin" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Unrealized PnL" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action" })
										] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "BI2X-BI2XUSD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Perpetual · 5x" })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "status-chip long",
												children: "Long"
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "0.018 BI2X" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "67,914.20" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "68,412.50" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "$244.49" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "positive",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "+$8.97" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "+3.67%" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "close-button",
												children: "Close"
											}) })
										] }) })] })
									}) : marketMode === "spot" && positionTab === "Holdings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "table-scroll",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Asset" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Available" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "In Orders" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Average Price" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current Value" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total PnL" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action" })
										] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "BI2X" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "BI2XUSD spot" })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "0.018 BI2X" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "0.000 BI2X" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "67,914.20" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "$1,231.43" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "positive",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "+$8.97" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "+0.73%" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "close-button",
												onClick: () => setSide("sell"),
												children: "Sell"
											}) })
										] }) })] })
									}) : positionTab === "Open Orders" && openOrders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "table-scroll",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Market" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Mode" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Side" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Type" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Order Value" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action" })
										] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: openOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.market }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Frontend request" })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: order.mode }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: order.side === "BUY" ? "positive" : "negative",
												children: order.side
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: order.type }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [order.value, " BI2XUSD"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: order.status }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "close-button",
												onClick: () => setOpenOrders((orders) => orders.filter((item) => item.id !== order.id)),
												children: "Cancel"
											}) })
										] }, order.id)) })] })
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "empty-state",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 22 }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["No ", positionTab.toLowerCase()] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Your ",
												positionTab.toLowerCase(),
												" will appear here."
											] })
										]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelResizeHandle, {
							className: "panel-resize-handle",
							"aria-label": "Resize chart and order entry",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							defaultSize: 17,
							minSize: 15,
							maxSize: 30,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGroup, {
								direction: "vertical",
								className: "terminal-right",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
										defaultSize: 58,
										minSize: 38,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
											className: "panel order-panel",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "product-tabs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															className: marketMode === "spot" ? "active" : "",
															onClick: () => changeMarketMode("spot"),
															children: "Spot"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															className: marketMode === "futures" ? "active" : "",
															onClick: () => changeMarketMode("futures"),
															children: "Futures"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															disabled: true,
															children: "Options"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "side-tabs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														className: side === "buy" ? "buy active" : "",
														onClick: () => setSide("buy"),
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 15 }),
															" ",
															marketMode === "spot" ? "Buy" : "Buy / Long"
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														className: side === "sell" ? "sell active" : "",
														onClick: () => setSide("sell"),
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { size: 15 }),
															" ",
															marketMode === "spot" ? "Sell" : "Sell / Short"
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "order-type-tabs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															className: orderType === "market" ? "active" : "",
															onClick: () => setOrderType("market"),
															children: "Market"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															className: orderType === "limit" ? "active" : "",
															onClick: () => setOrderType("limit"),
															children: "Limit"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															className: moreOpen ? "active" : "",
															onClick: () => setMoreOpen((value) => !value),
															children: ["More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 12 })]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "order-balance",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: marketMode === "spot" ? side === "buy" ? "Available BI2XUSD" : "Available BI2X" : "Available margin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: marketMode === "spot" && side === "sell" ? "0.018 BI2X" : marketMode === "spot" ? "$10,240.00" : "$8,420.18" })]
												}),
												marketMode === "futures" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "order-inline",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { children: ["Isolated ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														title: "Leverage is capped for every PropFirm account",
														children: "5x max"
													})]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "spot-mode-note",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Spot · 1x" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No leverage or liquidation price" })]
												}),
												moreOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "advanced-options",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "checkbox",
														disabled: marketMode === "spot"
													}), " Reduce only"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Slippage tolerance ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0.50%" })] })]
												}),
												orderType === "limit" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "trade-field",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Limit price" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														inputMode: "decimal",
														value: limitPrice,
														onChange: (event) => setLimitPrice(event.target.value)
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: market.quote })] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "trade-field",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Order value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														inputMode: "decimal",
														value: orderValue,
														onChange: (event) => setOrderValue(event.target.value)
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: market.quote })] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "size-slider",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "range",
														min: "0",
														max: "100",
														value: size,
														onChange: (event) => setSize(Number(event.target.value))
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0%" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "25%" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "50%" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "75%" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100%" })
													] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "order-summary",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selected size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [size, "%"] })] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: marketMode === "spot" ? "Order amount" : "Required margin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["$", margin] })] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Leverage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: marketMode === "spot" ? "1x" : "5x max" })] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Estimated fee" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$0.50" })] })
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "check-row",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "checkbox",
														checked: tpSlEnabled,
														onChange: (event) => setTpSlEnabled(event.target.checked)
													}), " Take profit / Stop loss"]
												}),
												tpSlEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "tp-sl-grid",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "trade-field",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Take profit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															inputMode: "decimal",
															placeholder: "Price"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: market.quote })] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "trade-field",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Stop loss" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															inputMode: "decimal",
															placeholder: "Price"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: market.quote })] })]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													className: side === "buy" ? "submit-order buy" : "submit-order sell",
													onClick: placeDemoOrder,
													children: [side === "buy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { size: 18 }), side === "buy" ? `Buy ${market.symbol}` : `Sell ${market.symbol}`]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "order-disclaimer",
													children: "The server must check account status, margin, leverage, and rule limits before executing a real trade."
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelResizeHandle, {
										className: "panel-resize-handle panel-resize-handle-row",
										"aria-label": "Resize order form and order book",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
										defaultSize: 42,
										minSize: 24,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
											className: "panel orderbook-panel",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "book-tabs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: bookTab === "Order Book" ? "active" : "",
														onClick: () => setBookTab("Order Book"),
														children: "Order Book"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: bookTab === "Trades" ? "active" : "",
														onClick: () => setBookTab("Trades"),
														children: "Trades"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DEMO" })
												]
											}), bookTab === "Order Book" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "book-head",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PRICE" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SIZE" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TOTAL" })
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "book-rows",
													children: asks.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "ask",
														children: row.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value }, value))
													}, row[0]))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "spread-row",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: market.price }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Spread 0.012%" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "book-rows",
													children: bids.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bid",
														children: row.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value }, value))
													}, row[0]))
												})
											] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "empty-state",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 20 }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No recent demo trades" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live trades will come from the market data service." })
												]
											})]
										})
									})
								]
							})
						})
					]
				})
			]
		}), notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "toast",
			children: notice
		})]
	});
}
//#endregion
export { TradePage as default };
