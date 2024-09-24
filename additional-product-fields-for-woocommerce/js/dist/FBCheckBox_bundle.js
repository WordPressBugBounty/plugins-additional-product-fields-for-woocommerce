var RedNaoFBCheckBox=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1503)}({0:function(e,t){e.exports=React},114:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBMultipleOptionsBase.Model")},125:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBMultipleOptionsBase.Options")},1503:function(e,t,n){"use strict";n.r(t),n.d(t,"FBCheckBox",(function(){return C}));var o=n(0),r=n(6);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function l(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function a(e,t,n){return(a="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=c(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=function(e){function t(e,n){var o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(o=l(this,c(t).call(this,e,n))).MaximumNumberOfItems=void 0,o}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(t,e),n=t,(o=[{key:"InitializeStartingValues",value:function(){a(c(t.prototype),"InitializeStartingValues",this).call(this),this.MaximumNumberOfItems=this.Options.MaximumNumberOfItems}},{key:"GetDynamicFieldNames",value:function(){return["FBCheckBox"]}},{key:"SetMaximumNumberOfItems",value:function(e){for(;e>0&&e<this.SelectedValues.length&&this.SelectedValues.length>0;)this.SelectedValues.pop();this.MaximumNumberOfItems=e,this.Refresh()}},{key:"IsOptionDisabled",value:function(e){var n=a(c(t.prototype),"IsOptionDisabled",this).call(this,e);return n||this.MaximumNumberOfItems>0&&this.SelectedValues.length>=this.MaximumNumberOfItems&&this.SelectedValues.indexOf(e)<0}}])&&u(n.prototype,o),r&&u(n,r),t}(n(114).FBMultipleOptionsBaseModel),p=n(31),d=n(3),m=n(29),y=n(30);function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function g(e,t){return!t||"object"!==h(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=F(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function F(e){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function I(e,t){return(I=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var M=function(e){function t(){var e,n;b(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(n=g(this,(e=F(t)).call.apply(e,[this].concat(r)))).Placeholder=void 0,n.MaximumNumberOfItems=void 0,n.ShowOptionsPrice=void 0,n.ViewImageOnClick=void 0,n}var n,o,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&I(e,t)}(t,e),n=t,(o=[{key:"LoadDefaultValues",value:function(){v(F(t.prototype),"LoadDefaultValues",this).call(this),this.Type=d.FieldTypeEnum.Checkbox,this.Label="Checkbox",this.Placeholder="",this.PriceType=r.PriceTypeEnum.options,this.MaximumNumberOfItems=0,this.ShowOptionsPrice=!1,this.ViewImageOnClick=!1}}])&&O(n.prototype,o),i&&O(n,i),t}(n(125).FBMultipleOptionsBaseOptions),x=n(2),P=n(237),B=n(21),S=n(350),w=n(197);function R(e){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function k(e,t){return!t||"object"!==R(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var C=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),k(this,_(t).call(this,e))}var n,i,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(t,e),n=t,(i=[{key:"componentWillReceiveProps",value:function(e,t){this.Model.Parent.IsDesign&&(this.Model.Options.Options.find((function(e){return e.Selected})),this.Model.SelectedValues=this.Model.Options.Options.filter((function(e){return e.Selected})).map((function(e){return e.Id})),this.Model.Quantity=this.Model.Options.QuantityDefaultValue,this.Model.Refresh())}},{key:"SubRender",value:function(){return this.Model.Options.ShowQuantitySelector&&this.Model.Options.PriceType!=r.PriceTypeEnum.quantity?"bottom"==this.Model.Options.QuantityPosition||"right"==this.Model.Options.QuantityPosition?o.createElement(o.Fragment,null,this.GetInput(this.Model.Options.QuantityPosition),this.GetQuantityInput(),this.GetPriceOrRequiredBox()):o.createElement(o.Fragment,null,this.GetQuantityInput(),this.GetInput(this.Model.Options.QuantityPosition),this.GetPriceOrRequiredBox()):o.createElement(o.Fragment,null,this.GetInput(""),this.GetPriceOrRequiredBox())}},{key:"GetDynamicFieldNames",value:function(){return["FBCheckBox"]}},{key:"GetInput",value:function(e){var t=this;return o.createElement("div",{className:"rnTextFieldInput "+e},this.GetLabel(),this.Model.Options.Options.map((function(e){return o.createElement("div",{key:e.Id,style:{display:"flex",alignItems:"center",width:"100%"}},o.createElement("input",{disabled:t.Model.IsOptionDisabled(e.Id),name:t.GetOptionId(e.Id),id:t.GetOptionId(e.Id),onChange:function(n){return t.Model.ToggleSelection(e.Id,n.target.checked)},type:"checkbox",checked:t.Model.SelectedValues.indexOf(e.Id)>-1,value:e.Id}),o.createElement("label",{className:"rnOptionItem",htmlFor:t.GetOptionId(e.Id),style:{marginLeft:5,cursor:"pointer",display:"inline-flex",alignItems:"center"}},t.GetImageControl(e)," ",t.GetText(e,"Label"),null!=e.Tag&&o.createElement(w.IconOrImageDisplayer,{form:t.Model.RootFormBuilder,styles:{marginLeft:3},icon:e.Tag})),t.Model.Options.ShowOptionsPrice&&o.createElement(S.Price,{style:{flexGrow:1,textAlign:"right"},Amount:parseFloat(e.RegularPrice),SaleAmount:parseFloat(e.SalePrice)}))})))}},{key:"GetImageControl",value:function(e){var t=this;return"icon"==e.ImageType?o.createElement(B.FontAwesomeIcon,{className:"optionIcon",icon:null==e.Ref.Icon?this.Model.RootFormBuilder.GetIcon(e.Ref.Name):e.Ref,style:{display:"inline",marginRight:3}}):"image"==e.ImageType?o.createElement("div",{onClick:function(n){n.stopPropagation(),n.preventDefault(),t.ImageClicked(e)}},o.createElement("img",{className:"optionIcon",style:{maxWidth:13,maxHeight:13},src:e.Ref.URL,alt:"Image not available"})):null}},{key:"GetOptionId",value:function(e){var t=e.toString();t=this.props.Model.Options.Id+"_"+t;for(var n=this.props.Model.FormBuilder;null!=n.GetId();)t=n.GetId()+"_"+t,n=n.FormBuilder;return"field_"+t}},{key:"ImageClicked",value:function(e){this.Model.Options.ViewImageOnClick&&""!=e.Ref.URL&&x.EventManager.PublishRaisable("PreviewImage",{Image:e.Ref.URL})}}])&&E(n.prototype,i),u&&E(n,u),t}(P.FBMultipleOptionsBase);C.defaultProps={},x.EventManager.Subscribe(p.GetModel,(function(e){if(e.Options.Type==d.FieldTypeEnum.Checkbox)return new f(e.Options,e.parent).Initialize(e.PreviousData)})),x.EventManager.Subscribe(m.GetFieldOptions,(function(e){if(e.Type==d.FieldTypeEnum.Checkbox)return new M})),x.EventManager.Subscribe(y.GetField,(function(e){if(e.Model.Options.Type==d.FieldTypeEnum.Checkbox)return o.createElement(C,{Model:e.Model})}))},197:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/SubComponents/IconOrImageDisplayer")},2:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Events/EventManager")},21:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Controls/FontAwesome/FontAwesomeIcon")},237:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBMultipleOptionsBase")},29:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetFieldOptions")},3:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldBase.options")},30:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetField")},31:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetModel")},350:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Utilities/Components/Price")},6:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase.Options")}});