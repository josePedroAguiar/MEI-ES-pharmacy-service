import React, { useState } from 'react';
import axios from 'axios';

const StepFunctionsComponent = () => {
  const [output, setOutput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [executionArn, setExecutionArn] = useState('');

  const startStepFunctions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/run-scenario/');
      console.log(response.data.execution_arn)
      setOutput(response.data.execution_arn);
      setExecutionArn(response.data.execution_arn);
      console.log(executionArn)
    } catch (error) {
      console.error('Error starting Step Functions:', error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/get-tasks/', {
        params: {
          execution_arn: executionArn,
        },
      });
      setTasks(response.data.tasks);
      console.log(response.data.tasks)
    } catch (error) {
      console.error('Error getting tasks:', error);
    }
  };

  return (
    <div>
      <button className="btn m-1" onClick={startStepFunctions} disabled={executionArn !== ''}>
        Start Step Functions
      </button>
      <button className="btn m-1" onClick={getTasks} disabled={executionArn === ''}>
        Get Tasks
      </button>

      <h2>Step Functions Output</h2>
      <p>{output}</p>

      <h2>Executed and Current Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.name}>
            Task: {task.name}, Output: {task.output}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepFunctionsComponent;
