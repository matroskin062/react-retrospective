import React from 'react';

import styles from './AddForm.module.css';

import cross from '../assets/cross.svg';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.inputRef = React.createRef();

    this.toggleForm = this.toggleForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleForm() {
    this.setState({ visible: !this.state.visible }, () => {
      if (this.state.visible) {
        this.inputRef.current.focus();
      }
    });
  }

  handleClick() {
    if (this.inputRef.current.value.trim()) {
      this.props.addCard(this.inputRef.current.value);
      this.toggleForm();
    }
  }

  render() {
    const { visible } = this.state;
    const { inputRef, handleClick, toggleForm } = this;

    const button = (
      <button className={styles.AddButton} onClick={toggleForm}>
        + Write Note
      </button>
    );

    const form = (
      <>
        <textarea
          className={styles.AddForm}
          ref={inputRef}
          placeholder='Input note text'
        ></textarea>
        <div className={styles.FormControls}>
          <img src={cross} alt='cancel' onClick={toggleForm} />
          <button className={styles.SubmitButton} onClick={handleClick}>
            Add Note
          </button>
        </div>
      </>
    );

    return <div className={styles.AddForm}>{visible ? form : button}</div>;
  }
}

export default AddForm;
