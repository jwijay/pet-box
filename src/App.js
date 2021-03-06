import React from 'react';

let CONFIG = {};
let BUTTON_ACTIONS = ['food', 'drink', 'play', 'talk'];

class App extends React.Component {
  constructor () {
    super();

    window.PetBox.call(CONFIG);

    this._onClickActionButton = this._onClickActionButton.bind(this);
    this._onClickModalButton = this._onClickModalButton.bind(this);
    this._decrementHearts = this._decrementHearts.bind(this);
    this._removeAnimation = this._removeAnimation.bind(this);

    this.state = {
      numHeartsToWin: CONFIG.NUM_HEARTS_TO_WIN,
      numHearts: CONFIG.NUM_HEARTS,
      petState: CONFIG.GOOD_STATES[0],
      dialogMessage: CONFIG.DIALOG_MESSAGE,
      winMessage: CONFIG.WIN_MESSAGE,
      isModalOpen: false,
      isGameOver: false,
      animateHeart: false
    };
  }

  componentDidMount () {
    const heartPointsEl = this.refs.heartPointsEl;

    heartPointsEl.addEventListener('animationend', this._removeAnimation);

    if (!this._decrementInterval) {
      this._decrementInterval = setInterval(this._decrementHearts, CONFIG.HEART_LOSS_SPEED);
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

    if (numHearts <= CONFIG.NUM_HEARTS) {
      if (CONFIG.BAD_STATES.indexOf(petState) === -1) {
        const randomIndex = Math.floor(Math.random() * CONFIG.BAD_STATES.length);
        this._updatePetState(CONFIG.BAD_STATES[randomIndex]);
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
    const badPetStateIndex = CONFIG.BAD_STATES.indexOf(petState);

    // checks if current petState is neutral/good,
    // or if proper action is being taken for bad state
    return (badPetStateIndex === -1 || badPetStateIndex === actionIndex);
  }

  _onClickActionButton (action) {
    let { numHearts, isGameOver, animateHeart } = this.state;

    if (isGameOver) {
      return;
    }

    let updatedMessage = CONFIG.MESSAGES[action] || 'Hello!';
    if (updatedMessage instanceof Array) {
      const randomIndex = Math.floor(Math.random() * updatedMessage.length);
      updatedMessage = updatedMessage[randomIndex];
    }

    if (this._shouldIncrementHearts(action)) {
      numHearts++;

      if (numHearts >= CONFIG.NUM_HEARTS) {
        const randomGoodIndex = Math.floor(Math.random() * CONFIG.GOOD_STATES.length);
        this._updatePetState(CONFIG.GOOD_STATES[randomGoodIndex]);
      } else {
        const randomNeutralIndex = Math.floor(Math.random() * CONFIG.NEUTRAL_STATES.length);
        this._updatePetState(CONFIG.NEUTRAL_STATES[randomNeutralIndex]);
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
    let petImage = CONFIG.PET_HAPPY;
    if (CONFIG.GOOD_STATES.indexOf(petState) !== -1) {
      statusClass = 'status-good';
    } else if (CONFIG.BAD_STATES.indexOf(petState) !== -1) {
      statusClass = 'status-bad';
      petImage = CONFIG.PET_SAD;
    }

    let heartAnimationClass = animateHeart ? 'animate' : '';

    // show/hide action buttons based on config function calls
    const foodButtonHidden = (CONFIG.VISIBLE_BUTTONS.indexOf('food') !== -1) ? '' : 'hidden';
    const drinkButtonHidden = (CONFIG.VISIBLE_BUTTONS.indexOf('drink') !== -1) ? '' : 'hidden';
    const talkButtonHidden = (CONFIG.VISIBLE_BUTTONS.indexOf('talk') !== -1) ? '' : 'hidden';
    const playButtonHidden = (CONFIG.VISIBLE_BUTTONS.indexOf('play') !== -1) ? '' : 'hidden';

    return (
      <div className={containerClass}>
        <header className="grid-flex-container no-wrap" role="banner">
          <div className="grid-flex-cell">
            <h1>{(CONFIG.MY_NAME) ? `${CONFIG.MY_NAME}'s PetBox` : 'PetBox'}</h1>
          </div>
          <div ref="heartPointsEl" className={`grid-flex-cell grid-flex-cell-1of4 heart-points ${heartAnimationClass}`}>
            <h1>{numHearts} <span dangerouslySetInnerHTML={{ __html: CONFIG.ASCII_ICON }}></span></h1>
          </div>
        </header>

        <div className="grid-flex-container pet-box">
          <div className="grid-flex-cell grid-flex-cell-1of4 pet-action">
            <div>
              <button className={`button button-large button-approve ${foodButtonHidden}`} disabled={buttonIsDisabled} onClick={this._onClickActionButton.bind(this, 'food')}>Food</button>
            </div>
            <div>
              <button className={`button button-large button-approve ${drinkButtonHidden}`} disabled={buttonIsDisabled} onClick={this._onClickActionButton.bind(this, 'drink')}>Drink</button>
            </div>
            <div>
              <button className={`button button-large button-approve ${playButtonHidden}`} disabled={buttonIsDisabled} onClick={this._onClickActionButton.bind(this, 'play')}>Play</button>
            </div>
            <div>
              <button className={`button button-large button-approve ${talkButtonHidden}`} disabled={buttonIsDisabled} onClick={this._onClickActionButton.bind(this, 'talk')}>Talk</button>
            </div>
          </div>


          <div className="grid-flex-cell dialog-box-mobile">
            <textarea type='text' value={dialogMessage} className='form-input' readOnly />
          </div>

          <div className="grid-flex-cell pet-main">
            <img src={petImage} />
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
