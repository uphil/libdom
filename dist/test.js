!function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="/assets/",n(0)}([function(e,n,t){e.exports=t(8)},function(e,n,t){"use strict";var o,r=t(2),c=t(3),i=t(4),o=t(7),u={version:r.version,info:i,on:o.on,un:o.un,purge:o.purge,dispatch:o.fire};i?o.chain=u:c.overrideMethods(u),e.exports=u},function(e,n){e.exports={name:"libdom",version:"0.0.1",description:"Browser library that normalizes DOM operations",main:"dist/index.js",scripts:{test:'echo "Error: no test specified" && exit 1',prestart:"node_modules/.bin/webpack --hide-modules",start:"node webpack.dev.server.js",build:"node_modules/.bin/webpack --hide-modules"},repository:{type:"git",url:"git+https://github.com/diko316/libdom.git"},keywords:["DOM","HTML","HTML5","XHTML","Browser","Cross-browser"],author:"Diko Tech Slave",license:"MIT",bugs:{url:"https://github.com/diko316/libdom/issues"},homepage:"https://github.com/diko316/libdom#readme",devDependencies:{"css-loader":"^0.25.0",eslint:"^3.6.0","eslint-loader":"^1.5.0",express:"^4.14.0","extract-text-webpack-plugin":"^1.0.1","file-loader":"^0.9.0","html-loader":"^0.4.4","html-webpack-plugin":"^2.22.0","json-loader":"^0.5.4",less:"^2.7.1","less-loader":"^2.2.3","style-loader":"^0.13.1","url-loader":"^0.5.7",webpack:"^1.13.2","webpack-dev-middleware":"^1.8.2","webpack-dev-server":"^1.16.1","webpack-hot-middleware":"^2.12.2"}}},function(e,n){"use strict";function t(){throw new Error("Unable to proceed, not running in a browser.")}function o(e,n){var o,r=Object.prototype,c=Function,i=r.hasOwnProperty;if("[object Object]"===r.toString.call(e)){n instanceof c||(n=t);for(o in e)i.call(e,o)&&e[o]instanceof c&&(e[o]=n)}return e}e.exports={notBrowser:t,overrideMethods:o}},function(e,n,t){"use strict";var o=t(5),r=!1;o&&(r={browser:o,event:t(6)}),e.exports=r},function(e,n){(function(n){"use strict";function t(){var e,t=n,o=!1;return t===t.window&&(e=t.document,e&&(e.defaultView||e.parentWindow)===t&&(o=!0)),e=null,t=null,o}function o(){return!!r&&"CSS1Compat"===n.document.compatMode}var r=t(),c=!1;r&&(c={browser:r,strict:o()}),e.exports=c}).call(n,function(){return this}())},function(e,n){(function(n){"use strict";var t=Function,o=n,r=o.document;e.exports={w3c:o.addEventListener instanceof t,ie:o.attachEvent instanceof t,customEvent:"CustomEvent"in o,creator:"createEvent"in r?"createEvent":"createEventObject"in r&&"createEventObject"},r=null,o=null}).call(n,function(){return this}())},function(e,n,t){(function(n){"use strict";function o(){var e,t,o;E&&(x=e=E.event,t=e.w3c,o=e.ie,h=t?s:o?d:b,w=t?a:o?f:b,g=t?l:o?p:b,r(n,"unload",m),r(n,"beforeunload",m))}function r(e,n,t,o){var r=[e,n,t,o,h(e,n,t,o)];return r.before=k,k=r,y.chain}function c(e,n,t,o){for(var r,c=k,i=c,u=null;i;i=i.before){if(e===i[0]&&n===i[1]&&t===i[2]&&o===i[3]){w(e,n,i[4]),r=i.before,u&&(u.before=r),i===c&&(c=r),delete i.before,i.splice(0,5);break}u=i}return k=c,c=i=u=r=null,y.chain}function i(e){for(var n,t=k,o=t,r=null,c=0===arguments.length;o;)n=o.before,c||e===o[0]?(w(o[0],o[1],o[4]),r&&(r.before=n),o===t&&(t=n),delete o.before,o.splice(0,5),o=n):(r=o,o=n);return k=t,t=o=r=n=null,y.chain}function u(e,n,t){return"[object Object]"!==Object.prototype.toString.call(t)&&(t={}),g(e,n,t),y.chain}function s(e,n,t,o){return t=v(t,o,!1),e.addEventListener(n,t,!1),t}function a(e,n,t){e.removeEventListener(n,t,!1)}function l(e,n,t){var o,r=Object.prototype.hasOwnProperty,c=e.ownerDocument.createEvent("Event");c.initEvent(n,t.bubbles!==!1,t.cancelable!==!1);for(o in t)r.call(t,o)&&(c[o]=t[o]);e.dispatchEvent(c)}function d(e,n,t,o){return t=v(t,o,!0),e.attachEvent("on"+n,t),t}function f(e,n,t){e.detachEvent("on"+n,t)}function p(e,n,t){var o,r=Object.prototype.hasOwnProperty,c=e.ownerDocument.createEventObject();for(o in t)r.call(t,o)&&(c[o]=t[o]);e.fireEvent("on"+n,c)}function b(){throw new Error("Event Model is not supported by the current Browser.")}function v(e,t,o){function r(r){var c=o;c===!0&&(r=n.event),e.call(t,r,c?r.srcElement:r.target),r=null}return r}function m(){i()}var h,w,g,E=t(4),k=null,x=null,y={chain:void 0,on:r,un:c,fire:u,purge:i};o(),e.exports=y}).call(n,function(){return this}())},function(e,n,t){"use strict";function o(){c.un(document,"click",o),alert("click!")}function r(e,n){c.dispatch(n,"no-end",{name:"no-end"})}var c=t(1);console.log("testing: ",c),c.on(document,"click",o),c.on(document.body,"mousedown",r),c.on(document.body,"mouseup",r),c.on(document.body,"click",r),c.on(document,"contextmenu",function(e){console.log("purge! ",e.type),c.purge(document.body)}),c.on(document,"no-end",function(e){console.log("no-end ",e)})}]);