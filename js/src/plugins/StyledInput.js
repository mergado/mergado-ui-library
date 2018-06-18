import dom from 'utils/dom';


export default class StyledInput {

	/**
	 * @param DOM Node
	 */
	constructor(input) {
		const inputClass = input.getAttribute('class') || '';
		const label = dom.closest(input, 'label');
		const wrapper = dom.create('div', {
			class: `styled-input ${input.type} ${inputClass}`,
		});

		if (label) {
			label.classList.add(input.type);
		}

		dom.wrap(input, wrapper);

		wrapper.appendChild(dom.create('i', {
			class: `${inputClass} input-${input.type}`,
		}));
	}
}
