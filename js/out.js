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
      key: 'removeFromInventory',
      value: function removeFromInventory() {}
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

  var Cubby = function () {
    function Cubby(name, hiddenSubject) {
      _classCallCheck(this, Cubby);

      this.isOpen = false;
    }

    _createClass(Cubby, [{
      key: 'showHiddenSubject',
      value: function showHiddenSubject() {}
    }]);

    return Cubby;
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
        //loading things
        var key = new Subject('key', inventory);
        var pipe = new Subject('pipe', inventory);
        key.watch();
        pipe.watch();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2FiMGQzM2RlN2JlNmM0ZGQ3YTEiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsIkludmVudG9yeSIsInN1YmplY3RzSW5zaWRlIiwic3ViamVjdCIsInB1c2giLCJ3YXRjaCIsIiRlbGVtZW50cyIsImZpbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsIm9mZiIsImFjdGl2YXRlIiwiU3ViamVjdCIsIm5hbWUiLCJpbnZlbnRvcnkiLCJpc0luSW52ZW50b3J5IiwiaXNBY3RpdmUiLCJoYXNCZWVuVXNlZCIsImNsYXNzIiwiJHN1YmplY3QiLCIkaW52ZW50b3J5IiwiaSIsImxlbmd0aCIsImhhc0NsYXNzIiwiYXR0ciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN1YmplY3QiLCIkZWxlbWVudHNJbkludmVudG9yeSIsImVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGgiLCJyZW1vdmVDbGFzcyIsImFkZFRvSW52ZW50b3J5IiwiQ3ViYnkiLCJoaWRkZW5TdWJqZWN0IiwiaXNPcGVuIiwiR2FtZSIsInNjZW5lIiwia2V5IiwicGlwZSIsInNob3dOZXdTY2VuZSIsIndhdGNoTW92ZXMiLCJuZXdTY2VuZSIsImNzcyIsIiRtb3ZlcyIsImRhdGFzZXQiLCJnb3RvIiwiZ2FtZSIsInN0YXJ0TmV3R2FtZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUEvQjtBQUNELFdBRkQ7QUFHRCxTQUpEO0FBS0Q7QUF4STJCOztBQUFBO0FBQUE7O0FBMkloQzs7QUFFRSxNQUFJQyxPQUFPLElBQUlYLElBQUosRUFBWDtBQUNBVyxPQUFLQyxZQUFMO0FBRUQsQ0FoSkQsRSIsImZpbGUiOiIuL2pzL291dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNhYjBkMzNkZTdiZTZjNGRkN2ExIiwiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICQoJyNsb2FkaW5nJykuYWRkQ2xhc3MoJ25vU2hvdycpO1xuICBjb25zb2xlLmxvZygnQ29udGVudCBsb2FkZWQnKTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUludmVudG9yeVxuICBjbGFzcyBJbnZlbnRvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zdWJqZWN0c0luc2lkZSA9IFtdO1xuICAgIH1cblxuICAgIGFkZFN1YmplY3Qoc3ViamVjdCkge1xuICAgICAgdGhpcy5zdWJqZWN0c0luc2lkZS5wdXNoKHN1YmplY3QpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdWJqZWN0c0luc2lkZSArIFwiIGFkZGVkIHRvIGludmVudG9yeVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3ViamVjdHMgaW4gaW52ZW50b3J5OiBcIiArIHRoaXMuc3ViamVjdHNJbnNpZGUpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdWJqZWN0c0luc2lkZSk7XG4gICAgICB0aGlzLndhdGNoKCk7XG4gICAgfVxuXG4gICAgd2F0Y2goKSB7XG4gICAgICAgIGxldCAkZWxlbWVudHMgPSAkKCcjaW52ZW50b3J5JykuZmluZCgnZGl2Jyk7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpe1xuICAgICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkub2ZmKCk7XG4gICAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnN1YmplY3RzSW5zaWRlW2luZGV4XS5hY3RpdmF0ZShpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tU3ViamVjdFxuXG4gIGNsYXNzIFN1YmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGludmVudG9yeSkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMuaW52ZW50b3J5ID0gaW52ZW50b3J5O1xuICAgICAgdGhpcy5pc0luSW52ZW50b3J5ID0gZmFsc2U7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmhhc0JlZW5Vc2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmNsYXNzID0gJy4nICsgdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGFkZFRvSW52ZW50b3J5KCkge1xuICAgICAgbGV0ICRzdWJqZWN0ID0gJCgnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgbGV0ICRpbnZlbnRvcnkgPSAkKCcjaW52ZW50b3J5JykuZmluZCgnZGl2Jyk7XG4gICAgICAkc3ViamVjdC5hZGRDbGFzcygnbm9TaG93Jyk7XG5cbiAgICAgIGZvcihsZXQgaT0wOyBpPCRpbnZlbnRvcnkubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZigkKCRpbnZlbnRvcnlbaV0pLmhhc0NsYXNzKCdlbXB0eScpICYmICEodGhpcy5pc0luSW52ZW50b3J5KSl7XG4gICAgICAgICAgJCgkaW52ZW50b3J5W2ldKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnLCAnLi9pbWFnZXMvaScrdGhpcy5uYW1lKycucG5nJyk7XG4gICAgICAgICAgdGhpcy5pc0luSW52ZW50b3J5ID0gdHJ1ZTtcbiAgICAgICAgICAkaW52ZW50b3J5W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XG4gICAgICAgICAgdGhpcy5pbnZlbnRvcnkuYWRkU3ViamVjdCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUZyb21JbnZlbnRvcnkoKSB7XG5cbiAgICB9XG5cbiAgICBhY3RpdmF0ZShpbmRleCkge1xuICAgICAgbGV0ICRlbGVtZW50cyA9ICQoJyNpbnZlbnRvcnknKS5maW5kKCdkaXYnKTtcbiAgICAgIGxldCAkZWxlbWVudHNJbkludmVudG9yeSA9IHRoaXMuaW52ZW50b3J5LnN1YmplY3RzSW5zaWRlO1xuICAgICAgbGV0IGVsZW1lbnRzSW5JbnZlbnRvcnlMZW5ndGggPSAkZWxlbWVudHNJbkludmVudG9yeS5sZW5ndGg7XG5cbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUgPT0gZmFsc2UpIHtcblxuICAgICAgICBmb3IobGV0IGk9MDsgaTxlbGVtZW50c0luSW52ZW50b3J5TGVuZ3RoOyBpKyspe1xuICAgICAgICAgICQoJGVsZW1lbnRzW2ldKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgICAkZWxlbWVudHNJbkludmVudG9yeVtpXS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCRlbGVtZW50c0luSW52ZW50b3J5W2ldLmlzQWN0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJGVsZW1lbnRzW2luZGV4XSkuYWRkQ2xhc3MoJ2lzQWN0aXZlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBhY3RpdmVcIik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgJCgkZWxlbWVudHNbaW5kZXhdKS5yZW1vdmVDbGFzcygnaXNBY3RpdmUnKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBpcyBub3QgYWN0aXZlXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgJCgnLicgKyB0aGlzLm5hbWUpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5hZGRUb0ludmVudG9yeSgpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3ViYnlcblxuICBjbGFzcyBDdWJieSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgaGlkZGVuU3ViamVjdCkge1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB9XG4gICAgc2hvd0hpZGRlblN1YmplY3QoKSB7XG5cbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZVxuXG4gIGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zY2VuZSA9IFwiaDFcIjtcbiAgICB9XG4gICAgc3RhcnROZXdHYW1lKCkge1xuICAgICAgLy9sb2FkaW5nIGludmVudG95XG4gICAgICBsZXQgaW52ZW50b3J5ID0gbmV3IEludmVudG9yeSgpO1xuICAgICAgLy9sb2FkaW5nIHRoaW5nc1xuICAgICAgbGV0IGtleSA9IG5ldyBTdWJqZWN0KCdrZXknLCBpbnZlbnRvcnkpO1xuICAgICAgbGV0IHBpcGUgPSBuZXcgU3ViamVjdCgncGlwZScsIGludmVudG9yeSk7XG4gICAgICBrZXkud2F0Y2goKTtcbiAgICAgIHBpcGUud2F0Y2goKTtcbiAgICAgIC8vbG9hZGluZyBzY2VuZXNcbiAgICAgIHRoaXMuc2hvd05ld1NjZW5lKHRoaXMuc2NlbmUpO1xuICAgICAgdGhpcy53YXRjaE1vdmVzKCk7XG4gICAgfVxuICAgIHNob3dOZXdTY2VuZShuZXdTY2VuZSkge1xuICAgICAgJCgnLicrIHRoaXMuc2NlbmUpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XG4gICAgICAkKCcuJysgbmV3U2NlbmUpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgdGhpcy5zY2VuZSA9IG5ld1NjZW5lO1xuICAgIH1cbiAgICB3YXRjaE1vdmVzKCkge1xuICAgICAgbGV0ICRtb3ZlcyA9ICQoJy5tb3ZlJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAkbW92ZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCl7XG4gICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgIHNlbGYuc2hvd05ld1NjZW5lKHRoaXMuZGF0YXNldC5nb3RvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTWFpblxuXG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydE5ld0dhbWUoKTtcblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9