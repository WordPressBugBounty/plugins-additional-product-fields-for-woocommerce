var RedNaoFBFile=function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1506)}({0:function(e,t){e.exports=React},1506:function(e,t,n){"use strict";n.r(t),n.d(t,"FBFile",(function(){return j}));var i=n(0),o=n(40),r=n(3),a=n(27),s=n(28);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function f(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e,t,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var i=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}(e,t);if(i){var o=Object.getOwnPropertyDescriptor(i,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(){var e,n;u(this,t);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return(n=f(this,(e=d(t)).call.apply(e,[this].concat(o)))).Value=void 0,n.AllowMultipleFiles=void 0,n.AllowedExtensions=void 0,n.ButtonLabel=void 0,n.Placeholder=void 0,n.ShowImagesInCart=void 0,n}var n,i,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,e),n=t,(i=[{key:"LoadDefaultValues",value:function(){p(d(t.prototype),"LoadDefaultValues",this).call(this),this.Value="",this.Type=r.FieldTypeEnum.FileUpload,this.AllowMultipleFiles=!1,this.AllowedExtensions="",this.ButtonLabel="Add File",this.Label="File",this.Placeholder="Drag or click here to add a file",this.ShowImagesInCart=!0}}])&&c(n.prototype,i),o&&c(n,o),t}(n(6).FBFieldWithPriceBaseOptions),v=n(20);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function F(e,t,n){return t&&b(e.prototype,t),n&&b(e,n),e}function _(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e,t,n){return(O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var i=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}(e,t);if(i){var o=Object.getOwnPropertyDescriptor(i,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var N=function(e){function t(e,n){var i;return g(this,t),(i=_(this,E(t).call(this,e,n))).Files=void 0,i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(t,e),F(t,[{key:"GetValue",value:function(){return this.Files.filter((function(e){return e.File.length>0||""!=e.Path})).map((function(e){return{Id:e.Id,Name:e.Name,Path:e.Path}}))}},{key:"GetStoresInformation",value:function(){return!0}},{key:"CreateRow",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new P(e)}},{key:"InternalSerialize",value:function(e){O(E(t.prototype),"InternalSerialize",this).call(this,e),e.Value=this.GetValue()}},{key:"GetIsUsed",value:function(){return!!O(E(t.prototype),"GetIsUsed",this).call(this)&&this.GetValue().length>0}},{key:"ListValueChanged",value:function(e,t,n){this.Refresh()}},{key:"CreateRowAt",value:function(e){var t=this.Files.slice(0);t.splice(t.indexOf(e)+1,0,this.CreateRow()),this.Files=t,this.FireValueChanged()}},{key:"GetDynamicFieldNames",value:function(){return["FBFile"]}},{key:"InitializeStartingValues",value:function(){var e=this.GetPreviousDataProperty("Value",[]);if(0!=e.length){this.Files=[];var t=!0,n=!1,i=void 0;try{for(var o,r=e[Symbol.iterator]();!(t=(o=r.next()).done);t=!0){var a=o.value;this.Files.push(new P(a.Name,a.Path))}}catch(e){n=!0,i=e}finally{try{t||null==r.return||r.return()}finally{if(n)throw i}}return this.Quantity=this.GetPreviousDataProperty("Quantity",this.ParseNumber(this.Options.QuantityDefaultValue)),void this.Refresh()}this.CreateRow(),this.Files=[this.CreateRow()]}}]),t}(n(47).FBFieldWithPriceBaseModel),P=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";g(this,e),this.Name=t,this.Id=void 0,this.Ref=void 0,this.Highlight=void 0,this.File=void 0,this.Path=void 0,this.File=[],this.Highlight=!1,this.Id=++e._lastId,this.Path=n,this.FileRefUpdated=this.FileRefUpdated.bind(this)}return F(e,[{key:"FileRefUpdated",value:function(e){this.Ref=e}}]),e}();P._lastId=0;var M=n(29),C=n(2),x=n(206),S=n(19);function R(e){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function I(e,t){return!t||"object"!==R(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function D(e,t){return(D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var j=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),I(this,T(t).call(this,e))}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&D(e,t)}(t,e),n=t,(o=[{key:"IsDragAndDropSupported",value:function(){var e=document.createElement("div");return("draggable"in e||"ondragstart"in e&&"ondrop"in e)&&"FormData"in window&&"FileReader"in window}},{key:"SubRender",value:function(){return this.props.Model.Options.ShowQuantitySelector?"bottom"==this.props.Model.Options.QuantityPosition||"right"==this.props.Model.Options.QuantityPosition?i.createElement(i.Fragment,null,this.GetInput(this.props.Model.Options.QuantityPosition),this.GetQuantityInput(),this.GetPriceOrRequiredBox()):i.createElement(i.Fragment,null,this.GetQuantityInput(),this.GetInput(this.props.Model.Options.QuantityPosition),this.GetPriceOrRequiredBox()):i.createElement(i.Fragment,null,this.GetInput(""),this.GetPriceOrRequiredBox())}},{key:"GetQuantityInput",value:function(){var e=this;return i.createElement("div",{className:"rnTextFieldQuantity "+this.props.Model.Options.QuantityPosition},i.createElement("div",{className:"rednaoLabel"},i.createElement("label",{style:{fontWeight:"bold"}},this.props.Model.Options.QuantityLabel)),i.createElement("input",{className:"rnInputQuantity",placeholder:this.Model.Options.QuantityPlaceholder,style:{width:"100%"},type:"number",value:this.Model.Quantity,onChange:function(t){e.Model.SetQuantity(e.Model.ParseNumber(t.target.value)),e.Model.FireValueChanged()}}))}},{key:"GetInput",value:function(e){return i.createElement("div",{style:{width:"100%"},className:"rnList "+e},this.GetLabel(),i.createElement("table",{className:"rnFileContainer",style:{width:"100%",borderCollapse:"collapse",border:"none",margin:0}},i.createElement("tbody",null,this.GenerateRows())))}},{key:"GenerateRows",value:function(){var e=this;return this.Model.Files.map((function(t){return i.createElement("tr",{key:t.Id,className:"rednao"},i.createElement("td",{style:{border:"none",padding:"0 0"}},i.createElement("div",{style:{display:"flex",alignItems:"center"}},i.createElement("div",{style:{width:"calc(100% - 25px",display:"inline-block"}},0==t.File.length&&""==t.Path?i.createElement("div",{style:{padding:"0 5px",border:"1px dashed",cursor:"pointer",flexGrow:1,minHeight:33.5,display:"flex",alignItems:"center"},className:"rnFilePlaceholder "+(t.Highlight?"active":""),onClick:function(e){t.Ref.click()},onDragLeave:function(n){return e.OnDragExit(t)},onDragEnter:function(n){return e.OnDragEnter(n,t)},onDragOver:function(n){return e.OnDragOver(n,t)},onDrop:function(n){return e.OnDrop(t,n)}},i.createElement("span",null,e.props.Model.Options.Placeholder)):i.createElement("div",{style:{padding:"0 5px",border:"1px solid #ccc",flexGrow:1,minHeight:33.5,display:"flex",alignItems:"center"}},i.createElement("span",null,0==t.File.length?t.Name:t.File[0].name))),i.createElement("input",{ref:t.FileRefUpdated,accept:e.Model.Options.AllowedExtensions,type:"file",key:t.Id,name:"rnProFile"+e.Model.Options.Id+"@"+t.Id,style:{display:"none"},onChange:function(n){return e.FileChanged(t,n.target.files)}}),i.createElement("div",{style:{width:25,display:"inline-block"}},i.createElement("div",{style:{marginLeft:2,display:"flex"}},t.File.length>0||""==t.File.Path&&i.createElement(S.FontAwesomeIcon,{onClick:function(){return e.RemoveFile(t)},className:"RNFBFileRemove",style:{fontSize:18},icon:x.faMinusCircle}))))))}))}},{key:"OnDragOver",value:function(e,t){this.IsDragAndDropSupported()&&(e.preventDefault(),0==t.Highlight&&(t.Highlight=!0,this.forceUpdate()))}},{key:"OnDrop",value:function(e,t){if(this.IsDragAndDropSupported()){t.preventDefault(),e.Highlight=!1;var n=t.dataTransfer.files;0!=n.length?n.length>0&&!this.ExtensionIsValid(n[0].name)?n.length>0&&(e.File=[],e.Ref.value=""):(e.File=t.dataTransfer.files,e.Name=t.dataTransfer.files[0].name,e.Ref.files=e.File,0==this.Model.Files.filter((function(e){return 0==e.File.length})).length&&this.Model.Options.AllowMultipleFiles&&this.Model.Files.push(this.Model.CreateRow()),this.Model.FireValueChanged(),this.forceUpdate()):this.RemoveFile(e)}}},{key:"ExtensionIsValid",value:function(e){e=e.toLowerCase().trim();var t=this.Model.Options.AllowedExtensions.trim().split(",");return!(t.length>0&&!t.some((function(t){return e.endsWith(t.toLowerCase().trim())}))&&(v.a.SendErrorMessage(_rnt("Invalid file type")),this.forceUpdate(),1))}},{key:"OnDragEnter",value:function(e,t){this.IsDragAndDropSupported()&&(e.preventDefault(),t.Highlight=!0,this.forceUpdate())}},{key:"OnDragExit",value:function(e){this.IsDragAndDropSupported()&&(e.Highlight=!1,this.forceUpdate())}},{key:"FileChanged",value:function(e,t){var n=this;if(e.File=t,0==t.length&&this.Model.Files.length>1)this.RemoveFile(e);else{var i=e.File[0].name;if(!this.ExtensionIsValid(i))return e.File=[],void(e.Ref.value="");e.Name=e.File[0].name}this.Model.Options.AllowMultipleFiles&&0==this.Model.Files.filter((function(e){return 0==e.File.length})).length&&this.Model.Files.push(this.Model.CreateRow()),this.forceUpdate((function(){return n.Model.FireValueChanged()}))}},{key:"RemoveFile",value:function(e){var t=this;this.Model.Files.indexOf(e)>=0&&(this.Model.Files.splice(this.Model.Files.indexOf(e),1),0==this.Model.Files.length&&this.Model.Files.push(this.Model.CreateRow())),this.forceUpdate((function(){return t.Model.FireValueChanged()}))}}])&&k(n.prototype,o),r&&k(n,r),t}(o.FBFieldWithPriceBase);j.defaultProps={},C.EventManager.Subscribe(M.GetModel,(function(e){if(e.Options.Type==r.FieldTypeEnum.FileUpload)return new N(e.Options,e.parent).Initialize(e.PreviousData)})),C.EventManager.Subscribe(a.GetFieldOptions,(function(e){if(e.Type==r.FieldTypeEnum.FileUpload)return new y})),C.EventManager.Subscribe(s.GetField,(function(e){if(e.Model.Options.Type==r.FieldTypeEnum.FileUpload)return i.createElement(j,{Model:e.Model})}))},19:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Controls/FontAwesome/FontAwesomeIcon")},2:function(e,t){e.exports=RedNaoSharedCore.default("shared/core/Events/EventManager")},20:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var i,o=function(){return(o=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},r=function(){function e(e){this.options=e,this.listeners={}}return e.prototype.on=function(e,t){var n=this.listeners[e]||[];this.listeners[e]=n.concat([t])},e.prototype.triggerEvent=function(e,t){var n=this;(this.listeners[e]||[]).forEach((function(e){return e({target:n,event:t})}))},e}();!function(e){e[e.Add=0]="Add",e[e.Remove=1]="Remove"}(i||(i={}));var a,s=function(){function e(){this.notifications=[]}return e.prototype.push=function(e){this.notifications.push(e),this.updateFn(e,i.Add,this.notifications)},e.prototype.splice=function(e,t){var n=this.notifications.splice(e,t)[0];return this.updateFn(n,i.Remove,this.notifications),n},e.prototype.indexOf=function(e){return this.notifications.indexOf(e)},e.prototype.onUpdate=function(e){this.updateFn=e},e}();!function(e){e.Dismiss="dismiss",e.Click="click"}(a||(a={}));var l={types:[{type:"success",className:"notyf__toast--success",backgroundColor:"#3dc763",icon:{className:"notyf__icon--success",tagName:"i"}},{type:"error",className:"notyf__toast--error",backgroundColor:"#ed3d3d",icon:{className:"notyf__icon--error",tagName:"i"}}],duration:2e3,ripple:!0,position:{x:"right",y:"bottom"},dismissible:!1},u=function(){function e(){this.notifications=[],this.events={},this.X_POSITION_FLEX_MAP={left:"flex-start",center:"center",right:"flex-end"},this.Y_POSITION_FLEX_MAP={top:"flex-start",center:"center",bottom:"flex-end"};var e=document.createDocumentFragment(),t=this._createHTMLElement({tagName:"div",className:"notyf"});e.appendChild(t),document.body.appendChild(e),this.container=t,this.animationEndEventName=this._getAnimationEndEventName(),this._createA11yContainer()}return e.prototype.on=function(e,t){var n;this.events=o(o({},this.events),((n={})[e]=t,n))},e.prototype.update=function(e,t){t===i.Add?this.addNotification(e):t===i.Remove&&this.removeNotification(e)},e.prototype.removeNotification=function(e){var t,n,i=this,o=this._popRenderedNotification(e);o&&((t=o.node).classList.add("notyf__toast--disappear"),t.addEventListener(this.animationEndEventName,n=function(e){e.target===t&&(t.removeEventListener(i.animationEndEventName,n),i.container.removeChild(t))}))},e.prototype.addNotification=function(e){var t=this._renderNotification(e);this.notifications.push({notification:e,node:t}),this._announce(e.options.message||"Notification")},e.prototype._renderNotification=function(e){var t,n=this._buildNotificationCard(e),i=e.options.className;return i&&(t=n.classList).add.apply(t,i.split(" ")),this.container.appendChild(n),n},e.prototype._popRenderedNotification=function(e){for(var t=-1,n=0;n<this.notifications.length&&t<0;n++)this.notifications[n].notification===e&&(t=n);if(-1!==t)return this.notifications.splice(t,1)[0]},e.prototype.getXPosition=function(e){var t;return(null===(t=null==e?void 0:e.position)||void 0===t?void 0:t.x)||"right"},e.prototype.getYPosition=function(e){var t;return(null===(t=null==e?void 0:e.position)||void 0===t?void 0:t.y)||"bottom"},e.prototype.adjustContainerAlignment=function(e){var t=this.X_POSITION_FLEX_MAP[this.getXPosition(e)],n=this.Y_POSITION_FLEX_MAP[this.getYPosition(e)],i=this.container.style;i.setProperty("justify-content",n),i.setProperty("align-items",t)},e.prototype._buildNotificationCard=function(e){var t=this,n=e.options,i=n.icon;this.adjustContainerAlignment(n);var o=this._createHTMLElement({tagName:"div",className:"notyf__toast"}),r=this._createHTMLElement({tagName:"div",className:"notyf__ripple"}),s=this._createHTMLElement({tagName:"div",className:"notyf__wrapper"}),l=this._createHTMLElement({tagName:"div",className:"notyf__message"});l.innerHTML=n.message||"";var u=n.background||n.backgroundColor;if(i){var c=this._createHTMLElement({tagName:"div",className:"notyf__icon"});if(("string"==typeof i||i instanceof String)&&(c.innerHTML=new String(i).valueOf()),"object"==typeof i){var f=i.tagName,p=void 0===f?"i":f,d=i.className,h=i.text,y=i.color,v=void 0===y?u:y,m=this._createHTMLElement({tagName:p,className:d,text:h});v&&(m.style.color=v),c.appendChild(m)}s.appendChild(c)}if(s.appendChild(l),o.appendChild(s),u&&(n.ripple?(r.style.background=u,o.appendChild(r)):o.style.background=u),n.dismissible){var g=this._createHTMLElement({tagName:"div",className:"notyf__dismiss"}),b=this._createHTMLElement({tagName:"button",className:"notyf__dismiss-btn"});g.appendChild(b),s.appendChild(g),o.classList.add("notyf__toast--dismissible"),b.addEventListener("click",(function(n){var i,o;null===(o=(i=t.events)[a.Dismiss])||void 0===o||o.call(i,{target:e,event:n}),n.stopPropagation()}))}o.addEventListener("click",(function(n){var i,o;return null===(o=(i=t.events)[a.Click])||void 0===o?void 0:o.call(i,{target:e,event:n})}));var F="top"===this.getYPosition(n)?"upper":"lower";return o.classList.add("notyf__toast--"+F),o},e.prototype._createHTMLElement=function(e){var t=e.tagName,n=e.className,i=e.text,o=document.createElement(t);return n&&(o.className=n),o.textContent=i||null,o},e.prototype._createA11yContainer=function(){var e=this._createHTMLElement({tagName:"div",className:"notyf-announcer"});e.setAttribute("aria-atomic","true"),e.setAttribute("aria-live","polite"),e.style.border="0",e.style.clip="rect(0 0 0 0)",e.style.height="1px",e.style.margin="-1px",e.style.overflow="hidden",e.style.padding="0",e.style.position="absolute",e.style.width="1px",e.style.outline="0",document.body.appendChild(e),this.a11yContainer=e},e.prototype._announce=function(e){var t=this;this.a11yContainer.textContent="",setTimeout((function(){t.a11yContainer.textContent=e}),100)},e.prototype._getAnimationEndEventName=function(){var e,t=document.createElement("_fake"),n={MozTransition:"animationend",OTransition:"oAnimationEnd",WebkitTransition:"webkitAnimationEnd",transition:"animationend"};for(e in n)if(void 0!==t.style[e])return n[e];return"animationend"},e}(),c=function(){function e(e){var t=this;this.dismiss=this._removeNotification,this.notifications=new s,this.view=new u;var n=this.registerTypes(e);this.options=o(o({},l),e),this.options.types=n,this.notifications.onUpdate((function(e,n){return t.view.update(e,n)})),this.view.on(a.Dismiss,(function(e){var n=e.target,i=e.event;t._removeNotification(n),n.triggerEvent(a.Dismiss,i)})),this.view.on(a.Click,(function(e){var t=e.target,n=e.event;return t.triggerEvent(a.Click,n)}))}return e.prototype.error=function(e){var t=this.normalizeOptions("error",e);return this.open(t)},e.prototype.success=function(e){var t=this.normalizeOptions("success",e);return this.open(t)},e.prototype.open=function(e){var t=this.options.types.find((function(t){return t.type===e.type}))||{},n=o(o({},t),e);this.assignProps(["ripple","position","dismissible"],n);var i=new r(n);return this._pushNotification(i),i},e.prototype.dismissAll=function(){for(;this.notifications.splice(0,1););},e.prototype.assignProps=function(e,t){var n=this;e.forEach((function(e){t[e]=null==t[e]?n.options[e]:t[e]}))},e.prototype._pushNotification=function(e){var t=this;this.notifications.push(e);var n=void 0!==e.options.duration?e.options.duration:this.options.duration;n&&setTimeout((function(){return t._removeNotification(e)}),n)},e.prototype._removeNotification=function(e){var t=this.notifications.indexOf(e);-1!==t&&this.notifications.splice(t,1)},e.prototype.normalizeOptions=function(e,t){var n={type:e};return"string"==typeof t?n.message=t:"object"==typeof t&&(n=o(o({},n),t)),n},e.prototype.registerTypes=function(e){var t=(e&&e.types||[]).slice();return l.types.map((function(e){var n=-1;t.forEach((function(t,i){t.type===e.type&&(n=i)}));var i=-1!==n?t.splice(n,1)[0]:{};return o(o({},e),i)})).concat(t)},e}();function f(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var p=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,i;return t=e,i=[{key:"GetInstance",value:function(){return null==e._instance&&(e._instance=new c({position:{x:"center",y:"top"},dismissible:!0})),e._instance}},{key:"SetOptions",value:function(e){}},{key:"SendErrorMessage",value:function(t){e.GetInstance().error(t)}},{key:"SendSuccess",value:function(t){e.GetInstance().success(t)}},{key:"SendWarning",value:function(t){e.GetInstance().error(t)}}],(n=null)&&f(t.prototype,n),i&&f(t,i),e}();p._instance=null,p.SetOptions({positionClass:"toast-top-center"}),window.ToastService=p},206:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=[],o="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z";t.definition={prefix:"fas",iconName:"minus-circle",icon:[512,512,i,"f056",o]},t.faMinusCircle=t.definition,t.prefix="fas",t.iconName="minus-circle",t.width=512,t.height=512,t.ligatures=i,t.unicode="f056",t.svgPathData=o},27:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetFieldOptions")},28:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetField")},29:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Events/GetModel")},3:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldBase.options")},40:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase")},47:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase.Model")},6:function(e,t){e.exports=RedNaoFormBuilder.default("FormBuilder/Fields/Core/FBFieldWithPriceBase.Options")}});