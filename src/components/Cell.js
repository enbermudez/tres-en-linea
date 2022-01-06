import React from 'react';
import classnames from 'classnames';

const Cell = ({ handleCellClick, emoji, idx }) => {
  const handleClick = () => {
    if (emoji === '') handleCellClick(idx);
  };
  
  return (
    <div
      onClick={handleClick}
      className={classnames('cell', { disabled: emoji === '' })}
    >{emoji}</div>
  );
};

export default Cell;