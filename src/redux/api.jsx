import axios from 'axios';
const baseurl =  "https://todo-9331.onrender.com"  //"http://localhost:8001"

export const fetchTodoList = async () => {
  try {
    const response = await axios.get(`${baseurl}/getToDoList`);
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching todo list:', error);
  }
};

export const addTodoItem = async (title, description) => {
  try {
    const response = await axios.post(`${baseurl}/addToDoList`, { title, description, });
    return response.data;
  } catch (error) {
    throw new Error('Error adding todo item:', error);
  }
};

export const deleteTodoItem = async (id) => {
  try {
    await axios.delete(`${baseurl}/delete/${id}`);
    return id;
  } catch (error) {
    throw new Error('Error deleting todo item:', error);
  }
};

export const updateTodoItem = async (id, completed) => {
  try {
    const response = await axios.put(`${baseurl}/update/${id}`, { completed });
    return response.data;
  } catch (error) {
    throw new Error('Error updating todo item:', error);
  }
};
