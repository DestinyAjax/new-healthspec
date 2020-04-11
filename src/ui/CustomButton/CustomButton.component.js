import React from 'react';
import CustomButtonWrapper from './CustomButton.styles';

const CustomButton = props => {

	let button = (
		<CustomButtonWrapper className="buttonWrapper">
			<button className={`btn btn-md btn-success`} 
				onClick={props.onClick} {...props}>
				{props.children}
			</button>
		</CustomButtonWrapper>
	);

	if (props.submittingForm) {
		button = (
			<CustomButtonWrapper className="buttonWrapper">
				<div>
					<button className="btn btn-md btn-success" disabled={true} {...props}
						>
						<i className="fa fa-circle-o-notch fa-spin fa-fw"></i> Loading...
					</button>
				</div>
			</CustomButtonWrapper>
		);
	}

	return (
		<React.Fragment>
			{button}
		</React.Fragment>
	);
}

export default CustomButton;