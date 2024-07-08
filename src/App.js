import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import axios from 'axios'

import { ThemeProvider, useTheme, createTheme, darkMode, toggleSwitchFunction } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, CardContent, CardMedia, Switch, IconButton, Box} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Container from 'react-bootstrap/Nav';




function App() {


  // state to manage the dark mode
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  // function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  // applying the primary and secondary theme colors
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'dark' : 'light', // handle the dark mode state on toggle
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#131052',

      },
    },
  });
  // create a darkTheme function to handle dark theme using createTheme
  const darkMode = createTheme({
    palette: {
      mode: darkTheme ? 'dark' : 'light',
    },
  });

  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  const deleteCard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  }

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  useEffect(() => {

  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)),
            answer
          ]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })
  }

  const filteredFlashcards = flashcards.filter(flashcard =>
    flashcard.question.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())
  );


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const theme = useTheme();



  return (
    <>


      <div className="header">
        <form onSubmit={handleSubmit}>


          <Navbar expand="lg" className="bg-body-tertiary">





            <Col xs="ms-auto">
            <Navbar.Brand href="#home">MemorizeMe</Navbar.Brand>

            </Col>





            <div>




              <Row className="ml-3 align-items-center">



                <Col xs="auto">
                  <div className="form-group" style={{ textAlign: 'left' }}>
                  <Form.Label>Search Qn title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}fth
                      onChange={handleSearchChange}
                    />
                  </div>

                </Col>




                <Col xs="auto" className='form-group'>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    type="select"
                    className="mr-sm-2"
                    id="category"
                    ref={categoryEl}
                  >
                    {categories.map(category => {
                      return <option value={category.id} key={category.id}>{category.name}</option>
                    })}
                  </Form.Select>
                </Col>

                <Col xs="auto" className='form-group'>
                  <Form.Label>Number of Questions</Form.Label>
                  <Form.Control
                    type="number"
                    className="mr-sm-2"
                    id="amount"
                    min="1"
                    step="1"
                    defaultValue={10}
                    ref={amountEl}
                  />
                </Col>





                <Col xs="auto" className="form-group">
                  <Button className='btn' type="submit" variant="primary">Generate</Button>
                </Col>
              </Row>




            </div>


            <Col xs="auto"  style={{ marginLeft: 'auto' }}>
                  <ThemeProvider theme={darkTheme}>
                    <CssBaseline />

                    <IconButton sx={{ ml: 1 }} onClick={toggleDarkTheme} color="primary">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>




                  </ThemeProvider>
                </Col>
          </Navbar>
        </form>
      </div>



                    <Container>


                      
                    </Container>

      <div className="container">
        <FlashcardList flashcards={filteredFlashcards} deleteCard={deleteCard} />
      </div>

    </>
  );
}



export default App;