(this["webpackJsonpsudoku-cheater"]=this["webpackJsonpsudoku-cheater"]||[]).push([[0],{16:function(e,a,t){e.exports={Board:"Board_Board__2AbGg",BoardWrapper:"Board_BoardWrapper__a7y7O",Container:"Board_Container__3pAPr",controlArea:"Board_controlArea__1bSdr",numberpad:"Board_numberpad__3X-ff"}},27:function(e,a,t){e.exports={Square:"Square_Square__2chgw",SquareInput:"Square_SquareInput__2R4JV",PotentialSquare:"Square_PotentialSquare__m5Rlt",NormalSquare:"Square_NormalSquare__2fDaJ"}},34:function(e,a,t){e.exports={App:"App_App__3Vcp-"}},35:function(e,a,t){e.exports={button:"NumberPad_button__1vYvZ"}},47:function(e,a,t){},55:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(12),o=t.n(c),i=(t(47),t(34)),u=t.n(i),l=t(8),s=t(17),d=t(26),j=t(16),v=t.n(j),h=t(27),b=t.n(h),f=t(2),p=function(e){var a=function(a){return e.square.id.toString()+"_"+a.toString()};return Object(f.jsx)("div",{className:b.a.Square,"data-x":e.square.row,"data-y":e.square.col,onClick:function(a){e.showHighLightWrapper(e.square.id)},onKeyDown:function(a){e.updateSquare(e.square.id,parseInt(a.key))},tabIndex:0,style:{backgroundColor:!0===e.square.showError?"#d91818":e.selectedSquareID===e.square.id?"#5797ff":1===e.square.enableHighLight?"#477acc":2===e.square.enableHighLight?"#BBDEFB":3===e.square.enableHighLight?"#E2EBF3":void 0},children:0===e.square.cur_val?Object(f.jsx)("div",{className:b.a.PotentialSquare,"data-x":e.square.row,"data-y":e.square.col,children:e.square.potential_vals.map((function(e,t){return e?Object(f.jsx)("span",{children:t+1},a(t)):Object(f.jsx)("span",{},a(t))}))}):Object(f.jsx)("div",{className:b.a.NormalSquare,children:e.square.cur_val})})},_=t(71),O=t(32),q=t.n(O),g=t(37),S=t.n(g),x=t(38),w=t.n(x),m=t(35),I=t.n(m),D=t(70),B=function(e){return Object(f.jsx)(D.a,{m:"2rem",className:I.a.button,onClick:function(){e.updateSquare(e.selectedSquareID,e.val)},variant:"contained",children:e.val})},C=function e(a,t,r,n){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[!0,!0,!0,!0,!0,!0,!0,!0,!0],i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,u=arguments.length>7&&void 0!==arguments[7]&&arguments[7];Object(d.a)(this,e),this.cur_val=c,this.potential_vals=o,this.enableHighLight=i,this.row=a,this.col=t,this.area=r,this.id=n,this.showError=u},L=function e(a,t,r,n,c){Object(d.a)(this,e),this.action=a,this.val=t,this.squareID=r,this.stepsID=n,this.pre_val=c},H=function(){var e=Object(r.useState)([]),a=Object(s.a)(e,2),t=a[0],n=a[1],c=Object(r.useState)([]),o=Object(s.a)(c,2),i=o[0],u=o[1],d=Object(r.useState)(0),j=Object(s.a)(d,2),h=j[0],b=j[1],O=Object(r.useState)(!1),g=Object(s.a)(O,2),x=g[0],m=g[1],I=Object(r.useState)(-1),D=Object(s.a)(I,2),H=D[0],N=D[1],k=function(){for(var e=Object(l.a)(t),a=0;a<t.length;++a)e[a].showError=!1;for(var r=function(a){var t=e[a];e.map((function(e){var a=!1;return e.id!==t.id&&e.cur_val===t.cur_val&&0!==t.cur_val&&(e.row!==t.row&&e.col!==t.col&&e.area!==t.area||(a=!0,e.showError=!0,t.showError=!0)),a||!1!==e.showError||(e.showError=!1),e}))},c=0;c<t.length;++c)r(c);n(e)},E=function(e,a){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1;if(-1!==e){var c=t[e],o=c.cur_val,i=!1;if(0===c.cur_val&&!0===x||1===r){c.potential_vals[a-1]=!c.potential_vals[a-1];var s=new L("setPotentialVal",a,e,h,o);-1===r&&(u((function(e){return[].concat(Object(l.a)(e),[s])})),b(h+1))}else if(0===c.cur_val&&!1===x||2===r)c.cur_val=a,i=!0;else if(c.cur_val>0&&!1===x)c.cur_val=a,i=!0;else{if(c.cur_val=0,-1===r){var d=new L("setCurVal",0,e,h,o);u((function(e){return[].concat(Object(l.a)(e),[d])}))}if(c.potential_vals[a-1]=!0,-1===r){var j=new L("setPotentialVal",a,e,h,o);u((function(e){return[].concat(Object(l.a)(e),[j])})),b(h+2)}}n(i?t.map((function(e){var t=e;if(e.id===c.id){if(-1===r){var n=new L("setCurVal",a,t.id,h,o);u((function(e){return[].concat(Object(l.a)(e),[n])})),b(h+1)}return c}if(e.row!==c.row&&e.col!==c.col&&e.area!==c.area||!0!==t.potential_vals[a-1])return e;if(t.potential_vals[a-1]=!1,-1===r){var i=new L("setPotentialVal",a,t.id,h,o);u((function(e){return[].concat(Object(l.a)(e),[i])})),b(h+1)}return t})):t.map((function(e){return e.id===c.id?c:e}))),A(e),k()}else P(a)},P=function(e){console.log(e);var a=Object(l.a)(t);console.log(a);for(var r=0;r<a.length;++r)a[r].enableHighLight=0,(a[r].cur_val===e||a[r].cur_val>0&&!0===a[r].potentialVals[e])&&(a[r].enableHighLight=1);n(a)},V=function(e,a,t,r,n){for(var c=0;c<e.length;++c)0!==a?e[c].cur_val===a?e[c].enableHighLight=1:0===e[c].cur_val&&!0===e[c].potential_vals[a-1]?e[c].enableHighLight=2:e[c].row!==t&&e[c].col!==r&&e[c].area!==n||(e[c].enableHighLight=3):e[c].row===t||e[c].col===r||e[c].area===n?e[c].enableHighLight=3:e[c].enableHighLight=0;return e},A=function(e){for(var a=t[e],r=Object(l.a)(t),c=0;c<r.length;++c)r[c].enableHighLight=0;if(r=V(r,a.cur_val,a.row,a.col,a.area),0!==a.cur_val)for(var o=0;o<r.length;++o)r[o].cur_val===a.cur_val&&(r=V(r,a.cur_val,a.row,a.col,a.area));n(r),N(e)},y=function(e){m(!x)};Object(r.useEffect)((function(){!function(){for(var e=0;e<9;++e)for(var a=function(a){var t,r,c=new C(e,a,(r=a,(t=e)<3&&r<3?1:t>=3&&t<6&&r<3?4:t>=6&&r<3?7:t<3&&r>=3&&r<6?2:t>=3&&t<6&&r>=3&&r<6?5:t>=6&&r>=3&&r<6?8:t<3&&r>=6?3:t>=3&&t<6&&r>=6?6:t>=6&&r>=6?9:void 0),9*e+a);n((function(e){return[].concat(Object(l.a)(e),[c])}))},t=0;t<9;++t)a(t)}()}),[]);return Object(f.jsxs)("div",{className:v.a.Board,children:[Object(f.jsx)("div",{}),Object(f.jsx)("div",{className:v.a.BoardWrapper,children:Object(f.jsx)("div",{className:v.a.Container,children:t.map((function(e){return Object(f.jsx)(p,{square:e,updateSquare:E,selectedSquareID:H,showHighLightWrapper:A},9*e.row+e.col)}))})}),Object(f.jsxs)("div",{className:v.a.controlArea,children:[Object(f.jsxs)("div",{children:[x?Object(f.jsx)(_.a,{color:"primary",onClick:y,children:Object(f.jsx)(q.a,{})}):Object(f.jsx)(_.a,{onClick:y,children:Object(f.jsx)(q.a,{})}),Object(f.jsx)(_.a,{onClick:function(e){if(0!==i.length){for(var a=Object(l.a)(i),t=a.length-1,r=a[a.length-1].stepsID,n=H;t>=0&&a[t].stepsID===r;)"setCurVal"===a[t].action?E(a[t].squareID,a[t].pre_val,0):"setPotentialVal"===a[t].action&&E(a[t].squareID,a[t].val,1),--t,a.pop(a.length-1);u(a),N(n)}},children:Object(f.jsx)(S.a,{})}),Object(f.jsx)(_.a,{onClick:function(e){N(-1),P(-1)},children:Object(f.jsx)(w.a,{})})]}),Object(f.jsxs)("div",{className:v.a.numberpad,children:[Object(f.jsx)(B,{val:1,selectedSquareID:H,updateSquare:E}),Object(f.jsx)(B,{val:2,selectedSquareID:H,updateSquare:E}),Object(f.jsx)(B,{val:3,selectedSquareID:H,updateSquare:E}),Object(f.jsx)(B,{val:4,selectedSquareID:H,updateSquare:E}),Object(f.jsx)(B,{val:5,selectedSquareID:H,updateSquare:E}),Object(f.jsx)(B,{val:6,selectedSquareID:H,updateSquare:E}),Object(f.jsx)(B,{val:7,selectedSquareID:H,updateSquare:E}),Object(f.jsx)(B,{val:8,selectedSquareID:H,updateSquare:E}),Object(f.jsx)(B,{val:9,selectedSquareID:H,updateSquare:E})]})]})]})},N=function(){return Object(f.jsx)(H,{})};var k=function(){return Object(f.jsx)("div",{className:u.a.App,children:Object(f.jsx)(N,{})})},E=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,72)).then((function(a){var t=a.getCLS,r=a.getFID,n=a.getFCP,c=a.getLCP,o=a.getTTFB;t(e),r(e),n(e),c(e),o(e)}))};o.a.render(Object(f.jsx)(n.a.StrictMode,{children:Object(f.jsx)(k,{})}),document.getElementById("root")),E()}},[[55,1,2]]]);
//# sourceMappingURL=main.f3378404.chunk.js.map