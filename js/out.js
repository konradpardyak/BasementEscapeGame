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
            }
          });
        });
        $buttonDel.on('click', function () {
          pin = "";
          $buttonBar.text(pin);
        });
        $buttonSub.on('click', function () {
          if (pin === "1626364656") {
            console.log('solved!');
            var $doorSafe = $('.doorSafe');
            $doorSafe.css("display", "block");
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
          } else {
            console.log("I can't turn it");
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
          } else {
            console.log('There is no pressure');
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
        var lock7 = new Active('lock7', stanley, openBox, "This tape is strong");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjRiMTNhNDk0MjhjZjg1NDMzODIiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCIkZWxlbWVudHNJbkludmVudG9yeSIsImVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGgiLCJyZW1vdmVDbGFzcyIsImFkZFRvSW52ZW50b3J5IiwiUG93ZXJCb3giLCJpc1NvbHZlZCIsIiRwb3dlckJveCIsIm51bWJlciIsImNvbG9yIiwiY3NzIiwiU2FmZSIsIiRidXR0b24iLCIkYnV0dG9uU3ViIiwiJGJ1dHRvbkRlbCIsIiRidXR0b25CYXIiLCJwaW4iLCJpbm5lclRleHQiLCJ0ZXh0IiwiJGRvb3JTYWZlIiwiTGV2ZXIiLCJwb3dlckJveCIsIiRsZXZlciIsIiRkb29ySGlkZGVuU2FmZSIsIlByZXNzdXJlIiwiJHBpcGUiLCIkcHJlc3N1cmUiLCJNYWluUGlwZSIsInByZXNzdXJlIiwiJG1haW5waXBlIiwiJGRvb3JFeGl0IiwiZ2FtZSIsInNob3dOZXdTY2VuZSIsIkRvb3IiLCIkZG9vciIsIiRjaGFuZ2UiLCJBY3RpdmUiLCJkb29yIiwiJGFjdGl2ZSIsIm9wZW5Eb29yIiwiR2FtZSIsInNjZW5lIiwia2V5MSIsImtleTIiLCJrZXkzIiwia2V5NCIsImtleTUiLCJjcm93YmFyIiwic3RhbmxleSIsImh5ZHJhdWxpYyIsInNhZmUiLCJsZXZlciIsIm1haW5waXBlIiwiZG9vcjEiLCJkb29yMiIsImRvb3IzIiwiZG9vcjQiLCJkb29yNSIsImRvb3I2Iiwib3BlbkJveCIsImRvb3JFZXhpdCIsImxvY2sxIiwibG9jazIiLCJsb2NrMyIsImxvY2s0IiwibG9jazUiLCJsb2NrNiIsImxvY2s3Iiwid2F0Y2hNb3ZlcyIsIm5ld1NjZW5lIiwiJG1vdmVzIiwiZGF0YXNldCIsImdvdG8iLCJzdGFydE5ld0dhbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REFBLEVBQUVDLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM5QkYsSUFBRSxVQUFGLEVBQWNHLFFBQWQsQ0FBdUIsUUFBdkI7QUFDQUMsVUFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0Y7O0FBSGdDLE1BSXhCQyxTQUp3QjtBQUs1Qix5QkFBYztBQUFBOztBQUNaLFdBQUtDLGNBQUwsR0FBc0IsRUFBdEI7QUFDRDs7QUFQMkI7QUFBQTtBQUFBLGlDQVNqQkMsT0FUaUIsRUFTUjtBQUNsQixhQUFLRCxjQUFMLENBQW9CRSxJQUFwQixDQUF5QkQsT0FBekI7QUFDQUos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b3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNGIxM2E0OTQyOGNmODU0MzM4MiIsIiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAkKCcjbG9hZGluZycpLmFkZENsYXNzKCdub1Nob3cnKTtcbiAgY29uc29sZS5sb2coJ0NvbnRlbnQgbG9hZGVkJyk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbnZlbnRvcnlcbiAgY2xhc3MgSW52ZW50b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuc3ViamVjdHNJbnNpZGUgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRTdWJqZWN0KHN1YmplY3QpIHtcbiAgICAgIHRoaXMuc3ViamVjdHNJbnNpZGUucHVzaChzdWJqZWN0KTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ViamVjdHNJbnNpZGUgKyBcIiBhZGRlZCB0byBpbnZlbnRvcnlcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlN1YmplY3RzIGluIGludmVudG9yeTogXCIgKyB0aGlzLnN1YmplY3RzSW5zaWRlKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ViamVjdHNJbnNpZGUpO1xuICAgICAgdGhpcy53YXRjaCgpO1xuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgICBsZXQgJGVsZW1lbnRzID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLm9mZigpO1xuICAgICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5zdWJqZWN0c0luc2lkZVtpbmRleF0uYWN0aXZhdGUoaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVN1YmplY3RcblxuICBjbGFzcyBTdWJqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpbnZlbnRvcnkpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLmludmVudG9yeSA9IGludmVudG9yeTtcbiAgICAgIHRoaXMuaXNJbkludmVudG9yeSA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5oYXNCZWVuVXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jbGFzcyA9ICcuJyArIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBhZGRUb0ludmVudG9yeSgpIHtcbiAgICAgIGxldCAkc3ViamVjdCA9ICQoJy4nICsgdGhpcy5uYW1lKTtcbiAgICAgIGxldCAkaW52ZW50b3J5ID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgJHN1YmplY3QuYWRkQ2xhc3MoJ25vU2hvdycpO1xuXG4gICAgICBmb3IobGV0IGk9MDsgaTwkaW52ZW50b3J5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYoJCgkaW52ZW50b3J5W2ldKS5oYXNDbGFzcygnZW1wdHknKSAmJiAhKHRoaXMuaXNJbkludmVudG9yeSkpe1xuICAgICAgICAgICQoJGludmVudG9yeVtpXSkuZmluZCgnaW1nJykuYXR0cignc3JjJywgJy4vaW1hZ2VzL2knK3RoaXMubmFtZSsnLnBuZycpO1xuICAgICAgICAgIHRoaXMuaXNJbkludmVudG9yeSA9IHRydWU7XG4gICAgICAgICAgJGludmVudG9yeVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuICAgICAgICAgIHRoaXMuaW52ZW50b3J5LmFkZFN1YmplY3QodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3RpdmF0ZShpbmRleCkge1xuICAgICAgbGV0ICRlbGVtZW50cyA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgIGxldCAkZWxlbWVudHNJbkludmVudG9yeSA9IHRoaXMuaW52ZW50b3J5LnN1YmplY3RzSW5zaWRlO1xuICAgICAgbGV0IGVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGggPSAkZWxlbWVudHNJbkludmVudG9yeS5sZW5ndGg7XG5cbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUgPT0gZmFsc2UpIHtcblxuICAgICAgICBmb3IobGV0IGk9MDsgaTxlbGVtZW50c0luSW52ZW50b3J5TGVuZ3RoOyBpKyspe1xuICAgICAgICAgICQoJGVsZW1lbnRzW2ldKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgICAkZWxlbWVudHNJbkludmVudG9yeVtpXS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCRlbGVtZW50c0luSW52ZW50b3J5W2ldLmlzQWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkuYWRkQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBhY3RpdmVcIik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBub3QgYWN0aXZlXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJCgnLicgKyB0aGlzLm5hbWUpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5hZGRUb0ludmVudG9yeSgpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3ViYnlcblxuICBjbGFzcyBQb3dlckJveCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLmlzU29sdmVkID0gZmFsc2U7XG4gICAgfVxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgdGhpcy5pc1NvbHZlZCA9IHRydWU7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJHBvd2VyQm94ID0gJCgnLnBvd2VyQm94Jyk7XG4gICAgICBsZXQgbnVtYmVyPVswLDAsMCwwXTtcbiAgICAgIGxldCBjb2xvcj1bJyM2ZWJhMWEnLCcjZmYwMDAwJywnIzFlMjBkOScsJyNlNjNiZmInLCcjZmZlODFkJywnI2MxN2M1YScsJyNmZjdmMTcnLCcjZmZmZmZmJywnIzAwMDAwMCddO1xuICAgICAgJHBvd2VyQm94LmVhY2goZnVuY3Rpb24oaW5kZXgsZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIG51bWJlcltpbmRleF0rKztcbiAgICAgICAgICBpZihudW1iZXJbaW5kZXhdID09IDEwKXtcbiAgICAgICAgICAgIG51bWJlcltpbmRleF09MTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtY29sb3InLGNvbG9yW251bWJlcltpbmRleF0gLSAxXSk7XG4gICAgICAgICAgaWYobnVtYmVyWzBdPT02ICYmIG51bWJlclsxXT09OCAmJiBudW1iZXJbMl09PTcgJiYgbnVtYmVyWzNdPT00KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2x2ZWQhJyk7XG4gICAgICAgICAgICAkcG93ZXJCb3gub2ZmKCk7XG4gICAgICAgICAgICBzZWxmLmFjdGl2YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFNhZmUge1xuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgJGJ1dHRvbiA9ICQoJy5idXR0b24nKTtcbiAgICAgIGxldCAkYnV0dG9uU3ViID0gJCgnLmJ1dHRvblN1YicpO1xuICAgICAgbGV0ICRidXR0b25EZWwgPSAkKCcuYnV0dG9uRGVsJyk7XG4gICAgICBsZXQgJGJ1dHRvbkJhciA9ICQoJy5idXR0b25CYXInKTtcbiAgICAgIGxldCBwaW4gPSBcIlwiO1xuICAgICAgJGJ1dHRvbi5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZihwaW4ubGVuZ3RoIDwxMCl7XG4gICAgICAgICAgICBwaW4gKz0gZWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwaW4pO1xuICAgICAgICAgICAgJGJ1dHRvbkJhci50ZXh0KHBpbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgJGJ1dHRvbkRlbC5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIHBpbiA9IFwiXCI7XG4gICAgICAgICRidXR0b25CYXIudGV4dChwaW4pO1xuICAgICAgfSk7XG4gICAgICAkYnV0dG9uU3ViLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYocGluID09PSBcIjE2MjYzNjQ2NTZcIil7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3NvbHZlZCEnKTtcbiAgICAgICAgICBsZXQgJGRvb3JTYWZlID0gJCgnLmRvb3JTYWZlJyk7XG4gICAgICAgICAgJGRvb3JTYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBMZXZlciB7XG4gICAgY29uc3RydWN0b3IocG93ZXJCb3gpe1xuICAgICAgdGhpcy5wb3dlckJveCA9IHBvd2VyQm94O1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0ICRsZXZlciA9ICQoJy5sZXZlcicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGxldmVyLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wb3dlckJveC5pc1NvbHZlZCl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wZW4nKTtcbiAgICAgICAgICBsZXQgJGRvb3JIaWRkZW5TYWZlID0gJCgnLmRvb3JIaWRkZW5TYWZlJyk7XG4gICAgICAgICAgJGRvb3JIaWRkZW5TYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBQcmVzc3VyZSB7XG4gICAgY29uc3RydWN0b3Ioc3ViamVjdCl7XG4gICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0ICRwaXBlID0gJCgnLnBpcGUnKTtcbiAgICAgICRwaXBlLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5zdWJqZWN0LmlzQWN0aXZlKXtcbiAgICAgICAgICBsZXQgJHByZXNzdXJlID0gJCgnLnByZXNzdXJlJyk7XG4gICAgICAgICAgJHByZXNzdXJlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIHNlbGYuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVzc3VyZScgKyBzZWxmLmlzQWN0aXZlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgY2FuJ3QgdHVybiBpdFwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgTWFpblBpcGUge1xuICAgIGNvbnN0cnVjdG9yKHByZXNzdXJlKXtcbiAgICAgIHRoaXMucHJlc3N1cmUgPSBwcmVzc3VyZTtcbiAgICB9XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCAkbWFpbnBpcGUgPSAkKCcubWFpbnBpcGUnKTtcbiAgICAgICRtYWlucGlwZS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnByZXNzdXJlLmlzQWN0aXZlKXtcbiAgICAgICAgICBsZXQgJGRvb3JFeGl0ID0gJCgnLmRvb3JFeGl0Jyk7XG4gICAgICAgICAgJGRvb3JFeGl0LmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIGdhbWUuc2hvd05ld1NjZW5lKCdoNCcpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1RoZXJlIGlzIG5vIHByZXNzdXJlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Eb29yc1xuXG4gIGNsYXNzIERvb3Ige1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIG9wZW5Eb29yKCkge1xuICAgICAgbGV0ICRkb29yID0gJCgnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgJGRvb3IucmVtb3ZlQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgaWYodGhpcy5uYW1lID09IFwiZG9vcjZcIil7XG4gICAgICAgIGxldCAkY2hhbmdlID0gJCgnLmgzdG9oM2EnKTtcbiAgICAgICAgJGNoYW5nZS5hZGRDbGFzcygnbm9TaG93Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2UhISEnKTtcbiAgICAgICAgZ2FtZS5zaG93TmV3U2NlbmUoJ2gzJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUFjdGl2ZXNcblxuICBjbGFzcyBBY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHN1YmplY3QsIGRvb3IsIHRleHQpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgdGhpcy5kb29yID0gZG9vcjtcbiAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0ICRhY3RpdmUgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkYWN0aXZlLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgc2VsZi5kb29yLm9wZW5Eb29yKCk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRleHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZVxuXG4gIGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zY2VuZSA9IFwiaDFcIjtcbiAgICB9XG4gICAgc3RhcnROZXdHYW1lKCkge1xuICAgICAgLy9sb2FkaW5nIGludmVudG95XG4gICAgICBsZXQgaW52ZW50b3J5ID0gbmV3IEludmVudG9yeSgpO1xuICAgICAgLy9sb2FkaW5nIHN1YmplY3RzXG4gICAgICBsZXQga2V5MSA9IG5ldyBTdWJqZWN0KCdrZXkxJywgaW52ZW50b3J5KTtcbiAgICAgIGtleTEud2F0Y2goKTtcbiAgICAgIGxldCBrZXkyID0gbmV3IFN1YmplY3QoJ2tleTInLCBpbnZlbnRvcnkpO1xuICAgICAga2V5Mi53YXRjaCgpO1xuICAgICAgbGV0IGtleTMgPSBuZXcgU3ViamVjdCgna2V5MycsIGludmVudG9yeSk7XG4gICAgICBrZXkzLndhdGNoKCk7XG4gICAgICBsZXQga2V5NCA9IG5ldyBTdWJqZWN0KCdrZXk0JywgaW52ZW50b3J5KTtcbiAgICAgIGtleTQud2F0Y2goKTtcbiAgICAgIGxldCBrZXk1ID0gbmV3IFN1YmplY3QoJ2tleTUnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5NS53YXRjaCgpO1xuICAgICAgbGV0IGNyb3diYXIgPSBuZXcgU3ViamVjdCgnY3Jvd2JhcicsIGludmVudG9yeSk7XG4gICAgICBjcm93YmFyLndhdGNoKCk7XG4gICAgICBsZXQgc3RhbmxleSA9IG5ldyBTdWJqZWN0KCdzdGFubGV5JywgaW52ZW50b3J5KTtcbiAgICAgIHN0YW5sZXkud2F0Y2goKTtcbiAgICAgIGxldCBoeWRyYXVsaWMgPSBuZXcgU3ViamVjdCgnaHlkcmF1bGljJywgaW52ZW50b3J5KTtcbiAgICAgIGh5ZHJhdWxpYy53YXRjaCgpO1xuICAgICAgLy9sb2FkaW5nIGN1YmJ5XG4gICAgICBsZXQgcG93ZXJCb3ggPSBuZXcgUG93ZXJCb3goKTtcbiAgICAgIHBvd2VyQm94LndhdGNoKCk7XG4gICAgICBsZXQgc2FmZSA9IG5ldyBTYWZlKCk7XG4gICAgICBzYWZlLndhdGNoKCk7XG4gICAgICBsZXQgbGV2ZXIgPSBuZXcgTGV2ZXIocG93ZXJCb3gpO1xuICAgICAgbGV2ZXIud2F0Y2goKTtcbiAgICAgIGxldCBwcmVzc3VyZSA9IG5ldyBQcmVzc3VyZShoeWRyYXVsaWMpO1xuICAgICAgcHJlc3N1cmUud2F0Y2goKTtcbiAgICAgIGxldCBtYWlucGlwZSA9IG5ldyBNYWluUGlwZShwcmVzc3VyZSk7XG4gICAgICBtYWlucGlwZS53YXRjaCgpO1xuICAgICAgLy9sb2FkaW5nIGRvb3JzXG4gICAgICBsZXQgZG9vcjEgPSBuZXcgRG9vcignZG9vcjEnKTtcbiAgICAgIGxldCBkb29yMiA9IG5ldyBEb29yKCdkb29yMicpO1xuICAgICAgbGV0IGRvb3IzID0gbmV3IERvb3IoJ2Rvb3IzJyk7XG4gICAgICBsZXQgZG9vcjQgPSBuZXcgRG9vcignZG9vcjQnKTtcbiAgICAgIGxldCBkb29yNSA9IG5ldyBEb29yKCdkb29yNScpO1xuICAgICAgbGV0IGRvb3I2ID0gbmV3IERvb3IoJ2Rvb3I2Jyk7XG4gICAgICBsZXQgb3BlbkJveCA9IG5ldyBEb29yKCdvcGVuQm94Jyk7XG4gICAgICBsZXQgZG9vckVleGl0ID0gbmV3IERvb3IoJ2Rvb3JFeGl0Jyk7XG4gICAgICAvL2xvYWRpbmcgYWN0aXZlc1xuICAgICAgbGV0IGxvY2sxID0gbmV3IEFjdGl2ZSgnbG9jazEnLCBrZXkxLCBkb29yMSwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMS53YXRjaCgpO1xuICAgICAgbGV0IGxvY2syID0gbmV3IEFjdGl2ZSgnbG9jazInLCBrZXkyLCBkb29yMiwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMi53YXRjaCgpO1xuICAgICAgbGV0IGxvY2szID0gbmV3IEFjdGl2ZSgnbG9jazMnLCBrZXkzLCBkb29yMywgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMy53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s0ID0gbmV3IEFjdGl2ZSgnbG9jazQnLCBrZXk0LCBkb29yNCwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrNC53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s1ID0gbmV3IEFjdGl2ZSgnbG9jazUnLCBrZXk1LCBkb29yNSwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrNS53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s2ID0gbmV3IEFjdGl2ZSgnbG9jazYnLCBjcm93YmFyLCBkb29yNiwgXCJJIGNhbid0IG1vdmUgaXRcIik7XG4gICAgICBsb2NrNi53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s3ID0gbmV3IEFjdGl2ZSgnbG9jazcnLCBzdGFubGV5LCBvcGVuQm94LCBcIlRoaXMgdGFwZSBpcyBzdHJvbmdcIik7XG4gICAgICBsb2NrNy53YXRjaCgpO1xuICAgICAgLy9sb2FkaW5nIHNjZW5lc1xuICAgICAgdGhpcy5zaG93TmV3U2NlbmUodGhpcy5zY2VuZSk7XG4gICAgICB0aGlzLndhdGNoTW92ZXMoKTtcbiAgICB9XG4gICAgc2hvd05ld1NjZW5lKG5ld1NjZW5lKSB7XG4gICAgICAkKCcuJysgdGhpcy5zY2VuZSkuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICQoJy4nKyBuZXdTY2VuZSkuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICB0aGlzLnNjZW5lID0gbmV3U2NlbmU7XG4gICAgfVxuICAgIHdhdGNoTW92ZXMoKSB7XG4gICAgICBsZXQgJG1vdmVzID0gJCgnLm1vdmUnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICRtb3Zlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXtcbiAgICAgICAgJChlbGVtZW50KS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgc2VsZi5zaG93TmV3U2NlbmUodGhpcy5kYXRhc2V0LmdvdG8pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1NYWluXG5cbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0TmV3R2FtZSgpO1xuXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=