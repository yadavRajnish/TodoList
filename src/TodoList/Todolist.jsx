import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo, updateTodoAndRefresh } from '../redux/todoSlice';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function Todolist() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    dispatch(addTodo({ title, description }));
    setTitle('');
    setDescription('');
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleted = (id) => {
    dispatch(updateTodoAndRefresh({
      id,
      completed: true
    })).then(() => {
      dispatch(fetchTodos());
    }).catch(error => {
      console.error('Error updating and refreshing todo:', error);
    });
  };

  return (
    <>
      <h2 style={{color: 'white'}}> My ToDos</h2>

      <Form style={{ color: 'black', backgroundColor:"whitesmoke" ,  padding: '20px', textAlign: 'center',borderRadius:"10px"  }} onSubmit={handleSubmit}>
        <div style={{}} >
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
        </div>
        <Button type="submit" style={{backgroundColor:"green"}}>
          Add Todo
        </Button>
      </Form>

      <div>
        {todos.map((todo) => (
          <Card key={todo._id} style={{ marginTop: '20px',borderRadius:"10px" }}>
            <Card.Body style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:"whitesmoke" ,borderRadius:"10px" }}>
              <div>
                {todo.completed ? (
                  <>
                    <del>
                      <Card.Title>{todo.title}</Card.Title>
                      <Card.Text>{todo.description}</Card.Text>
                    </del>
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
                    <Button variant="danger" onClick={() => handleDelete(todo._id)} style={{ margin: '0 10px',backgroundColor:"red" }}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleCompleted(todo._id)} style={{ margin: '0 10px' }}>
                      Completed
                    </Button>

                    <Button onClick={() => handleDelete(todo._id)} style={{ margin: '0 10px',backgroundColor:"red" }}>
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
