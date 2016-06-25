import React from 'react';
const PET_HAPPY = require('./pet1.png');
const PET_SAD = require('./pet1.png');
const PET_DEAD = require('./pet1.png');

const PET_NAME = 'Shoyru';

const INIT = {
  numHeartsToWin: 25,
  numHearts: 20,
  petState: 'happy',
  dialogMessage: 'Hello!',
  winMessage: `${PET_NAME} is a happy pet. You win!`,
};

const BUTTON_ACTIONS = ['food', 'drink', 'play', 'talk'];
const BAD_STATES = ['hungry', 'thirsty', 'lonely', 'lonely'];
const GOOD_STATES = ['happy'];
const NEUTRAL_STATES = ['pretty ok'];

const messages = {
  food: 'Yummy! Thank you for feeding me.',
  drink: 'Thanks! I was really thirsty.',
  play: 'Wooooooooh!',
  talk: ['Aaaaaaaaaa.', 'Blah blah blee blah bloop.', 'Coo coo cachoo.']
}

class App extends React.Component {
  constructor () {
    super();

    this._onClickActionButton = this._onClickActionButton.bind(this);
    this._onClickModalButton = this._onClickModalButton.bind(this);
    this._decrementHearts = this._decrementHearts.bind(this);
    this._removeAnimation = this._removeAnimation.bind(this);

    this.state = {
      numHeartsToWin: INIT.numHeartsToWin,
      numHearts: INIT.numHearts,
      petState: INIT.petState,
      dialogMessage: INIT.dialogMessage,
      winMessage: INIT.winMessage,
      isModalOpen: false,
      isGameOver: false,
      animateHeart: false
    };
  }

  componentDidMount () {
    const heartPointsEl = this.refs.heartPointsEl;

    heartPointsEl.addEventListener('animationend', this._removeAnimation);

    if (!this._decrementInterval) {
      this._decrementInterval = setInterval(this._decrementHearts, 2000);
    }
  }

  componentWillUnmount () {
    heartPointsEl.removeEventListener('animationend', this._removeAnimation);
    
    if (this._decrementInterval) {
      clearInterval(this._decrementInterval);
    }
  }

  _removeAnimation () {
    this.setState({ animateHeart: false });
  }

  _decrementHearts () {
    let { numHearts, petState } = this.state;

    if (numHearts <= INIT.numHearts) {
      if (BAD_STATES.indexOf(petState) === -1) {
        const randomIndex = Math.floor(Math.random() * BAD_STATES.length);
        this._updatePetState(BAD_STATES[randomIndex]);
      }
    }

    if (numHearts > 0) {
      numHearts--;
      this.setState({ numHearts: numHearts});
      return;
    } else {
      if (this._decrementInterval) {
        clearInterval(this._decrementInterval);
      }
    }
  }

  _updatePetState (newPetState) {
    const { petState } = this.state;

    if (newPetState !== petState) {
      this.setState( { petState: newPetState });
    }
  }

  _isGameOver () {
    const { numHeartsToWin, numHearts } = this.state;

    if (numHeartsToWin - 1 === numHearts) {
      this.setState({ 
        isModalOpen : true,
        isGameOver: true
      });

      if (this._decrementInterval) {
        clearInterval(this._decrementInterval);
      }
    }
  }

  _shouldIncrementHearts (action) {
    const { petState } = this.state;
    const actionIndex = BUTTON_ACTIONS.indexOf(action);
    const badPetStateIndex = BAD_STATES.indexOf(petState);

    // checks if current petState is neutral/good,
    // or if proper action is being taken for bad state
    return (badPetStateIndex === -1 || badPetStateIndex === actionIndex);
  }

