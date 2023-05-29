import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

const StepFunctionsComponent = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [output, setOutput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [executionArn, setExecutionArn] = useState('');

  const startStepFunctions = async () => {
    try {
      const response = await axios.get('http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/run-scenario/');
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
      const response = await axios.get('http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/get-tasks/', {
        params: {
          execution_arn: executionArn,
        },
      });
      const formattedTasks = response.data.tasks.map((task) => {
        const timestamp = new Date(task.timestamp);
        const formattedTimestamp = `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} - ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
        
        return {
          ...task,
          timestamp: formattedTimestamp,
        };
      });
      setTasks(formattedTasks);
      
      console.log(response.data.tasks)
    } catch (error) {
      console.error('Error getting tasks:', error);
    }
  };


  function handleContinue(){
    console.log("continue");
    setShouldRedirect(true);
  }
  if(shouldRedirect){
    return <Redirect to="/" />;

}

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center my-5">
        <button className="btn mr-3" onClick={startStepFunctions} disabled={executionArn !== ''}>
          Confirm
        </button>
        <button className="btn" onClick={getTasks} disabled={executionArn === ''}>
          Check Robot Status
        </button>
        
      </div>
  
      <div className="my-5">
        <h2 className="text-2xl font-bold">Step Functions Output</h2>
        <p>{output}</p>
      </div>
  
      <div className="my-5">
        <h2 className="text-2xl font-bold">Executed and Current Tasks</h2>
        <ul className="list-disc pl-6">
          {tasks.map((task) => (
            <li key={task.name} className="my-2">
              <div>
                <h3 className="text-lg font-bold">{task.name}</h3>
                <p className="text-base">{task.output}</p>
                <p className="text-sm">{task.timestamp}</p>

              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn" onClick={handleContinue}>
          Finish
        </button>
    </div>
  );
  
  
};

export default StepFunctionsComponent;
