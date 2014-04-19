(function (document, window) {
    'use strict';

    var Thing = function (parentElment) {
        var element = document.createElement('div');
        element.classList.add('thing');

        this.element = element;

        if (parentElment) {
            parentElment.appendChild(this.element);
        }
    };

    Thing.MAX_NUMBER = 64;

    Thing.prototype.setPosition = function(x, y) {
        var style = this.element.style;
        style.left = x + 'px';
        style.top = y + 'px';
    };

    window.Thing = Thing;

})(document, window);
