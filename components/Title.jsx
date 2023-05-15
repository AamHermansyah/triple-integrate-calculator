import React from 'react';
import PropTypes from 'prop-types';

function Title({ title }) {
  return (
    <h1 className="title text-3xl font-semibold text-center mb-4">
      {title}
    </h1>
  )
}

Title.propTypes = {
  title: PropTypes.string
}

export default Title;
