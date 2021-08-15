(this["webpackJsonpsudoku-cheater"]=this["webpackJsonpsudoku-cheater"]||[]).push([[0],{14:function(e,a,t){e.exports={Board:"Board_Board__2AbGg",BoardWrapper:"Board_BoardWrapper__a7y7O",Container:"Board_Container__3pAPr",controlArea:"Board_controlArea__1bSdr",controlAreaButtons:"Board_controlAreaButtons__1tLQD",numberpad:"Board_numberpad__3X-ff"}},30:function(e,a,t){e.exports={Square:"Square_Square__2chgw",SquareInput:"Square_SquareInput__2R4JV",PotentialSquare:"Square_PotentialSquare__m5Rlt",NormalSquare:"Square_NormalSquare__2fDaJ"}},38:function(e,a,t){e.exports={App:"App_App__3Vcp-"}},39:function(e,a,t){e.exports={button:"NumberPad_button__1vYvZ"}},41:function(e,a,t){},55:function(e,a,t){},74:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(13),o=t.n(c),i=(t(55),t(38)),l=t.n(i),u=t(9),s=t(10),j=t(29),d=t(14),v=t.n(d),h=t(30),b=t.n(h),f=t(2),O=function(e){var a=function(a){return e.square.id.toString()+"_"+a.toString()};return Object(f.jsx)("div",{className:b.a.Square,"data-x":e.square.row,"data-y":e.square.col,onClick:function(a){e.showHighLightWrapper(e.square.id)},onKeyDown:function(a){e.updateSquare(e.square.id,parseInt(a.key))},tabIndex:0,style:{backgroundColor:!0===e.square.showError?"#d91818":e.selectedSquareID===e.square.id?"#5797ff":1===e.square.enableHighLight?"#477acc":2===e.square.enableHighLight?"#BBDEFB":3===e.square.enableHighLight?"#E2EBF3":void 0},children:0===e.square.cur_val?Object(f.jsx)("div",{className:b.a.PotentialSquare,"data-x":e.square.row,"data-y":e.square.col,children:e.square.potential_vals.map((function(e,t){return e?Object(f.jsx)("span",{children:t+1},a(t)):Object(f.jsx)("span",{},a(t))}))}):Object(f.jsx)("div",{className:b.a.NormalSquare,children:e.square.cur_val})})},p=t(90),_=t(34),g=t.n(_),q=t(42),S=t.n(q),x=t(43),m=t.n(x),w=t(39),I=t.n(w),D=t(89),B=function(e){return Object(f.jsx)(D.a,{m:"2rem",className:I.a.button,onClick:function(){e.updateSquare(e.selectedSquareID,e.val)},variant:"contained",children:e.val})},C=t(44),L=t.n(C),k=t(45),H=t.n(k),N=t(46),A=t.n(N),E=(t(41),t(61),function e(a,t,r,n){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[!0,!0,!0,!0,!0,!0,!0,!0,!0],i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,l=arguments.length>7&&void 0!==arguments[7]&&arguments[7];Object(j.a)(this,e),this.cur_val=c,this.potential_vals=o,this.enableHighLight=i,this.row=a,this.col=t,this.area=r,this.id=n,this.showError=l,this.editable=!0}),P=function e(a,t,r,n,c){Object(j.a)(this,e),this.action=a,this.val=t,this.squareID=r,this.stepsID=n,this.pre_val=c},y=function(e){var a=Object(r.useState)([]),n=Object(u.a)(a,2),c=n[0],o=n[1],i=Object(r.useState)([]),l=Object(u.a)(i,2),j=l[0],d=l[1],h=Object(r.useState)([]),b=Object(u.a)(h,2),_=b[0],q=b[1],x=Object(r.useState)(0),w=Object(u.a)(x,2),I=w[0],D=w[1],C=Object(r.useState)(!1),k=Object(u.a)(C,2),N=k[0],y=k[1],V=Object(r.useState)(!1),F=Object(u.a)(V,2),W=F[0],J=F[1],G=Object(r.useState)(-1),R=Object(u.a)(G,2),T=R[0],K=R[1],M=function(){for(var a=0;a<j.length;++a)if(0==j[a].cur_val)return;if(!W){console.log("game over"),e.setGameOver(!0);for(var t=Object(s.a)(j),r=0;r<t.length;++r)t[r].editable=!1;d(t)}},Q=function(){for(var e=Object(s.a)(j),a=0;a<j.length;++a)e[a].showError=!1;for(var t=!1,r=function(a){var r=e[a];e.map((function(e){var a=!1;return e.id!==r.id&&e.cur_val===r.cur_val&&0!==r.cur_val&&(e.row!==r.row&&e.col!==r.col&&e.area!==r.area||(a=!0,e.showError=!0,r.showError=!0,t=!0)),a||!1!==e.showError||(e.showError=!1),e}))},n=0;n<j.length;++n)r(n);d(e),J(!!t)},X=function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1;if(-1!==e){if(!1!==j[e].editable){var r=j[e],n=r.cur_val,c=!1;if(0===r.cur_val&&!0===N||1===t){r.potential_vals[a-1]=!r.potential_vals[a-1];var o=new P("setPotentialVal",a,e,I,n);-1===t&&(q((function(e){return[].concat(Object(s.a)(e),[o])})),D(I+1))}else if(0===r.cur_val&&!1===N||2===t)r.cur_val=a,c=!0;else if(r.cur_val>0&&!1===N)r.cur_val=a,c=!0;else{if(r.cur_val=0,-1===t){var i=new P("setCurVal",0,e,I,n);q((function(e){return[].concat(Object(s.a)(e),[i])}))}if(r.potential_vals[a-1]=!0,-1===t){var l=new P("setPotentialVal",a,e,I,n);q((function(e){return[].concat(Object(s.a)(e),[l])})),D(I+2)}}d(c?j.map((function(e){var c=e;if(e.id===r.id){if(-1===t){var o=new P("setCurVal",a,c.id,I,n);q((function(e){return[].concat(Object(s.a)(e),[o])})),D(I+1)}return r}if(e.row!==r.row&&e.col!==r.col&&e.area!==r.area||!0!==c.potential_vals[a-1])return e;if(c.potential_vals[a-1]=!1,-1===t){var i=new P("setPotentialVal",a,c.id,I,n);q((function(e){return[].concat(Object(s.a)(e),[i])})),D(I+1)}return c})):j.map((function(e){return e.id===r.id?r:e}))),z(e),Q(),M()}}else Y(a)},Y=function(e){for(var a=Object(s.a)(j),t=0;t<a.length;++t)a[t].enableHighLight=0,a[t].cur_val===e?a[t].enableHighLight=1:a[t].cur_val<1&&e>=0&&!0===a[t].potential_vals[e-1]&&(a[t].enableHighLight=2);d(a)},Z=function(e,a,t,r,n){for(var c=0;c<e.length;++c)0!==a?e[c].cur_val===a?e[c].enableHighLight=1:0===e[c].cur_val&&!0===e[c].potential_vals[a-1]?e[c].enableHighLight=2:e[c].row!==t&&e[c].col!==r&&e[c].area!==n||(e[c].enableHighLight=3):e[c].row===t||e[c].col===r||e[c].area===n?e[c].enableHighLight=3:e[c].enableHighLight=0;return e},z=function(e){for(var a=j[e],t=Object(s.a)(j),r=0;r<t.length;++r)t[r].enableHighLight=0;if(t=Z(t,a.cur_val,a.row,a.col,a.area),0!==a.cur_val)for(var n=0;n<t.length;++n)t[n].cur_val===a.cur_val&&(t=Z(t,a.cur_val,a.row,a.col,a.area));d(t),K(e)},U=function(e){y(!N)};Object(r.useEffect)((function(){!function(){for(var e,a,t=[],r=0;r<9;++r)for(var n=0;n<9;++n){var c=new E(r,n,(a=n,(e=r)<3&&a<3?1:e>=3&&e<6&&a<3?4:e>=6&&a<3?7:e<3&&a>=3&&a<6?2:e>=3&&e<6&&a>=3&&a<6?5:e>=6&&a>=3&&a<6?8:e<3&&a>=6?3:e>=3&&e<6&&a>=6?6:e>=6&&a>=6?9:void 0),9*r+n);t.push(c)}d(t)}()}),[]);var $=function(){for(var e=new(t(71)),a="",r=0;r<j.length;++r)a+=j[r].cur_val.toString();console.log(a);var n=e.solve(a,{result:"array"});return console.log(n),o(n),n};return Object(f.jsxs)("div",{className:v.a.Board,children:[Object(f.jsx)("div",{}),Object(f.jsx)("div",{className:v.a.BoardWrapper,children:Object(f.jsx)("div",{className:v.a.Container,children:j.map((function(e){return Object(f.jsx)(O,{square:e,updateSquare:X,selectedSquareID:T,showHighLightWrapper:z},9*e.row+e.col)}))})}),Object(f.jsxs)("div",{className:v.a.controlArea,children:[Object(f.jsxs)("div",{className:v.a.controlAreaButtons,children:[N?Object(f.jsx)(p.a,{color:"primary",onClick:U,children:Object(f.jsx)(g.a,{})}):Object(f.jsx)(p.a,{onClick:U,children:Object(f.jsx)(g.a,{})}),Object(f.jsx)(p.a,{onClick:function(e){if(0!==_.length){for(var a=Object(s.a)(_),t=a.length-1,r=a[a.length-1].stepsID,n=T;t>=0&&a[t].stepsID===r;)"setCurVal"===a[t].action?X(a[t].squareID,a[t].pre_val,0):"setPotentialVal"===a[t].action&&X(a[t].squareID,a[t].val,1),--t,a.pop(a.length-1);q(a),K(n)}},children:Object(f.jsx)(S.a,{})}),Object(f.jsx)(p.a,{onClick:function(e){K(-1),Y(-1)},children:Object(f.jsx)(m.a,{})}),Object(f.jsxs)(p.a,{onClick:$,children:[Object(f.jsx)(L.a,{}),"Solver"]}),Object(f.jsx)(p.a,{onClick:function(){0!==c.length&&X(T,c[T])},children:Object(f.jsx)(H.a,{})}),Object(f.jsx)(p.a,{onClick:function(){if(0===c.length)for(var e=$(),a=0;a<e.length;++a)X(a,e[a]);else for(var t=0;t<c.length;++t)X(t,c[t])},children:Object(f.jsx)(A.a,{})})]}),Object(f.jsxs)("div",{className:v.a.numberpad,children:[Object(f.jsx)(B,{val:1,selectedSquareID:T,updateSquare:X}),Object(f.jsx)(B,{val:2,selectedSquareID:T,updateSquare:X}),Object(f.jsx)(B,{val:3,selectedSquareID:T,updateSquare:X}),Object(f.jsx)(B,{val:4,selectedSquareID:T,updateSquare:X}),Object(f.jsx)(B,{val:5,selectedSquareID:T,updateSquare:X}),Object(f.jsx)(B,{val:6,selectedSquareID:T,updateSquare:X}),Object(f.jsx)(B,{val:7,selectedSquareID:T,updateSquare:X}),Object(f.jsx)(B,{val:8,selectedSquareID:T,updateSquare:X}),Object(f.jsx)(B,{val:9,selectedSquareID:T,updateSquare:X})]})]})]})},V=function(){var e=Object(r.useState)(!1),a=Object(u.a)(e,2),t=a[0],n=a[1];return Object(f.jsx)(y,{setGameOver:n,gameOver:t})};var F=function(){return Object(f.jsx)("div",{className:l.a.App,children:Object(f.jsx)(V,{})})},W=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,91)).then((function(a){var t=a.getCLS,r=a.getFID,n=a.getFCP,c=a.getLCP,o=a.getTTFB;t(e),r(e),n(e),c(e),o(e)}))};o.a.render(Object(f.jsx)(n.a.StrictMode,{children:Object(f.jsx)(F,{})}),document.getElementById("root")),W()}},[[74,1,2]]]);
//# sourceMappingURL=main.20aa7a38.chunk.js.map