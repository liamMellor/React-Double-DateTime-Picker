'use strict';

import './ScrollingDropdown.scss';

import React from 'react';

class ScrollingDropdown extends React.Component {

	constructor(props) {
		super(props);
		// Assign to class so eventListener ref can be removed
		this.pageClickHandler = this.props.pageClickHandler;
		this.state            = {
			stickyHeaderIndex : 0,
			showScrollPrompt  : true
		};
	}
 
	render () {
		return (
			<div className="ScrollingDropdown" onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}>
				<div className="ScrollingDropdown__triangle"></div>
				{this.renderStickyContent()}
				<div className="ScrollingDropdown__content" id="scrollContainer">
					{this.mapChildren()}
				</div>
				{this.renderScrollPrompt()}
			</div>
		);
	}

	componentDidMount() {
		document.getElementById('scrollContainer').addEventListener('scroll', this.setStickyContentIndex.bind(this));
		window.addEventListener('mousedown', this.pageClickHandler, false);
	}

	componentWillUnmount() {
		document.getElementById('scrollContainer').removeEventListener('scroll', this.setStickyContentIndex.bind(this));
		window.removeEventListener('mousedown', this.pageClickHandler, false);
	}

	renderStickyContent() {
		const index = this.state.stickyHeaderIndex;
		return (
			<div className="ScrollingDropdown__stickyHeader">
				<div className="ScrollingDropdown__stickyHeader__day">{this.props.children[index].props.day}</div>
				<div className="ScrollingDropdown__stickyHeader__date">{this.props.children[index].props.date}</div>
			</div>
		);
	}

	renderScrollPrompt() {
		if (this.state.showScrollPrompt) {
			return (
				<div className="ScrollingDropdown__scrollPrompt">
					<div>Scroll for more</div>
				</div>
			);
		}
	}

	/* Give each child a dynamci ref so that we can iterate over them as DOM elements when determing sticky header content */
	mapChildren() {
		return React.Children.map(this.props.children, (child, index) => {
			return <div ref={index}>{child}</div>;
		});
	}

	setStickyContentIndex(event) {
		const index = determineStickyContent(this.refs, event.target.scrollTop);
		if (this.state.showScrollPrompt) {
			// Hide scroll promopt after user scrolls
			this.setState({ showScrollPrompt : false });
		}
		if (this.state.stickyHeaderIndex !== index) {
			// Only set the state when we have to
			this.setState({ stickyHeaderIndex : index });
		}
	}

}

/* Helpers */

function determineStickyContent(headers, scrollPosition) {
	let activeHeaderKey = -1;
	Object.keys(headers).forEach( key => {
		// Subtract 5 to account for the px offset of absoulute positioned container
		let headerDistanceFromTop = headers[key].offsetTop - 5;
		// If we've scrolled past the top of header, make it the active header
		if (scrollPosition >= headerDistanceFromTop) {
			activeHeaderKey = key;
		}
	});
	return activeHeaderKey;
}

ScrollingDropdown.PropTypes = {
	pageClickHandler : React.PropTypes.func,
	onMouseDown      : React.PropTypes.func,
	onMouseUp        : React.PropTypes.func
};

export default ScrollingDropdown;
