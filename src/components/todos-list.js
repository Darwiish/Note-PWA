import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    this.setState({});
  }

  onDelete(id) {
    console.log(id)

    axios
      .delete("http://localhost:4000/api/delete/" + id)
      .then(response => {
        console.log('Success')
        this.setState({
          delete: response.data.delete
        });
        this.props.history.push("/");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
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
          <tbody>
            {this.state.todos.map(item => (
              <tr key={item._id}>
                <td className={item.todo_completed ? "completed" : ""}>
                  {item.todo_description}
                </td>
                <td className={item.todo_completed ? "completed" : ""}>
                  {item.todo_responsible}
                </td>
                <td className={item.todo_completed ? "completed" : ""}>
                  {item.todo_priority}
                </td>
                <td>{item.endDate}</td>
                <td>
                  <Link to={"/edit/" + item._id}>
                    <button className="btn btn-primary ">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={this.onDelete(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TodoList;
