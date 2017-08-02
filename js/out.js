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

  game.startNewGame();

  $button.on('click', function () {
    $start.css("display", "none");
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmFiMTg5MTIwOGRiYjRiYmJiMjEiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCIkZWxlbWVudHNJbkludmVudG9yeSIsImVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGgiLCJyZW1vdmVDbGFzcyIsImF1ZGlvSXRlbSIsIkF1ZGlvIiwiYWRkVG9JbnZlbnRvcnkiLCJwbGF5IiwiUG93ZXJCb3giLCJpc1NvbHZlZCIsImF1ZGlvUG93ZXIiLCIkcG93ZXJCb3giLCJudW1iZXIiLCJjb2xvciIsImNzcyIsImdhbWUiLCJzaG93RGlhbG9ndWVzIiwiU2FmZSIsImF1ZGlvQmVlcCIsImF1ZGlvV3JvbmciLCIkYnV0dG9uIiwiJGJ1dHRvblN1YiIsIiRidXR0b25EZWwiLCIkYnV0dG9uQmFyIiwicGluIiwiaW5uZXJUZXh0IiwidGV4dCIsIiRkb29yU2FmZSIsImF1ZGlvU2FmZSIsIkxldmVyIiwicG93ZXJCb3giLCIkbGV2ZXIiLCIkZG9vckhpZGRlblNhZmUiLCJhdWRpbyIsIlByZXNzdXJlIiwiJHBpcGUiLCIkcHJlc3N1cmUiLCJNYWluUGlwZSIsInByZXNzdXJlIiwiJG1haW5waXBlIiwiJG9wZW5FeGl0Iiwic2hvd05ld1NjZW5lIiwiT3BlblBvd2VyIiwiJGRvb3JQb3dlciIsIiRoM3RvaDNhIiwiJG9wZW5Qb3dlciIsImF1ZGlvQ3Jvd2JhciIsIkNhcmRib2FyZCIsIiRjYXJkYm9hcmRBcmVhIiwiJG9wZW5Cb3giLCJhdWRpb0JveCIsIkRvb3IiLCIkZG9vciIsImF1ZGlvT3BlbkRvb3IiLCJBY3RpdmUiLCJkb29yIiwiJGFjdGl2ZSIsImF1ZGlvQ2xvc2UiLCJvcGVuRG9vciIsIkdhbWUiLCJzY2VuZSIsImtleTEiLCJrZXkyIiwia2V5MyIsImtleTQiLCJrZXk1IiwiY3Jvd2JhciIsInN0YW5sZXkiLCJoeWRyYXVsaWMiLCJzYWZlIiwib3BlblBvd2VyIiwibGV2ZXIiLCJtYWlucGlwZSIsImNhcmRib2FyZCIsImRvb3IxIiwiZG9vcjIiLCJkb29yMyIsImRvb3I0IiwiZG9vcjUiLCJsb2NrMSIsImxvY2syIiwibG9jazMiLCJsb2NrNCIsImxvY2s1Iiwid2F0Y2hNb3ZlcyIsIm5ld1NjZW5lIiwiJGRpYWxvZ3VlcyIsImh0bWwiLCJzZXRUaW1lb3V0IiwiJG1vdmVzIiwiZGF0YXNldCIsImdvdG8iLCIkc3RhcnQiLCJzdGFydE5ld0dhbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REFBLEVBQUVDLE1BQUYsRUFBVUMs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RUFBWCxDQUFjLE9BQWQsRUFBc0IsWUFBVTtBQUM5QlcsaUJBQUs4RCxZQUFMLENBQWtCLEtBQUtpRCxPQUFMLENBQWFDLElBQS9CO0FBQ0QsV0FGRDtBQUdELFNBSkQ7QUFLRDtBQXpaMkI7O0FBQUE7QUFBQTs7QUE0WmhDOzs7QUFDRSxNQUFJQyxTQUFTOUgsRUFBRSxRQUFGLENBQWI7QUFDQSxNQUFJc0QsVUFBVXdFLE9BQU9sSCxJQUFQLENBQVksUUFBWixDQUFkO0FBQ0EsTUFBSXFDLE9BQU8sSUFBSTRDLElBQUosRUFBWDs7QUFFQTVDLE9BQUs4RSxZQUFMOztBQUVBekUsVUFBUXBELEVBQVIsQ0FBVyxPQUFYLEVBQW1CLFlBQVU7QUFDM0I0SCxXQUFPOUUsR0FBUCxDQUFXLFNBQVgsRUFBcUIsTUFBckI7QUFDRCxHQUZEO0FBSUQsQ0F2YUQsRSIsImZpbGUiOiIuL2pzL291dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJhYjE4OTEyMDhkYmI0YmJiYjIxIiwiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICQoJyNsb2FkaW5nJykuYWRkQ2xhc3MoJ25vU2hvdycpO1xuICBjb25zb2xlLmxvZygnQ29udGVudCBsb2FkZWQnKTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUludmVudG9yeVxuICBjbGFzcyBJbnZlbnRvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zdWJqZWN0c0luc2lkZSA9IFtdO1xuICAgIH1cblxuICAgIGFkZFN1YmplY3Qoc3ViamVjdCkge1xuICAgICAgdGhpcy5zdWJqZWN0c0luc2lkZS5wdXNoKHN1YmplY3QpO1xuICAgICAgdGhpcy53YXRjaCgpO1xuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgICBsZXQgJGVsZW1lbnRzID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLm9mZigpO1xuICAgICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5zdWJqZWN0c0luc2lkZVtpbmRleF0uYWN0aXZhdGUoaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVN1YmplY3RcblxuICBjbGFzcyBTdWJqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpbnZlbnRvcnkpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLmludmVudG9yeSA9IGludmVudG9yeTtcbiAgICAgIHRoaXMuaXNJbkludmVudG9yeSA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5oYXNCZWVuVXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jbGFzcyA9ICcuJyArIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBhZGRUb0ludmVudG9yeSgpIHtcbiAgICAgIGxldCAkc3ViamVjdCA9ICQoJy4nICsgdGhpcy5uYW1lKTtcbiAgICAgIGxldCAkaW52ZW50b3J5ID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgJHN1YmplY3QuYWRkQ2xhc3MoJ25vU2hvdycpO1xuXG4gICAgICBmb3IobGV0IGk9MDsgaTwkaW52ZW50b3J5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYoJCgkaW52ZW50b3J5W2ldKS5oYXNDbGFzcygnZW1wdHknKSAmJiAhKHRoaXMuaXNJbkludmVudG9yeSkpe1xuICAgICAgICAgICQoJGludmVudG9yeVtpXSkuZmluZCgnaW1nJykuYXR0cignc3JjJywgJy4vaW1hZ2VzL2knK3RoaXMubmFtZSsnLnBuZycpO1xuICAgICAgICAgIHRoaXMuaXNJbkludmVudG9yeSA9IHRydWU7XG4gICAgICAgICAgJGludmVudG9yeVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuICAgICAgICAgIHRoaXMuaW52ZW50b3J5LmFkZFN1YmplY3QodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3RpdmF0ZShpbmRleCkge1xuICAgICAgbGV0ICRlbGVtZW50cyA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgIGxldCAkZWxlbWVudHNJbkludmVudG9yeSA9IHRoaXMuaW52ZW50b3J5LnN1YmplY3RzSW5zaWRlO1xuICAgICAgbGV0IGVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGggPSAkZWxlbWVudHNJbkludmVudG9yeS5sZW5ndGg7XG5cbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUgPT0gZmFsc2UpIHtcblxuICAgICAgICBmb3IobGV0IGk9MDsgaTxlbGVtZW50c0luSW52ZW50b3J5TGVuZ3RoOyBpKyspe1xuICAgICAgICAgICQoJGVsZW1lbnRzW2ldKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgICAkZWxlbWVudHNJbkludmVudG9yeVtpXS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCRlbGVtZW50c0luSW52ZW50b3J5W2ldLmlzQWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkuYWRkQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBhY3RpdmVcIik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBub3QgYWN0aXZlXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0IGF1ZGlvSXRlbSA9IG5ldyBBdWRpbygnc291bmRzL2l0ZW0ud2F2Jyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkKCcuJyArIHRoaXMubmFtZSkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLmFkZFRvSW52ZW50b3J5KCk7XG4gICAgICAgIGF1ZGlvSXRlbS5wbGF5KCk7XG4gICAgICB9KVxuICAgIH1cblxuICB9XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DdWJieVxuXG4gIGNsYXNzIFBvd2VyQm94IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuaXNTb2x2ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICB0aGlzLmlzU29sdmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCBhdWRpb1Bvd2VyID0gbmV3IEF1ZGlvKCdzb3VuZHMvcG93ZXIud2F2Jyk7XG4gICAgICBsZXQgJHBvd2VyQm94ID0gJCgnLnBvd2VyQm94Jyk7XG4gICAgICBsZXQgbnVtYmVyPVswLDAsMCwwXTtcbiAgICAgIGxldCBjb2xvcj1bJyM2ZWJhMWEnLCcjZmYwMDAwJywnIzFlMjBkOScsJyNlNjNiZmInLCcjZmZlODFkJywnIzcwM2YyMScsJyNmZjdmMTcnLCcjZmZmZmZmJywnIzAwMDAwMCddO1xuICAgICAgJHBvd2VyQm94LmVhY2goZnVuY3Rpb24oaW5kZXgsZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIG51bWJlcltpbmRleF0rKztcbiAgICAgICAgICBpZihudW1iZXJbaW5kZXhdID09IDEwKXtcbiAgICAgICAgICAgIG51bWJlcltpbmRleF09MTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtY29sb3InLGNvbG9yW251bWJlcltpbmRleF0gLSAxXSk7XG4gICAgICAgICAgaWYobnVtYmVyWzBdPT02ICYmIG51bWJlclsxXT09OCAmJiBudW1iZXJbMl09PTcgJiYgbnVtYmVyWzNdPT00KXtcbiAgICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIlNvbWV0aGluZyBjcmFja2xlZFwiKTtcbiAgICAgICAgICAgIGF1ZGlvUG93ZXIucGxheSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NvbHZlZCEnKTtcbiAgICAgICAgICAgICRwb3dlckJveC5vZmYoKTtcbiAgICAgICAgICAgIHNlbGYuYWN0aXZhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgU2FmZSB7XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBhdWRpb0JlZXAgPSBuZXcgQXVkaW8oJ3NvdW5kcy9iZWVwLndhdicpO1xuICAgICAgbGV0IGF1ZGlvV3JvbmcgPSBuZXcgQXVkaW8oJ3NvdW5kcy93cm9uZy53YXYnKTtcbiAgICAgIGxldCAkYnV0dG9uID0gJCgnLmJ1dHRvbicpO1xuICAgICAgbGV0ICRidXR0b25TdWIgPSAkKCcuYnV0dG9uU3ViJyk7XG4gICAgICBsZXQgJGJ1dHRvbkRlbCA9ICQoJy5idXR0b25EZWwnKTtcbiAgICAgIGxldCAkYnV0dG9uQmFyID0gJCgnLmJ1dHRvbkJhcicpO1xuICAgICAgbGV0IHBpbiA9IFwiXCI7XG5cbiAgICAgICRidXR0b24uZWFjaChmdW5jdGlvbihpbmRleCxlbGVtZW50KXtcbiAgICAgICAgJChlbGVtZW50KS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgaWYocGluLmxlbmd0aCA8MTApe1xuICAgICAgICAgICAgcGluICs9IGVsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGluKTtcbiAgICAgICAgICAgICRidXR0b25CYXIudGV4dChwaW4pO1xuICAgICAgICAgICAgYXVkaW9CZWVwLnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgICRidXR0b25EZWwub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBwaW4gPSBcIlwiO1xuICAgICAgICAkYnV0dG9uQmFyLnRleHQocGluKTtcbiAgICAgICAgYXVkaW9CZWVwLnBsYXkoKTtcbiAgICAgIH0pO1xuXG4gICAgICAkYnV0dG9uU3ViLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYocGluID09PSBcIjE2MjYzNjQ2NTZcIil7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3NvbHZlZCEnKTtcbiAgICAgICAgICBsZXQgJGRvb3JTYWZlID0gJCgnLmRvb3JTYWZlJyk7XG4gICAgICAgICAgJGRvb3JTYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIGxldCBhdWRpb1NhZmUgPSBuZXcgQXVkaW8oJ3NvdW5kcy9zYWZlLndhdicpO1xuICAgICAgICAgIGF1ZGlvU2FmZS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiV3JvbmcgcGFzc3dvcmRcIik7XG4gICAgICAgICAgYXVkaW9Xcm9uZy5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIExldmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3dlckJveCl7XG4gICAgICB0aGlzLnBvd2VyQm94ID0gcG93ZXJCb3g7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgJGxldmVyID0gJCgnLmxldmVyJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkbGV2ZXIub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnBvd2VyQm94LmlzU29sdmVkKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbicpO1xuICAgICAgICAgIGxldCAkZG9vckhpZGRlblNhZmUgPSAkKCcuZG9vckhpZGRlblNhZmUnKTtcbiAgICAgICAgICAkZG9vckhpZGRlblNhZmUuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvU2FmZSA9IG5ldyBBdWRpbygnc291bmRzL3NhZmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW9TYWZlLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJObyBwb3dlclwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy90aWNrLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgUHJlc3N1cmUge1xuICAgIGNvbnN0cnVjdG9yKHN1YmplY3Qpe1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCAkcGlwZSA9ICQoJy5waXBlJyk7XG4gICAgICAkcGlwZS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgbGV0ICRwcmVzc3VyZSA9ICQoJy5wcmVzc3VyZScpO1xuICAgICAgICAgICRwcmVzc3VyZS5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBzZWxmLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJlc3N1cmUnICsgc2VsZi5pc0FjdGl2ZSk7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvcHJlc3N1cmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSSBjYW4ndCB0dXJuIGl0XCIpO1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIkkgY2FuJ3QgdHVybiBpdFwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ncm9hbi5tcDMnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIE1haW5QaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihwcmVzc3VyZSl7XG4gICAgICB0aGlzLnByZXNzdXJlID0gcHJlc3N1cmU7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJG1haW5waXBlID0gJCgnLm1haW5waXBlJyk7XG4gICAgICAkbWFpbnBpcGUub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wcmVzc3VyZS5pc0FjdGl2ZSl7XG4gICAgICAgICAgbGV0ICRvcGVuRXhpdCA9ICQoJy5vcGVuRXhpdCcpO1xuICAgICAgICAgICRvcGVuRXhpdC5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBnYW1lLnNob3dOZXdTY2VuZSgnaDQnKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9tYWluZG9vci53YXYnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIlRoZXJlIGlzIG5vIHByZXNzdXJlXCIpO1xuICAgICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL25vcHJlc3N1cmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBPcGVuUG93ZXIge1xuICAgIGNvbnN0cnVjdG9yKHN1YmplY3Qpe1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICB9XG4gICAgd2F0Y2goKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJGRvb3JQb3dlciA9ICQoJy5kb29yUG93ZXInKTtcbiAgICAgIGxldCAkaDN0b2gzYSA9ICQoJy5oM3RvaDNhJyk7XG4gICAgICBsZXQgJG9wZW5Qb3dlciA9ICQoJy5vcGVuUG93ZXInKTtcbiAgICAgIGxldCBhdWRpb0Nyb3diYXIgPSBuZXcgQXVkaW8oJ3NvdW5kcy9jcm93YmFyLndhdicpO1xuICAgICAgJGRvb3JQb3dlci5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgJGgzdG9oM2EuYWRkQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgICAgICRvcGVuUG93ZXIucmVtb3ZlQ2xhc3MoJ25vU2hvdycpXG4gICAgICAgICAgZ2FtZS5zaG93TmV3U2NlbmUoJ2gzJyk7XG4gICAgICAgICAgYXVkaW9Dcm93YmFyLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJJIGNhbid0IG1vdmUgaXRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIENhcmRib2FyZCB7XG4gICAgY29uc3RydWN0b3Ioc3ViamVjdCl7XG4gICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgIH1cbiAgICB3YXRjaCgpIHtcbiAgICAgIGxldCAkY2FyZGJvYXJkQXJlYSA9ICQoJy5jYXJkYm9hcmRBcmVhJyk7XG4gICAgICBsZXQgJG9wZW5Cb3ggPSAkKCcub3BlbkJveCcpO1xuICAgICAgbGV0IGF1ZGlvQm94ID0gbmV3IEF1ZGlvKCdzb3VuZHMvYm94LndhdicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGNhcmRib2FyZEFyZWEub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5zdWJqZWN0LmlzQWN0aXZlKXtcbiAgICAgICAgICAkb3BlbkJveC5yZW1vdmVDbGFzcygnbm9TaG93Jyk7XG4gICAgICAgICAgYXVkaW9Cb3gucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIlRoaXMgdGFwZSBpcyB0b28gc3Ryb25nXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURvb3JzXG5cbiAgY2xhc3MgRG9vciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG4gICAgb3BlbkRvb3IoKSB7XG4gICAgICBsZXQgJGRvb3IgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICBsZXQgYXVkaW9PcGVuRG9vciA9IG5ldyBBdWRpbygnc291bmRzL29wZW5kb29yLndhdicpO1xuICAgICAgJGRvb3IucmVtb3ZlQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgYXVkaW9PcGVuRG9vci5wbGF5KCk7XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUFjdGl2ZXNcblxuICBjbGFzcyBBY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHN1YmplY3QsIGRvb3IsIHRleHQpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgdGhpcy5kb29yID0gZG9vcjtcbiAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0ICRhY3RpdmUgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICBsZXQgYXVkaW9DbG9zZSA9IG5ldyBBdWRpbygnc291bmRzL2Nsb3NlLndhdicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGFjdGl2ZS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnN1YmplY3QuaXNBY3RpdmUpe1xuICAgICAgICAgIHNlbGYuZG9vci5vcGVuRG9vcigpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi50ZXh0KTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJMb2NrZWRcIik7XG4gICAgICAgICAgYXVkaW9DbG9zZS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1HYW1lXG5cbiAgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLnNjZW5lID0gXCJoMVwiO1xuICAgIH1cbiAgICBzdGFydE5ld0dhbWUoKSB7XG4gICAgICAvL2xvYWRpbmcgaW52ZW50b3lcbiAgICAgIGxldCBpbnZlbnRvcnkgPSBuZXcgSW52ZW50b3J5KCk7XG5cbiAgICAgIC8vbG9hZGluZyBzdWJqZWN0c1xuICAgICAgbGV0IGtleTEgPSBuZXcgU3ViamVjdCgna2V5MScsIGludmVudG9yeSk7XG4gICAgICBrZXkxLndhdGNoKCk7XG4gICAgICBsZXQga2V5MiA9IG5ldyBTdWJqZWN0KCdrZXkyJywgaW52ZW50b3J5KTtcbiAgICAgIGtleTIud2F0Y2goKTtcbiAgICAgIGxldCBrZXkzID0gbmV3IFN1YmplY3QoJ2tleTMnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5My53YXRjaCgpO1xuICAgICAgbGV0IGtleTQgPSBuZXcgU3ViamVjdCgna2V5NCcsIGludmVudG9yeSk7XG4gICAgICBrZXk0LndhdGNoKCk7XG4gICAgICBsZXQga2V5NSA9IG5ldyBTdWJqZWN0KCdrZXk1JywgaW52ZW50b3J5KTtcbiAgICAgIGtleTUud2F0Y2goKTtcbiAgICAgIGxldCBjcm93YmFyID0gbmV3IFN1YmplY3QoJ2Nyb3diYXInLCBpbnZlbnRvcnkpO1xuICAgICAgY3Jvd2Jhci53YXRjaCgpO1xuICAgICAgbGV0IHN0YW5sZXkgPSBuZXcgU3ViamVjdCgnc3RhbmxleScsIGludmVudG9yeSk7XG4gICAgICBzdGFubGV5LndhdGNoKCk7XG4gICAgICBsZXQgaHlkcmF1bGljID0gbmV3IFN1YmplY3QoJ2h5ZHJhdWxpYycsIGludmVudG9yeSk7XG4gICAgICBoeWRyYXVsaWMud2F0Y2goKTtcblxuICAgICAgLy9sb2FkaW5nIGppZ3Nhd3NcbiAgICAgIGxldCBzYWZlID0gbmV3IFNhZmUoKTtcbiAgICAgIHNhZmUud2F0Y2goKTtcbiAgICAgIGxldCBvcGVuUG93ZXIgPSBuZXcgT3BlblBvd2VyKGNyb3diYXIpO1xuICAgICAgb3BlblBvd2VyLndhdGNoKCk7XG4gICAgICBsZXQgcG93ZXJCb3ggPSBuZXcgUG93ZXJCb3goKTtcbiAgICAgIHBvd2VyQm94LndhdGNoKCk7XG4gICAgICBsZXQgbGV2ZXIgPSBuZXcgTGV2ZXIocG93ZXJCb3gpO1xuICAgICAgbGV2ZXIud2F0Y2goKTtcbiAgICAgIGxldCBwcmVzc3VyZSA9IG5ldyBQcmVzc3VyZShoeWRyYXVsaWMpO1xuICAgICAgcHJlc3N1cmUud2F0Y2goKTtcbiAgICAgIGxldCBtYWlucGlwZSA9IG5ldyBNYWluUGlwZShwcmVzc3VyZSk7XG4gICAgICBtYWlucGlwZS53YXRjaCgpO1xuICAgICAgbGV0IGNhcmRib2FyZCA9IG5ldyBDYXJkYm9hcmQoc3RhbmxleSk7XG4gICAgICBjYXJkYm9hcmQud2F0Y2goKTtcblxuICAgICAgLy9sb2FkaW5nIGRvb3JzXG4gICAgICBsZXQgZG9vcjEgPSBuZXcgRG9vcignZG9vcjEnKTtcbiAgICAgIGxldCBkb29yMiA9IG5ldyBEb29yKCdkb29yMicpO1xuICAgICAgbGV0IGRvb3IzID0gbmV3IERvb3IoJ2Rvb3IzJyk7XG4gICAgICBsZXQgZG9vcjQgPSBuZXcgRG9vcignZG9vcjQnKTtcbiAgICAgIGxldCBkb29yNSA9IG5ldyBEb29yKCdkb29yNScpO1xuXG4gICAgICAvL2xvYWRpbmcgYWN0aXZlc1xuICAgICAgbGV0IGxvY2sxID0gbmV3IEFjdGl2ZSgnbG9jazEnLCBrZXkxLCBkb29yMSk7XG4gICAgICBsb2NrMS53YXRjaCgpO1xuICAgICAgbGV0IGxvY2syID0gbmV3IEFjdGl2ZSgnbG9jazInLCBrZXkyLCBkb29yMik7XG4gICAgICBsb2NrMi53YXRjaCgpO1xuICAgICAgbGV0IGxvY2szID0gbmV3IEFjdGl2ZSgnbG9jazMnLCBrZXkzLCBkb29yMyk7XG4gICAgICBsb2NrMy53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s0ID0gbmV3IEFjdGl2ZSgnbG9jazQnLCBrZXk0LCBkb29yNCk7XG4gICAgICBsb2NrNC53YXRjaCgpO1xuICAgICAgbGV0IGxvY2s1ID0gbmV3IEFjdGl2ZSgnbG9jazUnLCBrZXk1LCBkb29yNSk7XG4gICAgICBsb2NrNS53YXRjaCgpO1xuXG4gICAgICAvL2xvYWRpbmcgc2NlbmVzXG4gICAgICB0aGlzLnNob3dOZXdTY2VuZSh0aGlzLnNjZW5lKTtcbiAgICAgIHRoaXMud2F0Y2hNb3ZlcygpO1xuICAgIH1cblxuICAgIHNob3dOZXdTY2VuZShuZXdTY2VuZSkge1xuICAgICAgJCgnLicrIHRoaXMuc2NlbmUpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XG4gICAgICAkKCcuJysgbmV3U2NlbmUpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgdGhpcy5zY2VuZSA9IG5ld1NjZW5lO1xuICAgIH1cblxuICAgIHNob3dEaWFsb2d1ZXModGV4dCl7XG4gICAgICBsZXQgJGRpYWxvZ3VlcyA9ICQoJyNkaWFsb2d1ZXMnKTtcbiAgICAgICRkaWFsb2d1ZXMuaHRtbCggXCI8cD5cIit0ZXh0K1wiPC9wPlwiICk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICRkaWFsb2d1ZXMuaHRtbChcIlwiKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIHdhdGNoTW92ZXMoKSB7XG4gICAgICBsZXQgJG1vdmVzID0gJCgnLm1vdmUnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICRtb3Zlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXtcbiAgICAgICAgJChlbGVtZW50KS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgc2VsZi5zaG93TmV3U2NlbmUodGhpcy5kYXRhc2V0LmdvdG8pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1NYWluXG4gIGxldCAkc3RhcnQgPSAkKCcjc3RhcnQnKTtcbiAgbGV0ICRidXR0b24gPSAkc3RhcnQuZmluZCgnYnV0dG9uJyk7XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcblxuICBnYW1lLnN0YXJ0TmV3R2FtZSgpO1xuXG4gICRidXR0b24ub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICRzdGFydC5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xuICB9KTtcblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9