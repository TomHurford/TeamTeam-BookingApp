import React, {useState} from "react";

//Creating a search bar component

function SearchBar(){
    const [input, setInput] = useState('');
    const handleInput = (e) => {
        setInput(e.target.value);
    }
    
    return(
       <form>
              <input type="text" value={input} onChange={handleInput} placeholder = "Search for events..."/>
       </form>
    )
    
}
export default SearchBar;