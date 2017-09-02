import React from 'react'
import {Book} from './Book'

export const BookShelf = ({ title, books, onMove }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    books.map(book => (
                        <li key={book.id}>
                            <Book book={book} onMove={onMove} />
                        </li>
                    ))
                }
            </ol>
        </div>
    </div>
)