import React, { Component } from 'react';
import AddForm from '../AddForm/AddForm';
import Card from '../Card/Card';

import styles from './Column.module.css';

export default class Column extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };

    this.addCard = this.addCard.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
    }));
  }

  addCard(text) {
    const newCard = {
      id: performance.now(),
      text,
      created_at: new Date().toLocaleString(),
      rating: 0,
    };

    this.setState((state) => ({
      ...state,
      cards: [...state.cards, newCard],
    }));
  }

  updateRating(value, id) {
    this.setState((state) => ({
      ...state,
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, rating: card.rating + value } : card
      ),
    }));
  }

  updateCard(text, id) {
    this.setState((state) => ({
      ...state,
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, text } : card
      ),
    }));
  }

  deleteCard(id) {
    this.setState((state) => ({
      ...state,
      cards: state.cards.filter((card) => card.id !== id),
    }));
  }

  render() {
    const { cards, title, color } = this.state;
    const { addCard, updateRating, updateCard } = this;

    const sortedCards = cards.sort((a, b) => b.rating - a.rating);

    return (
      <div className={styles.Column}>
        <div className={styles.Header}>
          <h3 style={{ color: color }}>{title}</h3>
          <h3>Comments: {cards.length}</h3>
        </div>
        <AddForm addCard={addCard} />
        <div className={styles.CardsContainer}>
          {sortedCards &&
            sortedCards.map((card) => (
              <Card
                key={card.id}
                {...card}
                color={color}
                updateRating={updateRating}
                updateCard={updateCard}
                deleteCard={this.deleteCard}
              />
            ))}
        </div>
      </div>
    );
  }
}
