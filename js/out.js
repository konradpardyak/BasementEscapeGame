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
        var audioItem = new Audio('sounds/item.wav');
        var self = this;
        $('.' + this.name).on('click', function () {
          self.addToInventory();
          audioItem.play();
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
        var audioPower = new Audio('sounds/power.wav');
        var $powerBox = $('.powerBox');
        var number = [0, 0, 0, 0];
        var color = ['#6eba1a', '#ff0000', '#1e20d9', '#e63bfb', '#ffe81d', '#703f21', '#ff7f17', '#ffffff', '#000000'];
        $powerBox.each(function (index, element) {
          $(element).on('click', function () {
            number[index]++;
            if (number[index] == 10) {
              number[index] = 1;
            }
            $(element).css('background-color', color[number[index] - 1]);
            if (number[0] == 6 && number[1] == 8 && number[2] == 7 && number[3] == 4) {
              game.showDialogues("Something crackled");
              audioPower.play();
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
        var audioBeep = new Audio('sounds/beep.wav');
        var audioWrong = new Audio('sounds/wrong.wav');
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
              audioBeep.play();
            }
          });
        });

        $buttonDel.on('click', function () {
          pin = "";
          $buttonBar.text(pin);
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
            audioWrong.play();
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
            var $openExit = $('.openExit');
            $openExit.css("display", "block");
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

  var OpenPower = function () {
    function OpenPower(subject) {
      _classCallCheck(this, OpenPower);

      this.subject = subject;
    }

    _createClass(OpenPower, [{
      key: 'watch',
      value: function watch() {
        var self = this;
        var $doorPower = $('.doorPower');
        var $h3toh3a = $('.h3toh3a');
        var $openPower = $('.openPower');
        var audioCrowbar = new Audio('sounds/crowbar.wav');
        $doorPower.on('click', function () {
          if (self.subject.isActive) {
            $h3toh3a.addClass('noShow');
            $openPower.removeClass('noShow');
            game.showNewScene('h3');
            audioCrowbar.play();
          } else {
            game.showDialogues("I can't move it");
          }
        });
      }
    }]);

    return OpenPower;
  }();

  var Cardboard = function () {
    function Cardboard(subject) {
      _classCallCheck(this, Cardboard);

      this.subject = subject;
    }

    _createClass(Cardboard, [{
      key: 'watch',
      value: function watch() {
        var $cardboardArea = $('.cardboardArea');
        var $openBox = $('.openBox');
        var audioBox = new Audio('sounds/box.wav');
        var self = this;
        $cardboardArea.on('click', function () {
          if (self.subject.isActive) {
            $openBox.removeClass('noShow');
            audioBox.play();
          } else {
            game.showDialogues("This tape is too strong");
          }
        });
      }
    }]);

    return Cardboard;
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
        var audioOpenDoor = new Audio('sounds/opendoor.wav');
        $door.removeClass('noShow');
        audioOpenDoor.play();
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
        var audioClose = new Audio('sounds/close.wav');
        var self = this;
        $active.on('click', function () {
          if (self.subject.isActive) {
            self.door.openDoor();
          } else {
            console.log(self.text);
            game.showDialogues("Locked");
            audioClose.play();
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

        //loading jigsaws
        var safe = new Safe();
        safe.watch();
        var openPower = new OpenPower(crowbar);
        openPower.watch();
        var powerBox = new PowerBox();
        powerBox.watch();
        var lever = new Lever(powerBox);
        lever.watch();
        var pressure = new Pressure(hydraulic);
        pressure.watch();
        var mainpipe = new MainPipe(pressure);
        mainpipe.watch();
        var cardboard = new Cardboard(stanley);
        cardboard.watch();

        //loading doors
        var door1 = new Door('door1');
        var door2 = new Door('door2');
        var door3 = new Door('door3');
        var door4 = new Door('door4');
        var door5 = new Door('door5');

        //loading actives
        var lock1 = new Active('lock1', key1, door1);
        lock1.watch();
        var lock2 = new Active('lock2', key2, door2);
        lock2.watch();
        var lock3 = new Active('lock3', key3, door3);
        lock3.watch();
        var lock4 = new Active('lock4', key4, door4);
        lock4.watch();
        var lock5 = new Active('lock5', key5, door5);
        lock5.watch();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTJmNjg3ZGRjNDExMzcwNWI1YjciLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCIkZWxlbWVudHNJbkludmVudG9yeSIsImVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGgiLCJyZW1vdmVDbGFzcyIsImF1ZGlvSXRlbSIsIkF1ZGlvIiwiYWRkVG9JbnZlbnRvcnkiLCJwbGF5IiwiUG93ZXJCb3giLCJpc1NvbHZlZCIsImF1ZGlvUG93ZXIiLCIkcG93ZXJCb3giLCJudW1iZXIiLCJjb2xvciIsImNzcyIsImdhbWUiLCJzaG93RGlhbG9ndWVzIiwiU2FmZSIsImF1ZGlvQmVlcCIsImF1ZGlvV3JvbmciLCIkYnV0dG9uIiwiJGJ1dHRvblN1YiIsIiRidXR0b25EZWwiLCIkYnV0dG9uQmFyIiwicGluIiwiaW5uZXJUZXh0IiwidGV4dCIsIiRkb29yU2FmZSIsImF1ZGlvU2FmZSIsIkxldmVyIiwicG93ZXJCb3giLCIkbGV2ZXIiLCIkZG9vckhpZGRlblNhZmUiLCJhdWRpbyIsIlByZXNzdXJlIiwiJHBpcGUiLCIkcHJlc3N1cmUiLCJNYWluUGlwZSIsInByZXNzdXJlIiwiJG1haW5waXBlIiwiJG9wZW5FeGl0Iiwic2hvd05ld1NjZW5lIiwiT3BlblBvd2VyIiwiJGRvb3JQb3dlciIsIiRoM3RvaDNhIiwiJG9wZW5Qb3dlciIsImF1ZGlvQ3Jvd2JhciIsIkNhcmRib2FyZCIsIiRjYXJkYm9hcmRBcmVhIiwiJG9wZW5Cb3giLCJhdWRpb0JveCIsIkRvb3IiLCIkZG9vciIsImF1ZGlvT3BlbkRvb3IiLCJBY3RpdmUiLCJkb29yIiwiJGFjdGl2ZSIsImF1ZGlvQ2xvc2UiLCJvcGVuRG9vciIsIkdhbWUiLCJzY2VuZSIsImtleTEiLCJrZXkyIiwia2V5MyIsImtleTQiLCJrZXk1IiwiY3Jvd2JhciIsInN0YW5sZXkiLCJoeWRyYXVsaWMiLCJzYWZlIiwib3BlblBvd2VyIiwibGV2ZXIiLCJtYWlucGlwZSIsImNhcmRib2FyZCIsImRvb3IxIiwiZG9vcjIiLCJkb29yMyIsImRvb3I0IiwiZG9vcjUiLCJsb2NrMSIsImxvY2syIiwibG9jazMiLCJsb2NrNCIsImxvY2s1Iiwid2F0Y2hNb3ZlcyIsIm5ld1NjZW5lIiwiJGRpYWxvZ3VlcyIsImh0bWwiLCJzZXRUaW1lb3V0IiwiJG1vdmVzIiwiZGF0YXNldCIsImdvdG8iLCIkc3RhcnQiLCJzdGFydE5ld0dhbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REFBLEVBQUVDLE1BQUYsRUFBVUMs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RUFBWCxDQUFjLE9BQWQsRUFBc0IsWUFBVTtBQUM5QlcsaUJBQUs4RCxZQUFMLENBQWtCLEtBQUtpRCxPQUFMLENBQWFDLElBQS9CO0FBQ0QsV0FGRDtBQUdELFNBSkQ7QUFLRDtBQXpaMkI7O0FBQUE7QUFBQTs7QUE0WmhDOzs7QUFDRSxNQUFJQyxTQUFTOUgsRUFBRSxRQUFGLENBQWI7QUFDQSxNQUFJc0QsVUFBVXdFLE9BQU9sSCxJQUFQLENBQVksUUFBWixDQUFkO0FBQ0EsTUFBSXFDLE9BQU8sSUFBSTRDLElBQUosRUFBWDs7QUFFQXZDLFVBQVFwRCxFQUFSLENBQVcsT0FBWCxFQUFtQixZQUFVO0FBQzNCNEgsV0FBTzlFLEdBQVAsQ0FBVyxTQUFYLEVBQXFCLE1BQXJCO0FBQ0FDLFNBQUs4RSxZQUFMO0FBQ0QsR0FIRDtBQUtELENBdGFELEUiLCJmaWxlIjoiLi9qcy9vdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhMmY2ODdkZGM0MTEzNzA1YjViNyIsIiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAkKCcjbG9hZGluZycpLmFkZENsYXNzKCdub1Nob3cnKTtcbiAgY29uc29sZS5sb2coJ0NvbnRlbnQgbG9hZGVkJyk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbnZlbnRvcnlcbiAgY2xhc3MgSW52ZW50b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuc3ViamVjdHNJbnNpZGUgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRTdWJqZWN0KHN1YmplY3QpIHtcbiAgICAgIHRoaXMuc3ViamVjdHNJbnNpZGUucHVzaChzdWJqZWN0KTtcbiAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG5cbiAgICB3YXRjaCgpIHtcbiAgICAgICAgbGV0ICRlbGVtZW50cyA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCl7XG4gICAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5vZmYoKTtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuc3ViamVjdHNJbnNpZGVbaW5kZXhdLmFjdGl2YXRlKGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TdWJqZWN0XG5cbiAgY2xhc3MgU3ViamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgaW52ZW50b3J5KSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBpbnZlbnRvcnk7XG4gICAgICB0aGlzLmlzSW5JbnZlbnRvcnkgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFzQmVlblVzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2xhc3MgPSAnLicgKyB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgYWRkVG9JbnZlbnRvcnkoKSB7XG4gICAgICBsZXQgJHN1YmplY3QgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICBsZXQgJGludmVudG9yeSA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgICRzdWJqZWN0LmFkZENsYXNzKCdub1Nob3cnKTtcblxuICAgICAgZm9yKGxldCBpPTA7IGk8JGludmVudG9yeS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKCQoJGludmVudG9yeVtpXSkuaGFzQ2xhc3MoJ2VtcHR5JykgJiYgISh0aGlzLmlzSW5JbnZlbnRvcnkpKXtcbiAgICAgICAgICAkKCRpbnZlbnRvcnlbaV0pLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsICcuL2ltYWdlcy9pJyt0aGlzLm5hbWUrJy5wbmcnKTtcbiAgICAgICAgICB0aGlzLmlzSW5JbnZlbnRvcnkgPSB0cnVlO1xuICAgICAgICAgICRpbnZlbnRvcnlbaV0uY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcbiAgICAgICAgICB0aGlzLmludmVudG9yeS5hZGRTdWJqZWN0KHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoaW5kZXgpIHtcbiAgICAgIGxldCAkZWxlbWVudHMgPSAkKCcjaW52ZW50b3J5JykuZmluZCgnZGl2Jyk7XG4gICAgICBsZXQgJGVsZW1lbnRzSW5JbnZlbnRvcnkgPSB0aGlzLmludmVudG9yeS5zdWJqZWN0c0luc2lkZTtcbiAgICAgIGxldCBlbGVtZW50c0luSW52ZW50b3J5TGVuZ3RoID0gJGVsZW1lbnRzSW5JbnZlbnRvcnkubGVuZ3RoO1xuXG4gICAgICBpZih0aGlzLmlzQWN0aXZlID09IGZhbHNlKSB7XG5cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8ZWxlbWVudHNJbkludmVudG9yeUxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpXSkucmVtb3ZlQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgICAgJGVsZW1lbnRzSW5JbnZlbnRvcnlbaV0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygkZWxlbWVudHNJbkludmVudG9yeVtpXS5pc0FjdGl2ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLmFkZENsYXNzKCdpc0FjdGl2ZScpO1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgaXMgYWN0aXZlXCIpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkucmVtb3ZlQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgaXMgbm90IGFjdGl2ZVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3YXRjaCgpIHtcbiAgICAgIGxldCBhdWRpb0l0ZW0gPSBuZXcgQXVkaW8oJ3NvdW5kcy9pdGVtLndhdicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJCgnLicgKyB0aGlzLm5hbWUpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5hZGRUb0ludmVudG9yeSgpO1xuICAgICAgICBhdWRpb0l0ZW0ucGxheSgpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3ViYnlcblxuICBjbGFzcyBQb3dlckJveCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLmlzU29sdmVkID0gZmFsc2U7XG4gICAgfVxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgdGhpcy5pc1NvbHZlZCA9IHRydWU7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgYXVkaW9Qb3dlciA9IG5ldyBBdWRpbygnc291bmRzL3Bvd2VyLndhdicpO1xuICAgICAgbGV0ICRwb3dlckJveCA9ICQoJy5wb3dlckJveCcpO1xuICAgICAgbGV0IG51bWJlcj1bMCwwLDAsMF07XG4gICAgICBsZXQgY29sb3I9WycjNmViYTFhJywnI2ZmMDAwMCcsJyMxZTIwZDknLCcjZTYzYmZiJywnI2ZmZTgxZCcsJyM3MDNmMjEnLCcjZmY3ZjE3JywnI2ZmZmZmZicsJyMwMDAwMDAnXTtcbiAgICAgICRwb3dlckJveC5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBudW1iZXJbaW5kZXhdKys7XG4gICAgICAgICAgaWYobnVtYmVyW2luZGV4XSA9PSAxMCl7XG4gICAgICAgICAgICBudW1iZXJbaW5kZXhdPTE7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyxjb2xvcltudW1iZXJbaW5kZXhdIC0gMV0pO1xuICAgICAgICAgIGlmKG51bWJlclswXT09NiAmJiBudW1iZXJbMV09PTggJiYgbnVtYmVyWzJdPT03ICYmIG51bWJlclszXT09NCl7XG4gICAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJTb21ldGhpbmcgY3JhY2tsZWRcIik7XG4gICAgICAgICAgICBhdWRpb1Bvd2VyLnBsYXkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2x2ZWQhJyk7XG4gICAgICAgICAgICAkcG93ZXJCb3gub2ZmKCk7XG4gICAgICAgICAgICBzZWxmLmFjdGl2YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFNhZmUge1xuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgYXVkaW9CZWVwID0gbmV3IEF1ZGlvKCdzb3VuZHMvYmVlcC53YXYnKTtcbiAgICAgIGxldCBhdWRpb1dyb25nID0gbmV3IEF1ZGlvKCdzb3VuZHMvd3Jvbmcud2F2Jyk7XG4gICAgICBsZXQgJGJ1dHRvbiA9ICQoJy5idXR0b24nKTtcbiAgICAgIGxldCAkYnV0dG9uU3ViID0gJCgnLmJ1dHRvblN1YicpO1xuICAgICAgbGV0ICRidXR0b25EZWwgPSAkKCcuYnV0dG9uRGVsJyk7XG4gICAgICBsZXQgJGJ1dHRvbkJhciA9ICQoJy5idXR0b25CYXInKTtcbiAgICAgIGxldCBwaW4gPSBcIlwiO1xuXG4gICAgICAkYnV0dG9uLmVhY2goZnVuY3Rpb24oaW5kZXgsZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIGlmKHBpbi5sZW5ndGggPDEwKXtcbiAgICAgICAgICAgIHBpbiArPSBlbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBpbik7XG4gICAgICAgICAgICAkYnV0dG9uQmFyLnRleHQocGluKTtcbiAgICAgICAgICAgIGF1ZGlvQmVlcC5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAkYnV0dG9uRGVsLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgcGluID0gXCJcIjtcbiAgICAgICAgJGJ1dHRvbkJhci50ZXh0KHBpbik7XG4gICAgICAgIGF1ZGlvQmVlcC5wbGF5KCk7XG4gICAgICB9KTtcblxuICAgICAgJGJ1dHRvblN1Yi5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHBpbiA9PT0gXCIxNjI2MzY0NjU2XCIpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2x2ZWQhJyk7XG4gICAgICAgICAgbGV0ICRkb29yU2FmZSA9ICQoJy5kb29yU2FmZScpO1xuICAgICAgICAgICRkb29yU2FmZS5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBsZXQgYXVkaW9TYWZlID0gbmV3IEF1ZGlvKCdzb3VuZHMvc2FmZS53YXYnKTtcbiAgICAgICAgICBhdWRpb1NhZmUucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIldyb25nIHBhc3N3b3JkXCIpO1xuICAgICAgICAgIGF1ZGlvV3JvbmcucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBMZXZlciB7XG4gICAgY29uc3RydWN0b3IocG93ZXJCb3gpe1xuICAgICAgdGhpcy5wb3dlckJveCA9IHBvd2VyQm94O1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0ICRsZXZlciA9ICQoJy5sZXZlcicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGxldmVyLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wb3dlckJveC5pc1NvbHZlZCl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wZW4nKTtcbiAgICAgICAgICBsZXQgJGRvb3JIaWRkZW5TYWZlID0gJCgnLmRvb3JIaWRkZW5TYWZlJyk7XG4gICAgICAgICAgJGRvb3JIaWRkZW5TYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIGxldCBhdWRpb1NhZmUgPSBuZXcgQXVkaW8oJ3NvdW5kcy9zYWZlLndhdicpO1xuICAgICAgICAgIGF1ZGlvU2FmZS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiTm8gcG93ZXJcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvdGljay53YXYnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFByZXNzdXJlIHtcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0KXtcbiAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJHBpcGUgPSAkKCcucGlwZScpO1xuICAgICAgJHBpcGUub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnN1YmplY3QuaXNBY3RpdmUpe1xuICAgICAgICAgIGxldCAkcHJlc3N1cmUgPSAkKCcucHJlc3N1cmUnKTtcbiAgICAgICAgICAkcHJlc3N1cmUuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgc2VsZi5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzdXJlJyArIHNlbGYuaXNBY3RpdmUpO1xuICAgICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3ByZXNzdXJlLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgY2FuJ3QgdHVybiBpdFwiKTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJJIGNhbid0IHR1cm4gaXRcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvZ3JvYW4ubXAzJyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBNYWluUGlwZSB7XG4gICAgY29uc3RydWN0b3IocHJlc3N1cmUpe1xuICAgICAgdGhpcy5wcmVzc3VyZSA9IHByZXNzdXJlO1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0ICRtYWlucGlwZSA9ICQoJy5tYWlucGlwZScpO1xuICAgICAgJG1haW5waXBlLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYucHJlc3N1cmUuaXNBY3RpdmUpe1xuICAgICAgICAgIGxldCAkb3BlbkV4aXQgPSAkKCcub3BlbkV4aXQnKTtcbiAgICAgICAgICAkb3BlbkV4aXQuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgZ2FtZS5zaG93TmV3U2NlbmUoJ2g0Jyk7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvbWFpbmRvb3Iud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJUaGVyZSBpcyBubyBwcmVzc3VyZVwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ub3ByZXNzdXJlLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgT3BlblBvd2VyIHtcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0KXtcbiAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgfVxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0ICRkb29yUG93ZXIgPSAkKCcuZG9vclBvd2VyJyk7XG4gICAgICBsZXQgJGgzdG9oM2EgPSAkKCcuaDN0b2gzYScpO1xuICAgICAgbGV0ICRvcGVuUG93ZXIgPSAkKCcub3BlblBvd2VyJyk7XG4gICAgICBsZXQgYXVkaW9Dcm93YmFyID0gbmV3IEF1ZGlvKCdzb3VuZHMvY3Jvd2Jhci53YXYnKTtcbiAgICAgICRkb29yUG93ZXIub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnN1YmplY3QuaXNBY3RpdmUpe1xuICAgICAgICAgICRoM3RvaDNhLmFkZENsYXNzKCdub1Nob3cnKTtcbiAgICAgICAgICAkb3BlblBvd2VyLnJlbW92ZUNsYXNzKCdub1Nob3cnKVxuICAgICAgICAgIGdhbWUuc2hvd05ld1NjZW5lKCdoMycpO1xuICAgICAgICAgIGF1ZGlvQ3Jvd2Jhci5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiSSBjYW4ndCBtb3ZlIGl0XCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBDYXJkYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHN1YmplY3Qpe1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICB9XG4gICAgd2F0Y2goKSB7XG4gICAgICBsZXQgJGNhcmRib2FyZEFyZWEgPSAkKCcuY2FyZGJvYXJkQXJlYScpO1xuICAgICAgbGV0ICRvcGVuQm94ID0gJCgnLm9wZW5Cb3gnKTtcbiAgICAgIGxldCBhdWRpb0JveCA9IG5ldyBBdWRpbygnc291bmRzL2JveC53YXYnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICRjYXJkYm9hcmRBcmVhLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgJG9wZW5Cb3gucmVtb3ZlQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgICAgIGF1ZGlvQm94LnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJUaGlzIHRhcGUgaXMgdG9vIHN0cm9uZ1wiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Eb29yc1xuXG4gIGNsYXNzIERvb3Ige1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIG9wZW5Eb29yKCkge1xuICAgICAgbGV0ICRkb29yID0gJCgnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgbGV0IGF1ZGlvT3BlbkRvb3IgPSBuZXcgQXVkaW8oJ3NvdW5kcy9vcGVuZG9vci53YXYnKTtcbiAgICAgICRkb29yLnJlbW92ZUNsYXNzKCdub1Nob3cnKTtcbiAgICAgIGF1ZGlvT3BlbkRvb3IucGxheSgpO1xuICAgIH1cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1BY3RpdmVzXG5cbiAgY2xhc3MgQWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzdWJqZWN0LCBkb29yLCB0ZXh0KSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgIHRoaXMuZG9vciA9IGRvb3I7XG4gICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIH1cbiAgICB3YXRjaCgpIHtcbiAgICAgIGxldCAkYWN0aXZlID0gJCgnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgbGV0IGF1ZGlvQ2xvc2UgPSBuZXcgQXVkaW8oJ3NvdW5kcy9jbG9zZS53YXYnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICRhY3RpdmUub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5zdWJqZWN0LmlzQWN0aXZlKXtcbiAgICAgICAgICBzZWxmLmRvb3Iub3BlbkRvb3IoKTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYudGV4dCk7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiTG9ja2VkXCIpO1xuICAgICAgICAgIGF1ZGlvQ2xvc2UucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZVxuXG4gIGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zY2VuZSA9IFwiaDFcIjtcbiAgICB9XG4gICAgc3RhcnROZXdHYW1lKCkge1xuICAgICAgLy9sb2FkaW5nIGludmVudG95XG4gICAgICBsZXQgaW52ZW50b3J5ID0gbmV3IEludmVudG9yeSgpO1xuXG4gICAgICAvL2xvYWRpbmcgc3ViamVjdHNcbiAgICAgIGxldCBrZXkxID0gbmV3IFN1YmplY3QoJ2tleTEnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5MS53YXRjaCgpO1xuICAgICAgbGV0IGtleTIgPSBuZXcgU3ViamVjdCgna2V5MicsIGludmVudG9yeSk7XG4gICAgICBrZXkyLndhdGNoKCk7XG4gICAgICBsZXQga2V5MyA9IG5ldyBTdWJqZWN0KCdrZXkzJywgaW52ZW50b3J5KTtcbiAgICAgIGtleTMud2F0Y2goKTtcbiAgICAgIGxldCBrZXk0ID0gbmV3IFN1YmplY3QoJ2tleTQnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5NC53YXRjaCgpO1xuICAgICAgbGV0IGtleTUgPSBuZXcgU3ViamVjdCgna2V5NScsIGludmVudG9yeSk7XG4gICAgICBrZXk1LndhdGNoKCk7XG4gICAgICBsZXQgY3Jvd2JhciA9IG5ldyBTdWJqZWN0KCdjcm93YmFyJywgaW52ZW50b3J5KTtcbiAgICAgIGNyb3diYXIud2F0Y2goKTtcbiAgICAgIGxldCBzdGFubGV5ID0gbmV3IFN1YmplY3QoJ3N0YW5sZXknLCBpbnZlbnRvcnkpO1xuICAgICAgc3RhbmxleS53YXRjaCgpO1xuICAgICAgbGV0IGh5ZHJhdWxpYyA9IG5ldyBTdWJqZWN0KCdoeWRyYXVsaWMnLCBpbnZlbnRvcnkpO1xuICAgICAgaHlkcmF1bGljLndhdGNoKCk7XG5cbiAgICAgIC8vbG9hZGluZyBqaWdzYXdzXG4gICAgICBsZXQgc2FmZSA9IG5ldyBTYWZlKCk7XG4gICAgICBzYWZlLndhdGNoKCk7XG4gICAgICBsZXQgb3BlblBvd2VyID0gbmV3IE9wZW5Qb3dlcihjcm93YmFyKTtcbiAgICAgIG9wZW5Qb3dlci53YXRjaCgpO1xuICAgICAgbGV0IHBvd2VyQm94ID0gbmV3IFBvd2VyQm94KCk7XG4gICAgICBwb3dlckJveC53YXRjaCgpO1xuICAgICAgbGV0IGxldmVyID0gbmV3IExldmVyKHBvd2VyQm94KTtcbiAgICAgIGxldmVyLndhdGNoKCk7XG4gICAgICBsZXQgcHJlc3N1cmUgPSBuZXcgUHJlc3N1cmUoaHlkcmF1bGljKTtcbiAgICAgIHByZXNzdXJlLndhdGNoKCk7XG4gICAgICBsZXQgbWFpbnBpcGUgPSBuZXcgTWFpblBpcGUocHJlc3N1cmUpO1xuICAgICAgbWFpbnBpcGUud2F0Y2goKTtcbiAgICAgIGxldCBjYXJkYm9hcmQgPSBuZXcgQ2FyZGJvYXJkKHN0YW5sZXkpO1xuICAgICAgY2FyZGJvYXJkLndhdGNoKCk7XG5cbiAgICAgIC8vbG9hZGluZyBkb29yc1xuICAgICAgbGV0IGRvb3IxID0gbmV3IERvb3IoJ2Rvb3IxJyk7XG4gICAgICBsZXQgZG9vcjIgPSBuZXcgRG9vcignZG9vcjInKTtcbiAgICAgIGxldCBkb29yMyA9IG5ldyBEb29yKCdkb29yMycpO1xuICAgICAgbGV0IGRvb3I0ID0gbmV3IERvb3IoJ2Rvb3I0Jyk7XG4gICAgICBsZXQgZG9vcjUgPSBuZXcgRG9vcignZG9vcjUnKTtcblxuICAgICAgLy9sb2FkaW5nIGFjdGl2ZXNcbiAgICAgIGxldCBsb2NrMSA9IG5ldyBBY3RpdmUoJ2xvY2sxJywga2V5MSwgZG9vcjEpO1xuICAgICAgbG9jazEud2F0Y2goKTtcbiAgICAgIGxldCBsb2NrMiA9IG5ldyBBY3RpdmUoJ2xvY2syJywga2V5MiwgZG9vcjIpO1xuICAgICAgbG9jazIud2F0Y2goKTtcbiAgICAgIGxldCBsb2NrMyA9IG5ldyBBY3RpdmUoJ2xvY2szJywga2V5MywgZG9vcjMpO1xuICAgICAgbG9jazMud2F0Y2goKTtcbiAgICAgIGxldCBsb2NrNCA9IG5ldyBBY3RpdmUoJ2xvY2s0Jywga2V5NCwgZG9vcjQpO1xuICAgICAgbG9jazQud2F0Y2goKTtcbiAgICAgIGxldCBsb2NrNSA9IG5ldyBBY3RpdmUoJ2xvY2s1Jywga2V5NSwgZG9vcjUpO1xuICAgICAgbG9jazUud2F0Y2goKTtcblxuICAgICAgLy9sb2FkaW5nIHNjZW5lc1xuICAgICAgdGhpcy5zaG93TmV3U2NlbmUodGhpcy5zY2VuZSk7XG4gICAgICB0aGlzLndhdGNoTW92ZXMoKTtcbiAgICB9XG5cbiAgICBzaG93TmV3U2NlbmUobmV3U2NlbmUpIHtcbiAgICAgICQoJy4nKyB0aGlzLnNjZW5lKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xuICAgICAgJCgnLicrIG5ld1NjZW5lKS5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgIHRoaXMuc2NlbmUgPSBuZXdTY2VuZTtcbiAgICB9XG5cbiAgICBzaG93RGlhbG9ndWVzKHRleHQpe1xuICAgICAgbGV0ICRkaWFsb2d1ZXMgPSAkKCcjZGlhbG9ndWVzJyk7XG4gICAgICAkZGlhbG9ndWVzLmh0bWwoIFwiPHA+XCIrdGV4dCtcIjwvcD5cIiApO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkZGlhbG9ndWVzLmh0bWwoXCJcIik7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICB3YXRjaE1vdmVzKCkge1xuICAgICAgbGV0ICRtb3ZlcyA9ICQoJy5tb3ZlJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkbW92ZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIHNlbGYuc2hvd05ld1NjZW5lKHRoaXMuZGF0YXNldC5nb3RvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTWFpblxuICBsZXQgJHN0YXJ0ID0gJCgnI3N0YXJ0Jyk7XG4gIGxldCAkYnV0dG9uID0gJHN0YXJ0LmZpbmQoJ2J1dHRvbicpO1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG5cbiAgJGJ1dHRvbi5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgJHN0YXJ0LmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XG4gICAgZ2FtZS5zdGFydE5ld0dhbWUoKTtcbiAgfSk7XG5cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==