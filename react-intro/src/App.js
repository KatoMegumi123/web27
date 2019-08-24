import React from 'react';
import logo from './logo.svg';
import TodoItem from './components/TodoItem'
import './App.css';

// const App = (props)=>{
//   return(
//   <div>Hello world</div>
//   );
// };

class App extends React.Component {
  state = {
    inputValue: '',
    todos: [], //{content: '',finished: boolean}
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      content: this.state.inputValue,
      finished: false,
    };
    this.setState({
      inputValue: '',
      todos: [...this.state.todos, newTodo]
    });
  };

  handleInputChange = (event)=>{
    const newValue = event.target.value;
    this.setState({
      inputValue: newValue,
    });
  };

  updateTodoItem = (itemIndex) =>{
    this.setState({
      todos: this.state.todos.map((value,index)=>{
        if(index===itemIndex)
          {
            return {
              ...value,
              finished: true,
            }
          }
        else return value;
      })
    })
  };

  deleteTodoItem = (itemIndex) =>{
    this.setState({
      todos: this.state.todos.filter((value,index)=>{
        return index!==itemIndex;
      })
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='result'>
          {this.state.todos.map((value,index)=>{
            return (
              <TodoItem value={value.content} finished={value.finished} key={index} updateTodoItem={this.updateTodoItem} itemIndex={index} deleteTodoItem={this.deleteTodoItem} />
            );
          })}
        </div>
        <div className='todo-form' onSubmit={this.handleSubmit}>
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <label htmlFor="input-to-do" className="sr-only">To do</label>
              <input
                type="text"
                className="form-control" 
                id="input-to-do" 
                placeholder="What to do..." 
                value={this.state.inputValue} 
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Add this sh*t</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
