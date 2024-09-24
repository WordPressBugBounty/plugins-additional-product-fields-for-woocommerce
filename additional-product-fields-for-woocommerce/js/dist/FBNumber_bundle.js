var RedNaoFBNumber=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1514)}({0:function(e,t){e.exports=React},1514:function(e,t,n){"use strict";n.r(t),n.d(t,"FBNumberField",(function(){return X}));var r=n(0),i=n(40),o=n(6),u=n(31),l=n(3),a=n(29),s=n(30),c=n(2),f=n(187),p=n(47),d=n(215);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e,t,n){return(b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(r){var i=Object.getOwnPropertyDescriptor(r,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var M,g,P,F,x=function(e){function t(e,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(r=h(this,O(t).call(this,e,n))).Text=void 0,r.IsFocused=void 0,r.MaximumValue="",r.MinimumValue="",r.IsFocused=!1,r}var n,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),n=t,(r=[{key:"InternalSerialize",value:function(e){b(O(t.prototype),"InternalSerialize",this).call(this,e),e.Value=this.GetValue()}},{key:"GetStoresInformation",value:function(){return!0}},{key:"GetIsUsed",value:function(){return!!b(O(t.prototype),"GetIsUsed",this).call(this)&&""!=this.Text.toString().trim()}},{key:"GetText",value:function(){return this.Text}},{key:"GetValue",value:function(){return this.GetIsVisible()?this.Text:""}},{key:"InitializeStartingValues",value:function(){this.Text=this.GetPreviousDataProperty("Value",this.Options.DefaultText),this.MaximumValue=this.Options.MaximumValue,this.MinimumValue=this.Options.MinimumValue,this.Quantity=this.GetPreviousDataProperty("Quantity",""==this.Options.QuantityDefaultValue?"":this.ParseNumber(this.Options.QuantityDefaultValue))}},{key:"SetMaximumValue",value:function(e){this.MaximumValue=e,this.SetText(this.Text)}},{key:"SetMinimumValue",value:function(e){this.MinimumValue=e,this.SetText(this.Text)}},{key:"GetDynamicFieldNames",value:function(){return["FBNumber"]}},{key:"SetText",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(""!=this.Text.trim()&&this.RemoveError("required"),t){var n=Number(this.MaximumValue),r=Number(this.MinimumValue),i=Number(e);""==e||isNaN(i)||(""==this.MaximumValue.trim()||isNaN(n)||(i=Math.min(i,n)),""==this.MinimumValue.trim()||isNaN(r)||(i=Math.max(r,i)),e=i.toString()),""!=this.Options.Decimals.trim()&&Number(this.Options.Decimals.trim())&&Number(e)&&(e=Number(e).toFixed(Number(this.Options.Decimals.trim())))}this.Text=e,this.calculator instanceof d.GlobalQuantityCalculator||(this.Quantity=e.length>0&&0==this.Quantity?1:this.Quantity),this.FireValueChanged()}},{key:"GetStep",value:function(){return!Number(this.Options.Decimals)||Number(this.Options.Decimals)<=0?1:"."+"0".repeat(Number(this.Options.Decimals)-1)+"1"}}])&&m(n.prototype,r),i&&m(n,i),t}(p.FBFieldWithPriceBaseModel),S=n(9);function N(e){return(N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(e,t,n,r){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}function w(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function B(e,t){return!t||"object"!==N(t)&&"function"!=typeof t?V(e):t}function V(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e,t,n){return(I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=R(e)););return e}(e,t);if(r){var i=Object.getOwnPropertyDescriptor(r,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function R(e){return(R=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var D,G,_,Q,k,C,z=(M=Object(S.StoreDataType)(Object),F=function(e){function t(){var e,n;w(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(n=B(this,(e=R(t)).call.apply(e,[this].concat(i)))).DefaultText=void 0,n.Placeholder=void 0,n.ShowQuantitySelector=void 0,n.FreeCharOrWords=0,n.IgnoreSpaces=void 0,j(n,"Icon",P,V(n)),n.MinimumValue="",n.MaximumValue="",n.ReadOnly=void 0,n.Decimals=void 0,n}var n,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(t,e),n=t,(r=[{key:"LoadDefaultValues",value:function(){I(R(t.prototype),"LoadDefaultValues",this).call(this),this.Type=l.FieldTypeEnum.Number,this.Label="Number",this.ReadOnly=!1,this.IgnoreSpaces=!1,this.ShowQuantitySelector=!1,this.QuantityPosition="bottom",this.QuantityMaximumValue=0,this.QuantityMinimumValue=0,this.QuantityDefaultValue="",this.QuantityPlaceholder="",this.QuantityLabel="Quantity",this.Icon={ImageType:"none",Ref:null},this.Decimals="",this.MinimumValue="",this.MaximumValue="",this.Placeholder="",this.DefaultText="",this.FreeCharOrWords=0}}])&&T(n.prototype,r),i&&T(n,i),t}(o.FBFieldWithPriceBaseOptions),D=(g=F).prototype,G="Icon",_=[M],Q={configurable:!0,enumerable:!0,writable:!0,initializer:null},C={},Object.keys(Q).forEach((function(e){C[e]=Q[e]})),C.enumerable=!!C.enumerable,C.configurable=!!C.configurable,("value"in C||C.initializer)&&(C.writable=!0),C=_.slice().reverse().reduce((function(e,t){return t(D,G,e)||e}),C),k&&void 0!==C.initializer&&(C.value=C.initializer?C.initializer.call(k):void 0,C.initializer=void 0),void 0===C.initializer&&(Object.defineProperty(D,G,C),C=null),P=C,g);function W(e){return(W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?q(n,!0).forEach((function(t){U(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function U(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function H(e,t){return!t||"object"!==W(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function J(e){return(J=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function K(e,t){return(K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var X=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),H(this,J(t).call(this,e))}var n,i,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}(t,e),n=t,(i=[{key:"componentWillReceiveProps",value:function(e,t){this.Model.Parent.IsDesign&&(this.Model.Text=this.Model.Options.DefaultText,this.Model.SetQuantity(""==this.Model.Options.QuantityDefaultValue?"":this.Model.ParseNumber(this.Model.Options.QuantityDefaultValue)))}},{key:"SubRender",value:function(){return this.props.Model.Options.ShowQuantitySelector&&this.props.Model.Options.PriceType!=o.PriceTypeEnum.quantity?"bottom"==this.props.Model.Options.QuantityPosition||"right"==this.props.Model.Options.QuantityPosition?r.createElement(r.Fragment,null,this.GetInput(this.props.Model.Options.QuantityPosition),this.GetQuantityInput(),this.GetPriceOrRequiredBox()):r.createElement(r.Fragment,null,this.GetQuantityInput(),this.GetInput(this.props.Model.Options.QuantityPosition),this.GetPriceOrRequiredBox()):r.createElement(r.Fragment,null,this.GetInput(""),this.GetPriceOrRequiredBox())}},{key:"GetInput",value:function(e){var t=this;return r.createElement("div",{className:"rnTextFieldInput "+e+(this.Model.IsFocused?" RNFocus":"")},this.GetLabel(),r.createElement(f.IconOrImagePlaceholder,{Icon:this.props.Model.Options.Icon,Model:this.Model},(function(e){return r.createElement("input",{step:t.Model.GetStep(),readOnly:t.Model.Options.ReadOnly,min:isNaN(Number(t.Model.MinimumValue))?void 0:t.Model.MinimumValue,max:isNaN(Number(t.Model.MaximumValue))?void 0:t.Model.MaximumValue,onChange:function(e){console.log("test")},onFocus:function(){t.Model.IsFocused=!0,t.Model.Refresh()},onBlur:function(e){t.Model.IsFocused=!1,t.Model.SetText(e.target.value,!0),t.Model.Refresh()},className:"rnInputPrice",placeholder:t.props.Model.Options.Placeholder,style:L({width:"100%"},e),type:"number",value:t.Model.Text,onInput:function(e){return t.Model.SetText(e.target.value,!1)}})})))}},{key:"OnChange",value:function(e){this.Model.SetText(e.target.value)}}])&&A(n.prototype,i),u&&A(n,u),t}(i.FBFieldWithPriceBase);X.defaultProps={},c.EventManager.Subscribe(u.GetModel,(function(e){if(e.Options.Type==l.FieldTypeEnum.Number)return new x(e.Options,e.parent).Initialize(e.PreviousData)})),c.EventManager.Subscribe(a.GetFieldOptions,(function(e){if(e.Type==l.FieldTypeEnum.Number)return new z})),c.EventManager.Subscribe(s.GetField,(function(e){if(e.Model.Options.Type==l.FieldTypeEnum.Number)return r.createElement(X,{Model:e.Model})}))},187:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/SubComponents/IconOrImagePlaceholder")},2:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Events/EventManager")},215:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Core/Calulators/GlobalQuantityCalculator")},29:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetFieldOptions")},3:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldBase.options")},30:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetField")},31:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetModel")},40:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase")},47:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase.Model")},6:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase.Options")},9:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Store/StoreBase")}});