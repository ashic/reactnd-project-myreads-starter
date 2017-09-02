import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route} from 'react-router-dom'
import Home from './Home'
import Search from './Search'

class BooksApp extends React.Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  __loadBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({
        currentlyReading: books.filter(b => b.shelf === "currentlyReading"),
        wantToRead: books.filter(b => b.shelf === "wantToRead"),
        read: books.filter(b => b.shelf === "read")
      })
    })
  }

  onMove = ({ book, to }) => {
    BooksAPI.update(book,to).then(() => this.__loadBooks())    
  }

  componentDidMount() {
    this.__loadBooks();
  }

  render() {
    return (
      <div className="app">
        <Route path='/search'  render={() => (
          <Search {...this.state} onMove={this.onMove} />
        )} />
        <Route exact path='/' render={() => (
          <Home {...this.state} onMove={this.onMove} />
        )} />
      </div>
    )
  }
}

export default BooksApp
