import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getBookCat} from '../../actions/authentication';

class EditBook extends Component{

    constructor(props){
        super(props);
        this.state={
            book_id: "",
            book_name: "",
            author_name: "",
            book_cat: "",
            quantity: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value 
        });
    };
    
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        this.props.getBookCat();

        axios.get('/api/library/editBook/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                  book_id: res.data.book_id, 
                  book_name: res.data.book_name,
                  author_name: res.data.author_name,
                  book_cat: res.data.book_cat,
                  quantity: res.data.quantity,
                  status: res.data.status
                });
            })
            .catch((err) =>{
                console.log(err);
            })
      }

    onSubmit(e) {
        e.preventDefault();
        const viewBook = {
            book_id: this.state.book_id,
            book_name: this.state.book_name,
            author_name: this.state.author_name,
            book_cat: this.state.book_cat,
            quantity: this.state.quantity,
            status: this.state.status
        };
        axios.put('/api/library/updateBook/'+this.props.match.params.id, viewBook)
            .then(res => console.log(res.data));
        
        this.props.history.push('/book_manage');
      }
     

    render(){

        const {schema} = this.props.books;

        return(
           
                <form onSubmit={this.onSubmit}>
                    <h1>Edit BOOK</h1>
                    <div className="form-group">
                        <input type="number"
                            min="1" 
                            onChange={this.onChange}
                            className="form-control" 
                            id="book_id" 
                            placeholder="Book Id" 
                            name="book_id"
                            value={this.state.book_id}
                            />
                    </div>
                    <div className="form-group">
                        <input type="text" 
                            onChange={this.onChange}
                            className="form-control" 
                            id="book_name" 
                            placeholder="Book Name" 
                            name="book_name"
                            value={this.state.book_name}
                            />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            onChange={this.onChange} 
                            className="form-control" 
                            id="author_name" 
                            placeholder="Author Name" 
                            name="author_name"
                            value={this.state.author_name}
                            />
                    </div>
                    <div className="form-group">
                        <select type="text" 
                            onChange={this.onChange}
                            className="form-control" 
                            id="book_cat" 
                            placeholder="Book Category" 
                            name="book_cat"
                            value={this.state.book_cat}
                        >
                        
                            {
                                schema.length > 0 && schema.map((el) =>{
                                return <option key={el}>{el}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="number" 
                            onChange={this.onChange} 
                            min="1" 
                            className="form-control" 
                            id="quantity" 
                            placeholder="Quantity" 
                            name="quantity"
                            value={this.state.quantity}
                            />
                    </div>
                    <div className="form-group">
                        <select type="text" 
                            onChange={this.onChange}
                            className="form-control" 
                            id="status"
                            name="status"
                            value={this.state.status}
                        >
                            <option>true</option> 
                            <option>false</option>  
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Update Book</button>
                </form>
                           
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    {getBookCat}
  )(withRouter(EditBook));