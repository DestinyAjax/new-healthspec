(this.webpackJsonpisomorphic=this.webpackJsonpisomorphic||[]).push([[42],{1178:function(e,t,a){"use strict";a.r(t);a(244);var n=a(159),r=a(1),s=a.n(r),i=a(43),o=a(44),c=a(46),l=a(45),m=a(47),u=a(0),p=a.n(u),d=a(110),b=a.n(d),f=a(243),h=a(48),_=a(192),E=a(595),v=a(590),y=a(594),R=(a(592),a(593)),g=a(785),S=a(230),j=a(84),N=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={submittingForm:!1},a.handleSubmit=function(e){a.setState({submittingForm:!0}),a.props.storeRole(e)},a.showNotification=function(e){return s.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(200!==e.status){t.next=6;break}return a.props.reset("RoleForm"),t.next=4,s.a.awrap(b()({title:"Good job!",text:"".concat(e.role.name," was created successfully!"),icon:"success",closeOnClickOutside:!1}));case 4:t.sent&&a.props.resetStoreRole();case 6:case"end":return t.stop()}}))},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.showNotification(e)}},{key:"componentDidMount",value:function(){this.props.getAllPermissions()}},{key:"render",value:function(){return p.a.createElement(y.a,null,p.a.createElement(R.a,null,p.a.createElement(E.a,null,p.a.createElement(v.a,null,p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"col-md-6"},p.a.createElement("h4",null,"Role Upload")),200===this.props.get_permissions_status&&p.a.createElement("div",{className:"col-md-6 text-right"},p.a.createElement(_.b,{className:"",to:"/dashboard/role_all"},p.a.createElement("button",{className:"btn btn-sm btn-success",type:"button"},"All Role")))),p.a.createElement("hr",null),p.a.createElement("div",{className:"row"},200===this.props.get_permissions_status&&p.a.createElement("div",{className:"col-md-12"},p.a.createElement(n.a,{style:{width:"100%"}},p.a.createElement(g.a,{onSubmit:this.handleSubmit,permissions:this.props.permissions,role_permissions:[],submittingForm:this.state.submittingForm,btnText:"Add"}))))))))}}]),t}(u.Component);t.default=Object(h.b)((function(e){return{role:e.RoleReducer.role,status:e.RoleReducer.store_role_status,message:e.RoleReducer.store_role_message,permissions:e.PermissionReducer.permissions,get_permissions_status:e.PermissionReducer.get_permissions_status}}),(function(e){return{reset:function(t){return e(Object(f.a)(t))},resetStoreRole:function(){return e(Object(j.j)())},storeRole:function(t){return e(Object(j.l)(t))},getAllPermissions:function(){return e(Object(S.a)())}}}))(N)},243:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(56),r=(a(7),n.a.arrayInsert,n.a.arrayMove,n.a.arrayPop,n.a.arrayPush,n.a.arrayRemove,n.a.arrayRemoveAll,n.a.arrayShift,n.a.arraySplice,n.a.arraySwap,n.a.arrayUnshift,n.a.autofill,n.a.blur,n.a.change,n.a.clearAsyncError,n.a.clearFields,n.a.clearSubmit,n.a.clearSubmitErrors,n.a.destroy,n.a.focus,n.a.initialize,n.a.registerField,n.a.reset);n.a.resetSection,n.a.setSubmitFailed,n.a.setSubmitSucceeded,n.a.startAsyncValidation,n.a.startSubmit,n.a.stopAsyncValidation,n.a.stopSubmit,n.a.submit,n.a.touch,n.a.unregisterField,n.a.untouch,n.a.updateSyncWarnings,n.a.updateSyncErrors},590:function(e,t,a){"use strict";var n=a(59),r=a(52),s=a(30);function i(){var e=Object(n.a)(["\n  width: 100%;\n  padding: 35px;\n  background-color: #ffffff;\n  border: 1px solid ",";\n  height: 100%;\n"]);return i=function(){return e},e}var o=r.c.div(i(),Object(s.palette)("border",0));t.a=o},591:function(e,t,a){e.exports={container:"Breadcrumb.component_container__2V5_E",item:"Breadcrumb.component_item__ZqqpH",itemTwo:"Breadcrumb.component_itemTwo__1JtzI"}},592:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(48),i=a(192),o=a(74),c=a(591),l=a.n(c),m=function(e){var t=e.links.map((function(e){return r.a.createElement(i.b,{to:e.url,className:[l.a.item,l.a.itemTwo].join(" "),key:e.url}," > ",e.name)}));return r.a.createElement("div",{className:"card-body bg-light "},r.a.createElement(i.b,{className:l.a.item,to:"/chose_role"},"Dashboard"),t)};m.defaultProps={links:[]};var u=Object(o.g)(Object(s.b)((function(e){return{active:e.ChoseRoleReducer.role}}))(m));a.d(t,"a",(function(){return u}))},759:function(e,t,a){e.exports={formContainer:"RoleForm.component_formContainer__1Ligp",permission:"RoleForm.component_permission__3nmHY",questionHeader:"RoleForm.component_questionHeader__12_ym",inlineGroup:"RoleForm.component_inlineGroup__1Pwgu",formGroup:"RoleForm.component_formGroup__2T-2t",buttonContainer:"RoleForm.component_buttonContainer__1kd2W",button:"RoleForm.component_button__sU5AB"}},785:function(e,t,a){"use strict";a(244);var n=a(159),r=a(40),s=a(43),i=a(44),o=a(46),c=a(45),l=a(47),m=a(0),u=a.n(m),p=a(137),d=a(120),b=a(584),f=a(585),h=a(759),_=a.n(h),E=a(160),v=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).state={permissions:[]},a.setPermissions=function(){var e=a.props.role_permissions.map((function(e){return e.permission.id})),t=a.props.permissions.map((function(t){return e.includes(t.id)?t.is_picked=!0:t.is_picked=!1,t}));a.setState({permissions:t})},a.permissionHandler=function(e,t){e.is_picked=!e.is_picked;var n=Object(r.a)(a.state.permissions);n[t]=e,a.setState({permissions:n})},a.handleSubmit=function(e){e.permissions=a.state.permissions.filter((function(e){return e.is_picked})).map((function(e){return e.id})),a.props.submit(e)},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.setPermissions()}},{key:"render",value:function(){var e=this,t=this.props,a=t.handleSubmit,r=t.pristine,s=t.invalid,i=t.btnText,o=this.state.permissions.map((function(t,a){var n=u.a.createElement("i",{className:"fa fa-circle-o","aria-hidden":"true"});return t.is_picked&&(n=u.a.createElement("i",{className:"fa fa-circle","aria-hidden":"true"})),u.a.createElement("tr",{key:t.id,onClick:function(){return e.permissionHandler(t,a)}},u.a.createElement("td",null,n),u.a.createElement("td",null,t.name),u.a.createElement("td",null,t.url),u.a.createElement("td",null,t.description))}));return u.a.createElement("form",{onSubmit:a(this.handleSubmit)},u.a.createElement(n.a,{style:{width:"100%"}},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-md-12"},u.a.createElement(b.a,{name:"name",component:p.a,type:"text",label:"Name",validate:[E.h]}))),u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-md-12"},u.a.createElement("div",{className:_.a.questionHeader},"Permissions"),u.a.createElement("div",null,u.a.createElement("table",null,u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Status"),u.a.createElement("th",null,"Name"),u.a.createElement("th",null,"Url"),u.a.createElement("th",null,"Description"))),u.a.createElement("tbody",null,o)))))),u.a.createElement("div",{className:_.a.buttonContainer},u.a.createElement("div",{className:_.a.button},u.a.createElement(d.a,{disabled:s||r},i))))}}]),t}(u.a.Component),y=Object(f.a)({form:"RoleForm"})(v);a.d(t,"a",(function(){return y}))}}]);
//# sourceMappingURL=42.dffe4f21.chunk.js.map