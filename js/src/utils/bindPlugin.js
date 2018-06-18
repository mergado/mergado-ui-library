import dom from 'utils/dom';


export default function(plugin, a, b, c) {
	const passedOptions = typeof a !== 'string';
	const options = passedOptions ? a : {};
	const selector = passedOptions ? b : a;
	const context = (passedOptions ? c : b) || document;

	if (!plugin.name) {
		console.error('Passed plugin function doesn\'t have a name!');
	}

	dom.qsaEach(context, selector, (node) => {
		if (!node.plugins) {
			node.plugins = [];
		}

		if (!node.plugins[plugin.name]) {
			node.plugins[plugin.name] = new plugin(node, options);
		}

		return node;
	});
}
