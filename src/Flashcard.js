import React, {useEffect, useState, useRef} from 'react'

export default function Flashcard({flashcard, deleteCard}) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')

    const frontE1 = useRef()
    const backE1 = useRef()

    function handleClick(){

        deleteCard(flashcard.id)

      };

    function setMaxHeight(){
        const frontHeight = frontE1.current.getBoundingClientRect().height
        const backHeight = backE1.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

        useEffect(setMaxHeight, [flashcard.id, flashcard.question, flashcard.answer, flashcard.options])
        useEffect(() => {
            window.addEventListener('resize', setMaxHeight)
            return () => window.removeEventListener('resize', setMaxHeight)

        }, [])

        return (
            <div
            className={`card ${flip ? 'flip' : ''}`}
            style={{ height : height}}
            onClick = {() => setFlip(!flip)}
            >
            <div className="front" ref={frontE1}>
                {flashcard.question}
            </div>
            <div className='back' ref={backE1}> {flashcard.answer}</div>
            <span className="delete-card" onClick={handleClick}>X</span>
            </div> 
        )

    
}
 