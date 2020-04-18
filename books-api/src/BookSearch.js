import React, { Component } from 'react';

class BookSearch extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const options = this
      .props
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          <input type="text" placeholder="Search..." name="searchTerm" id="searchTerm" ref={this.props.searchTerm}/>
        </label>
        <button type="submit" value="Submit">Submit</button>
      </form>
    )};
}

BookSearch.defaultProps = {
  searchTerm: [],
}

export default BookSearch;