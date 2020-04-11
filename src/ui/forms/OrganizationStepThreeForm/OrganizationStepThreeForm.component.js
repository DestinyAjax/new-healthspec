import React from 'react';
import CustomButton from '../../CustomButton';
import ImageUploader from '../../ImageUploader';
import styles from './OrganizationStepThreeForm.component.module.css';

class OrganizationStepThreeForm extends React.Component {

	state = {
		file: null,
	}

	fileInputHandler = file => {
		this.setState({
			file: file,
		});
	}

	onSubmit = () => {
		this.props.onSubmit(this.state.file);
	}

	render() {

		let button;

		if (this.state.file !== null) {
			button = (
				<div className={styles.button}>
					<CustomButton onClick={this.onSubmit} submittingForm={this.props.submittingForm}> Next </CustomButton>
				</div>
			)
		}


		return (
			<div>

				<ImageUploader fileInputHandler={this.fileInputHandler} />

				<div className={styles.footer}>

					<div className={styles.buttonContainer}>
						{ button }

						<a className={styles.cancelOrBack} onClick={this.props.previousStep}> Previous </a>
					</div>

				</div>

			</div>
		);
	}
}

export default OrganizationStepThreeForm;