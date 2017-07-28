/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(window).on('load', function () {
  $('#loading').addClass('noShow');
  console.log('Content loaded');
  //----------------------------------------------------Inventory

  var Inventory = function () {
    function Inventory() {
      _classCallCheck(this, Inventory);

      this.subjectsInside = [];
    }

    _createClass(Inventory, [{
      key: 'addSubject',
      value: function addSubject(subject) {
        this.subjectsInside.push(subject);
        console.log(this.subjectsInside + " added to inventory");
        console.log("Subjects in inventory: " + this.subjectsInside);
        console.log(this.subjectsInside);
        this.watch();
      }
    }, {
      key: 'watch',
      value: function watch() {
        var $elements = $('#inventory').find('div');
        var self = this;
        $elements.each(function (index, element) {
          $($elements[index]).off();
          $($elements[index]).on('click', function () {
            self.subjectsInside[index].activate(index);
          });
        });
      }
    }]);

    return Inventory;
  }();

  //----------------------------------------------------Subject

  var Subject = function () {
    function Subject(name, inventory) {
      _classCallCheck(this, Subject);

      this.name = name;
      this.inventory = inventory;
      this.isInInventory = false;
      this.isActive = false;
      this.hasBeenUsed = false;
      this.class = '.' + this.name;
    }

    _createClass(Subject, [{
      key: 'addToInventory',
      value: function addToInventory() {
        var $subject = $('.' + this.name);
        var $inventory = $('#inventory').find('div');
        $subject.addClass('noShow');

        for (var i = 0; i < $inventory.length; i++) {
          if ($($inventory[i]).hasClass('empty') && !this.isInInventory) {
            $($inventory[i]).find('img').attr('src', './images/i' + this.name + '.png');
            this.isInInventory = true;
            $inventory[i].classList.remove('empty');
            this.inventory.addSubject(this);
            var audio = new Audio('sounds/item.wav');
            audio.play();
          }
        }
      }
    }, {
      key: 'activate',
      value: function activate(index) {
        var $elements = $('#inventory').find('div');
        var $elementsInInventory = this.inventory.subjectsInside;
        var elementsInInventoryLength = $elementsInInventory.length;

        if (this.isActive == false) {

          for (var i = 0; i < elementsInInventoryLength; i++) {
            $($elements[i]).removeClass('isActive');
            $elementsInInventory[i].isActive = false;
            console.log($elementsInInventory[i].isActive);
          }

          $($elements[index]).addClass('isActive');
          this.isActive = true;
          console.log(this.name + " is active");
        } else {

          $($elements[index]).removeClass('isActive');
          this.isActive = false;
          console.log(this.name + " is not active");
        }
      }
    }, {
      key: 'watch',
      value: function watch() {
        var self = this;
        $('.' + this.name).on('click', function () {
          self.addToInventory();
        });
      }
    }]);

    return Subject;
  }();
  //----------------------------------------------------Cubby

  var PowerBox = function () {
    function PowerBox() {
      _classCallCheck(this, PowerBox);

      this.isSolved = false;
    }

    _createClass(PowerBox, [{
      key: 'activate',
      value: function activate() {
        this.isSolved = true;
      }
    }, {
      key: 'watch',
      value: function watch() {
        var self = this;
        var $powerBox = $('.powerBox');
        var number = [0, 0, 0, 0];
        var color = ['#6eba1a', '#ff0000', '#1e20d9', '#e63bfb', '#ffe81d', '#c17c5a', '#ff7f17', '#ffffff', '#000000'];
        $powerBox.each(function (index, element) {
          $(element).on('click', function () {
            number[index]++;
            if (number[index] == 10) {
              number[index] = 1;
            }
            $(element).css('background-color', color[number[index] - 1]);
            if (number[0] == 6 && number[1] == 8 && number[2] == 7 && number[3] == 4) {
              game.showDialogues("Something crackled");
              var audio = new Audio('sounds/power.wav');
              audio.play();
              console.log('solved!');
              $powerBox.off();
              self.activate();
            }
          });
        });
      }
    }]);

    return PowerBox;
  }();

  var Safe = function () {
    function Safe() {
      _classCallCheck(this, Safe);
    }

    _createClass(Safe, [{
      key: 'watch',
      value: function watch() {
        var $button = $('.button');
        var $buttonSub = $('.buttonSub');
        var $buttonDel = $('.buttonDel');
        var $buttonBar = $('.buttonBar');
        var pin = "";

        $button.each(function (index, element) {
          $(element).on('click', function () {
            if (pin.length < 10) {
              pin += element.innerText;
              console.log(pin);
              $buttonBar.text(pin);
              var audioBeep = new Audio('sounds/beep.wav');
              audioBeep.play();
            }
          });
        });
        $buttonDel.on('click', function () {
          pin = "";
          $buttonBar.text(pin);
          var audioBeep = new Audio('sounds/beep.wav');
          audioBeep.play();
        });
        $buttonSub.on('click', function () {
          if (pin === "1626364656") {
            console.log('solved!');
            var $doorSafe = $('.doorSafe');
            $doorSafe.css("display", "block");
            var audioSafe = new Audio('sounds/safe.wav');
            audioSafe.play();
          } else {
            game.showDialogues("Wrong password");
            var audioBeep = new Audio('sounds/wrong.wav');
            audioBeep.play();
          }
        });
      }
    }]);

    return Safe;
  }();

  var Lever = function () {
    function Lever(powerBox) {
      _classCallCheck(this, Lever);

      this.powerBox = powerBox;
    }

    _createClass(Lever, [{
      key: 'watch',
      value: function watch() {
        var $lever = $('.lever');
        var self = this;
        $lever.on('click', function () {
          if (self.powerBox.isSolved) {
            console.log('open');
            var $doorHiddenSafe = $('.doorHiddenSafe');
            $doorHiddenSafe.css("display", "block");
            var audioSafe = new Audio('sounds/safe.wav');
            audioSafe.play();
          } else {
            game.showDialogues("No power");
            var audio = new Audio('sounds/tick.wav');
            audio.play();
          }
        });
      }
    }]);

    return Lever;
  }();

  var Pressure = function () {
    function Pressure(subject) {
      _classCallCheck(this, Pressure);

      this.subject = subject;
      this.isActive = false;
    }

    _createClass(Pressure, [{
      key: 'watch',
      value: function watch() {
        var self = this;
        var $pipe = $('.pipe');
        $pipe.on('click', function () {
          if (self.subject.isActive) {
            var $pressure = $('.pressure');
            $pressure.css("display", "block");
            self.isActive = true;
            console.log('pressure' + self.isActive);
            var audio = new Audio('sounds/pressure.wav');
            audio.play();
          } else {
            console.log("I can't turn it");
            game.showDialogues("I can't turn it");
            var _audio = new Audio('sounds/groan.mp3');
            _audio.play();
          }
        });
      }
    }]);

    return Pressure;
  }();

  var MainPipe = function () {
    function MainPipe(pressure) {
      _classCallCheck(this, MainPipe);

      this.pressure = pressure;
    }

    _createClass(MainPipe, [{
      key: 'watch',
      value: function watch() {
        var self = this;
        var $mainpipe = $('.mainpipe');
        $mainpipe.on('click', function () {
          if (self.pressure.isActive) {
            var $doorExit = $('.doorExit');
            $doorExit.css("display", "block");
            game.showNewScene('h4');
            var audio = new Audio('sounds/maindoor.wav');
            audio.play();
          } else {
            console.log();
            game.showDialogues("There is no pressure");
            var _audio2 = new Audio('sounds/nopressure.wav');
            _audio2.play();
          }
        });
      }
    }]);

    return MainPipe;
  }();
  //----------------------------------------------------Doors

  var Door = function () {
    function Door(name) {
      _classCallCheck(this, Door);

      this.name = name;
    }

    _createClass(Door, [{
      key: 'openDoor',
      value: function openDoor() {
        var $door = $('.' + this.name);
        $door.removeClass('noShow');
        if (this.name == "door6") {
          var $change = $('.h3toh3a');
          $change.addClass('noShow');
          console.log('Change!!!');
          game.showNewScene('h3');
          var audio = new Audio('sounds/crowbar.wav');
          audio.play();
        } else if (this.name == "openBox") {
          var _audio3 = new Audio('sounds/box.wav');
          _audio3.play();
        } else {
          var _audio4 = new Audio('sounds/opendoor.wav');
          _audio4.play();
        }
      }
    }]);

    return Door;
  }();

  //----------------------------------------------------Actives

  var Active = function () {
    function Active(name, subject, door, text) {
      _classCallCheck(this, Active);

      this.name = name;
      this.subject = subject;
      this.door = door;
      this.text = text;
    }

    _createClass(Active, [{
      key: 'watch',
      value: function watch() {
        var $active = $('.' + this.name);
        var self = this;
        $active.on('click', function () {
          if (self.subject.isActive) {
            self.door.openDoor();
          } else {
            console.log(self.text);
            game.showDialogues(self.text);
            var audio = new Audio('sounds/close.wav');
            audio.play();
          }
        });
      }
    }]);

    return Active;
  }();

  //----------------------------------------------------Game

  var Game = function () {
    function Game() {
      _classCallCheck(this, Game);

      this.scene = "h1";
    }

    _createClass(Game, [{
      key: 'startNewGame',
      value: function startNewGame() {
        //loading inventoy
        var inventory = new Inventory();
        //loading subjects
        var key1 = new Subject('key1', inventory);
        key1.watch();
        var key2 = new Subject('key2', inventory);
        key2.watch();
        var key3 = new Subject('key3', inventory);
        key3.watch();
        var key4 = new Subject('key4', inventory);
        key4.watch();
        var key5 = new Subject('key5', inventory);
        key5.watch();
        var crowbar = new Subject('crowbar', inventory);
        crowbar.watch();
        var stanley = new Subject('stanley', inventory);
        stanley.watch();
        var hydraulic = new Subject('hydraulic', inventory);
        hydraulic.watch();
        //loading cubby
        var powerBox = new PowerBox();
        powerBox.watch();
        var safe = new Safe();
        safe.watch();
        var lever = new Lever(powerBox);
        lever.watch();
        var pressure = new Pressure(hydraulic);
        pressure.watch();
        var mainpipe = new MainPipe(pressure);
        mainpipe.watch();
        //loading doors
        var door1 = new Door('door1');
        var door2 = new Door('door2');
        var door3 = new Door('door3');
        var door4 = new Door('door4');
        var door5 = new Door('door5');
        var door6 = new Door('door6');
        var openBox = new Door('openBox');
        var doorEexit = new Door('doorExit');
        //loading actives
        var lock1 = new Active('lock1', key1, door1, "Locked");
        lock1.watch();
        var lock2 = new Active('lock2', key2, door2, "Locked");
        lock2.watch();
        var lock3 = new Active('lock3', key3, door3, "Locked");
        lock3.watch();
        var lock4 = new Active('lock4', key4, door4, "Locked");
        lock4.watch();
        var lock5 = new Active('lock5', key5, door5, "Locked");
        lock5.watch();
        var lock6 = new Active('lock6', crowbar, door6, "I can't move it");
        lock6.watch();
        var lock7 = new Active('lock7', stanley, openBox, "This tape is too strong");
        lock7.watch();
        //loading scenes
        this.showNewScene(this.scene);
        this.watchMoves();
      }
    }, {
      key: 'showNewScene',
      value: function showNewScene(newScene) {
        $('.' + this.scene).css("display", "none");
        $('.' + newScene).css("display", "block");
        this.scene = newScene;
      }
    }, {
      key: 'showDialogues',
      value: function showDialogues(text) {
        //find dialogues
        var $dialogues = $('#dialogues');
        $dialogues.html("<p>" + text + "</p>");
        setTimeout(function () {
          $dialogues.html("");
        }, 2000);
      }
    }, {
      key: 'watchMoves',
      value: function watchMoves() {
        var $moves = $('.move');
        var self = this;
        $moves.each(function (index, element) {
          $(element).on('click', function () {
            self.showNewScene(this.dataset.goto);
          });
        });
      }
    }]);

    return Game;
  }();

  //----------------------------------------------------Main


  var $start = $('#start');
  var $button = $start.find('button');
  var game = new Game();

  $button.on('click', function () {
    $start.css("display", "none");

    game.startNewGame();
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDZiODg1ZDg0N2FjYmJiMTgxNjciLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCJhdWRpbyIsIkF1ZGlvIiwicGxheSIsIiRlbGVtZW50c0luSW52ZW50b3J5IiwiZWxlbWVudHNJbkludmVudG9yeUxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkVG9JbnZlbnRvcnkiLCJQb3dlckJveCIsImlzU29sdmVkIiwiJHBvd2VyQm94IiwibnVtYmVyIiwiY29sb3IiLCJjc3MiLCJnYW1lIiwic2hvd0RpYWxvZ3VlcyIsIlNhZmUiLCIkYnV0dG9uIiwiJGJ1dHRvblN1YiIsIiRidXR0b25EZWwiLCIkYnV0dG9uQmFyIiwicGluIiwiaW5uZXJUZXh0IiwidGV4dCIsImF1ZGlvQmVlcCIsIiRkb29yU2FmZSIsImF1ZGlvU2FmZSIsIkxldmVyIiwicG93ZXJCb3giLCIkbGV2ZXIiLCIkZG9vckhpZGRlblNhZmUiLCJQcmVzc3VyZSIsIiRwaXBlIiwiJHByZXNzdXJlIiwiTWFpblBpcGUiLCJwcmVzc3VyZSIsIiRtYWlucGlwZSIsIiRkb29yRXhpdCIsInNob3dOZXdTY2VuZSIsIkRvb3IiLCIkZG9vciIsIiRjaGFuZ2UiLCJBY3RpdmUiLCJkb29yIiwiJGFjdGl2ZSIsIm9wZW5Eb29yIiwiR2FtZSIsInNjZW5lIiwia2V5MSIsImtleTIiLCJrZXkzIiwia2V5NCIsImtleTUiLCJjcm93YmFyIiwic3RhbmxleSIsImh5ZHJhdWxpYyIsInNhZmUiLCJsZXZlciIsIm1haW5waXBlIiwiZG9vcjEiLCJkb29yMiIsImRvb3IzIiwiZG9vcjQiLCJkb29yNSIsImRvb3I2Iiwib3BlbkJveCIsImRvb3JFZXhpdCIsImxvY2sxIiwibG9jazIiLCJsb2NrMyIsImxvY2s0IiwibG9jazUiLCJsb2NrNiIsImxvY2s3Iiwid2F0Y2hNb3ZlcyIsIm5ld1NjZW5lIiwiJGRpYWxvZ3VlcyIsImh0bWwiLCJzZXRUaW1lb3V0IiwiJG1vdmVzIiwiZGF0YXNldCIsImdvdG8iLCIkc3RhcnQiLCJzdGFydE5ld0dhbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REFBLEVBQUVDLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM5QkYsSUFBRSxVQUFGLEVBQWNHLFFBQWQsQ0FBdUIsUUFBdkI7QUFDQUMsVUFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0Y7O0FBSGdDLE1BSXhCQyxTQUp3QjtBQUs1Qix5QkFBYztBQUFBOztBQUNaLFdBQUtDLGNB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IFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDZiODg1ZDg0N2FjYmJiMTgxNjciLCIkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgJCgnI2xvYWRpbmcnKS5hZGRDbGFzcygnbm9TaG93Jyk7XG4gIGNvbnNvbGUubG9nKCdDb250ZW50IGxvYWRlZCcpO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW52ZW50b3J5XG4gIGNsYXNzIEludmVudG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLnN1YmplY3RzSW5zaWRlID0gW107XG4gICAgfVxuXG4gICAgYWRkU3ViamVjdChzdWJqZWN0KSB7XG4gICAgICB0aGlzLnN1YmplY3RzSW5zaWRlLnB1c2goc3ViamVjdCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN1YmplY3RzSW5zaWRlICsgXCIgYWRkZWQgdG8gaW52ZW50b3J5XCIpO1xuICAgICAgY29uc29sZS5sb2coXCJTdWJqZWN0cyBpbiBpbnZlbnRvcnk6IFwiICsgdGhpcy5zdWJqZWN0c0luc2lkZSk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN1YmplY3RzSW5zaWRlKTtcbiAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG5cbiAgICB3YXRjaCgpIHtcbiAgICAgICAgbGV0ICRlbGVtZW50cyA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCl7XG4gICAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5vZmYoKTtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuc3ViamVjdHNJbnNpZGVbaW5kZXhdLmFjdGl2YXRlKGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TdWJqZWN0XG5cbiAgY2xhc3MgU3ViamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgaW52ZW50b3J5KSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBpbnZlbnRvcnk7XG4gICAgICB0aGlzLmlzSW5JbnZlbnRvcnkgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFzQmVlblVzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2xhc3MgPSAnLicgKyB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgYWRkVG9JbnZlbnRvcnkoKSB7XG4gICAgICBsZXQgJHN1YmplY3QgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICBsZXQgJGludmVudG9yeSA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgICRzdWJqZWN0LmFkZENsYXNzKCdub1Nob3cnKTtcblxuICAgICAgZm9yKGxldCBpPTA7IGk8JGludmVudG9yeS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKCQoJGludmVudG9yeVtpXSkuaGFzQ2xhc3MoJ2VtcHR5JykgJiYgISh0aGlzLmlzSW5JbnZlbnRvcnkpKXtcbiAgICAgICAgICAkKCRpbnZlbnRvcnlbaV0pLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsICcuL2ltYWdlcy9pJyt0aGlzLm5hbWUrJy5wbmcnKTtcbiAgICAgICAgICB0aGlzLmlzSW5JbnZlbnRvcnkgPSB0cnVlO1xuICAgICAgICAgICRpbnZlbnRvcnlbaV0uY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcbiAgICAgICAgICB0aGlzLmludmVudG9yeS5hZGRTdWJqZWN0KHRoaXMpO1xuICAgICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2l0ZW0ud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoaW5kZXgpIHtcbiAgICAgIGxldCAkZWxlbWVudHMgPSAkKCcjaW52ZW50b3J5JykuZmluZCgnZGl2Jyk7XG4gICAgICBsZXQgJGVsZW1lbnRzSW5JbnZlbnRvcnkgPSB0aGlzLmludmVudG9yeS5zdWJqZWN0c0luc2lkZTtcbiAgICAgIGxldCBlbGVtZW50c0luSW52ZW50b3J5TGVuZ3RoID0gJGVsZW1lbnRzSW5JbnZlbnRvcnkubGVuZ3RoO1xuXG4gICAgICBpZih0aGlzLmlzQWN0aXZlID09IGZhbHNlKSB7XG5cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8ZWxlbWVudHNJbkludmVudG9yeUxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpXSkucmVtb3ZlQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgICAgJGVsZW1lbnRzSW5JbnZlbnRvcnlbaV0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygkZWxlbWVudHNJbkludmVudG9yeVtpXS5pc0FjdGl2ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLmFkZENsYXNzKCdpc0FjdGl2ZScpO1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgaXMgYWN0aXZlXCIpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkucmVtb3ZlQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgaXMgbm90IGFjdGl2ZVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3YXRjaCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICQoJy4nICsgdGhpcy5uYW1lKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbGYuYWRkVG9JbnZlbnRvcnkoKTtcbiAgICAgIH0pXG4gICAgfVxuXG4gIH1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUN1YmJ5XG5cbiAgY2xhc3MgUG93ZXJCb3gge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5pc1NvbHZlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgIHRoaXMuaXNTb2x2ZWQgPSB0cnVlO1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0ICRwb3dlckJveCA9ICQoJy5wb3dlckJveCcpO1xuICAgICAgbGV0IG51bWJlcj1bMCwwLDAsMF07XG4gICAgICBsZXQgY29sb3I9WycjNmViYTFhJywnI2ZmMDAwMCcsJyMxZTIwZDknLCcjZTYzYmZiJywnI2ZmZTgxZCcsJyNjMTdjNWEnLCcjZmY3ZjE3JywnI2ZmZmZmZicsJyMwMDAwMDAnXTtcbiAgICAgICRwb3dlckJveC5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBudW1iZXJbaW5kZXhdKys7XG4gICAgICAgICAgaWYobnVtYmVyW2luZGV4XSA9PSAxMCl7XG4gICAgICAgICAgICBudW1iZXJbaW5kZXhdPTE7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyxjb2xvcltudW1iZXJbaW5kZXhdIC0gMV0pO1xuICAgICAgICAgIGlmKG51bWJlclswXT09NiAmJiBudW1iZXJbMV09PTggJiYgbnVtYmVyWzJdPT03ICYmIG51bWJlclszXT09NCl7XG4gICAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJTb21ldGhpbmcgY3JhY2tsZWRcIik7XG4gICAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9wb3dlci53YXYnKTtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2x2ZWQhJyk7XG4gICAgICAgICAgICAkcG93ZXJCb3gub2ZmKCk7XG4gICAgICAgICAgICBzZWxmLmFjdGl2YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFNhZmUge1xuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgJGJ1dHRvbiA9ICQoJy5idXR0b24nKTtcbiAgICAgIGxldCAkYnV0dG9uU3ViID0gJCgnLmJ1dHRvblN1YicpO1xuICAgICAgbGV0ICRidXR0b25EZWwgPSAkKCcuYnV0dG9uRGVsJyk7XG4gICAgICBsZXQgJGJ1dHRvbkJhciA9ICQoJy5idXR0b25CYXInKTtcbiAgICAgIGxldCBwaW4gPSBcIlwiO1xuXG4gICAgICAkYnV0dG9uLmVhY2goZnVuY3Rpb24oaW5kZXgsZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIGlmKHBpbi5sZW5ndGggPDEwKXtcbiAgICAgICAgICAgIHBpbiArPSBlbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBpbik7XG4gICAgICAgICAgICAkYnV0dG9uQmFyLnRleHQocGluKTtcbiAgICAgICAgICAgIGxldCBhdWRpb0JlZXAgPSBuZXcgQXVkaW8oJ3NvdW5kcy9iZWVwLndhdicpO1xuICAgICAgICAgICAgYXVkaW9CZWVwLnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAkYnV0dG9uRGVsLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgcGluID0gXCJcIjtcbiAgICAgICAgJGJ1dHRvbkJhci50ZXh0KHBpbik7XG4gICAgICAgIGxldCBhdWRpb0JlZXAgPSBuZXcgQXVkaW8oJ3NvdW5kcy9iZWVwLndhdicpO1xuICAgICAgICBhdWRpb0JlZXAucGxheSgpO1xuICAgICAgfSk7XG4gICAgICAkYnV0dG9uU3ViLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYocGluID09PSBcIjE2MjYzNjQ2NTZcIil7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3NvbHZlZCEnKTtcbiAgICAgICAgICBsZXQgJGRvb3JTYWZlID0gJCgnLmRvb3JTYWZlJyk7XG4gICAgICAgICAgJGRvb3JTYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIGxldCBhdWRpb1NhZmUgPSBuZXcgQXVkaW8oJ3NvdW5kcy9zYWZlLndhdicpO1xuICAgICAgICAgIGF1ZGlvU2FmZS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiV3JvbmcgcGFzc3dvcmRcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvQmVlcCA9IG5ldyBBdWRpbygnc291bmRzL3dyb25nLndhdicpO1xuICAgICAgICAgIGF1ZGlvQmVlcC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIExldmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3dlckJveCl7XG4gICAgICB0aGlzLnBvd2VyQm94ID0gcG93ZXJCb3g7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgJGxldmVyID0gJCgnLmxldmVyJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkbGV2ZXIub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnBvd2VyQm94LmlzU29sdmVkKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbicpO1xuICAgICAgICAgIGxldCAkZG9vckhpZGRlblNhZmUgPSAkKCcuZG9vckhpZGRlblNhZmUnKTtcbiAgICAgICAgICAkZG9vckhpZGRlblNhZmUuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvU2FmZSA9IG5ldyBBdWRpbygnc291bmRzL3NhZmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW9TYWZlLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJObyBwb3dlclwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy90aWNrLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgUHJlc3N1cmUge1xuICAgIGNvbnN0cnVjdG9yKHN1YmplY3Qpe1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCAkcGlwZSA9ICQoJy5waXBlJyk7XG4gICAgICAkcGlwZS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgbGV0ICRwcmVzc3VyZSA9ICQoJy5wcmVzc3VyZScpO1xuICAgICAgICAgICRwcmVzc3VyZS5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBzZWxmLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJlc3N1cmUnICsgc2VsZi5pc0FjdGl2ZSk7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvcHJlc3N1cmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSSBjYW4ndCB0dXJuIGl0XCIpO1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIkkgY2FuJ3QgdHVybiBpdFwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ncm9hbi5tcDMnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIE1haW5QaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihwcmVzc3VyZSl7XG4gICAgICB0aGlzLnByZXNzdXJlID0gcHJlc3N1cmU7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJG1haW5waXBlID0gJCgnLm1haW5waXBlJyk7XG4gICAgICAkbWFpbnBpcGUub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wcmVzc3VyZS5pc0FjdGl2ZSl7XG4gICAgICAgICAgbGV0ICRkb29yRXhpdCA9ICQoJy5kb29yRXhpdCcpO1xuICAgICAgICAgICRkb29yRXhpdC5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBnYW1lLnNob3dOZXdTY2VuZSgnaDQnKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9tYWluZG9vci53YXYnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIlRoZXJlIGlzIG5vIHByZXNzdXJlXCIpO1xuICAgICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL25vcHJlc3N1cmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRG9vcnNcblxuICBjbGFzcyBEb29yIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cbiAgICBvcGVuRG9vcigpIHtcbiAgICAgIGxldCAkZG9vciA9ICQoJy4nICsgdGhpcy5uYW1lKTtcbiAgICAgICRkb29yLnJlbW92ZUNsYXNzKCdub1Nob3cnKTtcbiAgICAgIGlmKHRoaXMubmFtZSA9PSBcImRvb3I2XCIpe1xuICAgICAgICBsZXQgJGNoYW5nZSA9ICQoJy5oM3RvaDNhJyk7XG4gICAgICAgICRjaGFuZ2UuYWRkQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgICBjb25zb2xlLmxvZygnQ2hhbmdlISEhJyk7XG4gICAgICAgIGdhbWUuc2hvd05ld1NjZW5lKCdoMycpO1xuICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9jcm93YmFyLndhdicpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICB9IGVsc2UgaWYodGhpcy5uYW1lID09IFwib3BlbkJveFwiKXtcbiAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvYm94LndhdicpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9vcGVuZG9vci53YXYnKTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1BY3RpdmVzXG5cbiAgY2xhc3MgQWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzdWJqZWN0LCBkb29yLCB0ZXh0KSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgIHRoaXMuZG9vciA9IGRvb3I7XG4gICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIH1cbiAgICB3YXRjaCgpIHtcbiAgICAgIGxldCAkYWN0aXZlID0gJCgnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGFjdGl2ZS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnN1YmplY3QuaXNBY3RpdmUpe1xuICAgICAgICAgIHNlbGYuZG9vci5vcGVuRG9vcigpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi50ZXh0KTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoc2VsZi50ZXh0KTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9jbG9zZS53YXYnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1HYW1lXG5cbiAgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLnNjZW5lID0gXCJoMVwiO1xuICAgIH1cbiAgICBzdGFydE5ld0dhbWUoKSB7XG4gICAgICAvL2xvYWRpbmcgaW52ZW50b3lcbiAgICAgIGxldCBpbnZlbnRvcnkgPSBuZXcgSW52ZW50b3J5KCk7XG4gICAgICAvL2xvYWRpbmcgc3ViamVjdHNcbiAgICAgIGxldCBrZXkxID0gbmV3IFN1YmplY3QoJ2tleTEnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5MS53YXRjaCgpO1xuICAgICAgbGV0IGtleTIgPSBuZXcgU3ViamVjdCgna2V5MicsIGludmVudG9yeSk7XG4gICAgICBrZXkyLndhdGNoKCk7XG4gICAgICBsZXQga2V5MyA9IG5ldyBTdWJqZWN0KCdrZXkzJywgaW52ZW50b3J5KTtcbiAgICAgIGtleTMud2F0Y2goKTtcbiAgICAgIGxldCBrZXk0ID0gbmV3IFN1YmplY3QoJ2tleTQnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5NC53YXRjaCgpO1xuICAgICAgbGV0IGtleTUgPSBuZXcgU3ViamVjdCgna2V5NScsIGludmVudG9yeSk7XG4gICAgICBrZXk1LndhdGNoKCk7XG4gICAgICBsZXQgY3Jvd2JhciA9IG5ldyBTdWJqZWN0KCdjcm93YmFyJywgaW52ZW50b3J5KTtcbiAgICAgIGNyb3diYXIud2F0Y2goKTtcbiAgICAgIGxldCBzdGFubGV5ID0gbmV3IFN1YmplY3QoJ3N0YW5sZXknLCBpbnZlbnRvcnkpO1xuICAgICAgc3RhbmxleS53YXRjaCgpO1xuICAgICAgbGV0IGh5ZHJhdWxpYyA9IG5ldyBTdWJqZWN0KCdoeWRyYXVsaWMnLCBpbnZlbnRvcnkpO1xuICAgICAgaHlkcmF1bGljLndhdGNoKCk7XG4gICAgICAvL2xvYWRpbmcgY3ViYnlcbiAgICAgIGxldCBwb3dlckJveCA9IG5ldyBQb3dlckJveCgpO1xuICAgICAgcG93ZXJCb3gud2F0Y2goKTtcbiAgICAgIGxldCBzYWZlID0gbmV3IFNhZmUoKTtcbiAgICAgIHNhZmUud2F0Y2goKTtcbiAgICAgIGxldCBsZXZlciA9IG5ldyBMZXZlcihwb3dlckJveCk7XG4gICAgICBsZXZlci53YXRjaCgpO1xuICAgICAgbGV0IHByZXNzdXJlID0gbmV3IFByZXNzdXJlKGh5ZHJhdWxpYyk7XG4gICAgICBwcmVzc3VyZS53YXRjaCgpO1xuICAgICAgbGV0IG1haW5waXBlID0gbmV3IE1haW5QaXBlKHByZXNzdXJlKTtcbiAgICAgIG1haW5waXBlLndhdGNoKCk7XG4gICAgICAvL2xvYWRpbmcgZG9vcnNcbiAgICAgIGxldCBkb29yMSA9IG5ldyBEb29yKCdkb29yMScpO1xuICAgICAgbGV0IGRvb3IyID0gbmV3IERvb3IoJ2Rvb3IyJyk7XG4gICAgICBsZXQgZG9vcjMgPSBuZXcgRG9vcignZG9vcjMnKTtcbiAgICAgIGxldCBkb29yNCA9IG5ldyBEb29yKCdkb29yNCcpO1xuICAgICAgbGV0IGRvb3I1ID0gbmV3IERvb3IoJ2Rvb3I1Jyk7XG4gICAgICBsZXQgZG9vcjYgPSBuZXcgRG9vcignZG9vcjYnKTtcbiAgICAgIGxldCBvcGVuQm94ID0gbmV3IERvb3IoJ29wZW5Cb3gnKTtcbiAgICAgIGxldCBkb29yRWV4aXQgPSBuZXcgRG9vcignZG9vckV4aXQnKTtcbiAgICAgIC8vbG9hZGluZyBhY3RpdmVzXG4gICAgICBsZXQgbG9jazEgPSBuZXcgQWN0aXZlKCdsb2NrMScsIGtleTEsIGRvb3IxLCBcIkxvY2tlZFwiKTtcbiAgICAgIGxvY2sxLndhdGNoKCk7XG4gICAgICBsZXQgbG9jazIgPSBuZXcgQWN0aXZlKCdsb2NrMicsIGtleTIsIGRvb3IyLCBcIkxvY2tlZFwiKTtcbiAgICAgIGxvY2syLndhdGNoKCk7XG4gICAgICBsZXQgbG9jazMgPSBuZXcgQWN0aXZlKCdsb2NrMycsIGtleTMsIGRvb3IzLCBcIkxvY2tlZFwiKTtcbiAgICAgIGxvY2szLndhdGNoKCk7XG4gICAgICBsZXQgbG9jazQgPSBuZXcgQWN0aXZlKCdsb2NrNCcsIGtleTQsIGRvb3I0LCBcIkxvY2tlZFwiKTtcbiAgICAgIGxvY2s0LndhdGNoKCk7XG4gICAgICBsZXQgbG9jazUgPSBuZXcgQWN0aXZlKCdsb2NrNScsIGtleTUsIGRvb3I1LCBcIkxvY2tlZFwiKTtcbiAgICAgIGxvY2s1LndhdGNoKCk7XG4gICAgICBsZXQgbG9jazYgPSBuZXcgQWN0aXZlKCdsb2NrNicsIGNyb3diYXIsIGRvb3I2LCBcIkkgY2FuJ3QgbW92ZSBpdFwiKTtcbiAgICAgIGxvY2s2LndhdGNoKCk7XG4gICAgICBsZXQgbG9jazcgPSBuZXcgQWN0aXZlKCdsb2NrNycsIHN0YW5sZXksIG9wZW5Cb3gsIFwiVGhpcyB0YXBlIGlzIHRvbyBzdHJvbmdcIik7XG4gICAgICBsb2NrNy53YXRjaCgpO1xuICAgICAgLy9sb2FkaW5nIHNjZW5lc1xuICAgICAgdGhpcy5zaG93TmV3U2NlbmUodGhpcy5zY2VuZSk7XG4gICAgICB0aGlzLndhdGNoTW92ZXMoKTtcbiAgICB9XG4gICAgc2hvd05ld1NjZW5lKG5ld1NjZW5lKSB7XG4gICAgICAkKCcuJysgdGhpcy5zY2VuZSkuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICQoJy4nKyBuZXdTY2VuZSkuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICB0aGlzLnNjZW5lID0gbmV3U2NlbmU7XG4gICAgfVxuICAgIHNob3dEaWFsb2d1ZXModGV4dCl7XG4gICAgICAvL2ZpbmQgZGlhbG9ndWVzXG4gICAgICBsZXQgJGRpYWxvZ3VlcyA9ICQoJyNkaWFsb2d1ZXMnKTtcbiAgICAgICRkaWFsb2d1ZXMuaHRtbCggXCI8cD5cIit0ZXh0K1wiPC9wPlwiICk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICRkaWFsb2d1ZXMuaHRtbChcIlwiKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgICB3YXRjaE1vdmVzKCkge1xuICAgICAgbGV0ICRtb3ZlcyA9ICQoJy5tb3ZlJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkbW92ZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIHNlbGYuc2hvd05ld1NjZW5lKHRoaXMuZGF0YXNldC5nb3RvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTWFpblxuICBsZXQgJHN0YXJ0ID0gJCgnI3N0YXJ0Jyk7XG4gIGxldCAkYnV0dG9uID0gJHN0YXJ0LmZpbmQoJ2J1dHRvbicpO1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG5cbiAgJGJ1dHRvbi5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgJHN0YXJ0LmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XG5cbiAgICBnYW1lLnN0YXJ0TmV3R2FtZSgpO1xuICB9KTtcblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9