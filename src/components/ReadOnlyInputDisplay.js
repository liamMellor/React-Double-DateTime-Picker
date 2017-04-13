'use strict';

import './ReadOnlyInputDisplay.scss';

import React from 'react';

class ReadOnlyInputDisplay extends React.Component {

	render () {
		return (
			<input className="ReadOnlyInputDisplay"
				value={this.props.inputDisplay}
				onClick={this.props.onClick}
				onMouseDown={this.props.onMouseDown}
				onMouseUp={this.props.onMouseUp}
				readOnly
			/>
		);
	}

}

ReadOnlyInputDisplay.propTypes = {
	inputDisplay : React.PropTypes.string,
	onClick      : React.PropTypes.func,
	onMouseDown  : React.PropTypes.func,
	onMouseUp    : React.PropTypes.func
};


export default ReadOnlyInputDisplay;
