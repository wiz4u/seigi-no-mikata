/* global Thing */

(function (document, window) {
    'use strict';

    var Main = function () {
        // console.log('Main()');

        Main.field = document.getElementById('field');
        Main.fieldWidth = Main.field.offsetWidth;
        Main.fieldHeight = Main.field.offsetHeight;

        for (var i = 0; i < Thing.MAX_NUMBER; i++) {
            new Thing(Main.field);
        }

        Main.tick(0);
    };

    Main.DURATION = 100;
    Main.durationIndex = null;

    Main.field = null;
    Main.fieldWidth = null;
    Main.fieldHeight = null;

    Main.tick = function (time) {
        Thing.tick();

        var t = Math.floor(time / Main.DURATION);
        if (t !== Main.durationIndex) {
            Main.durationIndex = t;

            var thing = Thing.getInactiveThing();
            if (thing) {
                Main.startAnimation(thing, t);
            }
        }

        window.requestAnimationFrame(Main.tick);
    };

    Main.startAnimation = function (thing, time) {
        var x = (time * 10) % Main.fieldWidth;
        var y = 0;
        var z = 0;
        thing.startAnimation(x, y, z, x, y + 100, z + 1000, function () {
            // thing.activate(false);
        });

        thing.activate(true);
    };

    window.Main = Main;

})(document, window);
