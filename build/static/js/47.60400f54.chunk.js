(this.webpackJsonpisomorphic=this.webpackJsonpisomorphic||[]).push([[47],{1200:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(43),s=n(44),o=n(46),l=n(45),i=n(47),m=n(0),u=n.n(m),d=n(110),p=n.n(d),f=n(48),b=n(595),h=n(590),v=n(594),E=n(682),_=n(592),y=n(151),g=n(593),N=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(n=Object(o.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(s)))).navigateToBeneficiary=function(e){},n.showNotificationFrom=function(e){return r.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(200!==e.delete_beneficiary_status){t.next=5;break}return t.next=3,r.a.awrap(p()({title:"Good job!",text:"Beneficiary deleted successfully!",icon:"success",closeOnClickOutside:!1}));case 3:t.sent&&n.props.resetStoreBeneficiary();case 5:case"end":return t.stop()}}))},n}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.props.getDependants(this.props.active.id)}},{key:"componentWillReceiveProps",value:function(e){this.showNotificationFrom(e)}},{key:"render",value:function(){return u.a.createElement(v.a,null,u.a.createElement(g.a,null,u.a.createElement(b.a,null,u.a.createElement(h.a,null,u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-md-6"},u.a.createElement("h4",null,"All Dependants")),u.a.createElement("div",{className:"col-md-12"},u.a.createElement(_.a,null))),u.a.createElement("hr",null),u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-md-12"},200===this.props.status&&!this.props.dependants.length&&u.a.createElement("div",{className:"text-center"},u.a.createElement(E.a,{message:"No dependants created yet"})),200===this.props.status&&this.props.dependants.length&&u.a.createElement("div",{className:"card card-body table-responsive-sm"},u.a.createElement("table",{className:"table table-striped"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"S/N"),u.a.createElement("th",null,"Name"))),u.a.createElement("tbody",null,this.props.dependants.map((function(e){return u.a.createElement("tr",{key:e.id},u.a.createElement("td",null,e.id),u.a.createElement("td",null,e.dependent.first_name," ",e.dependent.middle_name," ",e.dependent.last_name))})))))))))))}}]),t}(m.Component);t.default=Object(f.b)((function(e){return{active:e.ChoseRoleReducer.role,dependants:e.DependantReducer.dependants,status:e.DependantReducer.get_dependants_status}}),(function(e){return{getDependants:function(t){return e(Object(y.a)(t))}}}))(N)},590:function(e,t,n){"use strict";var a=n(59),r=n(52),c=n(30);function s(){var e=Object(a.a)(["\n  width: 100%;\n  padding: 35px;\n  background-color: #ffffff;\n  border: 1px solid ",";\n  height: 100%;\n"]);return s=function(){return e},e}var o=r.c.div(s(),Object(c.palette)("border",0));t.a=o},591:function(e,t,n){e.exports={container:"Breadcrumb.component_container__2V5_E",item:"Breadcrumb.component_item__ZqqpH",itemTwo:"Breadcrumb.component_itemTwo__1JtzI"}},592:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(48),s=n(192),o=n(74),l=n(591),i=n.n(l),m=function(e){var t=e.links.map((function(e){return r.a.createElement(s.b,{to:e.url,className:[i.a.item,i.a.itemTwo].join(" "),key:e.url}," > ",e.name)}));return r.a.createElement("div",{className:"card-body bg-light "},r.a.createElement(s.b,{className:i.a.item,to:"/chose_role"},"Dashboard"),t)};m.defaultProps={links:[]};var u=Object(o.g)(Object(c.b)((function(e){return{active:e.ChoseRoleReducer.role}}))(m));n.d(t,"a",(function(){return u}))},678:function(e,t,n){e.exports={container:"EmptyState.component_container__24MCK",content:"EmptyState.component_content__2S8fd",message:"EmptyState.component_message___WVjs"}},682:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(678),s=n.n(c),o=function(e){var t=e.message;return r.a.createElement("div",{className:s.a.container},r.a.createElement("div",{className:s.a.content},r.a.createElement("div",{className:s.a.message},t)))};o.defaultProps={message:"Data is empty"};var l=o;n.d(t,"a",(function(){return l}))}}]);
//# sourceMappingURL=47.60400f54.chunk.js.map