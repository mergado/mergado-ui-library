import bindPlugin from 'utils/bindPlugin';
import ClearableInput from './plugins/ClearableInput';
import StyledInput from './plugins/StyledInput';
import UploadInput from './plugins/UploadInput';


const initClearableInput = bindPlugin.bind(null, ClearableInput, 'input[type="text"].clearable');
const initStyledInput = bindPlugin.bind(null, StyledInput, 'input[type="checkbox"], input[type="radio"]');
const initUploadInput = bindPlugin.bind(null, UploadInput, 'input[type="file"]');

/**
 * Init MUIL
 *
 * @param DOM Node
 * @return void
 */
window.initMUIL = (context) => {
	initClearableInput(context);
	initStyledInput(context);
	initUploadInput(context);
};

window.initMUIL(document);
