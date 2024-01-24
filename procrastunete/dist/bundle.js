/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/trackLibrary/DBHandler/DBHandler.js":
/*!************************************************************!*\
  !*** ./src/components/trackLibrary/DBHandler/DBHandler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let SONG_DATA = []

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
	
})());


/***/ }),

/***/ "./src/components/trackLibrary/trackLibrary.js":
/*!*****************************************************!*\
  !*** ./src/components/trackLibrary/trackLibrary.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DBHandler_DBHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DBHandler/DBHandler.js */ "./src/components/trackLibrary/DBHandler/DBHandler.js");


const renderer = () => {
	const render = () => {

	}

	return {render}
}

const inputHandler = (() => {
	let formLabels = [
		"trackTitle",
		"trackArtist",
		"trackDuration-min",
		"trackDuration-sec",
	]

	const validate = () => {
		let result = []
		formLabels.forEach((id) => {
			let elem = document.getElementById(id);
			result.push({
				id: id,
				validity: elem.validity
			});
		})
		return result;
	}

	const sanitize = (input) => {
		return true;
	}

	return {validate, sanitize}
})()

const ftInputWarning = (state) => { 
	let section = document.createElement("div");
	section.classList.add("inputWarning");
	let text = document.createElement("p");
	switch(state) {
		case "valueMissing":
			text.textContent = "Please fill out this field";
			break;
		case "tooLong":
			text.textContent = "This field is too long";
			break;
		case "tooShort":
			text.textContent = "This field is too short";
			break;
		case "typeMismatch":
			text.textContent = "Please fill with correct type of input";
			break;
		case "rangeOverflow":
			text.textContent = "Song duration is too long!";
			break;
		case "rangeUnderflow":
			text.textContent = "Song duration is too short!";
			break;
		default:
			text.textContent = "Unknown error has occured";
			break;
	}
	section.appendChild(text);
	return section;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
	const inputRoutine = () => {
		let validationResult = inputHandler.validate();
		validationResult.forEach((result) => {
			let selectedWarnElem = document.getElementById(`WARN_${result.id}`);
			
			for(let state in result.validity) {
				if(result.validity[state] == true && state != "valid") {
					selectedWarnElem.innerHTML = "";
					selectedWarnElem.appendChild(
						ftInputWarning(state)
					);
				}
			}
		})
	}

	return {inputRoutine}
})());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_trackLibrary_trackLibrary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/trackLibrary/trackLibrary.js */ "./src/components/trackLibrary/trackLibrary.js");


function setEssentialListeners() {
	document.getElementById("submit_addTrack").addEventListener(
		"click", () => {
			_components_trackLibrary_trackLibrary_js__WEBPACK_IMPORTED_MODULE_0__["default"].inputRoutine();
		}
	)
}

function main() {
	setEssentialListeners();
}

