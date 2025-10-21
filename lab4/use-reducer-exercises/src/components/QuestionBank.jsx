import React, { useReducer, useState, useEffect } from "react";
import { Button, Container, Card, ProgressBar, Badge } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
  },
];

function initState() {
  const savedHigh = Number(localStorage.getItem("quiz_high_score") || 0);
  return {
    questions: QUESTIONS,
    currentQuestion: 0,
    selectedOption: "",
    answered: false,
    feedback: null,
    isCorrect: false,
    score: 0,
    showScore: false,
    highScore: savedHigh,
  };
}

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION": {
      if (state.answered || state.showScore) return state;
      const option = action.payload;
      const correct = state.questions[state.currentQuestion].answer;
      const isCorrect = option === correct;
      return {
        ...state,
        selectedOption: option,
        answered: true,
        feedback: isCorrect
          ? "✅ Correct! 🎉"
          : `❌ Incorrect! The correct answer is: ${correct}`,
        isCorrect: isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }
    case "NEXT_QUESTION": {
      const last = state.currentQuestion === state.questions.length - 1;
      if (last) {
        const newHigh = Math.max(state.highScore, state.score);
        localStorage.setItem("quiz_high_score", String(newHigh));
        return { ...state, showScore: true, highScore: newHigh };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        answered: false,
        feedback: null,
        isCorrect: false,
      };
    }
    case "TIMEOUT": {
      // Move to next question without changing score; persist high score if last
      const last = state.currentQuestion === state.questions.length - 1;
      if (last) {
        const newHigh = Math.max(state.highScore, state.score);
        localStorage.setItem("quiz_high_score", String(newHigh));
        return { ...state, showScore: true, highScore: newHigh };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        answered: false,
        feedback: null,
        isCorrect: false,
      };
    }
    case "RESTART_QUIZ": {
      const keepHigh = state.highScore;
      return { ...initState(), highScore: keepHigh };
    }
    default:
      return state;
  }
}

export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, undefined, initState);
  const {
    questions, currentQuestion, selectedOption,
    answered, feedback, score, showScore, highScore,
    isCorrect,
  } = state;

  // Timer for each question
  const [timeLeft, setTimeLeft] = useState(10);

  // Reset timer when question changes or when user answered
  useEffect(() => {
    setTimeLeft(10);
  }, [currentQuestion, answered, showScore]);

  // Countdown effect
  useEffect(() => {
    if (answered || showScore) return; // pause when answered or finished
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // timeout: dispatch
          dispatch({ type: "TIMEOUT" });
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [answered, showScore, currentQuestion]);

  const total = questions.length;
  const q = questions[currentQuestion];

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        {!showScore ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Quiz</h5>
              <div>
                <Badge bg="secondary">{currentQuestion + 1} / {total}</Badge>
                <span style={{ marginLeft: 12, fontWeight: 600 }}>
                  Time left: <span style={{ color: timeLeft < 5 ? 'red' : '#333' }}>{timeLeft}s</span>
                </span>
              </div>
            </div>
            <ProgressBar
              now={((currentQuestion + 1) / total) * 100}
              className="mb-3"
              style={{ height: 8 }}
            />

            <h4 className="mb-3">
              Question {q.id}:<br />{q.question}
            </h4>

            <div className="mt-2">
              {q.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const variant = isSelected ? "success" : "outline-secondary";
                return (
                  <Button
                    key={idx}
                    variant={variant}
                    className="m-2"
                    onClick={() => dispatch({ type: "SELECT_OPTION", payload: option })}
                    disabled={answered}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {feedback && (
              <Card className="mt-3">
                <Card.Body className="py-2 d-flex align-items-center" style={{ fontWeight: 600 }}>
                  <span style={{ marginRight: 8 }}>
                    {isCorrect ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}
                  </span>
                  <span>{feedback}</span>
                </Card.Body>
              </Card>
            )}

            <div className="mt-3">
              <Button
                variant="primary"
                onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                disabled={!answered}
              >
                {currentQuestion === total - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </>
            ) : (
          <div className="text-center">
            <h2 className="mb-3">Your Score: {score} / {total}</h2>
            <p className="mb-4" style={{ fontSize: 18 }}>
              High Score: <strong style={{ color: "#0d6efd" }}>{highScore}</strong>
            </p>
            <Button variant="primary" onClick={() => dispatch({ type: "RESTART_QUIZ" })}>
              Restart Quiz
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}

