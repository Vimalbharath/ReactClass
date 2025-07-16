import { Component } from "react"


class UpdateBook extends Component {
    constructor(props) {
        super(props);
        console.log(props.book)
        this.state = {
            id:props.book.id,
            book: props.book.book, 
            author:props.book.author,
            description: props.book.description
        };
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
      this.props.editoff({
            id:this.state.id,
            book: this.state.book,
            author: this.state.author,
            description: this.state.description
        });
        // this.setState({
        //     id:'',
        //     book: '',
        //      author:'',
        //     description: ''
        // });

       
        // const navigate = useNavigate();
        // navigate('/dashboard');
    };
    render(){
         return (
            <div>
                <div>Update Book</div>
                <form onSubmit={this.handleSubmit}>
                    Id:<input type="text" value={this.state.id} name="id" onChange={this.handleOnChange}/>
                    Book Title:<input type="text" value={this.state.book} name="book" onChange={this.handleOnChange}/>
                    Author:<input type="text" value={this.state.author} name="author" onChange={this.handleOnChange}/>
                    Description:<input type="text" value={this.state.description} name="description" onChange={this.handleOnChange}/>
                    <button>Save</button>
                </form>
            </div>
        );
    }
    

}

export default UpdateBook;