main();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsaUVBQWU7QUFDZjtBQUNBLENBQUMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ0o0Qzs7QUFFaEQ7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxVQUFVO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxTQUFTO0FBQ1QsQ0FBQyxHQUFHOzs7Ozs7O1VDdEZKO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0U7O0FBRXBFO0FBQ0E7QUFDQTtBQUNBLEdBQUcsZ0ZBQVk7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvY3Jhc3R1bmV0ZS8uL3NyYy9jb21wb25lbnRzL3RyYWNrTGlicmFyeS9EQkhhbmRsZXIvREJIYW5kbGVyLmpzIiwid2VicGFjazovL3Byb2NyYXN0dW5ldGUvLi9zcmMvY29tcG9uZW50cy90cmFja0xpYnJhcnkvdHJhY2tMaWJyYXJ5LmpzIiwid2VicGFjazovL3Byb2NyYXN0dW5ldGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvY3Jhc3R1bmV0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvY3Jhc3R1bmV0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2NyYXN0dW5ldGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9jcmFzdHVuZXRlLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IFNPTkdfREFUQSA9IFtdXG5cbmV4cG9ydCBkZWZhdWx0ICgoKSA9PiB7XG5cdFxufSkoKVxuIiwiaW1wb3J0IERCSGFuZGxlciBmcm9tIFwiLi9EQkhhbmRsZXIvREJIYW5kbGVyLmpzXCJcblxuY29uc3QgcmVuZGVyZXIgPSAoKSA9PiB7XG5cdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHR9XG5cblx0cmV0dXJuIHtyZW5kZXJ9XG59XG5cbmNvbnN0IGlucHV0SGFuZGxlciA9ICgoKSA9PiB7XG5cdGxldCBmb3JtTGFiZWxzID0gW1xuXHRcdFwidHJhY2tUaXRsZVwiLFxuXHRcdFwidHJhY2tBcnRpc3RcIixcblx0XHRcInRyYWNrRHVyYXRpb24tbWluXCIsXG5cdFx0XCJ0cmFja0R1cmF0aW9uLXNlY1wiLFxuXHRdXG5cblx0Y29uc3QgdmFsaWRhdGUgPSAoKSA9PiB7XG5cdFx0bGV0IHJlc3VsdCA9IFtdXG5cdFx0Zm9ybUxhYmVscy5mb3JFYWNoKChpZCkgPT4ge1xuXHRcdFx0bGV0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdFx0XHRyZXN1bHQucHVzaCh7XG5cdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0dmFsaWRpdHk6IGVsZW0udmFsaWRpdHlcblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGNvbnN0IHNhbml0aXplID0gKGlucHV0KSA9PiB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRyZXR1cm4ge3ZhbGlkYXRlLCBzYW5pdGl6ZX1cbn0pKClcblxuY29uc3QgZnRJbnB1dFdhcm5pbmcgPSAoc3RhdGUpID0+IHsgXG5cdGxldCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0c2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiaW5wdXRXYXJuaW5nXCIpO1xuXHRsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRzd2l0Y2goc3RhdGUpIHtcblx0XHRjYXNlIFwidmFsdWVNaXNzaW5nXCI6XG5cdFx0XHR0ZXh0LnRleHRDb250ZW50ID0gXCJQbGVhc2UgZmlsbCBvdXQgdGhpcyBmaWVsZFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcInRvb0xvbmdcIjpcblx0XHRcdHRleHQudGV4dENvbnRlbnQgPSBcIlRoaXMgZmllbGQgaXMgdG9vIGxvbmdcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ0b29TaG9ydFwiOlxuXHRcdFx0dGV4dC50ZXh0Q29udGVudCA9IFwiVGhpcyBmaWVsZCBpcyB0b28gc2hvcnRcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ0eXBlTWlzbWF0Y2hcIjpcblx0XHRcdHRleHQudGV4dENvbnRlbnQgPSBcIlBsZWFzZSBmaWxsIHdpdGggY29ycmVjdCB0eXBlIG9mIGlucHV0XCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwicmFuZ2VPdmVyZmxvd1wiOlxuXHRcdFx0dGV4dC50ZXh0Q29udGVudCA9IFwiU29uZyBkdXJhdGlvbiBpcyB0b28gbG9uZyFcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJyYW5nZVVuZGVyZmxvd1wiOlxuXHRcdFx0dGV4dC50ZXh0Q29udGVudCA9IFwiU29uZyBkdXJhdGlvbiBpcyB0b28gc2hvcnQhXCI7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGV4dC50ZXh0Q29udGVudCA9IFwiVW5rbm93biBlcnJvciBoYXMgb2NjdXJlZFwiO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0c2VjdGlvbi5hcHBlbmRDaGlsZCh0ZXh0KTtcblx0cmV0dXJuIHNlY3Rpb247XG59XG5cbmV4cG9ydCBkZWZhdWx0ICgoKSA9PiB7XG5cdGNvbnN0IGlucHV0Um91dGluZSA9ICgpID0+IHtcblx0XHRsZXQgdmFsaWRhdGlvblJlc3VsdCA9IGlucHV0SGFuZGxlci52YWxpZGF0ZSgpO1xuXHRcdHZhbGlkYXRpb25SZXN1bHQuZm9yRWFjaCgocmVzdWx0KSA9PiB7XG5cdFx0XHRsZXQgc2VsZWN0ZWRXYXJuRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBXQVJOXyR7cmVzdWx0LmlkfWApO1xuXHRcdFx0XG5cdFx0XHRmb3IobGV0IHN0YXRlIGluIHJlc3VsdC52YWxpZGl0eSkge1xuXHRcdFx0XHRpZihyZXN1bHQudmFsaWRpdHlbc3RhdGVdID09IHRydWUgJiYgc3RhdGUgIT0gXCJ2YWxpZFwiKSB7XG5cdFx0XHRcdFx0c2VsZWN0ZWRXYXJuRWxlbS5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0XHRcdHNlbGVjdGVkV2FybkVsZW0uYXBwZW5kQ2hpbGQoXG5cdFx0XHRcdFx0XHRmdElucHV0V2FybmluZyhzdGF0ZSlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHJldHVybiB7aW5wdXRSb3V0aW5lfVxufSkoKVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHJhY2tMaWJyYXJ5IGZyb20gXCIuL2NvbXBvbmVudHMvdHJhY2tMaWJyYXJ5L3RyYWNrTGlicmFyeS5qc1wiXG5cbmZ1bmN0aW9uIHNldEVzc2VudGlhbExpc3RlbmVycygpIHtcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRfYWRkVHJhY2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRyYWNrTGlicmFyeS5pbnB1dFJvdXRpbmUoKTtcblx0XHR9XG5cdClcbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcblx0c2V0RXNzZW50aWFsTGlzdGVuZXJzKCk7XG59XG5cbm1haW4oKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9