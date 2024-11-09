import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import DoTest from './dotest';
import TestTable from './testtable';
import { fetchTestResultById } from '@/api/testforstu.api';
import './index.less';
import { TestResult } from '../../interface/testforstu';

const Taketest: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [testKey, setTestKey] = useState('');
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [tests, setTests] = useState<TestResult[]>([]);
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTestResultById(1); // Replace 1 with the appropriate id
        console.log('Fetched test result:', data); // Log the fetched test result
        setTests(Array.isArray(data) ? data : [data]);
      } catch (error) {
        message.error('Error fetching tests');
      }
    };

    fetchData();
  }, []);

  const handleTakeTest = async (record: TestResult) => {
    console.log('handleTakeTest called with record:', record); // Log when handleTakeTest is called
    try {
      const data = await fetchTestResultById(record.testId);
      console.log('Fetched test details:', data); // Log the fetched test details
      setSelectedTest(record);
      setShowInput(true);
    } catch (error) {
      message.error('Error fetching test details');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestKey(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const passcode = "1234";
      console.log(`Entered passcode: ${testKey}, Expected passcode: ${passcode}`);
      if (selectedTest && passcode === testKey) {
        setIsKeyValid(true);
        console.log('Test key is valid'); // Log when the test key is valid
      } else {
        alert('Invalid test key');
      }
    } catch (error) {
      message.error('Error validating test key');
    }
  };

  if (isKeyValid) {
    console.log("valid",selectedTest); // Log when rendering the DoTest component

    return selectedTest ? <DoTest testId={selectedTest?.testId?.toString() || ''} /> : null;
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