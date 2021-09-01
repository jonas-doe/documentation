!function(){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.4"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class r extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class o{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:r}=this.findMatchingRoute({url:s,request:e,event:t});let o,a=r&&r.handler;if(!a&&this._defaultHandler&&(a=this._defaultHandler),a){try{o=a.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}return o instanceof Promise&&this._catchHandler&&(o=o.catch((n=>this._catchHandler.handle({url:s,request:e,event:t})))),o}}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const r of n){let n;const o=r.match({url:e,request:t,event:s});if(o)return n=o,(Array.isArray(o)&&0===o.length||o.constructor===Object&&0===Object.keys(o).length||"boolean"==typeof o)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=s(e)}setCatchHandler(e){this._catchHandler=s(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let a;const i=()=>(a||(a=new o,a.addFetchListener(),a.addCacheListener()),a);function c(e,s,o){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new n((({url:e})=>e.href===t.href),s,o)}else if(e instanceof RegExp)a=new r(e,s,o);else if("function"==typeof e)a=new n(e,s,o);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return i().registerRoute(a),a}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[u.prefix,e,u.suffix].filter((e=>e&&e.length>0)).join("-"),h=e=>e||l(u.runtime),p=new Set;const d=(e,t)=>e.filter((e=>t in e)),f=async({request:e,mode:t,plugins:s=[]})=>{const n=d(s,"cacheKeyWillBeUsed");let r=e;for(const e of n)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},m=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:r=[]})=>{const o=await self.caches.open(e),a=await f({plugins:r,request:t,mode:"read"});let i=await o.match(a,n);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;i=await r.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:i,request:a})}return i},w=async({cacheName:e,request:s,response:n,event:r,plugins:o=[],matchOptions:a})=>{const i=await f({plugins:o,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:(c=i.url,new URL(String(c),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var c;const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let r=t,o=!1;for(const t of n)if("cacheWillUpdate"in t){o=!0;const n=t.cacheWillUpdate;if(r=await n.call(t,{request:e,response:r,event:s}),!r)break}return o||(r=r&&200===r.status?r:void 0),r||null})({event:r,plugins:o,response:n,request:i});if(!u)return;const l=await self.caches.open(e),h=d(o,"cacheDidUpdate"),w=h.length>0?await m({cacheName:e,matchOptions:a,request:i}):null;try{await l.put(i,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:r,oldResponse:w,newResponse:u,request:i})},g=m,v=async({request:e,fetchOptions:s,event:n,plugins:r=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const o=d(r,"fetchDidFail"),a=o.length>0?e.clone():null;try{for(const t of r)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const i=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of r)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:i,response:t}));return t}catch(e){for(const t of o)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:i.clone()});throw e}};try{self["workbox:strategies:5.1.4"]&&_()}catch(e){}const q={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};const y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(y))for(const e of t);try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}self.addEventListener("activate",(()=>self.clients.claim())),self.addEventListener("install",(()=>self.skipWaiting()));var R=new class{constructor(e={}){if(this._cacheName=h(e.cacheName),e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[q,...e.plugins]}else this._plugins=[q];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const r=[];let o;if(this._networkTimeoutSeconds){const{id:t,promise:a}=this._getTimeoutPromise({request:s,event:e,logs:n});o=t,r.push(a)}const a=this._getNetworkPromise({timeoutId:o,request:s,event:e,logs:n});r.push(a);let i=await Promise.race(r);if(i||(i=await a),!i)throw new t("no-response",{url:s.url});return i}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise((t=>{n=setTimeout((async()=>{t(await this._respondFromCache({request:e,event:s}))}),1e3*this._networkTimeoutSeconds)})),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let r,o;try{o=await v({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){r=e}if(e&&clearTimeout(e),r||!o)o=await this._respondFromCache({request:t,event:n});else{const e=o.clone(),s=w({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){}}return o}_respondFromCache({event:e,request:t}){return g({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}({cacheName:"nf-v1"});c((function(e){var t=e.url;return"/assets/js/service-worker.js"!==t.pathname&&"/service-worker.js"!==t.pathname&&"/"===t.pathname}),R),c((function(e){var t=e.url;return"/assets/js/service-worker.js"!==t.pathname&&"/service-worker.js"!==t.pathname&&"/about-us"===t.pathname}),R),c((function(e){var t=e.url;return"/assets/js/service-worker.js"!==t.pathname&&"/service-worker.js"!==t.pathname&&"/docs"===t.pathname}),R),c((function(e){var t=e.request,s=e.url;return"/assets/js/service-worker.js"!==s.pathname&&"/service-worker.js"!==s.pathname&&["document","script","style","image"].includes(t.destination)}),R)}();
