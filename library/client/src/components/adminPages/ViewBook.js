import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getBooks, deleteBook} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

class ViewBook extends Component{

    constructor(props){
        super(props);
        this.state ={
            search: ''
        }
    }

    updateSearch(event){

        this.setState({
            search: event.target.value.toLowerCase().substr(0,20)
        });
    }

    deleteBook(event,_id,book_name) {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to delete  ${book_name} book permanently?`,
            )
        ){   
            this.props.deleteBook(_id);
       } 
    }

    componentDidMount(){
        this.props.getBooks();
    }

    //   className={ el.status ? "fas fa-eye activeElement" : "fas fa-eye-slash activeElement" }

    handleClick(_id){
        this.props.getBooks(_id);
        
        this.setState({ 
            status : !this.state.status
        })

        // axios.put('/api/library/updateBook/'+ _id, !this.state.status)
        //     .then(res => console.log(res.data));
        
        // this.props.history.push('/book_manage');
        // console.log(!this.state.status)  
    }

    render() {
        const viewBook = this.props.books.viewBook.filter(
            (el) =>
            {
                // return Object.keys(el).some(key =>
                //     el[key].toString().toLowerCase().includes(this.state.search.toLowerCase())
                //   );
                return Object.keys(el).some(key => el[key].toString().toLowerCase().search(this.state.search.toLowerCase()) !== -1);
            }
        );


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
                                {/* <th>Book Id</th> */}
                                <th>Book Name</th>
                                <th>Book Category</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr> 
                        </thead>
                        <tbody>
                        
                            {viewBook.map((el) => {
                            return  <tr className="firstrow" key={el._id}>
                                        <td className="sno"></td>
                                        {/* <td>{el.book_id}</td> */}
                                        <td>{el.book_name.charAt(0).toUpperCase() + el.book_name.substring(1)}</td>
                                        <td>{el.book_cat.charAt(0).toUpperCase() + el.book_cat.substring(1)}</td>
                                        <td>{el.quantity}</td>
                                        <td><Link   to={"/editBook/" + el._id} 
                                                    className="far fa-edit editBook">
                                            </Link>
                                            <Link to='/book_manage' 
                                                onClick={ (event) => this.deleteBook(event,el._id, el.book_name) } 
                                                className="far fa-trash-alt deleteBook">
                                            </Link>
                                            <Link to={"/viewBookDetail/" + el._id} 
                                                className="fas fa-address-book detailBook">
                                            </Link>
                                            
                                            <button
                                                onClick={() => this.handleClick(el._id,el.status)}
                                                // className={el.status === true ? console.log('active'): console.log('inactive')}
                                            >
                                            </button>                                            
                            
                                        </td>
                                    </tr>
                            })}
                                        
                        </tbody>
                    </table>
                </div>


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
    {getBooks,deleteBook}
  )(withRouter(ViewBook));