(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29267b4c"],{"55e2":function(e,s,t){"use strict";var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"verify-content-container"},[t("div",{staticClass:"send-form"},[t("div",{staticClass:"title-container"},[t("div",{staticClass:"title"},[t("h4",[e._v("Signature:")]),t("div",{staticClass:"copy-buttons"},[t("span",{on:{click:e.deleteInput}},[e._v(e._s(e.$t("common.clear")))]),t("span",{on:{click:e.copyToClipboard}},[e._v(e._s(e.$t("common.copy")))])])])]),t("div",{staticClass:"the-form signature"},[t("textarea",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:e.message,expression:"message"}],ref:"signature",staticClass:"custom-textarea-1",attrs:{name:"signature"},domProps:{value:e.message},on:{input:function(s){s.target.composing||(e.message=s.target.value)}}})]),t("div",[""!==e.message&&!0===e.showMessage?t("p",{staticClass:"success-message"},[e._v("\n        "+e._s(JSON.parse(e.message).address)+"\n        "+e._s(e.$t("interface.verifiedMessage"))+":\n        "),JSON.parse(e.message).msg.length>20?t("br"):e._e(),t("b",[e._v(e._s(JSON.parse(e.message).msg))])]):e._e(),e.errors.has("signature")?t("p",[e._v(e._s(e.errors.first("signature")))]):e._e()])]),t("div",{staticClass:"submit-button-container"},[t("div",{staticClass:"buttons"},[t("button",{class:[e.errors.has("signature")||""===e.message?"disabled":"","submit-button large-round-button-green-filled clickable"],on:{click:e.verifyMessage}},[e._v("\n        "+e._s(e.$t("common.verifyMessage"))+"\n      ")])])])])},n=[],i=t("f29f"),r=i["a"],o=(t("5b3d"),t("2877")),c=Object(o["a"])(r,a,n,!1,null,"70b69d08",null),u=c.exports;t.d(s,"a",function(){return u})},"5b3d":function(e,s,t){"use strict";var a=t("be01"),n=t.n(a);n.a},"83c8":function(e,s,t){"use strict";var a=t("e522"),n=t.n(a);n.a},be01:function(e,s,t){},bf19:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"verify-message-layout"},[t("div",{staticClass:"page-container"},[e._m(0),t("verify-message-input")],1)])},n=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"title-block"},[t("h2",[e._v("Verify Message")]),t("p",[e._v("\n        Customize actions, debug reveals, and more with this set of advance\n        tools. Please be mindful of the capabilities and limitations of these\n        tools before using.\n      ")])])}],i=t("55e2"),r={components:{"verify-message-input":i["a"]}},o=r,c=(t("83c8"),t("2877")),u=Object(c["a"])(o,a,n,!1,null,"64864646",null),l=u.exports;t.d(s,"default",function(){return l})},e522:function(e,s,t){},f29f:function(e,s,t){"use strict";(function(e){t("6b54"),t("a481");var a=t("cebc"),n=t("ce96"),i=t("2f62"),r=t("b671");s["a"]={props:{signature:{type:String,default:""}},data:function(){return{message:this.signature,showMessage:!1}},computed:Object(a["a"])({},Object(i["b"])(["web3"])),watch:{message:function(e){this.message=e},signature:function(e){this.message=e}},methods:{copyToClipboard:function(){this.$refs.signature.select(),document.execCommand("copy"),window.getSelection().removeAllRanges()},deleteInput:function(){this.showMessage=!1,this.message=""},verifyMessage:function(){try{var s=JSON.parse(this.message),t=Object(r["hashPersonalMessage"])(Object(r["toBuffer"])(s.msg)),a=e.from(s.sig.replace("0x",""),"hex");if(65!==a.length)return void n["d"].responseHandler("Something went wrong!",n["d"].ERROR);a[64]=0===a[64]||1===a[64]?a[64]+27:a[64],"1"===s.version&&(t=this.web3.utils.sha3(s.msg));var i=Object(r["ecrecover"])(t,a[64],a.slice(0,32),a.slice(32,64));s.address.replace("0x","")!==Object(r["pubToAddress"])(i).toString("hex")?(this.showMessage=!1,n["d"].responseHandler("Signer address is different from the derived address!",n["d"].ERROR)):this.showMessage=!0}catch(o){n["d"].responseHandler(o,n["d"].ERROR)}}}}}).call(this,t("1c35").Buffer)}}]);
//# sourceMappingURL=chunk-29267b4c.91b3bf74.js.map