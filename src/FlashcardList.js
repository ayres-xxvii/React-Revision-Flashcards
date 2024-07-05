import React from 'react'
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards, deleteCard }) {


    
    return (
      <div className="card-grid">
        {flashcards.map(flashcard => (
          <Flashcard flashcard={flashcard} key={flashcard.id} deleteCard={deleteCard} />
        ))}
      </div>
    );
  }