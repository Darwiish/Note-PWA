import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

class DeleteTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { delete: "" };

    this.onChangeDelete = this.onChangeDelete.bind(this);
  }

  onChangeDelete(e) {
    this.setState({
      delete: e.target.value
    });
  }
  
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      delete: this.props.match.params.id
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/delete/:id" + this.props.match.params.id)
      .then(response => {
        this.setState({
          delete: response.data.delete
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return <div>The delete todo is here baby</div>;
  }
}

export default DeleteTodo;
