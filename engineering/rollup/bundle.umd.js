(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
})(this, (function (exports) { 'use strict';

	const whoAmI = 'I am format';

	exports.whoAmI = whoAmI;

}));
//npx rollup format.js -o bundle.umd.js -f umd -n utils