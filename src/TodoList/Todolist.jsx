import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../redux/todoSlice';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function Todolist() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    if (editMode) {
      dispatch(updateTodo({ id: editTodoId, title, description }));
    } else {
      dispatch(addTodo({ title, description }));
    }
    setTitle('');
    setDescription('');
    setEditMode(false);
    setEditTodoId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    setTitle(todoToEdit.title);
    setDescription(todoToEdit.description);
    setEditMode(true);
    setEditTodoId(id);
  };

  const handleCompleted = (id) => {
    // Find the todo to complete
    const todoToComplete = todos.find((todo) => todo._id === id);

    // Only dispatch updateTodo action if the todo is not already completed
    if (!todoToComplete.completed) {
      dispatch(updateTodo({
        id: todoToComplete._id,
        title: todoToComplete.title,
        description: todoToComplete.description,
        completed: true
      }));
    }
  };

  return (
    <>
      <h2 style={{}}>ToDo List</h2>

      <Form style={{ color: 'white', backgroundColor: 'rgb(39, 37, 37)', padding: '20px', textAlign: 'center' }} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Title</Form.Label>
            <Form.Control required type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Description</Form.Label>
            <Form.Control required type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
        </Row>
        <Button type="submit" style={{ textAlign: 'center' }}>
          {editMode ? 'Update Todo' : 'Add Todo'}
        </Button>
      </Form>

      <div>
        {todos.map((todo) => (
          <Card key={todo._id} style={{ marginTop: '20px' }}>
            <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {todo.completed ? (
                  <> 
                    <del>
                      <Card.Title>{todo.title}</Card.Title> 
                    </del>
                    <Card.Text>{todo.description}</Card.Text>
                  </>
                ) : (
                  <>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                  </>
                )}
              </div>
              <div>
                {todo.completed ? (
                  <>
                    <Button variant="danger" onClick={() => handleDelete(todo._id)} style={{ margin: '0 10px' }}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="success" onClick={() => handleCompleted(todo._id)} style={{ margin: '0 10px' }}>
                      Completed
                    </Button>
                    <Button variant="primary" onClick={() => handleEdit(todo._id)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(todo._id)} style={{ margin: '0 10px' }}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Todolist;
