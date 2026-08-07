var cC=Object.defineProperty;var uC=(n,e,t)=>e in n?cC(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var U=(n,e,t)=>uC(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hC=()=>{};var xc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},dC=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],B=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(B>>10)),e[r++]=String.fromCharCode(56320+(B&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Lh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,B=s+2<n.length,c=B?n[s+2]:0,h=i>>2,f=(i&3)<<4|l>>4;let C=(l&15)<<2|c>>6,D=c&63;B||(D=64,a||(C=64)),r.push(t[h],t[f],t[C],t[D])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Nh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):dC(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const f=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||c==null||f==null)throw new fC;const C=i<<2|l>>4;if(r.push(C),c!==64){const D=l<<4&240|c>>2;if(r.push(D),f!==64){const A=c<<6&192|f;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class fC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pC=function(n){const e=Nh(n);return Lh.encodeByteArray(e,!0)},ea=function(n){return pC(n).replace(/\./g,"")},Fh=function(n){try{return Lh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CC(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mC=()=>CC().__FIREBASE_DEFAULTS__,gC=()=>{if(typeof process>"u"||typeof xc>"u")return;const n=xc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},EC=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Fh(n[1]);return e&&JSON.parse(e)},va=()=>{try{return hC()||mC()||gC()||EC()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},kh=n=>{var e,t;return(t=(e=va())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Vh=n=>{const e=kh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Mh=()=>{var n;return(n=va())==null?void 0:n.config},Gh=n=>{var e;return(e=va())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _C{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ea(JSON.stringify(t)),ea(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function yC(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ye())}function DC(){var e;const n=(e=va())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function wC(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function bC(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function IC(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vC(){const n=Ye();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function TC(){return!DC()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function AC(){try{return typeof indexedDB=="object"}catch{return!1}}function xC(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RC="FirebaseError";class $t extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=RC,Object.setPrototypeOf(this,$t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ei.prototype.create)}}class ei{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?PC(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new $t(s,l,r)}}function PC(n,e){try{let t=0,r="";for(;t<n.length;){const s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}const i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}const a=n.substring(s+2,i),l=e[a];r+=n.substring(t,s)+(l!=null?String(l):`<${a}?>`),t=i+1}return r}catch{return n}}function SC(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function or(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Rc(i)&&Rc(a)){if(!or(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Rc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function OC(n,e){const t=new NC(n,e);return t.subscribe.bind(t)}class NC{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");LC(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=wo),s.error===void 0&&(s.error=wo),s.complete===void 0&&(s.complete=wo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function LC(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function wo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ml(n){return(await fetch(n,{credentials:"include"})).ok}class Sn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FC{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new _C;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(VC(e))try{this.getOrInitializeService({instanceIdentifier:Wn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Wn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Wn){return this.instances.has(e)}getOptions(e=Wn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:kC(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Wn){return this.component?this.component.multipleInstances?e:Wn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kC(n){return n===Wn?void 0:n}function VC(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MC{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new FC(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ue||(ue={}));const GC={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},UC=ue.INFO,HC={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},jC=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=HC[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class gl{constructor(e){this.name=e,this._logLevel=UC,this._logHandler=jC,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?GC[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}}const JC=(n,e)=>e.some(t=>n instanceof t);let Pc,Sc;function qC(){return Pc||(Pc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zC(){return Sc||(Sc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hh=new WeakMap,Ho=new WeakMap,jh=new WeakMap,bo=new WeakMap,El=new WeakMap;function $C(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Tn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Hh.set(t,n)}).catch(()=>{}),El.set(e,n),e}function KC(n){if(Ho.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Ho.set(n,e)}let jo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ho.get(n);if(e==="objectStoreNames")return n.objectStoreNames||jh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Tn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function QC(n){jo=n(jo)}function WC(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Io(this),e,...t);return jh.set(r,e.sort?e.sort():[e]),Tn(r)}:zC().includes(n)?function(...e){return n.apply(Io(this),e),Tn(Hh.get(this))}:function(...e){return Tn(n.apply(Io(this),e))}}function YC(n){return typeof n=="function"?WC(n):(n instanceof IDBTransaction&&KC(n),JC(n,qC())?new Proxy(n,jo):n)}function Tn(n){if(n instanceof IDBRequest)return $C(n);if(bo.has(n))return bo.get(n);const e=YC(n);return e!==n&&(bo.set(n,e),El.set(e,n)),e}const Io=n=>El.get(n);function XC(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=Tn(a);return r&&a.addEventListener("upgradeneeded",B=>{r(Tn(a.result),B.oldVersion,B.newVersion,Tn(a.transaction),B)}),t&&a.addEventListener("blocked",B=>t(B.oldVersion,B.newVersion,B)),l.then(B=>{i&&B.addEventListener("close",()=>i()),s&&B.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const ZC=["get","getKey","getAll","getAllKeys","count"],em=["put","add","delete","clear"],vo=new Map;function Oc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(vo.get(e))return vo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=em.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ZC.includes(t)))return;const i=async function(a,...l){const B=this.transaction(a,s?"readwrite":"readonly");let c=B.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[t](...l),s&&B.done]))[0]};return vo.set(e,i),i}QC(n=>({...n,get:(e,t,r)=>Oc(e,t)||n.get(e,t,r),has:(e,t)=>!!Oc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(nm(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function nm(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Jo="@firebase/app",Nc="0.16.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rn=new gl("@firebase/app"),rm="@firebase/app-compat",sm="@firebase/analytics-compat",im="@firebase/analytics",am="@firebase/app-check-compat",om="@firebase/app-check",lm="@firebase/auth",Bm="@firebase/auth-compat",cm="@firebase/database",um="@firebase/data-connect",hm="@firebase/database-compat",dm="@firebase/functions",fm="@firebase/functions-compat",pm="@firebase/installations",Cm="@firebase/installations-compat",mm="@firebase/messaging",gm="@firebase/messaging-compat",Em="@firebase/performance",_m="@firebase/performance-compat",ym="@firebase/remote-config",Dm="@firebase/remote-config-compat",wm="@firebase/storage",bm="@firebase/storage-compat",Im="@firebase/firestore",vm="@firebase/ai",Tm="@firebase/firestore-compat",Am="firebase",xm="12.17.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo="[DEFAULT]",Rm={[Jo]:"fire-core",[rm]:"fire-core-compat",[im]:"fire-analytics",[sm]:"fire-analytics-compat",[om]:"fire-app-check",[am]:"fire-app-check-compat",[lm]:"fire-auth",[Bm]:"fire-auth-compat",[cm]:"fire-rtdb",[um]:"fire-data-connect",[hm]:"fire-rtdb-compat",[dm]:"fire-fn",[fm]:"fire-fn-compat",[pm]:"fire-iid",[Cm]:"fire-iid-compat",[mm]:"fire-fcm",[gm]:"fire-fcm-compat",[Em]:"fire-perf",[_m]:"fire-perf-compat",[ym]:"fire-rc",[Dm]:"fire-rc-compat",[wm]:"fire-gcs",[bm]:"fire-gcs-compat",[Im]:"fire-fst",[Tm]:"fire-fst-compat",[vm]:"fire-vertex","fire-js":"fire-js",[Am]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta=new Map,Pm=new Map,zo=new Map;function Lc(n,e){try{n.container.addComponent(e)}catch(t){rn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function lr(n){const e=n.name;if(zo.has(e))return rn.debug(`There were multiple attempts to register component ${e}.`),!1;zo.set(e,n);for(const t of ta.values())Lc(t,n);for(const t of Pm.values())Lc(t,n);return!0}function Ta(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function vt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Yt=new ei("app","Firebase",Sm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Sn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Yt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=xm;function Jh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:qo,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Yt.create("bad-app-name",{appName:String(s)});if(t||(t=Mh()),!t)throw Yt.create("no-options");const i=ta.get(s);if(i)if(or(t,i.options)){if(or(r,i.config))return i;throw Yt.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw Yt.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});const a=new MC(s);for(const B of zo.values())a.addComponent(B);const l=new Om(t,r,a);return ta.set(s,l),l}function _l(n=qo){const e=ta.get(n);if(!e&&n===qo&&Mh())return Jh();if(!e)throw Yt.create("no-app",{appName:n});return e}function Ft(n,e,t){let r=Rm[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),rn.warn(a.join(" "));return}lr(new Sn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm="firebase-heartbeat-database",Lm=1,Fs="firebase-heartbeat-store";let To=null;function qh(){return To||(To=XC(Nm,Lm,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Fs)}catch(t){console.warn(t)}}}}).catch(n=>{throw Yt.create("idb-open",{originalErrorMessage:n.message})})),To}async function Fm(n){try{const t=(await qh()).transaction(Fs),r=await t.objectStore(Fs).get(zh(n));return await t.done,r}catch(e){if(e instanceof $t)rn.warn(e.message);else{const t=Yt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});rn.warn(t.message)}}}async function Fc(n,e){try{const r=(await qh()).transaction(Fs,"readwrite");await r.objectStore(Fs).put(e,zh(n)),await r.done}catch(t){if(t instanceof $t)rn.warn(t.message);else{const r=Yt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});rn.warn(r.message)}}}function zh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const km=1024,Vm=30;class Mm{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Um(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=kc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Vm){const a=Hm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){rn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=kc(),{heartbeatsToSend:r,unsentEntries:s}=Gm(this._heartbeatsCache.heartbeats),i=ea(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return rn.warn(t),""}}}function kc(){return new Date().toISOString().substring(0,10)}function Gm(n,e=km){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Vc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Vc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Um{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return AC()?xC().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Fm(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Fc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Fc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Vc(n){return ea(JSON.stringify({version:2,heartbeats:n})).length}function Hm(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jm(n){lr(new Sn("platform-logger",e=>new tm(e),"PRIVATE")),lr(new Sn("heartbeat",e=>new Mm(e),"PRIVATE")),Ft(Jo,Nc,n),Ft(Jo,Nc,"esm2020"),Ft("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */jm("");var Jm="firebase",qm="12.17.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ft(Jm,qm,"app");function $h(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zm=$h,Kh=new ei("auth","Firebase",$h());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na=new gl("@firebase/auth");function Qh(n,...e){na.logLevel<=ue.WARN&&na.warn(`Auth (${dr}): ${n}`,...e)}function Ji(n,...e){na.logLevel<=ue.ERROR&&na.error(`Auth (${dr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(n,...e){throw yl(n,...e)}function kt(n,...e){return yl(n,...e)}function Wh(n,e,t){const r={...zm(),[e]:t};return new ei("auth","Firebase",r).create(e,{appName:n.name})}function nr(n){return Wh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function yl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Kh.create(n,...e)}function re(n,e,...t){if(!n)throw yl(e,...t)}function Xt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ji(e),new Error(e)}function an(n,e){n||Xt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $o(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function $m(){return Mc()==="http:"||Mc()==="https:"}function Mc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($m()||bC()||"connection"in navigator)?navigator.onLine:!0}function Qm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t){this.shortDelay=e,this.longDelay=t,an(t>e,"Short delay should be less than long delay!"),this.isMobile=yC()||IC()}get(){return Km()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dl(n,e){an(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Xt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Xt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Xt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ym=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Xm=new ni(3e4,6e4);function wl(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Kr(n,e,t,r,s={}){return Xh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=ti({...a,key:n.config.apiKey}).slice(1),B=await n._getAdditionalHeaders();B["Content-Type"]="application/json",n.languageCode&&(B["X-Firebase-Locale"]=n.languageCode);const c={method:e,headers:B,...i};return wC()||(c.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&$r(n.emulatorConfig.host)&&(c.credentials="include"),Yh.fetch()(await Zh(n,n.config.apiHost,t,l),c)})}async function Xh(n,e,t){n._canInitEmulator=!1;const r={...Wm,...e};try{const s=new eg(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Pi(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[B,c]=l.split(" : ");if(B==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pi(n,"credential-already-in-use",a);if(B==="EMAIL_EXISTS")throw Pi(n,"email-already-in-use",a);if(B==="USER_DISABLED")throw Pi(n,"user-disabled",a);const h=r[B]||B.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Wh(n,h,c);sn(n,h)}}catch(s){if(s instanceof $t)throw s;sn(n,"network-request-failed",{message:String(s)})}}async function Zm(n,e,t,r,s={}){const i=await Kr(n,e,t,r,s);return"mfaPendingCredential"in i&&sn(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Zh(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Dl(n.config,s):`${n.config.apiScheme}://${s}`;return Ym.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class eg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(kt(this.auth,"network-request-failed")),Xm.get())})}}function Pi(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=kt(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tg(n,e){return Kr(n,"POST","/v1/accounts:delete",e)}async function ra(n,e){return Kr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ng(n,e=!1){const t=Xe(n),r=await t.getIdToken(e),s=bl(r);re(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ts(Ao(s.auth_time)),issuedAtTime:Ts(Ao(s.iat)),expirationTime:Ts(Ao(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ao(n){return Number(n)*1e3}function bl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ji("JWT malformed, contained fewer than 3 sections"),null;try{const s=Fh(t);return s?JSON.parse(s):(Ji("Failed to decode base64 JWT payload"),null)}catch(s){return Ji("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Gc(n){const e=bl(n);return re(e,"internal-error"),re(typeof e.exp<"u","internal-error"),re(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ks(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof $t&&rg(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function rg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ts(this.lastLoginAt),this.creationTime=Ts(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sa(n){var f;const e=n.auth,t=await n.getIdToken(),r=await ks(n,ra(e,{idToken:t}));re(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(f=s.providerUserInfo)!=null&&f.length?ed(s.providerUserInfo):[],a=ag(n.providerData,i),l=n.isAnonymous,B=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),c=l?B:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ko(s.createdAt,s.lastLoginAt),isAnonymous:c};Object.assign(n,h)}async function ig(n){const e=Xe(n);await sa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ag(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function ed(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function og(n,e){const t=await Xh(n,{},async()=>{const r=ti({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Zh(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const B={method:"POST",headers:l,body:r};return n.emulatorConfig&&$r(n.emulatorConfig.host)&&(B.credentials="include"),Yh.fetch()(a,B)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lg(n,e){return Kr(n,"POST","/v2/accounts:revokeToken",wl(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){re(e.idToken,"internal-error"),re(typeof e.idToken<"u","internal-error"),re(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Gc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){re(e.length!==0,"internal-error");const t=Gc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(re(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await og(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Pr;return r&&(re(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(re(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(re(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pr,this.toJSON())}_performRefresh(){return Xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cn(n,e){re(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Tt{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new sg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ko(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ks(this,this.stsTokenManager.getToken(this.auth,e));return re(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ng(this,e)}reload(){return ig(this)}_assign(e){this!==e&&(re(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Tt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){re(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await sa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(vt(this.auth.app))return Promise.reject(nr(this.auth));const e=await this.getIdToken();return await ks(this,tg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,B=t._redirectEventId??void 0,c=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:f,emailVerified:C,isAnonymous:D,providerData:A,stsTokenManager:L}=t;re(f&&L,e,"internal-error");const M=Pr.fromJSON(this.name,L);re(typeof f=="string",e,"internal-error"),Cn(r,e.name),Cn(s,e.name),re(typeof C=="boolean",e,"internal-error"),re(typeof D=="boolean",e,"internal-error"),Cn(i,e.name),Cn(a,e.name),Cn(l,e.name),Cn(B,e.name),Cn(c,e.name),Cn(h,e.name);const z=new Tt({uid:f,auth:e,email:s,emailVerified:C,displayName:r,isAnonymous:D,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:M,createdAt:c,lastLoginAt:h});return A&&Array.isArray(A)&&(z.providerData=A.map(K=>({...K}))),B&&(z._redirectEventId=B),z}static async _fromIdTokenResponse(e,t,r=!1){const s=new Pr;s.updateFromServerResponse(t);const i=new Tt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await sa(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];re(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?ed(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Pr;l.updateFromIdToken(r);const B=new Tt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ko(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(B,c),B}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc=new Map;function Zt(n){an(n instanceof Function,"Expected a class definition");let e=Uc.get(n);return e?(an(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Uc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}td.type="NONE";const Hc=td;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qi(n,e,t){return`firebase:${n}:${e}:${t}`}class Sr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=qi(this.userKey,s.apiKey,i),this.fullPersistenceKey=qi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ra(this.auth,{idToken:e}).catch(()=>{});return t?Tt._fromGetAccountInfoResponse(this.auth,t,e):null}return Tt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Sr(Zt(Hc),e,r);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=s[0]||Zt(Hc);const a=qi(r,e.config.apiKey,e.name);let l=null;for(const c of t)try{const h=await c._get(a);if(h){let f;if(typeof h=="string"){const C=await ra(e,{idToken:h}).catch(()=>{});if(!C)break;f=await Tt._fromGetAccountInfoResponse(e,C,h)}else f=Tt._fromJSON(e,h);c!==i&&(l=f),i=c;break}}catch{}const B=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!B.length?new Sr(i,e,r):(i=B[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async c=>{if(c!==i)try{await c._remove(a)}catch{}})),new Sr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(id(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(nd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(od(e))return"Blackberry";if(ld(e))return"Webos";if(rd(e))return"Safari";if((e.includes("chrome/")||sd(e))&&!e.includes("edge/"))return"Chrome";if(ad(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function nd(n=Ye()){return/firefox\//i.test(n)}function rd(n=Ye()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sd(n=Ye()){return/crios\//i.test(n)}function id(n=Ye()){return/iemobile/i.test(n)}function ad(n=Ye()){return/android/i.test(n)}function od(n=Ye()){return/blackberry/i.test(n)}function ld(n=Ye()){return/webos/i.test(n)}function Il(n=Ye()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Bg(n=Ye()){var e;return Il(n)&&!!((e=window.navigator)!=null&&e.standalone)}function cg(){return vC()&&document.documentMode===10}function Bd(n=Ye()){return Il(n)||ad(n)||ld(n)||od(n)||/windows phone/i.test(n)||id(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(n,e=[]){let t;switch(n){case"Browser":t=jc(Ye());break;case"Worker":t=`${jc(Ye())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${dr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const B=e(i);a(B)}catch(B){l(B)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hg(n,e={}){return Kr(n,"GET","/v2/passwordPolicy",wl(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg=6;class fg{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??dg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Jc(this),this.idTokenSubscription=new Jc(this),this.beforeStateQueue=new ug(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Kh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Zt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Sr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ra(this,{idToken:e}),r=await Tt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(vt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,B=await this.tryRedirectSignIn(e);(!a||a===l)&&(B!=null&&B.user)&&(r=B.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return re(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await sa(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(vt(this.app))return Promise.reject(nr(this));const t=e?Xe(e):null;return t&&re(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&re(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return vt(this.app)?Promise.reject(nr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return vt(this.app)?Promise.reject(nr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Zt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hg(this),t=new fg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ei("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await lg(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Zt(e)||this._popupRedirectResolver;re(t,this,"argument-error"),this.redirectPersistenceManager=await Sr.create(this,[Zt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(re(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const B=e.addObserver(t,r,s);return()=>{a=!0,B()}}else{const B=e.addObserver(t);return()=>{a=!0,B()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return re(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(vt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Qh(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function vl(n){return Xe(n)}class Jc{constructor(e){this.auth=e,this.observer=null,this.addObserver=OC(t=>this.observer=t)}get next(){return re(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Cg(n){Tl=n}function mg(n){return Tl.loadJS(n)}function gg(){return Tl.gapiScript}function Eg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _g(n,e){const t=Ta(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(or(i,e??{}))return s;sn(s,"already-initialized")}return t.initialize({options:e})}function yg(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Zt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Dg(n,e,t){const r=vl(n);re(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=ud(e),{host:a,port:l}=wg(e),B=l===null?"":`:${l}`,c={url:`${i}//${a}${B}/`},h=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){re(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),re(or(c,r.config.emulator)&&or(h,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=c,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,$r(a)?ml(`${i}//${a}${B}`):bg()}function ud(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function wg(n){const e=ud(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:qc(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:qc(a)}}}function qc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function bg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Xt("not implemented")}_getIdTokenResponse(e){return Xt("not implemented")}_linkToIdToken(e,t){return Xt("not implemented")}_getReauthenticationResolver(e){return Xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Or(n,e){return Zm(n,"POST","/v1/accounts:signInWithIdp",wl(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig="http://localhost";class Br extends hd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Br(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):sn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Br(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Or(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Or(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Or(e,t)}buildRequest(){const e={requestUri:Ig,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ti(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri extends dd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn extends ri{constructor(){super("facebook.com")}static credential(e){return Br._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yn.credentialFromTaggedObject(e)}static credentialFromError(e){return yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yn.credential(e.oauthAccessToken)}catch{return null}}}yn.FACEBOOK_SIGN_IN_METHOD="facebook.com";yn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn extends ri{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Br._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Dn.credentialFromTaggedObject(e)}static credentialFromError(e){return Dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Dn.credential(t,r)}catch{return null}}}Dn.GOOGLE_SIGN_IN_METHOD="google.com";Dn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn extends ri{constructor(){super("github.com")}static credential(e){return Br._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wn.credential(e.oauthAccessToken)}catch{return null}}}wn.GITHUB_SIGN_IN_METHOD="github.com";wn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn extends ri{constructor(){super("twitter.com")}static credential(e,t){return Br._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return bn.credential(t,r)}catch{return null}}}bn.TWITTER_SIGN_IN_METHOD="twitter.com";bn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Tt._fromIdTokenResponse(e,r,s),a=zc(r);return new kr({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=zc(r);return new kr({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function zc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia extends $t{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ia.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ia(e,t,r,s)}}function fd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ia._fromErrorAndOperation(n,i,e,r):i})}async function vg(n,e,t=!1){const r=await ks(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return kr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tg(n,e,t=!1){const{auth:r}=n;if(vt(r.app))return Promise.reject(nr(r));const s="reauthenticate";try{const i=await ks(n,fd(r,s,e,n),t);re(i.idToken,r,"internal-error");const a=bl(i.idToken);re(a,r,"internal-error");const{sub:l}=a;return re(n.uid===l,r,"user-mismatch"),kr._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&sn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ag(n,e,t=!1){if(vt(n.app))return Promise.reject(nr(n));const r="signIn",s=await fd(n,r,e),i=await kr._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function xg(n,e,t,r){return Xe(n).onIdTokenChanged(e,t,r)}function Rg(n,e,t){return Xe(n).beforeAuthStateChanged(e,t)}const aa="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(aa,"1"),this.storage.removeItem(aa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg=1e3,Sg=10;class Cd extends pd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Bd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,B)=>{this.notifyListeners(a,B)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);cg()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Sg):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Pg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Cd.type="LOCAL";const Og=Cd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md extends pd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}md.type="SESSION";const gd=md;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ng(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Aa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async c=>c(t.origin,i)),B=await Ng(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:B})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Aa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Al(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,B)=>{const c=Al("",20);s.port1.start();const h=setTimeout(()=>{B(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(f){const C=f;if(C.data.eventId===c)switch(C.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{B(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(C.data.response);break;default:clearTimeout(h),clearTimeout(i),B(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(){return window}function Fg(n){Vt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(){return typeof Vt().WorkerGlobalScope<"u"&&typeof Vt().importScripts=="function"}async function kg(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Vg(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Mg(){return Ed()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _d="firebaseLocalStorageDb",Gg=1,oa="firebaseLocalStorage",yd="fbase_key";class si{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function xa(n,e){return n.transaction([oa],e?"readwrite":"readonly").objectStore(oa)}function Ug(){const n=indexedDB.deleteDatabase(_d);return new si(n).toPromise()}function Dd(){const n=indexedDB.open(_d,Gg);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(oa,{keyPath:yd})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(oa)?e(r):(r.close(),await Ug(),e(await Dd()))})})}async function $c(n,e,t){const r=xa(n,!0).put({[yd]:e,value:t});return new si(r).toPromise()}async function Hg(n,e){const t=xa(n,!1).get(e),r=await new si(t).toPromise();return r===void 0?null:r.value}function Kc(n,e){const t=xa(n,!0).delete(e);return new si(t).toPromise()}const jg=800,Jg=3;class wd{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow)),typeof document<"u"&&typeof document.addEventListener=="function"&&document.addEventListener("visibilitychange",this.onVisibilityChange)}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow)),typeof document<"u"&&typeof document.removeEventListener=="function"&&document.removeEventListener("visibilitychange",this.onVisibilityChange)}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isHiding=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isHiding=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isHiding&&(this.isHiding=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this.onVisibilityChange=()=>{typeof document<"u"&&(document.visibilityState==="hidden"?this.onPageHide():document.visibilityState==="visible"&&this.onPageShow())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){if(this.isHiding)throw new Error("Database is closing/hidden");return this.dbPromise?this.dbPromise:(this.dbPromise=Dd(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(this.isHiding||t++>Jg)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return Ed()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Aa._getInstance(Mg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await kg(),!this.activeServiceWorker)return;this.sender=new Lg(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Vg()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await $c(e,aa,"1"),await Kc(e,aa)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>$c(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Hg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Kc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isHiding)return[];try{const e=await this._withRetries(s=>{const i=xa(s,!1).getAll();return new si(i).toPromise()});if(this.isHiding)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isHiding||Qh(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),jg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}wd.type="LOCAL";const qg=wd;new ni(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(n,e){return e?Zt(e):(re(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl extends hd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Or(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Or(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Or(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function $g(n){return Ag(n.auth,new xl(n),n.bypassAuthState)}function Kg(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),Tg(t,new xl(n),n.bypassAuthState)}async function Qg(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),vg(t,new xl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const B={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(B))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return $g;case"linkViaPopup":case"linkViaRedirect":return Qg;case"reauthViaPopup":case"reauthViaRedirect":return Kg;default:sn(this.auth,"internal-error")}}resolve(e){an(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){an(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wg=new ni(2e3,1e4);class Rr extends bd{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Rr.currentPopupAction&&Rr.currentPopupAction.cancel(),Rr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return re(e,this.auth,"internal-error"),e}async onExecution(){an(this.filter.length===1,"Popup operations only handle one event");const e=Al();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(kt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(kt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Rr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(kt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Wg.get())};e()}}Rr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg="pendingRedirect",zi=new Map;class Xg extends bd{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=zi.get(this.auth._key());if(!e){try{const r=await Zg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}zi.set(this.auth._key(),e)}return this.bypassAuthState||zi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Zg(n,e){const t=nE(e),r=tE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function eE(n,e){zi.set(n._key(),e)}function tE(n){return Zt(n._redirectPersistence)}function nE(n){return qi(Yg,n.config.apiKey,n.name)}async function rE(n,e,t=!1){if(vt(n.app))return Promise.reject(nr(n));const r=vl(n),s=zg(r,e),a=await new Xg(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE=10*60*1e3;class iE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!aE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Id(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(kt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=sE&&this.cachedEventUids.clear(),this.cachedEventUids.has(Qc(e))}saveEventToCache(e){this.cachedEventUids.add(Qc(e)),this.lastProcessedEventTime=Date.now()}}function Qc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Id({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function aE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Id(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oE(n,e={}){return Kr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,BE=/^https?/;async function cE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await oE(n);for(const t of e)try{if(uE(t))return}catch{}sn(n,"unauthorized-domain")}function uE(n){const e=$o(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!BE.test(t))return!1;if(lE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hE=new ni(3e4,6e4);function Wc(){const n=Vt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function dE(n){return new Promise((e,t)=>{var s,i,a;function r(){Wc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Wc(),t(kt(n,"network-request-failed"))},timeout:hE.get()})}if((i=(s=Vt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=Vt().gapi)!=null&&a.load)r();else{const l=Eg("iframefcb");return Vt()[l]=()=>{gapi.load?r():t(kt(n,"network-request-failed"))},mg(`${gg()}?onload=${l}`).catch(B=>t(B))}}).catch(e=>{throw $i=null,e})}let $i=null;function fE(n){return $i=$i||dE(n),$i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE=new ni(5e3,15e3),CE="__/auth/iframe",mE="emulator/auth/iframe",gE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},EE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function _E(n){const e=n.config;re(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Dl(e,mE):`https://${n.config.authDomain}/${CE}`,r={apiKey:e.apiKey,appName:n.name,v:dr},s=EE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ti(r).slice(1)}`}async function yE(n){const e=await fE(n),t=Vt().gapi;return re(t,n,"internal-error"),e.open({where:document.body,url:_E(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:gE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=kt(n,"network-request-failed"),l=Vt().setTimeout(()=>{i(a)},pE.get());function B(){Vt().clearTimeout(l),s(r)}r.ping(B).then(B,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},wE=500,bE=600,IE="_blank",vE="http://localhost";class Yc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function TE(n,e,t,r=wE,s=bE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const B={...DE,width:r.toString(),height:s.toString(),top:i,left:a},c=Ye().toLowerCase();t&&(l=sd(c)?IE:t),nd(c)&&(e=e||vE,B.scrollbars="yes");const h=Object.entries(B).reduce((C,[D,A])=>`${C}${D}=${A},`,"");if(Bg(c)&&l!=="_self")return AE(e||"",l),new Yc(null);const f=window.open(e||"",l,h);re(f,n,"popup-blocked");try{f.focus()}catch{}return new Yc(f)}function AE(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xE="__/auth/handler",RE="emulator/auth/handler",PE=encodeURIComponent("fac");async function Xc(n,e,t,r,s,i){re(n.config.authDomain,n,"auth-domain-config-required"),re(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:dr,eventId:s};if(e instanceof dd){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",SC(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,f]of Object.entries({}))a[h]=f}if(e instanceof ri){const h=e.getScopes().filter(f=>f!=="");h.length>0&&(a.scopes=h.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const h of Object.keys(l))l[h]===void 0&&delete l[h];const B=await n._getAppCheckToken(),c=B?`#${PE}=${encodeURIComponent(B)}`:"";return`${SE(n)}?${ti(l).slice(1)}${c}`}function SE({config:n}){return n.emulator?Dl(n,RE):`https://${n.authDomain}/${xE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo="webStorageSupport";class OE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=gd,this._completeRedirectFn=rE,this._overrideRedirectResult=eE}async _openPopup(e,t,r,s){var a;an((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Xc(e,t,r,$o(),s);return TE(e,i,Al())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Xc(e,t,r,$o(),s);return Fg(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(an(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await yE(e),r=new iE(e);return t.register("authEvent",s=>(re(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(xo,{type:xo},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[xo];i!==void 0&&t(!!i),sn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=cE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Bd()||rd()||Il()}}const NE=OE;var Zc="@firebase/auth",eu="1.13.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){re(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function kE(n){lr(new Sn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;re(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const B={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cd(n)},c=new pg(r,s,i,B);return yg(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),lr(new Sn("auth-internal",e=>{const t=vl(e.getProvider("auth").getImmediate());return(r=>new LE(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ft(Zc,eu,FE(n)),Ft(Zc,eu,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VE=5*60,ME=Gh("authIdTokenMaxAge")||VE;let tu=null;const GE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>ME)return;const s=t==null?void 0:t.token;tu!==s&&(tu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function UE(n=_l()){const e=Ta(n,"auth");if(e.isInitialized())return e.getImmediate();const t=_g(n,{popupRedirectResolver:NE,persistence:[qg,Og,gd]}),r=Gh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=GE(i.toString());Rg(t,a,()=>a(t.currentUser)),xg(t,l=>a(l))}}const s=kh("auth");return s&&Dg(t,`http://${s}`),t}function HE(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Cg({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=kt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",HE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});kE("Browser");var nu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var An,vd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,E){function y(){}y.prototype=E.prototype,I.F=E.prototype,I.prototype=new y,I.prototype.constructor=I,I.D=function(T,v,R){for(var _=Array(arguments.length-2),it=2;it<arguments.length;it++)_[it-2]=arguments[it];return E.prototype[v].apply(T,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,E,y){y||(y=0);const T=Array(16);if(typeof E=="string")for(var v=0;v<16;++v)T[v]=E.charCodeAt(y++)|E.charCodeAt(y++)<<8|E.charCodeAt(y++)<<16|E.charCodeAt(y++)<<24;else for(v=0;v<16;++v)T[v]=E[y++]|E[y++]<<8|E[y++]<<16|E[y++]<<24;E=I.g[0],y=I.g[1],v=I.g[2];let R=I.g[3],_;_=E+(R^y&(v^R))+T[0]+3614090360&4294967295,E=y+(_<<7&4294967295|_>>>25),_=R+(v^E&(y^v))+T[1]+3905402710&4294967295,R=E+(_<<12&4294967295|_>>>20),_=v+(y^R&(E^y))+T[2]+606105819&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(E^v&(R^E))+T[3]+3250441966&4294967295,y=v+(_<<22&4294967295|_>>>10),_=E+(R^y&(v^R))+T[4]+4118548399&4294967295,E=y+(_<<7&4294967295|_>>>25),_=R+(v^E&(y^v))+T[5]+1200080426&4294967295,R=E+(_<<12&4294967295|_>>>20),_=v+(y^R&(E^y))+T[6]+2821735955&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(E^v&(R^E))+T[7]+4249261313&4294967295,y=v+(_<<22&4294967295|_>>>10),_=E+(R^y&(v^R))+T[8]+1770035416&4294967295,E=y+(_<<7&4294967295|_>>>25),_=R+(v^E&(y^v))+T[9]+2336552879&4294967295,R=E+(_<<12&4294967295|_>>>20),_=v+(y^R&(E^y))+T[10]+4294925233&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(E^v&(R^E))+T[11]+2304563134&4294967295,y=v+(_<<22&4294967295|_>>>10),_=E+(R^y&(v^R))+T[12]+1804603682&4294967295,E=y+(_<<7&4294967295|_>>>25),_=R+(v^E&(y^v))+T[13]+4254626195&4294967295,R=E+(_<<12&4294967295|_>>>20),_=v+(y^R&(E^y))+T[14]+2792965006&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(E^v&(R^E))+T[15]+1236535329&4294967295,y=v+(_<<22&4294967295|_>>>10),_=E+(v^R&(y^v))+T[1]+4129170786&4294967295,E=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(E^y))+T[6]+3225465664&4294967295,R=E+(_<<9&4294967295|_>>>23),_=v+(E^y&(R^E))+T[11]+643717713&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^E&(v^R))+T[0]+3921069994&4294967295,y=v+(_<<20&4294967295|_>>>12),_=E+(v^R&(y^v))+T[5]+3593408605&4294967295,E=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(E^y))+T[10]+38016083&4294967295,R=E+(_<<9&4294967295|_>>>23),_=v+(E^y&(R^E))+T[15]+3634488961&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^E&(v^R))+T[4]+3889429448&4294967295,y=v+(_<<20&4294967295|_>>>12),_=E+(v^R&(y^v))+T[9]+568446438&4294967295,E=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(E^y))+T[14]+3275163606&4294967295,R=E+(_<<9&4294967295|_>>>23),_=v+(E^y&(R^E))+T[3]+4107603335&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^E&(v^R))+T[8]+1163531501&4294967295,y=v+(_<<20&4294967295|_>>>12),_=E+(v^R&(y^v))+T[13]+2850285829&4294967295,E=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(E^y))+T[2]+4243563512&4294967295,R=E+(_<<9&4294967295|_>>>23),_=v+(E^y&(R^E))+T[7]+1735328473&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^E&(v^R))+T[12]+2368359562&4294967295,y=v+(_<<20&4294967295|_>>>12),_=E+(y^v^R)+T[5]+4294588738&4294967295,E=y+(_<<4&4294967295|_>>>28),_=R+(E^y^v)+T[8]+2272392833&4294967295,R=E+(_<<11&4294967295|_>>>21),_=v+(R^E^y)+T[11]+1839030562&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^E)+T[14]+4259657740&4294967295,y=v+(_<<23&4294967295|_>>>9),_=E+(y^v^R)+T[1]+2763975236&4294967295,E=y+(_<<4&4294967295|_>>>28),_=R+(E^y^v)+T[4]+1272893353&4294967295,R=E+(_<<11&4294967295|_>>>21),_=v+(R^E^y)+T[7]+4139469664&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^E)+T[10]+3200236656&4294967295,y=v+(_<<23&4294967295|_>>>9),_=E+(y^v^R)+T[13]+681279174&4294967295,E=y+(_<<4&4294967295|_>>>28),_=R+(E^y^v)+T[0]+3936430074&4294967295,R=E+(_<<11&4294967295|_>>>21),_=v+(R^E^y)+T[3]+3572445317&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^E)+T[6]+76029189&4294967295,y=v+(_<<23&4294967295|_>>>9),_=E+(y^v^R)+T[9]+3654602809&4294967295,E=y+(_<<4&4294967295|_>>>28),_=R+(E^y^v)+T[12]+3873151461&4294967295,R=E+(_<<11&4294967295|_>>>21),_=v+(R^E^y)+T[15]+530742520&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^E)+T[2]+3299628645&4294967295,y=v+(_<<23&4294967295|_>>>9),_=E+(v^(y|~R))+T[0]+4096336452&4294967295,E=y+(_<<6&4294967295|_>>>26),_=R+(y^(E|~v))+T[7]+1126891415&4294967295,R=E+(_<<10&4294967295|_>>>22),_=v+(E^(R|~y))+T[14]+2878612391&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~E))+T[5]+4237533241&4294967295,y=v+(_<<21&4294967295|_>>>11),_=E+(v^(y|~R))+T[12]+1700485571&4294967295,E=y+(_<<6&4294967295|_>>>26),_=R+(y^(E|~v))+T[3]+2399980690&4294967295,R=E+(_<<10&4294967295|_>>>22),_=v+(E^(R|~y))+T[10]+4293915773&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~E))+T[1]+2240044497&4294967295,y=v+(_<<21&4294967295|_>>>11),_=E+(v^(y|~R))+T[8]+1873313359&4294967295,E=y+(_<<6&4294967295|_>>>26),_=R+(y^(E|~v))+T[15]+4264355552&4294967295,R=E+(_<<10&4294967295|_>>>22),_=v+(E^(R|~y))+T[6]+2734768916&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~E))+T[13]+1309151649&4294967295,y=v+(_<<21&4294967295|_>>>11),_=E+(v^(y|~R))+T[4]+4149444226&4294967295,E=y+(_<<6&4294967295|_>>>26),_=R+(y^(E|~v))+T[11]+3174756917&4294967295,R=E+(_<<10&4294967295|_>>>22),_=v+(E^(R|~y))+T[2]+718787259&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~E))+T[9]+3951481745&4294967295,I.g[0]=I.g[0]+E&4294967295,I.g[1]=I.g[1]+(v+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+v&4294967295,I.g[3]=I.g[3]+R&4294967295}r.prototype.v=function(I,E){E===void 0&&(E=I.length);const y=E-this.blockSize,T=this.C;let v=this.h,R=0;for(;R<E;){if(v==0)for(;R<=y;)s(this,I,R),R+=this.blockSize;if(typeof I=="string"){for(;R<E;)if(T[v++]=I.charCodeAt(R++),v==this.blockSize){s(this,T),v=0;break}}else for(;R<E;)if(T[v++]=I[R++],v==this.blockSize){s(this,T),v=0;break}}this.h=v,this.o+=E},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var E=1;E<I.length-8;++E)I[E]=0;E=this.o*8;for(var y=I.length-8;y<I.length;++y)I[y]=E&255,E/=256;for(this.v(I),I=Array(16),E=0,y=0;y<4;++y)for(let T=0;T<32;T+=8)I[E++]=this.g[y]>>>T&255;return I};function i(I,E){var y=l;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=E(I)}function a(I,E){this.h=E;const y=[];let T=!0;for(let v=I.length-1;v>=0;v--){const R=I[v]|0;T&&R==E||(y[v]=R,T=!1)}this.g=y}var l={};function B(I){return-128<=I&&I<128?i(I,function(E){return new a([E|0],E<0?-1:0)}):new a([I|0],I<0?-1:0)}function c(I){if(isNaN(I)||!isFinite(I))return f;if(I<0)return M(c(-I));const E=[];let y=1;for(let T=0;I>=y;T++)E[T]=I/y|0,y*=4294967296;return new a(E,0)}function h(I,E){if(I.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(I.charAt(0)=="-")return M(h(I.substring(1),E));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=c(Math.pow(E,8));let T=f;for(let R=0;R<I.length;R+=8){var v=Math.min(8,I.length-R);const _=parseInt(I.substring(R,R+v),E);v<8?(v=c(Math.pow(E,v)),T=T.j(v).add(c(_))):(T=T.j(y),T=T.add(c(_)))}return T}var f=B(0),C=B(1),D=B(16777216);n=a.prototype,n.m=function(){if(L(this))return-M(this).m();let I=0,E=1;for(let y=0;y<this.g.length;y++){const T=this.i(y);I+=(T>=0?T:4294967296+T)*E,E*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(A(this))return"0";if(L(this))return"-"+M(this).toString(I);const E=c(Math.pow(I,6));var y=this;let T="";for(;;){const v=ie(y,E).g;y=z(y,v.j(E));let R=((y.g.length>0?y.g[0]:y.h)>>>0).toString(I);if(y=v,A(y))return R+T;for(;R.length<6;)R="0"+R;T=R+T}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function A(I){if(I.h!=0)return!1;for(let E=0;E<I.g.length;E++)if(I.g[E]!=0)return!1;return!0}function L(I){return I.h==-1}n.l=function(I){return I=z(this,I),L(I)?-1:A(I)?0:1};function M(I){const E=I.g.length,y=[];for(let T=0;T<E;T++)y[T]=~I.g[T];return new a(y,~I.h).add(C)}n.abs=function(){return L(this)?M(this):this},n.add=function(I){const E=Math.max(this.g.length,I.g.length),y=[];let T=0;for(let v=0;v<=E;v++){let R=T+(this.i(v)&65535)+(I.i(v)&65535),_=(R>>>16)+(this.i(v)>>>16)+(I.i(v)>>>16);T=_>>>16,R&=65535,_&=65535,y[v]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function z(I,E){return I.add(M(E))}n.j=function(I){if(A(this)||A(I))return f;if(L(this))return L(I)?M(this).j(M(I)):M(M(this).j(I));if(L(I))return M(this.j(M(I)));if(this.l(D)<0&&I.l(D)<0)return c(this.m()*I.m());const E=this.g.length+I.g.length,y=[];for(var T=0;T<2*E;T++)y[T]=0;for(T=0;T<this.g.length;T++)for(let v=0;v<I.g.length;v++){const R=this.i(T)>>>16,_=this.i(T)&65535,it=I.i(v)>>>16,Jn=I.i(v)&65535;y[2*T+2*v]+=_*Jn,K(y,2*T+2*v),y[2*T+2*v+1]+=R*Jn,K(y,2*T+2*v+1),y[2*T+2*v+1]+=_*it,K(y,2*T+2*v+1),y[2*T+2*v+2]+=R*it,K(y,2*T+2*v+2)}for(I=0;I<E;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=E;I<2*E;I++)y[I]=0;return new a(y,0)};function K(I,E){for(;(I[E]&65535)!=I[E];)I[E+1]+=I[E]>>>16,I[E]&=65535,E++}function ne(I,E){this.g=I,this.h=E}function ie(I,E){if(A(E))throw Error("division by zero");if(A(I))return new ne(f,f);if(L(I))return E=ie(M(I),E),new ne(M(E.g),M(E.h));if(L(E))return E=ie(I,M(E)),new ne(M(E.g),E.h);if(I.g.length>30){if(L(I)||L(E))throw Error("slowDivide_ only works with positive integers.");for(var y=C,T=E;T.l(I)<=0;)y=Be(y),T=Be(T);var v=he(y,1),R=he(T,1);for(T=he(T,2),y=he(y,2);!A(T);){var _=R.add(T);_.l(I)<=0&&(v=v.add(y),R=_),T=he(T,1),y=he(y,1)}return E=z(I,v.j(E)),new ne(v,E)}for(v=f;I.l(E)>=0;){for(y=Math.max(1,Math.floor(I.m()/E.m())),T=Math.ceil(Math.log(y)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),R=c(y),_=R.j(E);L(_)||_.l(I)>0;)y-=T,R=c(y),_=R.j(E);A(R)&&(R=C),v=v.add(R),I=z(I,_)}return new ne(v,I)}n.B=function(I){return ie(this,I).h},n.and=function(I){const E=Math.max(this.g.length,I.g.length),y=[];for(let T=0;T<E;T++)y[T]=this.i(T)&I.i(T);return new a(y,this.h&I.h)},n.or=function(I){const E=Math.max(this.g.length,I.g.length),y=[];for(let T=0;T<E;T++)y[T]=this.i(T)|I.i(T);return new a(y,this.h|I.h)},n.xor=function(I){const E=Math.max(this.g.length,I.g.length),y=[];for(let T=0;T<E;T++)y[T]=this.i(T)^I.i(T);return new a(y,this.h^I.h)};function Be(I){const E=I.g.length+1,y=[];for(let T=0;T<E;T++)y[T]=I.i(T)<<1|I.i(T-1)>>>31;return new a(y,I.h)}function he(I,E){const y=E>>5;E%=32;const T=I.g.length-y,v=[];for(let R=0;R<T;R++)v[R]=E>0?I.i(R+y)>>>E|I.i(R+y+1)<<32-E:I.i(R+y);return new a(v,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,vd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=c,a.fromString=h,An=a}).apply(typeof nu<"u"?nu:typeof self<"u"?self:typeof window<"u"?window:{});var Si=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Td,Ds,Ad,Ki,Qo,xd,Rd,Pd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Si=="object"&&Si];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var x=o[p];if(!(x in d))break e;d=d[x]}o=o[o.length-1],p=d[o],u=u(p),u!=p&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(u){var d=[],p;for(p in u)Object.prototype.hasOwnProperty.call(u,p)&&d.push([p,u[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function l(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function B(o,u,d){return o.call.apply(o.bind,arguments)}function c(o,u,d){return c=B,c.apply(null,arguments)}function h(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function f(o,u){function d(){}d.prototype=u.prototype,o.Z=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(p,x,P){for(var J=Array(arguments.length-2),oe=2;oe<arguments.length;oe++)J[oe-2]=arguments[oe];return u.prototype[x].apply(p,J)}}var C=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function D(o){const u=o.length;if(u>0){const d=Array(u);for(let p=0;p<u;p++)d[p]=o[p];return d}return[]}function A(o,u){for(let p=1;p<arguments.length;p++){const x=arguments[p];var d=typeof x;if(d=d!="object"?d:x?Array.isArray(x)?"array":d:"null",d=="array"||d=="object"&&typeof x.length=="number"){d=o.length||0;const P=x.length||0;o.length=d+P;for(let J=0;J<P;J++)o[d+J]=x[J]}else o.push(x)}}class L{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function M(o){a.setTimeout(()=>{throw o},0)}function z(){var o=I;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class K{constructor(){this.h=this.g=null}add(u,d){const p=ne.get();p.set(u,d),this.h?this.h.next=p:this.g=p,this.h=p}}var ne=new L(()=>new ie,o=>o.reset());class ie{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Be,he=!1,I=new K,E=()=>{const o=Promise.resolve(void 0);Be=()=>{o.then(y)}};function y(){for(var o;o=z();){try{o.h.call(o.g)}catch(d){M(d)}var u=ne;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}he=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,u),a.removeEventListener("test",d,u)}catch{}return o}();function _(o){return/^[\s\xa0]*$/.test(o)}function it(o,u){v.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}f(it,v),it.prototype.init=function(o,u){const d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&it.Z.h.call(this)},it.prototype.h=function(){it.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Jn="closure_listenable_"+(Math.random()*1e6|0),Sp=0;function Op(o,u,d,p,x){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!p,this.ha=x,this.key=++Sp,this.da=this.fa=!1}function Ci(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function mi(o,u,d){for(const p in o)u.call(d,o[p],p,o)}function Np(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function AB(o){const u={};for(const d in o)u[d]=o[d];return u}const xB="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function RB(o,u){let d,p;for(let x=1;x<arguments.length;x++){p=arguments[x];for(d in p)o[d]=p[d];for(let P=0;P<xB.length;P++)d=xB[P],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function gi(o){this.src=o,this.g={},this.h=0}gi.prototype.add=function(o,u,d,p,x){const P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);const J=Za(o,u,p,x);return J>-1?(u=o[J],d||(u.fa=!1)):(u=new Op(u,this.src,P,!!p,x),u.fa=d,o.push(u)),u};function Xa(o,u){const d=u.type;if(d in o.g){var p=o.g[d],x=Array.prototype.indexOf.call(p,u,void 0),P;(P=x>=0)&&Array.prototype.splice.call(p,x,1),P&&(Ci(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Za(o,u,d,p){for(let x=0;x<o.length;++x){const P=o[x];if(!P.da&&P.listener==u&&P.capture==!!d&&P.ha==p)return x}return-1}var eo="closure_lm_"+(Math.random()*1e6|0),to={};function PB(o,u,d,p,x){if(Array.isArray(u)){for(let P=0;P<u.length;P++)PB(o,u[P],d,p,x);return null}return d=NB(d),o&&o[Jn]?o.J(u,d,l(p)?!!p.capture:!1,x):Lp(o,u,d,!1,p,x)}function Lp(o,u,d,p,x,P){if(!u)throw Error("Invalid event type");const J=l(x)?!!x.capture:!!x;let oe=ro(o);if(oe||(o[eo]=oe=new gi(o)),d=oe.add(u,d,p,J,P),d.proxy)return d;if(p=Fp(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)R||(x=J),x===void 0&&(x=!1),o.addEventListener(u.toString(),p,x);else if(o.attachEvent)o.attachEvent(OB(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Fp(){function o(d){return u.call(o.src,o.listener,d)}const u=kp;return o}function SB(o,u,d,p,x){if(Array.isArray(u))for(var P=0;P<u.length;P++)SB(o,u[P],d,p,x);else p=l(p)?!!p.capture:!!p,d=NB(d),o&&o[Jn]?(o=o.i,P=String(u).toString(),P in o.g&&(u=o.g[P],d=Za(u,d,p,x),d>-1&&(Ci(u[d]),Array.prototype.splice.call(u,d,1),u.length==0&&(delete o.g[P],o.h--)))):o&&(o=ro(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Za(u,d,p,x)),(d=o>-1?u[o]:null)&&no(d))}function no(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Jn])Xa(u.i,o);else{var d=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(d,p,o.capture):u.detachEvent?u.detachEvent(OB(d),p):u.addListener&&u.removeListener&&u.removeListener(p),(d=ro(u))?(Xa(d,o),d.h==0&&(d.src=null,u[eo]=null)):Ci(o)}}}function OB(o){return o in to?to[o]:to[o]="on"+o}function kp(o,u){if(o.da)o=!0;else{u=new it(u,this);const d=o.listener,p=o.ha||o.src;o.fa&&no(o),o=d.call(p,u)}return o}function ro(o){return o=o[eo],o instanceof gi?o:null}var so="__closure_events_fn_"+(Math.random()*1e9>>>0);function NB(o){return typeof o=="function"?o:(o[so]||(o[so]=function(u){return o.handleEvent(u)}),o[so])}function $e(){T.call(this),this.i=new gi(this),this.M=this,this.G=null}f($e,T),$e.prototype[Jn]=!0,$e.prototype.removeEventListener=function(o,u,d,p){SB(this,o,u,d,p)};function et(o,u){var d,p=o.G;if(p)for(d=[];p;p=p.G)d.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new v(u,o);else if(u instanceof v)u.target=u.target||o;else{var x=u;u=new v(p,o),RB(u,x)}x=!0;let P,J;if(d)for(J=d.length-1;J>=0;J--)P=u.g=d[J],x=Ei(P,p,!0,u)&&x;if(P=u.g=o,x=Ei(P,p,!0,u)&&x,x=Ei(P,p,!1,u)&&x,d)for(J=0;J<d.length;J++)P=u.g=d[J],x=Ei(P,p,!1,u)&&x}$e.prototype.N=function(){if($e.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const d=o.g[u];for(let p=0;p<d.length;p++)Ci(d[p]);delete o.g[u],o.h--}}this.G=null},$e.prototype.J=function(o,u,d,p){return this.i.add(String(o),u,!1,d,p)},$e.prototype.K=function(o,u,d,p){return this.i.add(String(o),u,!0,d,p)};function Ei(o,u,d,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let x=!0;for(let P=0;P<u.length;++P){const J=u[P];if(J&&!J.da&&J.capture==d){const oe=J.listener,ke=J.ha||J.src;J.fa&&Xa(o.i,J),x=oe.call(ke,p)!==!1&&x}}return x&&!p.defaultPrevented}function Vp(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=c(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function LB(o){o.g=Vp(()=>{o.g=null,o.i&&(o.i=!1,LB(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Mp extends T{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:LB(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function rs(o){T.call(this),this.h=o,this.g={}}f(rs,T);var FB=[];function kB(o){mi(o.g,function(u,d){this.g.hasOwnProperty(d)&&no(u)},o),o.g={}}rs.prototype.N=function(){rs.Z.N.call(this),kB(this)},rs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var io=a.JSON.stringify,Gp=a.JSON.parse,Up=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function VB(){}function MB(){}var ss={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ao(){v.call(this,"d")}f(ao,v);function oo(){v.call(this,"c")}f(oo,v);var qn={},GB=null;function _i(){return GB=GB||new $e}qn.Ia="serverreachability";function UB(o){v.call(this,qn.Ia,o)}f(UB,v);function is(o){const u=_i();et(u,new UB(u))}qn.STAT_EVENT="statevent";function HB(o,u){v.call(this,qn.STAT_EVENT,o),this.stat=u}f(HB,v);function tt(o){const u=_i();et(u,new HB(u,o))}qn.Ja="timingevent";function jB(o,u){v.call(this,qn.Ja,o),this.size=u}f(jB,v);function as(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function os(){this.g=!0}os.prototype.ua=function(){this.g=!1};function Hp(o,u,d,p,x,P){o.info(function(){if(o.g)if(P){var J="",oe=P.split("&");for(let ge=0;ge<oe.length;ge++){var ke=oe[ge].split("=");if(ke.length>1){const Ge=ke[0];ke=ke[1];const St=Ge.split("_");J=St.length>=2&&St[1]=="type"?J+(Ge+"="+ke+"&"):J+(Ge+"=redacted&")}}}else J=null;else J=P;return"XMLHTTP REQ ("+p+") [attempt "+x+"]: "+u+`
`+d+`
`+J})}function jp(o,u,d,p,x,P,J){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+x+"]: "+u+`
`+d+`
`+P+" "+J})}function gr(o,u,d,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+qp(o,d)+(p?" "+p:"")})}function Jp(o,u){o.info(function(){return"TIMEOUT: "+u})}os.prototype.info=function(){};function qp(o,u){if(!o.g)return u;if(!u)return null;try{const P=JSON.parse(u);if(P){for(o=0;o<P.length;o++)if(Array.isArray(P[o])){var d=P[o];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var x=p[0];if(x!="noop"&&x!="stop"&&x!="close")for(let J=1;J<p.length;J++)p[J]=""}}}}return io(P)}catch{return u}}var yi={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},JB={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},qB;function lo(){}f(lo,VB),lo.prototype.g=function(){return new XMLHttpRequest},qB=new lo;function ls(o){return encodeURIComponent(String(o))}function zp(o){var u=1;o=o.split(":");const d=[];for(;u>0&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function cn(o,u,d,p){this.j=o,this.i=u,this.l=d,this.S=p||1,this.V=new rs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new zB}function zB(){this.i=null,this.g="",this.h=!1}var $B={},Bo={};function co(o,u,d){o.M=1,o.A=wi(Pt(u)),o.u=d,o.R=!0,KB(o,null)}function KB(o,u){o.F=Date.now(),Di(o),o.B=Pt(o.A);var d=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),oc(d.i,"t",p),o.C=0,d=o.j.L,o.h=new zB,o.g=Ic(o.j,d?u:null,!o.u),o.P>0&&(o.O=new Mp(c(o.Y,o,o.g),o.P)),u=o.V,d=o.g,p=o.ba;var x="readystatechange";Array.isArray(x)||(x&&(FB[0]=x.toString()),x=FB);for(let P=0;P<x.length;P++){const J=PB(d,x[P],p||u.handleEvent,!1,u.h||u);if(!J)break;u.g[J.key]=J}u=o.J?AB(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),is(),Hp(o.i,o.v,o.B,o.l,o.S,o.u)}cn.prototype.ba=function(o){o=o.target;const u=this.O;u&&dn(o)==3?u.j():this.Y(o)},cn.prototype.Y=function(o){try{if(o==this.g)e:{const oe=dn(this.g),ke=this.g.ya(),ge=this.g.ca();if(!(oe<3)&&(oe!=3||this.g&&(this.h.h||this.g.la()||fc(this.g)))){this.K||oe!=4||ke==7||(ke==8||ge<=0?is(3):is(2)),uo(this);var u=this.g.ca();this.X=u;var d=$p(this);if(this.o=u==200,jp(this.i,this.v,this.B,this.l,this.S,oe,u),this.o){if(this.U&&!this.L){t:{if(this.g){var p,x=this.g;if((p=x.g?x.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(p)){var P=p;break t}}P=null}if(o=P)gr(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ho(this,o);else{this.o=!1,this.m=3,tt(12),zn(this),Bs(this);break e}}if(this.R){o=!0;let Ge;for(;!this.K&&this.C<d.length;)if(Ge=Kp(this,d),Ge==Bo){oe==4&&(this.m=4,tt(14),o=!1),gr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ge==$B){this.m=4,tt(15),gr(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else gr(this.i,this.l,Ge,null),ho(this,Ge);if(QB(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),oe!=4||d.length!=0||this.h.h||(this.m=1,tt(16),o=!1),this.o=this.o&&o,!o)gr(this.i,this.l,d,"[Invalid Chunked Response]"),zn(this),Bs(this);else if(d.length>0&&!this.W){this.W=!0;var J=this.j;J.g==this&&J.aa&&!J.P&&(J.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),yo(J),J.P=!0,tt(11))}}else gr(this.i,this.l,d,null),ho(this,d);oe==4&&zn(this),this.o&&!this.K&&(oe==4?yc(this.j,this):(this.o=!1,Di(this)))}else lC(this.g),u==400&&d.indexOf("Unknown SID")>0?(this.m=3,tt(12)):(this.m=0,tt(13)),zn(this),Bs(this)}}}catch{}finally{}};function $p(o){if(!QB(o))return o.g.la();const u=fc(o.g);if(u==="")return"";let d="";const p=u.length,x=dn(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return zn(o),Bs(o),"";o.h.i=new a.TextDecoder}for(let P=0;P<p;P++)o.h.h=!0,d+=o.h.i.decode(u[P],{stream:!(x&&P==p-1)});return u.length=0,o.h.g+=d,o.C=0,o.h.g}function QB(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Kp(o,u){var d=o.C,p=u.indexOf(`
`,d);return p==-1?Bo:(d=Number(u.substring(d,p)),isNaN(d)?$B:(p+=1,p+d>u.length?Bo:(u=u.slice(p,p+d),o.C=p+d,u)))}cn.prototype.cancel=function(){this.K=!0,zn(this)};function Di(o){o.T=Date.now()+o.H,WB(o,o.H)}function WB(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=as(c(o.aa,o),u)}function uo(o){o.D&&(a.clearTimeout(o.D),o.D=null)}cn.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Jp(this.i,this.B),this.M!=2&&(is(),tt(17)),zn(this),this.m=2,Bs(this)):WB(this,this.T-o)};function Bs(o){o.j.I==0||o.K||yc(o.j,o)}function zn(o){uo(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,kB(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function ho(o,u){try{var d=o.j;if(d.I!=0&&(d.g==o||fo(d.h,o))){if(!o.L&&fo(d.h,o)&&d.I==3){try{var p=d.Ba.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var x=p;if(x[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Ai(d),vi(d);else break e;_o(d),tt(18)}}else d.xa=x[1],0<d.xa-d.K&&x[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=as(c(d.Va,d),6e3));ZB(d.h)<=1&&d.ta&&(d.ta=void 0)}else Kn(d,11)}else if((o.L||d.g==o)&&Ai(d),!_(u))for(x=d.Ba.g.parse(u),u=0;u<x.length;u++){let ge=x[u];const Ge=ge[0];if(!(Ge<=d.K))if(d.K=Ge,ge=ge[1],d.I==2)if(ge[0]=="c"){d.M=ge[1],d.ba=ge[2];const St=ge[3];St!=null&&(d.ka=St,d.j.info("VER="+d.ka));const Qn=ge[4];Qn!=null&&(d.za=Qn,d.j.info("SVER="+d.za));const fn=ge[5];fn!=null&&typeof fn=="number"&&fn>0&&(p=1.5*fn,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const pn=o.g;if(pn){const Ri=pn.g?pn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ri){var P=p.h;P.g||Ri.indexOf("spdy")==-1&&Ri.indexOf("quic")==-1&&Ri.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(po(P,P.h),P.h=null))}if(p.G){const Do=pn.g?pn.g.getResponseHeader("X-HTTP-Session-Id"):null;Do&&(p.wa=Do,De(p.J,p.G,Do))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var J=o;if(p.na=bc(p,p.L?p.ba:null,p.W),J.L){ec(p.h,J);var oe=J,ke=p.O;ke&&(oe.H=ke),oe.D&&(uo(oe),Di(oe)),p.g=J}else Ec(p);d.i.length>0&&Ti(d)}else ge[0]!="stop"&&ge[0]!="close"||Kn(d,7);else d.I==3&&(ge[0]=="stop"||ge[0]=="close"?ge[0]=="stop"?Kn(d,7):Eo(d):ge[0]!="noop"&&d.l&&d.l.qa(ge),d.A=0)}}is(4)}catch{}}var Qp=class{constructor(o,u){this.g=o,this.map=u}};function YB(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function XB(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function ZB(o){return o.h?1:o.g?o.g.size:0}function fo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function po(o,u){o.g?o.g.add(u):o.h=u}function ec(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}YB.prototype.cancel=function(){if(this.i=tc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function tc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.G);return u}return D(o.i)}var nc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Wp(o,u){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const p=o[d].indexOf("=");let x,P=null;p>=0?(x=o[d].substring(0,p),P=o[d].substring(p+1)):x=o[d],u(x,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function un(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof un?(this.l=o.l,cs(this,o.j),this.o=o.o,this.g=o.g,us(this,o.u),this.h=o.h,Co(this,lc(o.i)),this.m=o.m):o&&(u=String(o).match(nc))?(this.l=!1,cs(this,u[1]||"",!0),this.o=hs(u[2]||""),this.g=hs(u[3]||"",!0),us(this,u[4]),this.h=hs(u[5]||"",!0),Co(this,u[6]||"",!0),this.m=hs(u[7]||"")):(this.l=!1,this.i=new fs(null,this.l))}un.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(ds(u,rc,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(ds(u,rc,!0),"@"),o.push(ls(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ds(d,d.charAt(0)=="/"?Zp:Xp,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ds(d,tC)),o.join("")},un.prototype.resolve=function(o){const u=Pt(this);let d=!!o.j;d?cs(u,o.j):d=!!o.o,d?u.o=o.o:d=!!o.g,d?u.g=o.g:d=o.u!=null;var p=o.h;if(d)us(u,o.u);else if(d=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var x=u.h.lastIndexOf("/");x!=-1&&(p=u.h.slice(0,x+1)+p)}if(x=p,x==".."||x==".")p="";else if(x.indexOf("./")!=-1||x.indexOf("/.")!=-1){p=x.lastIndexOf("/",0)==0,x=x.split("/");const P=[];for(let J=0;J<x.length;){const oe=x[J++];oe=="."?p&&J==x.length&&P.push(""):oe==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),p&&J==x.length&&P.push("")):(P.push(oe),p=!0)}p=P.join("/")}else p=x}return d?u.h=p:d=o.i.toString()!=="",d?Co(u,lc(o.i)):d=!!o.m,d&&(u.m=o.m),u};function Pt(o){return new un(o)}function cs(o,u,d){o.j=d?hs(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function us(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function Co(o,u,d){u instanceof fs?(o.i=u,nC(o.i,o.l)):(d||(u=ds(u,eC)),o.i=new fs(u,o.l))}function De(o,u,d){o.i.set(u,d)}function wi(o){return De(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function hs(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ds(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Yp),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Yp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var rc=/[#\/\?@]/g,Xp=/[#\?:]/g,Zp=/[#\?]/g,eC=/[#\?@]/g,tC=/#/g;function fs(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function $n(o){o.g||(o.g=new Map,o.h=0,o.i&&Wp(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=fs.prototype,n.add=function(o,u){$n(this),this.i=null,o=Er(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function sc(o,u){$n(o),u=Er(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function ic(o,u){return $n(o),u=Er(o,u),o.g.has(u)}n.forEach=function(o,u){$n(this),this.g.forEach(function(d,p){d.forEach(function(x){o.call(u,x,p,this)},this)},this)};function ac(o,u){$n(o);let d=[];if(typeof u=="string")ic(o,u)&&(d=d.concat(o.g.get(Er(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)d=d.concat(o[u]);return d}n.set=function(o,u){return $n(this),this.i=null,o=Er(this,o),ic(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=ac(this,o),o.length>0?String(o[0]):u):u};function oc(o,u,d){sc(o,u),d.length>0&&(o.i=null,o.g.set(Er(o,u),D(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let p=0;p<u.length;p++){var d=u[p];const x=ls(d);d=ac(this,d);for(let P=0;P<d.length;P++){let J=x;d[P]!==""&&(J+="="+ls(d[P])),o.push(J)}}return this.i=o.join("&")};function lc(o){const u=new fs;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function Er(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function nC(o,u){u&&!o.j&&($n(o),o.i=null,o.g.forEach(function(d,p){const x=p.toLowerCase();p!=x&&(sc(this,p),oc(this,x,d))},o)),o.j=u}function rC(o,u){const d=new os;if(a.Image){const p=new Image;p.onload=h(hn,d,"TestLoadImage: loaded",!0,u,p),p.onerror=h(hn,d,"TestLoadImage: error",!1,u,p),p.onabort=h(hn,d,"TestLoadImage: abort",!1,u,p),p.ontimeout=h(hn,d,"TestLoadImage: timeout",!1,u,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function sC(o,u){const d=new os,p=new AbortController,x=setTimeout(()=>{p.abort(),hn(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(P=>{clearTimeout(x),P.ok?hn(d,"TestPingServer: ok",!0,u):hn(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(x),hn(d,"TestPingServer: error",!1,u)})}function hn(o,u,d,p,x){try{x&&(x.onload=null,x.onerror=null,x.onabort=null,x.ontimeout=null),p(d)}catch{}}function iC(){this.g=new Up}function mo(o){this.i=o.Sb||null,this.h=o.ab||!1}f(mo,VB),mo.prototype.g=function(){return new bi(this.i,this.h)};function bi(o,u){$e.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(bi,$e),n=bi.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,Cs(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ps(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Cs(this)),this.g&&(this.readyState=3,Cs(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Bc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Bc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?ps(this):Cs(this),this.readyState==3&&Bc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,ps(this))},n.Na=function(o){this.g&&(this.response=o,ps(this))},n.ga=function(){this.g&&ps(this)};function ps(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Cs(o)}n.setRequestHeader=function(o,u){this.A.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function Cs(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(bi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function cc(o){let u="";return mi(o,function(d,p){u+=p,u+=":",u+=d,u+=`\r
`}),u}function go(o,u,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=cc(d),typeof o=="string"?d!=null&&ls(d):De(o,u,d))}function Ae(o){$e.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(Ae,$e);var aC=/^https?$/i,oC=["POST","PUT"];n=Ae.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,u,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():qB.g(),this.g.onreadystatechange=C(c(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(P){uc(this,P);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var x in p)d.set(x,p[x]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const P of p.keys())d.set(P,p.get(P));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),x=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(oC,u,void 0)>=0)||p||x||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,J]of d)this.g.setRequestHeader(P,J);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(P){uc(this,P)}};function uc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,hc(o),Ii(o)}function hc(o){o.A||(o.A=!0,et(o,"complete"),et(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,et(this,"complete"),et(this,"abort"),Ii(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ii(this,!0)),Ae.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?dc(this):this.Xa())},n.Xa=function(){dc(this)};function dc(o){if(o.h&&typeof i<"u"){if(o.v&&dn(o)==4)setTimeout(o.Ca.bind(o),0);else if(et(o,"readystatechange"),dn(o)==4){o.h=!1;try{const P=o.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var p;if(p=P===0){let J=String(o.D).match(nc)[1]||null;!J&&a.self&&a.self.location&&(J=a.self.location.protocol.slice(0,-1)),p=!aC.test(J?J.toLowerCase():"")}d=p}if(d)et(o,"complete"),et(o,"success");else{o.o=6;try{var x=dn(o)>2?o.g.statusText:""}catch{x=""}o.l=x+" ["+o.ca()+"]",hc(o)}}finally{Ii(o)}}}}function Ii(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,u||et(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function dn(o){return o.g?o.g.readyState:0}n.ca=function(){try{return dn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Gp(u)}};function fc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function lC(o){const u={};o=(o.g&&dn(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(_(o[p]))continue;var d=zp(o[p]);const x=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=u[x]||[];u[x]=P,P.push(d)}Np(u,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ms(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function pc(o){this.za=0,this.i=[],this.j=new os,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ms("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ms("baseRetryDelayMs",5e3,o),this.Za=ms("retryDelaySeedMs",1e4,o),this.Ta=ms("forwardChannelMaxRetries",2,o),this.va=ms("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new YB(o&&o.concurrentRequestLimit),this.Ba=new iC,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=pc.prototype,n.ka=8,n.I=1,n.connect=function(o,u,d,p){tt(0),this.W=o,this.H=u||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=bc(this,null,this.W),Ti(this)};function Eo(o){if(Cc(o),o.I==3){var u=o.V++,d=Pt(o.J);if(De(d,"SID",o.M),De(d,"RID",u),De(d,"TYPE","terminate"),gs(o,d),u=new cn(o,o.j,u),u.M=2,u.A=wi(Pt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=u.A,d=!0),d||(u.g=Ic(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Di(u)}wc(o)}function vi(o){o.g&&(yo(o),o.g.cancel(),o.g=null)}function Cc(o){vi(o),o.v&&(a.clearTimeout(o.v),o.v=null),Ai(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Ti(o){if(!XB(o.h)&&!o.m){o.m=!0;var u=o.Ea;Be||E(),he||(Be(),he=!0),I.add(u,o),o.D=0}}function BC(o,u){return ZB(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=as(c(o.Ea,o,u),Dc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const x=new cn(this,this.j,o);let P=this.o;if(this.U&&(P?(P=AB(P),RB(P,this.U)):P=this.U),this.u!==null||this.R||(x.J=P,P=null),this.S)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,u>4096){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=gc(this,x,u),d=Pt(this.J),De(d,"RID",o),De(d,"CVER",22),this.G&&De(d,"X-HTTP-Session-Id",this.G),gs(this,d),P&&(this.R?u="headers="+ls(cc(P))+"&"+u:this.u&&go(d,this.u,P)),po(this.h,x),this.Ra&&De(d,"TYPE","init"),this.S?(De(d,"$req",u),De(d,"SID","null"),x.U=!0,co(x,d,null)):co(x,d,u),this.I=2}}else this.I==3&&(o?mc(this,o):this.i.length==0||XB(this.h)||mc(this))};function mc(o,u){var d;u?d=u.l:d=o.V++;const p=Pt(o.J);De(p,"SID",o.M),De(p,"RID",d),De(p,"AID",o.K),gs(o,p),o.u&&o.o&&go(p,o.u,o.o),d=new cn(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),u&&(o.i=u.G.concat(o.i)),u=gc(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),po(o.h,d),co(d,p,u)}function gs(o,u){o.H&&mi(o.H,function(d,p){De(u,p,d)}),o.l&&mi({},function(d,p){De(u,p,d)})}function gc(o,u,d){d=Math.min(o.i.length,d);const p=o.l?c(o.l.Ka,o.l,o):null;e:{var x=o.i;let oe=-1;for(;;){const ke=["count="+d];oe==-1?d>0?(oe=x[0].g,ke.push("ofs="+oe)):oe=0:ke.push("ofs="+oe);let ge=!0;for(let Ge=0;Ge<d;Ge++){var P=x[Ge].g;const St=x[Ge].map;if(P-=oe,P<0)oe=Math.max(0,x[Ge].g-100),ge=!1;else try{P="req"+P+"_"||"";try{var J=St instanceof Map?St:Object.entries(St);for(const[Qn,fn]of J){let pn=fn;l(fn)&&(pn=io(fn)),ke.push(P+Qn+"="+encodeURIComponent(pn))}}catch(Qn){throw ke.push(P+"type="+encodeURIComponent("_badmap")),Qn}}catch{p&&p(St)}}if(ge){J=ke.join("&");break e}}J=void 0}return o=o.i.splice(0,d),u.G=o,J}function Ec(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;Be||E(),he||(Be(),he=!0),I.add(u,o),o.A=0}}function _o(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=as(c(o.Da,o),Dc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,_c(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=as(c(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,tt(10),vi(this),_c(this))};function yo(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function _c(o){o.g=new cn(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=Pt(o.na);De(u,"RID","rpc"),De(u,"SID",o.M),De(u,"AID",o.K),De(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&De(u,"TO",o.ia),De(u,"TYPE","xmlhttp"),gs(o,u),o.u&&o.o&&go(u,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=wi(Pt(u)),d.u=null,d.R=!0,KB(d,o)}n.Va=function(){this.C!=null&&(this.C=null,vi(this),_o(this),tt(19))};function Ai(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function yc(o,u){var d=null;if(o.g==u){Ai(o),yo(o),o.g=null;var p=2}else if(fo(o.h,u))d=u.G,ec(o.h,u),p=1;else return;if(o.I!=0){if(u.o)if(p==1){d=u.u?u.u.length:0,u=Date.now()-u.F;var x=o.D;p=_i(),et(p,new jB(p,d)),Ti(o)}else Ec(o);else if(x=u.m,x==3||x==0&&u.X>0||!(p==1&&BC(o,u)||p==2&&_o(o)))switch(d&&d.length>0&&(u=o.h,u.i=u.i.concat(d)),x){case 1:Kn(o,5);break;case 4:Kn(o,10);break;case 3:Kn(o,6);break;default:Kn(o,2)}}}function Dc(o,u){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*u}function Kn(o,u){if(o.j.info("Error code "+u),u==2){var d=c(o.bb,o),p=o.Ua;const x=!p;p=new un(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||cs(p,"https"),wi(p),x?rC(p.toString(),d):sC(p.toString(),d)}else tt(2);o.I=0,o.l&&o.l.pa(u),wc(o),Cc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),tt(2)):(this.j.info("Failed to ping google.com"),tt(1))};function wc(o){if(o.I=0,o.ja=[],o.l){const u=tc(o.h);(u.length!=0||o.i.length!=0)&&(A(o.ja,u),A(o.ja,o.i),o.h.i.length=0,D(o.i),o.i.length=0),o.l.oa()}}function bc(o,u,d){var p=d instanceof un?Pt(d):new un(d);if(p.g!="")u&&(p.g=u+"."+p.g),us(p,p.u);else{var x=a.location;p=x.protocol,u=u?u+"."+x.hostname:x.hostname,x=+x.port;const P=new un(null);p&&cs(P,p),u&&(P.g=u),x&&us(P,x),d&&(P.h=d),p=P}return d=o.G,u=o.wa,d&&u&&De(p,d,u),De(p,"VER",o.ka),gs(o,p),p}function Ic(o,u,d){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new Ae(new mo({ab:d})):new Ae(o.ma),u.Fa(o.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function vc(){}n=vc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function xi(){}xi.prototype.g=function(o,u){return new Ct(o,u)};function Ct(o,u){$e.call(this),this.g=new pc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!_(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!_(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new _r(this)}f(Ct,$e),Ct.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ct.prototype.close=function(){Eo(this.g)},Ct.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=io(o),o=d);u.i.push(new Qp(u.Ya++,o)),u.I==3&&Ti(u)},Ct.prototype.N=function(){this.g.l=null,delete this.j,Eo(this.g),delete this.g,Ct.Z.N.call(this)};function Tc(o){ao.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}f(Tc,ao);function Ac(){oo.call(this),this.status=1}f(Ac,oo);function _r(o){this.g=o}f(_r,vc),_r.prototype.ra=function(){et(this.g,"a")},_r.prototype.qa=function(o){et(this.g,new Tc(o))},_r.prototype.pa=function(o){et(this.g,new Ac)},_r.prototype.oa=function(){et(this.g,"b")},xi.prototype.createWebChannel=xi.prototype.g,Ct.prototype.send=Ct.prototype.o,Ct.prototype.open=Ct.prototype.m,Ct.prototype.close=Ct.prototype.close,Pd=function(){return new xi},Rd=function(){return _i()},xd=qn,Qo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},yi.NO_ERROR=0,yi.TIMEOUT=8,yi.HTTP_ERROR=6,Ki=yi,JB.COMPLETE="complete",Ad=JB,MB.EventType=ss,ss.OPEN="a",ss.CLOSE="b",ss.ERROR="c",ss.MESSAGE="d",$e.prototype.listen=$e.prototype.J,Ds=MB,Ae.prototype.listenOnce=Ae.prototype.K,Ae.prototype.getLastError=Ae.prototype.Ha,Ae.prototype.getLastErrorCode=Ae.prototype.ya,Ae.prototype.getStatus=Ae.prototype.ca,Ae.prototype.getResponseJson=Ae.prototype.La,Ae.prototype.getResponseText=Ae.prototype.la,Ae.prototype.send=Ae.prototype.ea,Ae.prototype.setWithCredentials=Ae.prototype.Fa,Td=Ae}).apply(typeof Si<"u"?Si:typeof self<"u"?self:typeof window<"u"?window:{});/*!
* re2js
* RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
*
* @version v2.8.6
* @author Oleksii Vasyliev
* @homepage https://github.com/le0pard/re2js#readme
* @repository github:le0pard/re2js
* @license MIT
*/var Ee,k=(Ee=class{},U(Ee,"FOLD_CASE",1),U(Ee,"LITERAL",2),U(Ee,"CLASS_NL",4),U(Ee,"DOT_NL",8),U(Ee,"ONE_LINE",16),U(Ee,"NON_GREEDY",32),U(Ee,"PERL_X",64),U(Ee,"UNICODE_GROUPS",128),U(Ee,"WAS_DOLLAR",256),U(Ee,"LOOKBEHIND",512),U(Ee,"MATCH_NL",Ee.CLASS_NL|Ee.DOT_NL),U(Ee,"PERL",Ee.CLASS_NL|Ee.ONE_LINE|Ee.PERL_X|Ee.UNICODE_GROUPS),U(Ee,"POSIX",0),U(Ee,"UNANCHORED",0),U(Ee,"ANCHOR_START",1),U(Ee,"ANCHOR_BOTH",2),Ee);const yr={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},Vs=128,Wo=new Int32Array(Vs),Yo=new Int32Array(Vs),Oi=65535;for(let n=0;n<Vs;n++)n>=97&&n<=122?Wo[n]=n-32:Wo[n]=n,n>=65&&n<=90?Yo[n]=n+32:Yo[n]=n;var Uo,S=(Uo=class{static toUpperCase(n){if(n<Vs)return Wo[n];const e=String.fromCodePoint(n).toUpperCase(),t=e.codePointAt(0)>Oi?2:1;if(e.length>t)return n;const r=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=r.codePointAt(0)>Oi?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}static toLowerCase(n){if(n<Vs)return Yo[n];const e=String.fromCodePoint(n).toLowerCase(),t=e.codePointAt(0)>Oi?2:1;if(e.length>t)return n;const r=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=r.codePointAt(0)>Oi?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}},U(Uo,"CODES",new Map([["\x07",7],["\b",8],["	",9],[`
`,10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["'",39],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["`",96],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]])),Uo),m=class{constructor(n,e=!1){this.data=n,this.isStride1=e,this.SIZE=e?2:3}getLo(n){return this.data[n*this.SIZE]}getHi(n){return this.data[n*this.SIZE+1]}getStride(n){return this.isStride1?1:this.data[n*this.SIZE+2]}get length(){return this.data.length/this.SIZE}};const Sd=new Uint8Array(256);for(let n=0,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";n<64;n++)Sd[e.charCodeAt(n)]=n;const Od=n=>{const e=[];let t=0,r=0;for(let s=0;s<n.length;s++){let i=Sd[n.charCodeAt(s)];t|=(i&31)<<r,i&32?r+=5:(e.push(t),t=0,r=0)}return e},g=(n,e)=>{const t=Od(n),r=e?t.length/2:t.length/3,s=new Uint32Array(r*3);let i=0,a=0;for(let l=0;l<r;l++)i+=t[a++],s[l*3]=i,i+=t[a++],s[l*3+1]=i,s[l*3+2]=e?1:t[a++];return s},jE=n=>{const e=Od(n),t=new Map;let r=0;for(let s=0;s<e.length;s+=2){r+=e[s];const i=e[s+1],a=i>>>1^-(i&1);t.set(r,r+a)}return t};var Ni=class{constructor(n){this.initializer=n,this.cache=new Map}has(n){return n in this.initializer}get(n){if(this.cache.has(n))return this.cache.get(n);const e=this.initializer[n],t=e?e():null;return this.cache.set(n,t),t}},gn,ot=(gn=class{static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=jE("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static get Print(){return this._Print||(this._Print=new m(g("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}static get Upper(){return this.CATEGORIES.get("Lu")}},U(gn,"_CASE_ORBIT",null),U(gn,"_Print",null),U(gn,"CATEGORIES",new Ni({C:()=>new m(g("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new m(g("AfgDgB",!0)),Cf:()=>new m(g("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new m(g("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new m(g("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new m(g("gg2B--B",!0)),L:()=>new m(g("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new m(g("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new m(g("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new m(g("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new m(g("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new m(g("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new m(g("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new m(g("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new m(g("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new m(g("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new m(g("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new m(g("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new m(g("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new m(g("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new m(g("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new m(g("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new m(g("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new m(g("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new m(g("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new m(g("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new m(g("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new m(g("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new m(g("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new m(g("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new m(g("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new m(g("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new m(g("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new m(g("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new m(g("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new m(g("ohIA",!0)),Zp:()=>new m(g("phIA",!0)),Zs:()=>new m(g("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new m(g("wBJIFbF",!0)),Alphabetic:()=>new m(g("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new m(g("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new m(g("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new m(g("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new m(g("7-8DE",!0)),Emoji_Modifier_Base:()=>new m(g("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new m(g("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new m(g("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new m(g("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new m(g("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new m(g("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new m(g("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new m(g("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new m(g("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new m(g("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))})),U(gn,"SCRIPTS",new Ni({Adlam:()=>new m(g("go6DrCFJFB",!0)),Ahom:()=>new m(g("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new m(g("ggxCmS",!0)),Arabic:()=>new m(g("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new m(g("xpBlBDxBDCks9BE",!0)),Avestan:()=>new m(g("g4iC1BEG",!0)),Balinese:()=>new m(g("g4GsCCxB",!0)),Bamum:()=>new m(g("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new m(g("w26CdDF",!0)),Batak:()=>new m(g("g+GzBJD",!0)),Bengali:()=>new m(g("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new m(g("g17CYDY",!0)),Bhaiksuki:()=>new m(g("ggnCICsBCNLc",!0)),Bopomofo:()=>new m(g("qXB6wLqBxDf",!0)),Brahmi:()=>new m(g("ggkCtCFjBKA",!0)),Braille:()=>new m(g("ggK-H",!0)),Buginese:()=>new m(g("gwGbDB",!0)),Buhid:()=>new m(g("g6FT",!0)),Canadian_Aboriginal:()=>new m(g("ggF-TxRlC7tgCP",!0)),Carian:()=>new m(g("g1gCwB",!0)),Caucasian_Albanian:()=>new m(g("wphCzBMA",!0)),Chakma:()=>new m(g("gokC0BCR",!0)),Cham:()=>new m(g("gwqB2BKNDJDD",!0)),Cherokee:()=>new m(g("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new m(g("w9jCb",!0)),Common:()=>new m(g("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new m(g("ifNxkKzDGG",!0)),Cuneiform:()=>new m(g("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new m(g("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new m(g("w8rCiD",!0)),Cyrillic:()=>new m(g("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new m(g("gghCvC",!0)),Devanagari:()=>new m(g("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new m(g("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new m(g("ggmC7B",!0)),Duployan:()=>new m(g("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new m(g("ggsC1iBL68D",!0)),Elbasan:()=>new m(g("gohCnB",!0)),Elymaic:()=>new m(g("g-jCW",!0)),Ethiopic:()=>new m(g("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new m(g("gqjClBEcJB",!0)),Georgian:()=>new m(g("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new m(g("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new m(g("w5gCa",!0)),Grantha:()=>new m(g("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new m(g("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new m(g("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new m(g("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new m(g("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new m(g("go4C5B",!0)),Han:()=>new m(g("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new m(g("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new m(g("gojCnBJJ",!0)),Hanunoo:()=>new m(g("g5FU",!0)),Hatran:()=>new m(g("gniCSCBGE",!0)),Hebrew:()=>new m(g("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new m(g("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new m(g("giiCVCI",!0)),Inherited:()=>new m(g("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new m(g("g7iCSGH",!0)),Inscriptional_Parthian:()=>new m(g("g6iCVDH",!0)),Javanese:()=>new m(g("gsqBtCDJFB",!0)),Kaithi:()=>new m(g("gkkCiCLA",!0)),Kannada:()=>new m(g("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new m(g("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new m(g("g4nCQCoBEc",!0)),Kayah_Li:()=>new m(g("goqBtBCA",!0)),Kharoshthi:()=>new m(g("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new m(g("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new m(g("g8F9CDJHJnPf",!0)),Khojki:()=>new m(g("gwkCRCuB",!0)),Khudawadi:()=>new m(g("w1kC6BGJ",!0)),Kirat_Rai:()=>new m(g("gq7C5B",!0)),Lao:()=>new m(g("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new m(g("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new m(g("ggH3BEOEC",!0)),Limbu:()=>new m(g("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new m(g("gwhC2JKVLH",!0)),Linear_B:()=>new m(g("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new m(g("wmpBvBx1eA",!0)),Lycian:()=>new m(g("g0gCc",!0)),Lydian:()=>new m(g("gpiCZGA",!0)),Mahajani:()=>new m(g("wqkCmB",!0)),Makasar:()=>new m(g("g3nCY",!0)),Malayalam:()=>new m(g("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new m(g("giCbDA",!0)),Manichaean:()=>new m(g("g2iCmBFL",!0)),Marchen:()=>new m(g("wjnCfDVCN",!0)),Masaram_Gondi:()=>new m(g("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new m(g("gy7C6C",!0)),Meetei_Mayek:()=>new m(g("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new m(g("gg6DkGDP",!0)),Meroitic_Cursive:()=>new m(g("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new m(g("gsiCf",!0)),Miao:()=>new m(g("g47CqCF4BIQ",!0)),Modi:()=>new m(g("gwlCkCMJ",!0)),Mongolian:()=>new m(g("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new m(g("gy6CeCJFB",!0)),Multani:()=>new m(g("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new m(g("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new m(g("gkiCeJI",!0)),Nag_Mundari:()=>new m(g("wm5DpB",!0)),Nandinagari:()=>new m(g("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new m(g("gsGrBFZHKEB",!0)),Newa:()=>new m(g("gglC7CCE",!0)),Nko:()=>new m(g("g+B6BDC",!0)),Nushu:()=>new m(g("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new m(g("go4DsBENDJFB",!0)),Ogham:()=>new m(g("g0Fc",!0)),Ol_Chiki:()=>new m(g("wiHvB",!0)),Ol_Onal:()=>new m(g("wu5DqBFA",!0)),Old_Hungarian:()=>new m(g("gkjCyBOyBIF",!0)),Old_Italic:()=>new m(g("g4gCjBKC",!0)),Old_North_Arabian:()=>new m(g("g0iCf",!0)),Old_Permic:()=>new m(g("w6gCqB",!0)),Old_Persian:()=>new m(g("g9gCjBFN",!0)),Old_Sogdian:()=>new m(g("g4jCnB",!0)),Old_South_Arabian:()=>new m(g("gziCf",!0)),Old_Turkic:()=>new m(g("ggjCoC",!0)),Old_Uyghur:()=>new m(g("w7jCZ",!0)),Oriya:()=>new m(g("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new m(g("wlhCjBFjB",!0)),Osmanya:()=>new m(g("gkhCdDJ",!0)),Pahawh_Hmong:()=>new m(g("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new m(g("gjiCf",!0)),Pau_Cin_Hau:()=>new m(g("g2mC4B",!0)),Phags_Pa:()=>new m(g("giqB3B",!0)),Phoenician:()=>new m(g("goiCbEA",!0)),Psalter_Pahlavi:()=>new m(g("g8iCRIDNG",!0)),Rejang:()=>new m(g("wpqBjBMA",!0)),Runic:()=>new m(g("g1FqCEK",!0)),Samaritan:()=>new m(g("ggCtBDO",!0)),Saurashtra:()=>new m(g("gkqBlCJL",!0)),Sharada:()=>new m(g("gskC-ChsCH",!0)),Shavian:()=>new m(g("wihCvB",!0)),Siddham:()=>new m(g("gslC1BDlB",!0)),Sidetic:()=>new m(g("gqiCZ",!0)),SignWriting:()=>new m(g("gg2DrUQECO",!0)),Sinhala:()=>new m(g("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new m(g("w5jCpB",!0)),Sora_Sompeng:()=>new m(g("wmkCYIJ",!0)),Soyombo:()=>new m(g("wymCyC",!0)),Sundanese:()=>new m(g("g8G-BhIH",!0)),Sunuwar:()=>new m(g("g+mChBPJ",!0)),Syloti_Nagri:()=>new m(g("ggqBsB",!0)),Syriac:()=>new m(g("g4BNC7BDCxIK",!0)),Tagalog:()=>new m(g("g4FVKA",!0)),Tagbanwa:()=>new m(g("g7FMCCCB",!0)),Tai_Le:()=>new m(g("wqGdDE",!0)),Tai_Tham:()=>new m(g("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new m(g("g0qBiCZE",!0)),Tai_Yo:()=>new m(g("g25DeCVJB",!0)),Takri:()=>new m(g("g0lC5BHJ",!0)),Tamil:()=>new m(g("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new m(g("wz6CuCCJ",!0)),Tangut:()=>new m(g("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new m(g("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new m(g("g8BxB",!0)),Thai:()=>new m(g("hwD5BGb",!0)),Tibetan:()=>new m(g("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new m(g("wpL3BIBPA",!0)),Tirhuta:()=>new m(g("gklCnCJJ",!0)),Todhri:()=>new m(g("guhCzB",!0)),Tolong_Siki:()=>new m(g("wtnCrBFJ",!0)),Toto:()=>new m(g("w04De",!0)),Tulu_Tigalari:()=>new m(g("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new m(g("g8gCdCA",!0)),Unknown:()=>new m(g("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new m(g("gopBrJ",!0)),Vithkuqi:()=>new m(g("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new m(g("g24D5BGA",!0)),Warang_Citi:()=>new m(g("glmCyCNA",!0)),Yezidi:()=>new m(g("g0jCpBCCDB",!0)),Yi:()=>new m(g("ggoBskBE2B",!0)),Zanabazar_Square:()=>new m(g("gwmCnC",!0))})),U(gn,"FOLD_CATEGORIES",new Ni({L:()=>new m(g("laA",!0)),LC:()=>new m(g("laA",!0)),Ll:()=>new m(g("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new m(g("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new m(g("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new m(g("5cgBgBlgHAB",!1)),Mn:()=>new m(g("5cgBgBlgHAB",!1)),Emoji:()=>new m(g("8mJA",!0)),Extended_Pictographic:()=>new m(g("8mJA",!0)),Lowercase:()=>new m(g("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new m(g("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new m(g("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))})),U(gn,"FOLD_SCRIPT",new Ni({Common:()=>new m(g("8cgBgB",!1)),Greek:()=>new m(g("1FwUwU",!1)),Inherited:()=>new m(g("5cgBgBlgHAB",!1))})),gn),_e,$=(_e=class{static is32(e,t){let r=0,s=e.length;for(;r<s;){const i=r+Math.floor((s-r)/2),a=e.getLo(i),l=e.getHi(i);if(a<=t&&t<=l){const B=e.getStride(i);return(t-a)%B===0}t<a?s=i:r=i+1}return!1}static is(e,t){if(t<=_e.MAX_LATIN1){for(let r=0;r<e.length;r++){if(t>e.getHi(r))continue;const s=e.getLo(r);if(t<s)return!1;const i=e.getStride(r);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&_e.is32(e,t)}static isUpper(e){if(e<=_e.MAX_LATIN1){const t=String.fromCodePoint(e);return t.toUpperCase()===t&&t.toLowerCase()!==t}return _e.is(ot.Upper,e)}static isPrint(e){return e<=_e.MAX_LATIN1?e>=32&&e<_e.MAX_ASCII||e>=161&&e!==173:_e.is(ot.Print,e)}static simpleFold(e){if(ot.CASE_ORBIT.has(e))return ot.CASE_ORBIT.get(e);const t=S.toLowerCase(e);return t!==e?t:S.toUpperCase(e)}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=_e.MAX_ASCII&&t<=_e.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let r=_e.simpleFold(e);r!==e;r=_e.simpleFold(r))if(r===t)return!0;return!1}},U(_e,"MAX_RUNE",1114111),U(_e,"MAX_ASCII",127),U(_e,"MAX_LATIN1",255),U(_e,"MAX_BMP",65535),U(_e,"MIN_FOLD",65),U(_e,"MAX_FOLD",125251),U(_e,"MIN_HIGH_SURROGATE",55296),U(_e,"MAX_HIGH_SURROGATE",56319),U(_e,"MIN_LOW_SURROGATE",56320),U(_e,"MAX_LOW_SURROGATE",57343),U(_e,"MIN_SUPPLEMENTARY_CODE_POINT",65536),_e);const Rl=256,Nd=new Uint8Array(Rl);for(let n=0;n<Rl;n++)Nd[n]=97<=n&&n<=122||65<=n&&n<=90||48<=n&&n<=57||n===95?1:0;let Ro=null,Po=null;var be,Y=(be=class{static emptyInts(){return[]}static isByteArray(e){return Array.isArray(e)||e instanceof Uint8Array}static isalnum(e){return S.CODES.get("0")<=e&&e<=S.CODES.get("9")||S.CODES.get("a")<=e&&e<=S.CODES.get("z")||S.CODES.get("A")<=e&&e<=S.CODES.get("Z")}static unhex(e){return S.CODES.get("0")<=e&&e<=S.CODES.get("9")?e-S.CODES.get("0"):S.CODES.get("a")<=e&&e<=S.CODES.get("f")?e-S.CODES.get("a")+10:S.CODES.get("A")<=e&&e<=S.CODES.get("F")?e-S.CODES.get("A")+10:-1}static escapeRune(e){let t="";if($.isPrint(e))be.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case S.CODES.get('"'):t+='\\"';break;case S.CODES.get("\\"):t+="\\\\";break;case S.CODES.get("	"):t+="\\t";break;case S.CODES.get(`
`):t+="\\n";break;case S.CODES.get("\r"):t+="\\r";break;case S.CODES.get("\b"):t+="\\b";break;case S.CODES.get("\f"):t+="\\f";break;default:{let r=e.toString(16);e<256?(t+="\\x",r.length===1&&(t+="0"),t+=r):t+=`\\x{${r}}`;break}}return t}static stringToRunes(e){const t=String(e),r=[];let s=0;for(;s<t.length;){const i=t.codePointAt(s);r.push(i),s+=i>$.MAX_BMP?2:1}return r}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<Rl?Nd[e]===1:!1}static emptyOpContext(e,t){let r=0;return e<0&&(r|=be.EMPTY_BEGIN_TEXT|be.EMPTY_BEGIN_LINE),e===10&&(r|=be.EMPTY_BEGIN_LINE),t<0&&(r|=be.EMPTY_END_TEXT|be.EMPTY_END_LINE),t===10&&(r|=be.EMPTY_END_LINE),be.isWordRune(e)!==be.isWordRune(t)?r|=be.EMPTY_WORD_BOUNDARY:r|=be.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(e){return e.split("").map(t=>be.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>$.MAX_BMP?2:1}static toArray(e){const t=e.length,r=new Array(t);for(let s=0;s<t;s++)r[s]=e[s];return r}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return Ro||(Ro=new TextEncoder),Ro.encode(e);{let t=[],r=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[r++]=i:i<2048?(t[r++]=i>>6|192,t[r++]=i&63|128):(i&64512)===$.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===$.MIN_LOW_SURROGATE?(i=$.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[r++]=i>>18|240,t[r++]=i>>12&63|128,t[r++]=i>>6&63|128,t[r++]=i&63|128):(t[r++]=i>>12|224,t[r++]=i>>6&63|128,t[r++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){Po||(Po=new TextDecoder("utf-8"));const t=e instanceof Uint8Array?e:new Uint8Array(e);return Po.decode(t)}else{let t=[],r=0,s=0;for(;r<e.length;){let i=e[r++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[r++];t[s++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[r++],l=e[r++],B=e[r++],c=((i&7)<<18|(a&63)<<12|(l&63)<<6|B&63)-$.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode($.MIN_HIGH_SURROGATE+(c>>10)),t[s++]=String.fromCharCode($.MIN_LOW_SURROGATE+(c&1023))}else{let a=e[r++],l=e[r++];t[s++]=String.fromCharCode((i&15)<<12|(a&63)<<6|l&63)}}return t.join("")}}},U(be,"METACHARACTERS","\\.+*?()|[]{}^$"),U(be,"EMPTY_BEGIN_LINE",1),U(be,"EMPTY_END_LINE",2),U(be,"EMPTY_BEGIN_TEXT",4),U(be,"EMPTY_END_TEXT",8),U(be,"EMPTY_WORD_BOUNDARY",16),U(be,"EMPTY_NO_WORD_BOUNDARY",32),U(be,"EMPTY_ALL",-1),be);const Ld=(n=[],e=0)=>{const t=Object.create(null);for(let r=0;r<n.length;r++){const s=n[r],i=e+r;t[s]=i,t[i]=s}return Object.freeze(t)};var vn,cr=(vn=class{getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===vn.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===vn.Encoding.UTF_16}},U(vn,"Encoding",Ld(["UTF_16","UTF_8"])),vn),ru=class extends cr{constructor(n=null){super(),this.bytes=n}getEncoding(){return cr.Encoding.UTF_8}asCharSequence(){return Y.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},JE=class extends cr{constructor(n=null){super(),this.charSequence=n}getEncoding(){return cr.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return Y.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},Zn=class{static utf16(n){return new JE(n)}static utf8(n){return Y.isByteArray(n)?new ru(n):new ru(Y.stringToUtf8ByteArray(n))}},rt=class{static EOF(){return-8}constructor(){this.end=0}canCheckPrefix(){return!0}endPos(){return this.end}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},qE=class extends rt{constructor(n,e=0,t=n.length){super(),this.bytes=n,this.start=e,this.end=t}hasString(n,e){const t=n.bytes;if(t.length===0)return!0;const r=this.indexOf(this.bytes,t,this.start+e);return r!==-1&&r<=this.end-t.length}hasAnyString(n,e){return n.ac8?n.ac8.searchUTF8(this.bytes,this.start+e,this.end):!1}step(n){if(n+=this.start,n>=this.end)return rt.EOF();const e=this.bytes[n]&255;if(e<128)return e<<3|1;if(e>=194&&e<=223&&n+1<this.end){const t=this.bytes[n+1]&255;return(t&192)!==128?e<<3|1:((e&31)<<6|t&63)<<3|2}else if(e>=224&&e<=239&&n+2<this.end){const t=this.bytes[n+1]&255;if((t&192)!==128)return e<<3|1;const r=this.bytes[n+2]&255;return(r&192)!==128?e<<3|1:((e&15)<<12|(t&63)<<6|r&63)<<3|3}else if(e>=240&&e<=244&&n+3<this.end){const t=this.bytes[n+1]&255;if((t&192)!==128)return e<<3|1;const r=this.bytes[n+2]&255;if((r&192)!==128)return e<<3|1;const s=this.bytes[n+3]&255;return(s&192)!==128?e<<3|1:((e&7)<<18|(t&63)<<12|(r&63)<<6|s&63)<<3|4}else return e<<3|1}index(n,e){e+=this.start;const t=this.indexOf(this.bytes,n.prefixUTF8,e);return t<0?t:t-e}context(n){n+=this.start;let e=-1;if(n>this.start&&n<=this.end){let r=n-1;if(e=this.bytes[r--],e>=128){let s=n-4;for(s<this.start&&(s=this.start);r>=s&&(this.bytes[r]&192)===128;)r--;r<this.start&&(r=this.start),e=this.step(r-this.start)>>3}}const t=n<this.end?this.step(n-this.start)>>3:-1;return Y.emptyOpContext(e,t)}indexOf(n,e,t=0){let r=e.length;if(r===0)return t<=this.end?t:-1;const s=e[0];let i=this.end-r;const a=typeof n.indexOf=="function";let l=t;for(;l<=i;){if(a){if(l=n.indexOf(s,l),l===-1||l>i)return-1}else{for(;l<=i&&n[l]!==s;)l++;if(l>i)return-1}let B=!0;for(let c=1;c<r;c++)if(n[l+c]!==e[c]){B=!1;break}if(B)return l;l++}return-1}prefixLength(n){return n.prefixUTF8.length}},zE=class extends rt{constructor(n,e=0,t=n.length){super(),this.charSequence=n,this.start=e,this.end=t}hasString(n,e){const t=this.charSequence.indexOf(n.str,this.start+e);return t!==-1&&t<=this.end-n.str.length}hasAnyString(n,e){return n.ac16?n.ac16.searchUTF16(this.charSequence,this.start+e,this.end):!1}step(n){if(n+=this.start,n>=this.end)return rt.EOF();const e=this.charSequence.charCodeAt(n);if(e<$.MIN_HIGH_SURROGATE||e>$.MAX_HIGH_SURROGATE||n+1>=this.end)return e<<3|1;const t=this.charSequence.charCodeAt(n+1);return t>=$.MIN_LOW_SURROGATE&&t<=$.MAX_LOW_SURROGATE?(e-$.MIN_HIGH_SURROGATE)*1024+(t-$.MIN_LOW_SURROGATE)+$.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(n,e){e+=this.start;const t=this.charSequence.indexOf(n.prefix,e);return t<0||t>this.end-n.prefix.length?-1:t-e}context(n){n+=this.start;const e=n>this.start&&n<=this.end?this.charSequence.charCodeAt(n-1):-1,t=n<this.end?this.charSequence.charCodeAt(n):-1;return Y.emptyOpContext(e,t)}prefixLength(n){return n.prefix.length}},we=class{static fromUTF8(n,e=0,t=n.length){return new qE(n,e,t)}static fromUTF16(n,e=0,t=n.length){return new zE(n,e,t)}},ii=class extends Error{constructor(n){super(n),this.name="RE2JSException"}},ye=class extends ii{constructor(n,e=null){let t=`error parsing regexp: ${n}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=n,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},$E=class extends ii{constructor(n){super(n),this.name="RE2JSCompileException"}},at=class extends ii{constructor(n){super(n),this.name="RE2JSGroupException"}},KE=class extends ii{constructor(n){super(n),this.name="RE2JSFlagsException"}},As=class extends ii{constructor(n){super(n),this.name="RE2JSInternalException"}},tr,su=(tr=class{static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(r=>{const s=r.codePointAt(0);return s===S.CODES.get("\\")||s===S.CODES.get("$")?`\\${r}`:r}).join(""):e.indexOf("$")<0?e:e.split("").map(r=>r.codePointAt(0)===S.CODES.get("$")?"$$":r).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;const r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,this.numberOfInstructions=r.numberOfInstructions(),t instanceof cr?this.resetMatcherInput(t):Y.isByteArray(t)?this.resetMatcherInput(Zn.utf8(t)):this.resetMatcherInput(Zn.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof cr||(Y.isByteArray(e)?e=Zn.utf8(e):e=Zn.utf16(e)),this.matcherInput=e,this.reset(),this}start(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new at(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new at(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){const s=this.namedGroups[e];if(!Number.isFinite(s))throw new at(`group '${e}' not found`);e=s}const t=this.start(e),r=this.end(e);return t<0&&r<0?null:this.substring(t,r)}getNamedGroups(){if(!this.hasMatch)throw new at("perhaps no match attempted");const e=Object.create(null);for(const t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(e<0||e>this.patternGroupCount)throw new at(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new at("perhaps no match attempted");if(e===0||this.hasGroups)return;const t=this.matcherInputLength,r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount);if(!r[0])throw new at("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,k.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,k.ANCHOR_START)}find(e=null){if(e!==null){if(e<0||e>this.matcherInputLength)throw new at(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){const t=(this.matcherInput.isUTF16Encoding()?we.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):we.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,k.UNANCHORED)}genMatch(e,t){const r=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?Y.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let r="";const s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),r}appendReplacementInternalJava(e){let t="",r=0;const s=e.length;let i=0;for(;i<s;){const a=e.codePointAt(i);if(a===S.CODES.get("\\")){if(r<i&&(t+=e.substring(r,i)),i++,i>=s)throw new at("character to be escaped is missing");r=i,i++;continue}if(a===S.CODES.get("$")){if(r<i&&(t+=e.substring(r,i)),i+1>=s)throw new at("Illegal group reference: group index is missing");const l=e.codePointAt(i+1);if(S.CODES.get("0")<=l&&l<=S.CODES.get("9")){let B=l-S.CODES.get("0"),c=i+2;for(;c<s;c++){const f=e.codePointAt(c);if(f<S.CODES.get("0")||f>S.CODES.get("9")||B*10+f-S.CODES.get("0")>this.patternGroupCount)break;B=B*10+f-S.CODES.get("0")}if(B>this.patternGroupCount)throw new at(`n > number of groups: ${B}`);const h=this.group(B);h!==null&&(t+=h),i=c,r=i}else if(l===S.CODES.get("{")){let B=i+2;for(;B<s&&e.codePointAt(B)!==S.CODES.get("}");)B++;if(B>=s)throw new at("named capture group is missing trailing '}'");const c=e.substring(i+2,B),h=this.group(c);h!==null&&(t+=h),i=B+1,r=i}else throw new at("Illegal group reference");continue}i++}return r<s&&(t+=e.substring(r,s)),t}appendReplacementInternalJs(e){let t="",r=0;const s=e.length;for(let i=0;i<s-1;i++)if(e.codePointAt(i)===S.CODES.get("$")){let a=e.codePointAt(i+1);if(S.CODES.get("$")===a){r<i&&(t+=e.substring(r,i)),t+="$",i++,r=i+1;continue}else if(S.CODES.get("&")===a){r<i&&(t+=e.substring(r,i));const l=this.group(0);l!==null?t+=l:t+="$&",i++,r=i+1;continue}else if(S.CODES.get("`")===a){r<i&&(t+=e.substring(r,i)),t+=this.substring(0,this.start(0)),i++,r=i+1;continue}else if(S.CODES.get("'")===a){r<i&&(t+=e.substring(r,i)),t+=this.substring(this.end(0),this.matcherInputLength),i++,r=i+1;continue}else if(S.CODES.get("1")<=a&&a<=S.CODES.get("9")){let l=a-S.CODES.get("0");for(r<i&&(t+=e.substring(r,i)),i+=2;i<s&&(a=e.codePointAt(i),!(a<S.CODES.get("0")||a>S.CODES.get("9")||l*10+a-S.CODES.get("0")>this.patternGroupCount));i++)l=l*10+a-S.CODES.get("0");if(l>this.patternGroupCount){t+=`$${l}`,r=i,i--;continue}const B=this.group(l);B!==null&&(t+=B),r=i,i--;continue}else if(a===S.CODES.get("<")){r<i&&(t+=e.substring(r,i)),i++;let l=i+1;for(;l<e.length&&e.codePointAt(l)!==S.CODES.get(">")&&e.codePointAt(l)!==S.CODES.get(" ");)l++;if(l===e.length||e.codePointAt(l)!==S.CODES.get(">")){t+=e.substring(i-1,l+1),r=l+1,i=l;continue}const B=e.substring(i+1,l);if(Object.prototype.hasOwnProperty.call(this.namedGroups,B)){const c=this.group(B);c!==null&&(t+=c)}else t+=`$<${B}>`;r=l+1,i=l;continue}}return r<s&&(t+=e.substring(r,s)),t}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,r=!1){let s="";this.reset();const i=typeof e=="function",a=Object.keys(this.namedGroups).length>0;let l=null;if(i){if(this.groupCount()>=tr.MAX_REPLACER_ARGS)throw new at("Too many capture groups to safely invoke replacer function");l=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,a,l):this.appendReplacement(e,r),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t,r){let s="";const i=this.start(),a=this.end();this.appendPos<i&&(s+=this.substring(this.appendPos,i)),this.appendPos=a;const l=this.buildReplacerArgs(i,t,r);return s+=String(e(...l)),s}buildReplacerArgs(e,t,r){const s=[this.group(0)],i=this.groupCount();for(let a=1;a<=i;a++){const l=this.start(a);l<0?s.push(void 0):s.push(this.substring(l,this.end(a)))}if(s.push(e),s.push(r),t){const a=this.getNamedGroups();for(const l in a)a[l]===null&&(a[l]=void 0);s.push(a)}return s}},U(tr,"MAX_REPLACER_ARGS",65535),tr),de,O=(de=class{static isRuneOp(e){return de.RUNE<=e&&e<=de.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let r of e)t+=Y.escapeRune(r);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=[],this.next=null}matchRune(e){if(this.runes.length===1){const a=this.runes[0];return this.arg&k.FOLD_CASE?$.equalsIgnoreCase(a,e):e===a}const t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return!1;if(e<=this.runes[a+1])return!0}return!1}let r=0,s=t>>1;for(;s>1;){const a=s>>1;r+=this.runes[r+a<<1]<=e?a:0,s-=a}r+=this.runes[r<<1]<=e?1:0;const i=r-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){const a=this.runes[0];return this.arg&k.FOLD_CASE?$.equalsIgnoreCase(a,e)?0:-1:e===a?0:-1}const t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return-1;if(e<=this.runes[a+1])return Math.floor(a/2)}return-1}let r=0,s=t>>1;for(;s>1;){const a=s>>1;r+=this.runes[r+a<<1]<=e?a:0,s-=a}r+=this.runes[r<<1]<=e?1:0;const i=r-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case de.ALT:return`alt -> ${this.out}, ${this.arg}`;case de.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case de.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case de.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case de.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case de.FAIL:return"fail";case de.NOP:return`nop -> ${this.out}`;case de.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case de.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case de.RUNE:return this.runes===null?"rune <null>":["rune ",de.escapeRunes(this.runes),this.arg&k.FOLD_CASE?"/i":""," -> ",this.out].join("");case de.RUNE1:return`rune1 ${de.escapeRunes(this.runes)} -> ${this.out}`;case de.RUNE_ANY:return`any -> ${this.out}`;case de.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},U(de,"ALT",1),U(de,"ALT_MATCH",2),U(de,"CAPTURE",3),U(de,"EMPTY_WIDTH",4),U(de,"FAIL",5),U(de,"MATCH",6),U(de,"NOP",7),U(de,"RUNE",8),U(de,"RUNE1",9),U(de,"RUNE_ANY",10),U(de,"RUNE_ANY_NOT_NL",11),U(de,"LB_WRITE",12),U(de,"LB_CHECK",13),de),iu=class{constructor(n){this.sparse=new Int32Array(n),this.densePcs=new Int32Array(n),this.denseCaps=null,this.size=0,this.ncap=0}init(n){this.ncap=n;const e=this.densePcs.length*n;(!this.denseCaps||this.denseCaps.length<e)&&(this.denseCaps=new Int32Array(e))}contains(n){const e=this.sparse[n];return e<this.size&&this.densePcs[e]===n}isEmpty(){return this.size===0}add(n){const e=this.size++;return this.sparse[n]=e,this.densePcs[e]=n,e}clear(){this.size=0}toString(){let n="{";for(let e=0;e<this.size;e++)e!==0&&(n+=", "),n+=this.densePcs[e];return n+="}",n}},QE=class Xo{static fromRE2(e){const t=new Xo;return t.prog=e.prog,t.re2=e,t.q0=new iu(t.prog.numInst()),t.q1=new iu(t.prog.numInst()),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}static fromMachine(e){return Xo.fromRE2(e.re2)}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?Y.emptyInts():Y.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,r){const s=this.re2.cond;if(s===Y.EMPTY_ALL||(r===k.ANCHOR_START||r===k.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);let i=this.prog.numLb>0?0:t,a=t,l=this.q0,B=this.q1,c=e.step(i),h=c>>3,f=c&7,C=-1,D=0;c!==rt.EOF()&&(c=e.step(i+f),C=c>>3,D=c&7);let A;for(i===0?A=Y.emptyOpContext(-1,h):A=e.context(i);;){if(l.isEmpty()){if(s&Y.EMPTY_BEGIN_TEXT&&i!==0||(r===k.ANCHOR_START||r===k.ANCHOR_BOTH)&&i!==0||this.matched)break;if(this.prog.numLb===0&&this.re2.prefix.length!==0&&C!==this.re2.prefixRune&&e.canCheckPrefix()){const z=e.index(this.re2,i);if(z<0)break;i+=z,c=e.step(i),h=c>>3,f=c&7,c=e.step(i+f),C=c>>3,D=c&7,A=e.context(i)}}if(i===0&&this.prog.numLb>0)for(let z=0;z<this.prog.lbStarts.length;z++)this.add(l,this.prog.lbStarts[z],i,this.matchcap,0,A);!this.matched&&(i===0||r===k.UNANCHORED)&&i>=a&&(this.ncap>0&&(this.matchcap[0]=i),this.add(l,this.prog.start,i,this.matchcap,0,A));const L=i+f;if(A=e.context(L),this.step(l,B,i,L,h,A,r,i===e.endPos()),f===0||this.ncap===0&&this.matched)break;i+=f,h=C,f=D,h!==-1&&(c=e.step(i+f),C=c>>3,D=c&7);const M=l;l=B,B=M}return B.clear(),this.matched}matchSet(e,t,r){const s=this.re2.cond;if(s===Y.EMPTY_ALL)return[];if((r===k.ANCHOR_START||r===k.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,a=t,l=this.q0,B=this.q1,c=e.step(i),h=c>>3,f=c&7,C=-1,D=0;c!==rt.EOF()&&(c=e.step(i+f),C=c>>3,D=c&7);let A=i===0?Y.emptyOpContext(-1,h):e.context(i);const L=new Set;for(;!(l.isEmpty()&&(s&Y.EMPTY_BEGIN_TEXT&&i!==0||(r===k.ANCHOR_START||r===k.ANCHOR_BOTH)&&i!==0));){if(i===0&&this.prog.numLb>0)for(let K=0;K<this.prog.lbStarts.length;K++)this.add(l,this.prog.lbStarts[K],i,this.matchcap,0,A);(i===0||r===k.UNANCHORED)&&i>=a&&this.add(l,this.prog.start,i,this.matchcap,0,A);const M=i+f;A=e.context(M);for(let K=0;K<l.size;K++){const ne=l.densePcs[K],ie=this.prog.inst[ne],Be=K*this.ncap;let he=!1;switch(ie.op){case O.MATCH:if(r===k.ANCHOR_BOTH&&i!==e.endPos())break;L.add(ie.arg);break;case O.RUNE:he=ie.matchRune(h);break;case O.RUNE1:he=h===ie.runes[0];break;case O.RUNE_ANY:he=!0;break;case O.RUNE_ANY_NOT_NL:he=h!==10;break;default:continue}he&&this.add(B,ie.out,M,l.denseCaps,Be,A)}if(l.clear(),f===0)break;i+=f,h=C,f=D,h!==-1&&(c=e.step(i+f),C=c>>3,D=c&7);const z=l;l=B,B=z}return B.clear(),Array.from(L).sort((M,z)=>M-z)}step(e,t,r,s,i,a,l,B){const c=this.re2.longest;for(let h=0;h<e.size;h++){const f=e.densePcs[h],C=h*this.ncap;if(c&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[C])continue;const D=this.prog.inst[f];let A=!1;switch(D.op){case O.MATCH:if(l===k.ANCHOR_BOTH&&!B)break;if(this.ncap>0&&(!c||!this.matched||this.matchcap[1]<r)){e.denseCaps[C+1]=r;for(let L=0;L<this.ncap;L++)this.matchcap[L]=e.denseCaps[C+L]}c||(e.size=0),this.matched=!0;break;case O.RUNE:A=D.matchRune(i);break;case O.RUNE1:A=i===D.runes[0];break;case O.RUNE_ANY:A=!0;break;case O.RUNE_ANY_NOT_NL:A=i!==10;break;default:continue}A&&this.add(t,D.out,s,e.denseCaps,C,a)}e.clear()}add(e,t,r,s,i,a){for(;;){if(t===0||e.contains(t))return;const l=e.add(t),B=this.prog.inst[t];switch(B.op){case O.FAIL:return;case O.ALT:case O.ALT_MATCH:this.add(e,B.out,r,s,i,a),t=B.arg;continue;case O.EMPTY_WIDTH:if(!(B.arg&~a)){t=B.out;continue}return;case O.NOP:t=B.out;continue;case O.CAPTURE:if(B.arg<this.ncap){const c=s[i+B.arg];s[i+B.arg]=r,this.add(e,B.out,r,s,i,a),s[i+B.arg]=c;return}else{t=B.out;continue}case O.LB_WRITE:this.lbTable[Math.abs(B.arg)]=r,t=B.out;continue;case O.LB_CHECK:if(B.arg>0){if(this.lbTable[B.arg]===r){t=B.out;continue}}else if(this.lbTable[-B.arg]!==r){t=B.out;continue}return;case O.MATCH:case O.RUNE:case O.RUNE1:case O.RUNE_ANY:case O.RUNE_ANY_NOT_NL:if(this.ncap>0){const c=l*this.ncap;for(let h=0;h<this.ncap;h++)e.denseCaps[c+h]=s[i+h]}return;default:throw new As("unhandled")}}}};const au=n=>{let e=-2128831035;for(let t=0;t<n.length;t++)e^=n[t],e=Math.imul(e,16777619);return e},WE=(n,e)=>{if(n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0};var YE=class{constructor(n,e,t=[]){this.nfaStates=n,this.isMatch=e,this.matchIDs=t,this.nextLatin1=new Array($.MAX_LATIN1+1).fill(null),this.nextLatin1Anchored=new Array($.MAX_LATIN1+1).fill(null),this.transKeys=[],this.transVals=[],this.lastSeen=0}},Wt,XE=(Wt=class{constructor(e,t=8388608){this.prog=e,this.stateCache=new Map,this.stateCount=0,this.startState=null,this.stateLimit=Math.max(1,Math.floor(t/Wt.STATE_MEMORY_ESTIMATE)),this.cacheClears=0,this.failed=!1,this.clock=0}computeClosure(e){const t=new Set,r=[...e];let s=!1;const i=[];for(;r.length>0;){const l=r.pop();if(t.has(l))continue;t.add(l);const B=this.prog.getInst(l);switch(B.op){case O.MATCH:s=!0,i.includes(B.arg)||i.push(B.arg);break;case O.ALT:case O.ALT_MATCH:r.push(B.out),r.push(B.arg);break;case O.NOP:case O.CAPTURE:r.push(B.out);break;case O.EMPTY_WIDTH:case O.LB_WRITE:case O.LB_CHECK:return null}}const a=Int32Array.from(t).sort();return i.sort((l,B)=>l-B),{pcs:a,isMatch:s,matchIDs:i}}getState(e){const t=this.computeClosure(e);if(!t)return null;const r=t.pcs,s=au(r);let i=this.stateCache.get(s);if(i)for(let l=0;l<i.length;l++){const B=i[l];if(WE(B.nfaStates,r))return B.lastSeen=++this.clock,B}else i=[],this.stateCache.set(s,i);if(this.failed)return null;if(this.stateCount>=this.stateLimit){if(this.cacheClears++,this.cacheClears>=Wt.MAX_CACHE_CLEARS)return this.failed=!0,this.stateCache.clear(),this.stateCount=0,this.startState=null,null;this.evictCache(),i=this.stateCache.get(s),i||(i=[],this.stateCache.set(s,i))}const a=new YE(r,t.isMatch,t.matchIDs);return a.lastSeen=++this.clock,i.push(a),this.stateCount++,a}evictCache(){const e=[];for(const a of this.stateCache.values())for(let l=0;l<a.length;l++)e.push(a[l]);e.sort((a,l)=>a.lastSeen-l.lastSeen);const t=Math.max(1,Math.floor(this.stateLimit/2)),r=e.length-t,s=e.slice(r),i=new Set(s);this.stateCache.clear(),this.stateCount=0;for(let a=0;a<s.length;a++){const l=s[a];l.nextLatin1.fill(null),l.nextLatin1Anchored.fill(null),l.transKeys.length=0,l.transVals.length=0;const B=au(l.nfaStates);let c=this.stateCache.get(B);c||(c=[],this.stateCache.set(B,c)),c.push(l),this.stateCount++}this.startState&&!i.has(this.startState)&&(this.startState=null)}step(e,t,r){if(t<=$.MAX_LATIN1)if(r===k.UNANCHORED){const a=e.nextLatin1[t];if(a!==null)return a}else{const a=e.nextLatin1Anchored[t];if(a!==null)return a}else{const a=t+(r===k.UNANCHORED?0:$.MAX_RUNE+1),l=e.transKeys,B=l.length;for(let c=0;c<B;c++)if(l[c]===a)return e.transVals[c]}const s=[];for(let a=0;a<e.nfaStates.length;a++){const l=e.nfaStates[a],B=this.prog.getInst(l);O.isRuneOp(B.op)&&B.matchRune(t)&&s.push(B.out)}r===k.UNANCHORED&&s.push(this.prog.start);const i=this.getState(s);if(t<=$.MAX_LATIN1)r===k.UNANCHORED?e.nextLatin1[t]=i:e.nextLatin1Anchored[t]=i;else{const a=t+(r===k.UNANCHORED?0:$.MAX_RUNE+1);e.transKeys.push(a),e.transVals.push(i)}return i}match(e,t,r){if((r===k.ANCHOR_START||r===k.ANCHOR_BOTH)&&t!==0)return!1;if(!this.startState&&(this.startState=this.getState([this.prog.start]),!this.startState))return null;let s=e.endPos(),i=this.startState;if(i.isMatch)if(r===k.ANCHOR_BOTH){if(t===s)return!0}else return!0;let a=t;for(;a<s;){const l=e.step(a),B=l>>3,c=l&7;if(c===0)break;if(i=r===k.UNANCHORED&&B<=$.MAX_LATIN1&&i.nextLatin1[B]||this.step(i,B,r),i===null)return null;if(i.lastSeen=++this.clock,i.isMatch)if(r===k.ANCHOR_BOTH){if(a+c===s)return!0}else return!0;if(i.nfaStates.length===0&&r!==k.UNANCHORED)return!1;a+=c}return!1}matchSet(e,t,r){if((r===k.ANCHOR_START||r===k.ANCHOR_BOTH)&&t!==0)return[];if(!this.startState&&(this.startState=this.getState([this.prog.start]),!this.startState))return null;let s=e.endPos(),i=this.startState;const a=new Set,l=(c,h)=>{c.isMatch&&(r===k.ANCHOR_BOTH?h===s&&c.matchIDs.forEach(f=>a.add(f)):c.matchIDs.forEach(f=>a.add(f)))};l(i,t);let B=t;for(;B<s;){const c=e.step(B),h=c>>3,f=c&7;if(f===0)break;if(i=r===k.UNANCHORED&&h<=$.MAX_LATIN1&&i.nextLatin1[h]||this.step(i,h,r),i===null)return null;if(i.lastSeen=++this.clock,B+=f,l(i,B),i.nfaStates.length===0&&r!==k.UNANCHORED)break}return Array.from(a).sort((c,h)=>c-h)}},U(Wt,"MAX_CACHE_CLEARS",5),U(Wt,"STATE_MEMORY_ESTIMATE",838),Wt);const ZE=32,e_=500,So=256,t_=256*1024;var n_=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(So),this.jobArg=new Uint8Array(So),this.jobPos=new Int32Array(So),this.jobLen=0,this.visited=new Uint32Array(0)}reset(n,e,t){this.end=e,this.jobLen=0,this.ncap=t;const r=n.numInst()*(e+1)+ZE-1>>>5;this.visited.length<r?this.visited=new Uint32Array(r):this.visited.fill(0,0,r),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(n,e){const t=n*(this.end+1)+e,r=t>>>5,s=1<<(t&31);return this.visited[r]&s?!1:(this.visited[r]|=s,!0)}push(n,e,t,r){if(n.prog.getInst(e).op!==O.FAIL&&(r||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){const s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;const a=new Uint8Array(s);a.set(this.jobArg),this.jobArg=a;const l=new Int32Array(s);l.set(this.jobPos),this.jobPos=l}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=r?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(n,e,t,r,s){const i=n.longest;for(this.push(n,t,r,!1);this.jobLen>0;){this.jobLen--;let a=this.jobPc[this.jobLen],l=this.jobArg[this.jobLen]===1,B=this.jobPos[this.jobLen],c=!0;for(;!(!c&&!this.shouldVisit(a,B));){c=!1;const h=n.prog.getInst(a);switch(h.op){case O.FAIL:throw new As("unexpected InstFail");case O.ALT:if(l){l=!1,a=h.arg;continue}else{this.push(n,a,B,!0),a=h.out;continue}case O.ALT_MATCH:{const f=n.prog.getInst(h.out);if(O.isRuneOp(f.op)){this.push(n,h.arg,B,!1),a=h.arg,B=this.end;continue}this.push(n,h.out,this.end,!1),a=h.out;continue}case O.RUNE:{const f=e.step(B);if(f===rt.EOF()||!h.matchRune(f>>3))break;B+=f&7,a=h.out;continue}case O.RUNE1:{const f=e.step(B);if(f===rt.EOF()||f>>3!==h.runes[0])break;B+=f&7,a=h.out;continue}case O.RUNE_ANY_NOT_NL:{const f=e.step(B);if(f===rt.EOF()||f>>3===10)break;B+=f&7,a=h.out;continue}case O.RUNE_ANY:{const f=e.step(B);if(f===rt.EOF())break;B+=f&7,a=h.out;continue}case O.CAPTURE:if(l){this.cap[h.arg]=B;break}else{h.arg<this.ncap&&(this.push(n,a,this.cap[h.arg],!0),this.cap[h.arg]=B),a=h.out;continue}case O.EMPTY_WIDTH:{const f=e.context(B);if(h.arg&~f)break;a=h.out;continue}case O.NOP:a=h.out;continue;case O.MATCH:{if(s===k.ANCHOR_BOTH&&B!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=B);const f=this.matchcap[1];if((f===-1||i&&B>0&&B>f)&&this.matchcap.set(this.cap),!i||B===this.end)return!0;break}case O.LB_WRITE:case O.LB_CHECK:throw new As("Backtracker cannot evaluate Lookbehind instructions");default:throw new As("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}};const Li=[];var Fi=class Fd{static shouldBacktrack(e){return e.numInst()<=e_}static maxBitStateLen(e){return Fd.shouldBacktrack(e)?Math.floor(t_/e.numInst()):0}static execute(e,t,r,s,i){const a=e.cond;if(a===Y.EMPTY_ALL||(s===k.ANCHOR_START||s===k.ANCHOR_BOTH)&&r!==0||a&Y.EMPTY_BEGIN_TEXT&&r!==0)return null;const l=Li.length>0?Li.pop():new n_,B=t.endPos();l.reset(e.prog,B,i);let c=!1;if(a&Y.EMPTY_BEGIN_TEXT||s===k.ANCHOR_START||s===k.ANCHOR_BOTH)l.ncap>0&&(l.cap[0]=r),l.tryBacktrack(e,t,e.prog.start,r,s)&&(c=!0);else{let f=-1;for(;r<=B&&f!==0;r+=f){if(e.prefix.length>0){const D=t.index(e,r);if(D<0)break;r+=D}if(l.ncap>0&&(l.cap[0]=r),l.tryBacktrack(e,t,e.prog.start,r,s)){c=!0;break}const C=t.step(r);f=C===rt.EOF()?0:C&7}}if(!c)return Li.push(l),null;const h=i===0?[]:Y.toArray(l.matchcap.subarray(0,i));return Li.push(l),h}},ou=class{constructor(n){this.sparse=new Uint32Array(n),this.dense=new Uint32Array(n),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(n){return n<this.sparse.length&&this.sparse[n]<this.size&&this.dense[this.sparse[n]]===n}insert(n){this.contains(n)||this.insertNew(n)}insertNew(n){n>=this.sparse.length||(this.sparse[n]=this.size,this.dense[this.size]=n,this.size++)}};const r_=(n,e,t,r)=>{const s=n.length,i=e.length;let a=0,l=0;const B=[],c=[];let h=!0,f=-1;const C=D=>{const A=D?n:e,L=D?a:l,M=D?t:r;return f>0&&A[L]<=B[f]?!1:(B.push(A[L],A[L+1]),D?a+=2:l+=2,f+=2,c.push(M),!0)};for(;a<s||l<i;)if(l>=i?h=C(!0):a>=s||e[l]<n[a]?h=C(!1):h=C(!0),!h)return null;return{merged:B,next:c}};var s_=class{constructor(n){this.start=n.start,this.numCap=n.numCap,this.inst=new Array(n.inst.length);for(let e=0;e<n.inst.length;e++){const t=n.inst[e],r=new O(t.op);r.out=t.out,r.arg=t.arg,r.runes=t.runes?t.runes.slice():[],r.next=null,this.inst[e]=r}}};const i_=n=>{const e=new s_(n);for(let t=0;t<e.inst.length;t++){const r=e.inst[t];if(r.op!==O.ALT&&r.op!==O.ALT_MATCH)continue;let s="out",i="arg",a=e.inst[r[i]];if(a.op!==O.ALT&&a.op!==O.ALT_MATCH&&(s="arg",i="out",a=e.inst[r[i]],a.op!==O.ALT&&a.op!==O.ALT_MATCH))continue;const l=e.inst[r[s]];if(l.op===O.ALT||l.op===O.ALT_MATCH)continue;let B="out",c="arg",h=!1;a.out===t?h=!0:a.arg===t&&(h=!0,B="arg",c="out"),h&&(a[B]=r[s]),r[s]===a[B]&&(r[i]=a[c])}return e},a_=n=>{if(n.inst.length>=1e3)return null;const e=new ou(n.inst.length),t=new ou(n.inst.length),r=new Array(n.inst.length),s=new Array(n.inst.length).fill(!1),i=a=>{let l=!0;const B=n.inst[a];if(t.contains(a))return!0;switch(t.insert(a),B.op){case O.ALT:case O.ALT_MATCH:{l=i(B.out)&&i(B.arg);let c=s[B.out],h=s[B.arg];if(c&&h)return!1;if(h){const A=B.out;B.out=B.arg,B.arg=A;const L=c;c=h,h=L}c&&(s[a]=!0,B.op=O.ALT_MATCH);const f=r[B.out]||[],C=r[B.arg]||[],D=r_(f,C,B.out,B.arg);if(!D)return!1;r[a]=D.merged,B.next=new Uint32Array(D.next);break}case O.CAPTURE:case O.EMPTY_WIDTH:case O.NOP:l=i(B.out),s[a]=s[B.out],r[a]=r[B.out]?r[B.out].slice():[],B.next=new Uint32Array(Math.floor(r[a].length/2)+1).fill(B.out);break;case O.MATCH:case O.FAIL:s[a]=B.op===O.MATCH;break;case O.RUNE:{if(s[a]=!1,B.next&&B.next.length>0)break;if(e.insert(B.out),!B.runes||B.runes.length===0){r[a]=[],B.next=new Uint32Array([B.out]);break}let c=[];if(B.runes.length===1&&B.arg&k.FOLD_CASE){const h=B.runes[0];c.push(h,h);for(let f=$.simpleFold(h);f!==h;f=$.simpleFold(f))c.push(f,f);c.sort((f,C)=>f-C)}else for(let h=0;h<B.runes.length;h++)c.push(B.runes[h]);r[a]=c,B.next=new Uint32Array(Math.floor(c.length/2)+1).fill(B.out),B.op=O.RUNE;break}case O.RUNE1:{if(s[a]=!1,B.next&&B.next.length>0)break;e.insert(B.out);let c=[];if(B.arg&k.FOLD_CASE){const h=B.runes[0];c.push(h,h);for(let f=$.simpleFold(h);f!==h;f=$.simpleFold(f))c.push(f,f);c.sort((f,C)=>f-C)}else c.push(B.runes[0],B.runes[0]);r[a]=c,B.next=new Uint32Array(Math.floor(c.length/2)+1).fill(B.out),B.op=O.RUNE;break}case O.RUNE_ANY:if(s[a]=!1,B.next&&B.next.length>0)break;e.insert(B.out),r[a]=[0,$.MAX_RUNE],B.next=new Uint32Array([B.out]);break;case O.RUNE_ANY_NOT_NL:if(s[a]=!1,B.next&&B.next.length>0)break;e.insert(B.out),r[a]=[0,9,11,$.MAX_RUNE],B.next=new Uint32Array(Math.floor(r[a].length/2)+1).fill(B.out);break}return l};for(e.clear(),e.insert(n.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let a=0;a<n.inst.length;a++)r[a]&&(n.inst[a].runes=r[a]);return n},o_=(n,e)=>{for(let t=0;t<e.inst.length;t++){const r=e.inst[t];switch(r.op){case O.ALT:case O.ALT_MATCH:case O.RUNE:break;case O.CAPTURE:case O.EMPTY_WIDTH:case O.NOP:case O.MATCH:case O.FAIL:n.inst[t].next=null;break;case O.RUNE1:case O.RUNE_ANY:case O.RUNE_ANY_NOT_NL:n.inst[t].next=null,n.inst[t].op=r.op,n.inst[t].runes=r.runes?r.runes.slice():[];break}}};var lu=class kd{static compile(e){if(e.start===0||e.numLb>0)return null;const t=e.inst[e.start];if(t.op!==O.EMPTY_WIDTH||!(t.arg&Y.EMPTY_BEGIN_TEXT))return null;let r=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===O.ALT||e.inst[i].op===O.ALT_MATCH){r=!0;break}for(let i=0;i<e.inst.length;i++){const a=e.inst[i],l=e.inst[a.out].op;switch(a.op){case O.ALT:case O.ALT_MATCH:if(l===O.MATCH||e.inst[a.arg].op===O.MATCH)return null;break;case O.EMPTY_WIDTH:if(l===O.MATCH){if((a.arg&Y.EMPTY_END_TEXT)===Y.EMPTY_END_TEXT)continue;return null}break;default:if(l===O.MATCH&&r)return null;break}}let s=i_(e);return s=a_(s),s!==null&&o_(s,e),s}static next(e,t){const r=e.matchRunePos(t);return r>=0?e.next[r]:e.op===O.ALT_MATCH?e.out:0}static execute(e,t,r,s,i){const a=e.onepass;if(!a)return null;const l=new Int32Array(i).fill(-1);let B=!1,c=t.step(r),h=c>>3,f=c&7,C=rt.EOF(),D=-1,A=0;c!==rt.EOF()&&(C=t.step(r+f),C!==rt.EOF()&&(D=C>>3,A=C&7));let L=r===0?Y.emptyOpContext(-1,h):t.context(r),M=a.start,z;for(;;){switch(z=a.inst[M],M=z.out,z.op){case O.MATCH:return s===k.ANCHOR_BOTH&&r!==t.endPos()?null:(B=!0,l.length>0&&(l[0]=0,l[1]=r),i===0?[]:Y.toArray(l));case O.RUNE:if(!z.matchRune(h))return null;break;case O.RUNE1:if(h!==z.runes[0])return null;break;case O.RUNE_ANY:break;case O.RUNE_ANY_NOT_NL:if(h===10)return null;break;case O.ALT:case O.ALT_MATCH:M=kd.next(z,h);continue;case O.FAIL:return null;case O.NOP:continue;case O.EMPTY_WIDTH:if(z.arg&~L)return null;continue;case O.CAPTURE:z.arg<l.length&&(l[z.arg]=r);continue;default:throw new As("bad inst")}if(f===0)break;L=Y.emptyOpContext(h,D),r+=f,h=D,f=A,h!==-1&&(C=t.step(r+f),C!==rt.EOF()?(D=C>>3,A=C&7):(D=-1,A=0))}return B?i===0?[]:Y.toArray(l):null}},X,b=(X=class{static isPseudoOp(e){return e>=X.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===S.CODES.get("-")?"\\":""}static fromRegexp(e){const t=new X(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=X.emptySubs(),this.runes=[],this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=X.emptySubs(),this.runes=[],this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case X.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case X.Op.EMPTY_MATCH:e+="(?:)";break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:case X.Op.REPEAT:{const t=this.subs[0];switch(t.op>X.Op.CAPTURE||t.op===X.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case X.Op.STAR:e+="*";break;case X.Op.PLUS:e+="+";break;case X.Op.QUEST:e+="?";break;case X.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}";break}this.flags&k.NON_GREEDY&&(e+="?");break}case X.Op.CONCAT:for(let t of this.subs)t.op===X.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case X.Op.ALTERNATE:{let t="";for(let r of this.subs)e+=t,t="|",e+=r.appendTo();break}case X.Op.LITERAL:this.flags&k.FOLD_CASE&&(e+="(?i:");for(let t of this.runes)e+=Y.escapeRune(t);this.flags&k.FOLD_CASE&&(e+=")");break;case X.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case X.Op.ANY_CHAR:e+="(?s:.)";break;case X.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case X.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case X.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==X.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case X.Op.BEGIN_TEXT:e+="\\A";break;case X.Op.END_TEXT:this.flags&k.WAS_DOLLAR?e+="(?-m:$)":e+="\\z";break;case X.Op.BEGIN_LINE:e+="^";break;case X.Op.END_LINE:e+="$";break;case X.Op.WORD_BOUNDARY:e+="\\b";break;case X.Op.NO_WORD_BOUNDARY:e+="\\B";break;case X.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===$.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){const r=this.runes[t]+1,s=this.runes[t+1]-1;e+=X.quoteIfHyphen(r),e+=Y.escapeRune(r),r!==s&&(e+="-",e+=X.quoteIfHyphen(s),e+=Y.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){const r=this.runes[t],s=this.runes[t+1];e+=X.quoteIfHyphen(r),e+=Y.escapeRune(r),r!==s&&(e+="-",e+=X.quoteIfHyphen(s),e+=Y.escapeRune(s))}e+="]";break;default:e+=this.op;break}return e}maxCap(){let e=0;if(this.op===X.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){const r=t.maxCap();e<r&&(e=r)}return e}equals(e){if(!(e!==null&&e instanceof X)||this.op!==e.op)return!1;switch(this.op){case X.Op.END_TEXT:if((this.flags&k.WAS_DOLLAR)!==(e.flags&k.WAS_DOLLAR))return!1;break;case X.Op.LITERAL:case X.Op.CHAR_CLASS:if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case X.Op.ALTERNATE:case X.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:if((this.flags&k.NON_GREEDY)!==(e.flags&k.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.REPEAT:if((this.flags&k.NON_GREEDY)!==(e.flags&k.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.PLB:case X.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1;break}return!0}},U(X,"Op",Ld(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"])),X),Bu=class{constructor(n){this.next=[Object.create(null)],this.fail=[0],this.match=[!1];for(const t of n){let r=0;for(let s=0;s<t.length;s++){const i=t[s];i in this.next[r]||(this.next.push(Object.create(null)),this.fail.push(0),this.match.push(!1),this.next[r][i]=this.next.length-1),r=this.next[r][i]}this.match[r]=!0}const e=[];for(const t in this.next[0])if(Object.prototype.hasOwnProperty.call(this.next[0],t)){const r=this.next[0][t];this.fail[r]=0,e.push(r)}for(;e.length>0;){const t=e.shift();for(const r in this.next[t])if(Object.prototype.hasOwnProperty.call(this.next[t],r)){const s=this.next[t][r];let i=this.fail[t];for(;i!==0&&!(r in this.next[i]);)i=this.fail[i];r in this.next[i]?this.fail[s]=this.next[i][r]:this.fail[s]=0,this.match[s]=this.match[s]||this.match[this.fail[s]],e.push(s)}}}searchUTF16(n,e,t){let r=0;for(let s=e;s<t;s++){const i=n.charCodeAt(s);for(;r!==0&&!(i in this.next[r]);)r=this.fail[r];if(i in this.next[r]&&(r=this.next[r][i]),this.match[r])return!0}return!1}searchUTF8(n,e,t){let r=0;for(let s=e;s<t;s++){const i=n[s];for(;r!==0&&!(i in this.next[r]);)r=this.fail[r];if(i in this.next[r]&&(r=this.next[r][i]),this.match[r])return!0}return!1}},Lt,Ce=(Lt=class{constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.ac16=null,this.ac8=null}eval(e,t){switch(this.type){case Lt.Type.NONE:return!0;case Lt.Type.EXACT:return e.hasString(this,t);case Lt.Type.AND:for(let r=0;r<this.subs.length;r++)if(!this.subs[r].eval(e,t))return!1;return!0;case Lt.Type.OR:if(this.ac16&&this.ac8)return e.hasAnyString(this,t);for(let r=0;r<this.subs.length;r++)if(this.subs[r].eval(e,t))return!0;return!1;default:return!0}}},U(Lt,"Type",{NONE:0,EXACT:1,AND:2,OR:3}),Lt),l_=class Qt{static build(e){const t=Qt.fromRegexp(e);return Qt.simplify(t)}static fromRegexp(e){if(!e)return new Ce(Ce.Type.NONE);switch(e.op){case b.Op.PLB:case b.Op.NLB:case b.Op.NO_MATCH:case b.Op.EMPTY_MATCH:case b.Op.BEGIN_LINE:case b.Op.END_LINE:case b.Op.BEGIN_TEXT:case b.Op.END_TEXT:case b.Op.WORD_BOUNDARY:case b.Op.NO_WORD_BOUNDARY:case b.Op.CHAR_CLASS:case b.Op.ANY_CHAR_NOT_NL:case b.Op.ANY_CHAR:return new Ce(Ce.Type.NONE);case b.Op.LITERAL:{if(e.runes.length===0||e.flags&k.FOLD_CASE)return new Ce(Ce.Type.NONE);const t=new Ce(Ce.Type.EXACT);let r="";for(let s=0;s<e.runes.length;s++)r+=String.fromCodePoint(e.runes[s]);return t.str=r,t.bytes=Y.stringToUtf8ByteArray(t.str),t}case b.Op.CAPTURE:case b.Op.PLUS:return Qt.fromRegexp(e.subs[0]);case b.Op.REPEAT:return e.min>=1?Qt.fromRegexp(e.subs[0]):new Ce(Ce.Type.NONE);case b.Op.CONCAT:{const t=new Ce(Ce.Type.AND);for(const r of e.subs)t.subs.push(Qt.fromRegexp(r));return t}case b.Op.ALTERNATE:{const t=new Ce(Ce.Type.OR);for(const r of e.subs)t.subs.push(Qt.fromRegexp(r));return t}default:return new Ce(Ce.Type.NONE)}}static simplify(e){if(e.type===Ce.Type.EXACT||e.type===Ce.Type.NONE)return e;if(e.type===Ce.Type.AND){const t=[];for(const r of e.subs){const s=Qt.simplify(r);if(s.type!==Ce.Type.NONE)if(s.type===Ce.Type.AND)for(let i=0;i<s.subs.length;i++)t.push(s.subs[i]);else t.push(s)}return t.length===0?new Ce(Ce.Type.NONE):t.length===1?t[0]:(e.subs=t,e)}if(e.type===Ce.Type.OR){const t=[];for(const a of e.subs){const l=Qt.simplify(a);if(l.type===Ce.Type.NONE)return new Ce(Ce.Type.NONE);if(l.type===Ce.Type.OR)for(let B=0;B<l.subs.length;B++)t.push(l.subs[B]);else t.push(l)}if(t.length===0)return new Ce(Ce.Type.NONE);if(t.length===1)return t[0];const r=new Set,s=[];for(const a of t)a.type===Ce.Type.EXACT?r.has(a.str)||(r.add(a.str),s.push(a)):s.push(a);e.subs=s;let i=!0;for(const a of s)if(a.type!==Ce.Type.EXACT){i=!1;break}return i&&s.length>1&&(e.ac16=new Bu(s.map(a=>{const l=[];for(let B=0;B<a.str.length;B++)l.push(a.str.charCodeAt(B));return l})),e.ac8=new Bu(s.map(a=>a.bytes))),e}return e}},wt=class{constructor(n=0,e=0){this.head=n,this.tail=e}},B_=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0}getInst(n){return this.inst[n]}numInst(){return this.inst.length}addInst(n){this.inst.push(new O(n))}skipNop(n){let e=this.inst[n];for(;e.op===O.NOP||e.op===O.CAPTURE;)e=this.inst[n],n=e.out;return e}prefix(){let n="",e=this.skipNop(this.start);if(!O.isRuneOp(e.op)||e.runes.length!==1)return[e.op===O.MATCH,n];for(;O.isRuneOp(e.op)&&e.runes.length===1&&!(e.arg&k.FOLD_CASE);)n+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===O.MATCH,n]}startCond(){let n=0,e=this.start;e:for(;;){const t=this.inst[e];switch(t.op){case O.EMPTY_WIDTH:n|=t.arg;break;case O.FAIL:return-1;case O.CAPTURE:case O.NOP:break;default:break e}e=t.out}return n}patch(n,e){let t=n.head;for(;t!==0;){const r=this.inst[t>>1];t&1?(t=r.arg,r.arg=e):(t=r.out,r.out=e)}}append(n,e){if(n.head===0)return e;if(e.head===0)return n;const t=this.inst[n.tail>>1];return n.tail&1?t.arg=e.head:t.out=e.head,new wt(n.head,e.tail)}toString(){let n="";for(let e=0;e<this.inst.length;e++){const t=n.length;n+=e,e===this.start&&(n+="*"),n+="        ".substring(n.length-t),n+=this.inst[e],n+=`
`}return n}},ki=class{constructor(n=0,e=new wt,t=!1){this.i=n,this.out=e,this.nullable=t}},c_=class wr{static ANY_RUNE_NOT_NL(){return[0,S.CODES.get(`
`)-1,S.CODES.get(`
`)+1,$.MAX_RUNE]}static ANY_RUNE(){return[0,$.MAX_RUNE]}static compileRegexp(e){const t=new wr,r=t.compile(e);return t.prog.patch(r.out,t.newInst(O.MATCH).i),t.prog.start=r.i,t.prog}static compileSet(e){const t=new wr;if(e.length===0)return t.prog.start=t.newInst(O.FAIL).i,t.prog;let r=[];for(let i=0;i<e.length;i++){const a=t.compile(e[i]),l=t.newInst(O.MATCH);t.prog.getInst(l.i).arg=i,t.prog.patch(a.out,l.i),r.push(a.i)}let s=r[0];for(let i=1;i<r.length;i++){const a=t.newInst(O.ALT),l=t.prog.getInst(a.i);l.out=s,l.arg=r[i],s=a.i}return t.prog.start=s,t.prog}constructor(){this.prog=new B_,this.newInst(O.FAIL)}newInst(e){return this.prog.addInst(e),new ki(this.prog.numInst()-1,new wt,!0)}nop(){const e=this.newInst(O.NOP);return e.out=new wt(e.i<<1,e.i<<1),e}fail(){return new ki}cap(e){const t=this.newInst(O.CAPTURE);return t.out=new wt(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?this.fail():(this.prog.patch(e.out,t.i),new ki(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;const r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return s.out=e.i,s.arg=t.i,r.out=this.prog.append(e.out,t.out),r.nullable=e.nullable||t.nullable,r}loop(e,t){const r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new wt(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new wt(r.i<<1|1,r.i<<1|1)),this.prog.patch(e.out,r.i),r}quest(e,t){const r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new wt(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new wt(r.i<<1|1,r.i<<1|1)),r.out=this.prog.append(r.out,e.out),r}star(e,t){return e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return new ki(e.i,this.loop(e,t).out,e.nullable)}empty(e){const t=this.newInst(O.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new wt(t.i<<1,t.i<<1),t}rune(e,t){const r=this.newInst(O.RUNE);r.nullable=!1;const s=this.prog.getInst(r.i);return s.runes=e,t&=k.FOLD_CASE,(e.length!==1||$.simpleFold(e[0])===e[0])&&(t&=-2),s.arg=t,r.out=new wt(r.i<<1,r.i<<1),!(t&k.FOLD_CASE)&&e.length===1||e.length===2&&e[0]===e[1]?s.op=O.RUNE1:e.length===2&&e[0]===0&&e[1]===$.MAX_RUNE?s.op=O.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===S.CODES.get(`
`)-1&&e[2]===S.CODES.get(`
`)+1&&e[3]===$.MAX_RUNE&&(s.op=O.RUNE_ANY_NOT_NL),r}lookBehind(e,t){const r=this.newInst(O.LB_WRITE);this.prog.getInst(r.i).arg=t;const s=this.rune(wr.ANY_RUNE(),0),i=this.star(s,!0),a=this.cat(i,e);this.prog.patch(a.out,r.i);const l=this.newInst(O.LB_CHECK);return this.prog.getInst(l.i).arg=t,this.prog.lbStarts.push(a.i),Math.abs(t)>this.prog.numLb&&(this.prog.numLb=Math.abs(t)),l.out=new wt(l.i<<1,l.i<<1),l}compile(e){switch(e.op){case b.Op.NO_MATCH:return this.fail();case b.Op.EMPTY_MATCH:return this.nop();case b.Op.LITERAL:if(e.runes.length===0)return this.nop();{let t=null;for(let r of e.runes){const s=this.rune([r],e.flags);t=t===null?s:this.cat(t,s)}return t}case b.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case b.Op.ANY_CHAR_NOT_NL:return this.rune(wr.ANY_RUNE_NOT_NL(),0);case b.Op.ANY_CHAR:return this.rune(wr.ANY_RUNE(),0);case b.Op.BEGIN_LINE:return this.empty(Y.EMPTY_BEGIN_LINE);case b.Op.END_LINE:return this.empty(Y.EMPTY_END_LINE);case b.Op.BEGIN_TEXT:return this.empty(Y.EMPTY_BEGIN_TEXT);case b.Op.END_TEXT:return this.empty(Y.EMPTY_END_TEXT);case b.Op.WORD_BOUNDARY:return this.empty(Y.EMPTY_WORD_BOUNDARY);case b.Op.NO_WORD_BOUNDARY:return this.empty(Y.EMPTY_NO_WORD_BOUNDARY);case b.Op.PLB:case b.Op.NLB:return this.lookBehind(this.compile(e.subs[0]),e.lb);case b.Op.CAPTURE:{const t=this.cap(e.cap<<1),r=this.compile(e.subs[0]),s=this.cap(e.cap<<1|1);return this.cat(this.cat(t,r),s)}case b.Op.STAR:return this.star(this.compile(e.subs[0]),(e.flags&k.NON_GREEDY)!==0);case b.Op.PLUS:return this.plus(this.compile(e.subs[0]),(e.flags&k.NON_GREEDY)!==0);case b.Op.QUEST:return this.quest(this.compile(e.subs[0]),(e.flags&k.NON_GREEDY)!==0);case b.Op.CONCAT:if(e.subs.length===0)return this.nop();{let t=null;for(let r of e.subs){const s=this.compile(r);t=t===null?s:this.cat(t,s)}return t}case b.Op.ALTERNATE:if(e.subs.length===0)return this.nop();{let t=null;for(let r of e.subs){const s=this.compile(r);t=t===null?s:this.alt(t,s)}return t}default:throw new $E("regexp: unhandled case in compile")}}},u_=class mt{static simplify(e){if(e===null)return null;switch(e.op){case b.Op.PLB:case b.Op.NLB:case b.Op.CAPTURE:{const t=mt.simplify(e.subs[0]);if(t!==e.subs[0]){const r=b.fromRegexp(e);return r.runes=[],r.subs=[t],r}return e}case b.Op.CONCAT:case b.Op.ALTERNATE:{const t=[];let r=!1;for(let s=0;s<e.subs.length;s++){const i=e.subs[s],a=mt.simplify(i);if(a!==i&&(r=!0),e.op===b.Op.CONCAT){if(a.op===b.Op.NO_MATCH)return new b(b.Op.NO_MATCH);if(a.op===b.Op.EMPTY_MATCH){r=!0;continue}if(a.op===b.Op.CONCAT){r=!0;for(let l=0;l<a.subs.length;l++)t.push(a.subs[l]);continue}}else if(e.op===b.Op.ALTERNATE){if(a.op===b.Op.NO_MATCH){r=!0;continue}if(a.op===b.Op.ALTERNATE){r=!0;for(let l=0;l<a.subs.length;l++)t.push(a.subs[l]);continue}}t.push(a)}if(r){if(t.length===0)return new b(e.op===b.Op.CONCAT?b.Op.EMPTY_MATCH:b.Op.NO_MATCH);if(t.length===1)return t[0];const s=b.fromRegexp(e);return s.runes=[],s.subs=t,s}return e}case b.Op.CHAR_CLASS:return e.runes===null?e:e.runes.length===0?new b(b.Op.NO_MATCH):e.runes.length===2&&e.runes[0]===0&&e.runes[1]===$.MAX_RUNE?new b(b.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===S.CODES.get(`
`)-1&&e.runes[2]===S.CODES.get(`
`)+1&&e.runes[3]===$.MAX_RUNE?new b(b.Op.ANY_CHAR_NOT_NL):e;case b.Op.STAR:case b.Op.PLUS:case b.Op.QUEST:{const t=mt.simplify(e.subs[0]);return mt.simplify1(e.op,e.flags,t,e)}case b.Op.REPEAT:{if(e.min===0&&e.max===0)return new b(b.Op.EMPTY_MATCH);const t=mt.simplify(e.subs[0]);if(e.max===-1){if(e.min===0)return mt.simplify1(b.Op.STAR,e.flags,t,null);if(e.min===1)return mt.simplify1(b.Op.PLUS,e.flags,t,null);const s=new b(b.Op.CONCAT),i=[];for(let a=0;a<e.min-1;a++)i.push(t);return i.push(mt.simplify1(b.Op.PLUS,e.flags,t,null)),s.subs=i.slice(0),mt.simplify(s)}if(e.min===1&&e.max===1)return t;let r=null;if(e.min>0){r=[];for(let s=0;s<e.min;s++)r.push(t)}if(e.max>e.min){let s=mt.simplify1(b.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++){const a=new b(b.Op.CONCAT);a.subs=[t,s],s=mt.simplify1(b.Op.QUEST,e.flags,a,null)}if(r===null)return s;r.push(s)}if(r!==null){const s=new b(b.Op.CONCAT);return s.subs=r.slice(0),mt.simplify(s)}return new b(b.Op.NO_MATCH)}}return e}static simplify1(e,t,r,s){if(r.op===b.Op.EMPTY_MATCH)return r;if(r.op===b.Op.NO_MATCH)return e===b.Op.PLUS?r:new b(b.Op.EMPTY_MATCH);if(e===r.op&&(t&k.NON_GREEDY)===(r.flags&k.NON_GREEDY))return r;if(s!==null&&s.op===e&&(s.flags&k.NON_GREEDY)===(t&k.NON_GREEDY)&&r===s.subs[0])return s;const i=new b(e);return i.flags=t,i.subs=[r],i}},pe=class{constructor(n,e){this.sign=n,this.cls=e}};const cu=[48,57],uu=[9,10,12,13,32,32],hu=[48,57,65,90,95,95,97,122],du=new Map([["\\d",new pe(1,cu)],["\\D",new pe(-1,cu)],["\\s",new pe(1,uu)],["\\S",new pe(-1,uu)],["\\w",new pe(1,hu)],["\\W",new pe(-1,hu)]]),fu=[48,57,65,90,97,122],pu=[65,90,97,122],Cu=[0,127],mu=[9,9,32,32],gu=[0,31,127,127],Eu=[48,57],_u=[33,126],yu=[97,122],Du=[32,126],wu=[33,47,58,64,91,96,123,126],bu=[9,13,32,32],Iu=[65,90],vu=[48,57,65,90,95,95,97,122],Tu=[48,57,65,70,97,102],Au=new Map([["[:alnum:]",new pe(1,fu)],["[:^alnum:]",new pe(-1,fu)],["[:alpha:]",new pe(1,pu)],["[:^alpha:]",new pe(-1,pu)],["[:ascii:]",new pe(1,Cu)],["[:^ascii:]",new pe(-1,Cu)],["[:blank:]",new pe(1,mu)],["[:^blank:]",new pe(-1,mu)],["[:cntrl:]",new pe(1,gu)],["[:^cntrl:]",new pe(-1,gu)],["[:digit:]",new pe(1,Eu)],["[:^digit:]",new pe(-1,Eu)],["[:graph:]",new pe(1,_u)],["[:^graph:]",new pe(-1,_u)],["[:lower:]",new pe(1,yu)],["[:^lower:]",new pe(-1,yu)],["[:print:]",new pe(1,Du)],["[:^print:]",new pe(-1,Du)],["[:punct:]",new pe(1,wu)],["[:^punct:]",new pe(-1,wu)],["[:space:]",new pe(1,bu)],["[:^space:]",new pe(-1,bu)],["[:upper:]",new pe(1,Iu)],["[:^upper:]",new pe(-1,Iu)],["[:word:]",new pe(1,vu)],["[:^word:]",new pe(-1,vu)],["[:xdigit:]",new pe(1,Tu)],["[:^xdigit:]",new pe(-1,Tu)]]);var mn=class En{static charClassToString(e,t){let r="[";for(let s=0;s<t;s+=2){s>0&&(r+=" ");const i=e[s],a=e[s+1];i===a?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${a.toString(16)}`}return r+="]",r}static cmp(e,t,r,s){const i=e[t]-r;return i!==0?i:s-e[t+1]}static qsortIntPair(e,t,r){const s=((t+r)/2|0)&-2,i=e[s],a=e[s+1];let l=t,B=r;for(;l<=B;){for(;l<r&&En.cmp(e,l,i,a)<0;)l+=2;for(;B>t&&En.cmp(e,B,i,a)>0;)B-=2;if(l<=B){if(l!==B){let c=e[l];e[l]=e[B],e[B]=c,c=e[l+1],e[l+1]=e[B+1],e[B+1]=c}l+=2,B-=2}}t<B&&En.qsortIntPair(e,t,B),l<r&&En.qsortIntPair(e,l,r)}constructor(e=Y.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;En.qsortIntPair(this.r,0,this.len-2);let e=2;for(let t=2;t<this.len;t+=2){const r=this.r[t],s=this.r[t+1];if(r<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=r,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return t&k.FOLD_CASE?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){const s=this.r[this.len-r],i=this.r[this.len-r+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-r]=e),t>i&&(this.r[this.len-r+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=$.MIN_FOLD&&t>=$.MAX_FOLD)return this.appendRange(e,t);if(t<$.MIN_FOLD||e>$.MAX_FOLD)return this.appendRange(e,t);e<$.MIN_FOLD&&(this.appendRange(e,$.MIN_FOLD-1),e=$.MIN_FOLD),t>$.MAX_FOLD&&(this.appendRange($.MAX_FOLD+1,t),t=$.MAX_FOLD);for(let r=e;r<=t;r++){this.appendRange(r,r);for(let s=$.simpleFold(r);s!==r;s=$.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let r=0;r<e.length;r+=2){const s=e[r],i=e[r+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=$.MAX_RUNE&&this.appendRange(t,$.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){const r=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(r,s);continue}for(let a=r;a<=s;a+=i)this.appendRange(a,a)}return this}appendNegatedTable(e){let t=0;for(let r=0;r<e.length;++r){const s=e.getLo(r),i=e.getHi(r),a=e.getStride(r);if(a===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let l=s;l<=i;l+=a)t<=l-1&&this.appendRange(t,l-1),t=l+1}return t<=$.MAX_RUNE&&this.appendRange(t,$.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let r=0;r<this.len;r+=2){const s=this.r[r],i=this.r[r+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=$.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=$.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let r=e.cls;return t&&(r=new En().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,e.sign)}toString(){return En.charClassToString(this.r,this.len)}},h_=class{constructor(n){this.str=n,this.position=0}pos(){return this.position}rewindTo(n){this.position=n}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(n){this.position+=n}skipString(n){this.position+=n.length}pop(){const n=this.str.codePointAt(this.position);return this.position+=Y.charCount(n),n}lookingAt(n){return this.str.startsWith(n,this.position)}rest(){return this.str.substring(this.position)}from(n){return this.str.substring(n,this.position)}toString(){return this.rest()}},H,d_=(H=class{static unicodeTable(e){return e==="Any"?{tab:H.ANY_TABLE,fold:H.ANY_TABLE,sign:1}:e==="Ascii"?{tab:H.ASCII_TABLE,fold:H.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:ot.CATEGORIES.get("Cn"),fold:ot.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:ot.CATEGORIES.get("LC"),fold:ot.FOLD_CATEGORIES.get("LC"),sign:1}:ot.CATEGORIES.has(e)?{tab:ot.CATEGORIES.get(e),fold:ot.FOLD_CATEGORIES.get(e),sign:1}:ot.SCRIPTS.has(e)?{tab:ot.SCRIPTS.get(e),fold:ot.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<$.MIN_FOLD||e>$.MAX_FOLD)return e;let t=e;const r=e;for(e=$.simpleFold(e);e!==r;e=$.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===b.Op.EMPTY_MATCH)return null;if(e.op===b.Op.CONCAT&&e.subs.length>0){const t=e.subs[0];return t.op===b.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){const r=new b(b.Op.LITERAL);return r.flags=t,r.runes=Y.stringToRunes(e),r}static parse(e,t){return new H(e,t).parseInternal()}static parseRepeat(e){const t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);const r=H.parseInt(e);if(r===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=r;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=H.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new ye(H.ERR_INVALID_REPEAT_SIZE,e.from(t));return r<<16|s&$.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){const r=e.codePointAt(t);if(r!==S.CODES.get("_")&&!Y.isalnum(r))return!1}return!0}static parseInt(e){const t=e.pos();for(;e.more()&&e.peek()>=S.CODES.get("0")&&e.peek()<=S.CODES.get("9");)e.skip(1);const r=e.from(t);return r.length===0||r.length>1&&r.codePointAt(0)===S.CODES.get("0")?-1:r.length>8?-2:parseInt(r,10)}static isCharClass(e){return e.op===b.Op.LITERAL&&e.runes.length===1||e.op===b.Op.CHAR_CLASS||e.op===b.Op.ANY_CHAR_NOT_NL||e.op===b.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case b.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case b.Op.CHAR_CLASS:for(let r=0;r<e.runes.length;r+=2)if(e.runes[r]<=t&&t<=e.runes[r+1])return!0;return!1;case b.Op.ANY_CHAR_NOT_NL:return t!==S.CODES.get(`
`);case b.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case b.Op.ANY_CHAR:break;case b.Op.ANY_CHAR_NOT_NL:H.matchRune(t,S.CODES.get(`
`))&&(e.op=b.Op.ANY_CHAR);break;case b.Op.CHAR_CLASS:t.op===b.Op.LITERAL?e.runes=new mn(e.runes).appendLiteral(t.runes[0],t.flags).toArray():e.runes=new mn(e.runes).appendClass(t.runes).toArray();break;case b.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=b.Op.CHAR_CLASS,e.runes=new mn().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toArray();break}}static parseEscape(e){const t=e.pos();if(e.skip(1),!e.more())throw new ye(H.ERR_TRAILING_BACKSLASH);let r=e.pop();e:switch(r){case S.CODES.get("1"):case S.CODES.get("2"):case S.CODES.get("3"):case S.CODES.get("4"):case S.CODES.get("5"):case S.CODES.get("6"):case S.CODES.get("7"):if(!e.more()||e.peek()<S.CODES.get("0")||e.peek()>S.CODES.get("7"))break;case S.CODES.get("0"):{let s=r-S.CODES.get("0");for(let i=1;i<3&&!(!e.more()||e.peek()<S.CODES.get("0")||e.peek()>S.CODES.get("7"));i++)s=s*8+e.peek()-S.CODES.get("0"),e.skip(1);return s}case S.CODES.get("x"):{if(!e.more())break;if(r=e.pop(),r===S.CODES.get("{")){let a=0,l=0;for(;;){if(!e.more())break e;if(r=e.pop(),r===S.CODES.get("}"))break;const B=Y.unhex(r);if(B<0||(l=l*16+B,l>$.MAX_RUNE))break e;a++}if(a===0)break e;return l}const s=Y.unhex(r);if(!e.more())break;r=e.pop();const i=Y.unhex(r);if(s<0||i<0)break;return s*16+i}case S.CODES.get("a"):return S.CODES.get("\x07");case S.CODES.get("f"):return S.CODES.get("\f");case S.CODES.get("n"):return S.CODES.get(`
`);case S.CODES.get("r"):return S.CODES.get("\r");case S.CODES.get("t"):return S.CODES.get("	");case S.CODES.get("v"):return S.CODES.get("\v");default:if(r<=$.MAX_ASCII&&!Y.isalnum(r))return r;break}throw new ye(H.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new ye(H.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?H.parseEscape(e):e.pop()}static concatRunes(e,t){for(let r=0;r<t.length;r++)e.push(t[r]);return e}static hasCapture(e){if(e===null)return!1;if(e.op===b.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if(H.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new b(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>H.MAX_RUNES)throw new ye(H.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===b.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor(H.MAX_SIZE/this.repeats)?this.repeats=H.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor(H.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>H.MAX_SIZE)throw new ye(H.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let r=0;switch(e.op){case b.Op.LITERAL:r=e.runes.length;break;case b.Op.PLB:case b.Op.NLB:case b.Op.CAPTURE:case b.Op.STAR:r=2+this.calcSize(e.subs[0]);break;case b.Op.PLUS:case b.Op.QUEST:r=1+this.calcSize(e.subs[0]);break;case b.Op.CONCAT:for(let s of e.subs)r=r+this.calcSize(s);break;case b.Op.ALTERNATE:for(let s of e.subs)r=r+this.calcSize(s);e.subs.length>1&&(r=r+e.subs.length-1);break;case b.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?r=2+s:r=1+e.min*s;break}r=e.max*s+(e.max-e.min);break}}return r=Math.max(1,r),this.size===null&&(this.size=new Map),this.size.set(e,r),r}checkHeight(e){if(!(this.numRegexp<H.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>H.MAX_HEIGHT)throw new ye(H.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let r=1;for(let s of e.subs){const i=this.calcHeight(s);r<1+i&&(r=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,r),r}pop(){return this.stack.pop()}popToPseudo(){const e=this.stack.length;let t=e;for(;t>0&&!b.isPseudoOp(this.stack[t-1].op);)t--;const r=this.stack.slice(t,e);return this.stack=this.stack.slice(0,t),r}push(e){if(this.numRunes+=e.runes.length,e.op===b.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&-2))return null;e.op=b.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&-2}else if(e.op===b.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&$.simpleFold(e.runes[0])===e.runes[2]&&$.simpleFold(e.runes[2])===e.runes[0]||e.op===b.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&$.simpleFold(e.runes[0])===e.runes[1]&&$.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|k.FOLD_CASE))return null;e.op=b.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|k.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){const r=this.stack.length;if(r<2)return!1;const s=this.stack[r-1],i=this.stack[r-2];return s.op!==b.Op.LITERAL||i.op!==b.Op.LITERAL||(s.flags&k.FOLD_CASE)!==(i.flags&k.FOLD_CASE)?!1:(i.runes=H.concatRunes(i.runes,s.runes),e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1))}newLiteral(e,t){const r=this.newRegexp(b.Op.LITERAL);return r.flags=t,t&k.FOLD_CASE&&(e=H.minFoldRune(e)),r.runes=[e],r}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){const t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,r,s,i,a){let l=this.flags;if(l&k.PERL_X&&(i.more()&&i.lookingAt("?")&&(i.skip(1),l^=k.NON_GREEDY),a!==-1))throw new ye(H.ERR_INVALID_REPEAT_OP,i.from(a));const B=this.stack.length;if(B===0)throw new ye(H.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const c=this.stack[B-1];if(b.isPseudoOp(c.op))throw new ye(H.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const h=this.newRegexp(e);if(h.min=t,h.max=r,h.flags=l,h.subs=[c],this.stack[B-1]=h,this.checkLimits(h),e===b.Op.REPEAT&&(t>=2||r>=2)&&!this.repeatIsValid(h,1e3))throw new ye(H.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===b.Op.REPEAT){let r=e.max;if(r===0)return!0;if(r<0&&(r=e.min),r>t)return!1;r>0&&(t=Math.trunc(t/r))}for(let r of e.subs)if(!this.repeatIsValid(r,t))return!1;return!0}concat(){this.maybeConcat(-1,0);const e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(b.Op.EMPTY_MATCH)):this.push(this.collapse(e,b.Op.CONCAT))}alternate(){const e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(b.Op.NO_MATCH)):this.push(this.collapse(e,b.Op.ALTERNATE))}cleanAlt(e){e.op===b.Op.CHAR_CLASS&&(e.runes=new mn(e.runes).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===$.MAX_RUNE?(e.runes=[],e.op=b.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===S.CODES.get(`
`)-1&&e.runes[2]===S.CODES.get(`
`)+1&&e.runes[3]===$.MAX_RUNE&&(e.runes=[],e.op=b.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let r=0;for(let l of e)r+=l.op===t?l.subs.length:1;let s=new Array(r).fill(null),i=0;for(let l of e)if(l.op===t){for(let B=0;B<l.subs.length;B++)s[i++]=l.subs[B];this.reuse(l)}else s[i++]=l;let a=this.newRegexp(t);if(a.subs=s,t===b.Op.ALTERNATE&&(a.subs=this.factor(a.subs),a.subs.length===1)){const l=a;a=a.subs[0],this.reuse(l)}return a}factor(e){if(e.length<2)return e;let t=0,r=e.length,s=0,i=null,a=0,l=0,B=0;for(let h=0;h<=r;h++){let f=null,C=0,D=0;if(h<r){let A=e[t+h];if(A.op===b.Op.CONCAT&&A.subs.length>0&&(A=A.subs[0]),A.op===b.Op.LITERAL&&(f=A.runes,C=A.runes.length,D=A.flags&k.FOLD_CASE),D===l){let L=0;for(;L<a&&L<C&&i[L]===f[L];)L++;if(L>0){a=L;continue}}}if(h!==B)if(h===B+1)e[s++]=e[t+B];else{const A=this.newRegexp(b.Op.LITERAL);A.flags=l,A.runes=i.slice(0,a);for(let z=B;z<h;z++)e[t+z]=this.removeLeadingString(e[t+z],a),this.checkLimits(e[t+z]);const L=this.collapse(e.slice(t+B,t+h),b.Op.ALTERNATE),M=this.newRegexp(b.Op.CONCAT);M.subs=[A,L],e[s++]=M}B=h,i=f,a=C,l=D}r=s,t=0,B=0,s=0;let c=null;for(let h=0;h<=r;h++){let f=null;if(!(h<r&&(f=H.leadingRegexp(e[t+h]),c!==null&&c.equals(f)&&(H.isCharClass(c)||c.op===b.Op.REPEAT&&c.min===c.max&&H.isCharClass(c.subs[0]))))){if(h!==B)if(h===B+1)e[s++]=e[t+B];else{const C=c;for(let L=B;L<h;L++){const M=L!==B;e[t+L]=this.removeLeadingRegexp(e[t+L],M),this.checkLimits(e[t+L])}const D=this.collapse(e.slice(t+B,t+h),b.Op.ALTERNATE),A=this.newRegexp(b.Op.CONCAT);A.subs=[C,D],e[s++]=A}B=h,c=f}}r=s,t=0,B=0,s=0;for(let h=0;h<=r;h++)if(!(h<r&&H.isCharClass(e[t+h]))){if(h!==B)if(h===B+1)e[s++]=e[t+B];else{let f=B;for(let D=B+1;D<h;D++){const A=e[t+f],L=e[t+D];(A.op<L.op||A.op===L.op&&(A.runes!==null?A.runes.length:0)<(L.runes!==null?L.runes.length:0))&&(f=D)}const C=e[t+B];e[t+B]=e[t+f],e[t+f]=C;for(let D=B+1;D<h;D++)H.mergeCharClass(e[t+B],e[t+D]),this.reuse(e[t+D]);this.cleanAlt(e[t+B]),e[s++]=e[t+B]}h<r&&(e[s++]=e[t+h]),B=h+1}r=s,t=0,B=0,s=0;for(let h=0;h<r;++h)h+1<r&&e[t+h].op===b.Op.EMPTY_MATCH&&e[t+h+1].op===b.Op.EMPTY_MATCH||(e[s++]=e[t+h]);return r=s,t=0,e.slice(t,r)}removeLeadingString(e,t){if(e.op===b.Op.CONCAT&&e.subs.length>0){const r=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=r,r.op===b.Op.EMPTY_MATCH)switch(this.reuse(r),e.subs.length){case 0:case 1:e.op=b.Op.EMPTY_MATCH,e.subs=b.emptySubs();break;case 2:{const s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length);break}return e}return e.op===b.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=b.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===b.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=b.Op.EMPTY_MATCH,e.subs=b.emptySubs();break;case 1:{const r=e;e=e.subs[0],this.reuse(r);break}}return e}return t&&this.reuse(e),this.newRegexp(b.Op.EMPTY_MATCH)}parseInternal(){if(this.flags&k.LITERAL)return H.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,r=-1;const s=new h_(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case S.CODES.get("("):if(this.flags&k.LOOKBEHIND){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if(this.flags&k.PERL_X&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(b.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case S.CODES.get("|"):this.parseVerticalBar(),s.skip(1);break;case S.CODES.get(")"):this.parseRightParen(),s.skip(1);break;case S.CODES.get("^"):this.flags&k.ONE_LINE?this.op(b.Op.BEGIN_TEXT):this.op(b.Op.BEGIN_LINE),s.skip(1);break;case S.CODES.get("$"):this.flags&k.ONE_LINE?this.op(b.Op.END_TEXT).flags|=k.WAS_DOLLAR:this.op(b.Op.END_LINE),s.skip(1);break;case S.CODES.get("."):this.flags&k.DOT_NL?this.op(b.Op.ANY_CHAR):this.op(b.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case S.CODES.get("["):this.parseClass(s);break;case S.CODES.get("*"):case S.CODES.get("+"):case S.CODES.get("?"):{i=s.pos();let a=null;switch(s.pop()){case S.CODES.get("*"):a=b.Op.STAR;break;case S.CODES.get("+"):a=b.Op.PLUS;break;case S.CODES.get("?"):a=b.Op.QUEST;break}this.repeat(a,t,r,i,s,e);break}case S.CODES.get("{"):{i=s.pos();const a=H.parseRepeat(s);if(a<0){s.rewindTo(i),this.literal(s.pop());break}t=a>>16,r=(a&$.MAX_BMP)<<16>>16,this.repeat(b.Op.REPEAT,t,r,i,s,e);break}case S.CODES.get("\\"):{const a=s.pos();if(s.skip(1),this.flags&k.PERL_X&&s.more())switch(s.pop()){case S.CODES.get("A"):this.op(b.Op.BEGIN_TEXT);break e;case S.CODES.get("b"):this.op(b.Op.WORD_BOUNDARY);break e;case S.CODES.get("B"):this.op(b.Op.NO_WORD_BOUNDARY);break e;case S.CODES.get("C"):throw new ye(H.ERR_INVALID_ESCAPE,"\\C");case S.CODES.get("Q"):{let c=s.rest();const h=c.indexOf("\\E");h>=0?(c=c.substring(0,h),s.skipString(c),s.skipString("\\E")):s.skipString(c);let f=0;for(;f<c.length;){const C=c.codePointAt(f);this.literal(C),f+=Y.charCount(C)}break e}case S.CODES.get("z"):this.op(b.Op.END_TEXT);break e;default:s.rewindTo(a);break}else s.rewindTo(a);const l=this.newRegexp(b.Op.CHAR_CLASS);if(l.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const c=new mn;if(this.parseUnicodeClass(s,c)){l.runes=c.toArray(),this.push(l);break e}}const B=new mn;if(this.parsePerlClassEscape(s,B)){l.runes=B.toArray(),this.push(l);break e}s.rewindTo(a),this.reuse(l),this.literal(H.parseEscape(s));break}default:this.literal(s.pop());break}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new ye(H.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){const t=e.pos(),r=e.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){const l=r.charAt(2)==="P"?4:3,B=r.indexOf(">");if(B<0)throw new ye(H.ERR_INVALID_NAMED_CAPTURE,r);const c=r.substring(l,B);if(e.skipString(c),e.skip(l+1),!H.isValidCaptureName(c))throw new ye(H.ERR_INVALID_NAMED_CAPTURE,r.substring(0,B+1));const h=this.op(b.Op.LEFT_PAREN);if(h.cap=++this.numCap,this.namedGroups[c])throw new ye(H.ERR_DUPLICATE_NAMED_CAPTURE,c);this.namedGroups[c]=this.numCap,h.name=c;return}e.skip(2);let s=this.flags,i=1,a=!1;e:for(;e.more();){const l=e.pop();switch(l){case S.CODES.get("i"):s|=k.FOLD_CASE,a=!0;break;case S.CODES.get("m"):s&=-17,a=!0;break;case S.CODES.get("s"):s|=k.DOT_NL,a=!0;break;case S.CODES.get("U"):s|=k.NON_GREEDY,a=!0;break;case S.CODES.get("-"):if(i<0)break e;i=-1,s=~s,a=!1;break;case S.CODES.get(":"):case S.CODES.get(")"):if(i<0){if(!a)break e;s=~s}l===S.CODES.get(":")&&this.op(b.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new ye(H.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){const e=this.newRegexp(b.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){const e=this.newRegexp(b.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(b.Op.VERTICAL_BAR)}swapVerticalBar(){const e=this.stack.length;if(e>=3&&this.stack[e-2].op===b.Op.VERTICAL_BAR&&H.isCharClass(this.stack[e-1])&&H.isCharClass(this.stack[e-3])){let t=this.stack[e-1],r=this.stack[e-3];if(t.op>r.op){const s=r;r=t,t=s,this.stack[e-3]=r}return H.mergeCharClass(r,t),this.reuse(t),this.pop(),!0}if(e>=2){const t=this.stack[e-1],r=this.stack[e-2];if(r.op===b.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new ye(H.ERR_UNEXPECTED_PAREN,this.wholeRegexp);const e=this.pop(),t=this.pop();if(t.op!==b.Op.LEFT_PAREN)throw new ye(H.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if(H.hasCapture(e))throw new ye(H.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=b.Op.PLB:t.op=b.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=b.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){const r=e.pos();if(!(this.flags&k.PERL_X)||!e.more()||e.pop()!==S.CODES.get("\\")||!e.more())return!1;e.pop();const s=e.from(r),i=du.has(s)?du.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&k.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){const r=e.rest(),s=r.indexOf(":]");if(s<0)return!1;const i=r.substring(0,s+2);e.skipString(i);const a=Au.has(i)?Au.get(i):null;if(a===null)throw new ye(H.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(a,(this.flags&k.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){const r=e.pos();if(!(this.flags&k.UNICODE_GROUPS)||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===S.CODES.get("P")&&(s=-1),!e.more())throw e.rewindTo(r),new ye(H.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let a;if(i!==S.CODES.get("{"))a=Y.runeToString(i);else{const h=e.rest(),f=h.indexOf("}");if(f<0)throw e.rewindTo(r),new ye(H.ERR_INVALID_CHAR_RANGE,e.rest());a=h.substring(0,f),e.skipString(a),e.skip(1)}a.length!==0&&a.codePointAt(0)===S.CODES.get("^")&&(s=0-s,a=a.substring(1));const l=H.unicodeTable(a);if(l===null)throw new ye(H.ERR_INVALID_CHAR_RANGE,e.from(r));l.sign<0&&(s=0-s);const B=l.tab,c=l.fold;if(!(this.flags&k.FOLD_CASE)||c===null)t.appendTableWithSign(B,s);else{const h=new mn().appendTable(B).appendTable(c).cleanClass().toArray();t.appendClassWithSign(h,s)}return!0}parseClass(e){const t=e.pos();e.skip(1);const r=this.newRegexp(b.Op.CHAR_CLASS);r.flags=this.flags;const s=new mn;let i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),this.flags&k.CLASS_NL||s.appendRange(S.CODES.get(`
`),S.CODES.get(`
`)));let a=!0;for(;!e.more()||e.peek()!==S.CODES.get("]")||a;){if(e.more()&&e.lookingAt("-")&&!(this.flags&k.PERL_X)&&!a){const h=e.rest();if(h==="-"||!h.startsWith("-]"))throw e.rewindTo(t),new ye(H.ERR_INVALID_CHAR_RANGE,e.rest())}a=!1;const l=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(l)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(l);const B=H.parseClassChar(e,t);let c=B;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(c=H.parseClassChar(e,t),c<B)throw new ye(H.ERR_INVALID_CHAR_RANGE,e.from(l))}this.flags&k.FOLD_CASE?s.appendFoldedRange(B,c):s.appendRange(B,c)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}},U(H,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),U(H,"ERR_INVALID_CHAR_RANGE","invalid character class range"),U(H,"ERR_INVALID_ESCAPE","invalid escape sequence"),U(H,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),U(H,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),U(H,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),U(H,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),U(H,"ERR_MISSING_BRACKET","missing closing ]"),U(H,"ERR_MISSING_PAREN","missing closing )"),U(H,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),U(H,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),U(H,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name"),U(H,"ERR_UNEXPECTED_PAREN","unexpected )"),U(H,"ERR_NESTING_DEPTH","expression nests too deeply"),U(H,"ERR_LARGE","expression too large"),U(H,"ERR_INVALID_CAPTURE_IN_LOOKBEHIND","invalid capture in lookbehind"),U(H,"MAX_HEIGHT",1e3),U(H,"MAX_SIZE",3355443),U(H,"MAX_RUNES",33554432),U(H,"ANY_TABLE",new m(new Uint32Array([0,$.MAX_RUNE,1]))),U(H,"ASCII_TABLE",new m(new Uint32Array([0,127,1]))),U(H,"ASCII_FOLD_TABLE",new m(new Uint32Array([0,127,1,383,383,1,8490,8490,1]))),H),f_=class Yn{static initTest(e){const t=Yn.compile(e),r=new Yn(t.expr,t.prog,t.numSubexp,t.longest);return r.cond=t.cond,r.prefix=t.prefix,r.prefixUTF8=t.prefixUTF8,r.prefixComplete=t.prefixComplete,r.prefixRune=t.prefixRune,r.prefilter=t.prefilter,r}static compile(e){return Yn.compileImpl(e,k.PERL,!1)}static compilePOSIX(e){return Yn.compileImpl(e,k.POSIX,!0)}static compileImpl(e,t,r){let s=d_.parse(e,t);const i=s.maxCap();s=u_.simplify(s);const a=l_.build(s),l=c_.compileRegexp(s),B=new Yn(e,l,i,r);B.prefilter=a.type===Ce.Type.NONE?null:a;const[c,h]=l.prefix();return B.prefixComplete=c,B.prefix=h,B.prefixUTF8=Y.stringToUtf8ByteArray(B.prefix),B.prefix.length>0&&(B.prefixRune=B.prefix.codePointAt(0)),B.namedGroups=s.namedGroups,B}static match(e,t){return Yn.compile(e).match(t)}constructor(e,t,r=0,s=0){this.expr=e,this.prog=t,this.numSubexp=r,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.machinePool=[],this.dfa=new XE(this.prog),this.onepass=lu.compile(this.prog),this.prefilter=null}matchPrefixComplete(e,t,r,s){if((r===k.ANCHOR_START||r===k.ANCHOR_BOTH)&&t!==0)return null;let i=-1,a=-1;const l=e.prefixLength(this);if(r===k.UNANCHORED){const B=e.index(this,t);if(B<0)return null;i=t+B,a=i+l}else if(r===k.ANCHOR_BOTH){if(e.endPos()!==l||e.index(this,0)!==0)return null;i=0,a=l}else if(r===k.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,a=l}if(i<0)return null;if(s>0){const B=new Int32Array(s).fill(-1);return B[0]=i,B[1]=a,Array.from(B)}return[]}executeEngine(e,t,r,s){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,r,s);if(this.prefilter!==null&&r===k.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return lu.execute(this,e,t,r,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=Fi.maxBitStateLen(this.prog)?Fi.execute(this,e,t,r,s):this.doExecuteNFA(e,t,r,s);if(this.prog.numLb===0){const i=this.dfa.match(e,t,r);if(i!==null)return i?[]:null;if(e.endPos()<=Fi.maxBitStateLen(this.prog))return Fi.execute(this,e,t,r,s)}return this.doExecuteNFA(e,t,r,s)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,r,s){let i=this.get();i||(i=QE.fromRE2(this)),i.init(s);const a=i.match(e,t,r)?i.submatches():null;return this.put(i),a}match(e){return this.executeEngine(we.fromUTF16(e),0,k.UNANCHORED,0)!==null}matchWithGroup(e,t,r,s,i){return e instanceof cr||(Y.isByteArray(e)?e=Zn.utf8(e):e=Zn.utf16(e)),this.matchMachineInput(e,t,r,s,i)}matchMachineInput(e,t,r,s,i){if(t>r)return[!1,null];const a=e.isUTF16Encoding()?we.fromUTF16(e.asCharSequence(),0,r):we.fromUTF8(e.asBytes(),0,r),l=this.executeEngine(a,t,s,2*i);return l===null?[!1,null]:[!0,l]}matchUTF8(e){return this.executeEngine(we.fromUTF8(e),0,k.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,r){let s=0,i=0,a="";const l=we.fromUTF16(e);let B=0;for(;i<=e.length;){const c=this.executeEngine(l,i,k.UNANCHORED,2);if(c===null||c.length===0)break;a+=e.substring(s,c[0]),(c[1]>s||c[0]===0)&&(a+=t(e.substring(c[0],c[1])),B++),s=c[1];const h=l.step(i)&7;if(i+h>c[1]?i+=h:i+1>c[1]?i++:i=c[1],B>=r)break}return a+=e.substring(s),a}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let r=new Array(t).fill(-1);for(let s=0;s<e.length;s++)r[s]=e[s];e=r}return e}allMatches(e,t,r=s=>s){let s=[];const i=e.endPos();t<0&&(t=i+1);let a=0,l=0,B=-1;for(;l<t&&a<=i;){const c=this.executeEngine(e,a,k.UNANCHORED,this.prog.numCap);if(c===null||c.length===0)break;let h=!0;if(c[1]===a){c[0]===B&&(h=!1);const f=e.step(a);f<0?a=i+1:a+=f&7}else a=c[1];B=c[1],h&&(s.push(r(this.pad(c))),l++)}return s}findUTF8(e){const t=this.executeEngine(we.fromUTF8(e),0,k.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){const t=this.executeEngine(we.fromUTF8(e),0,k.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){const t=this.executeEngine(we.fromUTF16(e),0,k.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(we.fromUTF16(e),0,k.UNANCHORED,2)}findUTF8Submatch(e){const t=this.executeEngine(we.fromUTF8(e),0,k.UNANCHORED,this.prog.numCap);if(t===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.slice(t[2*s],t[2*s+1]));return r}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(we.fromUTF8(e),0,k.UNANCHORED,this.prog.numCap))}findSubmatch(e){const t=this.executeEngine(we.fromUTF16(e),0,k.UNANCHORED,this.prog.numCap);if(t===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.substring(t[2*s],t[2*s+1]));return r}findSubmatchIndex(e){return this.pad(this.executeEngine(we.fromUTF16(e),0,k.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){const r=this.allMatches(we.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(e,t){const r=this.allMatches(we.fromUTF8(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAll(e,t){const r=this.allMatches(we.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(e,t){const r=this.allMatches(we.fromUTF16(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(e,t){const r=this.allMatches(we.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.slice(s[2*a],s[2*a+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(e,t){const r=this.allMatches(we.fromUTF8(e),t);return r.length===0?null:r}findAllSubmatch(e,t){const r=this.allMatches(we.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.substring(s[2*a],s[2*a+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(e,t){const r=this.allMatches(we.fromUTF16(e),t);return r.length===0?null:r}},p_=class br{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(e instanceof RegExp&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let r="",s=!1,i=e.length;i===0&&(r="(?:)",s=!0);let a=!1,l=0;for(;l<i;){let c=e[l];if(c==="\\"){if(l+1<i)switch(c=e[l+1],c){case"\\":r+="\\\\",l+=2;continue;case"c":if(l+2<i){let C=e[l+2].charCodeAt(0);if(C>=65&&C<=90||C>=97&&C<=122){let D=C%32;r+="\\x",r+=(D>>4).toString(16).toUpperCase(),r+=(D&15).toString(16).toUpperCase(),l+=3,s=!0;continue}}r+="c",l+=2,s=!0;continue;case"u":if(l+2<i){if(e[l+2]==="{"){let C=l+3,D=!1,A=!1;for(;C<i;){const L=e[C];if(L==="}"){A=!0;break}if(!br.isHexadecimal(L))break;D=!0,C++}if(A&&D){r+="\\x",l+=2,s=!0;continue}}else if(l+5<i){let C=!0;for(let D=0;D<4;D++)if(!br.isHexadecimal(e[l+2+D])){C=!1;break}if(C){r+="\\x{"+e.substring(l+2,l+6)+"}",l+=6,s=!0;continue}}}r+="u",l+=2,s=!0;continue;case"x":{let C=!1;if(l+2<i&&e[l+2]==="{"){let D=l+3,A=!1,L=!1;for(;D<i;){const M=e[D];if(M==="}"){L=!0;break}if(!br.isHexadecimal(M))break;A=!0,D++}L&&A&&(C=!0)}else l+3<i&&br.isHexadecimal(e[l+2])&&br.isHexadecimal(e[l+3])&&(C=!0);C?(r+="\\x",l+=2):(r+="x",l+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":r+="\\"+c,l+=2;continue;default:{let C=e.codePointAt(l+1);if(C>=48&&C<=57||C>=65&&C<=90||C>=97&&C<=122){let D=Y.charCount(C);r+=e.substring(l+1,l+1+D),l+=D+1,s=!0}else{r+="\\";let D=Y.charCount(C);r+=e.substring(l+1,l+1+D),l+=D+1}continue}}}else if(c==="/"){r+="\\/",l+=1,s=!0;continue}else if(c==="[")a=!0;else if(c==="]")a=!1;else if(!a&&c==="("&&l+2<i&&e[l+1]==="?"&&e[l+2]==="<"&&l+3<i&&!"=!>)".includes(e[l+3])){r+="(?P<",l+=3,s=!0;continue}let h=e.codePointAt(l),f=Y.charCount(h);r+=e.substring(l,l+f),l+=f}const B=s?r:e;return t.length>0?`(?${t})${B}`:B}},Se,Pl=(Se=class{static quote(e){return Y.quoteMeta(e)}static quoteReplacement(e,t=!1){return su.quoteReplacement(e,t)}static translateRegExp(e){return p_.translate(e)}static compile(e,t=0){let r=e;if(t&Se.CASE_INSENSITIVE&&(r=`(?i)${r}`),t&Se.DOTALL&&(r=`(?s)${r}`),t&Se.MULTILINE&&(r=`(?m)${r}`),t&-544)throw new KE("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS");let s=k.PERL;t&Se.DISABLE_UNICODE_GROUPS&&(s&=-129),t&Se.LOOKBEHINDS&&(s|=k.LOOKBEHIND);const i=new Se(e,t);return i.re2Input=f_.compileImpl(r,s,(t&Se.LONGEST_MATCH)!==0),i}static matches(e,t){return Se.compile(e).testExact(t)}static initTest(e,t,r){if(e==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");const s=new Se(e,t);return s.re2Input=r,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return Y.isByteArray(e)&&(e=Zn.utf8(e)),new su(this,e)}test(e){return Y.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){const t=Y.isByteArray(e)?we.fromUTF8(e):we.fromUTF16(e);return this.re2Input.executeEngine(t,0,k.ANCHOR_BOTH,0)!==null}exec(e){const t=this.matcher(e);if(!t.find())return null;const r=[t.group(0)];for(let i=1;i<=t.groupCount();i++){const a=t.group(i);r.push(a===null?void 0:a)}r.index=t.start(0),r.input=e;const s=this.namedGroups();if(Object.keys(s).length>0){const i=t.getNamedGroups();for(const a in i)i[a]===null&&(i[a]=void 0);r.groups=i}else r.groups=void 0;return r}split(e,t=0){const r=this.matcher(e),s=[];let i=0,a=0;for(;r.find();){if(a===0&&r.end()===0){a=r.end();continue}if(t>0&&s.length===t-1)break;if(a===r.start()){if(t===0){i+=1,a=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(a,r.start())),a=r.end()}if(t===0&&a!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(a,r.inputLength()))}return(t!==0||s.length===0&&!(a===r.inputLength()&&a>0))&&s.push(r.substring(a,r.inputLength())),s}*matchAll(e){const t=this.matcher(e);for(;t.find();){const r=[t.group(0)];for(let i=1;i<=t.groupCount();i++){const a=t.group(i);r.push(a===null?void 0:a)}r.index=t.start(0),r.input=e;const s=this.namedGroups();if(Object.keys(s).length>0){const i=t.getNamedGroups();for(const a in i)i[a]===null&&(i[a]=void 0);r.groups=i}else r.groups=void 0;yield r}}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}},U(Se,"CASE_INSENSITIVE",yr.CASE_INSENSITIVE),U(Se,"DOTALL",yr.DOTALL),U(Se,"MULTILINE",yr.MULTILINE),U(Se,"DISABLE_UNICODE_GROUPS",yr.DISABLE_UNICODE_GROUPS),U(Se,"LONGEST_MATCH",yr.LONGEST_MATCH),U(Se,"LOOKBEHINDS",yr.LOOKBEHINDS),Se);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qr="12.17.0";function C_(n){Qr=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=new gl("@firebase/firestore");function Ir(){return ur.logLevel}function q(n,...e){if(ur.logLevel<=ue.DEBUG){const t=e.map(Sl);ur.debug(`Firestore (${Qr}): ${n}`,...t)}}function on(n,...e){if(ur.logLevel<=ue.ERROR){const t=e.map(Sl);ur.error(`Firestore (${Qr}): ${n}`,...t)}}function Rt(n,...e){if(ur.logLevel<=ue.WARN){const t=e.map(Sl);ur.warn(`Firestore (${Qr}): ${n}`,...t)}}function Sl(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Vd(n,r,t)}function Vd(n,e,t){let r=`FIRESTORE (${Qr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw on(r),new Error(r)}function W(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Vd(e,s,r)}function ae(n,e){return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=m_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ce(n,e){return n<e?-1:n>e?1:0}function Zo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Oo(s)===Oo(i)?ce(s,i):Oo(s)?1:-1}return ce(n.length,e.length)}const g_=55296,E_=57343;function Oo(n){const e=n.charCodeAt(0);return e>=g_&&e<=E_}function Vr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t){this.comparator=e,this.root=t||je.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,je.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,je.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Vi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Vi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Vi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Vi(this.root,e,this.comparator,!0)}}class Vi{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class je{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??je.RED,this.left=s??je.EMPTY,this.right=i??je.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new je(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return je.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return je.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ee(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ee(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ee(27949);return e+(this.isRed()?0:1)}}je.EMPTY=null,je.RED=!0,je.BLACK=!1;je.EMPTY=new class{constructor(){this.size=0}get key(){throw ee(57766)}get value(){throw ee(16141)}get color(){throw ee(16727)}get left(){throw ee(29726)}get right(){throw ee(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new je(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new xu(this.data.getIterator())}getIteratorFrom(e){return new xu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ne)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ne(this.comparator);return t.data=e,t}}class xu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Q extends $t{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="__name__";class Ot{constructor(e,t,r){t===void 0?t=0:t>e.length&&ee(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&ee(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ot.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ot?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Ot.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ce(e.length,t.length)}static compareSegments(e,t){const r=Ot.isNumericId(e),s=Ot.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Ot.extractNumericId(e).compare(Ot.extractNumericId(t)):Zo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return An.fromString(e.substring(4,e.length-2))}}class me extends Ot{construct(e,t,r){return new me(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new Q(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new me(t)}static emptyPath(){return new me([])}}const __=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let yt=class vr extends Ot{construct(e,t,r){return new vr(e,t,r)}static isValidIdentifier(e){return __.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),vr.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Mr}static keyField(){return new vr([Mr])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new Q(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new Q(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const B=e[s+1];if(B!=="\\"&&B!=="."&&B!=="`")throw new Q(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=B,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new Q(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new vr(t)}static emptyPath(){return new vr([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this.fields=e,e.sort(yt.comparator)}static empty(){return new Et([])}unionWith(e){let t=new Ne(yt.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Et(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Vr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function la(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Hn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function y_(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Md(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.path=e}static fromPath(e){return new Z(me.fromString(e))}static fromName(e){return new Z(me.fromString(e).popFirst(5))}static empty(){return new Z(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return me.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Z(new me(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gd(n,e,t){if(!t)throw new Q(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function D_(n,e,t,r){if(e===!0&&r===!0)throw new Q(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ru(n){if(!Z.isDocumentKey(n))throw new Q(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Pu(n){if(Z.isDocumentKey(n))throw new Q(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ai(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Nl(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ee(12329,{type:typeof n})}function tn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new Q(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Nl(n);throw new Q(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(n,e){const t={typeString:n};return e&&(t.value=e),t}function oi(n,e){if(!ai(n))throw new Q(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new Q(V.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su=-62135596800,Ou=1e6;class Ie{static now(){return Ie.fromMillis(Date.now())}static fromDate(e){return Ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Ou);return new Ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Q(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Q(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Su)throw new Q(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Q(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ou}_compareTo(e){return this.seconds===e.seconds?ce(this.nanoseconds,e.nanoseconds):ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(oi(e,Ie._jsonSchema))return new Ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Su;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ie._jsonSchemaVersion="firestore/timestamp/1.0",Ie._jsonSchema={type:Oe("string",Ie._jsonSchemaVersion),seconds:Oe("number"),nanoseconds:Oe("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ud("Invalid base64 string: "+i):i}}(e);return new Le(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Le(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Le.EMPTY_BYTE_STRING=new Le("");const w_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function On(n){if(W(!!n,39018),typeof n=="string"){let e=0;const t=w_.exec(n);if(W(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Te(n.seconds),nanos:Te(n.nanos)}}function Te(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Nn(n){return typeof n=="string"?Le.fromBase64String(n):Le.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hd="server_timestamp",jd="__type__",Jd="__previous_value__",qd="__local_write_time__";function Ra(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[jd])==null?void 0:r.stringValue)===Hd}function li(n){const e=n.mapValue.fields[Jd];return Ra(e)?li(e):e}function Gr(n){const e=On(n.mapValue.fields[qd].timestampValue);return new Ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e,t,r,s,i,a,l,B,c,h,f,C,D){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=B,this.useFetchStreams=c,this.isUsingEmulator=h,this.apiKey=f,this._customHeaders=C,this.grpcFlowControlWindow=D}}const Ba="(default)";class Ms{constructor(e,t){this.projectId=e,this.database=t||Ba}static empty(){return new Ms("","")}get isDefaultDatabase(){return this.database===Ba}isEqual(e){return e instanceof Ms&&e.projectId===this.projectId&&e.database===this.database}}function I_(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new Q(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ms(n.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll=-1;function Pa(n){return n==null}function Gs(n){return n===0&&1/n==-1/0}function v_(n){return typeof n=="number"&&Number.isInteger(n)&&!Gs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function T_(n){return typeof n=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zd="__type__",A_="__max__",Mi={mapValue:{}},$d="__vector__",Us="value",Ur={nullValue:"NULL_VALUE"},ht={booleanValue:!0},He={booleanValue:!1};function Fe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ra(n)?4:x_(n)?9007199254740991:ca(n)?10:11:ee(28295,{value:n})}function It(n,e,t){if(n===e)return!0;const r=Fe(n);if(r!==Fe(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Gr(n).isEqual(Gr(e));case 3:return function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;const l=On(i.timestampValue),B=On(a.timestampValue);return l.seconds===B.seconds&&l.nanos===B.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,a){return Nn(i.bytesValue).isEqual(Nn(a.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,a){return Te(i.geoPointValue.latitude)===Te(a.geoPointValue.latitude)&&Te(i.geoPointValue.longitude)===Te(a.geoPointValue.longitude)}(n,e);case 2:return function(i,a,l){if("integerValue"in i&&"integerValue"in a)return Te(i.integerValue)===Te(a.integerValue);let B,c;if("doubleValue"in i&&"doubleValue"in a)B=Te(i.doubleValue),c=Te(a.doubleValue);else{if(!(l!=null&&l.t))return!1;B=Te(i.integerValue??i.doubleValue),c=Te(a.integerValue??a.doubleValue)}return B===c?!!(l!=null&&l.i)||Gs(B)===Gs(c):!!(l===void 0||l.o)&&isNaN(B)&&isNaN(c)}(n,e,t);case 9:return Vr(n.arrayValue.values||[],e.arrayValue.values||[],(s,i)=>It(s,i,t));case 10:case 11:return function(i,a,l){const B=i.mapValue.fields||{},c=a.mapValue.fields||{};if(la(B)!==la(c))return!1;for(const h in B)if(B.hasOwnProperty(h)&&(c[h]===void 0||!It(B[h],c[h],l)))return!1;return!0}(n,e,t);default:return ee(52216,{left:n})}}function Hs(n,e){return(n.values||[]).find(t=>It(t,e))!==void 0}function dt(n,e){if(n===e)return 0;const t=Fe(n),r=Fe(e);if(t!==r)return ce(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ce(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=Te(i.integerValue||i.doubleValue),B=Te(a.integerValue||a.doubleValue);return l<B?-1:l>B?1:l===B?0:isNaN(l)?isNaN(B)?0:-1:1}(n,e);case 3:return Nu(n.timestampValue,e.timestampValue);case 4:return Nu(Gr(n),Gr(e));case 5:return Zo(n.stringValue,e.stringValue);case 6:return function(i,a){const l=Nn(i),B=Nn(a);return l.compareTo(B)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),B=a.split("/");for(let c=0;c<l.length&&c<B.length;c++){const h=ce(l[c],B[c]);if(h!==0)return h}return ce(l.length,B.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=ce(Te(i.latitude),Te(a.latitude));return l!==0?l:ce(Te(i.longitude),Te(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Lu(n.arrayValue,e.arrayValue);case 10:return function(i,a){var C,D,A,L;const l=i.fields||{},B=a.fields||{},c=(C=l[Us])==null?void 0:C.arrayValue,h=(D=B[Us])==null?void 0:D.arrayValue,f=ce(((A=c==null?void 0:c.values)==null?void 0:A.length)||0,((L=h==null?void 0:h.values)==null?void 0:L.length)||0);return f!==0?f:Lu(c,h)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Mi.mapValue&&a===Mi.mapValue)return 0;if(i===Mi.mapValue)return 1;if(a===Mi.mapValue)return-1;const l=i.fields||{},B=Object.keys(l),c=a.fields||{},h=Object.keys(c);B.sort(),h.sort();for(let f=0;f<B.length&&f<h.length;++f){const C=Zo(B[f],h[f]);if(C!==0)return C;const D=dt(l[B[f]],c[h[f]]);if(D!==0)return D}return ce(B.length,h.length)}(n.mapValue,e.mapValue);default:throw ee(23264,{u:t})}}function Nu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ce(n,e);const t=On(n),r=On(e),s=ce(t.seconds,r.seconds);return s!==0?s:ce(t.nanos,r.nanos)}function Lu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=dt(t[s],r[s]);if(i!==void 0&&i!==0)return i}return ce(t.length,r.length)}function Hr(n){return el(n)}function el(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=On(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Nn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return Z.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=el(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${el(t.fields[a])}`;return s+"}"}(n.mapValue):ee(61005,{value:n})}function Qi(n){switch(Fe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=li(n);return e?16+Qi(e):16;case 5:return 2*n.stringValue.length;case 6:return Nn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Qi(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Hn(r.fields,(i,a)=>{s+=i.length+Qi(a)}),s}(n.mapValue);default:throw ee(13486,{value:n})}}function Nt(n){return!!n&&"integerValue"in n}function er(n){return!!n&&"doubleValue"in n}function Ln(n){return Nt(n)||er(n)}function jr(n){return!!n&&"arrayValue"in n}function _t(n){return!!n&&"nullValue"in n}function ft(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function rr(n){return!!n&&"mapValue"in n}function ca(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[zd])==null?void 0:r.stringValue)===$d}function tl(n){var e,t;return(t=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Us])==null?void 0:t.arrayValue}function xs(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Hn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=xs(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=xs(n.arrayValue.values[t]);return e}return{...n}}function x_(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===A_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.value=e}static empty(){return new nt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!rr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=xs(t)}setAll(e){let t=yt.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const B=this.getFieldsMap(t);this.applyChanges(B,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=xs(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());rr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return It(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];rr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Hn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new nt(xs(this.value))}}function Kd(n){const e=[];return Hn(n.fields,(t,r)=>{const s=new yt([t]);if(rr(r)){const i=Kd(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Et(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Gs(e)?"-0":e}}function Fl(n){return{integerValue:""+n}}function kl(n,e,t){return v_(e)?Fl(e):Sa(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(){this._=void 0}}function R_(n,e,t){return n instanceof ua?function(s,i){const a={fields:{[jd]:{stringValue:Hd},[qd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ra(i)&&(i=li(i)),i&&(a.fields[Jd]=i),{mapValue:a}}(t,e):n instanceof js?Wd(n,e):n instanceof Js?Yd(n,e):n instanceof qs?function(s,i){const a=Qd(s,i),l=fa(a)+fa(s.l);return Nt(a)&&Nt(s.l)?Fl(l):Sa(s.serializer,l)}(n,e):n instanceof ha?function(s,i){return Fu(s,i,Math.min)}(n,e):n instanceof da?function(s,i){return Fu(s,i,Math.max)}(n,e):void 0}function P_(n,e,t){return n instanceof js?Wd(n,e):n instanceof Js?Yd(n,e):t}function Qd(n,e){return n instanceof qs?Ln(e)?e:{integerValue:0}:null}class ua extends Oa{}class js extends Oa{constructor(e){super(),this.elements=e}}function Wd(n,e){const t=Xd(e);for(const r of n.elements)t.some(s=>It(s,r))||t.push(r);return{arrayValue:{values:t}}}class Js extends Oa{constructor(e){super(),this.elements=e}}function Yd(n,e){let t=Xd(e);for(const r of n.elements)t=t.filter(s=>!It(s,r));return{arrayValue:{values:t}}}class Vl extends Oa{constructor(e,t){super(),this.serializer=e,this.l=t}}class qs extends Vl{}class ha extends Vl{}class da extends Vl{}function Fu(n,e,t){if(!Ln(e))return n.l;const r=t(fa(e),fa(n.l));return Nt(e)&&Nt(n.l)?Fl(r):Sa(n.serializer,r)}function fa(n){return Te(n.integerValue||n.doubleValue)}function Xd(n){return jr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function S_(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof js&&s instanceof js||r instanceof Js&&s instanceof Js?Vr(r.elements,s.elements,It):r instanceof qs&&s instanceof qs||r instanceof ha&&s instanceof ha||r instanceof da&&s instanceof da?It(r.l,s.l):r instanceof ua&&s instanceof ua}(n.transform,e.transform)}class O_{constructor(e,t){this.version=e,this.transformResults=t}}class xt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new xt}static exists(e){return new xt(void 0,e)}static updateTime(e){return new xt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Wi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Na{}function Zd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ml(n.key,xt.none()):new Bi(n.key,n.data,xt.none());{const t=n.data,r=nt.empty();let s=new Ne(yt.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new jn(n.key,r,new Et(s.toArray()),xt.none())}}function N_(n,e,t){n instanceof Bi?function(s,i,a){const l=s.value.clone(),B=Vu(s.fieldTransforms,i,a.transformResults);l.setAll(B),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof jn?function(s,i,a){if(!Wi(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Vu(s.fieldTransforms,i,a.transformResults),B=i.data;B.setAll(ef(s)),B.setAll(l),i.convertToFoundDocument(a.version,B).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Rs(n,e,t,r){return n instanceof Bi?function(i,a,l,B){if(!Wi(i.precondition,a))return l;const c=i.value.clone(),h=Mu(i.fieldTransforms,B,a);return c.setAll(h),a.convertToFoundDocument(a.version,c).setHasLocalMutations(),null}(n,e,t,r):n instanceof jn?function(i,a,l,B){if(!Wi(i.precondition,a))return l;const c=Mu(i.fieldTransforms,B,a),h=a.data;return h.setAll(ef(i)),h.setAll(c),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(f=>f.field))}(n,e,t,r):function(i,a,l){return Wi(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function L_(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Qd(r.transform,s||null);i!=null&&(t===null&&(t=nt.empty()),t.set(r.field,i))}return t||null}function ku(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Vr(r,s,(i,a)=>S_(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Bi extends Na{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class jn extends Na{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ef(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Vu(n,e,t){const r=new Map;W(n.length===t.length,32656,{h:t.length,T:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,P_(a,l,t[s]))}return r}function Mu(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,R_(i,a,e))}return r}class Ml extends Na{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class F_ extends Na{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(e,t){this.position=e,this.inclusive=t}}function Gu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=Z.comparator(Z.fromName(a.referenceValue),t.key):r=dt(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Uu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!It(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{}class Ve extends tf{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new V_(e,t,r):t==="array-contains"?new U_(e,r):t==="in"?new H_(e,r):t==="not-in"?new j_(e,r):t==="array-contains-any"?new J_(e,r):new Ve(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new M_(e,r):new G_(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(dt(t,this.value)):t!==null&&Fe(this.value)===Fe(t)&&this.matchesComparison(dt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ht extends tf{constructor(e,t){super(),this.filters=e,this.op=t,this.P=null}static create(e,t){return new Ht(e,t)}matches(e){return nf(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.P!==null||(this.P=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.P}getFilters(){return Object.assign([],this.filters)}}function nf(n){return n.op==="and"}function rf(n){return k_(n)&&nf(n)}function k_(n){for(const e of n.filters)if(e instanceof Ht)return!1;return!0}function nl(n){if(n instanceof Ve)return n.field.canonicalString()+n.op.toString()+Hr(n.value);if(rf(n))return n.filters.map(e=>nl(e)).join(",");{const e=n.filters.map(t=>nl(t)).join(",");return`${n.op}(${e})`}}function sf(n,e){return n instanceof Ve?function(r,s){return s instanceof Ve&&r.op===s.op&&r.field.isEqual(s.field)&&It(r.value,s.value)}(n,e):n instanceof Ht?function(r,s){return s instanceof Ht&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&sf(a,s.filters[l]),!0):!1}(n,e):void ee(19439)}function af(n){return n instanceof Ve?function(t){return`${t.field.canonicalString()} ${t.op} ${Hr(t.value)}`}(n):n instanceof Ht?function(t){return t.op.toString()+" {"+t.getFilters().map(af).join(" ,")+"}"}(n):"Filter"}class V_ extends Ve{constructor(e,t,r){super(e,t,r),this.key=Z.fromName(r.referenceValue)}matches(e){const t=Z.comparator(e.key,this.key);return this.matchesComparison(t)}}class M_ extends Ve{constructor(e,t){super(e,"in",t),this.keys=of("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class G_ extends Ve{constructor(e,t){super(e,"not-in",t),this.keys=of("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function of(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>Z.fromName(r.referenceValue))}class U_ extends Ve{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return jr(t)&&Hs(t.arrayValue,this.value)}}class H_ extends Ve{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Hs(this.value.arrayValue,t)}}class j_ extends Ve{constructor(e,t){super(e,"not-in",t)}matches(e){if(Hs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Hs(this.value.arrayValue,t)}}class J_ extends Ve{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!jr(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Hs(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,t="asc"){this.field=e,this.dir=t}}function q_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{static fromTimestamp(e){return new se(e)}static min(){return new se(new Ie(0,0))}static max(){return new se(new Ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new We(e,0,se.min(),se.min(),se.min(),nt.empty(),0)}static newFoundDocument(e,t,r,s){return new We(e,1,t,se.min(),r,s,0)}static newNoDocument(e,t){return new We(e,2,t,se.min(),se.min(),nt.empty(),0)}static newUnknownDocument(e,t){return new We(e,3,t,se.min(),se.min(),nt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(se.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=nt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=se.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof We&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new We(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zs=-1;function z_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=se.fromTimestamp(r===1e9?new Ie(t+1,0):new Ie(t,r));return new Fn(s,Z.empty(),e)}function $_(n){return new Fn(n.readTime,n.key,zs)}class Fn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Fn(se.min(),Z.empty(),zs)}static max(){return new Fn(se.max(),Z.empty(),zs)}}function K_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=Z.comparator(n.documentKey,e.documentKey),t!==0?t:ce(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.R=null}}function Hu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Q_(n,e,t,r,s,i,a)}function lf(n){const e=ae(n);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>nl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Pa(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Hr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Hr(r)).join(",")),e.R=t}return e.R}function Bf(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!q_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!sf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Uu(n.startAt,e.startAt)&&Uu(n.endAt,e.endAt)}function Xn(n){return!!n.isCorePipeline}function cf(n){return!!n.path&&Z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,B=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=B,this.I=null,this.A=null,this.V=null,this.startAt,this.endAt}}function W_(n,e,t,r,s,i,a,l){return new La(n,e,t,r,s,i,a,l)}function Gl(n){return new La(n)}function ju(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Y_(n){return Z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function X_(n){return n.collectionGroup!==null}function Ps(n){const e=ae(n);if(e.I===null){e.I=[];const t=new Set;for(const i of e.explicitOrderBy)e.I.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new Ne(yt.comparator);return a.filters.forEach(B=>{B.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.I.push(new Ca(i,r))}),t.has(yt.keyField().canonicalString())||e.I.push(new Ca(yt.keyField(),r))}return e.I}function Mt(n){const e=ae(n);return e.A||(e.A=Z_(e,Ps(n))),e.A}function Z_(n,e){if(n.limitType==="F")return Hu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ca(s.field,i)});const t=n.endAt?new pa(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new pa(n.startAt.position,n.startAt.inclusive):null;return Hu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function rl(n,e,t){return new La(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ey(n,e){return Bf(Mt(n),Mt(e))&&n.limitType===e.limitType}function Ss(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>af(s)).join(", ")}]`),Pa(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Hr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Hr(s)).join(",")),`Target(${r})`}(Mt(n))}; limitType=${n.limitType})`}function Fa(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):Z.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Ps(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,B){const c=Gu(a,l,B);return a.inclusive?c<=0:c<0}(r.startAt,Ps(r),s)||r.endAt&&!function(a,l,B){const c=Gu(a,l,B);return a.inclusive?c>=0:c>0}(r.endAt,Ps(r),s))}(n,e)}function Ul(n){return(e,t)=>{let r=!1;for(const s of Ps(n)){const i=ty(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function ty(n,e,t){const r=n.field.isKeyField()?Z.comparator(e.key,t.key):function(i,a,l){const B=a.data.field(i),c=l.data.field(i);return B!==null&&c!==null?dt(B,c):ee(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ee(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pe,fe;function ry(n){switch(n){case V.OK:return ee(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return ee(15467,{code:n})}}function uf(n){if(n===void 0)return on("GRPC error has no .code"),V.UNKNOWN;switch(n){case Pe.OK:return V.OK;case Pe.CANCELLED:return V.CANCELLED;case Pe.UNKNOWN:return V.UNKNOWN;case Pe.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case Pe.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case Pe.INTERNAL:return V.INTERNAL;case Pe.UNAVAILABLE:return V.UNAVAILABLE;case Pe.UNAUTHENTICATED:return V.UNAUTHENTICATED;case Pe.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case Pe.NOT_FOUND:return V.NOT_FOUND;case Pe.ALREADY_EXISTS:return V.ALREADY_EXISTS;case Pe.PERMISSION_DENIED:return V.PERMISSION_DENIED;case Pe.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case Pe.ABORTED:return V.ABORTED;case Pe.OUT_OF_RANGE:return V.OUT_OF_RANGE;case Pe.UNIMPLEMENTED:return V.UNIMPLEMENTED;case Pe.DATA_LOSS:return V.DATA_LOSS;default:return ee(39323,{code:n})}}(fe=Pe||(Pe={}))[fe.OK=0]="OK",fe[fe.CANCELLED=1]="CANCELLED",fe[fe.UNKNOWN=2]="UNKNOWN",fe[fe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",fe[fe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",fe[fe.NOT_FOUND=5]="NOT_FOUND",fe[fe.ALREADY_EXISTS=6]="ALREADY_EXISTS",fe[fe.PERMISSION_DENIED=7]="PERMISSION_DENIED",fe[fe.UNAUTHENTICATED=16]="UNAUTHENTICATED",fe[fe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",fe[fe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",fe[fe.ABORTED=10]="ABORTED",fe[fe.OUT_OF_RANGE=11]="OUT_OF_RANGE",fe[fe.UNIMPLEMENTED=12]="UNIMPLEMENTED",fe[fe.INTERNAL=13]="INTERNAL",fe[fe.UNAVAILABLE=14]="UNAVAILABLE",fe[fe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Hn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Md(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sy=new ve(Z.comparator);function ct(){return sy}const hf=new ve(Z.comparator);function Tr(...n){let e=hf;for(const t of n)e=e.insert(t.key,t);return e}function df(n){let e=hf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function In(){return Os()}function ff(){return Os()}function Os(){return new fr(n=>n.toString(),(n,e)=>n.isEqual(e))}const iy=new ve(Z.comparator),ay=new Ne(Z.comparator);function le(...n){let e=ay;for(const t of n)e=e.add(t);return e}const oy=new Ne(ce);function ly(){return oy}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function By(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy=new An([4294967295,4294967295],0);function Ju(n){const e=By().encode(n),t=new vd;return t.update(e),new Uint8Array(t.digest())}function qu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new An([t,r],0),new An([s,i],0)]}class Hl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ws(`Invalid padding: ${t}`);if(r<0)throw new ws(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ws(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ws(`Invalid padding when bitmap length is 0: ${t}`);this.m=8*e.length-t,this.p=An.fromNumber(this.m)}v(e,t,r){let s=e.add(t.multiply(An.fromNumber(r)));return s.compare(cy)===1&&(s=new An([s.getBits(0),s.getBits(1)],0)),s.modulo(this.p).toNumber()}S(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.m===0)return!1;const t=Ju(e),[r,s]=qu(t);for(let i=0;i<this.hashCount;i++){const a=this.v(r,s,i);if(!this.S(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Hl(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.m===0)return;const t=Ju(e),[r,s]=qu(t);for(let i=0;i<this.hashCount;i++){const a=this.v(r,s,i);this.D(a)}}D(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ws extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e,t,r,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ui.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ci(se.min(),s,new ve(ce),ct(),ct(),le())}}class ui{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ui(r,t,le(),le(),le())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e,t,r,s){this.C=e,this.removedTargetIds=t,this.key=r,this.F=s}}class pf{constructor(e,t){this.targetId=e,this.O=t}}class Cf{constructor(e,t,r=Le.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class zu{constructor(e){this.targetId=e,this.M=0,this.N=$u(),this.L=Le.EMPTY_BYTE_STRING,this.B=!1,this.U=!0}get current(){return this.B}get resumeToken(){return this.L}get k(){return this.M!==0}get q(){return this.U}$(e){e.approximateByteSize()>0&&(this.U=!0,this.L=e)}K(){let e=le(),t=le(),r=le();return this.N.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:ee(38017,{changeType:i})}}),new ui(this.L,this.B,e,t,r)}W(){this.U=!1,this.N=$u()}G(e,t){this.U=!0,this.N=this.N.insert(e,t)}j(e){this.U=!0,this.N=this.N.remove(e)}H(){this.M+=1}J(){this.M-=1,W(this.M>=0,3241,{M:this.M,targetId:this.targetId})}Y(){this.U=!0,this.B=!0}}const Es="WatchChangeAggregator";class uy{constructor(e){this.Z=e,this.X=new Map,this.ee=ct(),this.te=Gi(),this.ne=ct(),this.re=Gi(),this.ie=new ve(ce)}se(e){for(const t of e.C)e.F&&e.F.isFoundDocument()?this._e(t,e.F):this.oe(t,e.key,e.F);for(const t of e.removedTargetIds)this.oe(t,e.key,e.F)}ae(e){this.forEachTarget(e,t=>{const r=this.X.get(t);if(r)switch(e.state){case 0:this.ue(t)&&r.$(e.resumeToken);break;case 1:r.J(),r.k||r.W(),r.$(e.resumeToken);break;case 2:r.J(),r.k||this.removeTarget(t);break;case 3:this.ue(t)&&(r.Y(),r.$(e.resumeToken));break;case 4:this.ue(t)&&(this.ce(t),r.$(e.resumeToken));break;default:ee(56790,{state:e.state})}else q(Es,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.X.forEach((r,s)=>{this.ue(s)&&t(s)})}le(e){var t;return Xn(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:cf(e)}Ee(e){const t=e.targetId,r=e.O.count,s=this.he(t);if(s){const i=s.target;if(this.le(i))if(r===0){const a=new Z(Xn(i)?me.fromString(i.getPipelineDocuments()[0]):i.path);this.oe(t,a,We.newNoDocument(a,se.min()))}else W(r===1,20013,"Single document existence filter with count: "+r);else{const a=this.Te(t);if(a!==r){const l=this.Pe(e),B=l?this.Re(l,e,a):1;if(B!==0){this.ce(t);const c=B===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.ie=this.ie.insert(t,c)}}}}}Pe(e){const t=e.O.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Nn(r).toUint8Array()}catch(B){if(B instanceof Ud)return Rt("Decoding the base64 bloom filter in existence filter failed ("+B.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw B}try{l=new Hl(a,s,i)}catch(B){return Rt(B instanceof ws?"BloomFilter error: ":"Applying bloom filter failed: ",B),null}return l.m===0?null:l}Re(e,t,r){return t.O.count===r-this.Ve(e,t.targetId)?0:2}Ve(e,t){const r=this.Z.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Z.Ae(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.oe(t,i,null),s++)}),s}de(e){const t=new Map;this.X.forEach((i,a)=>{const l=this.he(a);if(l){if(i.current&&this.le(l.target)){const B=Xn(l.target)?me.fromString(l.target.getPipelineDocuments()[0]):l.target.path,c=new Z(B);this.fe(c).has(a)||this.me(a,c)||this.oe(a,c,We.newNoDocument(c,e))}i.q&&(t.set(a,i.K()),i.W())}});let r=le();this.re.forEach((i,a)=>{let l=!0;a.forEachWhile(B=>{const c=this.he(B);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ee.forEach((i,a)=>a.setReadTime(e)),this.ne.forEach((i,a)=>a.setReadTime(e));const s=new ci(e,t,this.ie,this.ee,this.ne,r);return this.ee=ct(),this.te=Gi(),this.ne=ct(),this.re=Gi(),this.ie=new ve(ce),s}_e(e,t){const r=this.X.get(e);if(!r||!this.ue(e))return void q(Es,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.me(e,t.key)?2:0;r.G(t.key,s),Xn(this.he(e).target)&&this.he(e).target.getPipelineFlavor()!=="exact"?this.ne=this.ne.insert(t.key,t):this.ee=this.ee.insert(t.key,t),this.te=this.te.insert(t.key,this.fe(t.key).add(e)),this.re=this.re.insert(t.key,this.pe(t.key).add(e))}oe(e,t,r){const s=this.X.get(e);s&&this.ue(e)?(this.me(e,t)?s.G(t,1):s.j(t),this.re=this.re.insert(t,this.pe(t).delete(e)),this.re=this.re.insert(t,this.pe(t).add(e)),r&&(Xn(this.he(e).target)&&this.he(e).target.getPipelineFlavor()!=="exact"?this.ne=this.ne.insert(t,r):this.ee=this.ee.insert(t,r))):q(Es,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.X.delete(e)}Te(e){const t=this.X.get(e);if(!t)return 0;const r=t.K();return this.Z.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}H(e){let t=this.X.get(e);t||(q(Es,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new zu(e),this.X.set(e,t)),t.H()}pe(e){let t=this.re.get(e);return t||(t=new Ne(ce),this.re=this.re.insert(e,t)),t}fe(e){let t=this.te.get(e);return t||(t=new Ne(ce),this.te=this.te.insert(e,t)),t}ue(e){const t=this.he(e)!==null;return t||q(Es,"Detected inactive target",e),t}he(e){const t=this.X.get(e);return t===void 0||t.k?null:this.Z.ge(e)}ce(e){this.X.set(e,new zu(e)),this.Z.getRemoteKeysForTarget(e).forEach(t=>{this.oe(e,t,null)})}me(e,t){return this.Z.getRemoteKeysForTarget(e).has(t)}}function Gi(){return new ve(Z.comparator)}function $u(){return new ve(Z.comparator)}const hy={asc:"ASCENDING",desc:"DESCENDING"},dy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fy={and:"AND",or:"OR"};class py{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function sl(n,e){return n.useProto3Json||Pa(e)?e:{value:e}}function ma(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function jl(n){const e=On(n);return new Ie(e.seconds,e.nanos)}function mf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Xi(n,e){return ma(n,e.toTimestamp())}function Gt(n){return W(!!n,49232),se.fromTimestamp(jl(n))}function Jl(n,e){return il(n,e).canonicalString()}function il(n,e){const t=function(s){return new me(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function gf(n){const e=me.fromString(n);return W(wf(e),10190,{key:e.toString()}),e}function ga(n,e){return Jl(n.databaseId,e.path)}function No(n,e){const t=gf(e);if(t.get(1)!==n.databaseId.projectId)throw new Q(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new Q(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new Z(_f(t))}function Ef(n,e){return Jl(n.databaseId,e)}function Cy(n){const e=gf(n);return e.length===4?me.emptyPath():_f(e)}function al(n){return new me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function _f(n){return W(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ku(n,e,t){return{name:ga(n,e),fields:t.value.mapValue.fields}}function my(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:ee(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,h){return c.useProto3Json?(W(h===void 0||typeof h=="string",58123),Le.fromBase64String(h||"")):(W(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Le.fromUint8Array(h||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(c){const h=c.code===void 0?V.UNKNOWN:uf(c.code);return new Q(h,c.message||"")}(a);t=new Cf(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=No(n,r.document.name),i=Gt(r.document.updateTime),a=r.document.createTime?Gt(r.document.createTime):se.min(),l=new nt({mapValue:{fields:r.document.fields}}),B=We.newFoundDocument(s,i,a,l),c=r.targetIds||[],h=r.removedTargetIds||[];t=new Yi(c,h,B.key,B)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=No(n,r.document),i=r.readTime?Gt(r.readTime):se.min(),a=We.newNoDocument(s,i),l=r.removedTargetIds||[];t=new Yi([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=No(n,r.document),i=r.removedTargetIds||[];t=new Yi([],i,s,null)}else{if(!("filter"in e))return ee(11601,{ye:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new ny(s,i),l=r.targetId;t=new pf(l,a)}}return t}function gy(n,e){let t;if(e instanceof Bi)t={update:Ku(n,e.key,e.value)};else if(e instanceof Ml)t={delete:ga(n,e.key)};else if(e instanceof jn)t={update:Ku(n,e.key,e.data),updateMask:Ay(e.fieldMask)};else{if(!(e instanceof F_))return ee(16599,{we:e.type});t={verify:ga(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof ua)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof js)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Js)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof qs)return{fieldPath:a.field.canonicalString(),increment:l.l};if(l instanceof ha)return{fieldPath:a.field.canonicalString(),minimum:l.l};if(l instanceof da)return{fieldPath:a.field.canonicalString(),maximum:l.l};throw ee(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Xi(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee(27497)}(n,e.precondition)),t}function Ey(n,e){return n&&n.length>0?(W(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?Gt(s.updateTime):Gt(i);return a.isEqual(se.min())&&(a=Gt(i)),new O_(a,s.transformResults||[])}(t,e))):[]}function _y(n,e){return{documents:[Ef(n,e.path)]}}function yy(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Ef(n,s);const i=function(c){if(c.length!==0)return Df(Ht.create(c,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(c){if(c.length!==0)return c.map(h=>function(C){return{field:Ar(C.field),direction:Iy(C.dir)}}(h))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=sl(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{be:t,parent:s}}function Dy(n){let e=Cy(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){W(r===1,65062);const h=t.from[0];h.allDescendants?s=h.collectionId:e=e.child(h.collectionId)}let i=[];t.where&&(i=function(f){const C=yf(f);return C instanceof Ht&&rf(C)?C.getFilters():[C]}(t.where));let a=[];t.orderBy&&(a=function(f){return f.map(C=>function(A){return new Ca(xr(A.field),function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(A.direction))}(C))}(t.orderBy));let l=null;t.limit&&(l=function(f){let C;return C=typeof f=="object"?f.value:f,Pa(C)?null:C}(t.limit));let B=null;t.startAt&&(B=function(f){const C=!!f.before,D=f.values||[];return new pa(D,C)}(t.startAt));let c=null;return t.endAt&&(c=function(f){const C=!f.before,D=f.values||[];return new pa(D,C)}(t.endAt)),W_(e,s,a,i,l,"F",B,c)}function wy(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function by(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map(t=>t._toProto(n))}}}}function yf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=xr(t.unaryFilter.field);return Ve.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=xr(t.unaryFilter.field);return Ve.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=xr(t.unaryFilter.field);return Ve.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=xr(t.unaryFilter.field);return Ve.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ee(61313);default:return ee(60726)}}(n):n.fieldFilter!==void 0?function(t){return Ve.create(xr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ee(58110);default:return ee(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ht.create(t.compositeFilter.filters.map(r=>yf(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee(1026)}}(t.compositeFilter.op))}(n):ee(30097,{filter:n})}function Iy(n){return hy[n]}function vy(n){return dy[n]}function Ty(n){return fy[n]}function Ar(n){return{fieldPath:n.canonicalString()}}function xr(n){return yt.fromServerFormat(n.fieldPath)}function Df(n){return n instanceof Ve?function(t){if(t.op==="=="){if(ft(t.value))return{unaryFilter:{field:Ar(t.field),op:"IS_NAN"}};if(_t(t.value))return{unaryFilter:{field:Ar(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ft(t.value))return{unaryFilter:{field:Ar(t.field),op:"IS_NOT_NAN"}};if(_t(t.value))return{unaryFilter:{field:Ar(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ar(t.field),op:vy(t.op),value:t.value}}}(n):n instanceof Ht?function(t){const r=t.getFilters().map(s=>Df(s));return r.length===1?r[0]:{compositeFilter:{op:Ty(t.op),filters:r}}}(n):ee(54877,{filter:n})}function Ay(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function wf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function bf(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function $s(n,e){const t={fields:{}};return e.forEach((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)}),{mapValue:t}}function If(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ka(n){return new py(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new bt(Le.fromBase64String(e))}catch(t){throw new Q(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new bt(Le.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(oi(e,bt._jsonSchema))return bt.fromBase64String(e.bytes)}}bt._jsonSchemaVersion="firestore/bytes/1.0",bt._jsonSchema={type:Oe("string",bt._jsonSchemaVersion),bytes:Oe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new Q(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new yt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function xy(){return new Va(Mr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Q(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Q(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ce(this._lat,e._lat)||ce(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ut._jsonSchemaVersion}}static fromJSON(e){if(oi(e,Ut._jsonSchema))return new Ut(e.latitude,e.longitude)}}Ut._jsonSchemaVersion="firestore/geoPoint/1.0",Ut._jsonSchema={type:Oe("string",Ut._jsonSchemaVersion),latitude:Oe("number"),longitude:Oe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Qe.UNAUTHENTICATED=new Qe(null),Qe.GOOGLE_CREDENTIALS=new Qe("google-credentials-uid"),Qe.FIRST_PARTY=new Qe("first-party-uid"),Qe.MOCK_USER=new Qe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ry{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Qe.UNAUTHENTICATED))}shutdown(){}}class Py{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Sy{constructor(e){this.Se=e,this.currentUser=Qe.UNAUTHENTICATED,this.De=0,this.forceRefresh=!1,this.auth=null}start(e,t){W(this.xe===void 0,42304);let r=this.De;const s=B=>this.De!==r?(r=this.De,t(B)):Promise.resolve();let i=new sr;this.xe=()=>{this.De++,this.currentUser=this.Ce(),i.resolve(),i=new sr,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const B=i;e.enqueueRetryable(async()=>{await B.promise,await s(this.currentUser)})},l=B=>{q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=B,this.xe&&(this.auth.addAuthTokenListener(this.xe),a())};this.Se.onInit(B=>l(B)),setTimeout(()=>{if(!this.auth){const B=this.Se.getImmediate({optional:!0});B?l(B):(q("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new sr)}},0),a()}getToken(){const e=this.De,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.De!==e?(q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(W(typeof r.accessToken=="string",31837,{Fe:r}),new vf(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.xe&&this.auth.removeAuthTokenListener(this.xe),this.xe=void 0}Ce(){const e=this.auth&&this.auth.getUid();return W(e===null||typeof e=="string",2055,{Oe:e}),new Qe(e)}}class Oy{constructor(e,t,r){this.Me=e,this.Ne=t,this.Le=r,this.type="FirstParty",this.user=Qe.FIRST_PARTY,this.Be=new Map}Ue(){return this.Le?this.Le():null}get headers(){this.Be.set("X-Goog-AuthUser",this.Me);const e=this.Ue();return e&&this.Be.set("Authorization",e),this.Ne&&this.Be.set("X-Goog-Iam-Authorization-Token",this.Ne),this.Be}}class Ny{constructor(e,t,r){this.Me=e,this.Ne=t,this.Le=r}getToken(){return Promise.resolve(new Oy(this.Me,this.Ne,this.Le))}start(e,t){e.enqueueRetryable(()=>t(Qe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Qu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ly{constructor(e,t){this.ke=t,this.forceRefresh=!1,this.appCheck=null,this.qe=null,this.$e=null,vt(e)&&e.settings.appCheckToken&&(this.$e=e.settings.appCheckToken)}start(e,t){W(this.xe===void 0,3512);const r=i=>{i.error!=null&&q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.qe;return this.qe=i.token,q("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.xe=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.xe&&this.appCheck.addTokenListener(this.xe)};this.ke.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.ke.getImmediate({optional:!0});i?s(i):q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.$e)return Promise.resolve(new Qu(this.$e));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(W(typeof t.token=="string",44558,{tokenResult:t}),this.qe=t.token,new Qu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.xe&&this.appCheck.removeTokenListener(this.xe),this.xe=void 0}}function Tf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{Ke(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu="ConnectivityMonitor";class Yu{constructor(){this.We=()=>this.Qe(),this.Ge=()=>this.ze(),this.je=[],this.He()}Ke(e){this.je.push(e)}shutdown(){window.removeEventListener("online",this.We),window.removeEventListener("offline",this.Ge)}He(){window.addEventListener("online",this.We),window.addEventListener("offline",this.Ge)}Qe(){q(Wu,"Network connectivity changed: AVAILABLE");for(const e of this.je)e(0)}ze(){q(Wu,"Network connectivity changed: UNAVAILABLE");for(const e of this.je)e(1)}static Je(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ui=null;function ol(){return Ui===null?Ui=function(){return 268435456+Math.round(2147483648*Math.random())}():Ui++,"0x"+Ui.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="RestConnection",ky={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Vy{get Ye(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ze=t+"://"+e.host,this.Xe=`projects/${r}/databases/${s}`,this.et=this.databaseId.database===Ba?`project_id=${r}`:`project_id=${r}&database_id=${s}`}tt(e,t,r,s,i){const a=ol(),l=this.nt(e,t.toUriEncodedString());q(Lo,`Sending RPC '${e}' ${a}:`,l,r);const B={"google-cloud-resource-prefix":this.Xe,"x-goog-request-params":this.et};this.rt(B,s,i);const{host:c}=new URL(l),h=$r(c);return this.it(e,l,B,r,h).then(f=>(q(Lo,`Received RPC '${e}' ${a}: `,f),f),f=>{throw Rt(Lo,`RPC '${e}' ${a} failed with error: `,f,"url: ",l,"request:",r),f})}st(e,t,r,s,i,a){return this.tt(e,t,r,s,i)}rt(e,t,r){if(e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Qr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s),this.databaseInfo._customHeaders)for(const s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}nt(e,t){const r=ky[e];let s=`${this.Ze}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e){this._t=e._t,this.ot=e.ot}ut(e){this.ct=e}lt(e){this.Et=e}ht(e){this.Tt=e}onMessage(e){this.Pt=e}close(){this.ot()}send(e){this._t(e)}Rt(){this.ct()}It(){this.Et()}At(e){this.Tt(e)}Vt(e){this.Pt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke="WebChannelConnection",_s=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})};class Nr extends Vy{constructor(e){super(e),this.dt=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static ft(){if(!Nr.gt){const e=Rd();_s(e,xd.STAT_EVENT,t=>{t.stat===Qo.PROXY?q(Ke,"STAT_EVENT: detected buffering proxy"):t.stat===Qo.NOPROXY&&q(Ke,"STAT_EVENT: detected no buffering proxy")}),Nr.gt=!0}}it(e,t,r,s,i){const a=ol();return new Promise((l,B)=>{const c=new Td;c.setWithCredentials(!0),c.listenOnce(Ad.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Ki.NO_ERROR:const f=c.getResponseJson();q(Ke,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(f)),l(f);break;case Ki.TIMEOUT:q(Ke,`RPC '${e}' ${a} timed out`),B(new Q(V.DEADLINE_EXCEEDED,"Request time out"));break;case Ki.HTTP_ERROR:const C=c.getStatus();if(q(Ke,`RPC '${e}' ${a} failed with status:`,C,"response text:",c.getResponseText()),C>0){let D=c.getResponseJson();Array.isArray(D)&&(D=D[0]);const A=D==null?void 0:D.error;if(A&&A.status&&A.message){const L=function(z){const K=z.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(K)>=0?K:V.UNKNOWN}(A.status);B(new Q(L,A.message))}else B(new Q(V.UNKNOWN,"Server responded with status "+c.getStatus()))}else B(new Q(V.UNAVAILABLE,"Connection failed."));break;default:ee(9055,{yt:e,streamId:a,wt:c.getLastErrorCode(),bt:c.getLastError()})}}finally{q(Ke,`RPC '${e}' ${a} completed.`)}});const h=JSON.stringify(s);q(Ke,`RPC '${e}' ${a} sending request:`,s),c.send(t,"POST",h,r,15)})}vt(e,t,r){const s=ol(),i=[this.Ze,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},B=this.longPollingOptions.timeoutSeconds;B!==void 0&&(l.longPollingTimeout=Math.round(1e3*B)),this.useFetchStreams&&(l.useFetchStreams=!0),this.rt(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const c=i.join("");q(Ke,`Creating RPC '${e}' stream ${s}: ${c}`,l);const h=a.createWebChannel(c,l);this.St(h);let f=!1,C=!1;const D=new My({_t:A=>{C?q(Ke,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(f||(q(Ke,`Opening RPC '${e}' stream ${s} transport.`),h.open(),f=!0),q(Ke,`RPC '${e}' stream ${s} sending:`,A),h.send(A))},ot:()=>h.close()});return _s(h,Ds.EventType.OPEN,()=>{C||(q(Ke,`RPC '${e}' stream ${s} transport opened.`),D.Rt())}),_s(h,Ds.EventType.CLOSE,()=>{C||(C=!0,q(Ke,`RPC '${e}' stream ${s} transport closed`),D.At(),this.Dt(h))}),_s(h,Ds.EventType.ERROR,A=>{C||(C=!0,Rt(Ke,`RPC '${e}' stream ${s} transport errored. Name:`,A.name,"Message:",A.message),D.At(new Q(V.UNAVAILABLE,"The operation could not be completed")))}),_s(h,Ds.EventType.MESSAGE,A=>{var L;if(!C){const M=A.data[0];W(!!M,16349);const z=M,K=(z==null?void 0:z.error)||((L=z[0])==null?void 0:L.error);if(K){q(Ke,`RPC '${e}' stream ${s} received error:`,K);const ne=K.status;let ie=function(I){const E=Pe[I];if(E!==void 0)return uf(E)}(ne),Be=K.message;ne==="NOT_FOUND"&&Be.includes("database")&&Be.includes("does not exist")&&Be.includes(this.databaseId.database)&&Rt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ie===void 0&&(ie=V.INTERNAL,Be="Unknown error status: "+ne+" with message "+K.message),C=!0,D.At(new Q(ie,Be)),h.close()}else q(Ke,`RPC '${e}' stream ${s} received:`,M),D.Vt(M)}}),Nr.ft(),setTimeout(()=>{D.It()},0),D}terminate(){this.dt.forEach(e=>e.close()),this.dt=[]}St(e){this.dt.push(e)}Dt(e){this.dt=this.dt.filter(t=>t===e)}rt(e,t,r){super.rt(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Pd()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gy(n){return new Nr(n)}Nr.gt=!1;class Af{constructor(e,t,r=1e3,s=1.5,i=6e4){this.xt=e,this.timerId=t,this.Ct=r,this.Ft=s,this.Ot=i,this.Mt=0,this.Nt=null,this.Lt=Date.now(),this.reset()}reset(){this.Mt=0}Bt(){this.Mt=this.Ot}Ut(e){this.cancel();const t=Math.floor(this.Mt+this.kt()),r=Math.max(0,Date.now()-this.Lt),s=Math.max(0,t-r);s>0&&q("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Mt} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Nt=this.xt.enqueueAfterDelay(this.timerId,s,()=>(this.Lt=Date.now(),e())),this.Mt*=this.Ft,this.Mt<this.Ct&&(this.Mt=this.Ct),this.Mt>this.Ot&&(this.Mt=this.Ot)}qt(){this.Nt!==null&&(this.Nt.skipDelay(),this.Nt=null)}cancel(){this.Nt!==null&&(this.Nt.cancel(),this.Nt=null)}kt(){return(Math.random()-.5)*this.Mt}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu="PersistentStream";class xf{constructor(e,t,r,s,i,a,l,B){this.xt=e,this.$t=r,this.Kt=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=B,this.state=0,this.Wt=0,this.Qt=null,this.Gt=null,this.stream=null,this.zt=0,this.jt=new Af(e,t)}Ht(){return this.state===1||this.state===5||this.Jt()}Jt(){return this.state===2||this.state===3}start(){this.zt=0,this.state!==4?this.auth():this.Yt()}async stop(){this.Ht()&&await this.close(0)}Zt(){this.state=0,this.jt.reset()}Xt(){this.Jt()&&this.Qt===null&&(this.Qt=this.xt.enqueueAfterDelay(this.$t,6e4,()=>this.en()))}tn(e){this.nn(),this.stream.send(e)}async en(){if(this.Jt())return this.close(0)}nn(){this.Qt&&(this.Qt.cancel(),this.Qt=null)}rn(){this.Gt&&(this.Gt.cancel(),this.Gt=null)}async close(e,t){this.nn(),this.rn(),this.jt.cancel(),this.Wt++,e!==4?this.jt.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(on(t.toString()),on("Using maximum backoff delay to prevent overloading the backend."),this.jt.Bt()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.sn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ht(t)}sn(){}auth(){this.state=1;const e=this._n(this.Wt),t=this.Wt;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Wt===t&&this.an(r,s)},r=>{e(()=>{const s=new Q(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.un(s)})})}an(e,t){const r=this._n(this.Wt);this.stream=this.cn(e,t),this.stream.ut(()=>{r(()=>this.listener.ut())}),this.stream.lt(()=>{r(()=>(this.state=2,this.Gt=this.xt.enqueueAfterDelay(this.Kt,1e4,()=>(this.Jt()&&(this.state=3),Promise.resolve())),this.listener.lt()))}),this.stream.ht(s=>{r(()=>this.un(s))}),this.stream.onMessage(s=>{r(()=>++this.zt==1?this.En(s):this.onNext(s))})}Yt(){this.state=5,this.jt.Ut(async()=>{this.state=0,this.start()})}un(e){return q(Xu,`close with error: ${e}`),this.stream=null,this.close(4,e)}_n(e){return t=>{this.xt.enqueueAndForget(()=>this.Wt===e?t():(q(Xu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Uy extends xf{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}cn(e,t){return this.connection.vt("Listen",e,t)}En(e){return this.onNext(e)}onNext(e){this.jt.reset();const t=my(this.serializer,e),r=function(i){if(!("targetChange"in i))return se.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?se.min():a.readTime?Gt(a.readTime):se.min()}(e);return this.listener.hn(t,r)}Tn(e){const t={};t.database=al(this.serializer),t.addTarget=function(i,a){let l;const B=a.target;if(l=Xn(B)?{pipelineQuery:by(i,B)}:cf(B)?{documents:_y(i,B)}:{query:yy(i,B).be},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=mf(i,a.resumeToken);const c=sl(i,a.expectedCount);c!==null&&(l.expectedCount=c)}else if(a.snapshotVersion.compareTo(se.min())>0){l.readTime=ma(i,a.snapshotVersion.toTimestamp());const c=sl(i,a.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=wy(this.serializer,e);r&&(t.labels=r),this.tn(t)}Pn(e){const t={};t.database=al(this.serializer),t.removeTarget=e,this.tn(t)}}class Hy extends xf{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Rn(){return this.zt>0}start(){this.lastStreamToken=void 0,super.start()}sn(){this.Rn&&this.In([])}cn(e,t){return this.connection.vt("Write",e,t)}En(e){return W(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,W(!e.writeResults||e.writeResults.length===0,55816),this.listener.An()}onNext(e){W(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.jt.reset();const t=Ey(e.writeResults,e.commitTime),r=Gt(e.commitTime);return this.listener.Vn(r,t)}dn(){const e={};e.database=al(this.serializer),this.tn(e)}In(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>gy(this.serializer,r))};this.tn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{}class Jy extends jy{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.fn=!1}mn(){if(this.fn)throw new Q(V.FAILED_PRECONDITION,"The client has already been terminated.")}tt(e,t,r,s){return this.mn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.tt(e,il(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Q(V.UNKNOWN,i.toString())})}st(e,t,r,s,i){return this.mn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.st(e,il(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new Q(V.UNKNOWN,a.toString())})}terminate(){this.fn=!0,this.connection.terminate()}}function qy(n,e,t,r){return new Jy(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zy="ComponentProvider",Zu=new Map;function $y(n,e,t,r,s){return new b_(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Tf(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Rf=41943040;class lt{static withCacheSize(e){return new lt(e,lt.DEFAULT_COLLECTION_PERCENTILE,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}lt.DEFAULT_COLLECTION_PERCENTILE=10,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,lt.DEFAULT=new lt(Rf,lt.DEFAULT_COLLECTION_PERCENTILE,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),lt.DISABLED=new lt(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.pn(r),this.gn=r=>t.writeSequenceNumber(r))}pn(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.gn&&this.gn(e),e}}Ma.yn=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Qy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wr(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==Ky)throw n;q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ee(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new F((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof F?t:F.resolve(t)}catch(t){return F.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):F.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):F.reject(t)}static resolve(e){return new F((t,r)=>{t(e)})}static reject(e){return new F((t,r)=>{r(e)})}static waitFor(e){return new F((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},B=>r(B))}),a=!0,i===s&&t()})}static or(e){let t=F.resolve(!1);for(const r of e)t=t.next(s=>s?F.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new F((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let B=0;B<i;B++){const c=B;t(e[c]).next(h=>{a[c]=h,++l,l===i&&r(a)},h=>s(h))}})}static doWhile(e,t){return new F((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function Wy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Yr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th="LruGarbageCollector",Yy=1048576;function nh([n,e],[t,r]){const s=ce(n,t);return s===0?ce(e,r):s}class Xy{constructor(e){this.Jn=e,this.buffer=new Ne(nh),this.Yn=0}Zn(){return++this.Yn}Xn(e){const t=[e,this.Zn()];if(this.buffer.size<this.Jn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();nh(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Zy{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.tr(6e4)}stop(){this.er&&(this.er.cancel(),this.er=null)}get started(){return this.er!==null}tr(e){q(th,`Garbage collection scheduled in ${e}ms`),this.er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Yr(t)?q(th,"Ignoring IndexedDB error during garbage collection: ",t):await Wr(t)}await this.tr(3e5)})}}class eD{constructor(e,t){this.nr=e,this.params=t}calculateTargetCount(e,t){return this.nr.rr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return F.resolve(Ma.yn);const r=new Xy(t);return this.nr.forEachTarget(e,s=>r.Xn(s.sequenceNumber)).next(()=>this.nr.ir(e,s=>r.Xn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.nr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.nr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(q("LruGarbageCollector","Garbage collection skipped; disabled"),F.resolve(eh)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),eh):this.sr(e,t))}getCacheSize(e){return this.nr.getCacheSize(e)}sr(e,t){let r,s,i,a,l,B,c;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,a=Date.now(),this.nthSequenceNumber(e,s))).next(f=>(r=f,l=Date.now(),this.removeTargets(e,r,t))).next(f=>(i=f,B=Date.now(),this.removeOrphanedDocuments(e,r))).next(f=>(c=Date.now(),Ir()<=ue.DEBUG&&q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-h}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(B-l)+`ms
	Removed ${f} documents in `+(c-B)+`ms
Total Duration: ${c-h}ms`),F.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f})))}}function tD(n,e){return new eD(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf="firestore.googleapis.com",rh=!0;class sh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new Q(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Pf,this.ssl=rh}else this.host=e.host,this.ssl=e.ssl??rh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=Rf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Yy)throw new Q(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(D_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Tf(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new Q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new Q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new Q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new Q(V.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&function(r,s){if(r===s)return!0;if(!r||!s)return!1;const i=Object.keys(r),a=Object.keys(s);if(i.length!==a.length)return!1;for(const l of i)if(r[l]!==s[l])return!1;return!0}(this._customHeaders,e._customHeaders)}}let Ga=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Q(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Q(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ry;switch(r.type){case"firstParty":return new Ny(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Q(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Zu.get(t);r&&(q(zy,"Removing Datastore"),Zu.delete(t),r.terminate())}(this),Promise.resolve()}};function nD(n,e,t,r={}){var c;n=tn(n,Ga);const s=$r(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&ml(`https://${l}`),i.host!==Pf&&i.host!==l&&Rt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const B={...i,host:l,ssl:s,emulatorOptions:r};if(!or(B,a)&&(n._setSettings(B),r.mockUserToken)){let h,f;if(typeof r.mockUserToken=="string")h=r.mockUserToken,f=Qe.MOCK_USER;else{h=Uh(r.mockUserToken,(c=n._app)==null?void 0:c.options.projectId);const C=r.mockUserToken.sub||r.mockUserToken.user_id;if(!C)throw new Q(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Qe(C)}n._authCredentials=new Py(new vf(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ua(this.firestore,e,this._query)}}class Re{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Re(this.firestore,e,this._key)}toJSON(){return{type:Re._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(oi(t,Re._jsonSchema))return new Re(e,r||null,new Z(me.fromString(t.referencePath)))}}Re._jsonSchemaVersion="firestore/documentReference/1.0",Re._jsonSchema={type:Oe("string",Re._jsonSchemaVersion),referencePath:Oe("string")};class xn extends Ua{constructor(e,t,r){super(e,t,Gl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Re(this.firestore,null,new Z(e))}withConverter(e){return new xn(this.firestore,e,this._path)}}function ih(n,e,...t){if(n=Xe(n),Gd("collection","path",e),n instanceof Ga){const r=me.fromString(e,...t);return Pu(r),new xn(n,null,r)}{if(!(n instanceof Re||n instanceof xn))throw new Q(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return Pu(r),new xn(n.firestore,null,r)}}function st(n,e,...t){if(n=Xe(n),arguments.length===1&&(e=Ol.newId()),Gd("doc","path",e),n instanceof Ga){const r=me.fromString(e,...t);return Ru(r),new Re(n,null,new Z(r))}{if(!(n instanceof Re||n instanceof xn))throw new Q(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return Ru(r),new Re(n.firestore,n instanceof xn?n.converter:null,new Z(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(oi(e,ut._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ut(e.vectorValues);throw new Q(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ut._jsonSchemaVersion="firestore/vectorValue/1.0",ut._jsonSchema={type:Oe("string",ut._jsonSchemaVersion),vectorValues:Oe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rD=/^__.*__$/;class sD{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new jn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Bi(e,this.data,t,this.fieldTransforms)}}class Sf{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new jn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Of(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee(40011,{dataSource:n})}}class zl{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new zl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Ea(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Of(this.dataSource)&&rD.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class iD{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ka(e)}createContext(e,t,r,s=!1){return new zl({dataSource:e,methodName:t,targetDoc:r,path:yt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Nf(n){const e=n._freezeSettings(),t=ka(n._databaseId);return new iD(n._databaseId,!!e.ignoreUndefinedProperties,t)}function aD(n,e,t,r,s,i={}){const a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);$l("Data must be an object, but it was:",a,r);const l=Lf(r,a);let B,c;if(i.merge)B=new Et(a.fieldMask),c=a.fieldTransforms;else if(i.mergeFields){const h=[];for(const f of i.mergeFields){const C=Jr(e,f,t);if(!a.contains(C))throw new Q(V.INVALID_ARGUMENT,`Field '${C}' is specified in your field mask but missing from your input data.`);Vf(h,C)||h.push(C)}B=new Et(h),c=a.fieldTransforms.filter(f=>B.covers(f.field))}else B=null,c=a.fieldTransforms;return new sD(new nt(l),B,c)}class Ha extends ql{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ha}}function oD(n,e,t,r){const s=n.createContext(1,e,t);$l("Data must be an object, but it was:",s,r);const i=[],a=nt.empty();Hn(r,(B,c)=>{const h=kf(e,B,t);c=Xe(c);const f=s.childContextForFieldPath(h);if(c instanceof Ha)i.push(h);else{const C=hr(c,f);C!=null&&(i.push(h),a.set(h,C))}});const l=new Et(i);return new Sf(a,l,s.fieldTransforms)}function lD(n,e,t,r,s,i){const a=n.createContext(1,e,t),l=[Jr(e,r,t)],B=[s];if(i.length%2!=0)throw new Q(V.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let C=0;C<i.length;C+=2)l.push(Jr(e,i[C])),B.push(i[C+1]);const c=[],h=nt.empty();for(let C=l.length-1;C>=0;--C)if(!Vf(c,l[C])){const D=l[C];let A=B[C];A=Xe(A);const L=a.childContextForFieldPath(D);if(A instanceof Ha)c.push(D);else{const M=hr(A,L);M!=null&&(c.push(D),h.set(D,M))}}const f=new Et(c);return new Sf(h,f,a.fieldTransforms)}function hr(n,e,t){if(Ff(n=Xe(n)))return $l("Unsupported field value:",e,n),Lf(n,e);if(n instanceof ql)return function(s,i){if(!Of(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(s,i){const a=[];let l=0;for(const B of s){let c=hr(B,i.childContextForArray(l));c==null&&(c={nullValue:"NULL_VALUE"}),a.push(c),l++}return{arrayValue:{values:a}}}(n,e)}return function(s,i,a){if((s=Xe(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return kl(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const l=Ie.fromDate(s);return{timestampValue:ma(i.serializer,l)}}if(s instanceof Ie){const l=new Ie(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:ma(i.serializer,l)}}if(s instanceof Ut)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof bt)return{bytesValue:mf(i.serializer,s._byteString)};if(s instanceof Re){const l=i.databaseId,B=s.firestore._databaseId;if(!B.isEqual(l))throw i.createError(`Document reference is for database ${B.projectId}/${B.database} but should be for database ${l.projectId}/${l.database}`);return{referenceValue:Jl(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof ut)return function(B,c){const h=B instanceof ut?B.toArray():B;return{mapValue:{fields:{[zd]:{stringValue:$d},[Us]:{arrayValue:{values:h.map(C=>{if(typeof C!="number")throw c.createError("VectorValues must only contain numeric values.");return Sa(c.serializer,C)})}}}}}}(s,i);if(bf(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Nl(s)}`)}(n,e)}function Lf(n,e){const t={};return Md(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Hn(n,(r,s)=>{const i=hr(s,e.childContextForField(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Ff(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ie||n instanceof Ut||n instanceof bt||n instanceof Re||n instanceof ql||n instanceof ut||bf(n))}function $l(n,e,t){if(!Ff(t)||!ai(t)){const r=Nl(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Jr(n,e,t){if((e=Xe(e))instanceof Va)return e._internalPath;if(typeof e=="string")return kf(n,e);throw Ea("Field path arguments must be of type string or ",n,!1,void 0,t)}const BD=new RegExp("[~\\*/\\[\\]]");function kf(n,e,t){if(e.search(BD)>=0)throw Ea(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Va(...e.split("."))._internalPath}catch{throw Ea(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ea(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let B="";return(i||a)&&(B+=" (found",i&&(B+=` in field ${r}`),a&&(B+=` in document ${s}`),B+=")"),new Q(V.INVALID_ARGUMENT,l+n+B)}function Vf(n,e){return n.some(t=>t.isEqual(e))}function cD(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=nt.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const a=e[s];let l;i.nestedOptions&&ai(a)?l={mapValue:{fields:new Ze(i.nestedOptions).getOptionsProto(t,a)}}:a&&(l=hr(a,t)??void 0),l&&r.set(yt.fromServerFormat(i.serverName),l)}}return r}getOptionsProto(e,t,r){const s=this._getKnownOptions(t,e);if(r){const i=new Map(y_(r,(a,l)=>[yt.fromServerFormat(l),a!==void 0?hr(a,e):null]));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uD(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")}(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")}(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))}(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!ai(t.fields))}(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))}(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))}(n.pipelineValue)))}function hD(n){return new ut(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(n){let e;return n instanceof pr?n:(e=ai(n)?gD(n):n instanceof Array?ED(n):Mf(n,void 0),e)}function Fo(n){if(n instanceof pr)return n;if(n instanceof ut)return Ks(n);if(Array.isArray(n))return Ks(hD(n));throw new Error("Unsupported value: "+typeof n)}function Kl(n){return T_(n)?pD(n):j(n)}class pr{constructor(){this._protoValueType="ProtoValue"}add(e){return new N("add",[this,j(e)],"add")}asBoolean(){if(this instanceof kn)return this;if(this instanceof Xr)return new Uf(this);if(this instanceof hi)return new mD(this);if(this instanceof N)return new Gf(this);throw new Q("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new N("subtract",[this,j(e)],"subtract")}multiply(e){return new N("multiply",[this,j(e)],"multiply")}divide(e){return new N("divide",[this,j(e)],"divide")}mod(e){return new N("mod",[this,j(e)],"mod")}equal(e){return new N("equal",[this,j(e)],"equal").asBoolean()}notEqual(e){return new N("not_equal",[this,j(e)],"notEqual").asBoolean()}lessThan(e){return new N("less_than",[this,j(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new N("less_than_or_equal",[this,j(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new N("greater_than",[this,j(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new N("greater_than_or_equal",[this,j(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const r=[e,...t].map(s=>j(s));return new N("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new N("array_contains",[this,j(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new bs(e.map(j),"arrayContainsAll"):e;return new N("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new bs(e.map(j),"arrayContainsAny"):e;return new N("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new N("array_reverse",[this])}arrayLength(){return new N("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new bs(e.map(j),"equalAny"):e;return new N("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new bs(e.map(j),"notEqualAny"):e;return new N("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new N("exists",[this],"exists").asBoolean()}charLength(){return new N("char_length",[this],"charLength")}like(e){return new N("like",[this,j(e)],"like").asBoolean()}regexContains(e){return new N("regex_contains",[this,j(e)],"regexContains").asBoolean()}regexFind(e){return new N("regex_find",[this,j(e)],"regexFind")}regexFindAll(e){return new N("regex_find_all",[this,j(e)],"regexFindAll")}regexMatch(e){return new N("regex_match",[this,j(e)],"regexMatch").asBoolean()}stringContains(e){return new N("string_contains",[this,j(e)],"stringContains").asBoolean()}startsWith(e){return new N("starts_with",[this,j(e)],"startsWith").asBoolean()}endsWith(e){return new N("ends_with",[this,j(e)],"endsWith").asBoolean()}toLower(){return new N("to_lower",[this],"toLower")}toUpper(){return new N("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(j(e)),new N("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(j(e)),new N("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(j(e)),new N("rtrim",t,"rtrim")}type(){return new N("type",[this])}isType(e){return new N("is_type",[this,Ks(e)],"isType").asBoolean()}stringConcat(e,...t){const r=[e,...t].map(j);return new N("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new N("string_index_of",[this,j(e)],"stringIndexOf")}stringRepeat(e){return new N("string_repeat",[this,j(e)],"stringRepeat")}stringReplaceAll(e,t){return new N("string_replace_all",[this,j(e),j(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new N("string_replace_one",[this,j(e),j(t)],"stringReplaceOne")}concat(e,...t){const r=[e,...t].map(j);return new N("concat",[this,...r],"concat")}reverse(){return new N("reverse",[this],"reverse")}arrayFilter(e,t){return new N("array_filter",[this,j(e),t],"arrayFilter")}arrayTransform(e,t){return new N("array_transform",[this,j(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new N("array_transform",[this,j(e),j(t),r],"arrayTransformWithIndex")}arraySlice(e,t){const r=[this,j(e)];return t!==void 0&&r.push(j(t)),new N("array_slice",r,"arraySlice")}arrayFirst(){return new N("array_first",[this],"arrayFirst")}arrayFirstN(e){return new N("array_first_n",[this,j(e)],"arrayFirstN")}arrayLast(){return new N("array_last",[this],"arrayLast")}arrayLastN(e){return new N("array_last_n",[this,j(e)],"arrayLastN")}arrayMaximum(){return new N("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new N("maximum_n",[this,j(e)],"arrayMaximumN")}arrayMinimum(){return new N("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new N("minimum_n",[this,j(e)],"arrayMinimumN")}arrayIndexOf(e){return new N("array_index_of",[this,j(e),j("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new N("array_index_of",[this,j(e),j("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new N("array_index_of_all",[this,j(e)],"arrayIndexOfAll")}byteLength(){return new N("byte_length",[this],"byteLength")}ceil(){return new N("ceil",[this])}floor(){return new N("floor",[this])}abs(){return new N("abs",[this])}exp(){return new N("exp",[this])}mapGet(e){return new N("map_get",[this,Ks(e)],"mapGet")}mapSet(e,t,...r){const s=[this,j(e),j(t),...r.map(j)];return new N("map_set",s,"mapSet")}mapKeys(){return new N("map_keys",[this],"mapKeys")}mapValues(){return new N("map_values",[this],"mapValues")}mapEntries(){return new N("map_entries",[this],"mapEntries")}getField(e){return new N("get_field",[this,j(e)],"get_field")}count(){return gt._create("count",[this],"count")}sum(){return gt._create("sum",[this],"sum")}average(){return gt._create("average",[this],"average")}minimum(){return gt._create("minimum",[this],"minimum")}maximum(){return gt._create("maximum",[this],"maximum")}first(){return gt._create("first",[this],"first")}last(){return gt._create("last",[this],"last")}arrayAgg(){return gt._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return gt._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return gt._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const r=[e,...t];return new N("maximum",[this,...r.map(j)],"logicalMaximum")}logicalMinimum(e,...t){const r=[e,...t];return new N("minimum",[this,...r.map(j)],"minimum")}vectorLength(){return new N("vector_length",[this],"vectorLength")}cosineDistance(e){return new N("cosine_distance",[this,Fo(e)],"cosineDistance")}dotProduct(e){return new N("dot_product",[this,Fo(e)],"dotProduct")}euclideanDistance(e){return new N("euclidean_distance",[this,Fo(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new N("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new N("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new N("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new N("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new N("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new N("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new N("timestamp_add",[this,j(e),j(t)],"timestampAdd")}timestampSubtract(e,t){return new N("timestamp_subtract",[this,j(e),j(t)],"timestampSubtract")}timestampDiff(e,t){return new N("timestamp_diff",[this,Kl(e),j(t)],"timestampDiff")}timestampExtract(e,t){const r=[this,j(e)];return t&&r.push(j(t)),new N("timestamp_extract",r,"timestampExtract")}documentId(){return new N("document_id",[this],"documentId")}parent(){return new N("parent",[this],"parent")}substring(e,t){const r=j(e);return new N("substring",t===void 0?[this,r]:[this,r,j(t)],"substring")}arrayGet(e){return new N("array_get",[this,j(e)],"arrayGet")}isError(){return new N("is_error",[this],"isError").asBoolean()}ifError(e){const t=new N("if_error",[this,j(e)],"ifError");return e instanceof kn?t.asBoolean():t}isAbsent(){return new N("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new N("map_remove",[this,j(e)],"mapRemove")}mapMerge(e,...t){const r=j(e),s=t.map(j);return new N("map_merge",[this,r,...s],"mapMerge")}pow(e){return new N("pow",[this,j(e)])}trunc(e){return e===void 0?new N("trunc",[this]):new N("trunc",[this,j(e)],"trunc")}round(e){return e===void 0?new N("round",[this]):new N("round",[this,j(e)],"round")}collectionId(){return new N("collection_id",[this])}length(){return new N("length",[this])}ln(){return new N("ln",[this])}sqrt(){return new N("sqrt",[this])}stringReverse(){return new N("string_reverse",[this])}ifAbsent(e){return new N("if_absent",[this,j(e)],"ifAbsent")}ifNull(e){return new N("if_null",[this,j(e)],"ifNull")}coalesce(e,...t){return new N("coalesce",[this,j(e),...t.map(j)],"coalesce")}join(e){return new N("join",[this,j(e)],"join")}log10(){return new N("log10",[this])}arraySum(){return new N("sum",[this])}split(e){return new N("split",[this,j(e)])}timestampTruncate(e,t){const r=[this,j(e)];return t&&r.push(j(t)),new N("timestamp_trunc",r)}ascending(){return _D(this)}descending(){return yD(this)}as(e){return new fD(this,e,"as")}}class gt{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){const s=new gt(e,t);return s._methodName=r,s}as(e){return new dD(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}}class dD{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class fD{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class bs extends pr{constructor(e,t){super(),this.ur=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.ur.map(t=>t._toProto(e))}}}_readUserData(e){this.ur.forEach(t=>t._readUserData(e))}}class hi extends pr{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new N("geo_distance",[this,j(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function pD(n){return CD(n,"field")}function CD(n,e){return new hi(typeof n=="string"?Mr===n?xy()._internalPath:Jr("field",n):n._internalPath,e)}class Xr extends pr{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new Xr(e,void 0);return t._protoValue=e,t}_toProto(e){return W(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,uD(this._protoValue)||(this._protoValue=hr(this.value,e))}}function Ks(n,e){return Mf(n,"constant")}function Mf(n,e){const t=new Xr(n,e);return typeof n=="boolean"?new Uf(t):t}class N extends pr{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Ze({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map(r=>r._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class kn extends pr{get _methodName(){return this._expr._methodName}countIf(){return gt._create("count_if",[this],"countIf")}not(){return new N("not",[this],"not").asBoolean()}conditional(e,t){return new N("conditional",[this,e,t],"conditional")}ifError(e){const t=j(e),r=new N("if_error",[this,t],"ifError");return t instanceof kn?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class Gf extends kn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class Uf extends kn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class mD extends kn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function gD(n,e){const t=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];t.push(Ks(r)),t.push(j(s))}return new N("map",t,"map")}function ED(n){return function(t,r){return new N("array",t.map(s=>j(s)),r)}(n,"array")}function _D(n){return new Hf(Kl(n),"ascending","ascending")}function yD(n){return new Hf(Kl(n),"descending","descending")}class Hf{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:If(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class jf extends Dt{get _name(){return"add_fields"}get _optionsUtil(){return new Ze({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[$s(e,this.fields)]}}_readUserData(e){super._readUserData(e),Vn(this.fields,e)}}class Jf extends Dt{get _name(){return"aggregate"}get _optionsUtil(){return new Ze({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[$s(e,this.accumulators),$s(e,this.groups)]}}_readUserData(e){super._readUserData(e),Vn(this.groups,e),Vn(this.accumulators,e)}}class qf extends Dt{get _name(){return"distinct"}get _optionsUtil(){return new Ze({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[$s(e,this.groups)]}}_readUserData(e){super._readUserData(e),Vn(this.groups,e)}}class ja extends Dt{get _name(){return"collection"}get _optionsUtil(){return new Ze({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Er=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Er}]}}_readUserData(e){super._readUserData(e)}}class Ja extends Dt{get _name(){return"collection_group"}get _optionsUtil(){return new Ze({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class Ql extends Dt{get _name(){return"database"}get _optionsUtil(){return new Ze({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class Wl extends Dt{get _name(){return"documents"}get _optionsUtil(){return new Ze({})}constructor(e,t){if(super(t),!e||e.length===0)throw new Q(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=e.map(i=>i.startsWith("/")?i:"/"+i),s=new Set(r);if(s.size!==r.length)throw new Q(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.hr=r,this.Tr=s}_toProto(e){return{...super._toProto(e),args:this.hr.map(t=>({referenceValue:t}))}}_readUserData(e){super._readUserData(e)}}class Yl extends Dt{get _name(){return"where"}get _optionsUtil(){return new Ze({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Vn(this.condition,e)}}class Qs extends Dt{get _name(){return"limit"}get _optionsUtil(){return new Ze({})}constructor(e,t){W(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[kl(e,this.limit)]}}}class ah extends Dt{get _name(){return"offset"}get _optionsUtil(){return new Ze({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[kl(e,this.offset)]}}}class DD extends Dt{get _name(){return"select"}get _optionsUtil(){return new Ze({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[$s(e,this.selections)]}}_readUserData(e){super._readUserData(e),Vn(this.selections,e)}}class Xl extends Dt{get _name(){return"sort"}get _optionsUtil(){return new Ze({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),Vn(this.orderings,e)}}class Zl extends Dt{get _name(){return"replace_with"}get _optionsUtil(){return new Ze({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),If(Zl.Pr)]}}_readUserData(e){super._readUserData(e),Vn(this.map,e)}}Zl.Pr="full_replace";function Vn(n,e){return cD(n)?n._readUserData(e):Array.isArray(n)?n.forEach(t=>t._readUserData(e)):n instanceof Map?n.forEach(t=>t._readUserData(e)):Object.values(n).forEach(t=>t._readUserData(e)),n}// Copyright 2024 Google LLC* @license
class w{constructor(e,t){this.type=e,this.value=t}static dr(){return new w("ERROR",void 0)}static mr(){return new w("UNSET",void 0)}static pr(){return new w("NULL",Ur)}static newValue(e){return _t(e)?new w("NULL",Ur):function(r){return!!r&&"booleanValue"in r}(e)?new w("BOOLEAN",e):Nt(e)?new w("INT",e):er(e)?new w("DOUBLE",e):function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue}(e)?new w("TIMESTAMP",e):function(r){return!!r&&"stringValue"in r}(e)?new w("STRING",e):function(r){return!!r&&"bytesValue"in r}(e)?new w("BYTES",e):e.referenceValue?new w("REFERENCE",e):e.geoPointValue?new w("GEO_POINT",e):jr(e)?new w("ARRAY",e):ca(e)?new w("VECTOR",e):rr(e)?new w("MAP",e):new w("ERROR",void 0)}gr(){return this.type==="ERROR"||this.type==="UNSET"}yr(){return this.type==="NULL"}}function Ns(n){if(!n.gr())return n.value}function zf(n){return n instanceof kn?n._expr:n}function te(n){if((n=zf(n))instanceof hi)return new wD(n);if(n instanceof Xr)return new bD(n);if(n instanceof bs)return new ID(n);if(n instanceof N){if(n.name==="add")return new AD(n);if(n.name==="subtract")return new xD(n);if(n.name==="multiply")return new RD(n);if(n.name==="divide")return new PD(n);if(n.name==="mod")return new SD(n);if(n.name==="and")return new OD(n);if(n.name==="equal")return new qD(n);if(n.name==="not_equal")return new zD(n);if(n.name==="less_than")return new $D(n);if(n.name==="less_than_or_equal")return new KD(n);if(n.name==="greater_than")return new QD(n);if(n.name==="greater_than_or_equal")return new WD(n);if(n.name==="array_concat")return new YD(n);if(n.name==="array_reverse")return new XD(n);if(n.name==="array_contains")return new ZD(n);if(n.name==="array_contains_all")return new ew(n);if(n.name==="array_contains_any")return new tw(n);if(n.name==="array_length")return new nw(n);if(n.name==="array_element")return new rw(n);if(n.name==="equal_any")return new $f(n);if(n.name==="not_equal_any")return new LD(n);if(n.name==="is_nan")return new FD(n);if(n.name==="is_not_nan")return new kD(n);if(n.name==="is_null")return new VD(n);if(n.name==="is_not_null")return new MD(n);if(n.name==="is_error")return new GD(n);if(n.name==="exists")return new UD(n);if(n.name==="not")return new qa(n);if(n.name==="or")return new ND(n);if(n.name==="xor")return new eB(n);if(n.name==="conditional")return new HD(n);if(n.name==="maximum")return new jD(n);if(n.name==="minimum")return new JD(n);if(n.name==="reverse")return new sw(n);if(n.name==="replace_first")return new iw(n);if(n.name==="replace_all")return new aw(n);if(n.name==="char_length")return new ow(n);if(n.name==="byte_length")return new lw(n);if(n.name==="like")return new Bw(n);if(n.name==="regex_contains")return new cw(n);if(n.name==="regex_match")return new uw(n);if(n.name==="string_contains")return new hw(n);if(n.name==="starts_with")return new dw(n);if(n.name==="ends_with")return new fw(n);if(n.name==="to_lower")return new pw(n);if(n.name==="to_upper")return new Cw(n);if(n.name==="trim")return new mw(n);if(n.name==="string_concat")return new gw(n);if(n.name==="map_get")return new Ew(n);if(n.name==="cosine_distance")return new _w(n);if(n.name==="dot_product")return new yw(n);if(n.name==="euclidean_distance")return new Dw(n);if(n.name==="vector_length")return new ww(n);if(n.name==="unix_micros_to_timestamp")return new Aw(n);if(n.name==="timestamp_to_unix_micros")return new Pw(n);if(n.name==="unix_millis_to_timestamp")return new xw(n);if(n.name==="timestamp_to_unix_millis")return new Sw(n);if(n.name==="unix_seconds_to_timestamp")return new Rw(n);if(n.name==="timestamp_to_unix_seconds")return new Ow(n);if(n.name==="timestamp_add")return new Nw(n);if(n.name==="timestamp_subtract")return new Lw(n)}throw new Error(`Unknown Expr : ${n}`)}class wD{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Mr)return w.newValue({referenceValue:ga(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return w.newValue({timestampValue:Xi(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return w.newValue({timestampValue:Xi(e.serializer,t.createTime)});const r=t.data.field(this.expr._fieldPath);return r?Ra(r)?w.newValue(function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Xi(i.serializer,se.fromTimestamp(Gr(a)))};if(i.serverTimestampBehavior==="previous"){const l=li(a);if(l)return l}return{nullValue:"NULL_VALUE"}}(e,r)):w.newValue(r):w.mr()}}class bD{constructor(e){this.expr=e}evaluate(e,t){return w.newValue(this.expr._getValue())}}class ID{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.ur.map(s=>te(s).evaluate(e,t));return r.some(s=>s.gr())?w.dr():w.newValue({arrayValue:{values:r.map(s=>s.value)}})}}function Je(n){return er(n)?Number(n.doubleValue):Number(n.integerValue)}function jt(n){return BigInt(n.integerValue)}const vD=BigInt("0x7fffffffffffffff"),TD=-BigInt("0x8000000000000000");class di{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length>=2,24778);const r=te(this.expr.params[0]).evaluate(e,t),s=te(this.expr.params[1]).evaluate(e,t);let i=this.wr(r,s);for(const a of this.expr.params.slice(2)){const l=te(a).evaluate(e,t);i=this.wr(i,l)}return i}wr(e,t){if(e.gr()||t.gr())return w.dr();if(e.yr()||t.yr())return w.pr();const r=e.value,s=t.value;if(!er(r)&&!Nt(r)||!er(s)&&!Nt(s))return w.dr();if(er(r)||er(s)){const i=this.br(r,s);return i?w.newValue(i):w.dr()}if(Nt(r)&&Nt(s)){const i=this.vr(r,s);return i===void 0?w.dr():typeof i=="number"?w.newValue({doubleValue:i}):i<TD||i>vD?w.dr():w.newValue({integerValue:`${i}`})}return w.dr()}}function ln(n,e){return Fe(n)!==Fe(e)?"TYPE_MISMATCH":ft(n)||ft(e)?"NOT_EQ":_t(n)&&_t(e)?"EQ":_t(n)||_t(e)?"NULL":jr(n)&&jr(e)?function(r,s){var a,l,B;if(((a=r.values)==null?void 0:a.length)!==((l=s.values)==null?void 0:l.length))return"NOT_EQ";let i=!1;for(let c=0;c<(((B=r.values)==null?void 0:B.length)??0);c++){const h=r.values[c],f=s.values[c];switch(ln(h,f)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:ee(44609,{Sr:h,Dr:f})}}return i?"NULL":"EQ"}(n.arrayValue,e.arrayValue):ca(n)&&ca(e)||rr(n)&&rr(e)?function(r,s){const i=r.fields||{},a=s.fields||{};if(la(i)!==la(a))return"NOT_EQ";let l=!1;for(const B in i)if(i.hasOwnProperty(B)){if(a[B]===void 0)return"NOT_EQ";switch(ln(i[B],a[B])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":l=!0}}return l?"NULL":"EQ"}(n.mapValue,e.mapValue):function(r,s){return It(r,s,{o:!1,t:!0,i:!0})}(n,e)?"EQ":"NOT_EQ"}class AD extends di{vr(e,t){return jt(e)+jt(t)}br(e,t){return{doubleValue:Je(e)+Je(t)}}}class xD extends di{constructor(e){super(e),this.expr=e}vr(e,t){return jt(e)-jt(t)}br(e,t){return{doubleValue:Je(e)-Je(t)}}}class RD extends di{constructor(e){super(e),this.expr=e}vr(e,t){return jt(e)*jt(t)}br(e,t){return{doubleValue:Je(e)*Je(t)}}}class PD extends di{constructor(e){super(e),this.expr=e}vr(e,t){const r=jt(t);if(r!==BigInt(0))return jt(e)/r}br(e,t){const r=Je(t);return r===0?{doubleValue:Gs(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Je(e)/r}}}class SD extends di{constructor(e){super(e),this.expr=e}vr(e,t){const r=jt(t);if(r!==BigInt(0))return jt(e)%r}br(e,t){const r=Je(t);if(r!==0)return{doubleValue:Je(e)%r}}}class OD{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const l=te(a).evaluate(e,t);switch(l.type){case"BOOLEAN":if(!((i=l.value)!=null&&i.booleanValue))return w.newValue(He);break;case"NULL":s=!0;break;default:r=!0}}return r?w.dr():s?w.pr():w.newValue(ht)}}class qa{constructor(e){this.expr=e}evaluate(e,t){var s;W(this.expr.params.length===1,9634);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return w.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return w.pr();default:return w.dr()}}}class ND{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const l=te(a).evaluate(e,t);switch(l.type){case"BOOLEAN":if((i=l.value)!=null&&i.booleanValue)return w.newValue(ht);break;case"NULL":s=!0;break;default:r=!0}}return r?w.dr():s?w.pr():w.newValue(He)}}class eB{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const l=te(a).evaluate(e,t);switch(l.type){case"BOOLEAN":r=eB.xor(r,!!((i=l.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return w.dr()}}return s?w.pr():w.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class $f{constructor(e){this.expr=e}evaluate(e,t){var a,l;W(this.expr.params.length===2,55094);let r=!1;const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return w.dr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.dr()}if(r)return w.pr();for(const B of((l=(a=i.value)==null?void 0:a.arrayValue)==null?void 0:l.values)??[])switch(_t(s.value)&&_t(B)?"EQ":ln(s.value,B)){case"EQ":return w.newValue(ht);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:ee(44608,{value:s.value,candidate:B})}return r?w.pr():w.newValue(He)}}class LD{constructor(e){this.expr=e}evaluate(e,t){return new qa(new N("not",[new N("equal_any",this.expr.params)])).evaluate(e,t)}}class FD{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===1,23322);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return w.newValue(He);case"DOUBLE":return w.newValue({booleanValue:isNaN(Je(r.value))});case"NULL":return w.pr();default:return w.dr()}}}class kD{constructor(e){this.expr=e}evaluate(e,t){return W(this.expr.params.length===1,50406),new qa(new N("not",[new N("is_nan",this.expr.params)])).evaluate(e,t)}}class VD{constructor(e){this.expr=e}evaluate(e,t){switch(W(this.expr.params.length===1,23123),te(this.expr.params[0]).evaluate(e,t).type){case"NULL":return w.newValue(ht);case"UNSET":case"ERROR":return w.dr();default:return w.newValue(He)}}}class MD{constructor(e){this.expr=e}evaluate(e,t){return W(this.expr.params.length===1,23167),new qa(new N("not",[new N("is_null",this.expr.params)])).evaluate(e,t)}}class GD{constructor(e){this.expr=e}evaluate(e,t){return W(this.expr.params.length===1,5228),te(this.expr.params[0]).evaluate(e,t).type==="ERROR"?w.newValue(ht):w.newValue(He)}}class UD{constructor(e){this.expr=e}evaluate(e,t){switch(W(this.expr.params.length===1,6877),te(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return w.dr();case"UNSET":return w.newValue(He);default:return w.newValue(ht)}}}class HD{constructor(e){this.expr=e}evaluate(e,t){var s;W(this.expr.params.length===3,11706);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?te(this.expr.params[1]).evaluate(e,t):te(this.expr.params[2]).evaluate(e,t);case"NULL":return te(this.expr.params[2]).evaluate(e,t);default:return w.dr()}}}class jD{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(i=>te(i).evaluate(e,t));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||dt(i.value,s.value)>0?i:s}return s===void 0?w.pr():s}}class JD{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(i=>te(i).evaluate(e,t));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||dt(i.value,s.value)<0?i:s}return s===void 0?w.pr():s}}class Zr{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return w.dr()}const s=te(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return w.dr()}return this.Cr(r,s)}}class qD extends Zr{constructor(e){super(e),this.expr=e}Cr(e,t){if(e.yr()&&t.yr())return w.newValue(ht);if(e.yr()||t.yr()||ft(e.value)||ft(t.value)||Fe(e.value)!==Fe(t.value))return w.newValue(He);switch(ln(e.value,t.value)){case"EQ":return w.newValue(ht);case"NOT_EQ":return w.newValue(He);case"NULL":return w.pr();default:ee(44615,{left:e,right:t})}}}class zD extends Zr{constructor(e){super(e),this.expr=e}Cr(e,t){switch(ln(e.value,t.value)){case"EQ":return w.newValue(He);case"NOT_EQ":case"TYPE_MISMATCH":return w.newValue(ht);case"NULL":return w.pr();default:ee(44614,{left:e,right:t})}}}class $D extends Zr{constructor(e){super(e),this.expr=e}Cr(e,t){return Fe(e.value)!==Fe(t.value)||ft(e.value)||ft(t.value)?w.newValue(He):w.newValue({booleanValue:dt(e.value,t.value)<0})}}class KD extends Zr{constructor(e){super(e),this.expr=e}Cr(e,t){return Fe(e.value)!==Fe(t.value)||ft(e.value)||ft(t.value)?w.newValue(He):ln(e.value,t.value)==="EQ"?w.newValue(ht):w.newValue({booleanValue:dt(e.value,t.value)<0})}}class QD extends Zr{constructor(e){super(e),this.expr=e}Cr(e,t){return Fe(e.value)!==Fe(t.value)||ft(e.value)||ft(t.value)?w.newValue(He):w.newValue({booleanValue:dt(e.value,t.value)>0})}}class WD extends Zr{constructor(e){super(e),this.expr=e}Cr(e,t){return Fe(e.value)!==Fe(t.value)||ft(e.value)||ft(t.value)?w.newValue(He):ln(e.value,t.value)==="EQ"?w.newValue(ht):w.newValue({booleanValue:dt(e.value,t.value)>0})}}class YD{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class XD{constructor(e){this.expr=e}evaluate(e,t){var s;W(this.expr.params.length===1,216);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return w.pr();case"ARRAY":{const i=((s=r.value.arrayValue)==null?void 0:s.values)??[];return w.newValue({arrayValue:{values:[...i].reverse()}})}default:return w.dr()}}}class ZD{constructor(e){this.expr=e}evaluate(e,t){return W(this.expr.params.length===2,52884),new $f(new N("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class ew{constructor(e){this.expr=e}evaluate(e,t){var B,c,h,f;W(this.expr.params.length===2,1392);let r=!1;const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.dr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.dr()}if(r)return w.pr();const a=((c=(B=i.value)==null?void 0:B.arrayValue)==null?void 0:c.values)??[],l=((f=(h=s.value)==null?void 0:h.arrayValue)==null?void 0:f.values)??[];for(const C of a){let D=!1;r=!1;for(const A of l){switch(_t(C)&&_t(A)?"EQ":ln(C,A)){case"EQ":D=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:ee(44613,{value:A,search:C})}if(D)break}if(!D)return w.newValue(He)}return w.newValue(ht)}}class tw{constructor(e){this.expr=e}evaluate(e,t){var B,c,h,f;W(this.expr.params.length===2,2680);let r=!1;const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.dr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.dr()}if(r)return w.pr();const a=((c=(B=i.value)==null?void 0:B.arrayValue)==null?void 0:c.values)??[],l=((f=(h=s.value)==null?void 0:h.arrayValue)==null?void 0:f.values)??[];for(const C of l)for(const D of a)switch(_t(C)&&_t(D)?"EQ":ln(C,D)){case"EQ":return w.newValue(ht);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:ee(60403,{value:C,search:D})}return r?w.pr():w.newValue(He)}}class nw{constructor(e){this.expr=e}evaluate(e,t){var s,i,a;W(this.expr.params.length===1,38605);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return w.pr();case"ARRAY":return w.newValue({integerValue:`${((a=(i=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:a.length)??0}`});default:return w.dr()}}}class rw{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class sw{constructor(e){this.expr=e}evaluate(e,t){var s,i;W(this.expr.params.length===1,1508);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return w.pr();case"BYTES":{const a=(s=r.value)==null?void 0:s.bytesValue;if(typeof a=="string"){const l=Le.fromBase64String(a).toUint8Array();return l.reverse(),w.newValue({bytesValue:Le.fromUint8Array(l).toBase64()})}return w.newValue({bytesValue:new Uint8Array(a).reverse()})}case"STRING":{const a=(i=r.value)==null?void 0:i.stringValue,l=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(a),B=Array.from(l,c=>c.segment).reverse();return w.newValue({stringValue:B.join("")})}default:return w.dr()}}}class iw{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class aw{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class ow{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===1,19400);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return w.pr();case"STRING":{const s=function(a){let l=0;for(let B=0;B<a.length;B++){const c=a.codePointAt(B);if(c===void 0)return;if(c<=65535)if(c>=55296&&c<=57343)if(c<=56319){const h=a.codePointAt(B+1);h!==void 0&&h>=56320&&h<=57343?(l+=1,B++):l+=1}else l+=1;else l+=1;else{if(!(c<=1114111))return;l+=1,B++}}return l}(r.value.stringValue);return s===void 0?w.dr():w.newValue({integerValue:s})}default:return w.dr()}}}class lw{constructor(e){this.expr=e}evaluate(e,t){var s,i;W(this.expr.params.length===1,8486);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{const a=(s=r.value)==null?void 0:s.bytesValue;return typeof a=="string"?w.newValue({integerValue:Le.fromBase64String(a).toUint8Array().length}):w.newValue({integerValue:new Uint8Array(a).length})}case"STRING":{const a=function(B){let c=0;for(let h=0;h<B.length;h++){const f=B.codePointAt(h);if(f===void 0)return;if(f>=55296&&f<=57343){if(!(f<=56319))return;{const C=B.codePointAt(h+1);if(C===void 0||!(C>=56320&&C<=57343))return;c+=4,h++}}else if(f<=127)c+=1;else if(f<=2047)c+=2;else if(f<=65535)c+=3;else{if(!(f<=1114111))return;c+=4,h++}}return c}((i=r.value)==null?void 0:i.stringValue);return a===void 0?w.dr():w.newValue({integerValue:a})}case"NULL":return w.pr();default:return w.dr()}}}class es{constructor(e){this.expr=e}evaluate(e,t){var a,l;W(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return w.dr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return w.dr()}return r?w.pr():this.Fr((a=s.value)==null?void 0:a.stringValue,(l=i.value)==null?void 0:l.stringValue)}}class Bw extends es{Fr(e,t){try{const r=function(a){let l="";for(let B=0;B<a.length;B++){const c=a.charAt(B);switch(c){case"_":l+=".";break;case"%":l+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":l+="\\"+c;break;default:l+=c}}return"^"+l+"$"}(t),s=Pl.compile(r);return w.newValue({booleanValue:s.matches(e)})}catch(r){return Rt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),w.dr()}}}class cw extends es{Fr(e,t){try{const r=Pl.compile(t);return w.newValue({booleanValue:r.test(e)})}catch{return Rt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),w.dr()}}}class uw extends es{Fr(e,t){try{return w.newValue({booleanValue:Pl.compile(t).matches(e)})}catch{return Rt(`Invalid regex pattern found in regex_match: ${t}, returning error`),w.dr()}}}class hw extends es{Fr(e,t){return w.newValue({booleanValue:e.includes(t)})}}class dw extends es{Fr(e,t){return w.newValue({booleanValue:e.startsWith(t)})}}class fw extends es{Fr(e,t){return w.newValue({booleanValue:e.endsWith(t)})}}class pw{constructor(e){this.expr=e}evaluate(e,t){var s,i;W(this.expr.params.length===1,29079);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return w.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return w.pr();default:return w.dr()}}}class Cw{constructor(e){this.expr=e}evaluate(e,t){var s,i;W(this.expr.params.length===1,60487);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return w.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return w.pr();default:return w.dr()}}}class mw{constructor(e){this.expr=e}evaluate(e,t){var s,i;W(this.expr.params.length===1,28544);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return w.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return w.pr();default:return w.dr()}}}class gw{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(a=>te(a).evaluate(e,t));let s="",i=!1;for(const a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return w.dr()}return i?w.pr():w.newValue({stringValue:s})}}class Ew{constructor(e){this.expr=e}evaluate(e,t){var a,l,B,c;W(this.expr.params.length===2,4483);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return w.mr();case"MAP":break;default:return w.dr()}const s=te(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return w.dr();const i=(c=(l=(a=r.value)==null?void 0:a.mapValue)==null?void 0:l.fields)==null?void 0:c[(B=s.value)==null?void 0:B.stringValue];return i===void 0?w.mr():w.newValue(i)}}class tB{constructor(e){this.expr=e}evaluate(e,t){var c,h;W(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return w.dr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return w.dr()}if(r)return w.pr();const a=tl(s.value),l=tl(i.value);if(a===void 0||l===void 0||((c=a.values)==null?void 0:c.length)!==((h=l.values)==null?void 0:h.length))return w.dr();const B=this.Or(a,l);return B===void 0||isNaN(B)?w.dr():w.newValue({doubleValue:B})}}class _w extends tB{Or(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return;let i=0,a=0,l=0;for(let c=0;c<r.length;c++){if(!Ln(r[c])||!Ln(s[c]))return;const h=Je(r[c]),f=Je(s[c]);i+=h*f,a+=h*h,l+=f*f}const B=Math.sqrt(a)*Math.sqrt(l);if(B!==0)return 1-Math.max(-1,Math.min(1,i/B))}}class yw extends tB{Or(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!Ln(r[a])||!Ln(s[a]))return;i+=Je(r[a])*Je(s[a])}return i}}class Dw extends tB{Or(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!Ln(r[a])||!Ln(s[a]))return;const l=Je(r[a]),B=Je(s[a]);i+=Math.pow(l-B,2)}return Math.sqrt(i)}}class ww{constructor(e){this.expr=e}evaluate(e,t){var s;W(this.expr.params.length===1,39044);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const i=tl(r.value);return w.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return w.pr();default:return w.dr()}}}const Ws=BigInt(-62135596800),Ys=BigInt(253402300799),_a=BigInt(1e3),Rn=BigInt(1e6),bw=Ws*_a,Iw=Ys*_a+BigInt(999),vw=Ws*Rn,Tw=Ys*Rn+BigInt(999999);function nB(n){return n>=vw&&n<=Tw}function Kf(n){return n>=Ws&&n<=Ys}function Xs(n,e){const t=BigInt(n);return!(t<Ws||t>Ys)&&!(e<0||e>=1e9)&&(t!==Ws||e===0)&&!(t===Ys&&e>999999999)}function Qf(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function rB(n){return BigInt(n.seconds)*Rn+BigInt(Math.trunc(n.nanoseconds/1e3))}class sB{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return w.pr();default:return w.dr()}}}class Aw extends sB{toTimestamp(e){if(!nB(e))return w.dr();let t=Number(e/Rn),r=Number(e%Rn*BigInt(1e3));const s=Qf(t,r);return t=s.seconds,r=s.nanos,Xs(t,r)?w.newValue({timestampValue:{seconds:t,nanos:r}}):w.dr()}}class xw extends sB{toTimestamp(e){if(!function(a){return a>=bw&&a<=Iw}(e))return w.dr();let t=Number(e/_a),r=Number(e%_a*BigInt(1e6));const s=Qf(t,r);return t=s.seconds,r=s.nanos,Xs(t,r)?w.newValue({timestampValue:{seconds:t,nanos:r}}):w.dr()}}class Rw extends sB{toTimestamp(e){if(!Kf(e))return w.dr();const t=Number(e);return w.newValue({timestampValue:{seconds:t,nanos:0}})}}class iB{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return w.pr();default:return w.dr()}const s=jl(r.value.timestampValue);return Xs(s.seconds,s.nanoseconds)?this.Mr(s):w.dr()}}class Pw extends iB{Mr(e){const t=rB(e);return nB(t)?w.newValue({integerValue:`${t.toString()}`}):w.dr()}}class Sw extends iB{Mr(e){const t=rB(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?w.newValue({integerValue:r.toString()}):w.newValue({integerValue:(r-BigInt(1)).toString()})}}class Ow extends iB{Mr(e){const t=BigInt(e.seconds);return Kf(t)?w.newValue({integerValue:t.toString()}):w.dr()}}class Wf{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return w.dr()}const i=te(this.expr.params[1]).evaluate(e,t);let a;switch(i.type){case"STRING":if(a=function(K){switch(K){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(i.value.stringValue),a===void 0)return w.dr();break;case"NULL":r=!0;break;default:return w.dr()}const l=te(this.expr.params[2]).evaluate(e,t);switch(l.type){case"INT":break;case"NULL":r=!0;break;default:return w.dr()}if(r)return w.pr();const B=BigInt(l.value.integerValue);let c;try{switch(a){case"microsecond":c=B;break;case"millisecond":c=B*BigInt(1e3);break;case"second":c=B*BigInt(1e6);break;case"minute":c=B*BigInt(6e7);break;case"hour":c=B*BigInt(36e8);break;case"day":c=B*BigInt(864e8);break;default:return w.dr()}if(a!=="microsecond"&&B!==BigInt(0)&&c/B!==BigInt(this.Nr(a)))return w.dr()}catch(z){return Rt(`Error during timestamp arithmetic: ${z}`),w.dr()}const h=jl(s.value.timestampValue);if(!Xs(h.seconds,h.nanoseconds))return w.dr();const f=rB(h),C=this.Lr(f,c);if(!nB(C))return w.dr();const D=Number(C/Rn),A=C%Rn,L=Number((A<0?A+Rn:A)*BigInt(1e3)),M=A<0?D-1:D;return Xs(M,L)?w.newValue({timestampValue:{seconds:M,nanos:L}}):w.dr()}Nr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class Nw extends Wf{Lr(e,t){return e+t}}class Lw extends Wf{Lr(e,t){return e-t}}// Copyright 2024 Google LLC* @license
class Bt{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return za(this)}getPipelineCollectionGroup(){return aB(this)}getPipelineCollectionId(){return Fw(this)}getPipelineDocuments(){return ll(this)}getPipelineFlavor(){return function(t){let r="exact";return t.stages.forEach((s,i)=>{s._name!==qf.name&&s._name!==Jf.name||(r="keyless"),s._name===DD.name&&r==="exact"&&(r="augmented"),s._name===jf.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")}),r}(this)}getPipelineSourceType(){return Pn(this)}}function Pn(n){const e=n.stages[0];return e instanceof ja||e instanceof Ja||e instanceof Ql||e instanceof Wl?e._name:"unknown"}function za(n){if(Pn(n)==="collection")return n.stages[0].Er}function aB(n){if(Pn(n)==="collection_group")return n.stages[0].collectionId}function Fw(n){switch(Pn(n)){case"collection":return me.fromString(za(n)).lastSegment();case"collection_group":return aB(n);default:return}}function ll(n){if(Pn(n)==="documents")return n.stages[0].hr}function Zs(n){if((n=zf(n))instanceof hi)return`fld(${n.fieldName})`;if(n instanceof Xr)return`cst(${function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof Re?`ref(${t.path})`:t instanceof ut?`vec(${JSON.stringify(t)})`:JSON.stringify(t)}(n.value)})`;if(n instanceof N)return`fn(${n.name},[${n.params.map(Zs).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.ur.map(Zs).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function kw(n){if(n instanceof jf)return`${n._name}(${Hi(n.fields)})`;if(n instanceof Jf){let e=`${n._name}(${Hi(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${Hi(n.groups)})`),e}if(n instanceof qf)return`${n._name}(${Hi(n.groups)})`;if(n instanceof ja)return`${n._name}(${n.Er})`;if(n instanceof Ja)return`${n._name}(${n.collectionId})`;if(n instanceof Ql)return`${n._name}()`;if(n instanceof Wl)return`${n._name}(${n.hr.sort()})`;if(n instanceof Yl)return`${n._name}(${Zs(n.condition)})`;if(n instanceof Qs)return`${n._name}(${n.limit})`;if(n instanceof Xl)return`${n._name}(${function(t){return t.map(r=>`${Zs(r.expr)}${r.direction}`).join(",")}(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Hi(n){return`${Array.from(n.entries()).sort().map(([e,t])=>`${e}=${Zs(t)}`).join(",")}`}function nn(n){return n.stages.map(e=>kw(e)).join("|")}function Yf(n,e){return nn(n)===nn(e)}function Me(n){return n instanceof Bt}function oh(n){return Me(n)?nn(n):Ss(n)}function Xf(n){return Me(n)?nn(n):function(t){return`${lf(Mt(t))}|lt:${t.limitType}`}(n)}function $a(n,e){return n instanceof Bt&&e instanceof Bt?Yf(n,e):!(n instanceof Bt&&!(e instanceof Bt)||!(n instanceof Bt)&&e instanceof Bt)&&ey(n,e)}function Zf(n){return Xn(n)?nn(n):lf(n)}function ep(n,e){return n instanceof Bt&&e instanceof Bt?Yf(n,e):!(n instanceof Bt&&!(e instanceof Bt)||!(n instanceof Bt)&&e instanceof Bt)&&Bf(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&N_(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Rs(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Rs(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=ff();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const B=Zd(a,l);B!==null&&r.set(s.key,B),a.isValidDocument()||a.convertToNoDocument(se.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),le())}isEqual(e){return this.batchId===e.batchId&&Vr(this.mutations,e.mutations,(t,r)=>ku(t,r))&&Vr(this.baseMutations,e.baseMutations,(t,r)=>ku(t,r))}}class oB{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){W(e.mutations.length===r.length,58842,{Br:e.mutations.length,Ur:r.length});let s=function(){return iy}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new oB(e,t,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tp="";function Mw(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=lh(e)),e=Gw(n.get(t),e);return lh(e)}function Gw(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case tp:t+="";break;default:t+=i}}return t}function lh(n){return n+tp+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t,r,s,i=se.min(),a=se.min(),l=Le.EMPTY_BYTE_STRING,B=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=B}withSequenceNumber(e){return new en(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new en(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new en(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new en(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e){this.qr=e}}function jw(n){const e=Dy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?rl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(){this.Yi=new qw}addToCollectionParentIndex(e,t){return this.Yi.add(t),F.resolve()}getCollectionParents(e,t){return F.resolve(this.Yi.getEntries(t))}addFieldIndex(e,t){return F.resolve()}deleteFieldIndex(e,t){return F.resolve()}deleteAllFieldIndexes(e){return F.resolve()}createTargetIndexes(e,t){return F.resolve()}getDocumentsMatchingTarget(e,t){return F.resolve(null)}getIndexType(e,t){return F.resolve(0)}getFieldIndexes(e,t){return F.resolve([])}getNextCollectionGroupToUpdate(e){return F.resolve(null)}getMinOffset(e,t){return F.resolve(Fn.min())}getMinOffsetFromCollectionGroup(e,t){return F.resolve(Fn.min())}updateCollectionGroup(e,t,r){return F.resolve()}updateIndexEntries(e,t){return F.resolve()}}class qw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ne(me.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ne(me.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e){this.gs=e}next(){return this.gs+=2,this.gs}static ys(){return new Mn(0)}static ws(){return new Mn(-1)}}// Copyright 2024 Google LLC* @license
function np(n,e){var r;let t=e;for(const s of n.stages)t=$w({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,t);return t}function Ka(n,e){return np(n,[e]).length>0}function zw(n,e){return Me(n)?Ka(n,e):Fa(n,e)}function $w(n,e,t){if(e instanceof ja)return function(s,i,a){return a.filter(l=>l.isFoundDocument()&&`/${l.key.getCollectionPath().canonicalString()}`===i.Er)}(0,e,t);if(e instanceof Yl)return function(s,i,a){return a.filter(l=>{const B=Ns(te(i.condition).evaluate(s,l));return B!==void 0&&It(B,ht)})}(n,e,t);if(e instanceof Ja)return function(s,i,a){return a.filter(l=>l.isFoundDocument()&&l.key.getCollectionPath().lastSegment()===i.collectionId)}(0,e,t);if(e instanceof Ql)return function(s,i,a){return a.filter(l=>l.isFoundDocument())}(0,0,t);if(e instanceof Wl)return function(s,i,a){return a.filter(l=>l.isFoundDocument()&&i.Tr.has(l.key.path.toStringWithLeadingSlash()))}(0,e,t);if(e instanceof Qs)return function(s,i,a){return a.slice(0,i.limit)}(0,e,t);if(e instanceof Xl)return function(s,i,a){const l=i.orderings.map(B=>({Os:te(B.expr),direction:B.direction}));return[...a].sort((B,c)=>{for(const{Os:h,direction:f}of l){const C=Ns(h.evaluate(s,B)),D=Ns(h.evaluate(s,c)),A=dt(C??Ur,D??Ur);if(A!==0)return f==="ascending"?A:-A}return 0})}(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Bl(n){const e=function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof Xl)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(n);return(t,r)=>{for(const s of e){const i=Ns(te(s.expr).evaluate({serializer:n.serializer},t)),a=Ns(te(s.expr).evaluate({serializer:n.serializer},r)),l=dt(i||Ur,a||Ur);if(l!==0)return s.direction==="ascending"?l:-l}return 0}}function ko(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof Qs)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(){this.changes=new fr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,We.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?F.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Rs(r.mutation,s,Et.empty(),Ie.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,le()).next(()=>r))}getLocalViewOfDocuments(e,t,r=le()){const s=In();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Tr();return i.forEach((l,B)=>{a=a.insert(l,B.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=In();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,le()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=ct();const a=Os(),l=function(){return Os()}();return t.forEach((B,c)=>{const h=r.get(c.key);s.has(c.key)&&(h===void 0||h.mutation instanceof jn)?i=i.insert(c.key,c):h!==void 0?(a.set(c.key,h.mutation.getFieldMask()),Rs(h.mutation,c,h.mutation.getFieldMask(),Ie.now())):a.set(c.key,Et.empty())}),this.recalculateAndSaveOverlays(e,i).next(B=>(B.forEach((c,h)=>a.set(c,h)),t.forEach((c,h)=>l.set(c,new Qw(h,a.get(c)??null))),l))}recalculateAndSaveOverlays(e,t){const r=Os();let s=new ve((a,l)=>a-l),i=le();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(B=>{const c=t.get(B);if(c===null)return;let h=r.get(B)||Et.empty();h=l.applyToLocalView(c,h),r.set(B,h);const f=(s.get(l.batchId)||le()).add(B);s=s.insert(l.batchId,f)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const B=l.getNext(),c=B.key,h=B.value,f=ff();h.forEach(C=>{if(!i.has(C)){const D=Zd(t.get(C),r.get(C));D!==null&&f.set(C,D),i=i.add(C)}}),a.push(this.documentOverlayCache.saveOverlays(e,c,f))}return F.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return Me(t)?this.getDocumentsMatchingPipeline(e,t,r,s):Y_(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):X_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):F.resolve(In());let l=zs,B=i;return a.next(c=>F.forEach(c,(h,f)=>(l<f.largestBatchId&&(l=f.largestBatchId),i.get(h)?F.resolve():this.remoteDocumentCache.getEntry(e,h).next(C=>{B=B.insert(h,C)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,B,c,le())).next(h=>({batchId:l,changes:df(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Z(t)).next(r=>{let s=Tr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Tr();return this.indexManager.getCollectionParents(e,i).next(l=>F.forEach(l,B=>{const c=function(f,C){return new La(C,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(t,B.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,r,s).next(h=>{h.forEach((f,C)=>{a=a.insert(f,C)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>this.retrieveMatchingLocalDocuments(i,a,l=>Fa(t,l)))}getDocumentsMatchingPipeline(e,t,r,s){if(Pn(t)==="collection_group"){const i=aB(t);let a=Tr();return this.indexManager.getCollectionParents(e,i).next(l=>F.forEach(l,B=>{const c=function(f,C){const D=f.stages.map(A=>A instanceof Ja?new ja(C.canonicalString(),{}):A);return new Bt(f.serializer,D)}(t,B.child(i));return this.getDocumentsMatchingPipeline(e,c,r,s).next(h=>{h.forEach((f,C)=>{a=a.insert(f,C)})})}).next(()=>a))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next(a=>{switch(i=a,Pn(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let l=le();for(const B of ll(t))l=l.add(Z.fromPath(B));return this.remoteDocumentCache.getEntries(e,l);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new Q("invalid-argument",`Invalid pipeline source to execute offline: ${nn(t)}`)}}).next(a=>this.retrieveMatchingLocalDocuments(i,a,l=>Ka(t,l)))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach((i,a)=>{const l=a.getKey();t.get(l)===null&&(t=t.insert(l,We.newInvalidDocument(l)))});let s=Tr();return t.forEach((i,a)=>{const l=e.get(i);l!==void 0&&Rs(l.mutation,a,Et.empty(),Ie.now()),r(a)&&(s=s.insert(i,a))}),s}getOverlaysForPipeline(e,t,r){switch(Pn(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,me.fromString(za(t)),r);case"collection_group":throw new Q("invalid-argument",`Unexpected collection group pipeline: ${nn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,ll(t).map(s=>Z.fromPath(s)));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new Q("invalid-argument",`Failed to get overlays for pipeline: ${nn(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(e){this.serializer=e,this.Ks=new Map,this.Ws=new Map}getBundleMetadata(e,t){return F.resolve(this.Ks.get(t))}saveBundleMetadata(e,t){return this.Ks.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Gt(s.createTime)}}(t)),F.resolve()}getNamedQuery(e,t){return F.resolve(this.Ws.get(t))}saveNamedQuery(e,t){return this.Ws.set(t.name,function(s){return{name:s.name,query:jw(s.bundledQuery),readTime:Gt(s.readTime)}}(t)),F.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(){this.overlays=new ve(Z.comparator),this.Qs=new Map}getOverlay(e,t){return F.resolve(this.overlays.get(t))}getOverlays(e,t){const r=In();return F.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}getAllOverlays(e,t){const r=In();return this.overlays.forEach((s,i)=>{i.largestBatchId>t&&r.set(s,i)}),F.resolve(r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Yr(e,t,i)}),F.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Qs.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Qs.delete(r)),F.resolve()}getOverlaysForCollection(e,t,r){const s=In(),i=t.length+1,a=new Z(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const B=l.getNext().value,c=B.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===i&&B.largestBatchId>r&&s.set(B.getKey(),B)}return F.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ve((c,h)=>c-h);const a=this.overlays.getIterator();for(;a.hasNext();){const c=a.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>r){let h=i.get(c.largestBatchId);h===null&&(h=In(),i=i.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const l=In(),B=i.getIterator();for(;B.hasNext()&&(B.getNext().value.forEach((c,h)=>l.set(c,h)),!(l.size()>=s)););return F.resolve(l)}Yr(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Qs.get(s.largestBatchId).delete(r.key);this.Qs.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Uw(t,r));let i=this.Qs.get(t);i===void 0&&(i=le(),this.Qs.set(t,i)),this.Qs.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(){this.sessionToken=Le.EMPTY_BYTE_STRING}getSessionToken(e){return F.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lB{constructor(){this.Gs=new Ne(Ue.zs),this.js=new Ne(Ue.Hs)}isEmpty(){return this.Gs.isEmpty()}addReference(e,t){const r=new Ue(e,t);this.Gs=this.Gs.add(r),this.js=this.js.add(r)}Js(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ys(new Ue(e,t))}Zs(e,t){e.forEach(r=>this.removeReference(r,t))}Xs(e){const t=new Z(new me([])),r=new Ue(t,e),s=new Ue(t,e+1),i=[];return this.js.forEachInRange([r,s],a=>{this.Ys(a),i.push(a.key)}),i}e_(){this.Gs.forEach(e=>this.Ys(e))}Ys(e){this.Gs=this.Gs.delete(e),this.js=this.js.delete(e)}t_(e){const t=new Z(new me([])),r=new Ue(t,e),s=new Ue(t,e+1);let i=le();return this.js.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Ue(e,0),r=this.Gs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ue{constructor(e,t){this.key=e,this.n_=t}static zs(e,t){return Z.comparator(e.key,t.key)||ce(e.n_,t.n_)}static Hs(e,t){return ce(e.n_,t.n_)||Z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Qr=1,this.r_=new Ne(Ue.zs)}checkEmpty(e){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Qr;this.Qr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Vw(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.r_=this.r_.add(new Ue(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return F.resolve(a)}lookupMutationBatch(e,t){return F.resolve(this.i_(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.s_(r),i=s<0?0:s;return F.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?Ll:this.Qr-1)}getAllMutationBatches(e){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ue(t,0),s=new Ue(t,Number.POSITIVE_INFINITY),i=[];return this.r_.forEachInRange([r,s],a=>{const l=this.i_(a.n_);i.push(l)}),F.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ne(ce);return t.forEach(s=>{const i=new Ue(s,0),a=new Ue(s,Number.POSITIVE_INFINITY);this.r_.forEachInRange([i,a],l=>{r=r.add(l.n_)})}),F.resolve(this.__(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;Z.isDocumentKey(i)||(i=i.child(""));const a=new Ue(new Z(i),0);let l=new Ne(ce);return this.r_.forEachWhile(B=>{const c=B.key.path;return!!r.isPrefixOf(c)&&(c.length===s&&(l=l.add(B.n_)),!0)},a),F.resolve(this.__(l))}__(e){const t=[];return e.forEach(r=>{const s=this.i_(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){W(this.o_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.r_;return F.forEach(t.mutations,s=>{const i=new Ue(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.r_=r})}jr(e){}containsKey(e,t){const r=new Ue(t,0),s=this.r_.firstAfterOrEqual(r);return F.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,F.resolve()}o_(e,t){return this.s_(e)}s_(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}i_(e){const t=this.s_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e){this.a_=e,this.docs=function(){return new ve(Z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.a_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return F.resolve(r?r.document.mutableCopy():We.newInvalidDocument(t))}getEntries(e,t){let r=ct();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():We.newInvalidDocument(s))}),F.resolve(r)}getAllEntries(e){let t=ct();return this.docs.forEach((r,s)=>{t=t.insert(r,s.document)}),F.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,a;Me(t)?(i=me.fromString(za(t)),a=h=>Ka(t,h)):(i=t.path,a=h=>Fa(t,h));let l=ct();const B=new Z(i.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(B);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!i.isPrefixOf(h.path))break;h.path.length>i.length+1||K_($_(f),r)<=0||(s.has(f.key)||a(f))&&(l=l.insert(f.key,f.mutableCopy()))}return F.resolve(l)}getAllFromCollectionGroup(e,t,r,s){ee(9500)}u_(e,t){return F.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new nb(this)}getSize(e){return F.resolve(this.size)}}class nb extends Kw{constructor(e){super(),this.qs=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.qs.addEntry(e,s)):this.qs.removeEntry(r)}),F.waitFor(t)}getFromCache(e,t){return this.qs.getEntry(e,t)}getAllFromCache(e,t){return this.qs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e){this.persistence=e,this.c_=new fr(t=>Zf(t),ep),this.lastRemoteSnapshotVersion=se.min(),this.highestTargetId=0,this.l_=0,this.E_=new lB,this.targetCount=0,this.h_=Mn.ys()}forEachTarget(e,t){return this.c_.forEach((r,s)=>t(s)),F.resolve()}getLastRemoteSnapshotVersion(e){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return F.resolve(this.l_)}allocateTargetId(e){return this.highestTargetId=this.h_.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.l_&&(this.l_=t),F.resolve()}Ss(e){this.c_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.h_=new Mn(t),this.highestTargetId=t),e.sequenceNumber>this.l_&&(this.l_=e.sequenceNumber)}addTargetData(e,t){return this.Ss(t),this.targetCount+=1,F.resolve()}updateTargetData(e,t){return this.Ss(t),F.resolve()}removeTargetData(e,t){return this.c_.delete(t.target),this.E_.Xs(t.targetId),this.targetCount-=1,F.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.c_.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.c_.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),F.waitFor(i).next(()=>s)}getTargetCount(e){return F.resolve(this.targetCount)}getTargetData(e,t){const r=this.c_.get(t)||null;return F.resolve(r)}addMatchingKeys(e,t,r){return this.E_.Js(t,r),F.resolve()}removeMatchingKeys(e,t,r){this.E_.Zs(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),F.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.E_.Xs(t),F.resolve()}getMatchingKeysForTargetId(e,t){const r=this.E_.t_(t);return F.resolve(r)}containsKey(e,t){return F.resolve(this.E_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e,t){this.T_={},this.overlays={},this.P_=new Ma(0),this.R_=!1,this.R_=!0,this.I_=new Zw,this.referenceDelegate=e(this),this.A_=new rb(this),this.indexManager=new Jw,this.remoteDocumentCache=function(s){return new tb(s)}(r=>this.referenceDelegate.V_(r)),this.serializer=new Hw(t),this.d_=new Yw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.R_=!1,Promise.resolve()}get started(){return this.R_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Xw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.T_[e.toKey()];return r||(r=new eb(t,this.referenceDelegate),this.T_[e.toKey()]=r),r}getGlobalsCache(){return this.I_}getTargetCache(){return this.A_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.d_}runTransaction(e,t,r){q("MemoryPersistence","Starting transaction:",e);const s=new sb(this.P_.next());return this.referenceDelegate.f_(),r(s).next(i=>this.referenceDelegate.m_(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}p_(e,t){return F.or(Object.values(this.T_).map(r=>()=>r.containsKey(e,t)))}}class sb extends Qy{constructor(e){super(),this.currentSequenceNumber=e}}class BB{constructor(e){this.persistence=e,this.g_=new lB,this.y_=null}static w_(e){return new BB(e)}get b_(){if(this.y_)return this.y_;throw ee(60996)}addReference(e,t,r){return this.g_.addReference(r,t),this.b_.delete(r.toString()),F.resolve()}removeReference(e,t,r){return this.g_.removeReference(r,t),this.b_.add(r.toString()),F.resolve()}markPotentiallyOrphaned(e,t){return this.b_.add(t.toString()),F.resolve()}removeTarget(e,t){this.g_.Xs(t.targetId).forEach(s=>this.b_.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.b_.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}f_(){this.y_=new Set}m_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.b_,r=>{const s=Z.fromPath(r);return this.v_(e,s).next(i=>{i||t.removeEntry(s,se.min())})}).next(()=>(this.y_=null,t.apply(e)))}updateLimboDocument(e,t){return this.v_(e,t).next(r=>{r?this.b_.delete(t.toString()):this.b_.add(t.toString())})}V_(e){return 0}v_(e,t){return F.or([()=>F.resolve(this.g_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.p_(e,t)])}}class ya{constructor(e,t){this.persistence=e,this.S_=new fr(r=>Mw(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=tD(this,t)}static w_(e,t){return new ya(e,t)}f_(){}m_(e){return F.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}rr(e){const t=this.xs(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}xs(e){let t=0;return this.ir(e,r=>{t++}).next(()=>t)}ir(e,t){return F.forEach(this.S_,(r,s)=>this.Fs(e,r,s).next(i=>i?F.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.u_(e,a=>this.Fs(e,a,t).next(l=>{l||(r++,i.removeEntry(a,se.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.S_.set(t,e.currentSequenceNumber),F.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.S_.set(r,e.currentSequenceNumber),F.resolve()}removeReference(e,t,r){return this.S_.set(r,e.currentSequenceNumber),F.resolve()}updateLimboDocument(e,t){return this.S_.set(t,e.currentSequenceNumber),F.resolve()}V_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Qi(e.data.value)),t}Fs(e,t,r){return F.or([()=>this.persistence.p_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.S_.get(t);return F.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cB{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ao=r,this.Vo=s}static fo(e,t){let r=le(),s=le();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new cB(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ib(n,e){return Z.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ab{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ob{constructor(){this.mo=!1,this.po=!1,this.yo=100,this.wo=function(){return TC()?8:Wy(Ye())>0?6:4}()}initialize(e,t){this.bo=e,this.indexManager=t,this.mo=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.vo(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.So(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new ab;return this.Do(e,t,a).next(l=>{if(i.result=l,this.po)return this.xo(e,t,a,l.size)})}).next(()=>i.result)}xo(e,t,r,s){return Me(t)?F.resolve():r.documentReadCount<this.yo?(Ir()<=ue.DEBUG&&q("QueryEngine","SDK will not create cache indexes for query:",Ss(t),"since it only creates cache indexes for collection contains","more than or equal to",this.yo,"documents"),F.resolve()):(Ir()<=ue.DEBUG&&q("QueryEngine","Query:",Ss(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.wo*s?(Ir()<=ue.DEBUG&&q("QueryEngine","The SDK decides to create cache indexes for query:",Ss(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Mt(t))):F.resolve())}vo(e,t){if(Me(t))return F.resolve(null);let r=t;if(ju(r))return F.resolve(null);let s=Mt(r);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(r.limit!==null&&i===1&&(r=rl(r,null,"F"),s=Mt(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next(a=>{const l=le(...a);return this.bo.getDocuments(e,l).next(B=>this.indexManager.getMinOffset(e,s).next(c=>{const h=this.Co(r,B);return this.Fo(r,h,l,c.readTime)?this.vo(e,rl(r,null,"F")):this.Oo(e,h,r,c)}))})))}So(e,t,r,s){return(Me(t)?function(a){for(const l of a.stages){if(l instanceof Qs||l instanceof ah)return!1;if(l instanceof Yl){if(l.condition instanceof Gf&&l.condition._expr.name==="exists"&&l.condition._expr.params[0]instanceof hi&&l.condition._expr.params[0].fieldName===Mr)continue;return!1}}return!0}(t):ju(t))||s.isEqual(se.min())?F.resolve(null):this.bo.getDocuments(e,r).next(i=>{const a=this.Co(t,i);return this.Fo(t,a,r,s)?F.resolve(null):(Ir()<=ue.DEBUG&&q("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),oh(t)),this.Oo(e,a,t,z_(s,zs)).next(l=>l))})}Co(e,t){let r,s;return Me(e)?(r=new Ne(ib),s=i=>Ka(e,i)):(r=new Ne(Ul(e)),s=i=>Fa(e,i)),t.forEach((i,a)=>{s(a)&&(r=r.add(a))}),r}Fo(e,t,r,s){if(Me(e))return function(l){return l.stages.some(B=>B instanceof Qs||B instanceof ah)}(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Do(e,t,r){return Ir()<=ue.DEBUG&&q("QueryEngine","Using full collection scan to execute query:",oh(t)),this.bo.getDocumentsMatchingQuery(e,t,Fn.min(),r)}Oo(e,t,r,s){return this.bo.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uB="LocalStore",lb=3e8;class Bb{constructor(e,t,r,s){this.persistence=e,this.Mo=t,this.serializer=s,this.No=new ve(ce),this.Lo=new fr(i=>Zf(i),ep),this.Bo=new Map,this.Uo=e.getRemoteDocumentCache(),this.A_=e.getTargetCache(),this.d_=e.getBundleCache(),this.ko(r)}ko(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ww(this.Uo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Uo.setIndexManager(this.indexManager),this.Mo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.No))}}function cb(n,e,t,r){return new Bb(n,e,t,r)}async function sp(n,e){const t=ae(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.ko(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let B=le();for(const c of s){a.push(c.batchId);for(const h of c.mutations)B=B.add(h.key)}for(const c of i){l.push(c.batchId);for(const h of c.mutations)B=B.add(h.key)}return t.localDocuments.getDocuments(r,B).next(c=>({qo:c,removedBatchIds:a,addedBatchIds:l}))})})}function ub(n,e){const t=ae(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Uo.newChangeBuffer({trackRemovals:!0});return function(l,B,c,h){const f=c.batch,C=f.keys();let D=F.resolve();return C.forEach(A=>{D=D.next(()=>h.getEntry(B,A)).next(L=>{const M=c.docVersions.get(A);W(M!==null,48541),L.version.compareTo(M)<0&&(f.applyToRemoteDocument(L,c),L.isValidDocument()&&(L.setReadTime(c.commitVersion),h.addEntry(L)))})}),D.next(()=>l.mutationQueue.removeMutationBatch(B,f))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let B=le();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(B=B.add(l.batch.mutations[c].key));return B}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function ip(n){const e=ae(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.A_.getLastRemoteSnapshotVersion(t))}function hb(n,e){const t=ae(n),r=e.snapshotVersion;let s=t.No;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Uo.newChangeBuffer({trackRemovals:!0});s=t.No;const l=[];e.targetChanges.forEach((h,f)=>{const C=s.get(f);if(!C)return;l.push(t.A_.removeMatchingKeys(i,h.removedDocuments,f).next(()=>t.A_.addMatchingKeys(i,h.addedDocuments,f)));let D=C.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?D=D.withResumeToken(Le.EMPTY_BYTE_STRING,se.min()).withLastLimboFreeSnapshotVersion(se.min()):h.resumeToken.approximateByteSize()>0&&(D=D.withResumeToken(h.resumeToken,r)),s=s.insert(f,D),function(L,M,z){return L.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-L.snapshotVersion.toMicroseconds()>=lb?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(C,D,h)&&l.push(t.A_.updateTargetData(i,D))});let B=ct(),c=le();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,h))}),l.push(db(i,a,e.documentUpdates).next(h=>{B=h.$o,c=h.Ko})),!r.isEqual(se.min())){const h=t.A_.getLastRemoteSnapshotVersion(i).next(f=>t.A_.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(h)}return F.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,B,c)).next(()=>B)}).then(i=>(t.No=s,i))}function db(n,e,t){let r=le(),s=le();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=ct();return t.forEach((l,B)=>{const c=i.get(l);B.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(l)),B.isNoDocument()&&B.version.isEqual(se.min())?(e.removeEntry(l,B.readTime),a=a.insert(l,B)):!c.isValidDocument()||B.version.compareTo(c.version)>0||B.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(B),a=a.insert(l,B)):q(uB,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",B.version)}),{$o:a,Ko:s}})}function fb(n,e){const t=ae(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Ll),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function pb(n,e){const t=ae(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.A_.getTargetData(r,e).next(i=>i?(s=i,F.resolve(s)):t.A_.allocateTargetId(r).next(a=>(s=new en(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.A_.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.No.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.No=t.No.insert(r.targetId,r),t.Lo.set(e,r.targetId)),r})}async function cl(n,e,t){const r=ae(n),s=r.No.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Yr(a))throw a;q(uB,`Failed to update sequence numbers for target ${e}: ${a}`)}r.No=r.No.remove(e),r.Lo.delete(s.target)}function Bh(n,e,t){const r=ae(n);let s=se.min(),i=le();return r.persistence.runTransaction("Execute query","readwrite",a=>function(B,c,h){const f=ae(B),C=f.Lo.get(h);return C!==void 0?F.resolve(f.No.get(C)):f.A_.getTargetData(c,h)}(r,a,Me(e)?e:Mt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.A_.getMatchingKeysForTargetId(a,l.targetId).next(B=>{i=B})}).next(()=>r.Mo.getDocumentsMatchingQuery(a,e,t?s:se.min(),t?i:le())).next(l=>(Cb(r,l),{documents:l,Wo:i})))}function Cb(n,e){e.forEach((t,r)=>{const s=r.key.getCollectionGroup(),i=n.Bo.get(s)||se.min();r.readTime.compareTo(i)>0&&n.Bo.set(s,r.readTime)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Jo=0,this.Yo=null,this.Zo=!0}Xo(){this.Jo===0&&(this.ea("Unknown"),this.Yo=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Yo=null,this.ta("Backend didn't respond within 10 seconds."),this.ea("Offline"),Promise.resolve())))}na(e){this.state==="Online"?this.ea("Unknown"):(this.Jo++,this.Jo>=1&&(this.ra(),this.ta(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ea("Offline")))}set(e){this.ra(),this.Jo=0,e==="Online"&&(this.Zo=!1),this.ea(e)}ea(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ta(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Zo?(on(t),this.Zo=!1):q("OnlineStateTracker",t)}ra(){this.Yo!==null&&(this.Yo.cancel(),this.Yo=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="RemoteStore";class gb{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.ia=[],this.sa=new Map,this._a=new Map,this.oa=new Map,this.aa=new Mn(1e3),this.ua=new Mn(1001),this.ca=new Set,this.la=[],this.Ea=i,this.Ea.Ke(a=>{r.enqueueAndForget(async()=>{Cr(this)&&(q(Jt,"Restarting streams for network reachability change."),await async function(B){const c=ae(B);c.ca.add(4),await fi(c),c.ha.set("Unknown"),c.ca.delete(4),await Qa(c)}(this))})}),this.ha=new mb(r,s)}}async function Qa(n){if(Cr(n))for(const e of n.la)await e(!0)}async function fi(n){for(const e of n.la)await e(!1)}function ul(n,e){return n._a.get(e)||void 0}function ap(n,e){const t=ae(n),r=ul(t,e.targetId);if(r!==void 0&&t.sa.has(r))return;const s=function(l,B){const c=ul(l,B);c!==void 0&&l.oa.delete(c);const h=function(C,D){return D%2!=0?C.ua.next():C.aa.next()}(l,B);return l._a.set(B,h),l.oa.set(h,B),h}(t,e.targetId);q(Jt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new en(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.sa.set(s,i),pB(t)?fB(t):ts(t).Jt()&&dB(t,i)}function hB(n,e){const t=ae(n),r=ts(t),s=ul(t,e);q(Jt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.sa.delete(s),t._a.delete(e),t.oa.delete(s),r.Jt()&&op(t,s),t.sa.size===0&&(r.Jt()?r.Xt():Cr(t)&&t.ha.set("Unknown"))}function dB(n,e){if(n.Ta.H(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(se.min())>0){const t=n.oa.get(e.targetId);if(t===void 0)return void q(Jt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}ts(n).Tn(e)}function op(n,e){n.Ta.H(e),ts(n).Pn(e)}function fB(n){n.Ta=new uy({getRemoteKeysForTarget:e=>{const t=n.oa.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):le()},ge:e=>n.sa.get(e)||null,Ae:()=>n.datastore.serializer.databaseId}),ts(n).start(),n.ha.Xo()}function pB(n){return Cr(n)&&!ts(n).Ht()&&n.sa.size>0}function Cr(n){return ae(n).ca.size===0}function lp(n){n.Ta=void 0}async function Eb(n){n.ha.set("Online")}async function _b(n){n.sa.forEach((e,t)=>{dB(n,e)})}async function yb(n,e){lp(n),pB(n)?(n.ha.na(e),fB(n)):n.ha.set("Unknown")}async function Db(n,e,t){if(n.ha.set("Online"),e instanceof Cf&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds){if(s.sa.has(l)){const B=s.oa.get(l);B!==void 0&&(await s.remoteSyncer.rejectListen(B,a),s._a.delete(B),s.oa.delete(l)),s.sa.delete(l)}s.Ta.removeTarget(l)}}(n,e)}catch(r){q(Jt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Da(n,r)}else if(e instanceof Yi?n.Ta.se(e):e instanceof pf?n.Ta.Ee(e):n.Ta.ae(e),!t.isEqual(se.min()))try{const r=await ip(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Ta.de(a);l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=i.sa.get(h);f&&i.sa.set(h,f.withResumeToken(c.resumeToken,a))}}),l.targetMismatches.forEach((c,h)=>{const f=i.sa.get(c);if(!f)return;i.sa.set(c,f.withResumeToken(Le.EMPTY_BYTE_STRING,f.snapshotVersion)),op(i,c);const C=new en(f.target,c,h,f.sequenceNumber);dB(i,C)});const B=function(h,f){const C=new Map;f.targetChanges.forEach((A,L)=>{const M=h.oa.get(L);M!==void 0&&C.set(M,A)});let D=new ve(ce);return f.targetMismatches.forEach((A,L)=>{const M=h.oa.get(A);M!==void 0&&(D=D.insert(M,L))}),new ci(f.snapshotVersion,C,D,f.documentUpdates,f.augmentedDocumentUpdates,f.resolvedLimboDocuments)}(i,l);return i.remoteSyncer.applyRemoteEvent(B)}(n,t)}catch(r){q(Jt,"Failed to raise snapshot:",r),await Da(n,r)}}async function Da(n,e,t){if(!Yr(e))throw e;n.ca.add(1),await fi(n),n.ha.set("Offline"),t||(t=()=>ip(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{q(Jt,"Retrying IndexedDB access"),await t(),n.ca.delete(1),await Qa(n)})}function Bp(n,e){return e().catch(t=>Da(n,t,e))}async function Wa(n){const e=ae(n),t=Gn(e);let r=e.ia.length>0?e.ia[e.ia.length-1].batchId:Ll;for(;wb(e);)try{const s=await fb(e.localStore,r);if(s===null){e.ia.length===0&&t.Xt();break}r=s.batchId,bb(e,s)}catch(s){await Da(e,s)}cp(e)&&up(e)}function wb(n){return Cr(n)&&n.ia.length<10}function bb(n,e){n.ia.push(e);const t=Gn(n);t.Jt()&&t.Rn&&t.In(e.mutations)}function cp(n){return Cr(n)&&!Gn(n).Ht()&&n.ia.length>0}function up(n){Gn(n).start()}async function Ib(n){Gn(n).dn()}async function vb(n){const e=Gn(n);for(const t of n.ia)e.In(t.mutations)}async function Tb(n,e,t){const r=n.ia.shift(),s=oB.from(r,e,t);await Bp(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Wa(n)}async function Ab(n,e){e&&Gn(n).Rn&&await async function(r,s){if(function(a){return ry(a)&&a!==V.ABORTED}(s.code)){const i=r.ia.shift();Gn(r).Zt(),await Bp(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Wa(r)}}(n,e),cp(n)&&up(n)}async function ch(n,e){const t=ae(n);t.asyncQueue.verifyOperationInProgress(),q(Jt,"RemoteStore received new credentials");const r=Cr(t);t.ca.add(3),await fi(t),r&&t.ha.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.ca.delete(3),await Qa(t)}async function xb(n,e){const t=ae(n);e?(t.ca.delete(2),await Qa(t)):e||(t.ca.add(2),await fi(t),t.ha.set("Unknown"))}function ts(n){return n.Pa||(n.Pa=function(t,r,s){const i=ae(t);return i.mn(),new Uy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{ut:Eb.bind(null,n),lt:_b.bind(null,n),ht:yb.bind(null,n),hn:Db.bind(null,n)}),n.la.push(async e=>{e?(n.Pa.Zt(),pB(n)?fB(n):n.ha.set("Unknown")):(await n.Pa.stop(),lp(n))})),n.Pa}function Gn(n){return n.Ra||(n.Ra=function(t,r,s){const i=ae(t);return i.mn(),new Hy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{ut:()=>Promise.resolve(),lt:Ib.bind(null,n),ht:Ab.bind(null,n),An:vb.bind(null,n),Vn:Tb.bind(null,n)}),n.la.push(async e=>{e?(n.Ra.Zt(),await Wa(n)):(await n.Ra.stop(),n.ia.length>0&&(q(Jt,`Stopping write stream with ${n.ia.length} pending writes`),n.ia=[]))})),n.Ra}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rb{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ia(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ia(this.observer.error,e):on("Uncaught Error in snapshot listener:",e.toString()))}Aa(){this.muted=!0}Ia(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CB{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new sr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new CB(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Q(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function mB(n,e){if(on("AsyncQueue",`${e}: ${n}`),Yr(n))return new Q(V.UNAVAILABLE,`${e}: ${n}`);throw n}class uh{constructor(){this.activeTargetIds=ly()}La(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ba(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Na(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Pb{constructor(){this.du=new uh,this.fu={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.du.La(e),this.fu[e]||"not-current"}updateQueryState(e,t,r){this.fu[e]=t}removeLocalQueryTarget(e){this.du.Ba(e)}isLocalQueryTarget(e){return this.du.activeTargetIds.has(e)}clearQueryState(e){delete this.fu[e]}getAllActiveQueryTargets(){return this.du.activeTargetIds}isActiveQueryTarget(e){return this.du.activeTargetIds.has(e)}start(){return this.du=new uh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function Vo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{static emptySet(e){return new ir(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||Z.comparator(t.key,r.key):(t,r)=>Z.comparator(t.key,r.key),this.keyedMap=Tr(),this.sortedSet=new ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ir)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new ir;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(){this.mu=new ve(Z.comparator)}track(e){const t=e.doc.key,r=this.mu.get(t);r?e.type!==0&&r.type===3?this.mu=this.mu.insert(t,e):e.type===3&&r.type!==1?this.mu=this.mu.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.mu=this.mu.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.mu=this.mu.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.mu=this.mu.remove(t):e.type===1&&r.type===2?this.mu=this.mu.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.mu=this.mu.insert(t,{type:2,doc:e.doc}):ee(63341,{ye:e,pu:r}):this.mu=this.mu.insert(t,e)}gu(){const e=[];return this.mu.inorderTraversal((t,r)=>{e.push(r)}),e}}class qr{constructor(e,t,r,s,i,a,l,B,c){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=B,this.hasCachedResults=c}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new qr(e,t,ir.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$a(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sb{constructor(){this.yu=void 0,this.wu=[]}bu(){return this.wu.some(e=>e.vu())}}class Ob{constructor(){this.queries=dh(),this.onlineState="Unknown",this.Su=new Set}terminate(){(function(t,r){const s=ae(t),i=s.queries;s.queries=dh(),i.forEach((a,l)=>{for(const B of l.wu)B.onError(r)})})(this,new Q(V.ABORTED,"Firestore shutting down"))}}function dh(){return new fr(n=>Xf(n),$a)}async function Nb(n,e){const t=ae(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.bu()&&e.vu()&&(r=2):(i=new Sb,r=e.vu()?0:1);try{switch(r){case 0:i.yu=await t.onListen(s,!0);break;case 1:i.yu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=mB(a,`Initialization of query '${Me(e.query)?nn(e.query):Ss(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.wu.push(e),e.Du(t.onlineState),i.yu&&e.xu(i.yu)&&gB(t)}async function Lb(n,e){const t=ae(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.wu.indexOf(e);a>=0&&(i.wu.splice(a,1),i.wu.length===0?s=e.vu()?0:1:!i.bu()&&e.vu()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Fb(n,e){const t=ae(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.wu)l.xu(s)&&(r=!0);a.yu=s}}r&&gB(t)}function kb(n,e,t){const r=ae(n),s=r.queries.get(e);if(s)for(const i of s.wu)i.onError(t);r.queries.delete(e)}function gB(n){n.Su.forEach(e=>{e.next()})}var hl;(function(n){n.Default="default",n.Cache="cache"})(hl||(hl={}));class Vb{constructor(e,t,r){this.query=e,this.Cu=t,this.Fu=!1,this.Ou=null,this.onlineState="Unknown",this.options=r||{}}xu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new qr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Fu?this.Mu(e)&&(this.Cu.next(e),t=!0):this.Nu(e,this.onlineState)&&(this.Lu(e),t=!0),this.Ou=e,t}onError(e){this.Cu.error(e)}Du(e){this.onlineState=e;let t=!1;return this.Ou&&!this.Fu&&this.Nu(this.Ou,e)&&(this.Lu(this.Ou),t=!0),t}Nu(e,t){if(!e.fromCache||!this.vu())return!0;const r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Mu(e){if(e.docChanges.length>0)return!0;const t=this.Ou&&this.Ou.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Lu(e){e=qr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Cu.next(e)}vu(){return this.options.source!==hl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(e){this.key=e}}class dp{constructor(e){this.key=e}}class Mb{constructor(e,t){this.query=e,this.Gu=t,this.zu=null,this.hasCachedResults=!1,this.current=!1,this.ju=le(),this.mutatedKeys=le(),this.Hu=Me(e)?Bl(e):Ul(e),this.Ju=new ir(this.Hu)}get Yu(){return this.Gu}Zu(e,t){const r=t?t.Xu:new hh,s=t?t.Ju:this.Ju;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const[B,c]=this.ec(this.query,s);e.inorderTraversal((f,C)=>{const D=s.get(f),A=zw(this.query,C)?C:null,L=!!D&&this.mutatedKeys.has(D.key),M=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let z=!1;D&&A?D.data.isEqual(A.data)?L!==M&&(r.track({type:3,doc:A}),z=!0):this.tc(D,A)||(r.track({type:2,doc:A}),z=!0,(B&&this.Hu(A,B)>0||c&&this.Hu(A,c)<0)&&(l=!0)):!D&&A?(r.track({type:0,doc:A}),z=!0):D&&!A&&(r.track({type:1,doc:D}),z=!0,(B||c)&&(l=!0)),z&&(A?(a=a.add(A),i=M?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))});const h=this.nc(this.query);if(h)if(Me(this.query)){const f=[];a.forEach(A=>f.push(A));const C=np(this.query,f);let D=new ir(Bl(this.query));for(const A of C)D=D.add(A);a.forEach(A=>{D.has(A.key)||(i=i.delete(A.key),r.track({type:1,doc:A}))}),a=D}else{const f=this.rc(this.query);for(;a.size>h;){const C=f==="F"?a.last():a.first();a=a.delete(C.key),i=i.delete(C.key),r.track({type:1,doc:C})}}return{Ju:a,Xu:r,Fo:l,mutatedKeys:i}}nc(e){var t;return Me(e)?(t=ko(e))==null?void 0:t.limit:e.limit||void 0}rc(e){if(Me(e)){const t=ko(e);return t&&t.limit<0?"L":"F"}return e.limitType}ec(e,t){var r;if(Me(e)){const s=(r=ko(e))==null?void 0:r.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.nc(this.query)?t.last():null,e.limitType==="L"&&t.size===this.nc(this.query)?t.first():null]}tc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Ju;this.Ju=e.Ju,this.mutatedKeys=e.mutatedKeys;const a=e.Xu.gu();a.sort((h,f)=>function(D,A){const L=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee(20277,{ye:M})}};return L(D)-L(A)}(h.type,f.type)||this.Hu(h.doc,f.doc)),this.sc(r),s=s??!1;const l=t&&!s?this._c():[],B=this.ju.size===0&&this.current&&!s?1:0,c=B!==this.zu;return this.zu=B,a.length!==0||c?{snapshot:new qr(this.query,e.Ju,i,a,e.mutatedKeys,B===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),oc:l}:{oc:l}}Du(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ju:this.Ju,Xu:new hh,mutatedKeys:this.mutatedKeys,Fo:!1},!1)):{oc:[]}}ac(e){return!this.Gu.has(e)&&!!this.Ju.has(e)&&!this.Ju.get(e).hasLocalMutations}sc(e){e&&(e.addedDocuments.forEach(t=>this.Gu=this.Gu.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Gu=this.Gu.delete(t)),this.current=e.current)}_c(){if(!this.current)return[];const e=this.ju;this.ju=le(),this.Ju.forEach(r=>{this.ac(r.key)&&(this.ju=this.ju.add(r.key))});const t=[];return e.forEach(r=>{this.ju.has(r)||t.push(new dp(r))}),this.ju.forEach(r=>{e.has(r)||t.push(new hp(r))}),t}uc(e){this.Gu=e.Wo,this.ju=le();const t=this.Zu(e.documents);return this.applyChanges(t,!0)}cc(){return qr.fromInitialDocuments(this.query,this.Ju,this.mutatedKeys,this.zu===0,this.hasCachedResults)}}const EB="SyncEngine";class Gb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Ub{constructor(e){this.key=e,this.lc=!1}}class Hb{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ec={},this.hc=new fr(l=>Xf(l),$a),this.Tc=new Map,this.Pc=new Set,this.Rc=new ve(Z.comparator),this.Ic=new Map,this.Ac=new lB,this.Vc={},this.dc=new Map,this.fc=Mn.ws(),this.onlineState="Unknown",this.mc=void 0}get isPrimaryClient(){return this.mc===!0}}async function jb(n,e,t=!0){const r=Ep(n);let s;const i=r.hc.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cc()):s=await fp(r,e,t,!0),s}async function Jb(n,e){const t=Ep(n);await fp(t,e,!0,!1)}async function fp(n,e,t,r){const s=await pb(n.localStore,Me(e)?e:Mt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await qb(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&ap(n.remoteStore,s),l}async function qb(n,e,t,r,s){n.gc=(f,C,D)=>async function(L,M,z,K){let ne=M.view.Zu(z);ne.Fo&&(ne=await Bh(L.localStore,M.query,!1).then(({documents:I})=>M.view.Zu(I,ne)));const ie=K&&K.targetChanges.get(M.targetId),Be=K&&K.targetMismatches.get(M.targetId)!=null,he=M.view.applyChanges(ne,L.isPrimaryClient,ie,Be);return ph(L,M.targetId,he.oc),he.snapshot}(n,f,C,D);const i=await Bh(n.localStore,e,!0),a=new Mb(e,i.Wo),l=a.Zu(i.documents),B=ui.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),c=a.applyChanges(l,n.isPrimaryClient,B);ph(n,t,c.oc);const h=new Gb(e,t,a);return n.hc.set(e,h),n.Tc.has(t)?n.Tc.get(t).push(e):n.Tc.set(t,[e]),c.snapshot}async function zb(n,e,t){const r=ae(n),s=r.hc.get(e),i=r.Tc.get(s.targetId);if(i.length>1)return r.Tc.set(s.targetId,i.filter(a=>!$a(a,e))),void r.hc.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await cl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&hB(r.remoteStore,s.targetId),dl(r,s.targetId)}).catch(Wr)):(dl(r,s.targetId),await cl(r.localStore,s.targetId,!0))}async function $b(n,e){const t=ae(n),r=t.hc.get(e),s=t.Tc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),hB(t.remoteStore,r.targetId))}async function Kb(n,e,t){const r=tI(n);try{const s=await function(a,l){const B=ae(a),c=Ie.now(),h=l.reduce((D,A)=>D.add(A.key),le());let f,C;return B.persistence.runTransaction("Locally write mutations","readwrite",D=>{let A=ct(),L=le();return B.Uo.getEntries(D,h).next(M=>{A=M,A.forEach((z,K)=>{K.isValidDocument()||(L=L.add(z))})}).next(()=>B.localDocuments.getOverlayedDocuments(D,A)).next(M=>{f=M;const z=[];for(const K of l){const ne=L_(K,f.get(K.key).overlayedDocument);ne!=null&&z.push(new jn(K.key,ne,Kd(ne.value.mapValue),xt.exists(!0)))}return B.mutationQueue.addMutationBatch(D,c,z,l)}).next(M=>{C=M;const z=M.applyToLocalDocumentSet(f,L);return B.documentOverlayCache.saveOverlays(D,M.batchId,z)})}).then(()=>({batchId:C.batchId,changes:df(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,B){let c=a.Vc[a.currentUser.toKey()];c||(c=new ve(ce)),c=c.insert(l,B),a.Vc[a.currentUser.toKey()]=c}(r,s.batchId,t),await pi(r,s.changes),await Wa(r.remoteStore)}catch(s){const i=mB(s,"Failed to persist write");t.reject(i)}}async function pp(n,e){const t=ae(n);try{const r=await hb(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Ic.get(i);a&&(W(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lc=!0:s.modifiedDocuments.size>0?W(a.lc,14607):s.removedDocuments.size>0&&(W(a.lc,42227),a.lc=!1))}),await pi(t,r,e)}catch(r){await Wr(r)}}function fh(n,e,t){const r=ae(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.hc.forEach((i,a)=>{const l=a.view.Du(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const B=ae(a);B.onlineState=l;let c=!1;B.queries.forEach((h,f)=>{for(const C of f.wu)C.Du(l)&&(c=!0)}),c&&gB(B)}(r.eventManager,e),s.length&&r.Ec.hn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Qb(n,e,t){const r=ae(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ic.get(e),i=s&&s.key;if(i){let a=new ve(Z.comparator);a=a.insert(i,We.newNoDocument(i,se.min()));const l=le().add(i),B=new ci(se.min(),new Map,new ve(ce),a,ct(),l);await pp(r,B),r.Rc=r.Rc.remove(i),r.Ic.delete(e),_B(r)}else await cl(r.localStore,e,!1).then(()=>dl(r,e,t)).catch(Wr)}async function Wb(n,e){const t=ae(n),r=e.batch.batchId;try{const s=await ub(t.localStore,e);mp(t,r,null),Cp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await pi(t,s)}catch(s){await Wr(s)}}async function Yb(n,e,t){const r=ae(n);try{const s=await function(a,l){const B=ae(a);return B.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let h;return B.mutationQueue.lookupMutationBatch(c,l).next(f=>(W(f!==null,37113),h=f.keys(),B.mutationQueue.removeMutationBatch(c,f))).next(()=>B.mutationQueue.performConsistencyCheck(c)).next(()=>B.documentOverlayCache.removeOverlaysForBatchId(c,h,l)).next(()=>B.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h)).next(()=>B.localDocuments.getDocuments(c,h))})}(r.localStore,e);mp(r,e,t),Cp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await pi(r,s)}catch(s){await Wr(s)}}function Cp(n,e){(n.dc.get(e)||[]).forEach(t=>{t.resolve()}),n.dc.delete(e)}function mp(n,e,t){const r=ae(n);let s=r.Vc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vc[r.currentUser.toKey()]=s}}function dl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tc.get(e))n.hc.delete(r),t&&n.Ec.yc(r,t);n.Tc.delete(e),n.isPrimaryClient&&n.Ac.Xs(e).forEach(r=>{n.Ac.containsKey(r)||gp(n,r)})}function gp(n,e){n.Pc.delete(e.path.canonicalString());const t=n.Rc.get(e);t!==null&&(hB(n.remoteStore,t),n.Rc=n.Rc.remove(e),n.Ic.delete(t),_B(n))}function ph(n,e,t){for(const r of t)r instanceof hp?(n.Ac.addReference(r.key,e),Xb(n,r)):r instanceof dp?(q(EB,"Document no longer in limbo: "+r.key),n.Ac.removeReference(r.key,e),n.Ac.containsKey(r.key)||gp(n,r.key)):ee(19791,{wc:r})}function Xb(n,e){const t=e.key,r=t.path.canonicalString();n.Rc.get(t)||n.Pc.has(r)||(q(EB,"New document in limbo: "+t),n.Pc.add(r),_B(n))}function _B(n){for(;n.Pc.size>0&&n.Rc.size<n.maxConcurrentLimboResolutions;){const e=n.Pc.values().next().value;n.Pc.delete(e);const t=new Z(me.fromString(e)),r=n.fc.next();n.Ic.set(r,new Ub(t)),n.Rc=n.Rc.insert(t,r),ap(n.remoteStore,new en(Mt(Gl(t.path)),r,"TargetPurposeLimboResolution",Ma.yn))}}async function pi(n,e,t){const r=ae(n),s=[],i=[],a=[];r.hc.isEmpty()||(r.hc.forEach((l,B)=>{a.push(r.gc(B,e,t).then(c=>{var h;if((c||t)&&r.isPrimaryClient){const f=c?!c.fromCache:(h=t==null?void 0:t.targetChanges.get(B.targetId))==null?void 0:h.current;r.sharedClientState.updateQueryState(B.targetId,f?"current":"not-current")}if(c){s.push(c);const f=cB.fo(B.targetId,c);i.push(f)}}))}),await Promise.all(a),r.Ec.hn(s),await async function(B,c){const h=ae(B);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>F.forEach(c,C=>F.forEach(C.Ao,D=>h.persistence.referenceDelegate.addReference(f,C.targetId,D)).next(()=>F.forEach(C.Vo,D=>h.persistence.referenceDelegate.removeReference(f,C.targetId,D)))))}catch(f){if(!Yr(f))throw f;q(uB,"Failed to update sequence numbers: "+f)}for(const f of c){const C=f.targetId;if(!f.fromCache){const D=h.No.get(C),A=D.snapshotVersion,L=D.withLastLimboFreeSnapshotVersion(A);h.No=h.No.insert(C,L)}}}(r.localStore,i))}async function Zb(n,e){const t=ae(n);if(!t.currentUser.isEqual(e)){q(EB,"User change. New user:",e.toKey());const r=await sp(t.localStore,e);t.currentUser=e,function(i,a){i.dc.forEach(l=>{l.forEach(B=>{B.reject(new Q(V.CANCELLED,a))})}),i.dc.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await pi(t,r.qo)}}function eI(n,e){const t=ae(n),r=t.Ic.get(e);if(r&&r.lc)return le().add(r.key);{let s=le();const i=t.Tc.get(e);if(!i)return s;for(const a of i??[]){const l=t.hc.get(a);s=s.unionWith(l.view.Yu)}return s}}function Ep(n){const e=ae(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=pp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=eI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Qb.bind(null,e),e.Ec.hn=Fb.bind(null,e.eventManager),e.Ec.yc=kb.bind(null,e.eventManager),e}function tI(n){const e=ae(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Wb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Yb.bind(null,e),e}class wa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ka(e.databaseInfo.databaseId),this.sharedClientState=this.vc(e),this.persistence=this.Sc(e),await this.persistence.start(),this.localStore=this.Dc(e),this.gcScheduler=this.xc(e,this.localStore),this.indexBackfillerScheduler=this.Cc(e,this.localStore)}xc(e,t){return null}Cc(e,t){return null}Dc(e){return cb(this.persistence,new ob,e.initialUser,this.serializer)}Sc(e){return new rp(BB.w_,this.serializer)}vc(e){return new Pb}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wa.provider={build:()=>new wa};class nI extends wa{constructor(e){super(),this.cacheSizeBytes=e}xc(e,t){W(this.persistence.referenceDelegate instanceof ya,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Zy(r,e.asyncQueue,t)}Sc(e){const t=this.cacheSizeBytes!==void 0?lt.withCacheSize(this.cacheSizeBytes):lt.DEFAULT;return new rp(r=>ya.w_(r,t),this.serializer)}}class fl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>fh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Zb.bind(null,this.syncEngine),await xb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Ob}()}createDatastore(e){const t=ka(e.databaseInfo.databaseId),r=Gy(e.databaseInfo);return qy(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new gb(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>fh(this.syncEngine,t,0),function(){return Yu.Je()?new Yu:new Fy}())}createSyncEngine(e,t){return function(s,i,a,l,B,c,h){const f=new Hb(s,i,a,l,B,c);return h&&(f.mc=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=ae(s);q(Jt,"RemoteStore shutting down."),i.ca.add(5),await fi(i),i.Ea.shutdown(),i.ha.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}fl.provider={build:()=>new fl};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un="FirestoreClient";class rI{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Qe.UNAUTHENTICATED,this.clientId=Ol.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{q(Un,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(q(Un,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new sr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=mB(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Mo(n,e){n.asyncQueue.verifyOperationInProgress(),q(Un,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await sp(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Ch(n,e){n.asyncQueue.verifyOperationInProgress();const t=await sI(n);q(Un,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>ch(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>ch(e.remoteStore,s)),n._onlineComponents=e}async function sI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){q(Un,"Using user provided OfflineComponentProvider");try{await Mo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Rt("Error using user provided cache. Falling back to memory cache: "+t),await Mo(n,new wa)}}else q(Un,"Using default OfflineComponentProvider"),await Mo(n,new nI(void 0));return n._offlineComponents}async function _p(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(q(Un,"Using user provided OnlineComponentProvider"),await Ch(n,n._uninitializedComponentsProvider._online)):(q(Un,"Using default OnlineComponentProvider"),await Ch(n,new fl))),n._onlineComponents}function iI(n){return _p(n).then(e=>e.syncEngine)}async function mh(n){const e=await _p(n),t=e.eventManager;return t.onListen=jb.bind(null,e.syncEngine),t.onUnlisten=zb.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Jb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=$b.bind(null,e.syncEngine),t}function aI(n,e,t,r){const s=new Rb(r),i=new Vb(e,s,t);return n.asyncQueue.enqueueAndForget(async()=>Nb(await mh(n),i)),()=>{s.Aa(),n.asyncQueue.enqueueAndForget(async()=>Lb(await mh(n),i))}}function oI(n,e){const t=new sr;return n.asyncQueue.enqueueAndForget(async()=>Kb(await iI(n),e,t)),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh="AsyncQueue";class Eh{constructor(e=Promise.resolve()){this.Wc=[],this.Qc=!1,this.Gc=[],this.zc=null,this.jc=!1,this.Hc=!1,this.Jc=[],this.jt=new Af(this,"async_queue_retry"),this.Yc=()=>{const r=Vo();r&&q(gh,"Visibility state changed to "+r.visibilityState),this.jt.qt()},this.Zc=e;const t=Vo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Yc)}get isShuttingDown(){return this.Qc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Xc(),this.el(e)}enterRestrictedMode(e){if(!this.Qc){this.Qc=!0,this.Hc=e||!1;const t=Vo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Yc)}}enqueue(e){if(this.Xc(),this.Qc)return new Promise(()=>{});const t=new sr;return this.el(()=>this.Qc&&this.Hc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Wc.push(e),this.tl()))}async tl(){if(this.Wc.length!==0){try{await this.Wc[0](),this.Wc.shift(),this.jt.reset()}catch(e){if(!Yr(e))throw e;q(gh,"Operation failed with retryable error: "+e)}this.Wc.length>0&&this.jt.Ut(()=>this.tl())}}el(e){const t=this.Zc.then(()=>(this.jc=!0,e().catch(r=>{throw this.zc=r,this.jc=!1,on("INTERNAL UNHANDLED ERROR: ",_h(r)),r}).then(r=>(this.jc=!1,r))));return this.Zc=t,t}enqueueAfterDelay(e,t,r){this.Xc(),this.Jc.indexOf(e)>-1&&(t=0);const s=CB.createAndSchedule(this,e,t,r,i=>this.nl(i));return this.Gc.push(s),s}Xc(){this.zc&&ee(47125,{rl:_h(this.zc)})}verifyOperationInProgress(){}async il(){let e;do e=this.Zc,await e;while(e!==this.Zc)}sl(e){for(const t of this.Gc)if(t.timerId===e)return!0;return!1}_l(e){return this.il().then(()=>{this.Gc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Gc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.il()})}ol(e){this.Jc.push(e)}nl(e){const t=this.Gc.indexOf(e);this.Gc.splice(t,1)}}function _h(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class zr extends Ga{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Eh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Eh(e),this._firestoreClient=void 0,await e}}}function lI(n,e){const t=typeof n=="object"?n:_l(),r=typeof n=="string"?n:Ba,s=Ta(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Vh("firestore");i&&nD(s,...i)}return s}function yp(n){if(n._terminated)throw new Q(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||BI(n),n._firestoreClient}function BI(n){var r,s,i,a;const e=n._freezeSettings(),t=$y(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new rI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(B){const c=B==null?void 0:B._online.build();return{_offline:B==null?void 0:B._offline.build(c),_online:c}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{convertValue(e,t="none"){switch(Fe(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Te(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ee(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Hn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Us].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>Te(a.doubleValue));return new ut(t)}convertGeoPoint(e){return new Ut(Te(e.latitude),Te(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=li(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Gr(e));default:return null}}convertTimestamp(e){const t=On(e);return new Ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=me.fromString(e);W(wf(r),9688,{name:e});const s=new Ms(r.get(1),r.get(3)),i=new Z(r.popFirst(5));return s.isEqual(t)||on(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp extends cI{constructor(e){super(),this.firestore=e}convertBytes(e){return new bt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}const Dh="@firebase/firestore",wh="4.17.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wp=class{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new uI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Jr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},uI=class extends wp{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new Q(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}function dI(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Is{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ar extends wp{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Zi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Jr("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Q(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ar._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ar._jsonSchemaVersion="firestore/documentSnapshot/1.0",ar._jsonSchema={type:Oe("string",ar._jsonSchemaVersion),bundleSource:Oe("string","DocumentSnapshot"),bundleName:Oe("string"),bundle:Oe("string")};class Zi extends ar{data(e={}){return super.data(e)}}class Lr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Is(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Zi(this._firestore,this._userDataWriter,r.key,r,new Is(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Q(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{Me(s._snapshot.query)?Bl(s._snapshot.query):Ul(s.query._query);const B=new Zi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Is(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:B,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const B=new Zi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Is(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,h=-1;return l.type!==0&&(c=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),h=a.indexOf(l.doc.key)),{type:fI(l.type),doc:B,oldIndex:c,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Q(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Lr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ol.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function fI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Lr._jsonSchemaVersion="firestore/querySnapshot/1.0",Lr._jsonSchema={type:Oe("string",Lr._jsonSchemaVersion),bundleSource:Oe("string","QuerySnapshot"),bundleName:Oe("string"),bundle:Oe("string")};function ns(n,e,t){n=tn(n,Re);const r=tn(n.firestore,zr),s=dI(n.converter,e),i=Nf(r);return yB(r,[aD(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,xt.none())])}function mr(n,e,t,...r){n=tn(n,Re);const s=tn(n.firestore,zr),i=Nf(s);let a;return a=typeof(e=Xe(e))=="string"||e instanceof Va?lD(i,"updateDoc",n._key,e,t,r):oD(i,"updateDoc",n._key,e),yB(s,[a.toMutation(n._key,xt.exists(!0))])}function bp(n){return yB(tn(n.firestore,zr),[new Ml(n._key,xt.none())])}function bh(n,...e){var c,h,f;n=Xe(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||yh(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(yh(e[r])){const C=e[r];e[r]=(c=C.next)==null?void 0:c.bind(C),e[r+1]=(h=C.error)==null?void 0:h.bind(C),e[r+2]=(f=C.complete)==null?void 0:f.bind(C)}let i,a,l;if(n instanceof Re)a=tn(n.firestore,zr),l=Gl(n._key.path),i={next:C=>{e[r]&&e[r](pI(a,n,C))},error:e[r+1],complete:e[r+2]};else{const C=tn(n,Ua);a=tn(C.firestore,zr),l=C._query;const D=new Dp(a);i={next:A=>{e[r]&&e[r](new Lr(a,D,C,A))},error:e[r+1],complete:e[r+2]},hI(n._query)}const B=yp(a);return aI(B,l,s,i)}function yB(n,e){const t=yp(n);return oI(t,e)}function pI(n,e,t){const r=t.docs.get(e._key),s=new Dp(n);return new ar(n,s,e._key,r,new Is(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){C_(dr),lr(new Sn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new zr(new Sy(r.getProvider("auth-internal")),new Ly(a,r.getProvider("app-check-internal")),I_(a,s),a);return i={useFetchStreams:t,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),Ft(Dh,wh,e),Ft(Dh,wh,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ip="firebasestorage.googleapis.com",CI="storageBucket",mI=2*60*1e3,gI=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends $t{constructor(e,t,r=0){super(Go(e),`Firebase Storage: ${t} (${Go(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Kt.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Go(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var qt;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(qt||(qt={}));function Go(n){return"storage/"+n}function EI(){const n="An unknown error occurred, please check the error payload for server response.";return new Kt(qt.UNKNOWN,n)}function _I(){return new Kt(qt.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function yI(){return new Kt(qt.CANCELED,"User canceled the upload/download.")}function DI(n){return new Kt(qt.INVALID_URL,"Invalid URL '"+n+"'.")}function wI(n){return new Kt(qt.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Ih(n){return new Kt(qt.INVALID_ARGUMENT,n)}function vp(){return new Kt(qt.APP_DELETED,"The Firebase app was deleted.")}function bI(n){return new Kt(qt.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=At.makeFromUrl(e,t)}catch{return new At(e,"")}if(r.path==="")return r;throw wI(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(ie){ie.path.charAt(ie.path.length-1)==="/"&&(ie.path_=ie.path_.slice(0,-1))}const a="(/(.*))?$",l=new RegExp("^gs://"+s+a,"i"),B={bucket:1,path:3};function c(ie){ie.path_=decodeURIComponent(ie.path)}const h="v[A-Za-z0-9_]+",f=t.replace(/[.]/g,"\\."),C="(/([^?#]*).*)?$",D=new RegExp(`^https?://${f}/${h}/b/${s}/o${C}`,"i"),A={bucket:1,path:3},L=t===Ip?"(?:storage.googleapis.com|storage.cloud.google.com)":t,M="([^?#]*)",z=new RegExp(`^https?://${L}/${s}/${M}`,"i"),ne=[{regex:l,indices:B,postModify:i},{regex:D,indices:A,postModify:c},{regex:z,indices:{bucket:1,path:2},postModify:c}];for(let ie=0;ie<ne.length;ie++){const Be=ne[ie],he=Be.regex.exec(e);if(he){const I=he[Be.indices.bucket];let E=he[Be.indices.path];E||(E=""),r=new At(I,E),Be.postModify(r);break}}if(r==null)throw DI(e);return r}}class II{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vI(n,e,t){let r=1,s=null,i=null,a=!1,l=0;function B(){return l===2}let c=!1;function h(...M){c||(c=!0,e.apply(null,M))}function f(M){s=setTimeout(()=>{s=null,n(D,B())},M)}function C(){i&&clearTimeout(i)}function D(M,...z){if(c){C();return}if(M){C(),h.call(null,M,...z);return}if(B()||a){C(),h.call(null,M,...z);return}r<64&&(r*=2);let ne;l===1?(l=2,ne=0):ne=(r+Math.random())*1e3,f(ne)}let A=!1;function L(M){A||(A=!0,C(),!c&&(s!==null?(M||(l=2),clearTimeout(s),f(0)):M||(l=1)))}return f(0),i=setTimeout(()=>{a=!0,L(!0)},t),L}function TI(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AI(n){return n!==void 0}function vh(n,e,t,r){if(r<e)throw Ih(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Ih(`Invalid value for '${n}'. Expected ${t} or less.`)}function xI(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var ba;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ba||(ba={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RI(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e,t,r,s,i,a,l,B,c,h,f,C=!0,D=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=l,this.errorCallback_=B,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=f,this.retry=C,this.isUsingEmulator=D,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((A,L)=>{this.resolve_=A,this.reject_=L,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new ji(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=l=>{const B=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(B,c)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const l=i.getErrorCode()===ba.NO_ERROR,B=i.getStatus();if(!l||RI(B,this.additionalRetryCodes_)&&this.retry){const h=i.getErrorCode()===ba.ABORT;r(!1,new ji(!1,null,h));return}const c=this.successCodes_.indexOf(B)!==-1;r(!0,new ji(c,i))})},t=(r,s)=>{const i=this.resolve_,a=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const B=this.callback_(l,l.getResponse());AI(B)?i(B):i()}catch(B){a(B)}else if(l!==null){const B=EI();B.serverResponse=l.getErrorText(),this.errorCallback_?a(this.errorCallback_(l,B)):a(B)}else if(s.canceled){const B=this.appDelete_?vp():yI();a(B)}else{const B=_I();a(B)}};this.canceled_?t(!1,new ji(!1,null,!0)):this.backoffId_=vI(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&TI(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ji{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function SI(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function OI(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function NI(n,e){e&&(n["X-Firebase-GMPID"]=e)}function LI(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function FI(n,e,t,r,s,i,a=!0,l=!1){const B=xI(n.urlParams),c=n.url+B,h=Object.assign({},n.headers);return NI(h,e),SI(h,t),OI(h,i),LI(h,r),new PI(c,n.method,h,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,a,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kI(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function VI(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e,t){this._service=e,t instanceof At?this._location=t:this._location=At.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Ia(e,t)}get root(){const e=new At(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return VI(this._location.path)}get storage(){return this._service}get parent(){const e=kI(this._location.path);if(e===null)return null;const t=new At(this._location.bucket,e);return new Ia(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw bI(e)}}function Th(n,e){const t=e==null?void 0:e[CI];return t==null?null:At.makeFromBucketSpec(t,n)}function MI(n,e,t,r={}){n.host=`${e}:${t}`;const s=$r(e);s&&ml(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Uh(i,n.app.options.projectId))}class GI{constructor(e,t,r,s,i,a=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=a,this._bucket=null,this._host=Ip,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=mI,this._maxUploadRetryTime=gI,this._requests=new Set,s!=null?this._bucket=At.makeFromBucketSpec(s,this._host):this._bucket=Th(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=At.makeFromBucketSpec(this._url,e):this._bucket=Th(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){vh("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){vh("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(vt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ia(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new II(vp());{const a=FI(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Ah="@firebase/storage",xh="0.14.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp="storage";function UI(n=_l(),e){n=Xe(n);const r=Ta(n,Tp).getImmediate({identifier:e}),s=Vh("storage");return s&&HI(r,...s),r}function HI(n,e,t,r={}){MI(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jI(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new GI(t,r,s,e,dr)}function JI(){lr(new Sn(Tp,jI,"PUBLIC").setMultipleInstances(!0)),Ft(Ah,xh,""),Ft(Ah,xh,"esm2020")}JI();const pl={apiKey:"AIzaSyA8lEUhNYQJA22DNTex0JRvPahqMrmapvs",authDomain:"reto-ia-prosur.firebaseapp.com",projectId:"reto-ia-prosur",storageBucket:"reto-ia-prosur.firebasestorage.app",messagingSenderId:"674667540011",appId:"1:674667540011:web:ff7724d2c7b1f43852c46e",measurementId:"G-XW3PPB719W"};function pt(){return!!(pl.apiKey&&pl.apiKey!=="YOUR_API_KEY")}const DB=Jh(pl);UE(DB);const qe=lI(DB);UI(DB);const wB="prosur_ai_showcase_state";function xe(n){return`https://ui-avatars.com/api/?name=${encodeURIComponent(n)}&background=0D9488&color=fff&bold=true`}const bB=["Grupo Chesa","Calzamoda","5 Pinos","CaFi","Grupo Prosur","Otra"],qI=[{name:"AI",company:"Grupo Chesa",department:"MANTENIMIENTO",members:"RICARDO CASTILLEJA DELGADO"},{name:"El ingeniero",company:"Calzamoda",department:"Sub Gerente",members:"120034, 121805, 121830, 121750, 121476, 121406"},{name:"IA conec",company:"Grupo Chesa",department:"Ventas",members:"Erick Jhovanny babadua cerda, Iris Velez Morales"},{name:"Impulso Inteligente",company:"Grupo Chesa",department:"BDC",members:"Angel Francisco Lievano Trejo, Iván Esaú Nájera López"},{name:"IVA Corporativa",company:"Grupo Chesa",department:"Innovación",members:"Armando Renato Ruiz Gomez, Victor Hugo Liévano Pérez"},{name:"NIRAMI",company:"Grupo Chesa",department:"CONTABILIDAD",members:"ANGEL MARIN RUIZ RUIZ, Aleida Ivan Jiménez Morales"},{name:"Prompt-actores",company:"Grupo Chesa",department:"Contabilidad",members:"Alejandro Dominguez castellanos, Angel Marin Ruiz Ruiz"},{name:"Synergy",company:"5 Pinos",department:"Construcción",members:"Mario Alberto Hernández Solís"},{name:"Arquitectos de Ideas",company:"Grupo Chesa",department:"Tesoreria",members:"Dulce Rocío Shilon Gómez, Beatriz Del Carmen Shilon Gomez, Karina Guadalupe Ruiz Martinez, Eber Alberto Lopez Torres, Luis Daniel Garcia Moreno"},{name:"Cobranza",company:"CaFi",department:"Cobranza",members:"Teresa Gomez Ruiz, Guadalupe Vazquez Maldonado, Martha De Jesus Gonzales Hernandez, Quebin Braitan Trujillo Dominguez"},{name:"Conta Comercialitas",company:"Otra",department:"Contabilidad",members:"Rosangela Lopez De La Cruz, Jaqueline Agustín González López, Daniel Arturo Morales Ton"},{name:"Expediente Digital",company:"Grupo Chesa",department:"Soporte administrativo y Expediente Digital",members:"Jonathan De Jesus Penagos Espinoza, Carlos Eduardo Garcia Villafuerte, Brayan Santiz Camaras, Uriel Duque Lara"},{name:"Foresight Innovation",company:"Grupo Chesa",department:"Gerencia General",members:"Francisco Javier Garcia Solis"},{name:"IA Corporativa",company:"Grupo Chesa",department:"Innovación",members:"Iván Esaú Nájera López, Armando Renato Ruiz Gomez"},{name:"Lead Pilot",company:"Grupo Chesa",department:"Ventas",members:"VALERIA CAROLINA CONTRERAS GÓMEZ"},{name:"Lit (legal inivation team)",company:"CaFi",department:"Jurídico",members:"Luis Roberto Ruiz Abarca, Jose Antonio Gutierrez Najera"},{name:"Los chicos que van a llorar",company:"Grupo Chesa",department:"Análisis de Datos",members:"Luis Gustavo Santiago Bonifaz, Brandon Humberto Nepomuceno Cruz, Susana Elizabeth Santiz Vazquez, Jose Armando Pinacho Lopez"},{name:"Los chicos que ya lloraron",company:"Grupo Chesa",department:"Análisis de Datos",members:"Iván Esaú Nájera López, Brandon Humberto Nepomuceno Cruz, Susana Elizabeth Santiz Vazquez, Jose Armando Pinacho Lopez, Luis Gustavo Santiago Bonifaz"},{name:"Los que perdieron",company:"Grupo Chesa",department:"MKT",members:"Marlon Octavio Giles Garcia, Giovanni Trejo Matias"},{name:"Miguel y sus teclados A.C.",company:"CaFi",department:"Auditoria",members:"Miguel Angel Martínez Gómez y Luis Fernando Hernández Gómez"},{name:"OPERACIONES",company:"CaFi",department:"OPERACIONES",members:"LUIS ENRIQUE SANTOS ENRIQUEZ, MELECIO ANTONIO RUIZ DEL CARPIO"},{name:"OpTeam",company:"Grupo Chesa",department:"Ventas",members:"Fernando De Jesús Mora Saldaña"},{name:"Victor Flores Casas",company:"5 Pinos",department:"Finanzas y proyectos estrategicos",members:"Victor Flores Casas"},{name:"RefaBot Team",company:"Grupo Chesa",department:"Refacciones",members:"Carlos de Jesús Camacho Sánchez, Jose Iván Mayorga Ruiz"},{name:"Apex GP",company:"Grupo Chesa",department:"Capacitación",members:"Weynner Joaseth Gordillo Morales, Maria Elizabeth Ovalle Islas"},{name:"Chesa tu Nassan",company:"Grupo Chesa",department:"Posventa",members:"Guadalupe del Carmen Solorzano Garcia"},{name:"El oraculo corporativo",company:"CaFi",department:"Mejora Continua",members:"Laura villafuerte y erika camacho"},{name:"El señor de los entrenamientos",company:"CaFi",department:"Contabilidad",members:"Vicente Jimenez Najera"},{name:"El Var del sandwich",company:"Otra",department:"Operación",members:"Luis Eugenio Lopez Najera, Jared Adin Lopez Cueto, Livi Orlando Mazariegos Guillen"},{name:"Enlace inteligente",company:"CaFi",department:"Riesgos",members:"Jonathan De Jesus Penagos Espinoza, Luis Fernando Trujillo Gerardo, Esteban Sanchez Huerta, Linet Anahi Pimentel Castro"},{name:"Erick Samuel Garcia Jimenez",company:"5 Pinos",department:"Talento Humano",members:"Erick Samuel Garcia Jimenez"},{name:"G&A",company:"CaFi",department:"Administración",members:"KARINA SUAREZ ALVAREZ, JUAN GONZALO CRUZ LOPEZ, RIGOBERTO IVAN MALDONADO RAMOS"},{name:"Jüptar",company:"Grupo Chesa",department:"Mejora Continua",members:"MARIO ARTURO LOPEZ GOMEZ, Ivonne Courtois"},{name:"La cazatraspasos",company:"CaFi",department:"Contabilidad",members:"Nayely del Carmen Bautista Ramirez, Vicente Jimenez Najera"},{name:"La patrulla del chip perdido",company:"CaFi",department:"Administración",members:"Stephania Hernández y Cesar Flores, Vicente Jimenez Najera"},{name:"La santa conciliación",company:"CaFi",department:"Contabilidad",members:"Elizabeth Carpio, Vicente Jimenez Najera"},{name:"LEXIA",company:"Grupo Prosur",department:"Planeación",members:"1. Juan Carlos Pérez, 2. Claudia Roxana Ruiz Ruiz, 3. Alondra Montserrat Hernandez Sanchez"},{name:"Los chicos que lloran",company:"Grupo Chesa",department:"Análisis de Datos",members:"Iván Esaú Nájera López, Brandon Humberto Nepomuceno Cruz, Susana Elizabeth Santiz Vazquez, Jose Armando Pinacho Lopez, Luis Gustavo Santiago Bonifaz"},{name:"Papeles de trabajo",company:"Grupo Prosur",department:"Contraloría",members:"1. Jose Francisco Flores Zuñiga, 2. Andrea Ricarda Velazco Trejo, 3. Maria Nicolasa Santiz Diaz, 4. Carina Alicia Santiz Lopez, 5. Guadalupe del Carmen Jimenez Najera"},{name:"Procesos",company:"Calzamoda",department:"Auditoria y Procesos",members:"Diego López Guzmán, Felipe de Jesús Paniagua Ruiz"},{name:"Reclutapower",company:"CaFi",department:"Talento Humano",members:"Jazmin Garduza Luna, Cintrya Velazquez Perez"},{name:"Smart Norm",company:"Grupo Chesa",department:"Talento Humano",members:"Richard Alonso Nataren Chacon, GIBRAN HASHMED GARCIA CRUZ, LAURA JOVANNA TRUJILLO SOLORZANO"},{name:"T-800",company:"CaFi",department:"Marketing",members:"Oswaldo Rafael Hernández Rodriguez"},{name:"Talentia 360",company:"Grupo Chesa",department:"Talento Humano",members:"MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES"},{name:"Talento Humano",company:"Grupo Chesa",department:"Recursos Humanos",members:"MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES"},{name:"Talento y Desempeño con IA",company:"Grupo Chesa",department:"Talento Humano",members:"FATIMA PENELOPE PEREZ CERON, MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES"},{name:"TEAM AMOS",company:"CaFi",department:"OPERATIVA - COMERCIAL",members:"ANGELINA ASUNCION DIAZ HERNANDEZ, MONTSERRAT SANDOVAL ZEPEDA, OSWALDO RAFAEL HERNANDEZ RODRIGUEZ, MAYRA BERENICE MONTOYA GARCIA"},{name:"TORQUE LEAD IA",company:"Grupo Chesa",department:"Ventas",members:"YAHIR IVAN LOPEZ GOMEZ"},{name:"TU GUARDIAN CAFI",company:"CaFi",department:"Prevención de fraudes",members:"Claudia Patricia Morales Gordillo, Guadalupe Alejandra Bermudez Abarca"},{name:"VocalIA",company:"Grupo Chesa",department:"Talento Humano",members:"Alejandra Jocabeth Gordillo Morales, Maria Elizabeth Ovalle Islas"},{name:"Talento IA",company:"Grupo Prosur",department:"Recursos Humanos",members:"Yazmin Mijangos Zepeda, Jose Martin Flores Gomez"}];function zI(n){return n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,".")+"@prosur.com"}const $I=qI.map((n,e)=>({id:`usr-team-${e+1}`,name:`Equipo: ${n.name}`,teamName:n.name,roleType:"participant",roleTitle:`Equipo (${n.department})`,unit:n.company,unitClass:"badge-unit-agrifood",avatar:xe(n.name),email:zI(n.name),password:"prosur2026",bio:`Integrantes: ${n.members}`,stats:{demosPublished:1,totalViews:0,totalLikes:0,collaborations:0},savedDemoIds:[],badges:["Equipo Oficial"]})),IB={isAuthenticated:!1,activeUserId:null,selectedCategory:"all",selectedUnit:"all",searchQuery:"",users:[{id:"usr-admin-carlos",name:"Carlos Barrientos",roleType:"admin",roleTitle:"Super Administrador de Plataforma",unit:"Prosur Dirección TI",unitClass:"badge-unit-tech",avatar:xe("Carlos Barrientos"),email:"carlos.barrientos@prosur.com",password:"prosuradmin2026",bio:"Super Administrador del Reto IA Prosur.",stats:{evaluationsDone:0,pendingEvaluations:0},savedDemoIds:[],badges:["Super Admin"]},{id:"usr-part-diego",name:"Diego Lopez",roleType:"participant",roleTitle:"Líder del Proyecto Reto IA",unit:"Grupo Prosur",unitClass:"badge-unit-agrifood",avatar:xe("Diego Lopez"),email:"diego.lopez@prosur.com",password:"diegolopez2026",bio:"Participante oficial del Reto de Inteligencia Artificial Prosur.",stats:{demosPublished:1,totalViews:0,totalLikes:0,collaborations:0},savedDemoIds:[],badges:["Participante Oficial"]},{id:"usr-juez-1",name:"Cristhian",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Cristhian"),email:"cristhian@prosur.com",password:"cristhian2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-2",name:"Rafael",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Rafael"),email:"rafael@prosur.com",password:"rafael2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-3",name:"Juve",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Juve"),email:"juve@prosur.com",password:"juve2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-4",name:"Angel",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Angel"),email:"angel@prosur.com",password:"angel2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-5",name:"Victor Flores",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Victor Flores"),email:"victor.flores@prosur.com",password:"victorflores2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-6",name:"Felisiano",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Felisiano"),email:"felisiano@prosur.com",password:"felisiano2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-7",name:"Enrique Calzamoda",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Enrique Calzamoda"),email:"enrique.calzamoda@prosur.com",password:"enriquecalzamoda2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-8",name:"Roberto Ortega",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Roberto Ortega"),email:"roberto.ortega@prosur.com",password:"robertoortega2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-9",name:"Antonio Mata",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Antonio Mata"),email:"antonio.mata@prosur.com",password:"antoniomata2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-10",name:"Ismael",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Ismael"),email:"ismael@prosur.com",password:"ismael2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-11",name:"Jesus",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Jesus"),email:"jesus@prosur.com",password:"jesus2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-12",name:"Victor Lievano",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Victor Lievano"),email:"victor.lievano@prosur.com",password:"victorlievano2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-13",name:"Alberto",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Alberto"),email:"alberto@prosur.com",password:"alberto2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-14",name:"Jose Luis",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Jose Luis"),email:"jose.luis@prosur.com",password:"joseluis2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-15",name:"Bernardo Mijarez",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Bernardo Mijarez"),email:"bernardo.mijarez@prosur.com",password:"bernardomijarez2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},{id:"usr-juez-16",name:"Francisco",roleType:"judge",roleTitle:"Jurado Evaluador",unit:"Comité Evaluador Prosur",unitClass:"badge-unit-tech",avatar:xe("Francisco"),email:"francisco@prosur.com",password:"francisco2026",bio:"Miembro del Jurado del Reto IA.",stats:{evaluationsDone:0,pendingEvaluations:1},savedDemoIds:[],badges:["Jurado"]},...$I],demos:[{id:1,authorId:"usr-team-40",title:"Solución de IA: Optimización de Auditoría y Procesos",subtitle:"Demo del Equipo Procesos (Calzamoda) para el Reto IA 2026.",description:"Sistema inteligente de análisis y automatización de flujos de auditoría interna.",unit:"Calzamoda",unitClass:"badge-unit-agrifood",category:"Calzamoda",problemStatement:"Demoras en la verificación manual de procesos e inventarios.",impactMetrics:"Reducción del 50% en tiempos de revisión de auditoría.",tags:["Calzamoda","Reto IA","Procesos"],author:"Equipo: Procesos",authorRole:"Equipo (Auditoria y Procesos)",authorAvatar:xe("Procesos"),views:120,likes:15,rating:0,duration:"3:00",thumbnail:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ",specs:{modelType:"Custom AI Architecture",latency:"Real-time",dataSources:"Base de datos Calzamoda",status:"En evaluación"},images:[],evaluations:[],comments:[]},{id:2,authorId:"usr-part-diego",title:"Plataforma de Inteligencia Artificial Grupo Prosur",subtitle:"Proyecto del Equipo Diego Lopez (Grupo Prosur).",description:"Innovación en inteligencia artificial para la gestión y presentación de soluciones de IA.",unit:"Grupo Prosur",unitClass:"badge-unit-pharma",category:"Grupo Prosur",problemStatement:"Centralizar y evaluar proyectos de innovación de IA en tiempo real.",impactMetrics:"100% de proyectos evaluados bajo la rúbrica oficial.",tags:["Grupo Prosur","Reto IA","Showcase"],author:"Diego Lopez",authorRole:"Líder del Proyecto Reto IA",authorAvatar:xe("Diego Lopez"),views:240,likes:42,rating:0,duration:"4:00",thumbnail:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ",specs:{modelType:"Full-Stack SPA + Firebase",latency:"<100ms",dataSources:"Firestore Cloud DB",status:"Desplegado en Producción"},images:[],evaluations:[],comments:[]}],posts:[]};function KI(){return localStorage.removeItem(wB),{...IB,currentUser:null}}const G=KI();function ze(){localStorage.setItem(wB,JSON.stringify({isAuthenticated:G.isAuthenticated,activeUserId:G.activeUserId,selectedCategory:G.selectedCategory,selectedUnit:G.selectedUnit,users:G.users,demos:G.demos,posts:G.posts}))}pt()&&(console.log("🔥 Syncing clean state with Firebase Firestore..."),bh(ih(qe,"users"),n=>{if(n.empty)QI();else{const e=[];n.forEach(t=>e.push({id:t.id,...t.data()})),G.users=e,G.activeUserId&&(G.currentUser=G.users.find(t=>t.id===G.activeUserId)||G.currentUser),ze()}}),bh(ih(qe,"demos"),n=>{if(n.empty)WI();else{const e=[];n.forEach(t=>{const r=t.data();e.push({id:isNaN(Number(t.id))?t.id:Number(t.id),...r})}),G.demos=e,ze()}}));async function QI(){for(const n of IB.users)await ns(st(qe,"users",n.id),n)}async function WI(){for(const n of IB.demos)await ns(st(qe,"demos",String(n.id)),n)}function YI(n,e){const t=G.users.find(r=>r.email.toLowerCase()===n.toLowerCase()&&r.password===e);return t?(G.isAuthenticated=!0,G.activeUserId=t.id,G.currentUser=t,ze(),!0):!1}function XI(){G.activeUserId=null,G.currentUser=null,G.isAuthenticated=!1,ze()}function zt(n){return G.demos.find(e=>String(e.id)===String(n))}function Ya(n){return!n||!G.currentUser?!1:n.authorId===G.currentUser.id||n.author===G.currentUser.name}function vB(){return G.currentUser?G.currentUser.roleType==="judge"||G.currentUser.roleType==="admin":!1}function Bn(){return G.currentUser?G.currentUser.roleType==="admin":!1}function Ap(n){if(!G.currentUser)return;const e=parseInt(n,10),t=G.currentUser.savedDemoIds.indexOf(e);t>=0?G.currentUser.savedDemoIds.splice(t,1):G.currentUser.savedDemoIds.push(e),ze(),pt()&&mr(st(qe,"users",G.currentUser.id),{savedDemoIds:G.currentUser.savedDemoIds})}function xp(n){return G.currentUser?G.currentUser.savedDemoIds.includes(parseInt(n,10)):!1}function ZI(n,e){const t=zt(n);if(t&&e.trim()!==""&&G.currentUser){const r={id:"c-"+Date.now(),author:G.currentUser.name,avatar:G.currentUser.avatar,role:G.currentUser.roleTitle||G.currentUser.role,date:"Justo ahora",text:e.trim()};t.comments.push(r),ze(),pt()&&mr(st(qe,"demos",String(n)),{comments:t.comments})}}function ev(n,e){const t=zt(n);return!t||!Ya(t)?!1:(e.title&&(t.title=e.title),e.subtitle&&(t.subtitle=e.subtitle),e.description&&(t.description=e.description),e.category&&(t.category=e.category),e.problemStatement&&(t.problemStatement=e.problemStatement),e.impactMetrics&&(t.impactMetrics=e.impactMetrics),e.videoUrl&&(t.videoUrl=e.videoUrl),ze(),pt()&&mr(st(qe,"demos",String(n)),t),!0)}function Rh(n,e,t){const r=zt(n);if(!r||!Ya(r))return!1;r.images||(r.images=[]);const s={url:e,caption:t||"Evidencia cargada por el participante"};return r.images.push(s),ze(),pt()&&mr(st(qe,"demos",String(n)),{images:r.images}),!0}function tv(n,e){const t=zt(n);return!t||!Ya(t)||!t.images?!1:(t.images.splice(e,1),ze(),pt()&&mr(st(qe,"demos",String(n)),{images:t.images}),!0)}function nv(n,e,t){const r=zt(n);if(!r||!vB())return!1;r.evaluations||(r.evaluations=[]);const s=parseInt(e.innovation)+parseInt(e.viability)+parseInt(e.pitch)+parseInt(e.impact),i=r.evaluations.findIndex(B=>B.judgeId===G.currentUser.id),a={id:"eval-"+Date.now(),judgeId:G.currentUser.id,judgeName:G.currentUser.name,judgeRole:G.currentUser.roleTitle,judgeAvatar:G.currentUser.avatar,date:new Date().toLocaleDateString("es-ES",{day:"2-digit",month:"long",year:"numeric"}),scores:{innovation:parseInt(e.innovation),viability:parseInt(e.viability),pitch:parseInt(e.pitch),impact:parseInt(e.impact)},average:s,feedback:t.trim()};i>=0?r.evaluations[i]=a:r.evaluations.push(a);const l=r.evaluations.reduce((B,c)=>B+c.average,0)/r.evaluations.length;return r.rating=parseInt(l.toFixed(0)),ze(),pt()&&mr(st(qe,"demos",String(n)),{evaluations:r.evaluations,rating:r.rating}),!0}function rv(n){if(!Bn())return!1;const e="usr-"+Date.now(),t={id:e,name:n.name,roleType:n.roleType,roleTitle:n.roleTitle,unit:n.unit,unitClass:n.roleType==="judge"?"badge-unit-tech":"badge-unit-agrifood",avatar:xe(n.name),email:n.email,password:n.password,bio:"Nuevo usuario registrado.",stats:{demosPublished:0,totalViews:0,totalLikes:0,collaborations:0,evaluationsDone:0,pendingEvaluations:0},savedDemoIds:[],badges:[]};return G.users.push(t),ze(),pt()&&ns(st(qe,"users",e),t),!0}function sv(n,e){if(!Bn())return!1;const t=G.users.find(i=>i.id===e);if(!t)return!1;const r=Date.now(),s={id:r,authorId:t.id,title:n.title,subtitle:n.subtitle||"Sin subtítulo",description:n.description||"Sin descripción",unit:t.unit,unitClass:"badge-unit-agrifood",category:n.category||"Grupo Prosur",problemStatement:n.problemStatement||"Describe el problema operativo a resolver",impactMetrics:n.impactMetrics||"Describe las métricas de impacto (antes y después)",tags:["Nuevo"],author:t.name,authorRole:t.roleTitle,authorAvatar:t.avatar,views:0,likes:0,rating:0,duration:"0:00",thumbnail:"https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ",specs:{modelType:"N/A",latency:"N/A",dataSources:"N/A",status:"En diseño"},images:[],evaluations:[],comments:[]};return G.demos.push(s),ze(),pt()&&ns(st(qe,"demos",String(r)),s),!0}function iv(n,e){if(!Bn())return!1;const t=zt(n),r=G.users.find(s=>s.id===e);return t&&r?(t.authorId=r.id,t.author=r.name,t.authorRole=r.roleTitle,t.authorAvatar=r.avatar,ze(),pt()&&mr(st(qe,"demos",String(n)),{authorId:r.id,author:r.name,authorRole:r.roleTitle,authorAvatar:r.avatar}),!0):!1}function av(n,e){if(!Bn())return!1;const t=G.users.find(r=>r.id===n);return t?(e.name&&(t.name=e.name),e.email&&(t.email=e.email),e.password&&(t.password=e.password),e.roleType&&(t.roleType=e.roleType),e.roleTitle&&(t.roleTitle=e.roleTitle),e.unit&&(t.unit=e.unit),G.demos.forEach(r=>{r.authorId===n&&(r.author=t.name,r.authorRole=t.roleTitle,r.unit=t.unit)}),ze(),pt()&&ns(st(qe,"users",n),t),!0):!1}function ov(n){if(!Bn())return!1;const e=G.users.findIndex(t=>t.id===n);return e!==-1?(G.users.splice(e,1),ze(),pt()&&bp(st(qe,"users",n)),!0):!1}function lv(n){if(!Bn())return!1;const e=G.demos.findIndex(t=>String(t.id)===String(n));return e!==-1?(G.demos.splice(e,1),ze(),pt()&&bp(st(qe,"demos",String(n))),!0):!1}function Bv(n,e,t){if(!n||!e||!G.currentUser)return;const r={id:"post-"+Date.now(),author:G.currentUser.name,avatar:G.currentUser.avatar,role:G.currentUser.roleTitle||"Participante",unit:G.currentUser.unit,unitClass:G.currentUser.unitClass,date:"Justo ahora",type:t||"Discusión",title:n,content:e,likes:1,commentsCount:0,tags:["Comunidad","AI Showcase"],commentsList:[]};G.posts.unshift(r),ze(),pt()&&ns(st(qe,"posts",r.id),r)}function cv(){localStorage.removeItem(wB),window.location.reload()}function vs(){return setTimeout(fv,50),hv()}let Fr=!1;function uv(){let n=G.demos;const e=G.currentUser;if(e&&e.roleType==="participant"&&!Fr&&(n=G.demos.filter(t=>t.authorId===e.id||t.author===e.name)),G.selectedCategory!=="all"&&(n=n.filter(t=>t.category===G.selectedCategory)),G.selectedUnit!=="all"&&(n=n.filter(t=>t.unitClass===G.selectedUnit)),G.searchQuery){const t=G.searchQuery.toLowerCase();n=n.filter(r=>r.title.toLowerCase().includes(t)||r.description.toLowerCase().includes(t)||r.tags.some(s=>s.toLowerCase().includes(t)))}return n}function hv(){const n=uv();return`
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Hero Banner -->
      <section class="relative bg-gradient-to-r from-surface-container-highest via-surface-container to-surface-container-low rounded-2xl p-6 md:p-10 border border-surface-container-high overflow-hidden shadow-sm">
        <div class="relative z-10 max-w-3xl space-y-4">
          <div class="flex items-center gap-4 mb-2">
            <img src="/logo-prosur.png" alt="Prosur Logo" class="h-16 w-auto object-contain" />
            <div class="h-10 w-px bg-surface-container-high"></div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <span class="material-symbols-outlined text-sm">rocket_launch</span> Reto IA 2026
            </div>
          </div>
          <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-on-surface leading-tight">
            Plataforma de Demos <span class="text-primary">Inteligencia Artificial</span>
          </h1>
          <p class="text-base md:text-lg text-secondary leading-relaxed">
            Bienvenidos al Reto de IA de Grupo Prosur. Explora las soluciones innovadoras creadas por nuestros equipos. Publica tus demos, comparte feedback y evalúa proyectos.
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="#community" class="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-container transition-all inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-xl">add_circle</span> Unirse a la Conversación
            </a>
            <a href="#profile" class="px-5 py-2.5 bg-white text-on-surface font-semibold rounded-lg border border-surface-container-high hover:bg-surface-container transition-all inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-xl">account_circle</span> Ver Mi Perfil / Jurado
            </a>
          </div>
        </div>
        
        <!-- Participant Filter Banner -->
        ${G.currentUser&&G.currentUser.roleType==="participant"?`
          <div class="mt-6 pt-4 border-t border-surface-container-high flex flex-wrap items-center justify-between gap-3 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
            <div class="flex items-center gap-2 text-xs font-semibold text-emerald-950">
              <span class="material-symbols-outlined text-emerald-700">lock_person</span>
              <span>Modo Participante: ${Fr?"Viendo todos los demos del Reto IA":"Viendo únicamente tu proyecto asignado"}</span>
            </div>
            <button id="toggleShowAllBtn" class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-sm">${Fr?"visibility_off":"visibility"}</span>
              ${Fr?"Ver Solo Mi Proyecto":"Explorar Todos los Demos"}
            </button>
          </div>
        `:""}

        <!-- Decorative Glow -->
        <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      <!-- Company (Empresa) Filter Tabs -->
      <div class="flex items-center justify-between flex-wrap gap-4 border-b border-surface-container-high pb-4">
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          <button data-cat="all" class="cat-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${G.selectedCategory==="all"?"bg-primary text-white shadow-sm":"bg-surface-container text-secondary hover:bg-surface-container-high"}">
            Todas las Empresas (${G.demos.length})
          </button>
          ${bB.map(e=>`
            <button data-cat="${e}" class="cat-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${G.selectedCategory===e?"bg-primary text-white shadow-sm":"bg-surface-container text-secondary hover:bg-surface-container-high"}">
              ${e}
            </button>
          `).join("")}
        </div>

        <div class="text-sm text-secondary font-medium">
          Mostrando <span class="text-on-surface font-bold">${n.length}</span> proyectos
        </div>
      </div>

      <!-- Demo Cards Grid -->
      ${n.length===0?`
        <div class="text-center py-16 bg-surface-container-lowest rounded-xl border border-dashed border-surface-container-high">
          <span class="material-symbols-outlined text-5xl text-secondary mb-3">search_off</span>
          <h3 class="text-lg font-bold text-on-surface">No se encontraron demos</h3>
          <p class="text-sm text-secondary mt-1">Prueba cambiando la categoría o término de búsqueda.</p>
        </div>
      `:`
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${n.map(dv).join("")}
        </div>
      `}

    </div>
  `}function dv(n){const e=xp(n.id),t=(n.evaluations||[]).length;return`
    <div class="bg-white rounded-xl border border-surface-container-high overflow-hidden demo-card-hover flex flex-col justify-between">
      
      <!-- Card Image Header -->
      <div class="relative aspect-video bg-surface-container overflow-hidden group">
        <img src="${n.thumbnail}" alt="${n.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
        
        <!-- Category Badge -->
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
          ${n.category}
        </span>

        <!-- Favorite Button -->
        <button 
          data-fav-id="${n.id}" 
          class="fav-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-white hover:text-primary transition-colors flex items-center justify-center backdrop-blur-md"
          title="${e?"Quitar de guardados":"Guardar demo"}"
        >
          <span class="material-symbols-outlined text-lg ${e?"text-primary fill":""}">bookmark</span>
        </button>

        <!-- Play Overlay Link -->
        <a href="#demo/${n.id}" class="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
          <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-white/30">
            <span class="material-symbols-outlined text-2xl fill">play_arrow</span>
          </div>
        </a>

        <!-- Images count indicator -->
        ${n.images&&n.images.length>0?`
          <span class="absolute bottom-3 left-3 px-2 py-0.5 rounded text-xs font-semibold bg-black/70 text-white flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">collections</span> ${n.images.length} fotos
          </span>
        `:""}

        <!-- Duration Badge -->
        <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-mono bg-black/80 text-white">
          ${n.duration}
        </span>
      </div>

      <!-- Card Body -->
      <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
        <div class="space-y-2">
          <!-- Unit Badge -->
          <span class="inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${n.unitClass}">
            ${n.unit}
          </span>
          <h3 class="font-bold text-lg text-on-surface leading-snug line-clamp-2 hover:text-primary transition-colors">
            <a href="#demo/${n.id}">${n.title}</a>
          </h3>
          <p class="text-sm text-secondary line-clamp-2 leading-relaxed">
            ${n.description}
          </p>
        </div>

        <!-- Tags List -->
        <div class="flex flex-wrap gap-1.5 pt-2">
          ${n.tags.slice(0,3).map(r=>`
            <span class="px-2 py-0.5 bg-surface-container text-tertiary text-xs rounded font-medium">#${r}</span>
          `).join("")}
        </div>
      </div>

      <!-- Card Footer (Author & Social / Judge Rating Stats) -->
      <div class="px-5 py-3.5 bg-surface-bright border-t border-surface-container-high flex items-center justify-between text-xs text-secondary">
        <div class="flex items-center gap-2">
          <img src="${n.authorAvatar}" alt="${n.author}" class="w-7 h-7 rounded-full object-cover ring-1 ring-surface-container-high"/>
          <span class="font-semibold text-on-surface truncate max-w-[120px]">${n.author}</span>
        </div>

        <div class="flex items-center gap-3 font-medium">
          <span class="flex items-center gap-1 text-primary font-bold"><span class="material-symbols-outlined text-sm fill">favorite</span> ${n.likes}</span>
          <span class="flex items-center gap-1 text-amber-500 font-bold" title="${t} evaluaciones del Jurado">
            <span class="material-symbols-outlined text-sm fill">star</span> ${n.rating}
          </span>
        </div>
      </div>

    </div>
  `}function fv(){const n=document.getElementById("toggleShowAllBtn");n&&n.addEventListener("click",()=>{Fr=!Fr;const e=document.getElementById("app");e&&(e.innerHTML=vs())}),document.querySelectorAll(".cat-btn").forEach(e=>{e.addEventListener("click",t=>{G.selectedCategory=t.currentTarget.dataset.cat;const r=document.getElementById("app");r&&(r.innerHTML=vs())})}),document.querySelectorAll(".fav-btn").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const r=t.currentTarget.dataset.favId;Ap(parseInt(r,10));const s=document.getElementById("app");s&&(s.innerHTML=vs())})}),window.addEventListener("search-updated",()=>{const e=document.getElementById("app");e&&(window.location.hash==="#home"||!window.location.hash)&&(e.innerHTML=vs())})}function _n(n){const e=zt(n)||zt(1);return setTimeout(()=>Cv(e.id),50),pv(e)}function pv(n){const e=xp(n.id),t=Ya(n),r=vB(),s=G.currentUser,i=n.evaluations||[];return i.length>0,`
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Breadcrumbs & Role Indicator -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <nav class="flex items-center gap-2 text-xs md:text-sm text-secondary">
          <a href="#home" class="hover:text-primary transition-colors flex items-center gap-1">
            <span class="material-symbols-outlined text-base">home</span> Inicio
          </a>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <a href="#home" class="hover:text-primary transition-colors">${n.category}</a>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-on-surface font-semibold truncate max-w-xs">${n.title}</span>
        </nav>

        <!-- Role Action Notice -->
        ${t?`
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold">
            <span class="material-symbols-outlined text-sm">edit_note</span> Eres el autor de este proyecto (Modo Edición Habilitado)
          </div>
        `:""}

        ${r?`
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold">
            <span class="material-symbols-outlined text-sm">gavel</span> Modo Jurado: Habilitado para Calificar
          </div>
        `:""}
      </div>

      <!-- Main Video & Header Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Video & Primary Content (Left 2 Columns) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Embedded Player Container -->
          <div class="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video relative group">
            <iframe 
              src="${n.videoUrl}?autoplay=0" 
              title="${n.title}"
              class="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>

          <!-- Title & Actions Bar -->
          <div class="space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <span class="px-3 py-1 rounded-md text-xs font-bold ${n.unitClass}">
                ${n.unit}
              </span>
              
              <div class="flex flex-wrap items-center gap-2">
                <!-- Participant Edit Buttons -->
                ${t?`
                  <button id="openEditModalBtn" class="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm">
                    <span class="material-symbols-outlined text-lg">edit</span> Editar Proyecto
                  </button>
                  <button id="openImageModalBtn" class="px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 border border-surface-container-high">
                    <span class="material-symbols-outlined text-lg">add_photo_alternate</span> Cargar Imagen / Evidencia
                  </button>
                `:""}

                <!-- Standard Actions -->
                <button id="likeBtn" class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary font-semibold text-sm text-secondary transition-all flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-lg text-primary fill">favorite</span>
                  <span id="likeCount">${n.likes}</span>
                </button>
                <button id="favBtn" class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary font-semibold text-sm text-secondary transition-all flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-lg ${e?"text-primary fill":""}">bookmark</span>
                </button>
              </div>
            </div>

            <h1 class="text-2xl md:text-3xl font-bold text-on-surface leading-tight">
              ${n.title}
            </h1>
            <p class="text-base text-secondary font-medium leading-relaxed">
              ${n.subtitle}
            </p>
          </div>

            <!-- Section 1: Overview & New Metrics -->
            <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-6">
              <div>
                <h3 class="text-lg font-bold text-on-surface mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-primary">description</span> Resumen del Proyecto (MVP)</h3>
                <p class="text-sm text-secondary leading-relaxed">${n.description}</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-container">
                <div>
                  <h4 class="text-sm font-bold text-on-surface mb-1 flex items-center gap-1"><span class="material-symbols-outlined text-sm text-error">warning</span> Problema Operativo a Resolver</h4>
                  <p class="text-xs text-secondary leading-relaxed bg-error-container/20 p-3 rounded-lg border border-error-container">${n.problemStatement}</p>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-on-surface mb-1 flex items-center gap-1"><span class="material-symbols-outlined text-sm text-emerald-600">monitoring</span> Métricas de Impacto (Antes y Después)</h4>
                  <p class="text-xs text-secondary leading-relaxed bg-emerald-50 p-3 rounded-lg border border-emerald-200">${n.impactMetrics}</p>
                </div>
              </div>
            </div>

            <!-- Attached Image Evidence Gallery (Viewable by Judges & Participants) -->
            <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">collections</span> Galería de Evidencias e Imágenes del Proyecto (${(n.images||[]).length})
                </h3>
                ${t?`
                  <button id="openImageModalBtn2" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">add</span> Añadir Imagen
                  </button>
                `:""}
              </div>

              ${!n.images||n.images.length===0?`
                <div class="p-8 text-center bg-surface-bright rounded-lg border border-dashed border-surface-container-high">
                  <span class="material-symbols-outlined text-3xl text-secondary mb-1">image_not_supported</span>
                  <p class="text-xs text-secondary">No hay imágenes adjuntas. El participante puede cargar imágenes abajo para que el jurado las examine.</p>
                </div>
              `:`
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  ${n.images.map((a,l)=>`
                    <div class="group relative rounded-lg border border-surface-container-high overflow-hidden bg-surface-bright">
                      <img src="${a.url}" alt="${a.caption}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                      <div class="p-3 bg-white border-t border-surface-container-high">
                        <p class="text-xs text-secondary italic leading-snug">${a.caption||"Sin pie de foto"}</p>
                      </div>
                      ${t?`
                        <button data-del-img="${l}" class="del-img-btn absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors" title="Eliminar imagen">
                          <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                      `:""}
                    </div>
                  `).join("")}
                </div>
              `}
            </div>

            <!-- Technical Specifications Grid -->
            <div class="bg-surface-bright p-6 rounded-xl border border-surface-container-high space-y-4">
              <h3 class="text-lg font-bold text-on-surface flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">memory</span> Ficha Técnica del Modelo
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div class="p-3 bg-white rounded-lg border border-surface-container">
                  <span class="text-xs text-secondary uppercase font-semibold block mb-1">Modelo Base</span>
                  <span class="font-bold text-on-surface">${n.specs.modelType}</span>
                </div>
                <div class="p-3 bg-white rounded-lg border border-surface-container">
                  <span class="text-xs text-secondary uppercase font-semibold block mb-1">Latencia Inferencia</span>
                  <span class="font-bold text-on-surface">${n.specs.latency}</span>
                </div>
                <div class="p-3 bg-white rounded-lg border border-surface-container">
                  <span class="text-xs text-secondary uppercase font-semibold block mb-1">Fuente de Datos</span>
                  <span class="font-bold text-on-surface">${n.specs.dataSources}</span>
                </div>
                <div class="p-3 bg-white rounded-lg border border-surface-container">
                  <span class="text-xs text-secondary uppercase font-semibold block mb-1">Estado de Despliegue</span>
                  <span class="font-bold text-emerald-600 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> ${n.specs.status}
                  </span>
                </div>
              </div>
            </div>

            <!-- Section Comments -->
            <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-4">
              <h3 class="text-lg font-bold text-on-surface">Comentarios & Discusión (${n.comments.length})</h3>
              
              <div class="flex gap-3">
                <img src="${s.avatar}" alt="User" class="w-9 h-9 rounded-full object-cover"/>
                <div class="flex-grow space-y-3">
                  <textarea 
                    id="commentInput"
                    rows="2" 
                    placeholder="Escribe una observación o comentario..."
                    class="w-full p-3 bg-surface-container-low rounded-lg border border-surface-container text-sm focus:border-primary focus:bg-white focus:outline-none transition-all"
                  ></textarea>
                  <div class="flex justify-end">
                    <button id="postCommentBtn" class="px-4 py-1.5 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container transition-all">
                      Comentar
                    </button>
                  </div>
                </div>
              </div>

              <div class="space-y-3 pt-2">
                ${n.comments.map(a=>`
                  <div class="p-4 bg-surface-bright rounded-lg border border-surface-container-high space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs text-on-surface">${a.author} <span class="font-normal text-secondary">(${a.role})</span></span>
                      <span class="text-[10px] text-secondary">${a.date}</span>
                    </div>
                    <p class="text-xs text-on-surface">${a.text}</p>
                  </div>
                `).join("")}
              </div>
            </div>

          </div>

        </div>

        <!-- Sidebar: Judge Evaluation Panel & Author Info (Right Column) -->
        <div class="space-y-6">

          <!-- JUDGE EVALUATION WIDGET (Exclusive for Jurado Role) -->
          ${r?`
            <div class="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white p-6 rounded-2xl border-2 border-amber-400 shadow-md space-y-5">
              <div class="flex items-center justify-between border-b border-amber-200 pb-3">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-amber-600 text-2xl">gavel</span>
                  <h3 class="font-bold text-base text-amber-950">Panel de Calificación del Jurado</h3>
                </div>
                <span class="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold uppercase">Jurado Oficial</span>
              </div>

              <form id="judgeEvalForm" class="space-y-4">
                <div class="space-y-3 text-xs">
                  <div>
                    <div class="flex justify-between font-bold text-on-surface mb-1">
                      <span>Eficiencia Operativa (40%)</span>
                      <span class="text-amber-700"><span id="valImpact">40</span> / 40</span>
                    </div>
                    <input type="range" id="scoreImpact" min="0" max="40" step="1" value="40" class="w-full accent-amber-600 cursor-pointer"/>
                  </div>

                  <div>
                    <div class="flex justify-between font-bold text-on-surface mb-1">
                      <span>Viabilidad y Escalabilidad (30%)</span>
                      <span class="text-amber-700"><span id="valViab">30</span> / 30</span>
                    </div>
                    <input type="range" id="scoreViab" min="0" max="30" step="1" value="30" class="w-full accent-amber-600 cursor-pointer"/>
                  </div>

                  <div>
                    <div class="flex justify-between font-bold text-on-surface mb-1">
                      <span>Innovación y Aplicación de IA (20%)</span>
                      <span class="text-amber-700"><span id="valInnov">20</span> / 20</span>
                    </div>
                    <input type="range" id="scoreInnov" min="0" max="20" step="1" value="20" class="w-full accent-amber-600 cursor-pointer"/>
                  </div>

                  <div>
                    <div class="flex justify-between font-bold text-on-surface mb-1">
                      <span>Claridad del Pitch (10%)</span>
                      <span class="text-amber-700"><span id="valPitch">10</span> / 10</span>
                    </div>
                    <input type="range" id="scorePitch" min="0" max="10" step="1" value="10" class="w-full accent-amber-600 cursor-pointer"/>
                  </div>
                </div>

                <div class="bg-amber-100 p-3 rounded-lg flex items-center justify-between border border-amber-300">
                  <span class="font-bold text-amber-900 text-sm">Puntuación Final:</span>
                  <span class="text-xl font-black text-amber-600"><span id="valTotal">100</span>/100</span>
                </div>

                <div>
                  <label class="block text-xs font-bold text-on-surface mb-1">Observación Oficial del Jurado:</label>
                  <textarea 
                    id="judgeFeedbackInput" 
                    rows="3" 
                    placeholder="Escribe la evaluación final, fortalezas y recomendaciones..."
                    class="w-full p-2.5 bg-white rounded-lg border border-amber-300 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    required
                  ></textarea>
                </div>

                <button type="submit" class="w-full py-2.5 bg-amber-600 text-white font-bold text-xs rounded-lg hover:bg-amber-700 transition-all shadow-md flex items-center justify-center gap-1.5">
                  <span class="material-symbols-outlined text-base">verified</span> Emitir Calificación de Jurado
                </button>
              </form>
            </div>
          `:""}

          <!-- Display Submitted Official Judge Evaluations -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xs uppercase font-bold text-secondary tracking-wider">Calificaciones del Jurado (${i.length})</h3>
              <span class="text-sm font-extrabold text-amber-500 flex items-center gap-1">
                <span class="material-symbols-outlined text-base fill">star</span> ${n.rating} / 100
              </span>
            </div>

            ${i.length===0?`
              <p class="text-xs text-secondary text-center py-4">Este proyecto aún no ha sido evaluado formalmente por el Jurado.</p>
            `:`
              <div class="space-y-4">
                ${i.map(a=>`
                  <div class="p-4 bg-amber-50/40 rounded-xl border border-amber-200 space-y-2 text-xs">
                    <div class="flex items-center justify-between border-b border-amber-100 pb-2">
                      <div class="flex items-center gap-2">
                        <img src="${a.judgeAvatar}" alt="${a.judgeName}" class="w-6 h-6 rounded-full object-cover"/>
                        <span class="font-bold text-on-surface">${a.judgeName}</span>
                      </div>
                      <span class="px-2 py-0.5 bg-amber-500 text-white font-bold rounded text-[11px]">
                        ★ ${a.average.toFixed(0)} / 100
                      </span>
                    </div>

                    <div class="grid grid-cols-2 gap-1 text-[11px] text-secondary py-1">
                      <span>Eficiencia: <b>${a.scores.impact}</b>/40</span>
                      <span>Viabilidad: <b>${a.scores.viability}</b>/30</span>
                      <span>Innovación: <b>${a.scores.innovation}</b>/20</span>
                      <span>Pitch: <b>${a.scores.pitch}</b>/10</span>
                    </div>

                    <p class="text-on-surface italic leading-snug">"${a.feedback}"</p>
                    <span class="text-[10px] text-secondary block text-right">${a.date}</span>
                  </div>
                `).join("")}
              </div>
            `}
          </div>

          <!-- Author Profile Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4 shadow-sm">
            <h3 class="text-xs uppercase font-bold text-secondary tracking-wider">Participante / Creador</h3>
            <div class="flex items-center gap-4">
              <img src="${n.authorAvatar}" alt="${n.author}" class="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"/>
              <div>
                <h4 class="font-bold text-sm text-on-surface">${n.author}</h4>
                <p class="text-xs text-secondary">${n.authorRole}</p>
                <span class="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold ${n.unitClass}">
                  ${n.unit}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- MODAL 1: Edit Project Details (Participant Only) -->
      ${t?`
        <div id="editProjectModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
          <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <h3 class="font-bold text-lg text-on-surface">Editar Proyecto (Participante)</h3>
              <button id="closeEditModalBtn" class="text-secondary hover:text-primary">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <form id="editProjectForm" class="space-y-3 text-sm">
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Título del Proyecto</label>
                <input type="text" id="editTitle" value="${n.title}" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required/>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Subtítulo</label>
                <input type="text" id="editSubtitle" value="${n.subtitle}" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required/>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Empresa</label>
                <select id="editCategory" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  ${bB.map(a=>`<option value="${a}" ${n.category===a?"selected":""}>${a}</option>`).join("")}
                </select>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Descripción del Proyecto (MVP)</label>
                <textarea id="editDescription" rows="2" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required>${n.description}</textarea>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Problema Operativo a Resolver</label>
                <textarea id="editProblem" rows="2" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required>${n.problemStatement}</textarea>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Métricas de Impacto (Antes y Después)</label>
                <textarea id="editMetrics" rows="2" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required>${n.impactMetrics}</textarea>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Enlace de Video (YouTube Embed URL)</label>
                <input type="url" id="editVideo" value="${n.videoUrl}" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required/>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button type="button" id="cancelEditBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
                <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

      <!-- MODAL 2: Attach Evidence Image (Participant Only) -->
      ${t?`
        <div id="addImageModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
          <div class="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <h3 class="font-bold text-lg text-on-surface">Cargar Imagen de Evidencia</h3>
              <button id="closeImageModalBtn" class="text-secondary hover:text-primary">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <form id="addImageForm" class="space-y-4 text-sm">
              
              <!-- Local File Picker Option -->
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Seleccionar archivo de imagen local</label>
                <input type="file" id="imageFileInput" accept="image/*" class="w-full p-2 border border-surface-container rounded-lg text-xs bg-surface-container-low"/>
              </div>

              <div class="text-center text-xs text-secondary font-bold">O introduce una URL de imagen</div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">URL de la Imagen</label>
                <input type="url" id="imageUrlInput" placeholder="https://..." class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Pie de foto / Descripción para el Jurado</label>
                <input type="text" id="imageCaptionInput" placeholder="ej. Diagrama de flujo de datos en tiempo real..." class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button type="button" id="cancelImageBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
                <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container">Subir Imagen</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

    </div>
  `}function Cv(n){const e=()=>{var I,E,y,T;const K=parseInt(((I=document.getElementById("scoreImpact"))==null?void 0:I.value)||0),ne=parseInt(((E=document.getElementById("scoreViab"))==null?void 0:E.value)||0),ie=parseInt(((y=document.getElementById("scoreInnov"))==null?void 0:y.value)||0),Be=parseInt(((T=document.getElementById("scorePitch"))==null?void 0:T.value)||0),he=document.getElementById("valTotal");he&&(he.innerText=K+ne+ie+Be)};["Impact","Viab","Innov","Pitch"].forEach(K=>{const ne=document.getElementById(`score${K}`),ie=document.getElementById(`val${K}`);ne&&ie&&ne.addEventListener("input",()=>{ie.innerText=ne.value,e()})});const t=document.getElementById("judgeEvalForm");t&&t.addEventListener("submit",K=>{K.preventDefault();const ne={impact:parseInt(document.getElementById("scoreImpact").value),viability:parseInt(document.getElementById("scoreViab").value),innovation:parseInt(document.getElementById("scoreInnov").value),pitch:parseInt(document.getElementById("scorePitch").value)},ie=document.getElementById("judgeFeedbackInput").value;if(nv(n,ne,ie)){const Be=document.getElementById("app");Be&&(Be.innerHTML=_n(n))}});const r=document.getElementById("likeBtn");r&&r.addEventListener("click",()=>{const K=zt(n);K&&(K.likes+=1,document.getElementById("likeCount").innerText=K.likes)});const s=document.getElementById("favBtn");s&&s.addEventListener("click",()=>{Ap(n);const K=document.getElementById("app");K&&(K.innerHTML=_n(n))});const i=document.getElementById("postCommentBtn");i&&i.addEventListener("click",()=>{const K=document.getElementById("commentInput");if(K&&K.value.trim()!==""){ZI(n,K.value);const ne=document.getElementById("app");ne&&(ne.innerHTML=_n(n))}});const a=document.getElementById("openEditModalBtn"),l=document.getElementById("editProjectModal"),B=document.getElementById("closeEditModalBtn"),c=document.getElementById("cancelEditBtn");if(a&&l){a.addEventListener("click",()=>l.classList.remove("hidden")),B&&B.addEventListener("click",()=>l.classList.add("hidden")),c&&c.addEventListener("click",()=>l.classList.add("hidden"));const K=document.getElementById("editProjectForm");K&&K.addEventListener("submit",ne=>{ne.preventDefault();const ie={title:document.getElementById("editTitle").value,subtitle:document.getElementById("editSubtitle").value,category:document.getElementById("editCategory").value,description:document.getElementById("editDescription").value,problemStatement:document.getElementById("editProblem").value,impactMetrics:document.getElementById("editMetrics").value,videoUrl:document.getElementById("editVideo").value};ev(n,ie);const Be=document.getElementById("app");Be&&(Be.innerHTML=_n(n))})}const h=document.getElementById("openImageModalBtn"),f=document.getElementById("openImageModalBtn2"),C=document.getElementById("addImageModal"),D=document.getElementById("closeImageModalBtn"),A=document.getElementById("cancelImageBtn"),L=()=>C&&C.classList.remove("hidden"),M=()=>C&&C.classList.add("hidden");h&&h.addEventListener("click",L),f&&f.addEventListener("click",L),D&&D.addEventListener("click",M),A&&A.addEventListener("click",M);const z=document.getElementById("addImageForm");z&&z.addEventListener("submit",K=>{K.preventDefault();const ne=document.getElementById("imageFileInput"),ie=document.getElementById("imageUrlInput").value.trim(),Be=document.getElementById("imageCaptionInput").value.trim();if(ne.files&&ne.files[0]){const he=new FileReader;he.onload=I=>{Rh(n,I.target.result,Be);const E=document.getElementById("app");E&&(E.innerHTML=_n(n))},he.readAsDataURL(ne.files[0])}else if(ie){Rh(n,ie,Be);const he=document.getElementById("app");he&&(he.innerHTML=_n(n))}}),document.querySelectorAll(".del-img-btn").forEach(K=>{K.addEventListener("click",ne=>{const ie=parseInt(ne.currentTarget.dataset.delImg,10);tv(n,ie);const Be=document.getElementById("app");Be&&(Be.innerHTML=_n(n))})})}function Cl(){return setTimeout(gv,50),mv()}function mv(){return`
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Community Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container-high pb-6">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <span class="material-symbols-outlined text-sm">forum</span> Red de Innovación
          </div>
          <h1 class="text-3xl font-bold text-on-surface">Feed de Comunidad & Foros IA</h1>
          <p class="text-sm text-secondary mt-1">
            Debate arquitecturas, propone casos de uso y comparte aprendizajes sobre la implementación de IA en Prosur.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Main Feed Posts (Left 2 Columns) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Create Post Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <img src="${G.currentUser.avatar}" alt="${G.currentUser.name}" class="w-10 h-10 rounded-full object-cover"/>
              <h3 class="font-bold text-base text-on-surface">Iniciar nueva discusión o anuncio</h3>
            </div>
            
            <input 
              id="postTitleInput" 
              type="text" 
              placeholder="Título descriptivo del tema..."
              class="w-full p-3 bg-surface-container-low rounded-lg border border-surface-container text-sm font-semibold focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
            
            <textarea 
              id="postContentInput" 
              rows="3" 
              placeholder="Detalla tu propuesta, consulta o descubrimiento técnico..."
              class="w-full p-3 bg-surface-container-low rounded-lg border border-surface-container text-sm focus:border-primary focus:bg-white focus:outline-none transition-all"
            ></textarea>
            
            <div class="flex items-center justify-between flex-wrap gap-3 pt-2">
              <div class="flex items-center gap-2">
                <select id="postCategorySelect" class="bg-surface-container text-xs font-semibold rounded-lg px-3 py-2 border-0 focus:ring-1 focus:ring-primary text-secondary">
                  <option value="Showcase">Categoría: Showcase</option>
                  <option value="Pregunta">Categoría: Pregunta Técnica</option>
                  <option value="Idea">Categoría: Propuesta de Proyecto</option>
                </select>
              </div>
              <button id="publishPostBtn" class="px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary-container transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">send</span> Publicar en Comunidad
              </button>
            </div>
          </div>

          <!-- Posts Feed -->
          <div class="space-y-4">
            ${G.posts.map(n=>`
              <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4 shadow-sm hover:border-surface-container-highest transition-all">
                
                <!-- Post Author Header -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img src="${n.avatar}" alt="${n.author}" class="w-10 h-10 rounded-full object-cover"/>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-sm text-on-surface">${n.author}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${n.unitClass}">${n.unit}</span>
                      </div>
                      <span class="text-xs text-secondary">${n.role} • ${n.date}</span>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-surface-container text-xs font-semibold text-tertiary rounded-full">
                    ${n.type}
                  </span>
                </div>

                <!-- Post Content -->
                <div class="space-y-2">
                  <h3 class="font-bold text-lg text-on-surface leading-snug">${n.title}</h3>
                  <p class="text-sm text-secondary leading-relaxed">${n.content}</p>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                  ${n.tags.map(e=>`<span class="px-2 py-0.5 bg-surface-container text-xs rounded font-medium text-secondary">#${e}</span>`).join("")}
                </div>

                <!-- Post Actions Bar -->
                <div class="flex items-center justify-between pt-3 border-t border-surface-container-high text-xs text-secondary font-medium">
                  <div class="flex items-center gap-4">
                    <button class="like-post-btn flex items-center gap-1.5 hover:text-primary transition-colors" data-post-id="${n.id}">
                      <span class="material-symbols-outlined text-lg text-primary fill">favorite</span>
                      <span>${n.likes} Me gusta</span>
                    </button>
                    <span class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-lg">chat_bubble</span>
                      <span>${n.commentsCount} Comentarios</span>
                    </span>
                  </div>
                  <button class="hover:text-primary transition-colors">Compartir</button>
                </div>

              </div>
            `).join("")}
          </div>

        </div>

        <!-- Sidebar (Active Contributors & Trending Tags) -->
        <div class="space-y-6">
          
          <!-- Active Members -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4">
            <h3 class="font-bold text-sm text-on-surface uppercase tracking-wider">Miembros Más Activos</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250" alt="Elena" class="w-8 h-8 rounded-full object-cover"/>
                  <div>
                    <span class="font-bold text-xs text-on-surface block">Dra. Elena Rostova</span>
                    <span class="text-[11px] text-secondary">Prosur Biotech</span>
                  </div>
                </div>
                <span class="text-xs font-bold text-primary">14 Demos</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250" alt="Mariana" class="w-8 h-8 rounded-full object-cover"/>
                  <div>
                    <span class="font-bold text-xs text-on-surface block">Lic. Mariana Gómez</span>
                    <span class="text-[11px] text-secondary">Prosur Corporate</span>
                  </div>
                </div>
                <span class="text-xs font-bold text-primary">9 Demos</span>
              </div>
            </div>
          </div>

          <!-- Trending Topics -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-3">
            <h3 class="font-bold text-sm text-on-surface uppercase tracking-wider">Temas Tendencia</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#Llama3</span>
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#YOLOv8</span>
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#Espectrometria</span>
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#RAG</span>
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#Biotecnologia</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  `}function gv(){const n=document.getElementById("publishPostBtn");n&&n.addEventListener("click",()=>{const e=document.getElementById("postTitleInput").value,t=document.getElementById("postContentInput").value,r=document.getElementById("postCategorySelect").value;if(e&&t){Bv(e,t,r);const s=document.getElementById("app");s&&(s.innerHTML=Cl())}}),document.querySelectorAll(".like-post-btn").forEach(e=>{e.addEventListener("click",t=>{const r=t.currentTarget.dataset.postId,s=G.posts.find(i=>i.id===r);if(s){s.likes+=1;const i=document.getElementById("app");i&&(i.innerHTML=Cl())}})})}function Ev(){return setTimeout(yv,50),_v()}function _v(){const n=G.currentUser,e=vB(),t=G.demos.filter(a=>a.authorId===n.id||a.author===n.name),r=(n.savedDemoIds||[]).map(a=>zt(a)).filter(Boolean),s=G.demos.filter(a=>(a.evaluations||[]).some(l=>l.judgeId===n.id)),i=G.demos.filter(a=>!(a.evaluations||[]).some(l=>l.judgeId===n.id));return`
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Profile / Judge Header Card -->
      <div class="bg-white rounded-2xl p-6 md:p-8 border border-surface-container-high shadow-sm relative overflow-hidden space-y-6">
        <div class="absolute top-0 left-0 right-0 h-28 ${e?"bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800":"bg-gradient-to-r from-primary via-primary-container to-tertiary"}"></div>
        
        <div class="relative pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div class="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <img 
              src="${n.avatar}" 
              alt="${n.name}"
              class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-white shadow-md relative z-10"
            />
            <div class="space-y-1">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 class="text-2xl md:text-3xl font-bold text-on-surface">${n.name}</h1>
                <span class="px-2.5 py-0.5 rounded text-xs font-bold ${e?"bg-amber-100 text-amber-900 border border-amber-300":n.unitClass}">
                  ${e?"⚖️ Jurado Oficial":n.unit}
                </span>
              </div>
              <p class="text-sm font-semibold text-secondary">${n.roleTitle||n.role}</p>
              <p class="text-xs text-secondary flex items-center justify-center sm:justify-start gap-1">
                <span class="material-symbols-outlined text-sm">mail</span> ${n.email}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <span class="px-4 py-2 bg-surface-container rounded-lg text-xs font-bold text-secondary border border-surface-container-high">
              Rol Activo: ${e?"Jurado Evaluador":"Participante / Creador"}
            </span>
          </div>
        </div>

        <p class="text-sm text-secondary leading-relaxed border-t border-surface-container-high pt-4">
          ${n.bio}
        </p>

        <!-- Recognition Badges -->
        <div class="flex flex-wrap items-center gap-2 pt-2">
          <span class="text-xs font-bold uppercase tracking-wider text-secondary mr-2">Insignias:</span>
          ${n.badges.map(a=>`
            <span class="px-3 py-1 rounded-full ${e?"bg-amber-100 text-amber-900 border border-amber-300":"bg-primary/10 text-primary border border-primary/20"} text-xs font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm fill ${e?"text-amber-600":"text-primary"}">workspace_premium</span> ${a}
            </span>
          `).join("")}
        </div>
      </div>

      <!-- Stats Grid Cards -->
      ${e?`
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Proyectos Evaluados</span>
            <div class="text-3xl font-extrabold text-amber-600">${s.length}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Pendientes de Calificar</span>
            <div class="text-3xl font-extrabold font-bold text-primary">${i.length}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Total de Proyectos en Concurso</span>
            <div class="text-3xl font-extrabold text-on-surface">${G.demos.length}</div>
          </div>
        </div>
      `:`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Demos Publicados</span>
            <div class="text-3xl font-extrabold text-primary">${t.length}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Visualizaciones</span>
            <div class="text-3xl font-extrabold text-on-surface">${n.stats?n.stats.totalViews:1200}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Reacciones</span>
            <div class="text-3xl font-extrabold text-primary">${n.stats?n.stats.totalLikes:180}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Colaboraciones</span>
            <div class="text-3xl font-extrabold text-emerald-600">${n.stats?n.stats.collaborations:6}</div>
          </div>
        </div>
      `}

      <!-- Profile Tabs -->
      ${e?`
        <div class="border-b border-surface-container-high flex gap-8 text-sm font-medium">
          <button class="py-3 profile-tab-btn tab-active" data-target="tab-pending-evals">
            Proyectos Pendientes (${i.length})
          </button>
          <button class="py-3 profile-tab-btn text-secondary hover:text-amber-700" data-target="tab-done-evals">
            Evaluaciones Completadas (${s.length})
          </button>
        </div>

        <div id="tab-pending-evals" class="profile-tab-content space-y-4">
          ${i.length===0?`
            <p class="text-sm text-secondary text-center py-12">¡Excelente! Has evaluado todos los proyectos presentados.</p>
          `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${i.map(a=>Ph(a,!1)).join("")}
            </div>
          `}
        </div>

        <div id="tab-done-evals" class="profile-tab-content hidden space-y-4">
          ${s.length===0?`
            <p class="text-sm text-secondary text-center py-12">Aún no has emitido ninguna calificación.</p>
          `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${s.map(a=>Ph(a,!0)).join("")}
            </div>
          `}
        </div>
      `:`
        <div class="border-b border-surface-container-high flex gap-8 text-sm font-medium">
          <button class="py-3 profile-tab-btn tab-active" data-target="tab-my-demos">
            Mis Demos (${t.length})
          </button>
          <button class="py-3 profile-tab-btn text-secondary hover:text-primary" data-target="tab-saved-demos">
            Demos Guardados (${r.length})
          </button>
        </div>

        <div id="tab-my-demos" class="profile-tab-content space-y-6">
          ${t.length===0?`
            <p class="text-sm text-secondary text-center py-12">No has publicado demos aún con este usuario.</p>
          `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${t.map(Sh).join("")}
            </div>
          `}
        </div>

        <div id="tab-saved-demos" class="profile-tab-content hidden space-y-6">
          ${r.length===0?`
            <p class="text-sm text-secondary text-center py-12">No tienes demos guardados en favoritos.</p>
          `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${r.map(Sh).join("")}
            </div>
          `}
        </div>
      `}

    </div>
  `}function Ph(n,e){const t=(n.evaluations||[]).find(r=>r.judgeId===G.currentUser.id);return`
    <div class="bg-white rounded-xl border border-surface-container-high overflow-hidden demo-card-hover flex flex-col justify-between">
      <div class="relative aspect-video bg-surface-container">
        <img src="${n.thumbnail}" alt="${n.title}" class="w-full h-full object-cover"/>
        <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold ${n.unitClass}">${n.unit}</span>
        ${e?`
          <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow">
            <span class="material-symbols-outlined text-sm">verified</span> Calificado ★ ${t?t.average.toFixed(1):""}
          </span>
        `:`
          <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-xs shadow">
            Pendiente
          </span>
        `}
      </div>
      <div class="p-4 space-y-2 flex-grow">
        <h4 class="font-bold text-sm text-on-surface line-clamp-2">${n.title}</h4>
        <p class="text-xs text-secondary line-clamp-2">${n.description}</p>
        <span class="text-[11px] text-secondary font-semibold block">Autor: ${n.author}</span>
      </div>
      <div class="p-4 bg-surface-bright border-t border-surface-container-high">
        <a href="#demo/${n.id}" class="w-full py-2 ${e?"bg-surface-container hover:bg-surface-container-high text-on-surface":"bg-amber-600 hover:bg-amber-700 text-white"} font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm">
          <span class="material-symbols-outlined text-sm">${e?"visibility":"gavel"}</span>
          ${e?"Ver Calificación Emitida":"Evaluar y Calificar Proyecto"}
        </a>
      </div>
    </div>
  `}function Sh(n){return`
    <div class="bg-white rounded-xl border border-surface-container-high overflow-hidden demo-card-hover flex flex-col justify-between">
      <div class="relative aspect-video bg-surface-container">
        <img src="${n.thumbnail}" alt="${n.title}" class="w-full h-full object-cover"/>
        <a href="#demo/${n.id}" class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
          <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-xl fill">play_arrow</span>
          </div>
        </a>
      </div>
      <div class="p-4 space-y-2">
        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${n.unitClass}">${n.unit}</span>
        <h4 class="font-bold text-sm text-on-surface line-clamp-2 hover:text-primary">
          <a href="#demo/${n.id}">${n.title}</a>
        </h4>
        <p class="text-xs text-secondary line-clamp-2">${n.description}</p>
      </div>
      <div class="px-4 py-3 bg-surface-bright border-t border-surface-container-high flex items-center justify-between text-xs">
        <span class="text-secondary font-medium">${(n.images||[]).length} imágenes cargadas</span>
        <a href="#demo/${n.id}" class="font-bold text-primary hover:underline flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">edit</span> Editar
        </a>
      </div>
    </div>
  `}function yv(){document.querySelectorAll(".profile-tab-btn").forEach(n=>{n.addEventListener("click",e=>{document.querySelectorAll(".profile-tab-btn").forEach(s=>{s.classList.remove("tab-active"),s.classList.add("text-secondary")}),document.querySelectorAll(".profile-tab-content").forEach(s=>s.classList.add("hidden")),e.currentTarget.classList.add("tab-active"),e.currentTarget.classList.remove("text-secondary");const t=e.currentTarget.dataset.target,r=document.getElementById(t);r&&r.classList.remove("hidden")})})}function Dv(){return setTimeout(bv,50),wv()}function wv(){return`
    <div class="min-h-[80vh] flex items-center justify-center p-4 animate-fadeIn">
      <div class="bg-white max-w-md w-full rounded-2xl border border-surface-container-high shadow-xl overflow-hidden">
        
        <div class="bg-gradient-to-r from-primary to-primary-container p-8 text-center space-y-4">
          <div class="w-16 h-16 bg-white rounded-xl mx-auto flex items-center justify-center shadow-md p-1">
            <img src="/logo-prosur.png" alt="Prosur Logo" class="w-full h-full object-contain" />
          </div>
          <h1 class="text-2xl font-bold text-white tracking-tight">Acceso a Demo IA</h1>
          <p class="text-primary-container text-sm text-white/80">Reto de Inteligencia Artificial 2026</p>
        </div>

        <div class="p-8 space-y-6">
          <form id="loginForm" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">Correo Electrónico</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">mail</span>
                <input 
                  type="email" 
                  id="loginEmail" 
                  class="w-full pl-10 pr-3 py-3 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:bg-white focus:outline-none transition-all text-sm font-medium"
                  placeholder="usuario@prosur.com"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">Contraseña</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">lock</span>
                <input 
                  type="password" 
                  id="loginPassword" 
                  class="w-full pl-10 pr-3 py-3 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:bg-white focus:outline-none transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div id="loginError" class="hidden text-xs text-error font-bold text-center bg-error-container py-2 rounded">
              Credenciales incorrectas. Verifica el correo y la contraseña.
            </div>

            <button type="submit" class="w-full py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">login</span> Iniciar Sesión
            </button>
          </form>

        </div>

      </div>
    </div>
  `}function bv(){const n=document.getElementById("loginForm");n&&n.addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("loginEmail").value,r=document.getElementById("loginPassword").value,s=document.getElementById("loginError");YI(t,r)?(s.classList.add("hidden"),TB("#home"),Ls()):s.classList.remove("hidden")})}function Rp(){return Bn()?(setTimeout(vv,50),Iv()):'<div class="p-12 text-center text-error font-bold text-xl">Acceso Denegado. Solo Administradores.</div>'}function Iv(){const n=G.users,e=G.demos;return`
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Header Banner -->
      <div class="bg-white rounded-2xl p-6 md:p-8 border border-surface-container-high shadow-sm relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-3xl text-primary">admin_panel_settings</span>
            <h1 class="text-2xl md:text-3xl font-bold text-on-surface">Panel de Administración Integral</h1>
          </div>
          <p class="text-sm text-secondary">Gestión completa de usuarios, asignación de demos y restablecimiento del sistema.</p>
        </div>

        <button id="resetStateBtn" class="px-4 py-2 bg-error-container text-error hover:bg-error hover:text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 border border-error/20">
          <span class="material-symbols-outlined text-base">restart_alt</span> Restablecer Datos de Ejemplo
        </button>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left 2 Cols: User Management & Editing -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- User Registration Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
              <span class="material-symbols-outlined text-primary">person_add</span>
              <h2 class="font-bold text-lg text-on-surface">Registrar Nuevo Usuario</h2>
            </div>
            
            <form id="createUserForm" class="space-y-4 text-sm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Nombre Completo</label>
                  <input type="text" id="newUserName" required placeholder="Ej. Dra. Carmen Silva" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Correo Electrónico</label>
                  <input type="email" id="newUserEmail" required placeholder="carmen@prosur.com" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Contraseña</label>
                  <input type="text" id="newUserPass" value="demo" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Rol en Plataforma</label>
                  <select id="newUserRole" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                    <option value="participant">Participante (Crea/Edita Demo)</option>
                    <option value="judge">Jurado (Califica Demos)</option>
                    <option value="admin">Administrador (Control Total)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Cargo / Puesto</label>
                  <input type="text" id="newUserTitle" required placeholder="Ej. Especialista en IA" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Unidad / División Prosur</label>
                <input type="text" id="newUserUnit" required placeholder="Ej. Prosur Biotech" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <button type="submit" class="w-full py-2.5 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-lg">how_to_reg</span> Registrar Usuario
              </button>
            </form>
          </div>

          <!-- Existing Users Directory & Actions -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">group</span>
                <h2 class="font-bold text-lg text-on-surface">Usuarios Registrados (${n.length})</h2>
              </div>
              <span class="text-xs text-secondary font-medium">Edita o elimina cuentas de usuario</span>
            </div>

            <div class="space-y-3">
              ${n.map(t=>`
                <div class="p-4 bg-surface-bright rounded-xl border border-surface-container flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"/>
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="font-bold text-sm text-on-surface">${t.name}</h4>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${t.roleType==="admin"?"bg-purple-100 text-purple-900 border border-purple-300":t.roleType==="judge"?"bg-amber-100 text-amber-900 border border-amber-300":"bg-emerald-100 text-emerald-900 border border-emerald-300"}">
                          ${t.roleType==="admin"?"Admin":t.roleType==="judge"?"Jurado":"Participante"}
                        </span>
                      </div>
                      <p class="text-xs text-secondary">${t.email} • <span class="italic">${t.roleTitle||"Sin cargo"}</span></p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button data-edit-user-id="${t.id}" class="edit-user-btn px-3 py-1.5 bg-surface-container hover:bg-primary hover:text-white text-secondary font-semibold text-xs rounded-lg transition-colors flex items-center gap-1">
                      <span class="material-symbols-outlined text-sm">edit</span> Editar
                    </button>
                    ${t.roleType!=="admin"?`
                      <button data-del-user-id="${t.id}" class="del-user-btn px-2.5 py-1.5 bg-error-container text-error hover:bg-error hover:text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">delete</span>
                      </button>
                    `:""}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

        </div>

        <!-- Right Col: Demo Management & Creation -->
        <div class="space-y-8">
          
          <!-- Create New Demo Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
              <span class="material-symbols-outlined text-primary">add_box</span>
              <h2 class="font-bold text-lg text-on-surface">Crear Nuevo Proyecto Demo</h2>
            </div>
            
            <form id="createDemoForm" class="space-y-4 text-sm">
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Título del Proyecto</label>
                <input type="text" id="newDemoTitle" required placeholder="Ej. SmartPack AI" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Empresa</label>
                <select id="newDemoCategory" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  ${bB.map(t=>`<option value="${t}">${t}</option>`).join("")}
                </select>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Asignar a Equipo / Participante</label>
                <select id="newDemoAuthor" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  <option value="" disabled selected>Selecciona un equipo participante...</option>
                  ${n.filter(t=>t.roleType==="participant").map(t=>`
                    <option value="${t.id}">${t.name} (${t.unit})</option>
                  `).join("")}
                </select>
              </div>

              <button type="submit" class="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-lg">post_add</span> Crear y Asignar Demo
              </button>
            </form>
          </div>

          <!-- Existing Demos & Reassignment -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
              <span class="material-symbols-outlined text-primary">assignment_ind</span>
              <h2 class="font-bold text-lg text-on-surface">Proyectos Existentes (${e.length})</h2>
            </div>
            
            <div class="space-y-4">
              ${e.map(t=>`
                <div class="p-4 bg-surface-bright rounded-xl border border-surface-container-high space-y-3">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <h4 class="font-bold text-sm text-on-surface">${t.title}</h4>
                      <p class="text-xs text-secondary">Autor: <span class="font-bold text-primary">${t.author}</span></p>
                    </div>
                    <button data-del-demo-id="${t.id}" class="del-demo-btn p-1 text-secondary hover:text-error transition-colors" title="Eliminar Proyecto">
                      <span class="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                  
                  <form class="assign-demo-form flex items-center gap-2" data-demo-id="${t.id}">
                    <select class="flex-1 p-2 bg-white rounded-lg border border-surface-container text-xs focus:outline-none focus:border-primary" required>
                      <option value="" disabled selected>Reasignar a equipo participante...</option>
                      ${n.filter(r=>r.roleType==="participant").map(r=>`
                        <option value="${r.id}">${r.name} (${r.unit})</option>
                      `).join("")}
                    </select>
                    <button type="submit" class="px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary-container transition-colors">
                      Guardar
                    </button>
                  </form>
                </div>
              `).join("")}
            </div>
          </div>

        </div>

      </div>

      <!-- MODAL: Edit User Modal -->
      <div id="editUserModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
            <h3 class="font-bold text-lg text-on-surface">Editar Cuenta de Usuario</h3>
            <button id="closeEditUserModalBtn" class="text-secondary hover:text-primary">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="editUserForm" class="space-y-3 text-sm">
            <input type="hidden" id="editUserId"/>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Nombre Completo</label>
              <input type="text" id="editUserName" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
            </div>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Correo Electrónico</label>
              <input type="email" id="editUserEmail" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Contraseña</label>
                <input type="text" id="editUserPass" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Rol</label>
                <select id="editUserRole" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  <option value="participant">Participante</option>
                  <option value="judge">Jurado</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Cargo / Puesto</label>
              <input type="text" id="editUserTitle" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
            </div>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Unidad / Área</label>
              <input type="text" id="editUserUnit" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
            </div>

            <div class="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button type="button" id="cancelEditUserBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
              <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `}function vv(){const n=document.getElementById("createUserForm");n&&n.addEventListener("submit",l=>{l.preventDefault();const B={name:document.getElementById("newUserName").value,email:document.getElementById("newUserEmail").value,password:document.getElementById("newUserPass").value,roleType:document.getElementById("newUserRole").value,roleTitle:document.getElementById("newUserTitle").value,unit:document.getElementById("newUserUnit").value};rv(B)&&(alert("Usuario registrado exitosamente."),n.reset(),Dr())});const e=document.getElementById("createDemoForm");e&&e.addEventListener("submit",l=>{l.preventDefault();const B={title:document.getElementById("newDemoTitle").value,category:document.getElementById("newDemoCategory").value},c=document.getElementById("newDemoAuthor").value;sv(B,c)&&(alert("Proyecto Demo creado exitosamente."),e.reset(),Dr())});const t=document.getElementById("editUserModal"),r=document.getElementById("closeEditUserModalBtn"),s=document.getElementById("cancelEditUserBtn");r&&r.addEventListener("click",()=>t.classList.add("hidden")),s&&s.addEventListener("click",()=>t.classList.add("hidden")),document.querySelectorAll(".edit-user-btn").forEach(l=>{l.addEventListener("click",B=>{const c=B.currentTarget.dataset.editUserId,h=G.users.find(f=>f.id===c);h&&(document.getElementById("editUserId").value=h.id,document.getElementById("editUserName").value=h.name,document.getElementById("editUserEmail").value=h.email,document.getElementById("editUserPass").value=h.password,document.getElementById("editUserRole").value=h.roleType,document.getElementById("editUserTitle").value=h.roleTitle||"",document.getElementById("editUserUnit").value=h.unit||"",t.classList.remove("hidden"))})});const i=document.getElementById("editUserForm");i&&i.addEventListener("submit",l=>{l.preventDefault();const B=document.getElementById("editUserId").value,c={name:document.getElementById("editUserName").value,email:document.getElementById("editUserEmail").value,password:document.getElementById("editUserPass").value,roleType:document.getElementById("editUserRole").value,roleTitle:document.getElementById("editUserTitle").value,unit:document.getElementById("editUserUnit").value};av(B,c)&&(t.classList.add("hidden"),Dr())}),document.querySelectorAll(".del-user-btn").forEach(l=>{l.addEventListener("click",B=>{const c=B.currentTarget.dataset.delUserId;confirm("¿Estás seguro de eliminar este usuario?")&&(ov(c),Dr())})}),document.querySelectorAll(".del-demo-btn").forEach(l=>{l.addEventListener("click",B=>{const c=B.currentTarget.dataset.delDemoId;confirm("¿Estás seguro de eliminar este proyecto Demo?")&&(lv(c),Dr())})}),document.querySelectorAll(".assign-demo-form").forEach(l=>{l.addEventListener("submit",B=>{B.preventDefault();const c=l.dataset.demoId,f=l.querySelector("select").value;f&&iv(c,f)&&(alert("Proyecto reasignado exitosamente."),Dr())})});const a=document.getElementById("resetStateBtn");a&&a.addEventListener("click",()=>{confirm("¿Restablecer los datos de demostración a su estado inicial por defecto?")&&cv()})}function Dr(){const n=document.getElementById("app");n&&(n.innerHTML=Rp())}function Tv(){window.addEventListener("hashchange",Ls),window.addEventListener("load",Ls),Ls()}function TB(n){window.location.hash=n}function Ls(){let n=window.location.hash||"#home";const e=document.getElementById("app");if(e){if(!G.isAuthenticated&&n!=="#login"){TB("#login");return}if(window.scrollTo(0,0),Pp(),n==="#login")e.innerHTML=Dv();else if(n.startsWith("#demo/")){const t=n.split("/")[1];e.innerHTML=_n(t),ys("demo")}else n==="#community"?(e.innerHTML=Cl(),ys("community")):n==="#admin"&&Bn()?(e.innerHTML=Rp(),ys("admin")):n==="#profile"?(e.innerHTML=Ev(),ys("profile")):(e.innerHTML=vs(),ys("home"))}}function Pp(){const n=document.getElementById("navbar");if(!n)return;if(window.location.hash==="#login"||!G.isAuthenticated){n.innerHTML="";return}const e=G.currentUser;n.innerHTML=`
    <header class="sticky top-0 z-50 glass-header border-b border-surface-container-high transition-all">
      <div class="max-w-[1440px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between gap-3">
        
        <!-- Brand / Logo -->
        <div class="flex items-center gap-3">
          <a href="#home" class="flex items-center gap-2.5 group">
            <div class="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              <img src="/logo-prosur.png" alt="Prosur Logo" class="w-full h-full object-contain p-1" />
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-base leading-tight tracking-tight text-on-surface flex items-center gap-1">
                PROSUR <span class="text-primary material-symbols-outlined text-sm">neurology</span>
              </span>
              <span class="text-[10px] uppercase font-bold text-secondary tracking-widest leading-none">AI Showcase</span>
            </div>
          </a>
        </div>

        <!-- Central Search Bar -->
        <div class="hidden lg:flex flex-1 max-w-xs mx-2">
          <div class="relative w-full">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">search</span>
            <input 
              type="text" 
              placeholder="Buscar demos, modelos..." 
              class="w-full bg-surface-container-low border border-surface-container-high rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all text-on-surface"
            />
          </div>
        </div>

        <!-- Navigation Links & Logout / Profile -->
        <div class="flex items-center gap-4">
          <nav class="flex items-center gap-1 text-xs font-semibold text-secondary">
            <a id="nav-home" href="#home" class="px-2.5 py-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-base">grid_view</span>
              <span class="hidden md:inline">Galería</span>
            </a>
            <a id="nav-community" href="#community" class="px-2.5 py-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-base">forum</span>
              <span class="hidden md:inline">Comunidad</span>
            </a>
            <a id="nav-profile" href="#profile" class="px-2.5 py-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-base">account_circle</span>
              <span class="hidden md:inline">Mi Perfil</span>
            </a>
            ${Bn()?`
              <a id="nav-admin" href="#admin" class="px-2.5 py-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1 text-primary">
                <span class="material-symbols-outlined text-base">admin_panel_settings</span>
                <span class="hidden md:inline">Admin</span>
              </a>
            `:""}
          </nav>

          <div class="hidden md:flex items-center gap-3 bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-container">
            <img src="${e?e.avatar:""}" class="w-7 h-7 rounded-full object-cover" />
            <div class="flex flex-col">
              <span class="text-xs font-bold text-on-surface leading-none">${e?e.name:""}</span>
              <span class="text-[10px] text-secondary">${e?e.roleType==="judge"?"Jurado":"Participante":""}</span>
            </div>
          </div>
          
          <button id="logoutBtn" class="p-2 rounded-full hover:bg-error/10 text-error transition-colors flex items-center justify-center group" title="Cerrar Sesión">
            <span class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">logout</span>
          </button>
        </div>

      </div>
    </header>
  `;const t=document.getElementById("logoutBtn");t&&t.addEventListener("click",()=>{XI(),TB("#login"),Ls()})}function ys(n){const e=document.getElementById("navbar");if(!e)return;e.querySelectorAll("nav a").forEach(r=>{r.classList.remove("text-primary","bg-surface-container","font-bold"),(r.id==="nav-"+n||n==="demo"&&r.id==="nav-home")&&r.classList.add("text-primary","bg-surface-container","font-bold")})}function Av(){const n=document.getElementById("footer");n&&(n.innerHTML=`
    <footer class="bg-surface-container-highest text-on-surface border-t border-surface-container-high mt-16 py-12">
      <div class="max-w-[1440px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded bg-white flex items-center justify-center overflow-hidden">
              <img src="/logo-prosur.png" alt="Prosur Logo" class="w-full h-full object-contain p-0.5" />
            </div>
            <span class="font-bold text-lg">PROSUR <span class="text-primary">AI Showcase</span></span>
          </div>
          <p class="text-sm text-secondary leading-relaxed">
            Plataforma corporativa de colaboración e innovación en Inteligencia Artificial del Grupo Prosur. Impulsando la biotecnología y sostenibilidad.
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider mb-4 text-on-surface">Unidades de Negocio</h4>
          <ul class="space-y-2 text-sm text-secondary">
            <li><a href="#home" class="hover:text-primary transition-colors">Prosur Food Ingredients</a></li>
            <li><a href="#home" class="hover:text-primary transition-colors">Prosur Biotech & Pharma</a></li>
            <li><a href="#home" class="hover:text-primary transition-colors">Prosur Operations & Logistics</a></li>
            <li><a href="#home" class="hover:text-primary transition-colors">Prosur Tech & Corporate</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider mb-4 text-on-surface">Recursos & Guías</h4>
          <ul class="space-y-2 text-sm text-secondary">
            <li><a href="#community" class="hover:text-primary transition-colors">Foro de Innovación AI</a></li>
            <li><a href="#profile" class="hover:text-primary transition-colors">Publicar Nueva Demo</a></li>
            <li><a href="javascript:void(0)" class="hover:text-primary transition-colors">Lineamientos Éticos de IA</a></li>
            <li><a href="javascript:void(0)" class="hover:text-primary transition-colors">Documentación de API</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider mb-4 text-on-surface">Soporte Corporativo</h4>
          <p class="text-sm text-secondary mb-3 leading-relaxed">
            ¿Tienes un modelo o proyecto de IA para compartir? Contacta con el equipo de I+D Corporativo.
          </p>
          <a href="mailto:innovation@prosur.com" class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <span class="material-symbols-outlined text-base">mail</span>
            innovation@prosur.com
          </a>
        </div>

      </div>

      <div class="max-w-[1440px] mx-auto px-4 md:px-12 mt-12 pt-6 border-t border-surface-container-high flex flex-col md:flex-row items-center justify-between text-xs text-secondary gap-4">
        <p>© 2026 Grupo Prosur. Todos los derechos reservados. Innovation Hub v2.5</p>
        <div class="flex items-center gap-6">
          <a href="javascript:void(0)" class="hover:underline">Privacidad</a>
          <a href="javascript:void(0)" class="hover:underline">Términos de Uso</a>
          <a href="javascript:void(0)" class="hover:underline">Seguridad Corporativa</a>
        </div>
      </div>
    </footer>
  `)}function Oh(){Pp(),Av(),Tv()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Oh):Oh();
//# sourceMappingURL=index-Bp8c6lpP.js.map
