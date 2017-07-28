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
          let audio = new Audio('sounds/item.wav');
          audio.play();
        }
      }
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

  class PowerBox {
    constructor() {
      this.isSolved = false;
    }
    activate() {
      this.isSolved = true;
    }
    watch(){
      let self = this;
      let $powerBox = $('.powerBox');
      let number=[0,0,0,0];
      let color=['#6eba1a','#ff0000','#1e20d9','#e63bfb','#ffe81d','#c17c5a','#ff7f17','#ffffff','#000000'];
      $powerBox.each(function(index,element){
        $(element).on('click',function(){
          number[index]++;
          if(number[index] == 10){
            number[index]=1;
          }
          $(element).css('background-color',color[number[index] - 1]);
          if(number[0]==6 && number[1]==8 && number[2]==7 && number[3]==4){
            game.showDialogues("Something crackled");
            let audio = new Audio('sounds/power.wav');
            audio.play();
            console.log('solved!');
            $powerBox.off();
            self.activate();
          }
        });
      });
    }
  }

  class Safe {
    watch(){
      let $button = $('.button');
      let $buttonSub = $('.buttonSub');
      let $buttonDel = $('.buttonDel');
      let $buttonBar = $('.buttonBar');
      let pin = "";

      $button.each(function(index,element){
        $(element).on('click',function(){
          if(pin.length <10){
            pin += element.innerText;
            console.log(pin);
            $buttonBar.text(pin);
            let audioBeep = new Audio('sounds/beep.wav');
            audioBeep.play();
          }
        });
      });
      $buttonDel.on('click',function(){
        pin = "";
        $buttonBar.text(pin);
        let audioBeep = new Audio('sounds/beep.wav');
        audioBeep.play();
      });
      $buttonSub.on('click',function(){
        if(pin === "1626364656"){
          console.log('solved!');
          let $doorSafe = $('.doorSafe');
          $doorSafe.css("display","block");
          let audioSafe = new Audio('sounds/safe.wav');
          audioSafe.play();
        } else {
          game.showDialogues("Wrong password");
          let audioBeep = new Audio('sounds/wrong.wav');
          audioBeep.play();
        }
      });
    }
  }

  class Lever {
    constructor(powerBox){
      this.powerBox = powerBox;
    }
    watch(){
      let $lever = $('.lever');
      let self = this;
      $lever.on('click',function(){
        if(self.powerBox.isSolved){
          console.log('open');
          let $doorHiddenSafe = $('.doorHiddenSafe');
          $doorHiddenSafe.css("display","block");
          let audioSafe = new Audio('sounds/safe.wav');
          audioSafe.play();
        } else {
          game.showDialogues("No power");
          let audio = new Audio('sounds/tick.wav');
          audio.play();
        }
      });
    }
  }

  class Pressure {
    constructor(subject){
      this.subject = subject;
      this.isActive = false;
    }
    watch(){
      let self = this;
      let $pipe = $('.pipe');
      $pipe.on('click',function(){
        if(self.subject.isActive){
          let $pressure = $('.pressure');
          $pressure.css("display","block");
          self.isActive = true;
          console.log('pressure' + self.isActive);
          let audio = new Audio('sounds/pressure.wav');
          audio.play();
        } else {
          console.log("I can't turn it");
          game.showDialogues("I can't turn it");
          let audio = new Audio('sounds/groan.mp3');
          audio.play();
        }
      });
    }
  }

  class MainPipe {
    constructor(pressure){
      this.pressure = pressure;
    }
    watch(){
      let self = this;
      let $mainpipe = $('.mainpipe');
      $mainpipe.on('click', function(){
        if(self.pressure.isActive){
          let $doorExit = $('.doorExit');
          $doorExit.css("display","block");
          game.showNewScene('h4');
          let audio = new Audio('sounds/maindoor.wav');
          audio.play();
        } else{
          console.log();
          game.showDialogues("There is no pressure");
          let audio = new Audio('sounds/nopressure.wav');
          audio.play();
        }
      })
    }
  }
