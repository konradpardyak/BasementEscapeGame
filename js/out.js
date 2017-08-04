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

  $start.css("display", "block");
  game.startNewGame();

  $button.on('click', function () {
    $start.css("display", "none");
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDA2MmQ1ZWUxMWFiZWYwMmFiMjEiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCIkZWxlbWVudHNJbkludmVudG9yeSIsImVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGgiLCJyZW1vdmVDbGFzcyIsImF1ZGlvSXRlbSIsIkF1ZGlvIiwiYWRkVG9JbnZlbnRvcnkiLCJwbGF5IiwiUG93ZXJCb3giLCJpc1NvbHZlZCIsImF1ZGlvUG93ZXIiLCIkcG93ZXJCb3giLCJudW1iZXIiLCJjb2xvciIsImNzcyIsImdhbWUiLCJzaG93RGlhbG9ndWVzIiwiU2FmZSIsImF1ZGlvQmVlcCIsImF1ZGlvV3JvbmciLCIkYnV0dG9uIiwiJGJ1dHRvblN1YiIsIiRidXR0b25EZWwiLCIkYnV0dG9uQmFyIiwicGluIiwiaW5uZXJUZXh0IiwidGV4dCIsIiRkb29yU2FmZSIsImF1ZGlvU2FmZSIsIkxldmVyIiwicG93ZXJCb3giLCIkbGV2ZXIiLCIkZG9vckhpZGRlblNhZmUiLCJhdWRpbyIsIlByZXNzdXJlIiwiJHBpcGUiLCIkcHJlc3N1cmUiLCJNYWluUGlwZSIsInByZXNzdXJlIiwiJG1haW5waXBlIiwiJG9wZW5FeGl0Iiwic2hvd05ld1NjZW5lIiwiT3BlblBvd2VyIiwiJGRvb3JQb3dlciIsIiRoM3RvaDNhIiwiJG9wZW5Qb3dlciIsImF1ZGlvQ3Jvd2JhciIsIkNhcmRib2FyZCIsIiRjYXJkYm9hcmRBcmVhIiwiJG9wZW5Cb3giLCJhdWRpb0JveCIsIkRvb3IiLCJkb29yIiwiJGFyZWEiLCIkZG9vciIsImF1ZGlvQ2xvc2UiLCJhdWRpb09wZW5Eb29yIiwiR2FtZSIsInNjZW5lIiwia2V5MSIsImtleTIiLCJrZXkzIiwia2V5NCIsImtleTUiLCJjcm93YmFyIiwic3RhbmxleSIsImh5ZHJhdWxpYyIsInNhZmUiLCJvcGVuUG93ZXIiLCJsZXZlciIsIm1haW5waXBlIiwiY2FyZGJvYXJkIiwibG9jazEiLCJsb2NrMiIsImxvY2szIiwibG9jazQiLCJsb2NrNSIsIndhdGNoTW92ZXMiLCJuZXdTY2VuZSIsIiRkaWFsb2d1ZXMiLCJodG1sIiwic2V0VGltZW91dCIsIiRtb3ZlcyIsImRhdGFzZXQiLCJnb3RvIiwiJHN0YXJ0Iiwic3RhcnROZXdHYW1lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDOUJGLElBQUUsVUFBRixFQUFjRyxRQUFkLENBQXVCLFFB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QUNBLGFBQUs0QyxLQUFMLEdBQWFvQixRQUFiO0FBQ0Q7QUFwWDJCO0FBQUE7QUFBQSxvQ0FzWGRwRCxJQXRYYyxFQXNYVDtBQUNqQixZQUFJcUQsYUFBYWpILEVBQUUsWUFBRixDQUFqQjtBQUNBaUgsbUJBQVdDLElBQVgsQ0FBaUIsUUFBTXRELElBQU4sR0FBVyxNQUE1QjtBQUNBdUQsbUJBQVcsWUFBVTtBQUNuQkYscUJBQVdDLElBQVgsQ0FBZ0IsRUFBaEI7QUFDRCxTQUZELEVBRUcsSUFGSDtBQUdEO0FBNVgyQjtBQUFBO0FBQUEsbUNBOFhmO0FBQ1gsWUFBSUUsU0FBU3BILEVBQUUsT0FBRixDQUFiO0FBQ0EsWUFBSWEsT0FBTyxJQUFYO0FBQ0F1RyxlQUFPdEcsSUFBUCxDQUFZLFVBQVNDLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXdCO0FBQ2xDaEIsWUFBRWdCLE9BQUYsRUFBV2QsRUFBWCxDQUFjLE9BQWQsRUFBc0IsWUFBVTtBQUM5QlcsaUJBQUs4RCxZQUFMLENBQWtCLEtBQUswQyxPQUFMLENBQWFDLElBQS9CO0FBQ0QsV0FGRDtBQUdELFNBSkQ7QUFLRDtBQXRZMkI7O0FBQUE7QUFBQTs7QUF5WWhDOzs7QUFDRSxNQUFJQyxTQUFTdkgsRUFBRSxRQUFGLENBQWI7QUFDQSxNQUFJc0QsVUFBVWlFLE9BQU8zRyxJQUFQLENBQVksUUFBWixDQUFkO0FBQ0EsTUFBSXFDLE9BQU8sSUFBSTBDLElBQUosRUFBWDs7QUFFQTRCLFNBQU92RSxHQUFQLENBQVcsU0FBWCxFQUFzQixPQUF0QjtBQUNBQyxPQUFLdUUsWUFBTDs7QUFFQWxFLFVBQVFwRCxFQUFSLENBQVcsT0FBWCxFQUFtQixZQUFVO0FBQzNCcUgsV0FBT3ZFLEdBQVAsQ0FBVyxTQUFYLEVBQXFCLE1BQXJCO0FBQ0QsR0FGRDtBQUlELENBclpELEUiLCJmaWxlIjoiLi9qcy9vdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkMDYyZDVlZTExYWJlZjAyYWIyMSIsIiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAkKCcjbG9hZGluZycpLmFkZENsYXNzKCdub1Nob3cnKTtcbiAgY29uc29sZS5sb2coJ0NvbnRlbnQgbG9hZGVkJyk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbnZlbnRvcnlcbiAgY2xhc3MgSW52ZW50b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuc3ViamVjdHNJbnNpZGUgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRTdWJqZWN0KHN1YmplY3QpIHtcbiAgICAgIHRoaXMuc3ViamVjdHNJbnNpZGUucHVzaChzdWJqZWN0KTtcbiAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG5cbiAgICB3YXRjaCgpIHtcbiAgICAgICAgbGV0ICRlbGVtZW50cyA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCl7XG4gICAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5vZmYoKTtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuc3ViamVjdHNJbnNpZGVbaW5kZXhdLmFjdGl2YXRlKGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TdWJqZWN0XG5cbiAgY2xhc3MgU3ViamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgaW52ZW50b3J5KSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBpbnZlbnRvcnk7XG4gICAgICB0aGlzLmlzSW5JbnZlbnRvcnkgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFzQmVlblVzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2xhc3MgPSAnLicgKyB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgYWRkVG9JbnZlbnRvcnkoKSB7XG4gICAgICBsZXQgJHN1YmplY3QgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICBsZXQgJGludmVudG9yeSA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgICRzdWJqZWN0LmFkZENsYXNzKCdub1Nob3cnKTtcblxuICAgICAgZm9yKGxldCBpPTA7IGk8JGludmVudG9yeS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKCQoJGludmVudG9yeVtpXSkuaGFzQ2xhc3MoJ2VtcHR5JykgJiYgISh0aGlzLmlzSW5JbnZlbnRvcnkpKXtcbiAgICAgICAgICAkKCRpbnZlbnRvcnlbaV0pLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsICcuL2ltYWdlcy9pJyt0aGlzLm5hbWUrJy5wbmcnKTtcbiAgICAgICAgICB0aGlzLmlzSW5JbnZlbnRvcnkgPSB0cnVlO1xuICAgICAgICAgICRpbnZlbnRvcnlbaV0uY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcbiAgICAgICAgICB0aGlzLmludmVudG9yeS5hZGRTdWJqZWN0KHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoaW5kZXgpIHtcbiAgICAgIGxldCAkZWxlbWVudHMgPSAkKCcjaW52ZW50b3J5JykuZmluZCgnZGl2Jyk7XG4gICAgICBsZXQgJGVsZW1lbnRzSW5JbnZlbnRvcnkgPSB0aGlzLmludmVudG9yeS5zdWJqZWN0c0luc2lkZTtcbiAgICAgIGxldCBlbGVtZW50c0luSW52ZW50b3J5TGVuZ3RoID0gJGVsZW1lbnRzSW5JbnZlbnRvcnkubGVuZ3RoO1xuXG4gICAgICBpZih0aGlzLmlzQWN0aXZlID09IGZhbHNlKSB7XG5cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8ZWxlbWVudHNJbkludmVudG9yeUxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAkKCRlbGVtZW50c1tpXSkucmVtb3ZlQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgICAgJGVsZW1lbnRzSW5JbnZlbnRvcnlbaV0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygkZWxlbWVudHNJbkludmVudG9yeVtpXS5pc0FjdGl2ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCRlbGVtZW50c1tpbmRleF0pLmFkZENsYXNzKCdpc0FjdGl2ZScpO1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgaXMgYWN0aXZlXCIpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkucmVtb3ZlQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgaXMgbm90IGFjdGl2ZVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3YXRjaCgpIHtcbiAgICAgIGxldCBhdWRpb0l0ZW0gPSBuZXcgQXVkaW8oJ3NvdW5kcy9pdGVtLndhdicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJCgnLicgKyB0aGlzLm5hbWUpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5hZGRUb0ludmVudG9yeSgpO1xuICAgICAgICBhdWRpb0l0ZW0ucGxheSgpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3ViYnlcblxuICBjbGFzcyBQb3dlckJveCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLmlzU29sdmVkID0gZmFsc2U7XG4gICAgfVxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgdGhpcy5pc1NvbHZlZCA9IHRydWU7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgYXVkaW9Qb3dlciA9IG5ldyBBdWRpbygnc291bmRzL3Bvd2VyLndhdicpO1xuICAgICAgbGV0ICRwb3dlckJveCA9ICQoJy5wb3dlckJveCcpO1xuICAgICAgbGV0IG51bWJlcj1bMCwwLDAsMF07XG4gICAgICBsZXQgY29sb3I9WycjNmViYTFhJywnI2ZmMDAwMCcsJyMxZTIwZDknLCcjZTYzYmZiJywnI2ZmZTgxZCcsJyM3MDNmMjEnLCcjZmY3ZjE3JywnI2ZmZmZmZicsJyMwMDAwMDAnXTtcbiAgICAgICRwb3dlckJveC5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBudW1iZXJbaW5kZXhdKys7XG4gICAgICAgICAgaWYobnVtYmVyW2luZGV4XSA9PSAxMCl7XG4gICAgICAgICAgICBudW1iZXJbaW5kZXhdPTE7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyxjb2xvcltudW1iZXJbaW5kZXhdIC0gMV0pO1xuICAgICAgICAgIGlmKG51bWJlclswXT09NiAmJiBudW1iZXJbMV09PTggJiYgbnVtYmVyWzJdPT03ICYmIG51bWJlclszXT09NCl7XG4gICAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJTb21ldGhpbmcgY3JhY2tsZWRcIik7XG4gICAgICAgICAgICBhdWRpb1Bvd2VyLnBsYXkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2x2ZWQhJyk7XG4gICAgICAgICAgICAkcG93ZXJCb3gub2ZmKCk7XG4gICAgICAgICAgICBzZWxmLmFjdGl2YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFNhZmUge1xuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgYXVkaW9CZWVwID0gbmV3IEF1ZGlvKCdzb3VuZHMvYmVlcC53YXYnKTtcbiAgICAgIGxldCBhdWRpb1dyb25nID0gbmV3IEF1ZGlvKCdzb3VuZHMvd3Jvbmcud2F2Jyk7XG4gICAgICBsZXQgJGJ1dHRvbiA9ICQoJy5idXR0b24nKTtcbiAgICAgIGxldCAkYnV0dG9uU3ViID0gJCgnLmJ1dHRvblN1YicpO1xuICAgICAgbGV0ICRidXR0b25EZWwgPSAkKCcuYnV0dG9uRGVsJyk7XG4gICAgICBsZXQgJGJ1dHRvbkJhciA9ICQoJy5idXR0b25CYXInKTtcbiAgICAgIGxldCBwaW4gPSBcIlwiO1xuXG4gICAgICAkYnV0dG9uLmVhY2goZnVuY3Rpb24oaW5kZXgsZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIGlmKHBpbi5sZW5ndGggPDEwKXtcbiAgICAgICAgICAgIHBpbiArPSBlbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBpbik7XG4gICAgICAgICAgICAkYnV0dG9uQmFyLnRleHQocGluKTtcbiAgICAgICAgICAgIGF1ZGlvQmVlcC5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAkYnV0dG9uRGVsLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgcGluID0gXCJcIjtcbiAgICAgICAgJGJ1dHRvbkJhci50ZXh0KHBpbik7XG4gICAgICAgIGF1ZGlvQmVlcC5wbGF5KCk7XG4gICAgICB9KTtcblxuICAgICAgJGJ1dHRvblN1Yi5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHBpbiA9PT0gXCIxNjI2MzY0NjU2XCIpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2x2ZWQhJyk7XG4gICAgICAgICAgbGV0ICRkb29yU2FmZSA9ICQoJy5kb29yU2FmZScpO1xuICAgICAgICAgICRkb29yU2FmZS5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgICBsZXQgYXVkaW9TYWZlID0gbmV3IEF1ZGlvKCdzb3VuZHMvc2FmZS53YXYnKTtcbiAgICAgICAgICBhdWRpb1NhZmUucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUuc2hvd0RpYWxvZ3VlcyhcIldyb25nIHBhc3N3b3JkXCIpO1xuICAgICAgICAgIGF1ZGlvV3JvbmcucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBMZXZlciB7XG4gICAgY29uc3RydWN0b3IocG93ZXJCb3gpe1xuICAgICAgdGhpcy5wb3dlckJveCA9IHBvd2VyQm94O1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0ICRsZXZlciA9ICQoJy5sZXZlcicpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJGxldmVyLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi5wb3dlckJveC5pc1NvbHZlZCl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wZW4nKTtcbiAgICAgICAgICBsZXQgJGRvb3JIaWRkZW5TYWZlID0gJCgnLmRvb3JIaWRkZW5TYWZlJyk7XG4gICAgICAgICAgJGRvb3JIaWRkZW5TYWZlLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICAgIGxldCBhdWRpb1NhZmUgPSBuZXcgQXVkaW8oJ3NvdW5kcy9zYWZlLndhdicpO1xuICAgICAgICAgIGF1ZGlvU2FmZS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiTm8gcG93ZXJcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvdGljay53YXYnKTtcbiAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFByZXNzdXJlIHtcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0KXtcbiAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIHdhdGNoKCl7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgJHBpcGUgPSAkKCcucGlwZScpO1xuICAgICAgJHBpcGUub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnN1YmplY3QuaXNBY3RpdmUpe1xuICAgICAgICAgIGxldCAkcHJlc3N1cmUgPSAkKCcucHJlc3N1cmUnKTtcbiAgICAgICAgICAkcHJlc3N1cmUuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgc2VsZi5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzdXJlJyArIHNlbGYuaXNBY3RpdmUpO1xuICAgICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3ByZXNzdXJlLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgY2FuJ3QgdHVybiBpdFwiKTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJJIGNhbid0IHR1cm4gaXRcIik7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvZ3JvYW4ubXAzJyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBNYWluUGlwZSB7XG4gICAgY29uc3RydWN0b3IocHJlc3N1cmUpe1xuICAgICAgdGhpcy5wcmVzc3VyZSA9IHByZXNzdXJlO1xuICAgIH1cbiAgICB3YXRjaCgpe1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0ICRtYWlucGlwZSA9ICQoJy5tYWlucGlwZScpO1xuICAgICAgJG1haW5waXBlLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYucHJlc3N1cmUuaXNBY3RpdmUpe1xuICAgICAgICAgIGxldCAkb3BlbkV4aXQgPSAkKCcub3BlbkV4aXQnKTtcbiAgICAgICAgICAkb3BlbkV4aXQuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgICAgZ2FtZS5zaG93TmV3U2NlbmUoJ2g0Jyk7XG4gICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvbWFpbmRvb3Iud2F2Jyk7XG4gICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJUaGVyZSBpcyBubyBwcmVzc3VyZVwiKTtcbiAgICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ub3ByZXNzdXJlLndhdicpO1xuICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgT3BlblBvd2VyIHtcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0KXtcbiAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgfVxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0ICRkb29yUG93ZXIgPSAkKCcuZG9vclBvd2VyJyk7XG4gICAgICBsZXQgJGgzdG9oM2EgPSAkKCcuaDN0b2gzYScpO1xuICAgICAgbGV0ICRvcGVuUG93ZXIgPSAkKCcub3BlblBvd2VyJyk7XG4gICAgICBsZXQgYXVkaW9Dcm93YmFyID0gbmV3IEF1ZGlvKCdzb3VuZHMvY3Jvd2Jhci53YXYnKTtcbiAgICAgICRkb29yUG93ZXIub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLnN1YmplY3QuaXNBY3RpdmUpe1xuICAgICAgICAgICRoM3RvaDNhLmFkZENsYXNzKCdub1Nob3cnKTtcbiAgICAgICAgICAkb3BlblBvd2VyLnJlbW92ZUNsYXNzKCdub1Nob3cnKVxuICAgICAgICAgIGdhbWUuc2hvd05ld1NjZW5lKCdoMycpO1xuICAgICAgICAgIGF1ZGlvQ3Jvd2Jhci5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZS5zaG93RGlhbG9ndWVzKFwiSSBjYW4ndCBtb3ZlIGl0XCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBDYXJkYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHN1YmplY3Qpe1xuICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICB9XG4gICAgd2F0Y2goKSB7XG4gICAgICBsZXQgJGNhcmRib2FyZEFyZWEgPSAkKCcuY2FyZGJvYXJkQXJlYScpO1xuICAgICAgbGV0ICRvcGVuQm94ID0gJCgnLm9wZW5Cb3gnKTtcbiAgICAgIGxldCBhdWRpb0JveCA9IG5ldyBBdWRpbygnc291bmRzL2JveC53YXYnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICRjYXJkYm9hcmRBcmVhLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgJG9wZW5Cb3gucmVtb3ZlQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgICAgIGF1ZGlvQm94LnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJUaGlzIHRhcGUgaXMgdG9vIHN0cm9uZ1wiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Eb29yc1xuXG4gIGNsYXNzIERvb3Ige1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHN1YmplY3QsIGRvb3IpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgdGhpcy5kb29yID0gZG9vcjtcbiAgICB9XG4gICAgd2F0Y2goKSB7XG4gICAgICBsZXQgJGFyZWEgPSAkKCcuJyArIHRoaXMubmFtZSk7XG4gICAgICBsZXQgJGRvb3IgPSAkKCcuJyArIHRoaXMuZG9vcik7XG4gICAgICBsZXQgYXVkaW9DbG9zZSA9IG5ldyBBdWRpbygnc291bmRzL2Nsb3NlLndhdicpO1xuICAgICAgbGV0IGF1ZGlvT3BlbkRvb3IgPSBuZXcgQXVkaW8oJ3NvdW5kcy9vcGVuZG9vci53YXYnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICRhcmVhLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuc3ViamVjdC5pc0FjdGl2ZSl7XG4gICAgICAgICAgJGRvb3IucmVtb3ZlQ2xhc3MoJ25vU2hvdycpO1xuICAgICAgICAgIGF1ZGlvT3BlbkRvb3IucGxheSgpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi50ZXh0KTtcbiAgICAgICAgICBnYW1lLnNob3dEaWFsb2d1ZXMoXCJMb2NrZWRcIik7XG4gICAgICAgICAgYXVkaW9DbG9zZS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1HYW1lXG5cbiAgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLnNjZW5lID0gXCJoMVwiO1xuICAgIH1cbiAgICBzdGFydE5ld0dhbWUoKSB7XG4gICAgICAvL2xvYWRpbmcgaW52ZW50b3lcbiAgICAgIGxldCBpbnZlbnRvcnkgPSBuZXcgSW52ZW50b3J5KCk7XG5cbiAgICAgIC8vbG9hZGluZyBzdWJqZWN0c1xuICAgICAgbGV0IGtleTEgPSBuZXcgU3ViamVjdCgna2V5MScsIGludmVudG9yeSk7XG4gICAgICBrZXkxLndhdGNoKCk7XG4gICAgICBsZXQga2V5MiA9IG5ldyBTdWJqZWN0KCdrZXkyJywgaW52ZW50b3J5KTtcbiAgICAgIGtleTIud2F0Y2goKTtcbiAgICAgIGxldCBrZXkzID0gbmV3IFN1YmplY3QoJ2tleTMnLCBpbnZlbnRvcnkpO1xuICAgICAga2V5My53YXRjaCgpO1xuICAgICAgbGV0IGtleTQgPSBuZXcgU3ViamVjdCgna2V5NCcsIGludmVudG9yeSk7XG4gICAgICBrZXk0LndhdGNoKCk7XG4gICAgICBsZXQga2V5NSA9IG5ldyBTdWJqZWN0KCdrZXk1JywgaW52ZW50b3J5KTtcbiAgICAgIGtleTUud2F0Y2goKTtcbiAgICAgIGxldCBjcm93YmFyID0gbmV3IFN1YmplY3QoJ2Nyb3diYXInLCBpbnZlbnRvcnkpO1xuICAgICAgY3Jvd2Jhci53YXRjaCgpO1xuICAgICAgbGV0IHN0YW5sZXkgPSBuZXcgU3ViamVjdCgnc3RhbmxleScsIGludmVudG9yeSk7XG4gICAgICBzdGFubGV5LndhdGNoKCk7XG4gICAgICBsZXQgaHlkcmF1bGljID0gbmV3IFN1YmplY3QoJ2h5ZHJhdWxpYycsIGludmVudG9yeSk7XG4gICAgICBoeWRyYXVsaWMud2F0Y2goKTtcblxuICAgICAgLy9sb2FkaW5nIGppZ3Nhd3NcbiAgICAgIGxldCBzYWZlID0gbmV3IFNhZmUoKTtcbiAgICAgIHNhZmUud2F0Y2goKTtcbiAgICAgIGxldCBvcGVuUG93ZXIgPSBuZXcgT3BlblBvd2VyKGNyb3diYXIpO1xuICAgICAgb3BlblBvd2VyLndhdGNoKCk7XG4gICAgICBsZXQgcG93ZXJCb3ggPSBuZXcgUG93ZXJCb3goKTtcbiAgICAgIHBvd2VyQm94LndhdGNoKCk7XG4gICAgICBsZXQgbGV2ZXIgPSBuZXcgTGV2ZXIocG93ZXJCb3gpO1xuICAgICAgbGV2ZXIud2F0Y2goKTtcbiAgICAgIGxldCBwcmVzc3VyZSA9IG5ldyBQcmVzc3VyZShoeWRyYXVsaWMpO1xuICAgICAgcHJlc3N1cmUud2F0Y2goKTtcbiAgICAgIGxldCBtYWlucGlwZSA9IG5ldyBNYWluUGlwZShwcmVzc3VyZSk7XG4gICAgICBtYWlucGlwZS53YXRjaCgpO1xuICAgICAgbGV0IGNhcmRib2FyZCA9IG5ldyBDYXJkYm9hcmQoc3RhbmxleSk7XG4gICAgICBjYXJkYm9hcmQud2F0Y2goKTtcblxuICAgICAgLy9sb2FkaW5nIGRvb3JzXG4gICAgICBsZXQgbG9jazEgPSBuZXcgRG9vcignbG9jazEnLCBrZXkxLCAnZG9vcjEnKTtcbiAgICAgIGxvY2sxLndhdGNoKCk7XG4gICAgICBsZXQgbG9jazIgPSBuZXcgRG9vcignbG9jazInLCBrZXkyLCAnZG9vcjInKTtcbiAgICAgIGxvY2syLndhdGNoKCk7XG4gICAgICBsZXQgbG9jazMgPSBuZXcgRG9vcignbG9jazMnLCBrZXkzLCAnZG9vcjMnKTtcbiAgICAgIGxvY2szLndhdGNoKCk7XG4gICAgICBsZXQgbG9jazQgPSBuZXcgRG9vcignbG9jazQnLCBrZXk0LCAnZG9vcjQnKTtcbiAgICAgIGxvY2s0LndhdGNoKCk7XG4gICAgICBsZXQgbG9jazUgPSBuZXcgRG9vcignbG9jazUnLCBrZXk1LCAnZG9vcjUnKTtcbiAgICAgIGxvY2s1LndhdGNoKCk7XG5cbiAgICAgIC8vbG9hZGluZyBzY2VuZXNcbiAgICAgIHRoaXMuc2hvd05ld1NjZW5lKHRoaXMuc2NlbmUpO1xuICAgICAgdGhpcy53YXRjaE1vdmVzKCk7XG4gICAgfVxuXG4gICAgc2hvd05ld1NjZW5lKG5ld1NjZW5lKSB7XG4gICAgICAkKCcuJysgdGhpcy5zY2VuZSkuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICQoJy4nKyBuZXdTY2VuZSkuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICB0aGlzLnNjZW5lID0gbmV3U2NlbmU7XG4gICAgfVxuXG4gICAgc2hvd0RpYWxvZ3Vlcyh0ZXh0KXtcbiAgICAgIGxldCAkZGlhbG9ndWVzID0gJCgnI2RpYWxvZ3VlcycpO1xuICAgICAgJGRpYWxvZ3Vlcy5odG1sKCBcIjxwPlwiK3RleHQrXCI8L3A+XCIgKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJGRpYWxvZ3Vlcy5odG1sKFwiXCIpO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfVxuXG4gICAgd2F0Y2hNb3ZlcygpIHtcbiAgICAgIGxldCAkbW92ZXMgPSAkKCcubW92ZScpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJG1vdmVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpe1xuICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICBzZWxmLnNob3dOZXdTY2VuZSh0aGlzLmRhdGFzZXQuZ290byk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU1haW5cbiAgbGV0ICRzdGFydCA9ICQoJyNzdGFydCcpO1xuICBsZXQgJGJ1dHRvbiA9ICRzdGFydC5maW5kKCdidXR0b24nKTtcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuXG4gICRzdGFydC5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gIGdhbWUuc3RhcnROZXdHYW1lKCk7XG5cbiAgJGJ1dHRvbi5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgJHN0YXJ0LmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XG4gIH0pO1xuXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=