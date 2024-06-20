// import React from "react";
// import './Dropdown.css';

// const Dropdown = ({ handleSortChange }) => {
//     return (
//         <select className="sort" onChange={handleSortChange}>
//             <option value="title.asc">A-Z</option>
//             <option value="release_date.desc">Ascending Release Date</option>
//             <option value="rating">Rating</option>
//         </select>
//     );
// };

// export default Dropdown;import React from "react";
import './Dropdown.css';

const Dropdown = ({ handleSortChange, sortOption }) => {
    return (
        <select className="sort" onChange={handleSortChange} value={sortOption}>
            <option value="">No Sort</option>
            <option value="original_title.asc">A-Z</option>
            <option value="release_date.desc">Descending Release Date</option>
            <option value="release_date.asc">Ascending Release Date</option>
            <option value="vote_average.desc">Rating</option>
        </select>
    );
};

export default Dropdown;
