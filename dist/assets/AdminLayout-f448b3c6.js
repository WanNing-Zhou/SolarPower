import{d as h,u as g,r as x,b as o,e as s,j as d,g as p,f as e,a as t,k,p as L,i as C,_ as v,l as w,F as S,q as $,c as B,x as H,h as V,v as D}from"./index-fd38cc11.js";import{_ as N}from"./UpdatePassword.vue_vue_type_script_setup_true_lang-087acc1b.js";import{l as A}from"./logout-50fdb21d.js";import"./user-8ed530fc.js";const b=l=>(L("data-v-f7342301"),l=l(),C(),l),F={class:"header"},I=b(()=>p("div",{class:"left"},"分布式光伏电站发电量检测管理系统后台",-1)),O=b(()=>p("div",null,"操作",-1)),P={key:0,class:"option-box"},M=h({__name:"LayoutHeader",setup(l){g();const a=x(!1),_=x(!1),i=()=>{_.value=!0},c=async()=>{await A()};return(u,n)=>{const m=o("el-menu-item"),y=o("el-menu");return s(),d("div",F,[I,p("div",{class:"right",onClick:n[0]||(n[0]=f=>a.value=!a.value)},[O,a.value?(s(),d("div",P,[e(y,null,{default:t(()=>[e(m,null,{default:t(()=>[p("div",{onClick:i},"修改密码")]),_:1}),e(m,null,{default:t(()=>[p("div",{onClick:c},"登出")]),_:1})]),_:1})])):k("",!0)]),e(N,{visible:_.value,"onUpdate:visible":n[1]||(n[1]=f=>_.value=f)},null,8,["visible"])])}}});const U=v(M,[["__scopeId","data-v-f7342301"]]),j={class:"side-layout"},q=h({__name:"LayoutSide",setup(l){w();const a=[{label:"用户管理",to:"user-ctrl",icon:"UserFilled"},{label:"公司管理",to:"company-ctrl",icon:"OfficeBuilding"},{label:"电站管理",to:"point-ctrl",icon:"Place"}],_=(c,u)=>{},i=(c,u)=>{};return(c,u)=>{const n=o("el-icon"),m=o("router-link"),y=o("el-menu-item"),f=o("el-menu");return s(),d("div",j,[e(f,{"background-color":"#0B2D4D","text-color":"#ffffff","active-text-color":"#ffd04b","default-active":a[0].label,onOpen:_,onClose:i},{default:t(()=>[(s(),d(S,null,$(a,r=>e(y,{index:r.label},{default:t(()=>[e(n,null,{default:t(()=>[r.icon?(s(),B(H(r.icon),{key:0})):k("",!0)]),_:2},1024),e(m,{style:{width:"100%"},class:"menu-item",to:"/admin/"+r.to+"/"},{default:t(()=>[V(D(r.label),1)]),_:2},1032,["to"])]),_:2},1032,["index"])),64))]),_:1},8,["default-active"])])}}});const E=v(q,[["__scopeId","data-v-c2c50d17"]]);const R={},T={class:"main-layout"};function z(l,a){const _=o("router-view");return s(),d("div",T,[e(_)])}const G=v(R,[["render",z],["__scopeId","data-v-bdc2e10a"]]),J={class:"admin-layout"},K=h({__name:"AdminLayout",setup(l){return(a,_)=>{const i=o("el-header"),c=o("el-aside"),u=o("el-main"),n=o("el-container");return s(),d("section",J,[e(n,null,{default:t(()=>[e(i,null,{default:t(()=>[e(U)]),_:1}),e(n,null,{default:t(()=>[e(c,{style:{"background-color":"white"},width:"240px"},{default:t(()=>[e(E)]),_:1}),e(n,null,{default:t(()=>[e(u,null,{default:t(()=>[e(G)]),_:1})]),_:1})]),_:1})]),_:1})])}}});const Z=v(K,[["__scopeId","data-v-df30582a"]]);export{Z as default};
