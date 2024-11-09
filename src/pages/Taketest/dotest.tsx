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
        const data = await fetchRecords(123);
        setQuestions(data);
      } catch (error) {
        message.error('Error fetching questions');
      }
    };

    fetchQuestions();
  }, [testId]);

  const handleOptionChange = (questionId: number, option: string) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      //const correctAnswerValue = question[`choice_${question.correctAnswer}` as keyof Question];
      if (answers[question.id] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
    
    try {
      const response = await fetch('https://hoaqdzink.onrender.com/api/v1/student', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0bXRodWF0IiwiZXhwIjoxNzMxMjg3Njc4LCJpYXQiOjE3MzExMTQ4NzgsIlVzZXJpZCI6IlNUMjE5NDAxIiwic2NvcGUiOiJTVFVERU5UIn0.S_fB45viPjlX-1CqYC486qfmACc6Om4QufdAapFO3F4_VbvGCOnSLW8wHikCDKp1zaCMxBOaSj01U7JvmZ-mJA`,
        },
        body: JSON.stringify({
          userId: 'ST219401', // Replace with actual userId
          testId: testId,
          score: calculatedScore,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update score');
      }

      message.success('Score updated successfully');
    } catch (error) {
      message.error('Error updating score');
    }
    
  };

  return (
    <div className="dotest-container">
      {!submitted && questions.map((question) => (
        <div key={question.id} className="question-container">
          <h3 className="question-title">{question.questionText}</h3>
          <Radio.Group
            className="radio-group"
            onChange={(e) => handleOptionChange(question.id, e.target.value)}
            value={answers[question.id]}
          >
            <Radio value='A'>{question.choiceA}</Radio>
            <Radio value='B'>{question.choiceB}</Radio>
            <Radio value='C'>{question.choiceC}</Radio>
            <Radio value='D'>{question.choiceD}</Radio>
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