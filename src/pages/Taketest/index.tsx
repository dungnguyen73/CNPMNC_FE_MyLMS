import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import DoTest from './dotest';
import TestTable from './testtable';
import { fetchTests } from '@/api/test';
import './index.less';
import { Test } from '../../interface/test';

const Taketest: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [testKey, setTestKey] = useState('');
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTests();
        setTests(data);
      } catch (error) {
        message.error('Error fetching tests');
      }
    };

    fetchData();
  }, []);

  const handleTakeTest = (test: Test) => {
    setSelectedTest(test);
    setShowInput(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestKey(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedTest && selectedTest.passcode === testKey) {
      setIsKeyValid(true);
    } else {
      alert('Invalid test key');
    }
  };

  if (isKeyValid) {
    // Navigate to the test page or render the test component
    return selectedTest ? <DoTest testId={selectedTest.id.toString()} /> : null;
  }

  return (
    <div>
      {showInput ? (
        <div className="container">
          <Input
            placeholder="Enter test key"
            className="input-field"
            value={testKey}
            onChange={handleInputChange}
          />
          <Button type="primary" className="submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      ) : (
        <TestTable data={tests} onTakeTest={handleTakeTest} />
      )}
    </div>
  );
};

export default Taketest;