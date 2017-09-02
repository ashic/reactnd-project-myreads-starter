import React from 'react'
import {ShelfSelector} from './ShelfSelector'


export const Book = (props) => {
    const { title, authors, imageLinks} = props.book
    const shelf = props.book.shelf || props.shelf
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{ 'backgroundSize': 'cover', width: '190px', height: '190px', backgroundImage: `url(${imageLinks.thumbnail})` }}>
                </div>
                <ShelfSelector shelf={shelf} onChange={(s) => props.onMove && props.onMove({book:props.book, from:shelf, to:s})} />               
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors?authors.join(", "):""}</div>
        </div>
    )
}