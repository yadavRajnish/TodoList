import axios from 'axios';
const render = "https://todolist-ze87.onrender.com";
export const fetchTodoList = async () => {
  try {
    const response = await axios.get('http://localhost:8001/getToDoList');
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching todo list:', error);
  }
};

export const addTodoItem = async (title, description) => {
  try {
    const response = await axios.post('http://localhost:8001/addToDoList', { title, description });
    return response.data;
  } catch (error) {
    throw new Error('Error adding todo item:', error);
  }
};

export const deleteTodoItem = async (id) => {
  try {
    await axios.delete(`http://localhost:8001/delete/${id}`);
    return id;
  } catch (error) {
    throw new Error('Error deleting todo item:', error);
  }
};

export const updateTodoItem = async (id, title, description) => {
  try {
    const response = await axios.put(`http://localhost:8001/update/${id}`, { title, description });
    return response.data;
  } catch (error) {
    throw new Error('Error updating todo item:', error);
  }
};
