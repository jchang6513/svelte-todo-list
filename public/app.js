var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function c(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function i(t){t.parentNode.removeChild(t)}function a(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function f(){return d(" ")}function p(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function m(t,e){e=""+e,t.data!==e&&(t.data=e)}function y(t,e,n){t.classList[n?"add":"remove"](e)}let v;function g(t){v=t}const $=[],k=Promise.resolve();let x=!1;const _=[],b=[],T=[];function N(t){b.push(t)}function C(){const t=new Set;do{for(;$.length;){const t=$.shift();g(t),O(t.$$)}for(;_.length;)_.shift()();for(;b.length;){const e=b.pop();t.has(e)||(e(),t.add(e))}}while($.length);for(;T.length;)T.pop()();x=!1}function O(t){t.fragment&&(t.update(t.dirty),o(t.before_render),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_render.forEach(N))}function w(t,e){t.$$.dirty||($.push(t),x||(x=!0,k.then(C)),t.$$.dirty=n()),t.$$.dirty[e]=!0}function E(r,l,s,i,a,u){const d=v;g(r);const f=l.props||{},p=r.$$={fragment:null,ctx:null,props:u,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],before_render:[],after_render:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:null};let h=!1;var m;p.ctx=s?s(r,f,(t,e)=>{p.ctx&&a(p.ctx[t],p.ctx[t]=e)&&(p.bound[t]&&p.bound[t](e),h&&w(r,t))}):f,p.update(),h=!0,o(p.before_render),p.fragment=i(p.ctx),l.target&&(l.hydrate?p.fragment.l((m=l.target,Array.from(m.childNodes))):p.fragment.c(),l.intro&&r.$$.fragment.i&&r.$$.fragment.i(),function(t,n,r){const{fragment:l,on_mount:s,on_destroy:i,after_render:a}=t.$$;l.m(n,r),N(()=>{const n=s.map(e).filter(c);i?i.push(...n):o(n),t.$$.on_mount=[]}),a.forEach(N)}(r,l.target,l.anchor),C()),g(d)}class L{$destroy(){var e,n;n=!0,(e=this).$$&&(o(e.$$.on_destroy),e.$$.fragment.d(n),e.$$.on_destroy=e.$$.fragment=null,e.$$.ctx={}),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}class S{static set(t,e){localStorage.setItem(t,JSON.stringify(e))}static get(t){return JSON.parse(localStorage.getItem(t))}static isExist(t){return!!localStorage.getItem(t)}}function A(t,e,n){const o=Object.create(t);return o.todo=e[n],o.index=n,o}function I(t,e,n){const o=Object.create(t);return o.text=e[n].text,o.value=e[n].value,o.index=n,o}function j(t){var e,n,o,c,r=t.text;function a(){return t.click_handler_1(t)}return{c(){e=u("p"),n=d(r),o=d(" Tasks"),e.className="type-item svelte-l4ur7y",y(e,"select",t.value===t.type.value),c=p(e,"click",a)},m(t,c){s(t,e,c),l(e,n),l(e,o)},p(n,o){t=o,(n.types||n.type)&&y(e,"select",t.value===t.type.value)},d(t){t&&i(e),c()}}}function M(t){var e,n,c,r,a,v,g,$,k,x,_,b=t.todo.title;function T(){return t.click_handler_2(t)}function N(){return t.click_handler_3(t)}return{c(){e=u("div"),n=u("div"),c=u("input"),a=f(),v=u("label"),g=d(b),$=f(),(k=u("button")).textContent="X",x=f(),c.id=`item-${t.index}`,c.className="form-check-input svelte-l4ur7y",h(c,"type","checkbox"),c.checked=r=t.todo.checked,v.className="form-check-label svelte-l4ur7y",v.htmlFor=`item-${t.index}`,n.className="form-check svelte-l4ur7y",y(n,"checked",t.todo.checked),k.className="btn svelte-l4ur7y",e.className="todo-item svelte-l4ur7y",_=[p(c,"click",T),p(k,"click",N)]},m(t,o){s(t,e,o),l(e,n),l(n,c),l(n,a),l(n,v),l(v,g),l(e,$),l(e,k),l(e,x)},p(e,o){t=o,e.todos&&r!==(r=t.todo.checked)&&(c.checked=r),e.todos&&b!==(b=t.todo.title)&&m(g,b),e.todos&&y(n,"checked",t.todo.checked)},d(t){t&&i(e),o(_)}}}function B(t){var e,n=t.isTypeOf(t.todo)&&M(t);return{c(){n&&n.c(),e=d("")},m(t,o){n&&n.m(t,o),s(t,e,o)},p(t,o){o.isTypeOf(o.todo)?n?n.p(t,o):((n=M(o)).c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&i(e)}}}function D(e){for(var n,c,r,v,g,$,k,x,_,b,T,N,C,O,w,E,L,S=e.type.text,M=e.types,D=[],J=0;J<M.length;J+=1)D[J]=j(I(e,M,J));var q=e.todos,F=[];for(J=0;J<q.length;J+=1)F[J]=B(A(e,q,J));return{c(){n=u("div"),c=u("div"),r=u("h5"),v=d(S),g=d(" Tasks"),$=f(),k=u("button"),x=f(),_=u("div");for(var t=0;t<D.length;t+=1)D[t].c();b=f(),T=u("form"),N=u("input"),C=f(),(O=u("button")).textContent="SUBMIT",w=f(),E=u("div");for(t=0;t<F.length;t+=1)F[t].c();var o;r.className="title svelte-l4ur7y",k.className="btn-toggle svelte-l4ur7y",y(k,"show",e.typeCollapse),_.className="type-group svelte-l4ur7y",y(_,"show",e.typeCollapse),c.className="header svelte-l4ur7y",N.className="todo-title svelte-l4ur7y",h(N,"type","text"),N.name="to-do",O.className="btn todo-submit svelte-l4ur7y",T.className="todo-form svelte-l4ur7y",E.className="todo-items svelte-l4ur7y",n.className="todo-list svelte-l4ur7y",L=[p(k,"click",e.click_handler),p(N,"input",e.input_input_handler),p(T,"submit",(o=e.addTodo,function(t){return t.preventDefault(),o.call(this,t)}))]},m(t,o){s(t,n,o),l(n,c),l(c,r),l(r,v),l(r,g),l(c,$),l(c,k),l(c,x),l(c,_);for(var i=0;i<D.length;i+=1)D[i].m(_,null);l(n,b),l(n,T),l(T,N),N.value=e.todoTitle,l(T,C),l(T,O),l(n,w),l(n,E);for(i=0;i<F.length;i+=1)F[i].m(E,null)},p(t,e){if(t.type&&S!==(S=e.type.text)&&m(v,S),t.typeCollapse&&y(k,"show",e.typeCollapse),t.types||t.type){M=e.types;for(var n=0;n<M.length;n+=1){const o=I(e,M,n);D[n]?D[n].p(t,o):(D[n]=j(o),D[n].c(),D[n].m(_,null))}for(;n<D.length;n+=1)D[n].d(1);D.length=M.length}if(t.typeCollapse&&y(_,"show",e.typeCollapse),t.todoTitle&&N.value!==e.todoTitle&&(N.value=e.todoTitle),t.isTypeOf||t.todos){q=e.todos;for(n=0;n<q.length;n+=1){const o=A(e,q,n);F[n]?F[n].p(t,o):(F[n]=B(o),F[n].c(),F[n].m(E,null))}for(;n<F.length;n+=1)F[n].d(1);F.length=q.length}},i:t,o:t,d(t){t&&i(n),a(D,t),a(F,t),o(L)}}}function J(){return parseInt(1e5*(Date.now()+Math.random()))}function q(t,e,n){let o,c=!1,r={text:"All",value:1},l=[{text:"All",value:1},{text:"Todo",value:2},{text:"Accomplished",value:3}],s="",i=S.isExist("todoList")?S.get("todoList"):[{id:J(),title:"todo1",checked:!0},{id:J(),title:"todo2",checked:!1}];function a(){n("typeCollapse",c=!c)}function u(t){n("type",r=l.find(e=>e.value===t)),a()}function d(t,e){const o=t.id;n("todos",i=i.map(t=>(t.id===o&&(t={...t,...e}),t))),S.set("todoList",i)}function f(t){const e=t.id;let o=-1;i.find((t,n)=>{if(t.id===e)return o=n,n}),o>=0&&(i.splice(o,1),S.set("todoList",i),n("todos",i))}return t.$$.update=((t={type:1})=>{t.type&&n("isTypeOf",o=(t=>{switch(r.value){case 1:return!0;case 2:return!1===t.checked;case 3:return!0===t.checked}}))}),{typeCollapse:c,type:r,types:l,todoTitle:s,todos:i,toggleType:a,changType:u,addTodo:function(){n("todos",i=i.concat({id:J(),title:s,checked:!1})),n("todoTitle",s=""),S.set("todoList",i)},updateTodo:d,removeTodo:f,isTypeOf:o,click_handler:function(){return a()},click_handler_1:function({value:t}){return u(t)},input_input_handler:function(){s=this.value,n("todoTitle",s)},click_handler_2:function({todo:t}){return d(t,{checked:!t.checked})},click_handler_3:function({todo:t}){return f(t)}}}return new class extends L{constructor(t){super(),E(this,t,q,D,r,[])}}({target:document.body})}();
//# sourceMappingURL=app.js.map