//----------------------------------------------------Doors

  class Door {
    constructor(name) {
      this.name = name;
    }
    openDoor() {
      let $door = $('.' + this.name);
      $door.removeClass('noShow');
      if(this.name == "door6"){
        let $change = $('.h3toh3a');
        $change.addClass('noShow');
        console.log('Change!!!');
        game.showNewScene('h3');
        let audio = new Audio('sounds/crowbar.wav');
        audio.play();
      } else if(this.name == "openBox"){
        let audio = new Audio('sounds/box.wav');
        audio.play();
      } else {
        let audio = new Audio('sounds/opendoor.wav');
        audio.play();
      }
    }
  }

//----------------------------------------------------Actives

  class Active {
    constructor(name, subject, door, text) {
      this.name = name;
      this.subject = subject;
      this.door = door;
      this.text = text;
    }
    watch() {
      let $active = $('.' + this.name);
      let self = this;
      $active.on('click', function(){
        if(self.subject.isActive){
          self.door.openDoor();
        } else{
          console.log(self.text);
          game.showDialogues(self.text);
          let audio = new Audio('sounds/close.wav');
          audio.play();
        }
      });
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
      //loading subjects
      let key1 = new Subject('key1', inventory);
      key1.watch();
      let key2 = new Subject('key2', inventory);
      key2.watch();
      let key3 = new Subject('key3', inventory);
      key3.watch();
      let key4 = new Subject('key4', inventory);
      key4.watch();
      let key5 = new Subject('key5', inventory);
      key5.watch();
      let crowbar = new Subject('crowbar', inventory);
      crowbar.watch();
      let stanley = new Subject('stanley', inventory);
      stanley.watch();
      let hydraulic = new Subject('hydraulic', inventory);
      hydraulic.watch();
      //loading cubby
      let powerBox = new PowerBox();
      powerBox.watch();
      let safe = new Safe();
      safe.watch();
      let lever = new Lever(powerBox);
      lever.watch();
      let pressure = new Pressure(hydraulic);
      pressure.watch();
      let mainpipe = new MainPipe(pressure);
      mainpipe.watch();
      //loading doors
      let door1 = new Door('door1');
      let door2 = new Door('door2');
      let door3 = new Door('door3');
      let door4 = new Door('door4');
      let door5 = new Door('door5');
      let door6 = new Door('door6');
      let openBox = new Door('openBox');
      let doorEexit = new Door('doorExit');
      //loading actives
      let lock1 = new Active('lock1', key1, door1, "Locked");
      lock1.watch();
      let lock2 = new Active('lock2', key2, door2, "Locked");
      lock2.watch();
      let lock3 = new Active('lock3', key3, door3, "Locked");
      lock3.watch();
      let lock4 = new Active('lock4', key4, door4, "Locked");
      lock4.watch();
      let lock5 = new Active('lock5', key5, door5, "Locked");
      lock5.watch();
      let lock6 = new Active('lock6', crowbar, door6, "I can't move it");
      lock6.watch();
      let lock7 = new Active('lock7', stanley, openBox, "This tape is too strong");
      lock7.watch();
      //loading scenes
      this.showNewScene(this.scene);
      this.watchMoves();
    }
    showNewScene(newScene) {
      $('.'+ this.scene).css("display","none");
      $('.'+ newScene).css("display","block");
      this.scene = newScene;
    }
    showDialogues(text){
      //find dialogues
      let $dialogues = $('#dialogues');
      $dialogues.html( "<p>"+text+"</p>" );
      setTimeout(function(){
        $dialogues.html("");
      }, 2000);
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
  let $start = $('#start');
  let $button = $start.find('button');
  let game = new Game();

  $button.on('click',function(){
    $start.css("display","none");

    game.startNewGame();
  });

});
