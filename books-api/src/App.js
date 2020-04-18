import React, { Component } from 'react'
import './App.css'
import BookSearch from './BookSearch'
import TypeSelector from './TypeSelector'
// import BookList from './BookList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: {
        value: ''
      },
      printType: {
        value: ''
      },
      apiKey: 'AIzaSyCVbQRgRf0EVWUyfVMaWhJqIwfzsSBVtsc',
      books: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setPrintType = this.setPrintType.bind(this);
    this.filterInput = React.createRef();
    this.printTypeInput = React.createRef();
    this.searchTerm = React.createRef();

  }

  handleSubmit(event) {

    event.preventDefault();
    console.log('The event is', event.type);
    const searchTerm = event.target.searchTerm.value;
    console.log('searchTerm:', searchTerm);
    this.getSearch(searchTerm);
}

  setFilter(filter) {
    this.setState({
      filter: {value: filter}
    })
  }

  setPrintType(printType) {
    this.setState({
      printType: {value: printType}
    })
  }

  getSearch(searchTerm) {
    const searchingFor = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}${this.state.filter.value}${this.state.printType.value}&key=${this.state.apiKey}`
    console.log('Searching at: ', searchingFor);
    fetch(searchingFor)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
       this.setState({
        books: responseJson.items,
      }
      );
    }
  );
  }

  componentDidMount() {
    console.log(this.state.filter);
    console.log(this.state.printType);
  }

  render() {
    return (
      <div className="App">
        <header className="header">Google Book Search</header>
        <BookSearch handleSubmit={this.handleSubmit}/>
        <TypeSelector 
          handleSubmit={this.handleSubmit}
          filterInput={this.filterInput}
          printTypeInput={this.printTypeInput}
          setFilter={this.setFilter}
          setPrintType={this.setPrintType}
        />
        {this.state.books.map(book => {
          return (
            <div>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              <h3>{book.volumeInfo.title}</h3>
              <p>Average rating: {book.volumeInfo.averageRating}</p>
              <p>{book.volumeInfo.description}</p>
            </div>
          );
        })}
      </div>
    )
  }
}

export default App;
