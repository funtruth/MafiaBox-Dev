import React, { useState } from 'react';
import Icon from '../../components/Icon';

export default function HeaderSearch(props) {
    let [searchText, setSearchText] = useState("")

    let handleSearch = e => setSearchText(e.target.value)

    return (
        <div className="header-input-container">
            <Icon icon="mdi-magnify"/>
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