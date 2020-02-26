(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{340:function(module,exports,__webpack_require__){__webpack_require__(341),__webpack_require__(487),__webpack_require__(761),module.exports=__webpack_require__(723)},405:function(module,exports){},63:function(module,__webpack_exports__,__webpack_require__){"use strict";var vue_esm=__webpack_require__(73),fastly=__webpack_require__(74),VUE_FASTLY_MODIFICATION_PROPS={blur:{type:Number,default:null,validator:function(v){return v>=1&&v<=1e3}},brightness:{type:Number,default:null,validator:function(v){return v>=-100&&v<=100}},contrast:{type:Number,default:null,validator:function(v){return v>=-100&&v<=100}},fit:{type:String,default:null,validator:function(v){return["bounds","cover","crop"].includes(v)}},format:{type:String,default:null,validator:function(v){return["png","jpg","pjpg","webp"].includes(v)}},height:{type:Number,default:null,validator:function(v){return v>=1&&v<=8192}},quality:{type:Number,default:null,validator:function(v){return v>=1&&v<=100}},saturation:{type:Number,default:null,validator:function(v){return v>=-100&&v<=100}},width:{type:Number,default:null,validator:function(v){return v>=1&&v<=8192}}},__assign=function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};__webpack_exports__.a=vue_esm.default.extend({functional:!0,props:__assign({alt:{type:String,default:null},domain:{type:String,default:null},src:{type:String,required:!0}},VUE_FASTLY_MODIFICATION_PROPS),render:function(h,context){var domain=context.props.domain||context.parent.$assetDomain,fastlyOptions={width:context.props.width,height:context.props.height,fit:context.props.fit,format:context.props.format,quality:context.props.quality,blur:context.props.blur,brightness:context.props.brightness,saturation:context.props.saturation,contrast:context.props.contrast};return h("img",Object.assign({},context.data,{attrs:{alt:context.props.alt,src:Object(fastly.a)(domain,context.props.src,fastlyOptions)}}))}})},723:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(138);module._StorybookPreserveDecorators=!0,Object(_storybook_vue__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(725)],module)}.call(this,__webpack_require__(724)(module))},725:function(module,exports,__webpack_require__){var map={"./components/image.stories.ts":726};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=725},726:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"withSrc",(function(){return withSrc})),__webpack_require__.d(__webpack_exports__,"withDimensions",(function(){return withDimensions})),__webpack_require__.d(__webpack_exports__,"withModifications",(function(){return withModifications}));var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(26),_image__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(63);__webpack_exports__.default={title:"SysAssetImage",component:_image__WEBPACK_IMPORTED_MODULE_1__.a};var withSrc=function(){return{components:{SysAssetImage:_image__WEBPACK_IMPORTED_MODULE_1__.a},props:{alt:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.text)("alt","A test image")},src:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.text)("src","/about/blake-1.jpg")}},template:'\n    <SysAssetImage\n      :alt="alt"\n      :src="src"\n    />\n  '}},withDimensions=function(){return{components:{SysAssetImage:_image__WEBPACK_IMPORTED_MODULE_1__.a},props:{fit:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.select)("fit",["bounds","cover","crop"],"crop")},height:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("height",400)},width:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("width",400)}},template:'\n    <SysAssetImage\n      src="/about/blake-1.jpg"\n      :fit="fit"\n      :height="height"\n      :width="width"\n    />\n  '}},withModifications=function(){return{components:{SysAssetImage:_image__WEBPACK_IMPORTED_MODULE_1__.a},props:{blur:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("blur",0,{min:0,max:9999})},brightness:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("brightness",0,{min:-100,max:100})},contrast:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("contrast",0,{min:-100,max:100})},quality:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("quality",75,{min:1,max:100})},saturation:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("saturation",0,{min:-100,max:100})}},template:'\n    <SysAssetImage\n      src="/about/blake-1.jpg"\n      :blur="blur == 0 ? null : blur"\n      :brightness="brightness"\n      :contrast="contrast"\n      :height="400"\n      :quality="quality"\n      :saturation="saturation"\n      :width="400"\n    />\n  '}}},74:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return imageUrl})),__webpack_require__.d(__webpack_exports__,"b",(function(){return imageUrlFactory}));var DEFAULT_FASTLY_OPTIONS={fit:"crop"};function imageUrl(root,image,options){var url=(root.endsWith("/")?root.substring(0,root.length-1):root)+"/"+(image.startsWith("/")?image.substring(1,image.length):image),query=function imageQuery(options){return null==options||Object.keys(options).length<1?"":Object.entries(Object.assign({},DEFAULT_FASTLY_OPTIONS,options)).filter((function(_a){return null!=_a[1]})).map((function(_a){var key=_a[0],value=_a[1];return[key.toLowerCase(),value]})).sort((function(_a,_b){return function stringComparator(a,b){return a<b?-1:a>b?1:0}(_a[0],_b[0])})).map((function(_a){var key=_a[0],value=_a[1];return encodeURIComponent(key)+"="+encodeURIComponent(value)})).join("&")}(options);return""===query?url:url+"?"+query}function imageUrlFactory(root){return function(image,options){return imageUrl(root,image,options)}}},761:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var components_namespaceObject={};__webpack_require__.r(components_namespaceObject),__webpack_require__.d(components_namespaceObject,"SysAssetImage",(function(){return components_image.a}));var vue=__webpack_require__(339),vue_default=__webpack_require__.n(vue),client=__webpack_require__(138),vue_esm=__webpack_require__(73),components_image=__webpack_require__(63),fastly=__webpack_require__(74);Object(client.addDecorator)(vue_default.a),function install(Vue,options){Vue.prototype.$assetDomain=options.domain,Vue.prototype.$assetUrl=fastly.b(options.domain),Object.keys(components_namespaceObject).forEach((function(componentName){Vue.component(componentName,components_namespaceObject[componentName])}))}(vue_esm.default,{domain:"https://assets.genesis76.com"})}},[[340,1,2]]]);
//# sourceMappingURL=main.5998077df41835e5f2a6.bundle.js.map