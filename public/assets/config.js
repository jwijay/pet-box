PetBox = function () {
  this.PET_HAPPY = './assets/pet1.png';
  this.PET_SAD = './assets/pet1.png';
  this.PET_DEAD = './assets/pet1.png';
  this.PET_NAME = 'Shoyru';

  this.BUTTON_ACTIONS = ['food', 'drink', 'play', 'talk'];
  this.BAD_STATES = ['hungry', 'thirsty', 'bored', 'lonely'];
  this.GOOD_STATES = ['happy'];
  this.NEUTRAL_STATES = ['pretty ok'];

  this.NUM_HEARTS_TO_WIN = 25;
  this.NUM_HEARTS = 20;
  this.PET_STATE = this.GOOD_STATES[0];
  this.DIALOG_MESSAGE = 'Hello!';
  this.WIN_MESSAGE = `${this.PET_NAME} is a happy pet. You win!`;

  this.MESSAGES = {
    food: 'Yummy! Thank you for feeding me.',
    drink: 'Thanks! I was really thirsty.',
    play: 'Wooooooooh!',
    talk: ['Aaaaaaaaaa.', 'Blah blah blee blah bloop.', 'Coo coo cachoo.']
  };
}