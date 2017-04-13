'use strict';

import './TimeBlock.scss';

import React from 'react';
import TimeLineItem from './TimeLineItem'

class TimeBlock extends React.Component {
 
	render() {
		return (
			<div className="TimeBlock">
				<div className="TimeBlock__header">
					<div className="TimeBlock__day">{this.props.day}</div>
					<div className="TimeBlock__date">{this.props.date}</div>
				</div>
				<div className="TimeBlock__content">
					{this.renderTimes(this.props.times)}
				</div>
			</div>
		);
	}

	renderTimes(timesArr) {
		return timesArr.map( (obj, index) => <TimeLineItem key={index} handleClick={this.props.setTimeFn} timeDisplay={obj.time} time={obj.timeObj} /> ) ;
	}

}

TimeBlock.propTypes = {
	day               : React.PropTypes.string,
	date              : React.PropTypes.string,
	times             : React.PropTypes.array,
	setTimeFn         : React.PropTypes.func
};


export default TimeBlock;
