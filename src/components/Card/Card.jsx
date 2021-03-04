import React from 'react';

import styles from './Card.module.css';

import dislike from '../../assets/dislike.svg';
import like from '../../assets/like.svg';
import edit from '../../assets/edit.svg';
import cross from '../../assets/cross.svg';
import deleteIco from '../../assets/delete.svg';

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
    this.handleDelete = this.handleDelete.bind(this);

    this.inputRef = React.createRef();
  }

  incRating() {
    this.props.updateRating(1, this.props.id);
  }
  decRating() {
    this.props.updateRating(-1, this.props.id);
  }

  handleUpdate() {
    if (this.inputRef.current.value.trim()) {
      this.props.updateCard(this.inputRef.current.value, this.props.id);
      this.toggleForm();
    }
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing }, () => {
      if (this.state.isEditing) {
        this.inputRef.current.focus();
        this.inputRef.current.value = this.props.text;
      }
    });
  }

  handleDelete() {
    this.props.deleteCard(this.props.id);
  }

  render() {
    const {
      inputRef,
      handleUpdate,
      toggleForm,
      incRating,
      decRating,
      handleDelete,
    } = this;
    const { text, created_at, rating, color } = this.props;
    const { isEditing } = this.state;

    const form = (
      <div className={styles.UpdForm}>
        <textarea ref={inputRef} placeholder='Input note text'></textarea>
        <div className={styles.FormControls}>
          <img src={cross} alt='cancel' onClick={toggleForm} />
          <button onClick={handleUpdate}>Update Note</button>
        </div>
      </div>
    );

    return (
      <div className={styles.Card} style={{ border: `1px solid ${color}` }}>
        <div className={styles.Text}>
          {isEditing ? (
            form
          ) : (
            <>
              <p>{text}</p>
              <div className={styles.Controls}>
                <div>
                  <img src={edit} alt='edit' onClick={toggleForm} />
                </div>
                <div>
                  <img src={deleteIco} alt='delete' onClick={handleDelete} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.CardFooter}>
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
