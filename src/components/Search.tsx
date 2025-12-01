import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { searchItems } from "../redux/cartSlice";
import { useState } from "react";

const Search = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const [query, setQuery] = useState("");

    return (
        <div className="container">
            <div className="input-group mb-3 search-bar">
                <input type="text" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => dispatch(searchItems(query))}>Search</button>
            </div>
        </div>
    )
}

export default Search;