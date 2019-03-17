import React, { useState } from 'react';

export default function HeaderSearch(props) {
    let [searchText, setSearchText] = useState("")

    let handleSearch = e => setSearchText(e.target.value)

    return (
        <div className="header-input-container">
            <i className="header-icon mdi mdi-magnify"></i>
            <input
                className="header-input"
                value={searchText}
                placeholder="Search Board ..."
                type="text"
                onChange={handleSearch}
            />
        </div>
    );
}