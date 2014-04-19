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

    window.Thing = Thing;

})(document, window);
