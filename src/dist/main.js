/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/app.js":
/*!***********************!*\
  !*** ./client/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/utils */ \"./client/js/utils.js\");\nconst user_input = document.querySelector(\"#article\");\r\nconst submit_btn = document.querySelector(\"#submit\");\r\nconst result = document.querySelector(\"#results\");\r\nconst loader = document.querySelector(\".loader\");\r\n\r\n\r\n\r\nconst submit_user_value = event => {\r\n  event.preventDefault();\r\n  const regexExp = /(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})/gi;\r\n  const regex = new RegExp(regexExp);\r\n  if (user_input.value.match(regex)) {\r\n    if (result.childElementCount > 0) {\r\n      const list = document.querySelectorAll(\".item\");\r\n      const list2 = document.querySelectorAll(\".form_style_card\");\r\n      Object(_js_utils__WEBPACK_IMPORTED_MODULE_0__[\"remove_NodeLists\"])(list);\r\n      Object(_js_utils__WEBPACK_IMPORTED_MODULE_0__[\"remove_NodeLists\"])(list2);\r\n    }\r\n    postData(\"/\", { value: user_input.value });\r\n    Object(_js_utils__WEBPACK_IMPORTED_MODULE_0__[\"message_display_card\"])(\r\n      \"\",\r\n      \"div_loader\",\r\n      \"<img src='./images/Infinity.svg' />\"\r\n    );\r\n    const div_loader = document.querySelector(\".div_loader\");\r\n    result.setAttribute(\"style\", \"background-color: #f1f2f3\");\r\n    setTimeout(() => {\r\n      div_loader.remove();\r\n      server_data();\r\n    }, 1000);\r\n  } else {\r\n    Object(_js_utils__WEBPACK_IMPORTED_MODULE_0__[\"message_display_card\"])(\r\n      \"error you must enter a url with: (http or https)://www.google.com\",\r\n      \"error_m\",\r\n      (image = \"\"),\r\n      false\r\n    );\r\n    const error_m = document.querySelector(\".error_m\");\r\n    setTimeout(() => {\r\n      error_m.remove();\r\n    }, 3000);\r\n  }\r\n};\r\n\r\nconst postData = async (url = \"\", data = {}) => {\r\n  const response = await fetch(url, {\r\n    method: \"POST\",\r\n    mode: \"cors\",\r\n    cache: \"no-cache\",\r\n    credentials: \"same-origin\",\r\n    headers: {\r\n      \"Content-Type\": \"application/json\"\r\n    },\r\n    body: JSON.stringify(data)\r\n  });\r\n  try {\r\n    return response;\r\n  } catch (err) {\r\n    return err;\r\n  }\r\n};\r\n\r\nconst server_data = async () => {\r\n  await fetch(\"/data\").then(value => {\r\n    value.json().then(data => {\r\n      if (data[0].errors === undefined || data[0].errors === null) {\r\n        Object(_js_utils__WEBPACK_IMPORTED_MODULE_0__[\"cards_for_data\"])(data[0].ai_info);\r\n        Object(_js_utils__WEBPACK_IMPORTED_MODULE_0__[\"message_display_card\"])(\r\n          `Article Text: ${data[0].ai_info.text}`,\r\n          \"form_style_card\"\r\n        );\r\n      } else {\r\n        Object(_js_utils__WEBPACK_IMPORTED_MODULE_0__[\"message_display_card\"])(`${data[0].errors}`, \"form_style_card\");\r\n      }\r\n    });\r\n  });\r\n};\r\n\r\nsubmit_btn.addEventListener(\"click\", submit_user_value);\r\nwindow.addEventListener(\"load\", () => {\r\n  setTimeout(() => {\r\n    loader.setAttribute(\"style\", \"display: none;\");\r\n  }, 1500);\r\n});\r\n\n\n//# sourceURL=webpack:///./client/app.js?");

/***/ }),

/***/ "./client/js/utils.js":
/*!****************************!*\
  !*** ./client/js/utils.js ***!
  \****************************/
/*! exports provided: remove_NodeLists, cards_for_data, message_display_card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"remove_NodeLists\", function() { return remove_NodeLists; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cards_for_data\", function() { return cards_for_data; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"message_display_card\", function() { return message_display_card; });\nconst div_error = document.querySelector(\".error_message\");\r\nconst form = document.querySelector(\".blog_article\");\r\n\r\n/**\r\n * Remove all the element in the Array\r\n * @param {Array} nodeList a list of elements i a div\r\n */\r\nconst remove_NodeLists = nodeList => {\r\n  nodeList.forEach(value => value.remove());\r\n};\r\n\r\n/**\r\n * display info on the results of the returned info\r\n *\r\n */\r\nconst cards_for_data = ({\r\n  polarity,\r\n  subjectivity,\r\n  polarity_confidence,\r\n  subjectivity_confidence\r\n}) => {\r\n  stat_card(\"Polarity\", polarity, Math.round(polarity_confidence * 100) + \"%\", [\r\n    \"statCard\",\r\n    \"individCard\",\r\n    \"item\"\r\n  ]);\r\n  stat_card(\r\n    \"Subjectivity\",\r\n    subjectivity,\r\n    Math.round(subjectivity_confidence * 100) + \"%\",\r\n    [\"statCard\", \"individCard\", \"item\"]\r\n  );\r\n};\r\n\r\n//creates div cards to display data\r\nconst stat_card = (title, text, anotherText, classname) => {\r\n  const titleDiv = document.createElement(\"div\");\r\n  const div = document.createElement(\"div\");\r\n  const innerDiv = document.createElement(\"div\");\r\n  div.classList.add(...classname);\r\n  innerDiv.className = \"dataStat\";\r\n  titleDiv.className = \"title\";\r\n  const titleConent = document.createTextNode(title);\r\n  const textContent = document.createTextNode(text);\r\n  const textContent2 = document.createTextNode(anotherText);\r\n  div.appendChild(titleDiv);\r\n  div.appendChild(textContent);\r\n  titleDiv.appendChild(titleConent);\r\n  innerDiv.appendChild(textContent2);\r\n  div.appendChild(innerDiv);\r\n\r\n  result.appendChild(div);\r\n};\r\n\r\n/**\r\n *\r\n * @param {*} text\r\n * @param {*} classname\r\n * @param {*} image\r\n * @param {*} toResult\r\n */\r\nconst message_display_card = (\r\n  text = \"\",\r\n  classname,\r\n  image = \"\",\r\n  toResult = true\r\n) => {\r\n  const div = document.createElement(\"div\");\r\n  div.className = classname;\r\n  if (text.length > 1) {\r\n    div.textContent = text;\r\n  } else {\r\n    div.innerHTML = image;\r\n  }\r\n  if (toResult) {\r\n    result.appendChild(div);\r\n  } else {\r\n    form.appendChild(div);\r\n  }\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./client/js/utils.js?");

/***/ })

/******/ });