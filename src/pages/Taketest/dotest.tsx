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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await fetchRecords(testId);
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
    setSubmitted(true);
  };

  return (
    <div className="dotest-container">
      {questions.map((question) => (
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
      <Button type="primary" className="submit-button" onClick={handleSubmit}>
        Submit
      </Button>
      {submitted && (
        <div className="results-container">
          <h2>Results:</h2>
          {questions.map((question) => (
            <div key={question.Id} className="result-item">
              <p>
                {question.question_text} - Your answer: {answers[question.Id]} - Correct answer: {question.correct_ans}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoTest;