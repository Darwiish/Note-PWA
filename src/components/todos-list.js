import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_priority}
    </td>
    <td>{props.todo.endDate}</td>
    <td>
      <Link to={"/edit/" + props.todo._id}>
        <button className="btn btn-primary ">Edit</button>
      </Link>
    </td>
     <td>
      <button className="btn btn-danger">Delete</button>
    </td> 
  </tr>
);

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };

    this.onChangeDelete = this.onChangeDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeDelete(e) {
    this.setState({
      delete: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
    });
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/delete/:id" + this.props.match.params.id)
      .then(response => {
        this.setState({
        delete: response.data.delete
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/api/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  todoList() {
    return this.state.todos.map(function(currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }
  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>DateTime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}

export default TodoList;
