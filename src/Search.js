import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import { withRouter } from 'react-router-dom'
import URI from 'urijs'
import * as BooksAPI from './BooksAPI'
import { Book } from './Book'
import _ from 'lodash'

class Search extends Component {

    constructor(...args) {
        super(...args)
        this.state = { results: [] }
    }

    componentDidMount(){
        this.__load(this.props)
    }

    componentWillReceiveProps(props) {
        this.__load(props)
    }

    __load(props) {
        const q = new URI(props.location.search).query(true).q
        if (q && q !== this.state.q) {
            this.setState({ q },
                () => BooksAPI.search(q, 10)
                    .then(books => {
                        if (books instanceof Array)
                            this.setState({ results: books });
                        else this.setState({ results: [] })
                    })
            )
        }
    }

    getShelf(id) {
        const shelf =  _.find(["currentlyReading", "wantToRead", "read"], 
            s => _.find(this.props[s], {'id': id})
        )

        return shelf
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific au  thor or title. Every search is limited by search terms.
            */}
                        <Debounce time="800" handler="onChange">
                            <input type="text" placeholder="Search by title or author"
                                onChange={e =>
                                    this.props.history
                                        .push(new URI(this.props.location.pathname)
                                            .setQuery("q", e.target.value)
                                            .toString()
                                        )
                                } />
                        </Debounce>

                    </div>
                </div>
                <div className="search-books-results">
                    <div>
                        {this.state.q &&
                            <h3>Showing results for {this.state.q}.</h3>
                        }
                    </div>
                    <ol className="books-grid">
                        {
                            this.state.results.map(book => (
                                <li key={book.id}>
                                    <Book 
                                        book={book} 
                                        shelf={this.getShelf(book.id)} 
                                        onMove={this.props.onMove}
                                    /></li>
                            ))
                        }
                    </ol>
                </div>
            </div>)
    }
}

export default withRouter(Search)