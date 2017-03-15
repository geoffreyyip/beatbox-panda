import React, { PropTypes } from 'react';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const DefaultButton = ({ onClick, children }) => (
  <button className="btn btn-default btn-lg" onClick={onClick} >
    {children}
  </button>
);

DefaultButton.propTypes = propTypes;

export default DefaultButton;
