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
              game.showDialogues("Something crackled");
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
          } else {
            game.showDialogues("Wrong password");
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
          } else {
            game.showDialogues("No power");
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
            game.showDialogues("I can't turn it");
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
            console.log();
            game.showDialogues("There is no pressure");
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
            game.showDialogues(self.text);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWViYmNlMmI1MDlhZGRlZGEzNjciLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCIkZWxlbWVudHNJbkludmVudG9yeSIsImVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGgiLCJyZW1vdmVDbGFzcyIsImFkZFRvSW52ZW50b3J5IiwiUG93ZXJCb3giLCJpc1NvbHZlZCIsIiRwb3dlckJveCIsIm51bWJlciIsImNvbG9yIiwiY3NzIiwiZ2FtZSIsInNob3dEaWFsb2d1ZXMiLCJTYWZlIiwiJGJ1dHRvbiIsIiRidXR0b25TdWIiLCIkYnV0dG9uRGVsIiwiJGJ1dHRvbkJhciIsInBpbiIsImlubmVyVGV4dCIsInRleHQiLCIkZG9vclNhZmUiLCJMZXZlciIsInBvd2VyQm94IiwiJGxldmVyIiwiJGRvb3JIaWRkZW5TYWZlIiwiUHJlc3N1cmUiLCIkcGlwZSIsIiRwcmVzc3VyZSIsIk1haW5QaXBlIiwicHJlc3N1cmUiLCIkbWFpbnBpcGUiLCIkZG9vckV4aXQiLCJzaG93TmV3U2NlbmUiLCJEb29yIiwiJGRvb3IiLCIkY2hhbmdlIiwiQWN0aXZlIiwiZG9vciIsIiRhY3RpdmUiLCJvcGVuRG9vciIsIkdhbWUiLCJzY2VuZSIsImtleTEiLCJrZXkyIiwia2V5MyIsImtleTQiLCJrZXk1IiwiY3Jvd2JhciIsInN0YW5sZXkiLCJoeWRyYXVsaWMiLCJzYWZlIiwibGV2ZXIiLCJtYWlucGlwZSIsImRvb3IxIiwiZG9vcjIiLCJkb29yMyIsImRvb3I0IiwiZG9vcjUiLCJkb29yNiIsIm9wZW5Cb3giLCJkb29yRWV4aXQiLCJsb2NrMSIsImxvY2syIiwibG9jazMiLCJsb2NrNCIsImxvY2s1IiwibG9jazYiLCJsb2NrNyIsIndhdGNoTW92ZXMiLCJuZXdTY2VuZSIsIiRkaWFsb2d1ZXMiLCJodG1sIiwic2V0VGltZW91dCIsIiRtb3ZlcyIsImRhdGFzZXQiLCJnb3RvIiwic3RhcnROZXdHYW1lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDOUJGLElBQUUsVUFBRixFQUFjRyxRQUFkLENBQXVCLFFBQXZCO0FBQ0FDLFVBQVFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNGOztBQUhnQyxNQUl4QkMsU0FKd0I7QUFLNUIseUJBQWM7QUFBQTs7QUFDWixXQUFLQyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0Q7O0FBUDJCO0FBQUE7QUFBQSxpQ0FTakJDLE9BVGlCLEVBU1I7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RCxJQUFOLEdBQVcsTUFBNUI7QUFDQXFELG1CQUFXLFlBQVU7QUFDbkJGLHFCQUFXQyxJQUFYLENBQWdCLEVBQWhCO0FBQ0QsU0FGRCxFQUVHLElBRkg7QUFHRDtBQTVVMkI7QUFBQTtBQUFBLG1DQTZVZjtBQUNYLFlBQUlFLFNBQVM1RyxFQUFFLE9BQUYsQ0FBYjtBQUNBLFlBQUlhLE9BQU8sSUFBWDtBQUNBK0YsZUFBTzlGLElBQVAsQ0FBWSxVQUFTQyxLQUFULEVBQWdCQyxPQUFoQixFQUF3QjtBQUNsQ2hCLFlBQUVnQixPQUFGLEVBQVdkLEVBQVgsQ0FBYyxPQUFkLEVBQXNCLFlBQVU7QUFDOUJXLGlCQUFLc0QsWUFBTCxDQUFrQixLQUFLMEMsT0FBTCxDQUFhQyxJQUEvQjtBQUNELFdBRkQ7QUFHRCxTQUpEO0FBS0Q7QUFyVjJCOztBQUFBO0FBQUE7O0FBd1ZoQzs7QUFFRSxNQUFJakUsT0FBTyxJQUFJOEIsSUFBSixFQUFYO0FBQ0E5QixPQUFLa0UsWUFBTDtBQUVELENBN1ZELEUiLCJmaWxlIjoiLi9qcy9vdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxZWJiY2UyYjUwOWFkZGVkYTM2NyIsIiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAkKCcjbG9hZGluZycpLmFkZENsYXNzKCdub1Nob3cnKTtcbiAgY29uc29sZS5sb2coJ0NvbnRlbnQgbG9hZGVkJyk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbnZlbnRvcnlcbiAgY2xhc3MgSW52ZW50b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuc3ViamVjdHNJbnNpZGUgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRTdWJqZWN0KHN1YmplY3QpIHtcbiAgICAgIHRoaXMuc3ViamVjdHNJbnNpZGUucHVzaChzdWJqZWN0KTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ViamVjdHNJbnNpZGUgKyBcIiBhZGRlZCB0byBpbnZlbnRvcnlcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlN1YmplY3RzIGluIGludmVudG9yeTogXCIgKyB0aGlzLnN1YmplY3RzSW5zaWRlKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ViamVjdHNJbnNpZGUpO1xuICAgICAgdGhpcy53YXRjaCgpO1xuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgICBsZXQgJGVsZW1lbnRzID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLm9mZigpO1xuICAgICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5zdWJqZWN0c0luc2lkZVtpbmRleF0uYWN0aXZhdGUoaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVN1YmplY3RcblxuICBjbGFzcyBTdWJqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpbnZlbnRvcnkpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLmludmVudG9yeSA9IGludmVudG9yeTtcbiAgICAgIHRoaXMuaXNJbkludmVudG9yeSA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5oYXNCZWVuVXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jbGFzcyA9ICcuJyArIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBhZGRUb0ludmVudG9yeSgpIHtcbiAgICAgIGxldCAkc3ViamVjdCA9ICQoJy4nICsgdGhpcy5uYW1lKTtcbiAgICAgIGxldCAkaW52ZW50b3J5ID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgJHN1YmplY3QuYWRkQ2xhc3MoJ25vU2hvdycpO1xuXG4gICAgICBmb3IobGV0IGk9MDsgaTwkaW52ZW50b3J5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYoJCgkaW52ZW50b3J5W2ldKS5oYXNDbGFzcygnZW1wdHknKSAmJiAhKHRoaXMuaXNJbkludmVudG9yeSkpe1xuICAgICAgICAgICQoJGludmVudG9yeVtpXSkuZmluZCgnaW1nJykuYXR0cignc3JjJywgJy4vaW1hZ2VzL2knK3RoaXMubmFtZSsnLnBuZycpO1xuICAgICAgICAgIHRoaXMuaXNJbkludmVudG9yeSA9IHRydWU7XG4gICAgICAgICAgJGludmVudG9yeVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuICAgICAgICAgIHRoaXMuaW52ZW50b3J5LmFkZFN1YmplY3QodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3RpdmF0ZShpbmRleCkge1xuICAgICAgbGV0ICRlbGVtZW50cyA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgIGxldCAkZWxlbWVudHNJbkludmVudG9yeSA9IHRoaXMuaW52ZW50b3J5LnN1YmplY3RzSW5zaWRlO1xuICAgICAgbGV0IGVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGggPSAkZWxlbWVudHNJbkludmVudG9yeS5sZW5ndGg7XG5cbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUgPT0gZmFsc2UpIHtcblxuICAgICAgICBmb3IobGV0IGk9MDsgaTxlbGVtZW50c0luSW52ZW50b3J5TGVuZ3RoOyBpKyspe1xuICAgICAgICAgICQoJGVsZW1lbnRzW2ldKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgICAkZWxlbWVudHNJbkludmVudG9yeVtpXS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCRlbGVtZW50c0luSW52ZW50b3J5W2ldLmlzQWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkuYWRkQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBhY3RpdmVcIik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBub3QgYWN0aXZlXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJCgnLicgKyB0aGlzLm5hbWUpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5hZGRUb0ludmVudG9yeSgpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3ViYnlcblxuICBjbGFzcyBQb3dlckJveCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLmlzU29sdmVkID0gZmFsc2U7XG4gICAgfVxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgdGhpcy5pc1NvbHZlZCA9IHRydWU7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJHBvd2VyQm94ID0gJCgnLnBvd2VyQm94Jyk7XG4gICAgICBsZXQgbnVtYmVyPVswLDAsMCwwXTtcbiAgICAgIGxldCBjb2xvcj1bJyM2ZWJhMWEnLCcjZmYwMDAwJywnIzFlMjBkOScsJyNlNjNiZmInLCcjZmZlODFkJywnI2MxN2M1YScsJyNmZjdmMTcnLCcjZmZmZmZmJywnIzAwMDAwMCddO1xuICAgICAgJHBvd2VyQm94LmVhY2goZnVuY3Rpb24oaW5kZXgsZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIG51bWJlcltpbmRleF0rKztcbiAgICAgICAgICBpZihudW1iZXJbaW5kZXhdID09IDEwKXtcbiAgICAgICAgICAgIG51bWJlcltpbmRleF09MTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtY29sb3InLGNvbG9yW251bWJlcltpbmRleF0gLSAxXSk7XG4gICAgICAgICAgaWYobnVtYmVyWzBdPT02ICYmIG51bWJlclsxXT09OCAmJiBudW1iZXJbMl09PTcgJiYgbnVtYmVyWzNdPT00KXtcbiAgICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIlNvbWV0aGluZyBjcmFja2xlZFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2x2ZWQhJyk7XG4gICAgICAgICAgICAkcG93ZXJCb3gub2ZmKCk7XG4gICAgICAgICAgICBzZWxmLmFjdGl2YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFNhZmUge1xuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgJGJ1dHRvbiA9ICQoJy5idXR0b24nKTtcbiAgICAgIGxldCAkYnV0dG9uU3ViID0gJCgnLmJ1dHRvblN1YicpO1xuICAgICAgbGV0ICRidXR0b25EZWwgPSAkKCcuYnV0dG9uRGVsJyk7XG4gICAgICBsZXQgJGJ1dHRvbkJhciA9ICQoJy5idXR0b25CYXInKTtcbiAgICAgIGxldCBwaW4gPSBcIlwiO1xuICAgICAgJGJ1dHRvbi5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZihwaW4ubGVuZ3RoIDwxMCl7XG4gICAgICAgICAgICBwaW4gKz0gZWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwaW4pO1xuICAgICAgICAgICAgJGJ1dHRvbkJhci50ZXh0KHBpbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgJGJ1dHRvbkRlbC5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIHBpbiA9IFwiXCI7XG4gICAgICAgICRidXR0b25CYXIudGV4dChwaW4pO1xuICAgICAgfSk7XG4gICAgICAkYnV0dG9uU3ViLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYocGluID09PSBcIjE2MjYzNjQ2NTZcIil7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3NvbHZlZCEnKTtcbiAgICAgICAgICBsZXQgJGRvb3JTYWZlID0gJCgnLmRvb3JTYWZlJyk7XG4gICAgICAgICAgJGRvb3JTYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIldyb25nIHBhc3N3b3JkXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBMZXZlciB7XG4gICAgY29uc3RydWN0b3IocG93ZXJCb3gpe1xuICAgICAgdGhpcy5wb3dlckJveCA9IHBvd2VyQm94O1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0ICRsZXZlciA9ICQoJy5sZXZlcicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGxldmVyLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wb3dlckJveC5pc1NvbHZlZCl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wZW4nKTtcbiAgICAgICAgICBsZXQgJGRvb3JIaWRkZW5TYWZlID0gJCgnLmRvb3JIaWRkZW5TYWZlJyk7XG4gICAgICAgICAgJGRvb3JIaWRkZW5TYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIk5vIHBvd2VyXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBQcmVzc3VyZSB7XG4gICAgY29uc3RydWN0b3Ioc3ViamVjdCl7XG4gICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0ICRwaXBlID0gJCgnLnBpcGUnKTtcbiAgICAgICRwaXBlLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5zdWJqZWN0LmlzQWN0aXZlKXtcbiAgICAgICAgICBsZXQgJHByZXNzdXJlID0gJCgnLnByZXNzdXJlJyk7XG4gICAgICAgICAgJHByZXNzdXJlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIHNlbGYuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVzc3VyZScgKyBzZWxmLmlzQWN0aXZlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgY2FuJ3QgdHVybiBpdFwiKTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJJIGNhbid0IHR1cm4gaXRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIE1haW5QaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihwcmVzc3VyZSl7XG4gICAgICB0aGlzLnByZXNzdXJlID0gcHJlc3N1cmU7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJG1haW5waXBlID0gJCgnLm1haW5waXBlJyk7XG4gICAgICAkbWFpbnBpcGUub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wcmVzc3VyZS5pc0FjdGl2ZSl7XG4gICAgICAgICAgbGV0ICRkb29yRXhpdCA9ICQoJy5kb29yRXhpdCcpO1xuICAgICAgICAgICRkb29yRXhpdC5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBnYW1lLnNob3dOZXdTY2VuZSgnaDQnKTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiVGhlcmUgaXMgbm8gcHJlc3N1cmVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Eb29yc1xuXG4gIGNsYXNzIERvb3Ige1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIG9wZW5Eb29yKCkge1xuICAgICAgbGV0ICRkb29yID0gJCgnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgJGRvb3IucmVtb3ZlQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgaWYodGhpcy5uYW1lID09IFwiZG9vcjZcIil7XG4gICAgICAgIGxldCAkY2hhbmdlID0gJCgnLmgzdG9oM2EnKTtcbiAgICAgICAgJGNoYW5nZS5hZGRDbGFzcygnbm9TaG93Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2UhISEnKTtcbiAgICAgICAgZ2FtZS5zaG93TmV3U2NlbmUoJ2gzJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUFjdGl2ZXNcblxuICBjbGFzcyBBY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHN1YmplY3QsIGRvb3IsIHRleHQpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgdGhpcy5kb29yID0gZG9vcjtcbiAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0ICRhY3RpdmUgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkYWN0aXZlLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgc2VsZi5kb29yLm9wZW5Eb29yKCk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRleHQpO1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhzZWxmLnRleHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZVxuXG4gIGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zY2VuZSA9IFwiaDFcIjtcbiAgICB9XG4gICAgc3RhcnROZXdHYW1lKCkge1xuICAgICAgLy9sb2FkaW5nIGludmVudG95XG4gICAgICBsZXQgaW52ZW50b3J5ID0gbmV3IEludmVudG9yeSgpO1xuICAgICAgLy9sb2FkaW5nIHN1YmplY3RzXG4gICAgICBsZXQga2V5MSA9IG5ldyBTdWJqZWN0KCdrZXkxJywgaW52ZW50b3J5KTtcbiAgICAgIGtleTEud2F0Y2goKTtcbiAgICAgIGxldCBrZXkyID0gbmV3IFN1YmplY3QoJ2tleTInLCBpbnZlbnRvcnkpO1xuICAgICAga2V5Mi53YXRjaCgpO1xuICAgICAgbGV0IGtleTMgPSBuZXcgU3ViamVjdCgna2V5MycsIGludmVudG9yeSk7XG4gICAgICBrZXkzLndhdGNoKCk7XG4gICAgICBsZXQga2V5NCA9IG5ldyBTdWJqZWN0KCdrZXk0JywgaW52ZW50b3J5KTtcbiAgICAgIGtleTQud2F0Y2goKTtcbiAgICAgIGxldCBrZXk1ID0gbmV3IFN1YmplY3QoJ2tleTUnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5NS53YXRjaCgpO1xuICAgICAgbGV0IGNyb3diYXIgPSBuZXcgU3ViamVjdCgnY3Jvd2JhcicsIGludmVudG9yeSk7XG4gICAgICBjcm93YmFyLndhdGNoKCk7XG4gICAgICBsZXQgc3RhbmxleSA9IG5ldyBTdWJqZWN0KCdzdGFubGV5JywgaW52ZW50b3J5KTtcbiAgICAgIHN0YW5sZXkud2F0Y2goKTtcbiAgICAgIGxldCBoeWRyYXVsaWMgPSBuZXcgU3ViamVjdCgnaHlkcmF1bGljJywgaW52ZW50b3J5KTtcbiAgICAgIGh5ZHJhdWxpYy53YXRjaCgpO1xuICAgICAgLy9sb2FkaW5nIGN1YmJ5XG4gICAgICBsZXQgcG93ZXJCb3ggPSBuZXcgUG93ZXJCb3goKTtcbiAgICAgIHBvd2VyQm94LndhdGNoKCk7XG4gICAgICBsZXQgc2FmZSA9IG5ldyBTYWZlKCk7XG4gICAgICBzYWZlLndhdGNoKCk7XG4gICAgICBsZXQgbGV2ZXIgPSBuZXcgTGV2ZXIocG93ZXJCb3gpO1xuICAgICAgbGV2ZXIud2F0Y2goKTtcbiAgICAgIGxldCBwcmVzc3VyZSA9IG5ldyBQcmVzc3VyZShoeWRyYXVsaWMpO1xuICAgICAgcHJlc3N1cmUud2F0Y2goKTtcbiAgICAgIGxldCBtYWlucGlwZSA9IG5ldyBNYWluUGlwZShwcmVzc3VyZSk7XG4gICAgICBtYWlucGlwZS53YXRjaCgpO1xuICAgICAgLy9sb2FkaW5nIGRvb3JzXG4gICAgICBsZXQgZG9vcjEgPSBuZXcgRG9vcignZG9vcjEnKTtcbiAgICAgIGxldCBkb29yMiA9IG5ldyBEb29yKCdkb29yMicpO1xuICAgICAgbGV0IGRvb3IzID0gbmV3IERvb3IoJ2Rvb3IzJyk7XG4gICAgICBsZXQgZG9vcjQgPSBuZXcgRG9vcignZG9vcjQnKTtcbiAgICAgIGxldCBkb29yNSA9IG5ldyBEb29yKCdkb29yNScpO1xuICAgICAgbGV0IGRvb3I2ID0gbmV3IERvb3IoJ2Rvb3I2Jyk7XG4gICAgICBsZXQgb3BlbkJveCA9IG5ldyBEb29yKCdvcGVuQm94Jyk7XG4gICAgICBsZXQgZG9vckVleGl0ID0gbmV3IERvb3IoJ2Rvb3JFeGl0Jyk7XG4gICAgICAvL2xvYWRpbmcgYWN0aXZlc1xuICAgICAgbGV0IGxvY2sxID0gbmV3IEFjdGl2ZSgnbG9jazEnLCBrZXkxLCBkb29yMSwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMS53YXRjaCgpO1xuICAgICAgbGV0IGxvY2syID0gbmV3IEFjdGl2ZSgnbG9jazInLCBrZXkyLCBkb29yMiwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMi53YXRjaCgpO1xuICAgICAgbGV0IGxvY2szID0gbmV3IEFjdGl2ZSgnbG9jazMnLCBrZXkzLCBkb29yMywgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrMy53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s0ID0gbmV3IEFjdGl2ZSgnbG9jazQnLCBrZXk0LCBkb29yNCwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrNC53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s1ID0gbmV3IEFjdGl2ZSgnbG9jazUnLCBrZXk1LCBkb29yNSwgXCJMb2NrZWRcIik7XG4gICAgICBsb2NrNS53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s2ID0gbmV3IEFjdGl2ZSgnbG9jazYnLCBjcm93YmFyLCBkb29yNiwgXCJJIGNhbid0IG1vdmUgaXRcIik7XG4gICAgICBsb2NrNi53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s3ID0gbmV3IEFjdGl2ZSgnbG9jazcnLCBzdGFubGV5LCBvcGVuQm94LCBcIlRoaXMgdGFwZSBpcyB0b28gc3Ryb25nXCIpO1xuICAgICAgbG9jazcud2F0Y2goKTtcbiAgICAgIC8vbG9hZGluZyBzY2VuZXNcbiAgICAgIHRoaXMuc2hvd05ld1NjZW5lKHRoaXMuc2NlbmUpO1xuICAgICAgdGhpcy53YXRjaE1vdmVzKCk7XG4gICAgfVxuICAgIHNob3dOZXdTY2VuZShuZXdTY2VuZSkge1xuICAgICAgJCgnLicrIHRoaXMuc2NlbmUpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XG4gICAgICAkKCcuJysgbmV3U2NlbmUpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgdGhpcy5zY2VuZSA9IG5ld1NjZW5lO1xuICAgIH1cbiAgICBzaG93RGlhbG9ndWVzKHRleHQpe1xuICAgICAgLy9maW5kIGRpYWxvZ3Vlc1xuICAgICAgbGV0ICRkaWFsb2d1ZXMgPSAkKCcjZGlhbG9ndWVzJyk7XG4gICAgICAkZGlhbG9ndWVzLmh0bWwoIFwiPHA+XCIrdGV4dCtcIjwvcD5cIiApO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkZGlhbG9ndWVzLmh0bWwoXCJcIik7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gICAgd2F0Y2hNb3ZlcygpIHtcbiAgICAgIGxldCAkbW92ZXMgPSAkKCcubW92ZScpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJG1vdmVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBzZWxmLnNob3dOZXdTY2VuZSh0aGlzLmRhdGFzZXQuZ290byk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU1haW5cblxuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnROZXdHYW1lKCk7XG5cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==