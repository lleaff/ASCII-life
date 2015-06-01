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
 */function main(){function t(t){t.intervalId||(t.intervalId=setInterval(t.tick.bind(t),1e3*r))}function e(t){clearInterval(t.intervalId),t.intervalId=null}function n(n){n.intervalId?e(n):t(n)}var r=.1,i=document.getElementById("worldsContainer"),a=Data.plans.map(function(t){var e=document.createElement("DIV");e.setAttribute("class","worldContainer");var r=new LivingWorld(t,legend,colorLegend,e);return r.surface.overlay.addEventListener("click",n.bind(null,r)),i.appendChild(e),r});a.forEach(function(e){t(e)})}function LivingWorld(t,e,n,r){this.world=new World(t,e),this.colorLegend=Output.processColorLegend(n,e),this.print=function(){this.surface.removeChild(this.surface.firstChild),Output.appendTaggedTextTo(this.surface.appendChild(document.createElement("SPAN")),this.world.draw(),this.colorLegend,"color",{capitalize:!0})},this.surface=function(){if(r||(r=document.getElementById("world")),!r)throw new Error("no #world found, create a container for world surface");var t=r.children[0];return t&&"PRE"===t.tagName||(t=document.createElement("PRE"),t.setAttribute("class","world"),t.setAttribute("style","line-height:1em;"),r.appendChild(t)),t}.call(this),this.surface.parent=r,this.surface.overlay=function(){var t=document.createElement("DIV");return t.setAttribute("class","worldOverlay"),this.surface.parent.style.position="relative",t.setAttribute("style","width:100%; height:100%; position:absolute; top:0; bottom:0;"),this.surface.parent.appendChild(t),t}.call(this),this.updateSurface=function(){this.print()},this.tick=function(){this.world.turn(),this.updateSurface()},function(){this.surface.appendChild(document.createElement("SPAN")),this.print()}.call(this)}if(!Output)var Output={};Output.reverseSetOfArrays=function(t){var e={};return Object.keys(t).forEach(function(n){t[n].forEach(function(t){e[t]=n})}),e},Output.processColorLegend=function(t,e){function n(t){for(var n in e)if(e[n].name===t)return e[n]}t=Output.reverseSetOfArrays(t);var r={};return Object.keys(t).forEach(function(e){r[n(e).ch]=t[e]}),r},Output.appendTaggedTextTo=function(t,e,n,r,i){function a(t){return i.capitalize&&(t=t.charAt(0).toUpperCase()+t.slice(1)),r+t}function o(e){var r;n[e[0]]?(r=document.createElement("span"),r.setAttribute("class",a(n[e[0]])),r.appendChild(document.createTextNode(e))):r=document.createTextNode(e),t.appendChild(r)}void 0===t&&(t=document.createElement("div"));for(var c=0,u="";c<e.length;++c)u+=e[c],e[c+1]!==e[c]&&(o(u),u="");return t};
//# sourceMappingURL=../sourcemaps/main.js.map