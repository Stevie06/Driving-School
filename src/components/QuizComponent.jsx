import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, Icon } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import TopBar from './TopBar';
import TimerIcon from '@mui/icons-material/Timer';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const QuizComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(1800); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeRemaining === 0) {
            endQuiz(false, "Timpul a expirat!");
        }
    }, [timeRemaining]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('id');
            if (error) throw error;
            const question_ids = [];
            for (let i = 0; i < 26; i++) {
               const random_index = Math.floor(Math.random() * data.length);
               question_ids.push(data[random_index].id);
               data.splice(random_index, 1); 
            }
            const { data: questionsData, error: questionsError } = await supabase
                .from('questions')
                .select('*')
                .in('id', question_ids);
            if (questionsError) throw questionsError;
            setQuestions(questionsData);
        } catch (error) {
            console.error('Error fetching questions:', error.message);
        }
        setLoading(false);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextQuestion = async () => {
        processAnswer(selectedOption === questions[currentQuestionIndex].correct_answer.toLowerCase());
        moveToNextQuestion();
    };

    const processAnswer = (isCorrect) => {
        if (isCorrect) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setIncorrectAnswers(incorrectAnswers + 1);
            if (incorrectAnswers > 4) {
                endQuiz(false,'Ati fost respins!' );
                return;
            }
        }
    };

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption('');
        } else {
            endQuiz(true,'Ati fost admis!');
            
        }
    };

    const endQuiz = async (completed, message, status) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.error('User-ul nu este autentificat');
            return;
        }

        const totalQuestions = correctAnswers + incorrectAnswers;
        await recordQuizAttempt(user.id, correctAnswers, totalQuestions, message);
        setDialogContent(message);
        setDialogOpen(true);
    };

    const recordQuizAttempt = async (studentId, correct_answers, total_questions, status) => {
        const { error } = await supabase
            .from('quiz_history')
            .insert([
                {
                    student_id: studentId,
                    correct_answers,
                    total_questions,
                    status: status
                }
            ]);
        if (error) {
            console.error('Error recording quiz attempt:', error.message);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate('/Dashboardstud');
    };

    if (loading) {
        return <CircularProgress />;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const formatTime = () => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <TopBar />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1200px',height: '100vh', margin: '0 auto' }}>
                    <Card raised sx={{ mb: 4, width: '100%', alignItems: 'center' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: '1.2rem' }}>
                            <Icon sx={{ color: '#FFD700', mr: 1 }}>
                                <TimerIcon />
                            </Icon>
                                Timp ramas: {formatTime()}</Typography>
                            <Typography sx={{ fontSize: '1rem', textAlign:'end',mb: 2 }}>Intrebari Ramase: {questions.length - currentQuestionIndex - 1} <br />
                                Intrebari Corecte: {correctAnswers} <br />
                                Intrebari Gresite: {incorrectAnswers} <br />
                            </Typography>
                            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3, width: '97%' }}>
                            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 2, padding: 2 }}>
                                Intrebarea {currentQuestionIndex + 1} din {questions.length}
                            </Typography>
                            <Typography sx={{ fontSize: '1.5rem' }}>{currentQuestion.question}</Typography>
                            <RadioGroup
                                name="quiz-options"
                                value={selectedOption}
                                onChange={handleOptionChange}
                            >
                                <FormControlLabel value="a" control={<Radio />} label={currentQuestion.answer_a} />
                                <FormControlLabel value="b" control={<Radio />} label={currentQuestion.answer_b} />
                                <FormControlLabel value="c" control={<Radio />} label={currentQuestion.answer_c} />
                            </RadioGroup>
                        </Paper>
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ width: 200,height: 50, mr: 2 }}
                                onClick={handleNextQuestion}
                                disabled={!selectedOption}
                                
                            >
                                Trimite Raspunsul
                            </Button>
                        </Box>
                    </Card>
                </Box>
            </LocalizationProvider>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Quiz Result</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default QuizComponent;
