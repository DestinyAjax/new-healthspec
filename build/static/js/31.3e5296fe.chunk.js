(this.webpackJsonpisomorphic=this.webpackJsonpisomorphic||[]).push([[31],{1205:function(e,t,a){"use strict";a.r(t);var n=a(43),r=a(44),c=a(46),i=a(45),l=a(47),s=a(0),o=a.n(s),m=a(48),u=a(595),p=a(590),d=a(594),f=a(790),_=a(682),v=a(592),E=a(593),g=a(97),b=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),s=0;s<r;s++)l[s]=arguments[s];return(a=Object(c.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).state={meta:{},current_page:1},a.getNewPlansWith=function(e){a.props.getCompanyBeneficiary({slug:a.props.active.organization_profile.slug,page_number:e})},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.props.getCompanyBeneficiary({slug:this.props.active.organization_profile.slug,page_number:1})}},{key:"componentWillReceiveProps",value:function(e){this.setState({meta:e.meta,current_page:e.meta.current_page})}},{key:"render",value:function(){for(var e=this,t=[],a=1;a<=Math.ceil(this.state.meta.total/this.state.meta.per_page);a++)t.push(a);var n=t.map((function(t){var a=e.state.current_page===t?"active":"";if(1===t||t===e.state.meta.total||t>=e.state.current_page-2&&t<=e.state.current_page+2)return o.a.createElement("span",{key:t,className:a,onClick:function(){return e.getNewPlansWith(t)}},t)}));return o.a.createElement(d.a,null,o.a.createElement(E.a,null,o.a.createElement(u.a,null,o.a.createElement(p.a,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-6"},o.a.createElement("h4",null,"All Beneficiaries")),o.a.createElement("div",{className:"col-md-6 text-right"},o.a.createElement(v.a,{links:[{url:"/dashboard/company_my_beneficiary",name:"Enrollees"}]}))),o.a.createElement("hr",null),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-12"},200===this.props.status&&!this.props.company_beneficiaries.length&&o.a.createElement("div",{className:"text-center"},o.a.createElement(_.a,{message:"No beneficiary created yet"})),200===this.props.status&&this.props.company_beneficiaries.length&&o.a.createElement("div",{className:"card card-body table-responsive"},o.a.createElement("table",{className:"table table-striped"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Name"),o.a.createElement("th",null,"Provider"),o.a.createElement("th",null,"Policy"),o.a.createElement("th",null,"Status"),o.a.createElement("th",null,"Dependants"))),o.a.createElement("tbody",null,this.props.company_beneficiaries.map((function(e){return o.a.createElement("tr",{key:e.beneficiary.id},o.a.createElement("td",null,o.a.createElement("div",{className:"name"},o.a.createElement("div",{className:"tImage"},o.a.createElement("img",{src:e.role_user.profile.picture})),o.a.createElement("div",{className:"tTitle"},o.a.createElement("div",{className:"head"},e.beneficiary.first_name," ",e.beneficiary.middle_name," ",e.beneficiary.last_name),o.a.createElement("div",{className:"sub"},e.beneficiary.enrollee_id)))),o.a.createElement("td",null,o.a.createElement("div",{className:"name"},o.a.createElement("div",{className:"tImage"},o.a.createElement("img",{src:e.role_user.organization_profile.logo})),o.a.createElement("div",{className:"tTitle"},o.a.createElement("div",{className:"head"},e.role_user.organization_profile.name),o.a.createElement("div",{className:"sub"},e.role_user.organization_profile.code)))),o.a.createElement("td",null,e.policy.name),o.a.createElement("td",null,o.a.createElement(f.a,{status:e.role_user.is_active})),o.a.createElement("td",null,e.role_user.beneficiary_dependents.length))})),o.a.createElement("div",{className:"pagination"},o.a.createElement("span",{onClick:function(){return e.getNewPlansWith(1)}},"\xab"),n,o.a.createElement("span",{onClick:function(){return e.getNewPlansWith(e.props.meta.last_page)}},"\xbb")))))))))))}}]),t}(s.Component);t.default=Object(m.b)((function(e){return{active:e.ChoseRoleReducer.role,meta:e.OrganizationProfileReducer.company_my_beneficiary_meta,status:e.OrganizationProfileReducer.get_company_beneficiary_status,company_beneficiaries:e.OrganizationProfileReducer.company_beneficiaries}}),(function(e){return{getCompanyBeneficiary:function(t){return e(Object(g.f)(t))}}}))(b)},590:function(e,t,a){"use strict";var n=a(59),r=a(52),c=a(30);function i(){var e=Object(n.a)(["\n  width: 100%;\n  padding: 35px;\n  background-color: #ffffff;\n  border: 1px solid ",";\n  height: 100%;\n"]);return i=function(){return e},e}var l=r.c.div(i(),Object(c.palette)("border",0));t.a=l},591:function(e,t,a){e.exports={container:"Breadcrumb.component_container__2V5_E",item:"Breadcrumb.component_item__ZqqpH",itemTwo:"Breadcrumb.component_itemTwo__1JtzI"}},592:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(48),i=a(192),l=a(74),s=a(591),o=a.n(s),m=function(e){var t=e.links.map((function(e){return r.a.createElement(i.b,{to:e.url,className:[o.a.item,o.a.itemTwo].join(" "),key:e.url}," > ",e.name)}));return r.a.createElement("div",{className:"card-body bg-light "},r.a.createElement(i.b,{className:o.a.item,to:"/chose_role"},"Dashboard"),t)};m.defaultProps={links:[]};var u=Object(l.g)(Object(c.b)((function(e){return{active:e.ChoseRoleReducer.role}}))(m));a.d(t,"a",(function(){return u}))},678:function(e,t,a){e.exports={container:"EmptyState.component_container__24MCK",content:"EmptyState.component_content__2S8fd",message:"EmptyState.component_message___WVjs"}},682:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(678),i=a.n(c),l=function(e){var t=e.message;return r.a.createElement("div",{className:i.a.container},r.a.createElement("div",{className:i.a.content},r.a.createElement("div",{className:i.a.message},t)))};l.defaultProps={message:"Data is empty"};var s=l;a.d(t,"a",(function(){return s}))},769:function(e,t,a){e.exports={active:"Status.component_active__2GLCX",inactive:"Status.component_inactive__fGdMT"}},790:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(769),i=a.n(c),l=function(e){var t=e.status,a=0===t||"INACTIVE"===t?r.a.createElement("div",{className:i.a.inactive},"Inactive"):r.a.createElement("div",{className:i.a.active},"Active");return r.a.createElement(r.a.Fragment,null,a)};a.d(t,"a",(function(){return l}))}}]);
//# sourceMappingURL=31.3e5296fe.chunk.js.map