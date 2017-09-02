import React from 'react'

const shelves = {
    'currentlyReading': "Currently Reading",
    "wantToRead": "Want to Read",
    "read": "Read"
}

export const ShelfSelector = ({ shelf, onChange }) => (
    <div className="book-shelf-changer">
        <select defaultValue={shelf} onChange={e => onChange && onChange(e.target.value)}>
            <option value="none" disabled >Move to...</option>
            {
                Object.keys(shelves).map(k => {
                    if (k === shelf) {
                        return (<option key={k} value={k} disabled>{shelves[k]}</option>)
                    }
                    else {
                        return (<option key={k} value={k} >{shelves[k]}</option>)
                    }

                })
            }
            {
                shelf &&
                    <option key="none" value="none">None</option>
            }
        </select>
    </div>
)