  _onClickActionButton (action) {
    let { numHearts, isGameOver, animateHeart } = this.state;

    if (isGameOver) {
      return;
    }

    let updatedMessage = messages[action] || 'Hello!';
    if (updatedMessage instanceof Array) {
      const randomIndex = Math.floor(Math.random() * updatedMessage.length);
      updatedMessage = updatedMessage[randomIndex];
    }

    if (this._shouldIncrementHearts(action)) {
      numHearts++;

      if (numHearts >= INIT.numHearts) {
        this._updatePetState(GOOD_STATES[0]);
      } else {
        this._updatePetState(NEUTRAL_STATES[0]);
      }

      this.setState({
        numHearts: numHearts,
        dialogMessage: updatedMessage,
        animateHeart: true        
      });

      return this._isGameOver();
    }

    this.setState({ 
      dialogMessage: updatedMessage
    });

    this._isGameOver();
  }

  _onClickModalButton () {
    const { isModalOpen } = this.state;

    if (isModalOpen) {
      this.setState({ isModalOpen: !isModalOpen });
    }
  }

  _renderModal () {
    const { isModalOpen, winMessage } = this.state;

    if (isModalOpen) {
      return (
        <div className='modal modal-no-sections'>
          <p>{winMessage}</p>
          <button className='button button-approve' onClick={this._onClickModalButton}>Okay</button>
        </div>
      );
    }
  }

  render () {
    const { numHearts, petState, dialogMessage, isModalOpen, isGameOver, animateHeart } = this.state;
    
    let containerClass = 'container';
    if (isModalOpen) {
      containerClass += ' has-modal';
    }

    let buttonIsDisabled = false;
    if (isGameOver) {
      buttonIsDisabled = true;
    }

    let statusClass = 'status-neutral';
    let petImage = PET_HAPPY;
    if (GOOD_STATES.indexOf(petState) !== -1) {
      statusClass = 'status-good';
    } else if (BAD_STATES.indexOf(petState) !== -1) {
      statusClass = 'status-bad';
      petImage = PET_SAD;
      console.log('pet image should be sad');
    }

    let heartAnimationClass = animateHeart ? 'animate' : '';

    return (
      <div className={containerClass}>
        <header className="grid-flex-container no-wrap" role="banner">
          <div className="grid-flex-cell">
            <h1>PetBox</h1>
          </div>
          <div ref="heartPointsEl" className={`grid-flex-cell grid-flex-cell-1of4 heart-points ${heartAnimationClass}`}>
            <h1>{numHearts} <span>&hearts;</span></h1>
          </div>
        </header>

        <div className="grid-flex-container pet-box">
          <div className="grid-flex-cell grid-flex-cell-1of4 pet-action">
            <div>
              <button className='button button-large button-approve' disabled={buttonIsDisabled} onClick={this._onClickActionButton.bind(this, 'food')}>Food</button>
            </div>
            <div>
              <button className='button button-large button-approve' disabled={buttonIsDisabled} onClick={this._onClickActionButton.bind(this, 'drink')}>Drink</button>
            </div>
            <div>
              <button className='button button-large button-approve' disabled={buttonIsDisabled} onClick={this._onClickActionButton.bind(this, 'play')}>Play</button>
            </div>
            <div>
              <button className='button button-large button-approve' disabled={buttonIsDisabled} onClick={this._onClickActionButton.bind(this, 'talk')}>Talk</button>
            </div>
          </div>


          <div className="grid-flex-cell dialog-box-mobile">
            <textarea type='text' value={dialogMessage} className='form-input' readOnly />
          </div>

          <div className="grid-flex-cell pet-main">
            <img src={petImage} style={{backgroundColor: '#e6eaed'}} />
            <div className="status-box-mobile">
              <h4>STATE: <span className={statusClass}>{petState.toUpperCase()}</span></h4>
            </div>
          </div>
        </div>

        <div className="grid-flex-container">
          <div className="grid-flex-cell status-box">
            <h4>STATE: <span className={statusClass}>{petState.toUpperCase()}</span></h4>
          </div>
        </div>

        <div className="grid-flex-container dialog-box">
          <div className="grid-flex-cell">
            <textarea type='text' value={dialogMessage} className='form-input' readOnly />
          </div>
        </div>

        {this._renderModal()}
      </div>
    )
  }
}

export default App
