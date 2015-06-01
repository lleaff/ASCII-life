/* Copyright 2015 lleaff
This file is part of ASCII life.

ASCII life is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

ASCII life is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with ASCII life.  If not, see <http://www.gnu.org/licenses/>.
 */function main(){function t(t){return t=[].concat(t),t.map(function(t){var e=document.createElement("DIV");e.setAttribute("class","worldContainer");var n=new LivingWorld(t,legend,colorLegend,e);return n.surface.overlay.addEventListener("click",r.bind(null,n)),o.appendChild(e),n})}function e(t){t=[].concat(t),t.forEach(function(t){t.intervalId||(t.intervalId=setInterval(t.tick.bind(t),1e3*i))})}function n(t){t=[].concat(t),t.forEach(function(t){clearInterval(t.intervalId),t.intervalId=null})}function r(t){t=[].concat(t);var r=0;t.forEach(function(t){t.intervalId||++r}),t.length/2<r?e(t):n(t)}function a(t,e){t=[].concat(t),void 0===e&&(e=1),t.forEach(function(t){n(t);for(var r=0;e>r;++r)t.tick()})}function c(e){var n=String.fromCharCode(e.keyCode||e.charCode);switch(n){case" ":r(u);break;case"'":a(u);break;case"R":case"r":u=u.concat(t(Data.plans))}}var i=.1,o=document.getElementById("worldsContainer"),u=t(Data.plans);e(u),document.body.addEventListener("keydown",c)}function LivingWorld(t,e,n,r){this.world=new World(t,e),this.colorLegend=Output.processColorLegend(n,e),this.print=function(){this.surface.removeChild(this.surface.firstChild),Output.appendTaggedTextTo(this.surface.appendChild(document.createElement("SPAN")),this.world.draw(),this.colorLegend,"color",{capitalize:!0})},this.surface=function(){if(r||(r=document.getElementById("world")),!r)throw new Error("no #world found, create a container for world surface");var t=r.children[0];return t&&"PRE"===t.tagName||(t=document.createElement("PRE"),t.setAttribute("class","world"),t.setAttribute("style","line-height:1em;"),r.appendChild(t)),t}.call(this),this.surface.parent=r,this.surface.overlay=function(){var t=document.createElement("DIV");return t.setAttribute("class","worldOverlay"),this.surface.parent.style.position="relative",t.setAttribute("style","width:100%; height:100%; position:absolute; top:0; bottom:0;"),this.surface.parent.appendChild(t),t}.call(this),this.updateSurface=function(){this.print()},this.tick=function(){this.world.turn(),this.updateSurface()},function(){this.surface.appendChild(document.createElement("SPAN")),this.print()}.call(this)}if(!Output)var Output={};Output.reverseSetOfArrays=function(t){var e={};return Object.keys(t).forEach(function(n){t[n].forEach(function(t){e[t]=n})}),e},Output.processColorLegend=function(t,e){function n(t){for(var n in e)if(e[n].name===t)return e[n]}t=Output.reverseSetOfArrays(t);var r={};return Object.keys(t).forEach(function(e){r[n(e).ch]=t[e]}),r},Output.appendTaggedTextTo=function(t,e,n,r,a){function c(t){return a.capitalize&&(t=t.charAt(0).toUpperCase()+t.slice(1)),r+t}function i(e){var r;n[e[0]]?(r=document.createElement("span"),r.setAttribute("class",c(n[e[0]])),r.appendChild(document.createTextNode(e))):r=document.createTextNode(e),t.appendChild(r)}void 0===t&&(t=document.createElement("div"));for(var o=0,u="";o<e.length;++o)u+=e[o],e[o+1]!==e[o]&&(i(u),u="");return t};
//# sourceMappingURL=../sourcemaps/main.js.map