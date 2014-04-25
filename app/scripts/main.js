/* global Thing */

(function (document, window) {
    'use strict';

    var Main = function () {
        Main.state = Main.State.NOT_STARTED;

        Main.field = document.getElementById('field');
        Main.fieldWidth = Main.field.offsetWidth;
        Main.fieldHeight = Main.field.offsetHeight;

        Main.startButton = document.getElementById('startButton');
        Main.startButton.addEventListener('click', function () {
            Main.start();
        });

        for (var i = 0; i < Thing.MAX_NUMBER; i++) {
            new Thing(Main.field);
        }
    };

    Main.State = {
        NOT_STARTED: 0,
        PLAYING: 1
    };

    Main.DURATION = 100;
    Main.durationIndex = null;

    Main.DELTA_X = 0.36;

    Main.field = null;
    Main.fieldWidth = null;
    Main.fieldHeight = null;
    Main.startButton = null;

    Main.state = null;

    Main.clickablePercentage = 0.2;

    Main.start = function () {
        if (Main.state === Main.State.NOT_STARTED) {
            Main.state = Main.State.PLAYING;
            Main.tick(0);

            Main.startButton.innerText = 'Stop';
        } else {
            Main.state = Main.State.NOT_STARTED;

            Main.startButton.innerText = 'Start';
        }
    };

    Main.tick = function (time) {
        if (Main.state !== Main.State.PLAYING) {
            return;
        }

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
        var type = Math.random() < Main.clickablePercentage ? Thing.Type.GOOD : Thing.Type.BAD;
        thing.setType(type);

        var x = ((time & 1) ? Main.DELTA_X : (1 - Main.DELTA_X)) * Main.fieldWidth;
        var y = Main.fieldHeight * 0.75;
        var z = 0;
        thing.startAnimation(x, y, z, x, y, z + 1000, function () {
            thing.activate(false);
        });

        thing.activate(true);
    };

    window.Main = Main;

})(document, window);
