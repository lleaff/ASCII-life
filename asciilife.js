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
 */function shuffleArray(t){for(var r=0,e=t.length,i=[];e>r;++r)if(-1===i.indexOf(r)){var o=Math.random()*e>>0;i.push(o);var n=t[r];t[r]=t[o],t[o]=n}}function randomInt(t,r){var e=r-t;return Math.round(Math.random()*e+t)>>0}function randomArrayElement(t){return randomInt(0,t.length-1)}function assert(t,r){if(!t){if(window.DEBUG)throw new Error(r);console.log("ERROR: "+r)}}function Vector(t,r){this.x=+t,this.y=+r}function Grid(t,r){this.width=t,this.height=r,this.arr=new Array(r);for(var e=0;e<this.arr.length;++e)this.arr[e]=new Array(t)}function World(t,r){var e="object"==typeof t?t:Grid.parse(t);r=World.charMapFromElemMap(r),this.grid=World.charGridToElemGrid(e,r,this),World.initializeActors(this),this.legend=r,this.actions=new World.Actions(this)}function Ai(t){this.actor=t,this.world=this.actor.world}if(Vector.prototype.plus=function(t){return new Vector(this.x+t.x,this.y+t.y)},Vector.prototype.minus=function(t){return new Vector(this.x-t.x,this.y-t.y)},Vector.prototype.times=function(t){return new Vector(this.x*t.x,this.y*t.y)},Vector.prototype.add=function(t){this.x+=t.x,this.y+=t.y},Vector.prototype.substract=function(t){this.x-=t.x,this.y-=t.y},Vector.prototype.multiply=function(t){this.x*=t.x,this.y*=t.y},Vector.prototype.toString=function(){return"{"+this.x+", "+this.y+"}"},Object.defineProperty(Vector.prototype,"length",{get:function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}}),Vector.prototype.equal=function(t){return this.x===t.x&&this.y===t.y},Vector.prototype.greater=function(t){return this.length>t.length},Vector.prototype.less=function(t){return this.length<t.length},Grid.prototype.draw=function(){return this.arr.map(function(t){return t.join("")},"").join("\n")},Grid.prototype.toString=Grid.prototype.draw,Grid.prototype.forAll=function(t,r){void 0===r&&(r=this);for(var e,i=0;i<r.arr.length;++i)for(e=0;e<r.arr[i].length;++e)t(r.arr[i][e],e,i,r.arr)},Grid.prototype.forEach=function(t,r){void 0===r&&(r=this);for(var e,i=0;i<r.arr.length;++i)for(e=0;e<r.arr[i].length;++e)void 0!==r.arr[i][e]&&null!==r.arr[i][e]&&t(r.arr[i][e],e,i,r.arr)},Grid.prototype.map=function(t){var r=new Grid(this.width,this.height);return this.forAll(function(e,i,o,n){r.arr[o][i]=t(e,i,o,n)}),r},Grid.prototype.fill=function(t){this.forAll(function(r,e,i,o){o[i][e]=t})},Grid.prototype.get=function(t){return this.arr[t.y]?this.arr[t.y][t.x]:void 0},Grid.prototype.getAt=function(t,r){return this.arr[r][t]},Grid.prototype.set=function(t,r){this.arr[t.y][t.x]=r},Grid.prototype.setAt=function(t,r,e){this.arr[r][t]=e},Grid.prototype.isOutside=function(t){var r=!1,e=!1;return this.width>=t.x&&0<=t.x&&(r=!0),this.height>=t.y&&0<=t.y&&(e=!0),r&&e?!1:new Vector(r?0:t.x-this.width,e?0:t.y-this.height)},Grid.parse=function(t){for(var r,e=0,i=0;i<t.length;++i)"\n"===t[i]&&(void 0===r&&(r=i),++e);"\n"!==t[t.length-1]&&++e;var o=new Grid(r,e),n=0;for(i=0;i<t.length;++i)"\n"===t[i]?++n:o.set(new Vector((i-n)%r,(i-n)/r>>0),t[i]);return o},World.charToElements=function(t,r){var e=r[t].map(function(t){return Object.create(t)});return e},World.charGridToElemGrid=function(t,r,e){return t.map(function(t){return World.charToElements(t,r)})},World.elementToChar=function(t){return t.ch},World.elemGridToCharGrid=function(t){return t.map(function(t){return t.reduce(function(t,r){return r.solid?r:t},t[0]).ch})},World.prototype.draw=function(){return World.elemGridToCharGrid(this.grid).toString()},World.prototype.toString=World.prototype.draw,World.charMapFromElemMap=function(t){var r={};for(var e in t){var i=t[e];i.ch&&(r[i.ch]=[t[e]],i.speed&&r[i.ch].push(t["default"]))}return r},World.initializeActors=function(t){t.grid.forEach(function(r){r.forEach(function(r,e,i){r.act&&(r.world=t,r.ai=new Ai(r))})})},World.prototype.addElement=function(t,r){this.grid.get(t).push(r)},World.prototype.removeElement=function(t,r){var e=this.grid.get(t);e.splice(e.indexOf(r),1)},World.prototype.moveElement=function(t,r,e){this.addElement(r,e),this.removeElement(t,e)},void 0===Elem)var Elem={};if(void 0===Elems)var Elems={};Elem.nextTo=function(){},Elem.match=function(t,r){return r.types&&!Elems.hasTypes(t,r.types)?!1:r.solid&&!Elems.isSolid(t,r.solid)?!1:!0},Elems._test=function(t,r){return r&&r.filter(t(elem)).length},Elem.hasType=function(t,r){return r&&-1!==r.types.indexOf(t)},Elems.hasType=function(t,r){return Elems._test(Elem.hasType.bind(null,r))},Elem.hasTypes=function(t,r){return r&&t.every(Elem.hasType.bind(null,t))},Elems.hasTypes=function(t,r){return Elems._test(Elem.hasTypes.bind(null,r))},Elem.isSolid=function(t,r){return r&&r.solid===(t===!1?!1:!0)},Elems.isSolid=function(t,r){return Elems._test(Elem.isSolid.bind(null,r))},Elem.blockSight=function(t,r){return r&&r.blockSight===(t===!1?!1:!0)},Elems.blockSight=function(t,r){return Elems._test(Elem.blockSight.bind(null,r))},Direction=new function(){this.n=new Vector(0,1),this.up=this.n,this.ne=new Vector(1,1),this.e=new Vector(1,0),this.right=this.e,this.se=new Vector(1,-1),this.s=new Vector(0,-1),this.bottom=this.s,this.sw=new Vector(-1,-1),this.w=new Vector(-1,0),this.left=this.w,this.nw=new Vector(-1,1)},Directions=["n","ne","e","se","s","sw","w","nw"],Directions.vectors=[new Vector(0,1),new Vector(1,1),new Vector(1,0),new Vector(1,-1),new Vector(0,-1),new Vector(-1,-1),new Vector(-1,0),new Vector(-1,1)],Directions._indexOf=function(t){for(var r=0;r<Directions.vectors.length;++r)if(Directions.vectors[r].equal(t))return r;assert(!1,"Directions._indexOf: Invalid direction: "+t)},Direction.vectorToDirectionName=function(t){return Directions[Directions._indexOf(t)]},Direction.vectorToDirection=function(t){return new Vector(t.x?1:0,t.y?1:0)},Direction.vectorToDistance=function(t){return Math.max(t.x,t.y)},Direction.rotate=function(t,r){var e=45,i=r/e;return assert(i-(i>>0)===0,"Direction.rotate: 'degree' ("+r+") must be a multiple of "+e),Directions.vectors[(Directions._indexOf(t)+i+Directions.length)%Directions.length]},Direction.random=function(){for(var t,r;!t&&!r;)t=randomInt(-1,1),r=randomInt(-1,1);return new Vector(t,r)},Direction.forEach=function(t,r){var e=this;Directions.forEach(function(r){t(e[r],r,e)},r)},Direction.forEachFrom=function(t,r,e){function i(){return n+=n<Directions.length?1:0}function o(){return s-=s>0?1:Directions.length}for(var n,s,c=Directions.indexOf(Direction.vectorToDirectionName(initialDireciton)),l=c;n!==c&&s!==c;)r.call(e,directions.vectors[l],directions[l],this),l=l===n?i():o()},Direction.some=function(t,r){var e=this;return Directions.some(function(i){return t.call(r,e[i],i,e)},r)},World.View=function(t,r,e){this.world=t,this.actor=r,this.position=e},World.View.prototype.New=function(t){return new World.View(this.world,this.actor,this.position.plus(t))},World.View.prototype.isTrapped=function(){return!Direction.some(function(t){var r=this.world.grid.get(this.position.plus(t));return r&&!r.some(function(t){return t.solid})||!1},this)},World.View.prototype.isOn=function(t){return World.Elements.hasType(this.world.grid.get(this.position),t)},World.View.prototype.reachable=function(t,r){var e=[],i=this;return Direction.forEach(function(o){e=e.concat(i.look(o,r||i.actor.speed).reachable(t))},this),e},World.View.prototype.visible=function(t){var r,e=[];return Direction.forEach(function(i){e.concat(r.look(i).visible(t))}),e},World.View.prototype.look=function(t,r){var e,i=[];void 0===r?(r=this.actor.sight,e=!1):e=!0;for(var o=this.position,n=0;r>n&&(elements=this.world.grid.get(o.plus(t)),i.push(elements),elements&&(e||!elements.some(function(t){return t.blockSight})));++n);return new World.View.Image(i,t)},World.View.Image=function(t,r){this.image=t,this.direction=r},World.View.Image.prototype.isSolid=function(t){function r(t){return t.some(function(t){return!!t.solid})}if(void 0===t){for(var e=0;e<this.image.length;++e)if(r(this.image[e]))return!0}else if(r(this.image[t]))return!0;return!1},Object.defineProperty(World.View.Image.prototype,"_addDirection",{enumerable:!1,writable:!1,value:function(t,r){t.push(this.direction.plus(new Vector(r,r)))}}),World.View.Image.prototype.reachable=function(t){for(var r=[],e=0;e<this.image.length;++e)if(World.Elements.hasType(this.image[e],t))this._addDirection(r,e);else if(this.isSolid(e))break;return r},World.View.Image.prototype.visible=function(t){for(var r=[],e=0;e<this.image.length;++e)World.Elements.hasType(this.image[e],t)&&this._addDirection(r,e);return r},World.View.Image.prototype.possibleMoves=function(){for(var t=[],r=0;r<this.image.length&&(void 0!==this.image[r]&&!this.isSolid(r));++r)this._addDirection(t,r);return t},World.View.closest=function(t){return t.reduce(function(t,r){return t&&t.x+t.y<r.x+r.y?t:r},null)},World.View.farthest=function(t){return t.reduce(function(t,r){return t&&t.x+t.y>r.x+r.y?t:r},null)},World.prototype.turn=function(){var t=[];this.grid.forEach(function(r,e,i,o){r.forEach(function(r){r.act&&t.push({elem:r,position:new Vector(e,i)})})}),shuffleArray(t),t.forEach(function(t){t.elem.view=new World.View(this,t.elem,t.position),t.elem.act()},this)},World.Actions=function(t){return{move:function(r,e,i){void 0===i&&(Math.abs(e.x)>1?(i=Math.abs(e.x),e=Direction.vectorToDirection(e)):Math.abs(e.y)>1?(i=Math.abs(e.y),e=Direction.vectorToDirection(e)):i=r.speed);for(var o=new Vector(0,0),n=r.view.look(e,i),s=0;i>s&&(n.image&&!n.isSolid(s));++s)o.add(e);return 0===o.x&&0===o.y?!1:(t.moveElement(r.view.position,r.view.position.plus(o),r),r.dir=s?e:null,s?o:null)}}},Ai.prototype.keepMoving=function(){if(this.actor.dir){var t=this.actor.view.look(this.actor.dir).possibleMoves().pop();if(t)return this.world.actions.move(this.actor,t)}return null},Ai.prototype.moveToward=function(t,r){var e=this.actor.view.reachable(t);shuffleArray(e);var i=World.View.closest(e)||r;return this.world.actions.move(this.actor,i)},Ai.prototype.moveAlong=function(t,r){r||(r=this.dir||Direction.random())};
//# sourceMappingURL=../sourcemaps/asciilife.js.map