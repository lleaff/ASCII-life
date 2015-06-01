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
 */var colorLegend={wall:["wall"],nature:["plant","flower"],character:["critter","bouncingCriter"],animal:["wallHugger"]},legend=function(){function e(){if(!this.view.isTrapped())for(;!this.dir||!this.ai.keepMoving();)this.dir=Direction.random()}function t(){this.view.isTrapped()||(this.dir||(this.dir=Direction.random()),this.ai.moveAlong(this.dir))}var i={EmptySpace:{name:"emptySpace",type:["floor"],ch:" "},Wall:{name:"wall",type:["obstacle"],ch:"#",solid:!0,blockSight:!0},Plant:{name:"plant",type:["vegetal"],ch:"+"},Flower:{name:"flower",type:["vegetal"],ch:"*"},Critter:{name:"critter",type:["animal"],ch:"o",solid:!0,speed:1,sight:1},BouncingCriter:{name:"bouncingCriter",type:["animal"],ch:"@",solid:!0,act:e,speed:1,sight:1},WallHugger:{name:"wallHugger",type:["animal"],ch:"~",solid:!0,act:t,speed:1,sight:1}};return i["default"]=i.EmptySpace,i}();if(void 0===Data)var Data={};Data.plans=function(){return[["############","#          #","#  ##   o  #","#    #     #","#  @       #","#        o #","############"],["############","# +   @   +#","#  ##*  o  #","#+   #  @  #","## @   #####","#  ~  + o +#","############"],["############################","# ~    #~  +#      o+   +*##","#+   o         +          +#","#*+       +#####+    +     #","##+  @    *#++~#+   ##+    #","###        ++ ##    +#~    #","#+     +    ###      #     #","#   ####+         o       +#","#   ##++     o        +#+  #","# o  #         +++     ### #","#  +*#+    + +*####   ~  + #","############################"],["############","#### @@#####","##@#########","#######@@###","###o########","####@#####@#","#######@+###"]].map(function(e){return e.join("\n")})}();
//# sourceMappingURL=../sourcemaps/data.js.map