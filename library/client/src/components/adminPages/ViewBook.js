import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditBook from './EditBook';

class ViewBook extends Component{

    constructor(props){
        super(props);
        this.state ={
            search: '',
            values: [],
            bookvalues: []
        }
    }

    updateSearch(event){
        this.setState({
            search: event.target.value.substr(0,20)
        });
    }

    deleteBook(_id,book_name) { // <-- declare id parameter
        if (
            window.confirm(
                `Do you want to delete  ${book_name} book permanently?`,
            )
        ){   
        axios.delete(`/api/library/deleteBook/${_id}`) // <-- remove ;
        .then(res => {
            let delbook = res.data;
            this.setState({ bookvalues:delbook });
        })
       } 
    }

    componentDidMount(){
        axios
            .get('/api/library/getbook')
            .then(res => 
               {
                    let getbook = res.data;
                    this.setState({values: getbook })
               }
            )
            .catch(err => console.log(err.res));
    }

    render() {
        
        const values = this.state.values.filter(
            (el) =>{
                return el.book_name.indexOf(this.state.search) !== -1;
            }
        )

        return(

                <div>
                    
                    <input type="text"
                    className="float-right searchBox"
                    placeholder="Search for..."
                    value={this.state.search}
                    onChange = {this.updateSearch.bind(this)}
                    />
                        
                    <table className="table table-hover table-bordered view-book">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Book Id</th>
                                <th>Book Name</th>
                                <th>Action</th>
                            </tr> 
                        </thead>
                        <tbody>
                        
                            {values.map(el => {
                            return  <tr className="firstrow" key={el.book_id}>
                                        <td className="sno"></td>
                                        <td>{el.book_id}</td>
                                        <td>{el.book_name}</td>
                                        <td><Link   to="/editBook" 
                                                    className="far fa-edit editBook"
                                                    data-toggle="modal" 
                                                    data-target="#editBook">
                                            </Link>
                                            <Link to='/book_manage' 
                                                onClick={ () => this.deleteBook(el._id, el.book_name) } 
                                                className="far fa-trash-alt deleteBook">
                                            </Link>
                                            <Link to="/" className="fas fa-address-book detailBook"></Link>
                                
                                        </td>
                                    </tr>
                            })}
                                        
                        </tbody>
                    </table>
                            <EditBook/>
                </div>


        )
    }
}

export default ViewBook;