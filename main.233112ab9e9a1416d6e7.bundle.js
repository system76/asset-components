(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{140:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return VUE_FASTLY_MODIFICATION_PROPS}));var VUE_FASTLY_MODIFICATION_PROPS={blur:{type:Number,default:void 0,validator:function(v){return v>=1&&v<=1e3}},brightness:{type:Number,default:void 0,validator:function(v){return v>=-100&&v<=100}},contrast:{type:Number,default:void 0,validator:function(v){return v>=-100&&v<=100}},fit:{type:String,default:void 0,validator:function(v){return["bounds","cover","crop"].includes(v)}},format:{type:String,default:void 0,validator:function(v){return["png","jpg","pjpg","webp"].includes(v)}},height:{type:Number,default:void 0,validator:function(v){return v>=1&&v<=8192}},quality:{type:Number,default:void 0,validator:function(v){return v>=1&&v<=100}},saturation:{type:Number,default:void 0,validator:function(v){return v>=-100&&v<=100}},width:{type:Number,default:void 0,validator:function(v){return v>=1&&v<=8192}}}},342:function(module,exports,__webpack_require__){__webpack_require__(343),__webpack_require__(489),__webpack_require__(764),module.exports=__webpack_require__(725)},407:function(module,exports){},49:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return imageUrl})),__webpack_require__.d(__webpack_exports__,"b",(function(){return imageUrlFactory}));var __spreadArrays=function(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;var r=Array(s),k=0;for(i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r},DEFAULT_FASTLY_OPTIONS={fit:"crop"};function imageUrl(root,image,options){var url=(root.endsWith("/")?root.substring(0,root.length-1):root)+"/"+(image.startsWith("/")?image.substring(1,image.length):image),query=function imageQuery(options){return null==options||Object.keys(options).length<1?"":[DEFAULT_FASTLY_OPTIONS,options].map((function(obj){return Object.entries(obj)})).reduce((function(a,b){return __spreadArrays(a,b)}),[]).filter((function(_a){return null!=_a[1]})).reverse().filter((function(_a,i,a){var key=_a[0];return a.findIndex((function(_a){return _a[0]===key}))===i})).map((function(_a){var key=_a[0],value=_a[1];return[key.toLowerCase(),value]})).sort((function(_a,_b){return function stringComparator(a,b){return a<b?-1:a>b?1:0}(_a[0],_b[0])})).map((function(_a){var key=_a[0],value=_a[1];return encodeURIComponent(key)+"="+encodeURIComponent(value)})).join("&")}(options);return""===query?url:url+"?"+query}function imageUrlFactory(root){return function(image,options){return imageUrl(root,image,options)}}},65:function(module,__webpack_exports__,__webpack_require__){"use strict";var vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(58),_helpers_fastly__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(49),_helpers_vue__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(140),__assign=function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};__webpack_exports__.a=vue__WEBPACK_IMPORTED_MODULE_0__.default.extend({name:"SysAssetImage",functional:!0,props:__assign({alt:{type:String,default:void 0},domain:{type:String,default:void 0},src:{type:String,required:!0}},_helpers_vue__WEBPACK_IMPORTED_MODULE_2__.a),render:function(h,context){var domain=context.props.domain||context.parent.$assetDomain,fastlyOptions={width:context.props.width,height:context.props.height,fit:context.props.fit,format:context.props.format,quality:context.props.quality,blur:context.props.blur,brightness:context.props.brightness,saturation:context.props.saturation,contrast:context.props.contrast};return h("img",Object.assign({},context.data,{attrs:{alt:context.props.alt,src:Object(_helpers_fastly__WEBPACK_IMPORTED_MODULE_1__.a)(domain,context.props.src,fastlyOptions)}}))}})},66:function(module,__webpack_exports__,__webpack_require__){"use strict";var vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(58),_helpers_fastly__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(49),_helpers_vue__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(140),__assign=function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};__webpack_exports__.a=vue__WEBPACK_IMPORTED_MODULE_0__.default.extend({name:"SysProductThumbnail",functional:!0,props:__assign({domain:{type:String,default:void 0},product:{type:[String,Object],required:!0}},_helpers_vue__WEBPACK_IMPORTED_MODULE_2__.a),render:function(h,context){var productModel="string"==typeof context.props.product?context.props.product:context.props.product.model,productName="string"!=typeof context.props.product?context.props.product.name:null,imageAlt=null!=productName?productName+" ("+productModel+") thumbnail":productModel+" thumbnail",domain=context.props.domain||context.parent.$assetDomain,path="/products/"+productModel+"/thumb.png",fastlyOptions={width:context.props.width||300,height:context.props.height||300,fit:context.props.fit,format:context.props.format,quality:context.props.quality,blur:context.props.blur,brightness:context.props.brightness,saturation:context.props.saturation,contrast:context.props.contrast};return h("picture",context.data,[h("source",{attrs:{src:Object(_helpers_fastly__WEBPACK_IMPORTED_MODULE_1__.a)(domain,path,__assign(__assign({},fastlyOptions),{format:"webp"})),type:"image/webp"}}),h("img",{attrs:{alt:imageAlt,src:Object(_helpers_fastly__WEBPACK_IMPORTED_MODULE_1__.a)(domain,path,fastlyOptions)}})])}})},725:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(139);module._StorybookPreserveDecorators=!0,Object(_storybook_vue__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(727)],module)}.call(this,__webpack_require__(726)(module))},727:function(module,exports,__webpack_require__){var map={"./components/image.stories.ts":728,"./components/product-thumbnail.stories.ts":763};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=727},728:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"withSrc",(function(){return withSrc})),__webpack_require__.d(__webpack_exports__,"withDimensions",(function(){return withDimensions})),__webpack_require__.d(__webpack_exports__,"withModifications",(function(){return withModifications}));var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(13),_image__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(65);__webpack_exports__.default={title:"SysAssetImage",component:_image__WEBPACK_IMPORTED_MODULE_1__.a};var withSrc=function(){return{components:{SysAssetImage:_image__WEBPACK_IMPORTED_MODULE_1__.a},props:{alt:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.text)("alt","A test image")},src:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.text)("src","/about/blake-1.jpg")}},template:'\n    <SysAssetImage\n      :alt="alt"\n      :src="src"\n    />\n  '}},withDimensions=function(){return{components:{SysAssetImage:_image__WEBPACK_IMPORTED_MODULE_1__.a},props:{fit:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.select)("fit",["bounds","cover","crop"],"crop")},height:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("height",400)},width:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("width",400)}},template:'\n    <SysAssetImage\n      src="/about/blake-1.jpg"\n      :fit="fit"\n      :height="height"\n      :width="width"\n    />\n  '}},withModifications=function(){return{components:{SysAssetImage:_image__WEBPACK_IMPORTED_MODULE_1__.a},props:{blur:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("blur",0,{min:0,max:9999})},brightness:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("brightness",0,{min:-100,max:100})},contrast:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("contrast",0,{min:-100,max:100})},quality:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("quality",75,{min:1,max:100})},saturation:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("saturation",0,{min:-100,max:100})}},template:'\n    <SysAssetImage\n      src="/about/blake-1.jpg"\n      :blur="blur == 0 ? null : blur"\n      :brightness="brightness"\n      :contrast="contrast"\n      :height="400"\n      :quality="quality"\n      :saturation="saturation"\n      :width="400"\n    />\n  '}}},763:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"withModel",(function(){return withModel})),__webpack_require__.d(__webpack_exports__,"withProduct",(function(){return withProduct})),__webpack_require__.d(__webpack_exports__,"withSize",(function(){return withSize}));var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(13),_product_thumbnail__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(66);__webpack_exports__.default={title:"SysProductThumbnail",component:_product_thumbnail__WEBPACK_IMPORTED_MODULE_1__.a};var withModel=function(){return{components:{SysProductThumbnail:_product_thumbnail__WEBPACK_IMPORTED_MODULE_1__.a},props:{product:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.text)("product","thelio-r1")}},template:'\n    <SysProductThumbnail\n      :product="product"\n    />\n  '}},withProduct=function(){return{components:{SysProductThumbnail:_product_thumbnail__WEBPACK_IMPORTED_MODULE_1__.a},props:{product:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.object)("product",{name:"Thelio AMD",model:"thelio-r1"})}},template:'\n    <SysProductThumbnail\n      :product="product"\n    />\n  '}},withSize=function(){return{components:{SysProductThumbnail:_product_thumbnail__WEBPACK_IMPORTED_MODULE_1__.a},props:{height:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("height",300)},width:{default:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_0__.number)("width",300)}},template:'\n    <SysProductThumbnail\n      product="thelio-r1"\n      :height="height"\n      :width="width"\n    />\n  '}}},764:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var components_namespaceObject={};__webpack_require__.r(components_namespaceObject),__webpack_require__.d(components_namespaceObject,"SysAssetImage",(function(){return components_image.a})),__webpack_require__.d(components_namespaceObject,"SysProductThumbnail",(function(){return product_thumbnail.a}));var vue=__webpack_require__(341),vue_default=__webpack_require__.n(vue),client=__webpack_require__(139),vue_esm=__webpack_require__(58),components_image=__webpack_require__(65),product_thumbnail=__webpack_require__(66),fastly=__webpack_require__(49);Object(client.addDecorator)(vue_default.a),function install(Vue,options){Vue.prototype.$assetDomain=options.domain,Vue.prototype.$assetUrl=fastly.b(options.domain),Object.keys(components_namespaceObject).forEach((function(componentName){Vue.component(componentName,components_namespaceObject[componentName])}))}(vue_esm.default,{domain:"https://assets.genesis76.com"})}},[[342,1,2]]]);
//# sourceMappingURL=main.233112ab9e9a1416d6e7.bundle.js.map