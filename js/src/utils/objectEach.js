/**
 * objectEach()
 *
 * Call function on each value (and key) on object.
 *
 * @param Object Object to iterate over.
 * @oaram Function Callback function, passed params are: key, value, iteration.
 */
export default function(object, callback) {
	if (typeof object === 'object') {
		Object.keys(object).forEach((key, iteration) => (
			callback(key, object[key], iteration)
		));
	}
}
