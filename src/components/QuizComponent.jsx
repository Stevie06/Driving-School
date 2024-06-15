import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, FormControlLabel, Radio, RadioGroup, CircularProgress, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider  } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { supabase } from '../client'; 
const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('question, correct_answer');
        if (error) throw error;
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      const newIncorrectCount = incorrectAnswers + 1;
      setIncorrectAnswers(newIncorrectCount);
      if (newIncorrectCount > 4) {
        setOpenSnackbar(true);
        setSnackbarMessage('You have failed the exam.');
        return; 
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      setOpenSnackbar(true);
      setSnackbarMessage('You have completed the quiz.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Failed to load questions: {error}</Typography>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionsRemaining = questions.length - currentQuestionIndex - 1;

  const recordQuizAttempt = async (userId, score, totalQuestions, remarks) => {
    const { error } = await supabase
      .from('quiz_history')
      .insert([
        {
          student_id: userId,
          score: score,
          total_questions: totalQuestions,
          remarks: remarks
        }
      ]);
  
    if (error) {
      console.error('Error recording quiz attempt:', error.message);
      return false;
    }
    return true;
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%', p: 2 }}>
        <Card raised sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Question #{currentQuestionIndex + 1}
            </Typography>
            <Typography>{currentQuestion.question}</Typography>
            
            <RadioGroup
              name="quiz-options"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {currentQuestion.options?.map((option) => (
                <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.text} />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          onClick={handleNextQuestion}
          disabled={!selectedOption}
        >
          Next
        </Button>
        <Typography sx={{ mt: 2 }}>
          Questions Remaining: {questionsRemaining}
          <br />
          Correct Answers: {correctAnswers}
          <br />
          Incorrect Answers: {incorrectAnswers}
        </Typography>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default QuizComponent;
