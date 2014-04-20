(function (document, window) {
    'use strict';

    var Thing = function (parentElment) {
        var element = document.createElement('div');
        element.classList.add('thing');
        this.element = element;

        this.activate(false);

        this.state = Thing.State.NONE;

        if (parentElment) {
            parentElment.appendChild(this.element);
        }

        Thing.pool.push(this);
    };

    Thing.MAX_NUMBER = 64;

    Thing.State = {
        NONE: 0,
        STARTING_ANIMATION: 1,
        ANIMATING: 2
    };

    Thing.pool = [];

    Thing.prototype.activate = function(isActive) {
        this.isActive = isActive;

        if (isActive) {
            this.element.classList.remove('thing-invisible');
        } else {
            this.element.classList.add('thing-invisible');
        }
    };

    Thing.getInactiveThing = function() {
        var pool = Thing.pool;
        for (var i = 0; i < pool.length; i++) {
            if (!pool[i].isActive) {
                return pool[i];
            }
        }

        return null;
    };

    Thing.tick = function() {
        var poolLength = Thing.pool.length;
        for (var i = 0; i < poolLength; i++) {
            var thing = Thing.pool[i];
            if (thing.isActive) {
                thing.tick.bind(thing)();
            }
        }
    };

    Thing.prototype.tick = function() {
        if (this.state === Thing.State.STARTING_ANIMATION) {
            this.setPosition(this.endX, this.endY, this.endZ, true);

            this.state = Thing.State.ANIMATING;
        }
    };

    Thing.prototype.setPosition = function(x, y, z, enableAnimation) {
        var style = this.element.style;

        if (enableAnimation !== undefined) {
            style.webkitTransitionProperty = enableAnimation ? 'all' : 'none';
        }

        var value = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
        style.webkitTransform = value;
    };

    Thing.prototype.startAnimation = function(startX, startY, startZ, endX, endY, endZ, callback) {
        this.setPosition(startX, startY, startZ, false);

        this.endX = endX;
        this.endY = endY;
        this.endZ = endZ;

        this.state = Thing.State.STARTING_ANIMATION;

        var self = this;
        this.element.addEventListener('webkitTransitionEnd', function () {
            self.state = Thing.State.NONE;

            if (callback) {
                callback();
            }
        });
    };

    Thing.prototype.enableClick = function(flag) {
        if (flag) {
            this.element.classList.add('thing-clickable');
        } else {
            this.element.classList.remove('thing-clickable');
        }
    };

    window.Thing = Thing;

})(document, window);
