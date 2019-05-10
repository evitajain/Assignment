import React from 'react';
import './App.css';

class ToDo extends React.Component{

  constructor(){
    super();
    this.state = {
      ToDos: [],
      check: "false",
      value: '',
      index: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  add(event){
    event.preventDefault();
    var title = this.refs.notes.value;
    if(localStorage.getItem('ToDos') == null){
      var ToDos = [];
      ToDos.push(title);
      localStorage.setItem('ToDos', JSON.stringify(ToDos));
      this.refs.todoForm.reset();
    }else{
      var ToDos = JSON.parse(localStorage.getItem('ToDos'));
      ToDos.push(title);
      localStorage.setItem('ToDos', JSON.stringify(ToDos));
      this.refs.todoForm.reset();
    }
    
  }

  view(event){
    event.preventDefault();
    this.setState({
      ToDos: JSON.parse(localStorage.getItem('ToDos'))
    });
  }

  delete(e) {
    e.preventDefault();
    var index_del = e.target.getAttribute('data-key');
      var list = JSON.parse(localStorage.getItem('ToDos'));
      console.log(list);
      list.splice(index_del,1);
      this.setState({
        ToDos: list
      });
      localStorage.setItem('ToDos', JSON.stringify(list));
  }

  edit(e){
    e.preventDefault();
    var index = e.target.getAttribute('data-key');
    var edit_list = JSON.parse(localStorage.getItem('ToDos'));
    
    this.setState({
      ToDos: edit_list,
      check: true
    });
    localStorage.setItem('ToDos', JSON.stringify(edit_list));
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return(
      <div className="container-fluid">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className="heading text-center">
          <h1>To-Do Application</h1>
        </div>
        <form ref="todoForm">
          <div className="text-center">
            {
              this.state.check == "false" ? <div><input type="text" name = "toDo-name" ref="notes"/>
              <button value="add" onClick={this.add.bind(this)}>Add</button></div>:
              <input type="text" name="updates" value={this.state.ToDos} onChange={this.handleChange} />
            }
            <button value="view" onClick={this.view.bind(this)}>View</button>
            <ul>
              {this.state.ToDos.map(function(todo,index){
              return(
              <li key={index}>{todo}<button value="edit" onClick={this.edit.bind(this)} data-key={index}>Edit</button> 
              <button value="delete" onClick={this.delete.bind(this)} data-key={index}>X</button></li>
              );
              }, this)}
            </ul>
          </div>
        </form>
      </div>
    )}
}

export default ToDo;
