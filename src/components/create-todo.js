import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
      startDate: new Date(),
      endDate: new Date()
    };
  }

  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value
    });
  }

  onChangeTodoResponsible(e) {
    this.setState({
      todo_responsible: e.target.value
    });
  }

  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value
    });
  }
  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }
  calculateDaysLeft(startDate, endDate) {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);

    return endDate.diff(startDate, "days");
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.todo_description}`);
    console.log(`Todo Responsible: ${this.state.todo_responsible}`);
    console.log(`Todo Priority: ${this.state.todo_priority}`);
    console.log(`Todo StartDate: ${this.state.startDate}`);
    console.log(`Todo EndDate: ${this.state.endDate}`);

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    axios
      .post("http://localhost:4000/api/todos/add", newTodo)
      .then(res => console.log(res.data));

    this.setState({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
      startDate: new Date(),
      endDate: new Date()
    });
  }

  render() {
    const { startDate, endDate } = this.state;
    const daysLeft = this.calculateDaysLeft(startDate, endDate);
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control col-md-6"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              text="textarea"
              className="form-control col-md-6"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === "Low"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === "Medium"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === "High"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <b>Start Date</b>:
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChangeStart}
          />
          &nbsp;&nbsp;&nbsp;
          <b>End Date</b>:
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
          <div className="amount">{daysLeft}</div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTodo;
