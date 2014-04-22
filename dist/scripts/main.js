!function(a,b){"use strict";var c=function(b){var d=a.createElement("div");d.classList.add("thing"),this.element=d,this.activate(!1),this.state=c.State.NONE,b&&b.appendChild(this.element),c.pool.push(this)};c.MAX_NUMBER=64,c.State={NONE:0,STARTING_ANIMATION:1,ANIMATING:2},c.pool=[],c.prototype.activate=function(a){this.isActive=a,a?this.element.classList.remove("thing-invisible"):this.element.classList.add("thing-invisible")},c.getInactiveThing=function(){for(var a=c.pool,b=0;b<a.length;b++)if(!a[b].isActive)return a[b];return null},c.tick=function(){for(var a=c.pool.length,b=0;a>b;b++){var d=c.pool[b];d.isActive&&d.tick.bind(d)()}},c.prototype.tick=function(){this.state===c.State.STARTING_ANIMATION&&(this.setPosition(this.endX,this.endY,this.endZ,!0),this.state=c.State.ANIMATING)},c.prototype.setPosition=function(a,b,c,d){var e=this.element.style;void 0!==d&&(e.webkitTransitionProperty=d?"all":"none");var f="translate3d("+a+"px, "+b+"px, "+c+"px)";e.webkitTransform=f},c.prototype.startAnimation=function(a,b,d,e,f,g,h){this.setPosition(a,b,d,!1),this.endX=e,this.endY=f,this.endZ=g,this.state=c.State.STARTING_ANIMATION;var i=this;this.element.addEventListener("webkitTransitionEnd",function(){i.state=c.State.NONE,h&&h()})},c.prototype.enableClick=function(a){var b=this.element;a?(b.classList.add("thing-clickable"),b.addEventListener("click",function(){b.classList.remove("thing-clickable"),b.classList.add("thing-clicked")})):(b.classList.remove("thing-clickable"),b.addEventListener("click",function(){b.classList.add("thing-missed")}))},b.Thing=c}(document,window),function(a,b){"use strict";var c=function(){c.state=c.State.NOT_STARTED,c.field=a.getElementById("field"),c.fieldWidth=c.field.offsetWidth,c.fieldHeight=c.field.offsetHeight,c.startButton=a.getElementById("startButton"),c.startButton.addEventListener("click",function(){c.start()});for(var b=0;b<Thing.MAX_NUMBER;b++)new Thing(c.field)};c.State={NOT_STARTED:0,PLAYING:1},c.DURATION=100,c.durationIndex=null,c.DELTA_X=.36,c.field=null,c.fieldWidth=null,c.fieldHeight=null,c.startButton=null,c.state=null,c.clickablePercentage=.2,c.start=function(){c.state===c.State.NOT_STARTED?(c.state=c.State.PLAYING,c.tick(0),c.startButton.innerText="Stop"):(c.state=c.State.NOT_STARTED,c.startButton.innerText="Start")},c.tick=function(a){if(c.state===c.State.PLAYING){Thing.tick();var d=Math.floor(a/c.DURATION);if(d!==c.durationIndex){c.durationIndex=d;var e=Thing.getInactiveThing();e&&c.startAnimation(e,d)}b.requestAnimationFrame(c.tick)}},c.startAnimation=function(a,b){var d=Math.random()<c.clickablePercentage;a.enableClick(d);var e=(1&b?c.DELTA_X:1-c.DELTA_X)*c.fieldWidth,f=.75*c.fieldHeight,g=0;a.startAnimation(e,f,g,e,f,g+1e3,function(){a.activate(!1)}),a.activate(!0)},b.Main=c}(document,window);