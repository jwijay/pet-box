PetBox = function () {
  let visibleButtons = [];
  let messages = {
    food: ['Yummy! Thank you for feeding me.'],
    drink: ['Thanks! I was really thirsty.'],
    play: ['Wooooooooh!'],
    talk: ['Aaaaaaaaaa.', 'Blah blah blee blah bloop.', 'Coo coo cachoo.']
  };

  // This hides and shows buttons.
  // Takes in a string corresponding to pet action (e.g. 'food', 'drink', 'play', 'talk').
  function addPetAction (buttonName) {
    visibleButtons.push(buttonName);
  }

  addPetAction('food');
  
  this.MY_NAME = '';
  this.PET_NAME = 'Shoyru';

  // BAD_STATES correspond to actions: 'food', 'drink', 'play', 'talk'
  this.BAD_STATES = ['hungry', 'thirsty', 'bored', 'lonely'];
  this.GOOD_STATES = ['happy'];
  this.NEUTRAL_STATES = ['pretty ok'];

  this.NUM_HEARTS_TO_WIN = 25;
  this.NUM_HEARTS = 20;
  this.HEART_LOSS_SPEED = 2000; // in milliseconds (1/1000s)
  // see website for more ascii symbols:
  // http://jonsatrom.com/etc/hearts.html
  this.ASCII_ICON = '&hearts;';
  this.DIALOG_MESSAGE = `Hello!`;
  this.WIN_MESSAGE = `${this.PET_NAME} is a happy pet. You win!`;
  this.PET_HAPPY = './assets/happypet1.png';
  this.PET_SAD = './assets/sadpet1.png';
  
  this.MESSAGES = messages;
  this.VISIBLE_BUTTONS = visibleButtons;
}