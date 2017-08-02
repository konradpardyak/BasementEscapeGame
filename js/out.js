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
    function Door(name, subject, door) {
      _classCallCheck(this, Door);

      this.name = name;
      this.subject = subject;
      this.door = door;
    }

    _createClass(Door, [{
      key: 'watch',
      value: function watch() {
        var $area = $('.' + this.name);
        var $door = $('.' + this.door);
        var audioClose = new Audio('sounds/close.wav');
        var audioOpenDoor = new Audio('sounds/opendoor.wav');
        var self = this;
        $area.on('click', function () {
          if (self.subject.isActive) {
            $door.removeClass('noShow');
            audioOpenDoor.play();
          } else {
            console.log(self.text);
            game.showDialogues("Locked");
            audioClose.play();
          }
        });
      }
    }]);

    return Door;
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
        var lock1 = new Door('lock1', key1, 'door1');
        lock1.watch();
        var lock2 = new Door('lock2', key2, 'door2');
        lock2.watch();
        var lock3 = new Door('lock3', key3, 'door3');
        lock3.watch();
        var lock4 = new Door('lock4', key4, 'door4');
        lock4.watch();
        var lock5 = new Door('lock5', key5, 'door5');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzAzNzZmODIzYmU3MGNkMWQ0ZjgiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCIkZWxlbWVudHNJbkludmVudG9yeSIsImVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGgiLCJyZW1vdmVDbGFzcyIsImF1ZGlvSXRlbSIsIkF1ZGlvIiwiYWRkVG9JbnZlbnRvcnkiLCJwbGF5IiwiUG93ZXJCb3giLCJpc1NvbHZlZCIsImF1ZGlvUG93ZXIiLCIkcG93ZXJCb3giLCJudW1iZXIiLCJjb2xvciIsImNzcyIsImdhbWUiLCJzaG93RGlhbG9ndWVzIiwiU2FmZSIsImF1ZGlvQmVlcCIsImF1ZGlvV3JvbmciLCIkYnV0dG9uIiwiJGJ1dHRvblN1YiIsIiRidXR0b25EZWwiLCIkYnV0dG9uQmFyIiwicGluIiwiaW5uZXJUZXh0IiwidGV4dCIsIiRkb29yU2FmZSIsImF1ZGlvU2FmZSIsIkxldmVyIiwicG93ZXJCb3giLCIkbGV2ZXIiLCIkZG9vckhpZGRlblNhZmUiLCJhdWRpbyIsIlByZXNzdXJlIiwiJHBpcGUiLCIkcHJlc3N1cmUiLCJNYWluUGlwZSIsInByZXNzdXJlIiwiJG1haW5waXBlIiwiJG9wZW5FeGl0Iiwic2hvd05ld1NjZW5lIiwiT3BlblBvd2VyIiwiJGRvb3JQb3dlciIsIiRoM3RvaDNhIiwiJG9wZW5Qb3dlciIsImF1ZGlvQ3Jvd2JhciIsIkNhcmRib2FyZCIsIiRjYXJkYm9hcmRBcmVhIiwiJG9wZW5Cb3giLCJhdWRpb0JveCIsIkRvb3IiLCJkb29yIiwiJGFyZWEiLCIkZG9vciIsImF1ZGlvQ2xvc2UiLCJhdWRpb09wZW5Eb29yIiwiR2FtZSIsInNjZW5lIiwia2V5MSIsImtleTIiLCJrZXkzIiwia2V5NCIsImtleTUiLCJjcm93YmFyIiwic3RhbmxleSIsImh5ZHJhdWxpYyIsInNhZmUiLCJvcGVuUG93ZXIiLCJsZXZlciIsIm1haW5waXBlIiwiY2FyZGJvYXJkIiwibG9jazEiLCJsb2NrMiIsImxvY2szIiwibG9jazQiLCJsb2NrNSIsIndhdGNoTW92ZXMiLCJuZXdTY2VuZSIsIiRkaWFsb2d1ZXMiLCJodG1sIiwic2V0VGltZW91dCIsIiRtb3ZlcyIsImRhdGFzZXQiLCJnb3RvIiwiJHN0YXJ0Iiwic3RhcnROZXdHYW1lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDOUJGLElBQUUsVUFBRixFQUFjRyxRQUFkLENBQXVCLFFB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QUNBLGFBQUs0QyxLQUFMLEdBQWFvQixRQUFiO0FBQ0Q7QUFwWDJCO0FBQUE7QUFBQSxvQ0FzWGRwRCxJQXRYYyxFQXNYVDtBQUNqQixZQUFJcUQsYUFBYWpILEVBQUUsWUFBRixDQUFqQjtBQUNBaUgsbUJBQVdDLElBQVgsQ0FBaUIsUUFBTXRELElBQU4sR0FBVyxNQUE1QjtBQUNBdUQsbUJBQVcsWUFBVTtBQUNuQkYscUJBQVdDLElBQVgsQ0FBZ0IsRUFBaEI7QUFDRCxTQUZELEVBRUcsSUFGSDtBQUdEO0FBNVgyQjtBQUFBO0FBQUEsbUNBOFhmO0FBQ1gsWUFBSUUsU0FBU3BILEVBQUUsT0FBRixDQUFiO0FBQ0EsWUFBSWEsT0FBTyxJQUFYO0FBQ0F1RyxlQUFPdEcsSUFBUCxDQUFZLFVBQVNDLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXdCO0FBQ2xDaEIsWUFBRWdCLE9BQUYsRUFBV2QsRUFBWCxDQUFjLE9BQWQsRUFBc0IsWUFBVTtBQUM5QlcsaUJBQUs4RCxZQUFMLENBQWtCLEtBQUswQyxPQUFMLENBQWFDLElBQS9CO0FBQ0QsV0FGRDtBQUdELFNBSkQ7QUFLRDtBQXRZMkI7O0FBQUE7QUFBQTs7QUF5WWhDOzs7QUFDRSxNQUFJQyxTQUFTdkgsRUFBRSxRQUFGLENBQWI7QUFDQSxNQUFJc0QsVUFBVWlFLE9BQU8zRyxJQUFQLENBQVksUUFBWixDQUFkO0FBQ0EsTUFBSXFDLE9BQU8sSUFBSTBDLElBQUosRUFBWDs7QUFFQTFDLE9BQUt1RSxZQUFMOztBQUVBbEUsVUFBUXBELEVBQVIsQ0FBVyxPQUFYLEVBQW1CLFlBQVU7QUFDM0JxSCxXQUFPdkUsR0FBUCxDQUFXLFNBQVgsRUFBcUIsTUFBckI7QUFDRCxHQUZEO0FBSUQsQ0FwWkQsRSIsImZpbGUiOiIuL2pzL291dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMwMzc2ZjgyM2JlNzBjZDFkNGY4IiwiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICQoJyNsb2FkaW5nJykuYWRkQ2xhc3MoJ25vU2hvdycpO1xuICBjb25zb2xlLmxvZygnQ29udGVudCBsb2FkZWQnKTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUludmVudG9yeVxuICBjbGFzcyBJbnZlbnRvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zdWJqZWN0c0luc2lkZSA9IFtdO1xuICAgIH1cblxuICAgIGFkZFN1YmplY3Qoc3ViamVjdCkge1xuICAgICAgdGhpcy5zdWJqZWN0c0luc2lkZS5wdXNoKHN1YmplY3QpO1xuICAgICAgdGhpcy53YXRjaCgpO1xuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgICBsZXQgJGVsZW1lbnRzID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLm9mZigpO1xuICAgICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5zdWJqZWN0c0luc2lkZVtpbmRleF0uYWN0aXZhdGUoaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVN1YmplY3RcblxuICBjbGFzcyBTdWJqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpbnZlbnRvcnkpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLmludmVudG9yeSA9IGludmVudG9yeTtcbiAgICAgIHRoaXMuaXNJbkludmVudG9yeSA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5oYXNCZWVuVXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jbGFzcyA9ICcuJyArIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBhZGRUb0ludmVudG9yeSgpIHtcbiAgICAgIGxldCAkc3ViamVjdCA9ICQoJy4nICsgdGhpcy5uYW1lKTtcbiAgICAgIGxldCAkaW52ZW50b3J5ID0gJCgnI2ludmVudG9yeScpLmZpbmQoJ2RpdicpO1xuICAgICAgJHN1YmplY3QuYWRkQ2xhc3MoJ25vU2hvdycpO1xuXG4gICAgICBmb3IobGV0IGk9MDsgaTwkaW52ZW50b3J5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYoJCgkaW52ZW50b3J5W2ldKS5oYXNDbGFzcygnZW1wdHknKSAmJiAhKHRoaXMuaXNJbkludmVudG9yeSkpe1xuICAgICAgICAgICQoJGludmVudG9yeVtpXSkuZmluZCgnaW1nJykuYXR0cignc3JjJywgJy4vaW1hZ2VzL2knK3RoaXMubmFtZSsnLnBuZycpO1xuICAgICAgICAgIHRoaXMuaXNJbkludmVudG9yeSA9IHRydWU7XG4gICAgICAgICAgJGludmVudG9yeVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuICAgICAgICAgIHRoaXMuaW52ZW50b3J5LmFkZFN1YmplY3QodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3RpdmF0ZShpbmRleCkge1xuICAgICAgbGV0ICRlbGVtZW50cyA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgIGxldCAkZWxlbWVudHNJbkludmVudG9yeSA9IHRoaXMuaW52ZW50b3J5LnN1YmplY3RzSW5zaWRlO1xuICAgICAgbGV0IGVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGggPSAkZWxlbWVudHNJbkludmVudG9yeS5sZW5ndGg7XG5cbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUgPT0gZmFsc2UpIHtcblxuICAgICAgICBmb3IobGV0IGk9MDsgaTxlbGVtZW50c0luSW52ZW50b3J5TGVuZ3RoOyBpKyspe1xuICAgICAgICAgICQoJGVsZW1lbnRzW2ldKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgICAkZWxlbWVudHNJbkludmVudG9yeVtpXS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCRlbGVtZW50c0luSW52ZW50b3J5W2ldLmlzQWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkuYWRkQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBhY3RpdmVcIik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBub3QgYWN0aXZlXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0IGF1ZGlvSXRlbSA9IG5ldyBBdWRpbygnc291bmRzL2l0ZW0ud2F2Jyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkKCcuJyArIHRoaXMubmFtZSkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLmFkZFRvSW52ZW50b3J5KCk7XG4gICAgICAgIGF1ZGlvSXRlbS5wbGF5KCk7XG4gICAgICB9KVxuICAgIH1cblxuICB9XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DdWJieVxuXG4gIGNsYXNzIFBvd2VyQm94IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuaXNTb2x2ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICB0aGlzLmlzU29sdmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCBhdWRpb1Bvd2VyID0gbmV3IEF1ZGlvKCdzb3VuZHMvcG93ZXIud2F2Jyk7XG4gICAgICBsZXQgJHBvd2VyQm94ID0gJCgnLnBvd2VyQm94Jyk7XG4gICAgICBsZXQgbnVtYmVyPVswLDAsMCwwXTtcbiAgICAgIGxldCBjb2xvcj1bJyM2ZWJhMWEnLCcjZmYwMDAwJywnIzFlMjBkOScsJyNlNjNiZmInLCcjZmZlODFkJywnIzcwM2YyMScsJyNmZjdmMTcnLCcjZmZmZmZmJywnIzAwMDAwMCddO1xuICAgICAgJHBvd2VyQm94LmVhY2goZnVuY3Rpb24oaW5kZXgsZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIG51bWJlcltpbmRleF0rKztcbiAgICAgICAgICBpZihudW1iZXJbaW5kZXhdID09IDEwKXtcbiAgICAgICAgICAgIG51bWJlcltpbmRleF09MTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtY29sb3InLGNvbG9yW251bWJlcltpbmRleF0gLSAxXSk7XG4gICAgICAgICAgaWYobnVtYmVyWzBdPT02ICYmIG51bWJlclsxXT09OCAmJiBudW1iZXJbMl09PTcgJiYgbnVtYmVyWzNdPT00KXtcbiAgICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIlNvbWV0aGluZyBjcmFja2xlZFwiKTtcbiAgICAgICAgICAgIGF1ZGlvUG93ZXIucGxheSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NvbHZlZCEnKTtcbiAgICAgICAgICAgICRwb3dlckJveC5vZmYoKTtcbiAgICAgICAgICAgIHNlbGYuYWN0aXZhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgU2FmZSB7XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBhdWRpb0JlZXAgPSBuZXcgQXVkaW8oJ3NvdW5kcy9iZWVwLndhdicpO1xuICAgICAgbGV0IGF1ZGlvV3JvbmcgPSBuZXcgQXVkaW8oJ3NvdW5kcy93cm9uZy53YXYnKTtcbiAgICAgIGxldCAkYnV0dG9uID0gJCgnLmJ1dHRvbicpO1xuICAgICAgbGV0ICRidXR0b25TdWIgPSAkKCcuYnV0dG9uU3ViJyk7XG4gICAgICBsZXQgJGJ1dHRvbkRlbCA9ICQoJy5idXR0b25EZWwnKTtcbiAgICAgIGxldCAkYnV0dG9uQmFyID0gJCgnLmJ1dHRvbkJhcicpO1xuICAgICAgbGV0IHBpbiA9IFwiXCI7XG5cbiAgICAgICRidXR0b24uZWFjaChmdW5jdGlvbihpbmRleCxlbGVtZW50KXtcbiAgICAgICAgJChlbGVtZW50KS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgaWYocGluLmxlbmd0aCA8MTApe1xuICAgICAgICAgICAgcGluICs9IGVsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGluKTtcbiAgICAgICAgICAgICRidXR0b25CYXIudGV4dChwaW4pO1xuICAgICAgICAgICAgYXVkaW9CZWVwLnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgICRidXR0b25EZWwub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBwaW4gPSBcIlwiO1xuICAgICAgICAkYnV0dG9uQmFyLnRleHQocGluKTtcbiAgICAgICAgYXVkaW9CZWVwLnBsYXkoKTtcbiAgICAgIH0pO1xuXG4gICAgICAkYnV0dG9uU3ViLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYocGluID09PSBcIjE2MjYzNjQ2NTZcIil7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3NvbHZlZCEnKTtcbiAgICAgICAgICBsZXQgJGRvb3JTYWZlID0gJCgnLmRvb3JTYWZlJyk7XG4gICAgICAgICAgJGRvb3JTYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIGxldCBhdWRpb1NhZmUgPSBuZXcgQXVkaW8oJ3NvdW5kcy9zYWZlLndhdicpO1xuICAgICAgICAgIGF1ZGlvU2FmZS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiV3JvbmcgcGFzc3dvcmRcIik7XG4gICAgICAgICAgYXVkaW9Xcm9uZy5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIExldmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3dlckJveCl7XG4gICAgICB0aGlzLnBvd2VyQm94ID0gcG93ZXJCb3g7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgJGxldmVyID0gJCgnLmxldmVyJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkbGV2ZXIub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnBvd2VyQm94LmlzU29sdmVkKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbicpO1xuICAgICAgICAgIGxldCAkZG9vckhpZGRlblNhZmUgPSAkKCcuZG9vckhpZGRlblNhZmUnKTtcbiAgICAgICAgICAkZG9vckhpZGRlblNhZmUuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvU2FmZSA9IG5ldyBBdWRpbygnc291bmRzL3NhZmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW9TYWZlLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJObyBwb3dlclwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy90aWNrLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgUHJlc3N1cmUge1xuICAgIGNvbnN0cnVjdG9yKHN1YmplY3Qpe1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgd2F0Y2goKXtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCAkcGlwZSA9ICQoJy5waXBlJyk7XG4gICAgICAkcGlwZS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgbGV0ICRwcmVzc3VyZSA9ICQoJy5wcmVzc3VyZScpO1xuICAgICAgICAgICRwcmVzc3VyZS5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBzZWxmLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJlc3N1cmUnICsgc2VsZi5pc0FjdGl2ZSk7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvcHJlc3N1cmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSSBjYW4ndCB0dXJuIGl0XCIpO1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIkkgY2FuJ3QgdHVybiBpdFwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ncm9hbi5tcDMnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIE1haW5QaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihwcmVzc3VyZSl7XG4gICAgICB0aGlzLnByZXNzdXJlID0gcHJlc3N1cmU7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJG1haW5waXBlID0gJCgnLm1haW5waXBlJyk7XG4gICAgICAkbWFpbnBpcGUub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wcmVzc3VyZS5pc0FjdGl2ZSl7XG4gICAgICAgICAgbGV0ICRvcGVuRXhpdCA9ICQoJy5vcGVuRXhpdCcpO1xuICAgICAgICAgICRvcGVuRXhpdC5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBnYW1lLnNob3dOZXdTY2VuZSgnaDQnKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9tYWluZG9vci53YXYnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIlRoZXJlIGlzIG5vIHByZXNzdXJlXCIpO1xuICAgICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL25vcHJlc3N1cmUud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBPcGVuUG93ZXIge1xuICAgIGNvbnN0cnVjdG9yKHN1YmplY3Qpe1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICB9XG4gICAgd2F0Y2goKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJGRvb3JQb3dlciA9ICQoJy5kb29yUG93ZXInKTtcbiAgICAgIGxldCAkaDN0b2gzYSA9ICQoJy5oM3RvaDNhJyk7XG4gICAgICBsZXQgJG9wZW5Qb3dlciA9ICQoJy5vcGVuUG93ZXInKTtcbiAgICAgIGxldCBhdWRpb0Nyb3diYXIgPSBuZXcgQXVkaW8oJ3NvdW5kcy9jcm93YmFyLndhdicpO1xuICAgICAgJGRvb3JQb3dlci5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgJGgzdG9oM2EuYWRkQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgICAgICRvcGVuUG93ZXIucmVtb3ZlQ2xhc3MoJ25vU2hvdycpXG4gICAgICAgICAgZ2FtZS5zaG93TmV3U2NlbmUoJ2gzJyk7XG4gICAgICAgICAgYXVkaW9Dcm93YmFyLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJJIGNhbid0IG1vdmUgaXRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIENhcmRib2FyZCB7XG4gICAgY29uc3RydWN0b3Ioc3ViamVjdCl7XG4gICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgIH1cbiAgICB3YXRjaCgpIHtcbiAgICAgIGxldCAkY2FyZGJvYXJkQXJlYSA9ICQoJy5jYXJkYm9hcmRBcmVhJyk7XG4gICAgICBsZXQgJG9wZW5Cb3ggPSAkKCcub3BlbkJveCcpO1xuICAgICAgbGV0IGF1ZGlvQm94ID0gbmV3IEF1ZGlvKCdzb3VuZHMvYm94LndhdicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGNhcmRib2FyZEFyZWEub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5zdWJqZWN0LmlzQWN0aXZlKXtcbiAgICAgICAgICAkb3BlbkJveC5yZW1vdmVDbGFzcygnbm9TaG93Jyk7XG4gICAgICAgICAgYXVkaW9Cb3gucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIlRoaXMgdGFwZSBpcyB0b28gc3Ryb25nXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURvb3JzXG5cbiAgY2xhc3MgRG9vciB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgc3ViamVjdCwgZG9vcikge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICB0aGlzLmRvb3IgPSBkb29yO1xuICAgIH1cbiAgICB3YXRjaCgpIHtcbiAgICAgIGxldCAkYXJlYSA9ICQoJy4nICsgdGhpcy5uYW1lKTtcbiAgICAgIGxldCAkZG9vciA9ICQoJy4nICsgdGhpcy5kb29yKTtcbiAgICAgIGxldCBhdWRpb0Nsb3NlID0gbmV3IEF1ZGlvKCdzb3VuZHMvY2xvc2Uud2F2Jyk7XG4gICAgICBsZXQgYXVkaW9PcGVuRG9vciA9IG5ldyBBdWRpbygnc291bmRzL29wZW5kb29yLndhdicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGFyZWEub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5zdWJqZWN0LmlzQWN0aXZlKXtcbiAgICAgICAgICAkZG9vci5yZW1vdmVDbGFzcygnbm9TaG93Jyk7XG4gICAgICAgICAgYXVkaW9PcGVuRG9vci5wbGF5KCk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRleHQpO1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIkxvY2tlZFwiKTtcbiAgICAgICAgICBhdWRpb0Nsb3NlLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdhbWVcblxuICBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuc2NlbmUgPSBcImgxXCI7XG4gICAgfVxuICAgIHN0YXJ0TmV3R2FtZSgpIHtcbiAgICAgIC8vbG9hZGluZyBpbnZlbnRveVxuICAgICAgbGV0IGludmVudG9yeSA9IG5ldyBJbnZlbnRvcnkoKTtcblxuICAgICAgLy9sb2FkaW5nIHN1YmplY3RzXG4gICAgICBsZXQga2V5MSA9IG5ldyBTdWJqZWN0KCdrZXkxJywgaW52ZW50b3J5KTtcbiAgICAgIGtleTEud2F0Y2goKTtcbiAgICAgIGxldCBrZXkyID0gbmV3IFN1YmplY3QoJ2tleTInLCBpbnZlbnRvcnkpO1xuICAgICAga2V5Mi53YXRjaCgpO1xuICAgICAgbGV0IGtleTMgPSBuZXcgU3ViamVjdCgna2V5MycsIGludmVudG9yeSk7XG4gICAgICBrZXkzLndhdGNoKCk7XG4gICAgICBsZXQga2V5NCA9IG5ldyBTdWJqZWN0KCdrZXk0JywgaW52ZW50b3J5KTtcbiAgICAgIGtleTQud2F0Y2goKTtcbiAgICAgIGxldCBrZXk1ID0gbmV3IFN1YmplY3QoJ2tleTUnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5NS53YXRjaCgpO1xuICAgICAgbGV0IGNyb3diYXIgPSBuZXcgU3ViamVjdCgnY3Jvd2JhcicsIGludmVudG9yeSk7XG4gICAgICBjcm93YmFyLndhdGNoKCk7XG4gICAgICBsZXQgc3RhbmxleSA9IG5ldyBTdWJqZWN0KCdzdGFubGV5JywgaW52ZW50b3J5KTtcbiAgICAgIHN0YW5sZXkud2F0Y2goKTtcbiAgICAgIGxldCBoeWRyYXVsaWMgPSBuZXcgU3ViamVjdCgnaHlkcmF1bGljJywgaW52ZW50b3J5KTtcbiAgICAgIGh5ZHJhdWxpYy53YXRjaCgpO1xuXG4gICAgICAvL2xvYWRpbmcgamlnc2F3c1xuICAgICAgbGV0IHNhZmUgPSBuZXcgU2FmZSgpO1xuICAgICAgc2FmZS53YXRjaCgpO1xuICAgICAgbGV0IG9wZW5Qb3dlciA9IG5ldyBPcGVuUG93ZXIoY3Jvd2Jhcik7XG4gICAgICBvcGVuUG93ZXIud2F0Y2goKTtcbiAgICAgIGxldCBwb3dlckJveCA9IG5ldyBQb3dlckJveCgpO1xuICAgICAgcG93ZXJCb3gud2F0Y2goKTtcbiAgICAgIGxldCBsZXZlciA9IG5ldyBMZXZlcihwb3dlckJveCk7XG4gICAgICBsZXZlci53YXRjaCgpO1xuICAgICAgbGV0IHByZXNzdXJlID0gbmV3IFByZXNzdXJlKGh5ZHJhdWxpYyk7XG4gICAgICBwcmVzc3VyZS53YXRjaCgpO1xuICAgICAgbGV0IG1haW5waXBlID0gbmV3IE1haW5QaXBlKHByZXNzdXJlKTtcbiAgICAgIG1haW5waXBlLndhdGNoKCk7XG4gICAgICBsZXQgY2FyZGJvYXJkID0gbmV3IENhcmRib2FyZChzdGFubGV5KTtcbiAgICAgIGNhcmRib2FyZC53YXRjaCgpO1xuXG4gICAgICAvL2xvYWRpbmcgZG9vcnNcbiAgICAgIGxldCBsb2NrMSA9IG5ldyBEb29yKCdsb2NrMScsIGtleTEsICdkb29yMScpO1xuICAgICAgbG9jazEud2F0Y2goKTtcbiAgICAgIGxldCBsb2NrMiA9IG5ldyBEb29yKCdsb2NrMicsIGtleTIsICdkb29yMicpO1xuICAgICAgbG9jazIud2F0Y2goKTtcbiAgICAgIGxldCBsb2NrMyA9IG5ldyBEb29yKCdsb2NrMycsIGtleTMsICdkb29yMycpO1xuICAgICAgbG9jazMud2F0Y2goKTtcbiAgICAgIGxldCBsb2NrNCA9IG5ldyBEb29yKCdsb2NrNCcsIGtleTQsICdkb29yNCcpO1xuICAgICAgbG9jazQud2F0Y2goKTtcbiAgICAgIGxldCBsb2NrNSA9IG5ldyBEb29yKCdsb2NrNScsIGtleTUsICdkb29yNScpO1xuICAgICAgbG9jazUud2F0Y2goKTtcblxuICAgICAgLy9sb2FkaW5nIHNjZW5lc1xuICAgICAgdGhpcy5zaG93TmV3U2NlbmUodGhpcy5zY2VuZSk7XG4gICAgICB0aGlzLndhdGNoTW92ZXMoKTtcbiAgICB9XG5cbiAgICBzaG93TmV3U2NlbmUobmV3U2NlbmUpIHtcbiAgICAgICQoJy4nKyB0aGlzLnNjZW5lKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xuICAgICAgJCgnLicrIG5ld1NjZW5lKS5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgIHRoaXMuc2NlbmUgPSBuZXdTY2VuZTtcbiAgICB9XG5cbiAgICBzaG93RGlhbG9ndWVzKHRleHQpe1xuICAgICAgbGV0ICRkaWFsb2d1ZXMgPSAkKCcjZGlhbG9ndWVzJyk7XG4gICAgICAkZGlhbG9ndWVzLmh0bWwoIFwiPHA+XCIrdGV4dCtcIjwvcD5cIiApO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkZGlhbG9ndWVzLmh0bWwoXCJcIik7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICB3YXRjaE1vdmVzKCkge1xuICAgICAgbGV0ICRtb3ZlcyA9ICQoJy5tb3ZlJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkbW92ZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIHNlbGYuc2hvd05ld1NjZW5lKHRoaXMuZGF0YXNldC5nb3RvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTWFpblxuICBsZXQgJHN0YXJ0ID0gJCgnI3N0YXJ0Jyk7XG4gIGxldCAkYnV0dG9uID0gJHN0YXJ0LmZpbmQoJ2J1dHRvbicpO1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG5cbiAgZ2FtZS5zdGFydE5ld0dhbWUoKTtcblxuICAkYnV0dG9uLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAkc3RhcnQuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgfSk7XG5cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==