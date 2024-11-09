import React, { useState, useEffect } from 'react';
import { Button, Radio, message } from 'antd';
import './dotest.less';
import { fetchRecords } from '@/api/questionintest';
import { Question } from '@/interface/question';

interface DoTestProps {
  testId: string;
}

const DoTest: React.FC<DoTestProps> = ({ testId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await fetchRecords();
        setQuestions(data);
      } catch (error) {
        message.error('Error fetching questions');
      }
    };

    fetchQuestions();
  }, [testId]);

  const handleOptionChange = (questionId: string, option: string) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      const correctAnswerValue = question[`choice_${question.correct_ans}` as keyof Question];
      if (answers[question.Id] === correctAnswerValue) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div className="dotest-container">
      {!submitted && questions.map((question) => (
        <div key={question.Id} className="question-container">
          <h3 className="question-title">{question.question_text}</h3>
          <Radio.Group
            className="radio-group"
            onChange={(e) => handleOptionChange(question.Id, e.target.value)}
            value={answers[question.Id]}
          >
            <Radio value={question.choice_A}>{question.choice_A}</Radio>
            <Radio value={question.choice_B}>{question.choice_B}</Radio>
            <Radio value={question.choice_C}>{question.choice_C}</Radio>
            <Radio value={question.choice_D}>{question.choice_D}</Radio>
          </Radio.Group>
        </div>
      ))}
      {!submitted && (
        <Button type="primary" className="submit-button" onClick={handleSubmit}>
          Submit
        </Button>
      )}
      {submitted && (
        <div className="results-container">
          <h2>Results:</h2>
          <p>Your score: {score} / {questions.length}</p>
          
        </div>
      )}
    </div>
  );
};

export default DoTest;