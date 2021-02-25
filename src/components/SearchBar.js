import React from 'react';

const SearchBar = ({ value, setSearchValue }) => {
  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        type='text'
        value={value}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder='Type to search...'
      />
    </div>
  );
};

export default SearchBar;
