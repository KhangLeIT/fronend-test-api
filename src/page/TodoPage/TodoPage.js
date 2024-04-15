import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import * as UserServices from '../../services/UserServices';
import CardTaskComponent from '../../components/CardTaskComponent/CardTaskComponent';
import { Container, DivNoData, SelectDiv, StyledDiv, TaskContainer } from './style';



const TodoPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userTaskDone, setUserTaskDone] = useState([]);
  const [userTaskNotDone, setUserTaskNotDone] = useState([]);
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const userId = selectedOption ? selectedOption.id : null;
    fetchTaskUser(userId);
  };

  const fetchAllUser = async () => {
    try {
      const res = await UserServices.getAllUserSelected();
      setUsers(res);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchTaskUser = async (userId) => {
    try {
      const res = await UserServices.getTaskUser(userId);
      const TaskDone = res.filter(task => task.completed === true);
      const TaskNotDone = res.filter(task => task.completed === false);
      setUserTaskDone(TaskDone)
      setUserTaskNotDone(TaskNotDone)
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchDoneTask = async (idTask) => {
    const indexToRemove = userTaskNotDone.findIndex(task => task.id === idTask);
  
    const getTaskData = userTaskNotDone[indexToRemove];
    getTaskData.completed = true
    const newUserTaskNotDone = [...userTaskNotDone];
    newUserTaskNotDone.splice(indexToRemove, 1);
    const newUserTaskDone = [getTaskData, ...userTaskDone];
    setUserTaskNotDone(newUserTaskNotDone);
    setUserTaskDone(newUserTaskDone);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  useEffect(() => {
    
    setOptions(users.map((user) => ({ label: user.name, id: user.id })));
    
  }, [users]);

  return (
    <Container>
      <div>User</div>
      <StyledDiv>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <SelectDiv>
            <Select options={options} value={selectedOption} onChange={handleChange}/>
          </SelectDiv>
        )}
      </StyledDiv>
      <div>Tasks</div>
      <TaskContainer>
        {userTaskNotDone.length === 0 && userTaskDone.length === 0 ? (
          <DivNoData>No data</DivNoData>
        ) : (
          <>
            {userTaskNotDone.map((Task) => (
              <CardTaskComponent
                key={Task.id}
                name={Task.title}
                idTask={Task.id}
                completed={Task.completed}
                onComplete = {fetchDoneTask}
               
              />
            ))}
            {userTaskDone.map((Task) => (
              <CardTaskComponent
                key={Task.id}
                name={Task.title}
                idTask={Task.id}
                completed={Task.completed}
                onComplete = {fetchDoneTask}
              />
            ))}
          </>
        )}
      </TaskContainer>
      <div className='container mt-5'>
        <h4>Done {userTaskDone.length}/{userTaskDone.length+userTaskNotDone.length} tasks</h4>
      </div>
    </Container>
  );
};

export default TodoPage;
