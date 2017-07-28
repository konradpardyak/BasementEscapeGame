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

  var game = new Game();
  game.startNewGame();
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDEzY2QxMjc0MGJiNGRlMTgzN2EiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCJhdWRpbyIsIkF1ZGlvIiwicGxheSIsIiRlbGVtZW50c0luSW52ZW50b3J5IiwiZWxlbWVudHNJbkludmVudG9yeUxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkVG9JbnZlbnRvcnkiLCJQb3dlckJveCIsImlzU29sdmVkIiwiJHBvd2VyQm94IiwibnVtYmVyIiwiY29sb3IiLCJjc3MiLCJnYW1lIiwic2hvd0RpYWxvZ3VlcyIsIlNhZmUiLCIkYnV0dG9uIiwiJGJ1dHRvblN1YiIsIiRidXR0b25EZWwiLCIkYnV0dG9uQmFyIiwicGluIiwiaW5uZXJUZXh0IiwidGV4dCIsImF1ZGlvQmVlcCIsIiRkb29yU2FmZSIsImF1ZGlvU2FmZSIsIkxldmVyIiwicG93ZXJCb3giLCIkbGV2ZXIiLCIkZG9vckhpZGRlblNhZmUiLCJQcmVzc3VyZSIsIiRwaXBlIiwiJHByZXNzdXJlIiwiTWFpblBpcGUiLCJwcmVzc3VyZSIsIiRtYWlucGlwZSIsIiRkb29yRXhpdCIsInNob3dOZXdTY2VuZSIsIkRvb3IiLCIkZG9vciIsIiRjaGFuZ2UiLCJBY3RpdmUiLCJkb29yIiwiJGFjdGl2ZSIsIm9wZW5Eb29yIiwiR2FtZSIsInNjZW5lIiwia2V5MSIsImtleTIiLCJrZXkzIiwia2V5NCIsImtleTUiLCJjcm93YmFyIiwic3RhbmxleSIsImh5ZHJhdWxpYyIsInNhZmUiLCJsZXZlciIsIm1haW5waXBlIiwiZG9vcjEiLCJkb29yMiIsImRvb3IzIiwiZG9vcjQiLCJkb29yNSIsImRvb3I2Iiwib3BlbkJveCIsImRvb3JFZXhpdCIsImxvY2sxIiwibG9jazIiLCJsb2NrMyIsImxvY2s0IiwibG9jazUiLCJsb2NrNiIsImxvY2s3Iiwid2F0Y2hNb3ZlcyIsIm5ld1NjZW5lIiwiJGRpYWxvZ3VlcyIsImh0bWwiLCJzZXRUaW1lb3V0IiwiJG1vdmVzIiwiZGF0YXNldCIsImdvdG8iLCJzdGFydE5ld0dhbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REFBLEVBQUVDLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM5QkYsSUFBRSxVQUFGLEVBQWNHLFFBQWQsQ0FBdUIsUUFBdkI7QUFDQUMsVUFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0Y7O0FBSGdDLE1BSXhCQyxTQUp3QjtBQUs1Qix5QkFBYztBQUFBOztBQUNaLFdBQUtDLGNBQUwsR0FBc0Is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QW5CLENBQXVCLFNBQXZCLEVBQWlDLE1BQWpDO0FBQ0EvQyxVQUFFLE1BQUs2RyxRQUFQLEVBQWlCOUQsR0FBakIsQ0FBcUIsU0FBckIsRUFBK0IsT0FBL0I7QUFDQSxhQUFLa0MsS0FBTCxHQUFhNEIsUUFBYjtBQUNEO0FBdlcyQjtBQUFBO0FBQUEsb0NBd1dkcEQsSUF4V2MsRUF3V1Q7QUFDakI7QUFDQSxZQUFJcUQsYUFBYTlHLEVBQUUsWUFBRixDQUFqQjtBQUNBOEcsbUJBQVdDLElBQVgsQ0FBaUIsUUFBTXRELElBQU4sR0FBVyxNQUE1QjtBQUNBdUQsbUJBQVcsWUFBVTtBQUNuQkYscUJBQVdDLElBQVgsQ0FBZ0IsRUFBaEI7QUFDRCxTQUZELEVBRUcsSUFGSDtBQUdEO0FBL1cyQjtBQUFBO0FBQUEsbUNBZ1hmO0FBQ1gsWUFBSUUsU0FBU2pILEVBQUUsT0FBRixDQUFiO0FBQ0EsWUFBSWEsT0FBTyxJQUFYO0FBQ0FvRyxlQUFPbkcsSUFBUCxDQUFZLFVBQVNDLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXdCO0FBQ2xDaEIsWUFBRWdCLE9BQUYsRUFBV2QsRUFBWCxDQUFjLE9BQWQsRUFBc0IsWUFBVTtBQUM5QlcsaUJBQUsyRCxZQUFMLENBQWtCLEtBQUswQyxPQUFMLENBQWFDLElBQS9CO0FBQ0QsV0FGRDtBQUdELFNBSkQ7QUFLRDtBQXhYMkI7O0FBQUE7QUFBQTs7QUEyWGhDOztBQUVFLE1BQUluRSxPQUFPLElBQUlnQyxJQUFKLEVBQVg7QUFDQWhDLE9BQUtvRSxZQUFMO0FBRUQsQ0FoWUQsRSIsImZpbGUiOiIuL2pzL291dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQxM2NkMTI3NDBiYjRkZTE4MzdhIiwiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICQoJyNsb2FkaW5nJykuYWRkQ2xhc3MoJ25vU2hvdycpO1xuICBjb25zb2xlLmxvZygnQ29udGVudCBsb2FkZWQnKTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUludmVudG9yeVxuICBjbGFzcyBJbnZlbnRvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zdWJqZWN0c0luc2lkZSA9IFtdO1xuICAgIH1cblxuICAgIGFkZFN1YmplY3Qoc3ViamVjdCkge1xuICAgICAgdGhpcy5zdWJqZWN0c0luc2lkZS5wdXNoKHN1YmplY3QpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdWJqZWN0c0luc2lkZSArIFwiIGFkZGVkIHRvIGludmVudG9yeVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3ViamVjdHMgaW4gaW52ZW50b3J5OiBcIiArIHRoaXMuc3ViamVjdHNJbnNpZGUpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdWJqZWN0c0luc2lkZSk7XG4gICAgICB0aGlzLndhdGNoKCk7XG4gICAgfVxuXG4gICAgd2F0Y2goKSB7XG4gICAgICAgIGxldCAkZWxlbWVudHMgPSAkKCcjaW52ZW50b3J5JykuZmluZCgnZGl2Jyk7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpe1xuICAgICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkub2ZmKCk7XG4gICAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnN1YmplY3RzSW5zaWRlW2luZGV4XS5hY3RpdmF0ZShpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tU3ViamVjdFxuXG4gIGNsYXNzIFN1YmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGludmVudG9yeSkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMuaW52ZW50b3J5ID0gaW52ZW50b3J5O1xuICAgICAgdGhpcy5pc0luSW52ZW50b3J5ID0gZmFsc2U7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmhhc0JlZW5Vc2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmNsYXNzID0gJy4nICsgdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGFkZFRvSW52ZW50b3J5KCkge1xuICAgICAgbGV0ICRzdWJqZWN0ID0gJCgnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgbGV0ICRpbnZlbnRvcnkgPSAkKCcjaW52ZW50b3J5JykuZmluZCgnZGl2Jyk7XG4gICAgICAkc3ViamVjdC5hZGRDbGFzcygnbm9TaG93Jyk7XG5cbiAgICAgIGZvcihsZXQgaT0wOyBpPCRpbnZlbnRvcnkubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZigkKCRpbnZlbnRvcnlbaV0pLmhhc0NsYXNzKCdlbXB0eScpICYmICEodGhpcy5pc0luSW52ZW50b3J5KSl7XG4gICAgICAgICAgJCgkaW52ZW50b3J5W2ldKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnLCAnLi9pbWFnZXMvaScrdGhpcy5uYW1lKycucG5nJyk7XG4gICAgICAgICAgdGhpcy5pc0luSW52ZW50b3J5ID0gdHJ1ZTtcbiAgICAgICAgICAkaW52ZW50b3J5W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XG4gICAgICAgICAgdGhpcy5pbnZlbnRvcnkuYWRkU3ViamVjdCh0aGlzKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9pdGVtLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGFjdGl2YXRlKGluZGV4KSB7XG4gICAgICBsZXQgJGVsZW1lbnRzID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgbGV0ICRlbGVtZW50c0luSW52ZW50b3J5ID0gdGhpcy5pbnZlbnRvcnkuc3ViamVjdHNJbnNpZGU7XG4gICAgICBsZXQgZWxlbWVudHNJbkludmVudG9yeUxlbmd0aCA9ICRlbGVtZW50c0luSW52ZW50b3J5Lmxlbmd0aDtcblxuICAgICAgaWYodGhpcy5pc0FjdGl2ZSA9PSBmYWxzZSkge1xuXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgJCgkZWxlbWVudHNbaV0pLnJlbW92ZUNsYXNzKCdpc0FjdGl2ZScpO1xuICAgICAgICAgICRlbGVtZW50c0luSW52ZW50b3J5W2ldLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnRzSW5JbnZlbnRvcnlbaV0uaXNBY3RpdmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5hZGRDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiIGlzIGFjdGl2ZVwiKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLnJlbW92ZUNsYXNzKCdpc0FjdGl2ZScpO1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiIGlzIG5vdCBhY3RpdmVcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2F0Y2goKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkKCcuJyArIHRoaXMubmFtZSkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLmFkZFRvSW52ZW50b3J5KCk7XG4gICAgICB9KVxuICAgIH1cblxuICB9XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DdWJieVxuXG4gIGNsYXNzIFBvd2VyQm94IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuaXNTb2x2ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICB0aGlzLmlzU29sdmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCAkcG93ZXJCb3ggPSAkKCcucG93ZXJCb3gnKTtcbiAgICAgIGxldCBudW1iZXI9WzAsMCwwLDBdO1xuICAgICAgbGV0IGNvbG9yPVsnIzZlYmExYScsJyNmZjAwMDAnLCcjMWUyMGQ5JywnI2U2M2JmYicsJyNmZmU4MWQnLCcjYzE3YzVhJywnI2ZmN2YxNycsJyNmZmZmZmYnLCcjMDAwMDAwJ107XG4gICAgICAkcG93ZXJCb3guZWFjaChmdW5jdGlvbihpbmRleCxlbGVtZW50KXtcbiAgICAgICAgJChlbGVtZW50KS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgbnVtYmVyW2luZGV4XSsrO1xuICAgICAgICAgIGlmKG51bWJlcltpbmRleF0gPT0gMTApe1xuICAgICAgICAgICAgbnVtYmVyW2luZGV4XT0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsY29sb3JbbnVtYmVyW2luZGV4XSAtIDFdKTtcbiAgICAgICAgICBpZihudW1iZXJbMF09PTYgJiYgbnVtYmVyWzFdPT04ICYmIG51bWJlclsyXT09NyAmJiBudW1iZXJbM109PTQpe1xuICAgICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiU29tZXRoaW5nIGNyYWNrbGVkXCIpO1xuICAgICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvcG93ZXIud2F2Jyk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc29sdmVkIScpO1xuICAgICAgICAgICAgJHBvd2VyQm94Lm9mZigpO1xuICAgICAgICAgICAgc2VsZi5hY3RpdmF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBTYWZlIHtcbiAgICB3YXRjaCgpe1xuICAgICAgbGV0ICRidXR0b24gPSAkKCcuYnV0dG9uJyk7XG4gICAgICBsZXQgJGJ1dHRvblN1YiA9ICQoJy5idXR0b25TdWInKTtcbiAgICAgIGxldCAkYnV0dG9uRGVsID0gJCgnLmJ1dHRvbkRlbCcpO1xuICAgICAgbGV0ICRidXR0b25CYXIgPSAkKCcuYnV0dG9uQmFyJyk7XG4gICAgICBsZXQgcGluID0gXCJcIjtcblxuICAgICAgJGJ1dHRvbi5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZihwaW4ubGVuZ3RoIDwxMCl7XG4gICAgICAgICAgICBwaW4gKz0gZWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwaW4pO1xuICAgICAgICAgICAgJGJ1dHRvbkJhci50ZXh0KHBpbik7XG4gICAgICAgICAgICBsZXQgYXVkaW9CZWVwID0gbmV3IEF1ZGlvKCdzb3VuZHMvYmVlcC53YXYnKTtcbiAgICAgICAgICAgIGF1ZGlvQmVlcC5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgJGJ1dHRvbkRlbC5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIHBpbiA9IFwiXCI7XG4gICAgICAgICRidXR0b25CYXIudGV4dChwaW4pO1xuICAgICAgICBsZXQgYXVkaW9CZWVwID0gbmV3IEF1ZGlvKCdzb3VuZHMvYmVlcC53YXYnKTtcbiAgICAgICAgYXVkaW9CZWVwLnBsYXkoKTtcbiAgICAgIH0pO1xuICAgICAgJGJ1dHRvblN1Yi5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHBpbiA9PT0gXCIxNjI2MzY0NjU2XCIpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2x2ZWQhJyk7XG4gICAgICAgICAgbGV0ICRkb29yU2FmZSA9ICQoJy5kb29yU2FmZScpO1xuICAgICAgICAgICRkb29yU2FmZS5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBsZXQgYXVkaW9TYWZlID0gbmV3IEF1ZGlvKCdzb3VuZHMvc2FmZS53YXYnKTtcbiAgICAgICAgICBhdWRpb1NhZmUucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIldyb25nIHBhc3N3b3JkXCIpO1xuICAgICAgICAgIGxldCBhdWRpb0JlZXAgPSBuZXcgQXVkaW8oJ3NvdW5kcy93cm9uZy53YXYnKTtcbiAgICAgICAgICBhdWRpb0JlZXAucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBMZXZlciB7XG4gICAgY29uc3RydWN0b3IocG93ZXJCb3gpe1xuICAgICAgdGhpcy5wb3dlckJveCA9IHBvd2VyQm94O1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0ICRsZXZlciA9ICQoJy5sZXZlcicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGxldmVyLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wb3dlckJveC5pc1NvbHZlZCl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wZW4nKTtcbiAgICAgICAgICBsZXQgJGRvb3JIaWRkZW5TYWZlID0gJCgnLmRvb3JIaWRkZW5TYWZlJyk7XG4gICAgICAgICAgJGRvb3JIaWRkZW5TYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIGxldCBhdWRpb1NhZmUgPSBuZXcgQXVkaW8oJ3NvdW5kcy9zYWZlLndhdicpO1xuICAgICAgICAgIGF1ZGlvU2FmZS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiTm8gcG93ZXJcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvdGljay53YXYnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFByZXNzdXJlIHtcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0KXtcbiAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJHBpcGUgPSAkKCcucGlwZScpO1xuICAgICAgJHBpcGUub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnN1YmplY3QuaXNBY3RpdmUpe1xuICAgICAgICAgIGxldCAkcHJlc3N1cmUgPSAkKCcucHJlc3N1cmUnKTtcbiAgICAgICAgICAkcHJlc3N1cmUuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgc2VsZi5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzdXJlJyArIHNlbGYuaXNBY3RpdmUpO1xuICAgICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3ByZXNzdXJlLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgY2FuJ3QgdHVybiBpdFwiKTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJJIGNhbid0IHR1cm4gaXRcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvZ3JvYW4ubXAzJyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBNYWluUGlwZSB7XG4gICAgY29uc3RydWN0b3IocHJlc3N1cmUpe1xuICAgICAgdGhpcy5wcmVzc3VyZSA9IHByZXNzdXJlO1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0ICRtYWlucGlwZSA9ICQoJy5tYWlucGlwZScpO1xuICAgICAgJG1haW5waXBlLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYucHJlc3N1cmUuaXNBY3RpdmUpe1xuICAgICAgICAgIGxldCAkZG9vckV4aXQgPSAkKCcuZG9vckV4aXQnKTtcbiAgICAgICAgICAkZG9vckV4aXQuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgZ2FtZS5zaG93TmV3U2NlbmUoJ2g0Jyk7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvbWFpbmRvb3Iud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJUaGVyZSBpcyBubyBwcmVzc3VyZVwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ub3ByZXNzdXJlLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURvb3JzXG5cbiAgY2xhc3MgRG9vciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG4gICAgb3BlbkRvb3IoKSB7XG4gICAgICBsZXQgJGRvb3IgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICAkZG9vci5yZW1vdmVDbGFzcygnbm9TaG93Jyk7XG4gICAgICBpZih0aGlzLm5hbWUgPT0gXCJkb29yNlwiKXtcbiAgICAgICAgbGV0ICRjaGFuZ2UgPSAkKCcuaDN0b2gzYScpO1xuICAgICAgICAkY2hhbmdlLmFkZENsYXNzKCdub1Nob3cnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0NoYW5nZSEhIScpO1xuICAgICAgICBnYW1lLnNob3dOZXdTY2VuZSgnaDMnKTtcbiAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvY3Jvd2Jhci53YXYnKTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgfSBlbHNlIGlmKHRoaXMubmFtZSA9PSBcIm9wZW5Cb3hcIil7XG4gICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2JveC53YXYnKTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvb3BlbmRvb3Iud2F2Jyk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQWN0aXZlc1xuXG4gIGNsYXNzIEFjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgc3ViamVjdCwgZG9vciwgdGV4dCkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICB0aGlzLmRvb3IgPSBkb29yO1xuICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB9XG4gICAgd2F0Y2goKSB7XG4gICAgICBsZXQgJGFjdGl2ZSA9ICQoJy4nICsgdGhpcy5uYW1lKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICRhY3RpdmUub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5zdWJqZWN0LmlzQWN0aXZlKXtcbiAgICAgICAgICBzZWxmLmRvb3Iub3BlbkRvb3IoKTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYudGV4dCk7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKHNlbGYudGV4dCk7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvY2xvc2Uud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZVxuXG4gIGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zY2VuZSA9IFwiaDFcIjtcbiAgICB9XG4gICAgc3RhcnROZXdHYW1lKCkge1xuICAgICAgLy9sb2FkaW5nIGludmVudG95XG4gICAgICBsZXQgaW52ZW50b3J5ID0gbmV3IEludmVudG9yeSgpO1xuICAgICAgLy9sb2FkaW5nIHN1YmplY3RzXG4gICAgICBsZXQga2V5MSA9IG5ldyBTdWJqZWN0KCdrZXkxJywgaW52ZW50b3J5KTtcbiAgICAgIGtleTEud2F0Y2goKTtcbiAgICAgIGxldCBrZXkyID0gbmV3IFN1YmplY3QoJ2tleTInLCBpbnZlbnRvcnkpO1xuICAgICAga2V5Mi53YXRjaCgpO1xuICAgICAgbGV0IGtleTMgPSBuZXcgU3ViamVjdCgna2V5MycsIGludmVudG9yeSk7XG4gICAgICBrZXkzLndhdGNoKCk7XG4gICAgICBsZXQga2V5NCA9IG5ldyBTdWJqZWN0KCdrZXk0JywgaW52ZW50b3J5KTtcbiAgICAgIGtleTQud2F0Y2goKTtcbiAgICAgIGxldCBrZXk1ID0gbmV3IFN1YmplY3QoJ2tleTUnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5NS53YXRjaCgpO1xuICAgICAgbGV0IGNyb3diYXIgPSBuZXcgU3ViamVjdCgnY3Jvd2JhcicsIGludmVudG9yeSk7XG4gICAgICBjcm93YmFyLndhdGNoKCk7XG4gICAgICBsZXQgc3RhbmxleSA9IG5ldyBTdWJqZWN0KCdzdGFubGV5JywgaW52ZW50b3J5KTtcbiAgICAgIHN0YW5sZXkud2F0Y2goKTtcbiAgICAgIGxldCBoeWRyYXVsaWMgPSBuZXcgU3ViamVjdCgnaHlkcmF1bGljJywgaW52ZW50b3J5KTtcbiAgICAgIGh5ZHJhdWxpYy53YXRjaCgpO1xuICAgICAgLy9sb2FkaW5nIGN1YmJ5XG4gICAgICBsZXQgcG93ZXJCb3ggPSBuZXcgUG93ZXJCb3goKTtcbiAgICAgIHBvd2VyQm94LndhdGNoKCk7XG4gICAgICBsZXQgc2FmZSA9IG5ldyBTYWZlKCk7XG4gICAgICBzYWZlLndhdGNoKCk7XG4gICAgICBsZXQgbGV2ZXIgPSBuZXcgTGV2ZXIocG93ZXJCb3gpO1xuICAgICAgbGV2ZXIud2F0Y2goKTtcbiAgICAgIGxldCBwcmVzc3VyZSA9IG5ldyBQcmVzc3VyZShoeWRyYXVsaWMpO1xuICAgICAgcHJlc3N1cmUud2F0Y2goKTtcbiAgICAgIGxldCBtYWlucGlwZSA9IG5ldyBNYWluUGlwZShwcmVzc3VyZSk7XG4gICAgICBtYWlucGlwZS53YXRjaCgpO1xuICAgICAgLy9sb2FkaW5nIGRvb3JzXG4gICAgICBsZXQgZG9vcjEgPSBuZXcgRG9vcignZG9vcjEnKTtcbiAgICAgIGxldCBkb29yMiA9IG5ldyBEb29yKCdkb29yMicpO1xuICAgICAgbGV0IGRvb3IzID0gbmV3IERvb3IoJ2Rvb3IzJyk7XG4gICAgICBsZXQgZG9vcjQgPSBuZXcgRG9vcignZG9vcjQnKTtcbiAgICAgIGxldCBkb29yNSA9IG5ldyBEb29yKCdkb29yNScpO1xuICAgICAgbGV0IGRvb3I2ID0gbmV3IERvb3IoJ2Rvb3I2Jyk7XG4gICAgICBsZXQgb3BlbkJveCA9IG5ldyBEb29yKCdvcGVuQm94Jyk7XG4gICAgICBsZXQgZG9vckVleGl0ID0gbmV3IERvb3IoJ2Rvb3JFeGl0Jyk7XG4gICAgICAvL2xvYWRpbmcgYWN0aXZlc1xuICAgICAgbGV0IGxvY2sxID0gbmV3IEFjdGl2ZSgnbG9jazEnLCBrZXkxLCBkb29yMSwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMS53YXRjaCgpO1xuICAgICAgbGV0IGxvY2syID0gbmV3IEFjdGl2ZSgnbG9jazInLCBrZXkyLCBkb29yMiwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMi53YXRjaCgpO1xuICAgICAgbGV0IGxvY2szID0gbmV3IEFjdGl2ZSgnbG9jazMnLCBrZXkzLCBkb29yMywgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMy53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s0ID0gbmV3IEFjdGl2ZSgnbG9jazQnLCBrZXk0LCBkb29yNCwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrNC53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s1ID0gbmV3IEFjdGl2ZSgnbG9jazUnLCBrZXk1LCBkb29yNSwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrNS53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s2ID0gbmV3IEFjdGl2ZSgnbG9jazYnLCBjcm93YmFyLCBkb29yNiwgXCJJIGNhbid0IG1vdmUgaXRcIik7XG4gICAgICBsb2NrNi53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s3ID0gbmV3IEFjdGl2ZSgnbG9jazcnLCBzdGFubGV5LCBvcGVuQm94LCBcIlRoaXMgdGFwZSBpcyB0b28gc3Ryb25nXCIpO1xuICAgICAgbG9jazcud2F0Y2goKTtcbiAgICAgIC8vbG9hZGluZyBzY2VuZXNcbiAgICAgIHRoaXMuc2hvd05ld1NjZW5lKHRoaXMuc2NlbmUpO1xuICAgICAgdGhpcy53YXRjaE1vdmVzKCk7XG4gICAgfVxuICAgIHNob3dOZXdTY2VuZShuZXdTY2VuZSkge1xuICAgICAgJCgnLicrIHRoaXMuc2NlbmUpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XG4gICAgICAkKCcuJysgbmV3U2NlbmUpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgdGhpcy5zY2VuZSA9IG5ld1NjZW5lO1xuICAgIH1cbiAgICBzaG93RGlhbG9ndWVzKHRleHQpe1xuICAgICAgLy9maW5kIGRpYWxvZ3Vlc1xuICAgICAgbGV0ICRkaWFsb2d1ZXMgPSAkKCcjZGlhbG9ndWVzJyk7XG4gICAgICAkZGlhbG9ndWVzLmh0bWwoIFwiPHA+XCIrdGV4dCtcIjwvcD5cIiApO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkZGlhbG9ndWVzLmh0bWwoXCJcIik7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gICAgd2F0Y2hNb3ZlcygpIHtcbiAgICAgIGxldCAkbW92ZXMgPSAkKCcubW92ZScpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJG1vdmVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBzZWxmLnNob3dOZXdTY2VuZSh0aGlzLmRhdGFzZXQuZ290byk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU1haW5cblxuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnROZXdHYW1lKCk7XG5cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==