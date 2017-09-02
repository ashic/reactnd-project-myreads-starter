import React from 'react'
import { Link } from 'react-router-dom'
import { BookShelf } from './BookShelf'

export default ({currentlyReading, wantToRead, read, onMove}) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <BookShelf title='Currently Reading' books={currentlyReading} onMove={onMove} />
            <BookShelf title='Want to Read' books={wantToRead} onMove={onMove} />
            <BookShelf title='Read' books={read} onMove={onMove} />
        </div>
        <div className="open-search">
            <Link to='/search'>Add a book</Link>
        </div>
    </div>
)