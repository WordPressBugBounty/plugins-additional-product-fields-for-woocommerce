(window.webpackJsonpRedNao_name_=window.webpackJsonpRedNao_name_||[]).push([["LabelsStepRenderer"],{1040:function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.r(t),n.d(t,"default",(function(){return h}));var a=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=i(this,u(t).call(this,e))).state={},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(t,e),n=t,(o=[{key:"render",value:function(){return null}}])&&r(n.prototype,o),a&&r(n,a),t}(n(0).Component);a.defaultProps={};var l=n(197);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var m=n(0),h=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=s(this,y(t).call(this,e))).state={},n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,e),n=t,(o=[{key:"componentDidMount",value:function(){var e=this;this.props.Model.OnRefresh.Subscribe(this,(function(){return e.forceUpdate()}))}},{key:"componentWillUnmount",value:function(){this.props.Model.OnRefresh.Unsubscribe(this)}},{key:"render",value:function(){var e=this;return this.props.Behavior.GenerateContainer(m.createElement("ul",{style:{width:"100%",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",listStyle:"none",margin:0,padding:0}},this.props.Model.StepOptions.Steps.map((function(t,n){return e.props.Behavior.GenerateItem(t,m.createElement("li",{onClick:function(){return e.props.StepSelected(t)},style:{display:"flex",alignItems:"center"},className:"rnStepLabels "+(n<e.props.Model.StepModel.CurrentStepIndex?"rnValidated ":"")+e.props.Model.GetStepClasses(t)},"none"!=t.Icon.ImageType&&m.createElement(l.IconOrImageDisplayer,{styles:{color:null,width:"auto",marginRight:3},icon:t.Icon}),m.createElement("span",null,t.Title)))}))))}}])&&p(n.prototype,o),r&&p(n,r),t}(a);h.defaultProps={}}}]);