import { Component } from "react"


class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            book: '', 
            author:'',
            description: '' 
        };
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
      this.props.addBook({
            id:this.state.id,
            book: this.state.book,
             author: this.state.author,
            description: this.state.description
        });
        this.setState({
            id:'',
            book: '',
             author:'',
            description: ''
        });

       
        // const navigate = useNavigate();
        // navigate('/dashboard');
    };
    render(){
         return (
            <div>
                <div>Add Book</div>
                <form onSubmit={this.handleSubmit}>
                    Id:<input type="text" name="id" onChange={this.handleOnChange}/>
                    Book Title:<input type="text" name="book" onChange={this.handleOnChange}/>
                    Author:<input type="text" name="author" onChange={this.handleOnChange}/>
                    Description:<input type="text" name="description" onChange={this.handleOnChange}/>
                    <button>Save</button>
                </form>
            </div>
        );
    }
    

}

export default AddBook;