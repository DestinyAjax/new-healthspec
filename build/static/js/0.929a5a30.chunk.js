(this.webpackJsonpisomorphic=this.webpackJsonpisomorphic||[]).push([[0],{629:function(e,t,n){"use strict";function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(o=(a=l.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(s){r=!0,i=s}finally{try{o||null==l.return||l.return()}finally{if(r)throw i}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,"a",(function(){return o}))},660:function(e,t,n){"use strict";var o=n(0),r=n(89),i=n(6),a=n.n(i),l=n(60),s=n(37),p=n(3),u=n(128),c=n.n(u)()({inlineCollapsed:!1});function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function y(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function m(e,t){return!t||"object"!==f(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var v=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=m(this,b(t).apply(this,arguments))).onKeyDown=function(t){e.subMenu.onKeyDown(t)},e.saveSubMenu=function(t){e.subMenu=t},e}var n,i,l;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,e),n=t,(i=[{key:"render",value:function(){var e=this,t=this.props,n=t.rootPrefixCls,i=t.popupClassName;return o.createElement(c.Consumer,null,(function(t){var l=t.antdMenuTheme;return o.createElement(r.d,d({},e.props,{ref:e.saveSubMenu,popupClassName:a()("".concat(n,"-").concat(l),i)}))}))}}])&&y(n.prototype,i),l&&y(n,l),t}(o.Component);v.contextTypes={antdMenuTheme:p.string},v.isSubMenu=1;var g=v,O=n(878),w=n(791);function C(e){return(C="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function P(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function S(e,t){return!t||"object"!==C(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var N=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},k=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=S(this,E(t).apply(this,arguments))).onKeyDown=function(t){e.menuItem.onKeyDown(t)},e.saveMenuItem=function(t){e.menuItem=t},e.renderItem=function(t){var n=t.siderCollapsed,i=e.props,a=i.level,l=i.children,s=i.rootPrefixCls,p=e.props,u=p.title,f=N(p,["title"]);return o.createElement(c.Consumer,null,(function(t){var i=t.inlineCollapsed,p={title:u||(1===a?l:"")};return n||i||(p.title=null,p.visible=!1),o.createElement(O.a,j({},p,{placement:"right",overlayClassName:"".concat(s,"-inline-collapsed-tooltip")}),o.createElement(r.b,j({},f,{title:u,ref:e.saveMenuItem})))}))},e}var n,i,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(t,e),n=t,(i=[{key:"render",value:function(){return o.createElement(w.a.Consumer,null,this.renderItem)}}])&&P(n.prototype,i),a&&P(n,a),t}(o.Component);k.isMenuItem=!0;var T=n(189),_=n(41),M=n(91),A=function(){return{height:0,opacity:0}},I=function(e){return{height:e.scrollHeight,opacity:1}},K={motionName:"ant-motion-collapse",onAppearStart:A,onEnterStart:A,onAppearActive:I,onEnterActive:I,onLeaveStart:function(e){return{height:e.offsetHeight}},onLeaveActive:A};function D(e){return(D="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function V(){return(V=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function H(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function F(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function L(e,t,n){return t&&F(e.prototype,t),n&&F(e,n),e}function R(e,t){return!t||"object"!==D(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function W(e){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function z(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&q(e,t)}function q(e,t){return(q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"a",(function(){return U}));var B=function(e){function t(e){var n,i;return H(this,t),(n=R(this,W(t).call(this,e))).handleMouseEnter=function(e){n.restoreModeVerticalFromInline();var t=n.props.onMouseEnter;t&&t(e)},n.handleTransitionEnd=function(e){var t="width"===e.propertyName&&e.target===e.currentTarget,o=e.target.className,r="[object SVGAnimatedString]"===Object.prototype.toString.call(o)?o.animVal:o,i="font-size"===e.propertyName&&r.indexOf("anticon")>=0;(t||i)&&n.restoreModeVerticalFromInline()},n.handleClick=function(e){n.handleOpenChange([]);var t=n.props.onClick;t&&t(e)},n.handleOpenChange=function(e){n.setOpenKeys(e);var t=n.props.onOpenChange;t&&t(e)},n.renderMenu=function(e){var t,i,s,p=e.getPopupContainer,u=e.getPrefixCls,c=n.props,f=c.prefixCls,d=c.className,y=c.theme,m=c.collapsedWidth,b=Object(l.a)(n.props,["collapsedWidth","siderCollapsed"]),h=n.getRealMenuMode(),v=n.getOpenMotionProps(h),g=u("menu",f),O=a()(d,"".concat(g,"-").concat(y),(t={},i="".concat(g,"-inline-collapsed"),s=n.getInlineCollapsed(),i in t?Object.defineProperty(t,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[i]=s,t)),w=V({openKeys:n.state.openKeys,onOpenChange:n.handleOpenChange,className:O,mode:h},v);return"inline"!==h&&(w.onClick=n.handleClick),n.getInlineCollapsed()&&(0===m||"0"===m||"0px"===m)&&(w.openKeys=[]),o.createElement(r.e,V({getPopupContainer:p},b,w,{prefixCls:g,onTransitionEnd:n.handleTransitionEnd,onMouseEnter:n.handleMouseEnter}))},Object(_.a)(!("onOpen"in e||"onClose"in e),"Menu","`onOpen` and `onClose` are removed, please use `onOpenChange` instead, see: https://u.ant.design/menu-on-open-change."),Object(_.a)(!("inlineCollapsed"in e&&"inline"!==e.mode),"Menu","`inlineCollapsed` should only be used when `mode` is inline."),Object(_.a)(!(void 0!==e.siderCollapsed&&"inlineCollapsed"in e),"Menu","`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead."),"openKeys"in e?i=e.openKeys:"defaultOpenKeys"in e&&(i=e.defaultOpenKeys),n.state={openKeys:i||[],switchingModeFromInline:!1,inlineOpenKeys:[],prevProps:e},n}return z(t,e),L(t,[{key:"componentWillUnmount",value:function(){M.a.cancel(this.mountRafId)}},{key:"setOpenKeys",value:function(e){"openKeys"in this.props||this.setState({openKeys:e})}},{key:"getRealMenuMode",value:function(){var e=this.getInlineCollapsed();if(this.state.switchingModeFromInline&&e)return"inline";var t=this.props.mode;return e?"vertical":t}},{key:"getInlineCollapsed",value:function(){var e=this.props.inlineCollapsed;return void 0!==this.props.siderCollapsed?this.props.siderCollapsed:e}},{key:"getOpenMotionProps",value:function(e){var t=this.props,n=t.openTransitionName,o=t.openAnimation,r=t.motion;return r?{motion:r}:o?(Object(_.a)("string"===typeof o,"Menu","`openAnimation` do not support object. Please use `motion` instead."),{openAnimation:o}):n?{openTransitionName:n}:"horizontal"===e?{motion:{motionName:"slide-up"}}:"inline"===e?{motion:K}:{motion:{motionName:this.state.switchingModeFromInline?"":"zoom-big"}}}},{key:"restoreModeVerticalFromInline",value:function(){this.state.switchingModeFromInline&&this.setState({switchingModeFromInline:!1})}},{key:"render",value:function(){return o.createElement(c.Provider,{value:{inlineCollapsed:this.getInlineCollapsed()||!1,antdMenuTheme:this.props.theme}},o.createElement(T.a,null,this.renderMenu))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=t.prevProps,o={prevProps:e};return"inline"===n.mode&&"inline"!==e.mode&&(o.switchingModeFromInline=!0),"openKeys"in e?o.openKeys=e.openKeys:((e.inlineCollapsed&&!n.inlineCollapsed||e.siderCollapsed&&!n.siderCollapsed)&&(o.switchingModeFromInline=!0,o.inlineOpenKeys=t.openKeys,o.openKeys=[]),(!e.inlineCollapsed&&n.inlineCollapsed||!e.siderCollapsed&&n.siderCollapsed)&&(o.openKeys=t.inlineOpenKeys,o.inlineOpenKeys=[])),o}}]),t}(o.Component);B.defaultProps={className:"",theme:"light",focusable:!1},Object(s.polyfill)(B);var U=function(e){function t(){return H(this,t),R(this,W(t).apply(this,arguments))}return z(t,e),L(t,[{key:"render",value:function(){var e=this;return o.createElement(w.a.Consumer,null,(function(t){return o.createElement(B,V({},e.props,t))}))}}]),t}(o.Component);U.Divider=r.a,U.Item=k,U.SubMenu=g,U.ItemGroup=r.c},791:function(e,t,n){"use strict";var o=n(128),r=n.n(o),i=n(0),a=n(37),l=n(6),s=n.n(l),p=n(60),u=n(826),c=n(189),f=n(38),d=function(e){return!isNaN(parseFloat(e))&&isFinite(e)};function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function g(e,t,n){return t&&v(e.prototype,t),n&&v(e,n),e}function O(e,t){return!t||"object"!==y(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function C(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"a",(function(){return E})),n.d(t,"b",(function(){return k}));var P=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n};if("undefined"!==typeof window){window.matchMedia||(window.matchMedia=function(e){return{media:e,matches:!1,addListener:function(){},removeListener:function(){}}})}var S={xs:"479.98px",sm:"575.98px",md:"767.98px",lg:"991.98px",xl:"1199.98px",xxl:"1599.98px"},E=r()({}),x=function(){var e=0;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e+=1,"".concat(t).concat(e)}}(),N=function(e){function t(e){var n,o,r;return h(this,t),(n=O(this,w(t).call(this,e))).responsiveHandler=function(e){n.setState({below:e.matches});var t=n.props.onBreakpoint;t&&t(e.matches),n.state.collapsed!==e.matches&&n.setCollapsed(e.matches,"responsive")},n.setCollapsed=function(e,t){"collapsed"in n.props||n.setState({collapsed:e});var o=n.props.onCollapse;o&&o(e,t)},n.toggle=function(){var e=!n.state.collapsed;n.setCollapsed(e,"clickTrigger")},n.belowShowChange=function(){n.setState((function(e){return{belowShow:!e.belowShow}}))},n.renderSider=function(e){var t,o=e.getPrefixCls,r=n.props,a=r.prefixCls,l=r.className,u=r.theme,c=r.collapsible,y=r.reverseArrow,h=r.trigger,v=r.style,g=r.width,O=r.collapsedWidth,w=r.zeroWidthTriggerStyle,C=P(r,["prefixCls","className","theme","collapsible","reverseArrow","trigger","style","width","collapsedWidth","zeroWidthTriggerStyle"]),j=o("layout-sider",a),S=Object(p.a)(C,["collapsed","defaultCollapsed","onCollapse","breakpoint","onBreakpoint","siderHook","zeroWidthTriggerStyle"]),E=n.state.collapsed?O:g,x=d(E)?"".concat(E,"px"):String(E),N=0===parseFloat(String(O||0))?i.createElement("span",{onClick:n.toggle,className:"".concat(j,"-zero-width-trigger ").concat(j,"-zero-width-trigger-").concat(y?"right":"left"),style:w},i.createElement(f.a,{type:"bars"})):null,k={expanded:y?i.createElement(f.a,{type:"right"}):i.createElement(f.a,{type:"left"}),collapsed:y?i.createElement(f.a,{type:"left"}):i.createElement(f.a,{type:"right"})}[n.state.collapsed?"collapsed":"expanded"],T=null!==h?N||i.createElement("div",{className:"".concat(j,"-trigger"),onClick:n.toggle,style:{width:x}},h||k):null,_=b(b({},v),{flex:"0 0 ".concat(x),maxWidth:x,minWidth:x,width:x}),M=s()(l,j,"".concat(j,"-").concat(u),(m(t={},"".concat(j,"-collapsed"),!!n.state.collapsed),m(t,"".concat(j,"-has-trigger"),c&&null!==h&&!N),m(t,"".concat(j,"-below"),!!n.state.below),m(t,"".concat(j,"-zero-width"),0===parseFloat(x)),t));return i.createElement("aside",b({className:M},S,{style:_}),i.createElement("div",{className:"".concat(j,"-children")},n.props.children),c||n.state.below&&N?T:null)},n.uniqueId=x("ant-sider-"),"undefined"!==typeof window&&(o=window.matchMedia),o&&e.breakpoint&&e.breakpoint in S&&(n.mql=o("(max-width: ".concat(S[e.breakpoint],")"))),r="collapsed"in e?e.collapsed:e.defaultCollapsed,n.state={collapsed:r,below:!1},n}return C(t,e),g(t,[{key:"componentDidMount",value:function(){this.mql&&(this.mql.addListener(this.responsiveHandler),this.responsiveHandler(this.mql)),this.props.siderHook&&this.props.siderHook.addSider(this.uniqueId)}},{key:"componentWillUnmount",value:function(){this.mql&&this.mql.removeListener(this.responsiveHandler),this.props.siderHook&&this.props.siderHook.removeSider(this.uniqueId)}},{key:"render",value:function(){var e=this.state.collapsed,t=this.props.collapsedWidth;return i.createElement(E.Provider,{value:{siderCollapsed:e,collapsedWidth:t}},i.createElement(c.a,null,this.renderSider))}}],[{key:"getDerivedStateFromProps",value:function(e){return"collapsed"in e?{collapsed:e.collapsed}:null}}]),t}(i.Component);N.defaultProps={collapsible:!1,defaultCollapsed:!1,reverseArrow:!1,width:200,collapsedWidth:80,style:{},theme:"dark"},Object(a.polyfill)(N);var k=function(e){function t(){return h(this,t),O(this,w(t).apply(this,arguments))}return C(t,e),g(t,[{key:"render",value:function(){var e=this;return i.createElement(u.a.Consumer,null,(function(t){return i.createElement(N,b({},t,e.props))}))}}]),t}(i.Component)},826:function(e,t,n){"use strict";n.d(t,"a",(function(){return O}));var o=n(0),r=n(6),i=n.n(r),a=n(128),l=n.n(a),s=n(189);function p(e){return(p="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function y(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),e}function m(e,t){return!t||"object"!==p(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},O=l()({siderHook:{addSider:function(){return null},removeSider:function(){return null}}});function w(e){var t=e.suffixCls,n=e.tagName;return function(e){return function(r){function i(){var r;return f(this,i),(r=m(this,b(i).apply(this,arguments))).renderComponent=function(i){var a=i.getPrefixCls,l=r.props.prefixCls,s=a(t,l);return o.createElement(e,c({prefixCls:s,tagName:n},r.props))},r}return h(i,r),y(i,[{key:"render",value:function(){return o.createElement(s.a,null,this.renderComponent)}}]),i}(o.Component)}}var C=function(e){var t=e.prefixCls,n=e.className,r=e.children,a=e.tagName,l=g(e,["prefixCls","className","children","tagName"]),s=i()(n,t);return o.createElement(a,c({className:s},l),r)},j=function(e){function t(){var e;return f(this,t),(e=m(this,b(t).apply(this,arguments))).state={siders:[]},e}return h(t,e),y(t,[{key:"getSiderHook",value:function(){var e=this;return{addSider:function(t){e.setState((function(e){return{siders:[].concat(u(e.siders),[t])}}))},removeSider:function(t){e.setState((function(e){return{siders:e.siders.filter((function(e){return e!==t}))}}))}}}},{key:"render",value:function(){var e,t,n,r=this.props,a=r.prefixCls,l=r.className,s=r.children,p=r.hasSider,u=r.tagName,f=g(r,["prefixCls","className","children","hasSider","tagName"]),d=i()(l,a,(e={},t="".concat(a,"-has-sider"),n="boolean"===typeof p?p:this.state.siders.length>0,t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e));return o.createElement(O.Provider,{value:{siderHook:this.getSiderHook()}},o.createElement(u,c({className:d},f),s))}}]),t}(o.Component),P=w({suffixCls:"layout",tagName:"section"})(j),S=w({suffixCls:"layout-header",tagName:"header"})(C),E=w({suffixCls:"layout-footer",tagName:"footer"})(C),x=w({suffixCls:"layout-content",tagName:"main"})(C);P.Header=S,P.Footer=E,P.Content=x,t.b=P},878:function(e,t,n){"use strict";var o=n(0),r=n.n(o),i=n(37),a=n(16),l=n.n(a),s=n(73),p=n.n(s),u=n(20),c=n.n(u),f=n(19),d=n.n(f),y=n(24),m=n.n(y),b=n(3),h=n.n(b),v=n(149),g={adjustX:1,adjustY:1},O=[0,0],w={left:{points:["cr","cl"],overflow:g,offset:[-4,0],targetOffset:O},right:{points:["cl","cr"],overflow:g,offset:[4,0],targetOffset:O},top:{points:["bc","tc"],overflow:g,offset:[0,-4],targetOffset:O},bottom:{points:["tc","bc"],overflow:g,offset:[0,4],targetOffset:O},topLeft:{points:["bl","tl"],overflow:g,offset:[0,-4],targetOffset:O},leftTop:{points:["tr","tl"],overflow:g,offset:[-4,0],targetOffset:O},topRight:{points:["br","tr"],overflow:g,offset:[0,-4],targetOffset:O},rightTop:{points:["tl","tr"],overflow:g,offset:[4,0],targetOffset:O},bottomRight:{points:["tr","br"],overflow:g,offset:[0,4],targetOffset:O},rightBottom:{points:["bl","br"],overflow:g,offset:[4,0],targetOffset:O},bottomLeft:{points:["tl","bl"],overflow:g,offset:[0,4],targetOffset:O},leftBottom:{points:["br","bl"],overflow:g,offset:[-4,0],targetOffset:O}},C=function(e){function t(){return c()(this,t),d()(this,e.apply(this,arguments))}return m()(t,e),t.prototype.componentDidUpdate=function(){var e=this.props.trigger;e&&e.forcePopupAlign()},t.prototype.render=function(){var e=this.props,t=e.overlay,n=e.prefixCls,o=e.id;return r.a.createElement("div",{className:n+"-inner",id:o,role:"tooltip"},"function"===typeof t?t():t)},t}(r.a.Component);C.propTypes={prefixCls:h.a.string,overlay:h.a.oneOfType([h.a.node,h.a.func]).isRequired,id:h.a.string,trigger:h.a.any};var j=C,P=function(e){function t(){var n,o,i;c()(this,t);for(var a=arguments.length,l=Array(a),s=0;s<a;s++)l[s]=arguments[s];return n=o=d()(this,e.call.apply(e,[this].concat(l))),o.getPopupElement=function(){var e=o.props,t=e.arrowContent,n=e.overlay,i=e.prefixCls,a=e.id;return[r.a.createElement("div",{className:i+"-arrow",key:"arrow"},t),r.a.createElement(j,{key:"content",trigger:o.trigger,prefixCls:i,id:a,overlay:n})]},o.saveTrigger=function(e){o.trigger=e},i=n,d()(o,i)}return m()(t,e),t.prototype.getPopupDomNode=function(){return this.trigger.getPopupDomNode()},t.prototype.render=function(){var e=this.props,t=e.overlayClassName,n=e.trigger,o=e.mouseEnterDelay,i=e.mouseLeaveDelay,a=e.overlayStyle,s=e.prefixCls,u=e.children,c=e.onVisibleChange,f=e.afterVisibleChange,d=e.transitionName,y=e.animation,m=e.placement,b=e.align,h=e.destroyTooltipOnHide,g=e.defaultVisible,O=e.getTooltipContainer,C=p()(e,["overlayClassName","trigger","mouseEnterDelay","mouseLeaveDelay","overlayStyle","prefixCls","children","onVisibleChange","afterVisibleChange","transitionName","animation","placement","align","destroyTooltipOnHide","defaultVisible","getTooltipContainer"]),j=l()({},C);return"visible"in this.props&&(j.popupVisible=this.props.visible),r.a.createElement(v.a,l()({popupClassName:t,ref:this.saveTrigger,prefixCls:s,popup:this.getPopupElement,action:n,builtinPlacements:w,popupPlacement:m,popupAlign:b,getPopupContainer:O,onPopupVisibleChange:c,afterPopupVisibleChange:f,popupTransitionName:d,popupAnimation:y,defaultPopupVisible:g,destroyPopupOnHide:h,mouseLeaveDelay:i,popupStyle:a,mouseEnterDelay:o},j),u)},t}(o.Component);P.propTypes={trigger:h.a.any,children:h.a.any,defaultVisible:h.a.bool,visible:h.a.bool,placement:h.a.string,transitionName:h.a.oneOfType([h.a.string,h.a.object]),animation:h.a.any,onVisibleChange:h.a.func,afterVisibleChange:h.a.func,overlay:h.a.oneOfType([h.a.node,h.a.func]).isRequired,overlayStyle:h.a.object,overlayClassName:h.a.string,prefixCls:h.a.string,mouseEnterDelay:h.a.number,mouseLeaveDelay:h.a.number,getTooltipContainer:h.a.func,destroyTooltipOnHide:h.a.bool,align:h.a.object,arrowContent:h.a.any,id:h.a.string},P.defaultProps={prefixCls:"rc-tooltip",mouseEnterDelay:0,destroyTooltipOnHide:!1,mouseLeaveDelay:.1,align:{},placement:"right",trigger:["hover"],arrowContent:null};var S=P,E=n(6),x=n.n(E);function N(){return(N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var k={adjustX:1,adjustY:1},T={adjustX:0,adjustY:0},_=[0,0];function M(e){return"boolean"===typeof e?e?k:T:N(N({},T),e)}var A=n(189);function I(e){return(I="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function K(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function D(e){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function V(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function H(e,t){return(H=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function F(){return(F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var L=function(e,t){var n={},o=F({},e);return t.forEach((function(t){e&&t in e&&(n[t]=e[t],delete o[t])})),{picked:n,omitted:o}};var R=function(e){function t(e){var n,r,i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,i=D(t).call(this,e),(n=!i||"object"!==I(i)&&"function"!==typeof i?V(r):i).onVisibleChange=function(e){var t=n.props.onVisibleChange;"visible"in n.props||n.setState({visible:!n.isNoTitle()&&e}),t&&!n.isNoTitle()&&t(e)},n.saveTooltip=function(e){n.tooltip=e},n.onPopupAlign=function(e,t){var o=n.getPlacements(),r=Object.keys(o).filter((function(e){return o[e].points[0]===t.points[0]&&o[e].points[1]===t.points[1]}))[0];if(r){var i=e.getBoundingClientRect(),a={top:"50%",left:"50%"};r.indexOf("top")>=0||r.indexOf("Bottom")>=0?a.top="".concat(i.height-t.offset[1],"px"):(r.indexOf("Top")>=0||r.indexOf("bottom")>=0)&&(a.top="".concat(-t.offset[1],"px")),r.indexOf("left")>=0||r.indexOf("Right")>=0?a.left="".concat(i.width-t.offset[0],"px"):(r.indexOf("right")>=0||r.indexOf("Left")>=0)&&(a.left="".concat(-t.offset[0],"px")),e.style.transformOrigin="".concat(a.left," ").concat(a.top)}},n.renderTooltip=function(e){var t=e.getPopupContainer,r=e.getPrefixCls,i=V(n),a=i.props,l=i.state,s=a.prefixCls,p=a.title,u=a.overlay,c=a.openClassName,f=a.getPopupContainer,d=a.getTooltipContainer,y=a.children,m=r("tooltip",s),b=l.visible;"visible"in a||!n.isNoTitle()||(b=!1);var h,v,g,O=function(e){var t=e.type;if((!0===t.__ANT_BUTTON||!0===t.__ANT_SWITCH||!0===t.__ANT_CHECKBOX||"button"===e.type)&&e.props.disabled){var n=L(e.props.style,["position","left","right","top","bottom","float","display","zIndex"]),r=n.picked,i=n.omitted,a=F(F({display:"inline-block"},r),{cursor:"not-allowed",width:e.props.block?"100%":null}),l=F(F({},i),{pointerEvents:"none"}),s=o.cloneElement(e,{style:l,className:null});return o.createElement("span",{style:a,className:e.props.className},s)}return e}(o.isValidElement(y)?y:o.createElement("span",null,y)),w=O.props,C=x()(w.className,(h={},v=c||"".concat(m,"-open"),g=!0,v in h?Object.defineProperty(h,v,{value:g,enumerable:!0,configurable:!0,writable:!0}):h[v]=g,h));return o.createElement(S,F({},n.props,{prefixCls:m,getTooltipContainer:f||d||t,ref:n.saveTooltip,builtinPlacements:n.getPlacements(),overlay:u||p||"",visible:b,onVisibleChange:n.onVisibleChange,onPopupAlign:n.onPopupAlign}),b?o.cloneElement(O,{className:C}):O)},n.state={visible:!!e.visible||!!e.defaultVisible},n}var n,r,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&H(e,t)}(t,e),n=t,i=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:null}}],(r=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"getPlacements",value:function(){var e=this.props,t=e.builtinPlacements,n=e.arrowPointAtCenter,o=e.autoAdjustOverflow;return t||function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.arrowWidth,n=void 0===t?5:t,o=e.horizontalArrowShift,r=void 0===o?16:o,i=e.verticalArrowShift,a=void 0===i?12:i,l=e.autoAdjustOverflow,s=void 0===l||l,p={left:{points:["cr","cl"],offset:[-4,0]},right:{points:["cl","cr"],offset:[4,0]},top:{points:["bc","tc"],offset:[0,-4]},bottom:{points:["tc","bc"],offset:[0,4]},topLeft:{points:["bl","tc"],offset:[-(r+n),-4]},leftTop:{points:["tr","cl"],offset:[-4,-(a+n)]},topRight:{points:["br","tc"],offset:[r+n,-4]},rightTop:{points:["tl","cr"],offset:[4,-(a+n)]},bottomRight:{points:["tr","bc"],offset:[r+n,4]},rightBottom:{points:["bl","cr"],offset:[4,a+n]},bottomLeft:{points:["tl","bc"],offset:[-(r+n),4]},leftBottom:{points:["br","cl"],offset:[-4,a+n]}};return Object.keys(p).forEach((function(t){p[t]=e.arrowPointAtCenter?N(N({},p[t]),{overflow:M(s),targetOffset:_}):N(N({},w[t]),{overflow:M(s)}),p[t].ignoreShake=!0})),p}({arrowPointAtCenter:n,verticalArrowShift:8,autoAdjustOverflow:o})}},{key:"isNoTitle",value:function(){var e=this.props,t=e.title,n=e.overlay;return!t&&!n}},{key:"render",value:function(){return o.createElement(A.a,null,this.renderTooltip)}}])&&K(n.prototype,r),i&&K(n,i),t}(o.Component);R.defaultProps={placement:"top",transitionName:"zoom-big-fast",mouseEnterDelay:.1,mouseLeaveDelay:.1,arrowPointAtCenter:!1,autoAdjustOverflow:!0},Object(i.polyfill)(R);t.a=R}}]);
//# sourceMappingURL=0.929a5a30.chunk.js.map