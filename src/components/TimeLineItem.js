'use strict';

import './TimeLineItem.scss';

import React from 'react';

class TimeLineItem extends React.Component {
 
	render() {
		return (
			<div className="TimeLineItem" onClick={this.props.handleClick.bind(this, this.props.time)}>
				{this.props.timeDisplay}
			</div>
		);
	}

}

TimeLineItem.propTypes = {
	timeDisplay  : React.PropTypes.string,
	time         : React.PropTypes.object,
	handleClick  : React.PropTypes.func
};


export default TimeLineItem;
