(this.webpackJsonpisomorphic=this.webpackJsonpisomorphic||[]).push([[43],{1177:function(e,t,n){"use strict";n.r(t);n(244);var a=n(159),r=n(1),c=n.n(r),s=n(43),o=n(44),i=n(46),l=n(45),u=n(47),p=n(0),d=n.n(p),m=n(110),f=n.n(m),h=n(48),g=n(192),b=(n(647),n(595)),v=n(590),E=n(594),_=(n(592),n(596),n(593)),y=n(84),w=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={meta:{},current_page:1},n.showNotificationFrom=function(e){return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(200!==e.delete_role_status){t.next=5;break}return t.next=3,c.a.awrap(f()({title:"Good job!",text:"Role was deleted successfully!",icon:"success",closeOnClickOutside:!1}));case 3:t.sent&&n.props.resetStoreRole();case 5:case"end":return t.stop()}}))},n.getNewRolesWith=function(e){n.props.getRoles(e)},n.delete=function(e){return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e.user_count>0)){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,c.a.awrap(f()({title:"Are you sure you want to delete [".concat(e.name,"]"),type:"warning",buttons:["No","Yes, I am sure!"],dangerMode:!0}));case 4:t.sent&&n.props.deleteRole({slug:e.slug});case 6:case"end":return t.stop()}}))},n.edit=function(e){n.props.history.push("/role_edit_".concat(e.slug))},n}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.props.getRoles(1)}},{key:"componentWillReceiveProps",value:function(e){this.showNotificationFrom(e),this.setState({meta:e.meta,current_page:e.meta.current_page})}},{key:"render",value:function(){for(var e=this,t=[],n=1;n<=Math.ceil(this.state.meta.total/this.state.meta.per_page);n++)t.push(n);var r=t.map((function(t){var n=e.state.current_page===t?"active":"";if(1==t||t==e.state.meta.total||t>=e.state.current_page-2&&t<=e.state.current_page+2)return d.a.createElement("span",{key:t,className:n,onClick:function(){return e.getNewRolesWith(t)}},t)}));return d.a.createElement(E.a,null,d.a.createElement(_.a,null,d.a.createElement(b.a,null,d.a.createElement(v.a,null,d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-md-6"},d.a.createElement("h4",null,"All Roles")),d.a.createElement("div",{className:"col-md-6 text-right"},200===this.props.status&&!this.props.roles.length&&d.a.createElement(g.b,{className:"",to:"/dashboard/plan_add"},d.a.createElement("button",{className:"btn btn-sm btn-success",type:"button"},"Create Role")))),d.a.createElement("hr",null),d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-md-12"},d.a.createElement(a.a,{style:{width:"100%"}},d.a.createElement("table",{className:"table table-striped"},d.a.createElement("thead",null,d.a.createElement("tr",null,d.a.createElement("th",null,"S/N"),d.a.createElement("th",null,"Name"),d.a.createElement("th",null,"Permissions Count"),d.a.createElement("th",null,"Action"))),d.a.createElement("tbody",null,200===this.props.status&&this.props.roles.length&&this.props.roles.map((function(t){return d.a.createElement("tr",{key:t.id},d.a.createElement("td",null,t.id),d.a.createElement("td",null,d.a.createElement("div",{className:"tTitle"},d.a.createElement("div",{className:"head"},t.name),d.a.createElement("div",{className:"sub"},t.user_count," user(s)"))),d.a.createElement("td",null,t.permission_roles.length),d.a.createElement("td",null,d.a.createElement("span",{className:"action",onClick:function(){return e.delete(t)}},d.a.createElement("i",{className:"fa fa-trash"})),d.a.createElement("span",{className:"action",onClick:function(){return e.edit(t)}},d.a.createElement("i",{className:"fa fa-edit"}))))})))),d.a.createElement("div",{className:"pagination"},d.a.createElement("span",{onClick:function(){return e.getNewRolesWith(1)}},"\xab"),r,d.a.createElement("span",{onClick:function(){return e.getNewRolesWith(e.props.meta.last_page)}},"\xbb")))))))))}}]),t}(p.Component);t.default=Object(h.b)((function(e){return{meta:e.PlanReducer.meta,plans:e.PlanReducer.plans,status:e.PlanReducer.get_plans_status,delete_plan_status:e.PlanReducer.delete_plan_status}}),(function(e){return{getRoles:function(t){return e(Object(y.g)(t))},resetStoreRole:function(){return e(Object(y.j)())},deleteRole:function(t){return e(Object(y.a)(t))}}}))(w)},590:function(e,t,n){"use strict";var a=n(59),r=n(52),c=n(30);function s(){var e=Object(a.a)(["\n  width: 100%;\n  padding: 35px;\n  background-color: #ffffff;\n  border: 1px solid ",";\n  height: 100%;\n"]);return s=function(){return e},e}var o=r.c.div(s(),Object(c.palette)("border",0));t.a=o},591:function(e,t,n){e.exports={container:"Breadcrumb.component_container__2V5_E",item:"Breadcrumb.component_item__ZqqpH",itemTwo:"Breadcrumb.component_itemTwo__1JtzI"}},592:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(48),s=n(192),o=n(74),i=n(591),l=n.n(i),u=function(e){var t=e.links.map((function(e){return r.a.createElement(s.b,{to:e.url,className:[l.a.item,l.a.itemTwo].join(" "),key:e.url}," > ",e.name)}));return r.a.createElement("div",{className:"card-body bg-light "},r.a.createElement(s.b,{className:l.a.item,to:"/chose_role"},"Dashboard"),t)};u.defaultProps={links:[]};var p=Object(o.g)(Object(c.b)((function(e){return{active:e.ChoseRoleReducer.role}}))(u));n.d(t,"a",(function(){return p}))},596:function(e,t,n){"use strict";n(634);var a=n(633),r=n(40),c=n(1),s=n.n(c),o=n(43),i=n(44),l=n(46),u=n(45),p=n(47),d=n(0),m=n.n(d),f=n(110),h=n.n(f),g=n(74),b=n(137),v=n(584),E=n(585),_=Object(E.a)({form:"SearchForm"})((function(e){var t=e.onChangeHandler;return m.a.createElement("form",null,m.a.createElement(v.a,{name:"value",component:b.a,type:"text",placeholder:"Search",validate:[],onChange:function(e){t(e.target.value)}}))})),y=n(632),w=n.n(y),x=n(67),k=n(163),N=n(59),j=n(52),O=n(78);function S(){var e=Object(N.a)(["\n  \n  .pagination {\n    margin-top: 25px !important;\n  }\n\n  .pagination span {\n    cursor: pointer;\n    color: black;\n    float: left;\n    padding: 8px 16px;\n    text-decoration: none;\n    transition: background-color .3s;\n    border: 1px solid #ddd;\n  }\n\n  .pagination span.active {\n    background-color: #15974b;\n    color: white;\n    border: 1px solid #15974b;\n  }\n\n.center {\n  text-align: center;\n}\n.actions {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 10px;\n}\n.actions2 {\n  width: 50%;\n  margin: 15px auto;\n}\n\n.action {\n    opacity: 1;\n    display: block;\n    font-size: 12px;\n    cursor: pointer;\n    padding: 10px 10px;\n\n    color: #FFFFFF;\n    border-radius: 5px;\n    letter-spacing: 0.29px;\n    transition: all 0.3s ease 0s;\n    border: 1px solid transparent;\n\n    margin-bottom: 15px;\n}\n.delete {\n  opacity: .8;\n  background: #e43829;\n}\n.edit {\n  opacity: .8;\n  background: #ffca28;\n}\n.view {\n  opacity: .8;\n  background: #15974b;\n}\n.search {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n\n  padding: 5px 5px;\n  /* background: #eceeef; */\n  margin-bottom: 15px;\n}\n.field,\n.comparison {\n  width: 14%;\n}\n.form {\n  width: 30%;\n}\n.filter {\n  width: 10%;\n}\n.button {\n  width: 100%;\n  display: block;\n  background: #eceeef;\n  padding: 5px 5px;\n  border-radius: 5px;\n  text-align: center;\n  margin-top: 7px;\n}\n\n"]);return S=function(){return e},e}var R=j.c.div(S()),C=Object(O.a)(R),F=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,c=new Array(a),i=0;i<a;i++)c[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={data:[],per_page:20,last_page:0,loading:!0,total_pages:0,current_page:0,active_data:null,show_actions:!1,query:""},n.get=function(e){var t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.a.awrap(Object(x.a)("ohis:auth_token"));case 2:return t=n.sent,n.abrupt("return",fetch(k.a+e,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",AuthorizationHeader:"Bearer OSUN_1234567890987654321",AuthToken:t}}));case 4:case"end":return n.stop()}}))},n.handleSearch=function(e){var t,a,r,c;return s.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return t=n.props.columns.filter((function(e){return e.searchable})).map((function(e){return e.search_key})).join("*"),a="".concat(t,":").concat(e),o.next=4,s.a.awrap(n.get("".concat(n.props.url,"?search=").concat(a)));case 4:return r=o.sent,o.next=7,s.a.awrap(r.json());case 7:c=o.sent,n.reset(c);case 9:case"end":return o.stop()}}))},n.detectQueryString=function(e){return new RegExp(/\?.+=.*/g).test(e)},n.fetchData=function(e,t){var a,r,c;return s.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n.setState({loading:!0}),a=n.detectQueryString(e)?n.get("".concat(e,"&page=").concat(t)):n.get("".concat(e,"?page=").concat(t)),o.next=4,s.a.awrap(a);case 4:return r=o.sent,o.next=7,s.a.awrap(r.json());case 7:c=o.sent,n.reset(c);case 9:case"end":return o.stop()}}))},n.reset=function(e){var t,a,r,c=[];e.data?(e.data.map((function(e){return e.is_selected=!1,e})).map((function(e,t){e.key=e.id,c.push(e)})),t=e.meta.total,a=e.meta.last_page,r=e.meta.current_page):([],t=0,a=0,r=0),n.setState({data:c,loading:!1,total_pages:t,last_page:a,current_page:r})},n.getPaginated=function(e){n.fetchData(n.props.url,e)},n.selected=function(e){console.log(JSON.stringify(e));var t=[];n.state.data.map((function(t){return t.is_selected=!1,e.id===t.id&&(t.is_selected=!0),t})).map((function(e,n){e.key=e.id,t.push(e)})),n.setState({data:t,active_data:e,show_actions:!0},(function(){var e;return s.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:n.props.actions.length&&(e=n.props.actions.map((function(e,t){var a="action delete";return"edit"===e.type&&(a="action edit"),"view"===e.type&&(a="action view"),m.a.createElement("div",{key:t,className:a,onClick:function(){return n.handle(e)}},e.title)})),w()({content:m.a.createElement("div",null,m.a.createElement("h1",null,"Action List(s)"),m.a.createElement("div",{className:"actions2"},e)),buttons:!1}));case 1:case"end":return t.stop()}}))}))},n.delete=function(e,t){var a,c,o;return s.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return a=n.state.active_data[e],i.next=3,s.a.awrap(n.get("".concat(t).concat(a)));case 3:return c=i.sent,i.next=6,s.a.awrap(c.json());case 6:200===i.sent.status&&(o=Object(r.a)(n.state.data).filter((function(t){return a!==t[e]})),n.setState({data:o}));case 8:case"end":return i.stop()}}))},n.handle=function(e){var t,a,r,c,o;return s.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return t=e.type,a=e.url,r=e.key,i.next=3,s.a.awrap(h()({title:"Are you sure you want to ".concat(t),type:"warning",buttons:["No","Yes, I am sure!"]}));case 3:if(!i.sent){i.next=12;break}if("delete"===t&&n.delete(r,a),"edit"!==t){i.next=9;break}return c=n.state.active_data[r],i.abrupt("return",n.props.history.push("".concat(a).concat(c)));case 9:if("view"!==t){i.next=12;break}return o=n.state.active_data[r],i.abrupt("return",n.props.history.push("".concat(a).concat(o)));case 12:case"end":return i.stop()}}))},n.tableList=function(){if(n.state.data.length)return n.state.data.map((function(e){var t=m.a.createElement("i",{className:"fa fa-circle-thin","aria-hidden":"true"});return e.is_selected&&(t=m.a.createElement("i",{className:"fa fa-circle","aria-hidden":"true"})),m.a.createElement("tr",{key:e.id,onClick:function(){return n.selected(e)}},m.a.createElement("td",null,t),n.props.columns.map((function(t){return m.a.createElement("td",{key:t.key},e[t.key])})))}));var e=m.a.createElement("tr",null,m.a.createElement("td",{colSpan:n.props.columns.length+1,className:"center"},"No Records Found."));return n.state.loading&&(e=m.a.createElement("tr",null,m.a.createElement("td",{colSpan:n.props.columns.length+1,className:"center"},"Slow network, Loading..."))),m.a.createElement(m.a.Fragment,null,e)},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.fetchData(this.props.url,1)}},{key:"render",value:function(){for(var e=this,t=[],n=1;n<=Math.ceil(this.state.total_pages/this.state.per_page);n++)t.push(n);var r,c=t.map((function(t){var n=e.state.current_page===t?"active":"";if(1==t||t==e.state.total_pages||t>=e.state.current_page-2&&t<=e.state.current_page+2)return m.a.createElement("span",{key:t,className:n,onClick:function(){return e.getPaginated(t)}},t)}));return this.props.hideSearch||(r=m.a.createElement(_,{onChangeHandler:this.handleSearch})),m.a.createElement(m.a.Fragment,null,m.a.createElement(C,{className:"iosDatatableWrapper"},r,m.a.createElement(a.a,{onRow:function(t,n){return{onClick:function(n){e.selected(t)}}},columns:this.props.columns,dataSource:this.state.data,pagination:!1}),m.a.createElement("div",{className:"pagination"},m.a.createElement("span",{onClick:function(){return e.getPaginated(1)}},"\xab"),c,m.a.createElement("span",{onClick:function(){return e.getPaginated(e.props.last_page)}},"\xbb"))))}}]),t}(m.a.Component);F.defaultProps={hideSearch:!1};var P=Object(g.g)(F);n.d(t,"a",(function(){return P}))},646:function(e,t,n){e.exports={container:"Spinner.component_container__W-GWN",content:"Spinner.component_content__11MBV",message:"Spinner.component_message__3kFxw"}},647:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(646),s=n.n(c),o=function(e){var t=e.message;return r.a.createElement("div",{className:s.a.container},r.a.createElement("div",{className:s.a.content},r.a.createElement("i",{className:"fa fa-spinner fa-pulse fa-3x fa-fw"}),r.a.createElement("div",{className:s.a.message},t)))};o.defaultProps={message:"Loading"};var i=o;n.d(t,"a",(function(){return i}))}}]);
//# sourceMappingURL=43.c4f5924a.chunk.js.map