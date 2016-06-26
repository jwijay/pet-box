PetBox = function () {
  let visibleButtons = [];
  let messages = {
    food: ['Yummy! Thank you for feeding me.'],
    drink: ['Thanks! I was really thirsty.'],
    play: ['Wooooooooh!'],
    talk: ['Aaaaaaaaaa.', 'Blah blah blee blah bloop.', 'Coo coo cachoo.']
  };

  function addPetAction (buttonName) {
    visibleButtons.push(buttonName);
  }

  addPetAction('food');
  
  function addPetDialogForAction (action, newPhrase) {
    console.log('adding new phrase: ', newPhrase);
    messages[action].push(newPhrase);
  }

  // addPetDialogForAction('talk', `I'm Shoyru!`);

  this.PET_HAPPY = './assets/pet1.png';
  this.PET_SAD = './assets/pet1.png';
  this.PET_NAME = 'Shoyru';

  this.BUTTON_ACTIONS = ['food', 'drink', 'play', 'talk'];
  this.BAD_STATES = ['hungry', 'thirsty', 'bored', 'lonely'];
  this.GOOD_STATES = ['happy'];
  this.NEUTRAL_STATES = ['pretty ok'];

  this.NUM_HEARTS_TO_WIN = 25;
  this.NUM_HEARTS = 20;
  this.HEART_LOSS_SPEED = 2000; // in milliseconds (1/1000s)
  // see website for more ascii symbols:
  // http://jonsatrom.com/etc/hearts.html
  this.ASCII_ICON = '&hearts;';
  this.PET_STATE = this.GOOD_STATES[0];
  this.DIALOG_MESSAGE = 'Hello!';
  this.WIN_MESSAGE = `${this.PET_NAME} is a happy pet. You win!`;
  this.MESSAGES = messages;
  this.VISIBLE_BUTTONS = visibleButtons;
}