import dom from 'utils/dom';


export default class ClearableInput {

	/**
	 * @param DOM Node
	 */
	constructor(input) {
		const fixFocus = input === document.activeElement;
		const wrapper = this.createWrapper(input);
		const clearLink = this.createClearLink(wrapper);

		dom.wrap(input, wrapper);
		wrapper.appendChild(clearLink);

		this.input = input;
		this.wrapper = wrapper;
		this.clearLink = clearLink;

		if (fixFocus) {
			input.focus();
		}

		dom.on(this.clearLink, 'click', null, this.handleClear.bind(this));
		dom.on(this.input, 'change', null, this.handleChange.bind(this));
		dom.on(this.input, 'keyup', null, this.handleChange.bind(this));

		this.handleChange.call(this);
	}

	/**
	 * Create Input wrapper.
	 *
	 * @return Node Wrapper element.
	 */
	createWrapper() {
		return dom.create('div', {
			class: 'clearable-wrapper',
		});
	}

	/**
	 * Create input clearing link.
	 *
	 * @param Node Input element.
	 * @return Node Clearing link element.
	 */
	createClearLink() {
		const link = dom.create('a', {
			class: 'clearable-clear',
		});

		link.textContent = '×';

		return link;
	}

	/**
	 * Input changed (keyup) event listener.
	 *
	 * @param Event
	 * @return void
	 */
	handleChange() {
		if (this.input.value.length) {
			this.wrapper.classList.add('show-clear');
		} else {
			this.wrapper.classList.remove('show-clear');
		}
	}

	/**
	 * Click on clearing button event listener.
	 *
	 * @param Event
	 * @return void
	 */
	handleClear(event) {
		this.input.value = null;
		dom.dispatchEvent(this.input, 'change');

		event.preventDefault();
		event.target.blur();
	}
}
