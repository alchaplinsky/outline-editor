(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(32)},18:function(e,n,t){},32:function(e,n,t){"use strict";t.r(n);var r=t(0),i=t.n(r),a=t(11),o=t.n(a),c=(t(18),t(3)),u=t(4),d=t(6),l=t(5),s=t(7),h=t(12),f=t.n(h),v=t(1),p=function(e){return function e(n){var t=n.props.parent;return t?e(t):n}(e).props.document},y=function e(n,t,r){var i,a,o=Object(v.find)(t.children,{id:r});if(o)return{grandParent:n,parent:t,child:o};for(a=0;a<t.children.length;a++){if(i=e(t,t.children[a],r))break}return i},m=t(8),b=t.n(m),k=function(){return{id:b.a.generate(),type:"text",value:"",children:[]}},O=function(e,n){var t=p(e),r=function(e){return Object(v.clone)(p(e).state.node)}(e),i=function(e,n){return e.id===n?{grandParent:null,parent:null,child:e}:y(null,e,n)}(r,e.props.node.id),a=i.grandParent,o=i.parent,c=n(i.child,o,a);t.setState(Object(v.extend)({node:r},c))},g=function(e){return e.props.parent},w=function(e){return e.props.node.children},j=function e(n){return n.id=b.a.generate(),n.children&&0!==n.children.length&&n.children.forEach(function(n){return e(n)}),n},E=function(e){var n=g(e);if(n){var t,r=function(e){var n=g(e);if(!n)return null;var t=w(n);return t[t.indexOf(e.props.node)-1]||null}(e);t=r?r.children.length>0?function e(n){var t=n.children[n.children.length-1];return t.children.length>0?e(t):t}(r):r:n.props.node,p(e).setState({focusedNode:t.id})}},K=function(e){var n,t=w(e);(n=t.length>0?t[0]:function e(n){var t=g(n);if(!t)return null;var r=w(t),i=r.indexOf(n.props.node);return r[i+1]?r[i+1]:e(t)}(e))&&p(e).setState({focusedNode:n.id})},N=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(d.a)(this,Object(l.a)(n).call(this,e))).keyMap={8:"handleBackspaceKey",9:"handleTabKey",13:"handleEnterKey",38:"handleUpKey",40:"handleDownKey"},t.contentEditable=i.a.createRef(),t.state=t.props.node,t}return Object(s.a)(n,e),Object(u.a)(n,[{key:"componentDidMount",value:function(){this.handleFocus()}},{key:"componentDidUpdate",value:function(){this.handleFocus()}},{key:"handleFocus",value:function(){p(this).state.focusedNode===this.state.id&&this.contentEditable.current.focus()}},{key:"handleInput",value:function(e){var n,t;this.setState({value:e.target.value}),n=this,t=e.target.value,O(n,function(e){return e.value=t,{focusedNode:e.id}})}},{key:"onKeyDown",value:function(e){var n=this.keyMap[e.keyCode];if(n)return this[n](e)}},{key:"handleUpKey",value:function(e){E(this)}},{key:"handleDownKey",value:function(e){K(this)}},{key:"handleBackspaceKey",value:function(e){""===this.state.value&&0===this.state.children.length&&(e.preventDefault(),O(this,function(e,n){var t=n.children.indexOf(e),r=0===t?n:n.children[t-1];return Object(v.remove)(n.children,{id:e.id}),{focusedNode:r.id}}))}},{key:"handleEnterKey",value:function(e){e.preventDefault(),0===this.state.children.length?O(this,function(e,n){var t=k();return n.children.splice(n.children.indexOf(e)+1,0,t),{focusedNode:t.id}}):function(e){O(e,function(e){var n=k();return e.children.unshift(n),{focusedNode:n.id}})}(this)}},{key:"handleTabKey",value:function(e){e.preventDefault(),e.shiftKey?O(this,function(e,n,t){if(n&&t){Object(v.remove)(n.children,{id:e.id});var r=t.children.indexOf(n);return t.children.splice(r+1,0,e),{focusedNode:e.id}}}):function(e){O(e,function(e,n){if(n){var t=n.children,r=t[t.indexOf(e)-1];if(r)return r.children.push(e),Object(v.remove)(t,{id:e.id}),{focusedNode:e.id}}})}(this)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"node"},i.a.createElement(f.a,{innerRef:this.contentEditable,className:"node-self",html:this.state.value,onKeyDown:function(n){return e.onKeyDown(n)},onChange:function(n){return e.handleInput(n)}}),this.state.children.map(function(t,r){return i.a.createElement(n,{key:t.id,parent:e,node:t})}))}}]),n}(i.a.Component),D=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(d.a)(this,Object(l.a)(n).call(this,e))).state={focusedNode:null,caretPosition:null,node:j(window.DOC)},t}return Object(s.a)(n,e),Object(u.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"document"},i.a.createElement(N,{node:this.state.node,document:this}))}}]),n}(i.a.Component);var x=function(){return i.a.createElement(D,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.c213fa5d.chunk.js.map