/* global Thing */

(function (document, window) {
    'use strict';

    var Main = function () {
        // console.log('Main()');

        this.field = document.getElementById('field');

        for (var i = 0; i < Thing.MAX_NUMBER; i++) {
            new Thing(this.field);
        }

        Main.tick(0);
    };

    Main.DURATION = 1000;
    Main.durationIndex = null;

    Main.tick = function (time) {
        var t = Math.floor(time / Main.DURATION);
        if (t !== Main.durationIndex) {
            Main.durationIndex = t;

            var thing = Thing.getInactiveThing();
            if (thing) {
                thing.setPosition(t * 10, t * 10);
                thing.activate(true);
            }
        }

        window.requestAnimationFrame(Main.tick);
    };

    window.Main = Main;

})(document, window);
