import React from 'react';

import styles from './Card.module.css';

import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import edit from '../assets/edit.svg';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.incRating = this.incRating.bind(this);
    this.decRating = this.decRating.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.inputRef = React.createRef();
  }

  incRating() {
    this.props.updateRating(1, this.props.id);
  }
  decRating() {
    this.props.updateRating(-1, this.props.id);
  }

  handleUpdate() {
    this.props.updateCard(this.inputRef.current.value, this.props.id);
    this.toggleForm();
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing }, () => {
      if (this.state.isEditing) {
        this.inputRef.current.focus();
      }
    });
  }

  render() {
    const { inputRef, handleUpdate, toggleForm, incRating, decRating } = this;
    const { text, created_at, rating } = this.props;
    const { isEditing } = this.state;

    const form = (
      <div className={styles.UpdForm}>
        <textarea ref={inputRef}></textarea>
        <button onClick={handleUpdate}>Update Note</button>
      </div>
    );

    return (
      <div className={styles.Card}>
        <div className={styles.Text}>
          {isEditing ? (
            form
          ) : (
            <>
              <p>{text}</p>
              <img src={edit} alt='edit' onClick={toggleForm} />
            </>
          )}
        </div>
        <div className={styles.Controls}>
          <p>{created_at}</p>
          <div className={styles.Rating}>
            <img src={dislike} alt='dislike' onClick={decRating} />
            <span>{rating}</span>
            <img src={like} alt='like' onClick={incRating} />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
