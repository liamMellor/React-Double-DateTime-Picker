'use strict';

import './TimePicker.scss';

import React from 'react';
import TimeInputContainer from './components/TimeInputContainer';

class TimePicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pickupError             : false,
			pickupDropdownVisible   : false,
			deliveryError           : false,
			deliveryDropdownVisible : false
		};
	}

	render() {
		return (
			<div className="TimePicker">
				<div className="TimePicker__pickup TimePicker__line">
					<div className="TimePicker__label">Pickup Time:</div>
					<TimeInputContainer
						context='pickup'
						content={this.getInputText('pickup')}
						timeOptions={this.props.pickupTimeOptions}
						error={this.getErrorState('pickup')}
						dropdownIsVisible={this.state.pickupDropdownVisible}
						onInputClick={this.onInputClick.bind(this)}
						setTimeFn={this.props.setPickupTime}
					/>
				</div>
				<div className="TimePicker__delivery TimePicker__line">
					<div className="TimePicker__label">Delivery Time:</div>
					<TimeInputContainer
						context='delivery'
						content={this.getInputText('delivery')}
						timeOptions={this.props.deliveryTimeOptions}
						error={this.getErrorState('delivery')}
						dropdownIsVisible={this.state.deliveryDropdownVisible}
						onInputClick={this.onInputClick.bind(this)}
						setTimeFn={this.props.setDeliveryTime}
					/>
				</div>
				<div className="TimePicker__message">You can edit these times later if your schedule changes.</div>
			</div>
		);
	}

	getErrorState(context) {
		return contextIsPickup(context) ? this.state.pickupError || this.props.pickupTimeError : this.state.deliveryError || this.props.deliveryTimeError;
	}

	getInputText(context) {
		const pickupTimeSet = timeIsSet(this.props.pickupTime);
		if (contextIsPickup(context)) {
			return pickupTimeSet ? this.props.pickupTime.name : 'Select a pickup time';
		}
		// Context is delivery
		else if (pickupTimeSet) {
			return timeIsSet(this.props.deliveryTime) ? this.props.deliveryTime.name : 'Select a delivery time';
		}
		return 'Select a pickup time first';
	}

	onInputClick(context) {
		// toggle pickup dropdown
		if (contextIsPickup(context)) {
			this.setState({
				pickupDropdownVisible   : !this.state.pickupDropdownVisible,
				deliveryDropdownVisible : false,
				pickupError             : false
			});
		}
		// toggle delivery dropdown
		else if (timeIsSet(this.props.pickupTime)) {
			this.setState({
				pickupDropdownVisible   : false,
				deliveryDropdownVisible : !this.state.deliveryDropdownVisible,
				deliveryError           : false
			});
		}
		// pickup time must be selected first
		else {
			this.setState({ pickupError : true });
		}
	}

}

function contextIsPickup(context) {
	return context === 'pickup';
}

function timeIsSet(time) {
	return Object.keys(time).length;
}

TimePicker.propTypes = {
	pickupTime          : React.PropTypes.object,
	deliveryTime        : React.PropTypes.object,
	pickupTimeOptions   : React.PropTypes.array,
	deliveryTimeOptions : React.PropTypes.array,
	pickupTimeError     : React.PropTypes.bool,
	deliveryTimeError   : React.PropTypes.bool,
	setPickupTime       : React.PropTypes.func,
	setDeliveryTime     : React.PropTypes.func
};

export default TimePicker;
