import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { AiOutlineSearch } from 'react-icons/ai';
import './SharedStyles.css';

function SearchComponent(props) {
    const { search, searcher, placeholder="Search", onclick } = props;
    return <React.Fragment>
        <OutlinedInput 
            endAdornment={
                <InputAdornment position="start" onClick={onclick}>
                    <AiOutlineSearch className="adornment-search" />
                </InputAdornment>
                }
            className="inputSearchComponent" 
            type="text" 
            placeholder={placeholder} 
            value={search} 
            onChange={searcher}
        />
    </React.Fragment>
}

export {SearchComponent};