(function (document, window) {
    'use strict';

    var Main = function () {
        // console.log('Main()');

        this.field = document.getElementById('field');

        this.things = [];

        for (var i = 0; i < Thing.MAX_NUMBER; i++) {
            var thing = new Thing(this.field);
            this.things.push(thing);
        }
    };

    window.Main = Main;

})(document, window);
