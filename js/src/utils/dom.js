import objectEach from 'utils/objectEach';


export default {

	/**
	 * Shortuct for document.getElementById().
	 *
	 * @param string Element id.
	 * @return Node
	 */
	id: (id) => (
		document.getElementById(id)
	),

	/**
	 * Shortcut for document|element.querySelector()
	 *
	 * If called with one parameter, that parameter is used
	 * as selector on document.
	 *
	 * With two parameters, first is assumed as element, second as selector.
	 *
	 * @return Node
	 */
	qs: (a, b) => (
		typeof a === 'object' && b ?
			a.querySelector(b) :
			document.querySelector(a)
	),

	/**
	 * Shortcut for document|element.querySelectorAll()
	 *
	 * If called with one parameter, that parameter is used
	 * as selector on document.
	 *
	 * With two parameters, first is assumed as element, second as selector.
	 *
	 * @return NodeList
	 */
	qsa: (a, b) => (
		typeof a === 'object' && b ?
			a.querySelectorAll(b) :
			document.querySelectorAll(a)
	),

	/**
	 * Shortcut for dom.qsa().forEach()
	 *
	 * If called with one parameter, that parameter is used
	 * as selector on document.
	 *
	 * With two parameters, first is assumed as element, second as selector.
	 *
	 * Last parameter is callback for nodelist.forEach()
	 *
	 * @return NodeList
	 */
	qsaEach: (a, b, c) => (
		typeof a === 'object' && b ?
			a.querySelectorAll(b).forEach(c) :
			document.querySelectorAll(a).forEach(b)
	),

	/**
	 * Check if element matches selector.
	 *
	 * @param Node Element.
	 * @param strint Selector.
	 * @return bool
	 */
	is: (element, selector) => (element ? (
		element.matches ||
		element.matchesSelector ||
		element.msMatchesSelector ||
		(() => false)
	).call(element, selector) : false),

	/**
	 * Find closest element's parent, which matches given selector.
	 * For now passed element is tested too, might changed in future.
	 *
	 * @param Node Element.
	 * @param string Selector.
	 * @return Node
	 */
	closest(element, selector) {
		do {
			if (this.is(element, selector)) {
				return element;
			}

			element = element.parentNode;
		} while(!this.is(element, 'body'));

		return false;
	},

	/**
	 * Create element.
	 *
	 * @param string Element tag name.
	 * @param Object Element attributes.
	 * @param Object Options for document.createElement().
	 * @return Node
	 */
	create(name, attributes = {}, options = {}) {
		const element = document.createElement(name, options);

		objectEach(attributes, (attribute, value) => {
			element.setAttribute(attribute, value);
		});

		return element;
	},

	/**
	 * Wrap element inside another element.
	 *
	 * @param Node Element to be wrapped.
	 * @param Node Wrapper element.
	 * @return void
	 */
	wrap(element, wrapper) {
		element.parentNode.insertBefore(wrapper, element);
		wrapper.appendChild(element);
	},

	/**
	 * Add listener for bubbling events.
	 *
	 * @param Node Wrapper element to which event listener will be attached.
	 * @param string Event type.
	 * @param string Selector for element on which the callback should trigger, null for everything.
	 * @param function Callback.
	 * @return void
	 */
	on(element, eventType, target, callback) {
		element.addEventListener(eventType, (event) => {
			const isTarget = !target || this.is(event.target, target);
			const isTargetChild = !target || this.closest(event.target, target);

			if (isTarget || isTargetChild) {
				callback(event, event.target);
			}
		});
	},

	/**
	 * Add listener when DOM is ready.
	 *
	 * @param function Callback.
	 * @return void
	 */
	ready(callback) {
		document.addEventListener('DOMContentLoaded', callback);
	},

	/**
	 * Dispatch event on element.
	 *
	 * @param Node Target element.
	 * @param string Event type.
	 * @param Object Dispatch event options.
	 * @return void
	 */
	dispatchEvent(element, event, options = {}) {
		options = Object.assign({}, {
			bubbles: true,
			cancelable: true,
		}, options);

		element.dispatchEvent(new Event(event, options));
	},
};
