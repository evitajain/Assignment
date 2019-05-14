import React from 'react';
import './App.css';

class ToDo extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ToDos: [],
      check: "false",
      index: '',
      check1: false,
      strike: 'none'
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
      index: index,
      check: true
    });
    localStorage.setItem('ToDos', JSON.stringify(edit_list));
  }

  update(e){
    e.preventDefault();
    const {index} = this.state; 
    let updatedTitle = this.refs.updatedNotes.value;
    let update_list = JSON.parse(localStorage.getItem('ToDos'));
    update_list[index] = updatedTitle; 
    const update_value = localStorage.setItem('ToDos', JSON.stringify(update_list));
    this.refs.todoForm.reset();
  }

  // strike(){
  //   if(this.state.check1 = 'true'){
  //     alert('hello');
  //     let ele = document.getElementsByTagName('label')
      
  //   }
  // }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // onCheck(index){ 
  //   console.log(index);
  //   if (this.state.strike   === 'none'){
  //     this.setState({strike: 'line-through'})
  //   } else {
  //     this.setState({strike: 'none'})
  //   }
  //   this.setState({check1: !this.state.check1})
  // }

  onCheck(index, event){ 
    debugger
    const {ToDos} = this.state;
    const target = event.target.checked;
    ToDos.map((data,i) => {
      if(i === index) {
        this.setState({
            check1: true
          });
      }else{
        this.setState({
          check1: false
        });
      }
     });
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    //const name = target.name;

    // 
    // if (this.state.strike   === 'none'){
    //   this.setState({strike: 'line-through'})
    // } else {
    //   this.setState({strike: 'none'})
    // }
    // this.setState({check1: !this.state.check1})
  }

  render(){
    let index = this.state.index;
    const strike = {
      textDecoration: this.state.strike,
    }
    return(
      <div className="container-fluid">
        <div className="heading text-center">
          <h1>To-Do Application</h1>
        </div>
        <form ref="todoForm">
          <div className="text-center">
            {
              this.state.check == "false" ? 
              <div>
                <input type="text" placeholder=" Notes.." className="input-box" name="notes-title" ref="notes" />
                <button value="add" className="btn btn-primary" onClick={this.add.bind(this)}>Add Task</button>
                <button value="view" className="btn btn-success" onClick={this.view.bind(this)}>View</button>
              </div>:
              <div>
                <input type="text" className="edit-inputBox" ref="updatedNotes" defaultValue={this.state.ToDos[index]} onChange={this.handleChange} />
                <button value="edit" className="btn btn-success fa-edit" onClick={this.update.bind(this)}>Edited Task</button>
                <button value="view" className="btn btn-success fa-view" onClick={this.view.bind(this)}>View</button>
              </div>
            }
            {this.state.ToDos && this.state.ToDos.length ?
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Task Done</th>
                        <th>List Of Item</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ToDos.map((todo, index) =>
                        <tr key={index}>
                          <td className="form-check checkbox">
                            <input type="checkbox" name="check1" checked={this.state.check1 ? false: true} onChange={this.onCheck.bind(this, index)} />
                            {/* <input className="form-check-input checkbox-input" id="check1" type="checkbox" value={this.state.check1 ? true : false} onClick={() => this.strike()}/> */}
                          </td>
                          <td>
                            <label style= {strike}>{todo}</label>
                          </td>
                          <td>
                            <button value="edit" onClick={this.edit.bind(this)} className="btn btn-success" data-key={index}>Edit</button>
                            <button value="delete" onClick={this.delete.bind(this)} className="btn btn-danger" data-key={index}>Delete</button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  : <h2 className="list-available">Click on the View Button to view the list of Notes..</h2>
                }
          </div>
        </form>
      </div>
    )}
}

export default ToDo;
