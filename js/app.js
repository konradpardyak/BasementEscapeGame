$(window).on('load', function() {
  $('#loading').addClass('noShow');
  console.log('Content loaded');
//----------------------------------------------------Inventory
  class Inventory {
    constructor() {
      this.subjectsInside = [];
    }

    addSubject(subject) {
      this.subjectsInside.push(subject);
      console.log(this.subjectsInside + " added to inventory");
      console.log("Subjects in inventory: " + this.subjectsInside);
      console.log(this.subjectsInside);
      this.watch();
    }

    watch() {
        let $elements = $('#inventory').find('div');
        let self = this;
        $elements.each(function(index, element){
          $($elements[index]).off();
          $($elements[index]).on('click',function(){
            self.subjectsInside[index].activate(index);
        });
      });
    }

  }

//----------------------------------------------------Subject

  class Subject {
    constructor(name, inventory) {
      this.name = name;
      this.inventory = inventory;
      this.isInInventory = false;
      this.isActive = false;
      this.hasBeenUsed = false;
      this.class = '.' + this.name;
    }

    addToInventory() {
      let $subject = $('.' + this.name);
      let $inventory = $('#inventory').find('div');
      $subject.addClass('noShow');

      for(let i=0; i<$inventory.length; i++){
        if($($inventory[i]).hasClass('empty') && !(this.isInInventory)){
          $($inventory[i]).find('img').attr('src', './images/i'+this.name+'.png');
          this.isInInventory = true;
          $inventory[i].classList.remove('empty');
          this.inventory.addSubject(this);
        }
      }
    }

    removeFromInventory() {

    }

    activate(index) {
      let $elements = $('#inventory').find('div');
      let $elementsInInventory = this.inventory.subjectsInside;
      let elementsInInventoryLength = $elementsInInventory.length;

      if(this.isActive == false) {

        for(let i=0; i<elementsInInventoryLength; i++){
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

    watch() {
      let self = this;
      $('.' + this.name).on('click',function(){
        self.addToInventory();
      })
    }

  }
//----------------------------------------------------Cubby

  class Cubby {
    constructor(name, hiddenSubject) {
      this.isOpen = false;
    }
    showHiddenSubject() {

    }
  }

//----------------------------------------------------Game

  class Game {
    constructor() {
      this.scene = "h1";
    }
    startNewGame() {
      //loading inventoy
      let inventory = new Inventory();
      //loading things
      let key = new Subject('key', inventory);
      let pipe = new Subject('pipe', inventory);
      key.watch();
      pipe.watch();
      //loading scenes
      this.showNewScene(this.scene);
      this.watchMoves();
    }
    showNewScene(newScene) {
      $('.'+ this.scene).css("display","none");
      $('.'+ newScene).css("display","block");
      this.scene = newScene;
    }
    watchMoves() {
      let $moves = $('.move');
      let self = this;
      $moves.each(function(index, element){
        $(element).on('click',function(){
          self.showNewScene(this.dataset.goto);
        });
      });
    }
  }

//----------------------------------------------------Main

  let game = new Game();
  game.startNewGame();

});
