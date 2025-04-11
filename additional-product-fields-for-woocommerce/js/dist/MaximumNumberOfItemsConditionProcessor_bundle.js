var RedNaoMaximumNumberOfItemsConditionProcessor=function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1538)}({129:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/CreateConditionOptions")},1538:function(e,t,n){"use strict";n.r(t),n.d(t,"MaximumNumberOfItemsConditionProcessor",(function(){return I}));var o=n(243),i=n(5),r=n(2),u=n(240),a=n(129);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e,t,n){return(d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=p(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(){var e,n;c(this,t);for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];return(n=s(this,(e=p(t)).call.apply(e,[this].concat(i)))).MaximumNumberOfItems=void 0,n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,e),n=t,r=[{key:"GetName",value:function(){return"ChangeOptionsPriceConditionOptions"}}],(o=[{key:"LoadDefaultValues",value:function(){d(p(t.prototype),"LoadDefaultValues",this).call(this),this.MaximumNumberOfItems=0,this.Type=i.ConditionTypeEnum.MaximumNumberOfItems}}])&&f(n.prototype,o),r&&f(n,r),t}(i.ConditionOptionsBase),b=n(32);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function g(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function x(e,t,n){return(x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var I=function(e){function t(){var e,n;v(this,t);for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];return(n=g(this,(e=C(t)).call.apply(e,[this].concat(i)))).Options=void 0,n.Field=void 0,n}var n,i,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(t,e),n=t,(i=[{key:"Initialize",value:function(e,t){throw Error("Invalid initialization, please use initialize with fields instead")}},{key:"ExecuteFalseAction",value:function(e){t.ActiveCondition.get(this.Field.Options.Id)==this.Options.Id&&t.ActiveCondition.delete(this.Field.Options.Id)}},{key:"ConditionProcessingEnded",value:function(){t.ActiveCondition.has(this.Field.Options.Id)||null!=this.Field.SetMaximumNumberOfItems&&this.Field.SetMaximumNumberOfItems(b.Sanitizer.SanitizeNumber(this.Field.Options.MaximumNumberOfItems))}},{key:"ExecuteTruAction",value:function(e){t.ActiveCondition.set(this.Field.Options.Id,this.Options.Id),null!=this.Field.SetMaximumNumberOfItems&&this.Field.SetMaximumNumberOfItems(this.Options.MaximumNumberOfItems)}},{key:"GetUniqueId",value:function(){return"MaximumNumberOfItems_"+this.Field.Options.Id.toString()}},{key:"GetExecutionOrder",value:function(){return o.ExecutionOrder.FalseFirst}},{key:"InitializeWidthFields",value:function(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return this.Field=e,x(C(t.prototype),"Initialize",this).call(this,e.FormBuilder,n,o)}}])&&h(n.prototype,i),r&&h(n,r),t}(o.ConditionProcessorBase);I.ActiveCondition=new Map,r.EventManager.Subscribe(u.InitializeAdditionalCondition,(function(e){if(e.Condition.Type==i.ConditionTypeEnum.MaximumNumberOfItems)return(new I).InitializeWidthFields(e.Field,e.Condition,e.chain)})),r.EventManager.Subscribe(a.CreateConditionOptions,(function(e){if(e.condition==i.ConditionTypeEnum.MaximumNumberOfItems)return new y}))},2:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Events/EventManager")},240:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/InitializeAdditionalCondition")},243:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Core/Conditions/ConditionProcessorBase")},32:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Utilities/Sanitizer")},5:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/ConditionOptions")}});