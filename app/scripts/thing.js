(function (document, window) {
    'use strict';

    var Thing = function (parentElment) {
        var element = document.createElement('div');
        element.classList.add('thing');
        this.element = element;

        this.activate(false);

        if (parentElment) {
            parentElment.appendChild(this.element);
        }

        Thing.pool.push(this);
    };

    Thing.MAX_NUMBER = 64;

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

    Thing.prototype.setPosition = function(x, y) {
        var style = this.element.style;
        style.left = x + 'px';
        style.top = y + 'px';
    };

    window.Thing = Thing;

})(document, window);
