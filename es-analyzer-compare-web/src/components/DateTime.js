import React, { Component } from 'react';
var PropTypes = require('prop-types');

class DateTime extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const value = this.props.value;
    if(this.props.timeZone == 'Asia/Tokyo') {
      return (<span>{(typeof value === 'undefined') ? '' : value.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' } + '(JST)')} </span>);
    } else {
      return (<span>{(typeof value === 'undefined') ? '' : value.toLocaleString()}</span>);
    }
  }
}

DateTime.propTypes = {
  value: PropTypes.instanceOf(Date),
  timeZone: PropTypes.string
};

export default DateTime;