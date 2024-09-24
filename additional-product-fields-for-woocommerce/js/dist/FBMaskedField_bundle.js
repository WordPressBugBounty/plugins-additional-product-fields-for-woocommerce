var RedNaoFBMaskedField=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1523)}({0:function(e,t){e.exports=React},1422:function(e,t,n){e.exports=n(1423)},1423:function(e,t,n){"use strict";var o,r=(o=n(0))&&"object"==typeof o&&"default"in o?o.default:o,i=n(15);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function u(e,t){e.prototype=Object.create(t.prototype),function(e,t){for(var n=Object.getOwnPropertyNames(t),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(t,r);i&&i.configurable&&void 0===e[r]&&Object.defineProperty(e,r,i)}}(e.prototype.constructor=e,t)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var l=function(e,t,n,o,r,i,a,u){if(!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,o,r,i,a,u],c=0;(s=new Error(t.replace(/%s/g,(function(){return l[c++]})))).name="Invariant Violation"}throw s.framesToPop=1,s}};function c(e,t,n){if("selectionStart"in e&&"selectionEnd"in e)e.selectionStart=t,e.selectionEnd=n;else{var o=e.createTextRange();o.collapse(!0),o.moveStart("character",t),o.moveEnd("character",n-t),o.select()}}var f={9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"};function p(e,t,n){var o="",r="",i=null,a=[];if(void 0===t&&(t="_"),null==n&&(n=f),!e||"string"!=typeof e)return{maskChar:t,formatChars:n,mask:null,prefix:null,lastEditablePosition:null,permanents:[]};var u=!1;return e.split("").forEach((function(e){u=!u&&"\\"===e||(u||!n[e]?(a.push(o.length),o.length===a.length-1&&(r+=e)):i=o.length+1,o+=e,!1)})),{maskChar:t,formatChars:n,prefix:r,mask:o,lastEditablePosition:i,permanents:a}}function d(e,t){return-1!==e.permanents.indexOf(t)}function h(e,t,n){var o=e.mask,r=e.formatChars;if(!n)return!1;if(d(e,t))return o[t]===n;var i=r[o[t]];return new RegExp(i).test(n)}function m(e,t){return t.split("").every((function(t,n){return d(e,n)||!h(e,n,t)}))}function v(e,t){var n=e.maskChar,o=e.prefix;if(!n){for(;t.length>o.length&&d(e,t.length-1);)t=t.slice(0,t.length-1);return t.length}for(var r=o.length,i=t.length;i>=o.length;i--){var a=t[i];if(!d(e,i)&&h(e,i,a)){r=i+1;break}}return r}function y(e,t){return v(e,t)===e.mask.length}function g(e,t){var n=e.maskChar,o=e.mask,r=e.prefix;if(!n){for((t=b(e,"",t,0)).length<r.length&&(t=r);t.length<o.length&&d(e,t.length);)t+=o[t.length];return t}if(t)return b(e,g(e,""),t,0);for(var i=0;i<o.length;i++)d(e,i)?t+=o[i]:t+=n;return t}function b(e,t,n,o){var r=e.mask,i=e.maskChar,a=e.prefix,u=n.split(""),s=y(e,t);return!i&&o>t.length&&(t+=r.slice(t.length,o)),u.every((function(n){for(;c=n,d(e,l=o)&&c!==r[l];){if(o>=t.length&&(t+=r[o]),u=n,i&&d(e,o)&&u===i)return!0;if(++o>=r.length)return!1}var u,l,c;return!h(e,o,n)&&n!==i||(o<t.length?t=i||s||o<a.length?t.slice(0,o)+n+t.slice(o+1):(t=t.slice(0,o)+n+t.slice(o),g(e,t)):i||(t+=n),++o<r.length)})),t}function O(e,t){for(var n=e.mask,o=t;o<n.length;++o)if(!d(e,o))return o;return null}function k(e){return e||0===e?e+"":""}function w(e,t,n,o,r){var i=e.mask,a=e.prefix,u=e.lastEditablePosition,s=t,l="",c=0,f=0,p=Math.min(r.start,n.start);return n.end>r.start?f=(c=function(e,t,n,o){var r=e.mask,i=e.maskChar,a=n.split(""),u=o;return a.every((function(t){for(;a=t,d(e,n=o)&&a!==r[n];)if(++o>=r.length)return!1;var n,a;return(h(e,o,t)||t===i)&&o++,o<r.length})),o-u}(e,0,l=s.slice(r.start,n.end),p))?r.length:0:s.length<o.length&&(f=o.length-s.length),s=o,f&&(1!==f||r.length||(p=r.start===n.start?O(e,n.start):function(e,t){for(var n=t;0<=n;--n)if(!d(e,n))return n;return null}(e,n.start)),s=function(e,t,n,o){var r=n+o,i=e.maskChar,a=e.mask,u=e.prefix,s=t.split("");if(i)return s.map((function(t,o){return o<n||r<=o?t:d(e,o)?a[o]:i})).join("");for(var l=r;l<s.length;l++)d(e,l)&&(s[l]="");return n=Math.max(u.length,n),s.splice(n,r-n),t=s.join(""),g(e,t)}(e,s,p,f)),s=b(e,s,l,p),(p+=c)>=i.length?p=i.length:p<a.length&&!c?p=a.length:p>=a.length&&p<u&&c&&(p=O(e,p)),l||(l=null),{value:s=g(e,s),enteredString:l,selection:{start:p,end:p}}}function M(e){return"function"==typeof e}function S(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame}function P(e){return(S()?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame:function(){return setTimeout(e,1e3/60)})(e)}function C(e){(S()||clearTimeout)(e)}var F=function(e){function t(t){var n=e.call(this,t)||this;n.focused=!1,n.mounted=!1,n.previousSelection=null,n.selectionDeferId=null,n.saveSelectionLoopDeferId=null,n.saveSelectionLoop=function(){n.previousSelection=n.getSelection(),n.saveSelectionLoopDeferId=P(n.saveSelectionLoop)},n.runSaveSelectionLoop=function(){null===n.saveSelectionLoopDeferId&&n.saveSelectionLoop()},n.stopSaveSelectionLoop=function(){null!==n.saveSelectionLoopDeferId&&(C(n.saveSelectionLoopDeferId),n.saveSelectionLoopDeferId=null,n.previousSelection=null)},n.getInputDOMNode=function(){if(!n.mounted)return null;var e=i.findDOMNode(s(s(n))),t="undefined"!=typeof window&&e instanceof window.Element;if(e&&!t)return null;if("INPUT"!==e.nodeName&&(e=e.querySelector("input")),!e)throw new Error("react-input-mask: inputComponent doesn't contain input node");return e},n.getInputValue=function(){var e=n.getInputDOMNode();return e?e.value:null},n.setInputValue=function(e){var t=n.getInputDOMNode();t&&(n.value=e,t.value=e)},n.setCursorToEnd=function(){var e=v(n.maskOptions,n.value),t=O(n.maskOptions,e);null!==t&&n.setCursorPosition(t)},n.setSelection=function(e,t,o){void 0===o&&(o={});var r=n.getInputDOMNode(),i=n.isFocused();r&&i&&(o.deferred||c(r,e,t),null!==n.selectionDeferId&&C(n.selectionDeferId),n.selectionDeferId=P((function(){n.selectionDeferId=null,c(r,e,t)})),n.previousSelection={start:e,end:t,length:Math.abs(t-e)})},n.getSelection=function(){return function(e){var t=0,n=0;if("selectionStart"in e&&"selectionEnd"in e)t=e.selectionStart,n=e.selectionEnd;else{var o=document.selection.createRange();o.parentElement()===e&&(t=-o.moveStart("character",-e.value.length),n=-o.moveEnd("character",-e.value.length))}return{start:t,end:n,length:n-t}}(n.getInputDOMNode())},n.getCursorPosition=function(){return n.getSelection().start},n.setCursorPosition=function(e){n.setSelection(e,e)},n.isFocused=function(){return n.focused},n.getBeforeMaskedValueChangeConfig=function(){var e=n.maskOptions,t=e.mask,o=e.maskChar,r=e.permanents,i=e.formatChars;return{mask:t,maskChar:o,permanents:r,alwaysShowMask:!!n.props.alwaysShowMask,formatChars:i}},n.isInputAutofilled=function(e,t,o,r){var i=n.getInputDOMNode();try{if(i.matches(":-webkit-autofill"))return!0}catch(e){}return!n.focused||r.end<o.length&&t.end===e.length},n.onChange=function(e){var t=s(s(n)).beforePasteState,o=s(s(n)).previousSelection,r=n.props.beforeMaskedValueChange,i=n.getInputValue(),a=n.value,u=n.getSelection();n.isInputAutofilled(i,u,a,o)&&(a=g(n.maskOptions,""),o={start:0,end:0,length:0}),t&&(o=t.selection,a=t.value,u={start:o.start+i.length,end:o.start+i.length,length:0},i=a.slice(0,o.start)+i+a.slice(o.end),n.beforePasteState=null);var l=w(n.maskOptions,i,u,a,o),c=l.enteredString,f=l.selection,p=l.value;if(M(r)){var d=r({value:p,selection:f},{value:a,selection:o},c,n.getBeforeMaskedValueChangeConfig());p=d.value,f=d.selection}n.setInputValue(p),M(n.props.onChange)&&n.props.onChange(e),n.isWindowsPhoneBrowser?n.setSelection(f.start,f.end,{deferred:!0}):n.setSelection(f.start,f.end)},n.onFocus=function(e){var t=n.props.beforeMaskedValueChange,o=n.maskOptions,r=o.mask,i=o.prefix;if(n.focused=!0,n.mounted=!0,r){if(n.value)v(n.maskOptions,n.value)<n.maskOptions.mask.length&&n.setCursorToEnd();else{var a=g(n.maskOptions,i),u=g(n.maskOptions,a),s=v(n.maskOptions,u),l=O(n.maskOptions,s),c={start:l,end:l};if(M(t)){var f=t({value:u,selection:c},{value:n.value,selection:null},null,n.getBeforeMaskedValueChangeConfig());u=f.value,c=f.selection}var p=u!==n.getInputValue();p&&n.setInputValue(u),p&&M(n.props.onChange)&&n.props.onChange(e),n.setSelection(c.start,c.end)}n.runSaveSelectionLoop()}M(n.props.onFocus)&&n.props.onFocus(e)},n.onBlur=function(e){var t=n.props.beforeMaskedValueChange,o=n.maskOptions.mask;if(n.stopSaveSelectionLoop(),n.focused=!1,o&&!n.props.alwaysShowMask&&m(n.maskOptions,n.value)){var r="";M(t)&&(r=t({value:r,selection:null},{value:n.value,selection:n.previousSelection},null,n.getBeforeMaskedValueChangeConfig()).value);var i=r!==n.getInputValue();i&&n.setInputValue(r),i&&M(n.props.onChange)&&n.props.onChange(e)}M(n.props.onBlur)&&n.props.onBlur(e)},n.onMouseDown=function(e){if(!n.focused&&document.addEventListener){n.mouseDownX=e.clientX,n.mouseDownY=e.clientY,n.mouseDownTime=(new Date).getTime();document.addEventListener("mouseup",(function e(t){if(document.removeEventListener("mouseup",e),n.focused){var o=Math.abs(t.clientX-n.mouseDownX),r=Math.abs(t.clientY-n.mouseDownY),i=Math.max(o,r),a=(new Date).getTime()-n.mouseDownTime;(i<=10&&a<=200||i<=5&&a<=300)&&n.setCursorToEnd()}}))}M(n.props.onMouseDown)&&n.props.onMouseDown(e)},n.onPaste=function(e){M(n.props.onPaste)&&n.props.onPaste(e),e.defaultPrevented||(n.beforePasteState={value:n.getInputValue(),selection:n.getSelection()},n.setInputValue(""))},n.handleRef=function(e){null==n.props.children&&M(n.props.inputRef)&&n.props.inputRef(e)};var o=t.mask,r=t.maskChar,a=t.formatChars,u=t.alwaysShowMask,l=t.beforeMaskedValueChange,f=t.defaultValue,d=t.value;n.maskOptions=p(o,r,a),null==f&&(f=""),null==d&&(d=f);var h=k(d);if(n.maskOptions.mask&&(u||h)&&(h=g(n.maskOptions,h),M(l))){var y=t.value;null==t.value&&(y=f),h=l({value:h,selection:null},{value:y=k(y),selection:null},null,n.getBeforeMaskedValueChangeConfig()).value}return n.value=h,n}u(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.getInputDOMNode()&&(this.isWindowsPhoneBrowser=function(){var e=new RegExp("windows","i"),t=new RegExp("phone","i"),n=navigator.userAgent;return e.test(n)&&t.test(n)}(),this.maskOptions.mask&&this.getInputValue()!==this.value&&this.setInputValue(this.value))},n.componentDidUpdate=function(){var e=this.previousSelection,t=this.props,n=t.beforeMaskedValueChange,o=t.alwaysShowMask,r=t.mask,i=t.maskChar,a=t.formatChars,u=this.maskOptions,s=o||this.isFocused(),l=null!=this.props.value,c=l?k(this.props.value):this.value,f=e?e.start:null;if(this.maskOptions=p(r,i,a),this.maskOptions.mask){!u.mask&&this.isFocused()&&this.runSaveSelectionLoop();var d=this.maskOptions.mask&&this.maskOptions.mask!==u.mask;if(u.mask||l||(c=this.getInputValue()),(d||this.maskOptions.mask&&(c||s))&&(c=g(this.maskOptions,c)),d){var h=v(this.maskOptions,c);(null===f||h<f)&&(f=y(this.maskOptions,c)?h:O(this.maskOptions,h))}!this.maskOptions.mask||!m(this.maskOptions,c)||s||l&&this.props.value||(c="");var b={start:f,end:f};if(M(n)){var w=n({value:c,selection:b},{value:this.value,selection:this.previousSelection},null,this.getBeforeMaskedValueChangeConfig());c=w.value,b=w.selection}this.value=c;var S=this.getInputValue()!==this.value;S?(this.setInputValue(this.value),this.forceUpdate()):d&&this.forceUpdate();var P=!1;null!=b.start&&null!=b.end&&(P=!e||e.start!==b.start||e.end!==b.end),(P||S)&&this.setSelection(b.start,b.end)}else u.mask&&(this.stopSaveSelectionLoop(),this.forceUpdate())},n.componentWillUnmount=function(){this.mounted=!1,null!==this.selectionDeferId&&C(this.selectionDeferId),this.stopSaveSelectionLoop()},n.render=function(){var e,t=this.props,n=(t.mask,t.alwaysShowMask,t.maskChar,t.formatChars,t.inputRef,t.beforeMaskedValueChange,t.children),o=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],0<=t.indexOf(n)||(r[n]=e[n]);return r}(t,["mask","alwaysShowMask","maskChar","formatChars","inputRef","beforeMaskedValueChange","children"]);if(n){M(n)||l(!1);var i=["onChange","onPaste","onMouseDown","onFocus","onBlur","value","disabled","readOnly"],u=a({},o);i.forEach((function(e){return delete u[e]})),e=n(u),i.filter((function(t){return null!=e.props[t]&&e.props[t]!==o[t]})).length&&l(!1)}else e=r.createElement("input",a({ref:this.handleRef},o));var s={onFocus:this.onFocus,onBlur:this.onBlur};return this.maskOptions.mask&&(o.disabled||o.readOnly||(s.onChange=this.onChange,s.onPaste=this.onPaste,s.onMouseDown=this.onMouseDown),null!=o.value&&(s.value=this.value)),e=r.cloneElement(e,s)},t}(r.Component);e.exports=F},15:function(e,t){e.exports=ReactDOM},1523:function(e,t,n){"use strict";n.r(t),n.d(t,"FBMaskedField",(function(){return E}));var o=n(0),r=n(40),i=n(6),a=n(31),u=n(3),s=n(29),l=n(30),c=n(524);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e,t,n){return(h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(e,n){var o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(o=d(this,m(t).call(this,e,n))).Text=void 0,o.IsFocused=void 0,o.IsFocused=!1,o}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),n=t,(o=[{key:"InitializeStartingValues",value:function(e){this.Text=this.GetPreviousDataProperty("Value",this.Options.DefaultText),this.Quantity=this.GetPreviousDataProperty("Quantity",""==this.Options.QuantityDefaultValue?"":this.ParseNumber(this.Options.QuantityDefaultValue))}},{key:"InternalSerialize",value:function(e){h(m(t.prototype),"InternalSerialize",this).call(this,e),e.Value=this.GetValue()}},{key:"GetDynamicFieldNames",value:function(){return["FBMaskedField"]}},{key:"GetStoresInformation",value:function(){return!0}},{key:"GetIsUsed",value:function(){return!!h(m(t.prototype),"GetIsUsed",this).call(this)&&""!=this.GetValue()}},{key:"GetValue",value:function(){return-1!=this.Text.trim().indexOf(this.Options.MaskChar)?"":this.Text.trim()}},{key:"SetText",value:function(e){""!=this.Text.trim()&&this.RemoveError("required"),this.Text=e,this.Quantity=e.length>0&&0==this.Quantity?1:this.Quantity,this.FireValueChanged()}}])&&p(n.prototype,o),r&&p(n,r),t}(n(47).FBFieldWithPriceBaseModel),g=n(2),b=n(187);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(n,!0).forEach((function(t){M(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function M(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function P(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var I=n(1422),E=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=P(this,C(t).call(this,e))).IsFocused=void 0,n.IsFocused=!1,n}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(t,e),n=t,(r=[{key:"componentWillReceiveProps",value:function(e,t){this.Model.Parent.IsDesign&&(this.Model.Text=this.Model.Options.DefaultText,this.Model.SetQuantity(""==this.Model.Options.QuantityDefaultValue?"":this.Model.ParseNumber(this.Model.Options.QuantityDefaultValue)))}},{key:"SubRender",value:function(){return this.props.Model.Options.ShowQuantitySelector&&this.props.Model.Options.PriceType!=i.PriceTypeEnum.quantity?"bottom"==this.props.Model.Options.QuantityPosition||"right"==this.props.Model.Options.QuantityPosition?o.createElement(o.Fragment,null,this.GetInput(this.props.Model.Options.QuantityPosition),this.GetQuantityInput(),this.GetPriceOrRequiredBox()):o.createElement(o.Fragment,null,this.GetQuantityInput(),this.GetInput(this.props.Model.Options.QuantityPosition),this.GetPriceOrRequiredBox()):o.createElement(o.Fragment,null,this.GetInput(""),this.GetPriceOrRequiredBox())}},{key:"GetQuantityInput",value:function(){var e=this;return o.createElement("div",{className:"rnTextFieldQuantity "+this.props.Model.Options.QuantityPosition},o.createElement("div",{className:"rednaoLabel"},o.createElement("label",{style:{fontWeight:"bold"}},this.props.Model.Options.QuantityLabel)),o.createElement("input",{className:"rnInputQuantity",placeholder:this.Model.Options.QuantityPlaceholder,style:{width:"100%"},type:"number",value:this.Model.Quantity,onChange:function(t){e.Model.SetQuantity(e.Model.ParseNumber(t.target.value)),e.Model.FireValueChanged()}}))}},{key:"GetInput",value:function(e){var t=this;return o.createElement("div",{className:"rnTextFieldInput "+e+(this.Model.IsFocused?" RNFocus":"")},this.GetLabel(),o.createElement(b.IconOrImagePlaceholder,{Icon:this.props.Model.Options.Icon,Model:this.Model},(function(e){return o.createElement(I,{onFocus:function(){t.Model.IsFocused=!0,t.Model.Refresh()},onBlur:function(){t.Model.IsFocused=!1,t.Model.Refresh()},maskChar:t.Model.Options.MaskChar,mask:t.Model.Options.Mask,className:"rnInputPrice",placeholder:t.props.Model.Options.Placeholder,style:w({width:"100%"},e),type:"text",value:t.Model.Text,onChange:function(e){return t.OnChange(e)}})})))}},{key:"OnChange",value:function(e){this.Model.SetText(e.target.value)}}])&&S(n.prototype,r),a&&S(n,a),t}(r.FBFieldWithPriceBase);E.defaultProps={},g.EventManager.Subscribe(a.GetModel,(function(e){if(e.Options.Type==u.FieldTypeEnum.Masked)return new y(e.Options,e.parent).Initialize(e.PreviousData)})),g.EventManager.Subscribe(s.GetFieldOptions,(function(e){if(e.Type==u.FieldTypeEnum.Masked)return new c.a})),g.EventManager.Subscribe(l.GetField,(function(e){if(e.Model.Options.Type==u.FieldTypeEnum.Masked)return o.createElement(E,{Model:e.Model})}))},187:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/SubComponents/IconOrImagePlaceholder")},2:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Events/EventManager")},29:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetFieldOptions")},3:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldBase.options")},30:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetField")},31:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetModel")},40:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase")},47:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase.Model")},524:function(e,t,n){"use strict";n.d(t,"a",(function(){return C})),n.d(t,"b",(function(){return P}));var o,r,i,a,u=n(6),s=n(3),l=n(9);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t,n,o){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(o):void 0})}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function h(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?m(e):t}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b,O,k,w,M,S,P,C=(o=Object(l.StoreDataType)(Object),a=function(e){function t(){var e,n;p(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(n=h(this,(e=y(t)).call.apply(e,[this].concat(r)))).DefaultText=void 0,n.Placeholder=void 0,n.MaskType=void 0,n.Mask="",n.ShowQuantitySelector=void 0,n.MaskChar=void 0,f(n,"Icon",i,m(n)),n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,e),n=t,(o=[{key:"LoadDefaultValues",value:function(){v(y(t.prototype),"LoadDefaultValues",this).call(this),this.Type=s.FieldTypeEnum.Masked,this.Label="Mask",this.MaskType=P.Phone,this.Mask="(999)99-999-999",this.MaskChar="_",this.ShowQuantitySelector=!1,this.QuantityPosition="bottom",this.QuantityMaximumValue=0,this.QuantityMinimumValue=0,this.QuantityDefaultValue="",this.QuantityPlaceholder="",this.QuantityLabel="Quantity",this.Placeholder="",this.DefaultText="",this.PriceType=u.PriceTypeEnum.none,this.Icon={ImageType:"none",Ref:null}}}])&&d(n.prototype,o),r&&d(n,r),t}(u.FBFieldWithPriceBaseOptions),b=(r=a).prototype,O="Icon",k=[o],w={configurable:!0,enumerable:!0,writable:!0,initializer:null},S={},Object.keys(w).forEach((function(e){S[e]=w[e]})),S.enumerable=!!S.enumerable,S.configurable=!!S.configurable,("value"in S||S.initializer)&&(S.writable=!0),S=k.slice().reverse().reduce((function(e,t){return t(b,O,e)||e}),S),M&&void 0!==S.initializer&&(S.value=S.initializer?S.initializer.call(M):void 0,S.initializer=void 0),void 0===S.initializer&&(Object.defineProperty(b,O,S),S=null),i=S,r);!function(e){e.Phone="phone",e.CreditCard="credit_card",e.Custom="custom"}(P||(P={}))},6:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase.Options")},9:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Store/StoreBase")}});