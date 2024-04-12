import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import * as UserServices from '../../services/UserServices';
import CardTaskComponent from '../../components/CardTaskComponent/CardTaskComponent';

const TodoPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userTaskDone, setUserTaskDone] = useState([]);
  const [userTaskNotDone, setUserTaskNotDone] = useState([])
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
    console.log('arr_old',userTaskNotDone)
    //lấy vị trí click
    const indexToRemove = userTaskNotDone.findIndex(task => task.id === idTask);
    //lấy dữ liệu tại vị trí click
    const getTaskData = userTaskNotDone[indexToRemove];
    //cập nhật lại trạng thái
    getTaskData.completed = true
  
    //tạo bản sao của chưa hoàn thành
    const newUserTaskNotDone = [...userTaskNotDone];
    
    // bỏ phần tử đã chọn ra khỏi chưa hoàn thành
    newUserTaskNotDone.splice(indexToRemove, 1);
    
    //thêm dữ liệu vào hoàn thành
    const newUserTaskDone = [getTaskData, ...userTaskDone];

    //cập nhật lại ds chưa hoàn thành
    setUserTaskNotDone(newUserTaskNotDone);
    //cập nhật lại ds hoàn thành
    setUserTaskDone(newUserTaskDone)

    
  }


  useEffect(() => {
    fetchAllUser();
  }, []);




  useEffect(() => {
    if (!loading && !error) {
      setOptions(users.map((user) => ({ label: user.name, id: user.id })));
    }
  }, [users]);

  return (
    <div className='container mt-5'>
      <div>User</div> 
      <div className='p-3 border rounded' >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div style={{maxWidth: '500px'}}>
            <Select options={options} value={selectedOption} onChange={handleChange}/>
            </div>
          
        )}
      </div>
      <h4>Task</h4>
      <div className='p-3 border rounded' style={{ overflowY: 'auto', minHeight: '400px' }}>
    {userTaskNotDone.length === 0 && userTaskDone.length === 0 ? (
        <div style={{textAlign:'center'}}>No data</div>
    ) : (
        <>
            {userTaskNotDone.map((Task) => (
                <CardTaskComponent
                    key={Task.id}
                    name={Task.title}
                    namebtn={Task.id}
                    completed={Task.completed}
                    onClick={() => fetchDoneTask(Task.id)}
                />
            ))}
            {userTaskDone.map((Task) => (
                <CardTaskComponent
                    key={Task.id}
                    name={Task.title}
                    namebtn={Task.id}
                    completed={Task.completed}
                />
            ))}
        </>
    )}
</div>

      <div className='container mt-5'>
        <h4>Done {userTaskDone.length}/{userTaskDone.length+userTaskNotDone.length} Tasks</h4>
        </div>
    </div>
  );
};

export default TodoPage;