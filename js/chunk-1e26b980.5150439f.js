(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e26b980"],{1713:function(t,e,a){},"5695a":function(t,e,a){"use strict";var n=a("98d0"),s=a.n(n);s.a},60446:function(t,e,a){"use strict";var n=a("1713"),s=a.n(n);s.a},"90e9":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"already-owned-container"},[a("finalize-modal",{ref:"finalizeModal",attrs:{"domain-name":t.hostName,finalize:t.finalize}}),a("h3",[t._v(t._s(t.fullDomainName)+" "+t._s(t.$t("dapps.alreadyOwned"))+".")]),a("div",{staticClass:"content-container"},[a("p",{staticClass:"label"},[t._v(t._s(t.$t("dapps.labelHash"))+"("+t._s(t.hostName)+"):")]),a("p",{staticClass:"content"},[t._v(t._s(t.labelHash))])]),a("div",{staticClass:"content-container"},[a("p",{staticClass:"label"},[t._v(t._s(t.$t("dapps.nameHash"))+"("+t._s(t.fullDomainName)+"):")]),a("p",{staticClass:"content"},[t._v(t._s(t.nameHash))])]),a("div",{staticClass:"content-container"},[a("p",{staticClass:"label"},[t._v(t._s(t.$t("dapps.owner"))+":")]),a("p",{staticClass:"content"},[t._v(t._s(t.owner))])]),"0x"!=t.deedOwner?a("div",{staticClass:"content-container"},[a("p",{staticClass:"label"},[t._v(t._s(t.$t("dapps.deedOwner"))+":")]),a("p",{staticClass:"content"},[t._v(t._s(t.deedOwner))])]):t._e(),a("div",{staticClass:"content-container"},[a("p",{staticClass:"label"},[t._v(t._s(t.$t("dapps.resolverAddr"))+":")]),a("p",{staticClass:"content"},[t._v(t._s(t.resolverAddress))])]),a("div",{staticClass:"owner-options"},[t.deedOwner.toLowerCase()===t.account.address.toLowerCase()&&"0x0000000000000000000000000000000000000000"===t.owner?a("button",{staticClass:"finalize-button",on:{click:t.openFinalizeModal}},[t._v("\n      "+t._s(t.$t("dapps.finalize"))+"\n    ")]):t._e(),t.owner.toLowerCase()===t.account.address.toLowerCase()?a("button",{staticClass:"manage-button",on:{click:t.manageEns}},[t._v("\n      "+t._s(t.$t("dapps.manage"))+"\n    ")]):t._e()]),a("interface-bottom-text",{attrs:{"link-text":t.$t("interface.helpCenter"),question:t.$t("interface.haveIssues"),link:"https://kb.myetherwallet.com"}})],1)},s=[],i=a("cebc"),o=a("539d"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-modal",{ref:"finalize",staticClass:"bootstrap-modal-wide nopadding finalize-modal",attrs:{title:t.$t("dapps.finalize"),"hide-footer":"",centered:""}},[a("div",{staticClass:"finalize-modal-container"},[a("h3",[t._v("\n        "+t._s(t.$t("dapps.areYouFinalizing"))+" "),a("br"),t._v("\n        "+t._s(t.domainName)+".eth "+t._s(t.$t("dapps.areYouFinalizingCont"))+"\n      ")]),a("div",{staticClass:"button-container"},[a("button",{staticClass:"cancel",on:{click:t.close}},[t._v("\n          "+t._s(t.$t("common.cancel"))+"\n        ")]),a("button",{staticClass:"confirm",on:{click:t.finalize}},[t._v("\n          "+t._s(t.$t("dapps.confirm"))+"\n        ")])]),a("p",[t._v("\n        "+t._s(t.$t("dapps.nodeProvider"))+"\n        "),a("a",{attrs:{href:t.network.url,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.network.service))])])])])],1)},c=[],r=a("2f62"),d={props:{finalize:{type:Function,default:function(){}},domainName:{type:String,default:""}},computed:Object(i["a"])({},Object(r["b"])(["network"])),methods:{close:function(){this.$refs.finalize.hide()}}},p=d,u=(a("5695a"),a("2877")),f=Object(u["a"])(p,l,c,!1,null,"64dafcbc",null),_=f.exports,m={components:{"interface-bottom-text":o["a"],"finalize-modal":_},props:{labelHash:{type:String,default:""},nameHash:{type:String,default:""},owner:{type:String,default:""},deedOwner:{type:String,default:""},resolverAddress:{type:String,default:""},hostName:{type:String,default:""},tld:{type:String,default:""},finalize:{type:Function,default:function(){}}},data:function(){return{}},computed:Object(i["a"])({},Object(r["b"])(["account"]),{fullDomainName:function(){return"".concat(this.hostName,".").concat(this.tld)}}),mounted:function(){""===this.hostName&&this.$router.push("/interface/dapps/manage-ens")},methods:{openFinalizeModal:function(){this.$refs.finalizeModal.$refs.finalize.show()},manageEns:function(){this.$router.push("manage")}}},v=m,h=(a("60446"),Object(u["a"])(v,n,s,!1,null,"f7bc8250",null)),b=h.exports;a.d(e,"default",function(){return b})},"98d0":function(t,e,a){}}]);
//# sourceMappingURL=chunk-1e26b980.5150439f.js.map