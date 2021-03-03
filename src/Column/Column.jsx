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

  render() {
    const { cards, title } = this.state;
    const { addCard, updateRating, updateCard } = this;

    const sortedCards = cards.sort((a, b) => b.rating - a.rating);

    return (
      <div className={styles.Column}>
        <h3 className={styles.Header}>{title}</h3>
        <AddForm addCard={addCard} />
        <div className={styles.CardsContainer}>
          {sortedCards &&
            sortedCards.map((card) => (
              <Card
                key={card.id}
                {...card}
                updateRating={updateRating}
                updateCard={updateCard}
              />
            ))}
        </div>
      </div>
    );
  }
}
