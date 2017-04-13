'use strict';

import './TimeInputContainer.scss';

import React from 'react';
import ReadOnlyInputDisplay from './ReadOnlyInputDisplay';
import ScrollingDropdown from './ScrollingDropdown';
import TimeBlock from './TimeBlock';

class TimeInputContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mouseDownOnComponent : false
		};
	}

	render() {
		const baseClass = "TimeInputContainer";
		const classes   = this.props.error ? `${baseClass} ${baseClass}--error` : baseClass;
		return (
			<div className={classes}>
				<ReadOnlyInputDisplay
					inputDisplay={this.props.content}
					onClick={this.toggleDropdown.bind(this)}
					onMouseDown={this.mouseDownHandler.bind(this)}
					onMouseUp={this.mouseUpHandler.bind(this)}
				/>
				{ this.renderDropdown() }
			</div>
		);
	}
	
	renderDropdown() {
		return this.props.dropdownIsVisible ?
			<ScrollingDropdown
				onMouseDown={this.mouseDownHandler.bind(this)}
				onMouseUp={this.mouseUpHandler.bind(this)}
				pageClickHandler={this.outsidePageClickhandler.bind(this)}
			>
				{this.renderDropdownContent(this.props.timeOptions)}
			</ScrollingDropdown>
											:
			null;
	}

	renderDropdownContent (optionsArray) {
		const timesMap = formatTimes(optionsArray);
		return Object.keys(timesMap).map( (key, index) =>
			<TimeBlock
				key={index}
				setTimeFn={this.onTimeSelect.bind(this)}
				day={timesMap[key].day}
				date={timesMap[key].date}
				times={timesMap[key].times}
			/>
		);
	}

	/* On input click */
	toggleDropdown() {
		this.props.onInputClick(this.props.context);
	}

	/* Callback from time line item click */
	onTimeSelect(time) {
		this.props.setTimeFn(time);
		this.toggleDropdown();	
	}

	/* Callback for when mouse is DOWN on readOnlyInput OR ScrollingDropdown */
	mouseDownHandler() {
		this.setState({ mouseDownOnComponent : true });
	}

	/* Callback for when mouse is UP on readOnlyInput OR ScrollingDropdown */
	mouseUpHandler() {
		this.setState({ mouseDownOnComponent : false });
	}

	/* Added as event listener on window to close dropdown when user clicks outside it */
	outsidePageClickhandler() {
		if (!this.state.mouseDownOnComponent) {
			this.toggleDropdown();
		}
	}

}

/** Helpers **/

function formatTimes(times) {
	return times.reduce(function(dates, time) {
		dates[time.date]       = dates[time.date] || {};
		dates[time.date].day   = time.weekday;
		dates[time.date].date  = time.date;
		dates[time.date].times = dates[time.date].times || [];
		dates[time.date].times.push({
			time    : time.timeWindow,
			timeObj : time
		});
		return dates;
	}, {});
}

TimeInputContainer.PropTypes = {
	content           : React.PropTypes.string,
	context           : React.PropTypes.string,
	timeOptions       : React.PropTypes.array,
	error             : React.PropTypes.bool,
	dropdownIsVisible : React.PropTypes.bool,
	setTimeFn         : React.PropTypes.func,
	onInputClick      : React.PropTypes.func
};

export default TimeInputContainer;
