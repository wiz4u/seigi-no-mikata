/* global Thing */

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

        Main.tick(0);
    };

    Main.tick = function (time) {
        window.requestAnimationFrame(Main.tick);
    };

    window.Main = Main;

})(document, window);
