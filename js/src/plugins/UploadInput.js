import dom from 'utils/dom';


export default class UploadInput {

	/**
	 * @param DOM Node
	 */
	constructor(input) {
		this.input = input;
		this.wrapper = this.wrap(input);

		dom.on(this.input, 'change', null, this.handleChange.bind(this));
	}

	wrap(input) {
		const button = dom.create('div', {
			class: 'button',
		});

		const filename = dom.create('span', {
			class: 'filename',
		});

		const wrapper = dom.create('div', {
			class: 'upload-input',
		});

		dom.wrap(input, button);
		dom.wrap(button, wrapper);

		wrapper.appendChild(filename);

		return wrapper;
	}

	/**
	 * Input changed event listener.
	 *
	 * @return void
	 */
	handleChange() {
		const filename = dom.qs(this.wrapper, '.filename');

		// C:/fakepath/ is the security implementation of the browser
		filename.innerHTML = this.input.value.replace(/.*[\\/]/, '');
	}
}
