import React, { Fragment } from 'react';
import { Row, Col, Card } from 'antd';
import CustomButton from '../../CustomButton';
import ImageUploader from '../../ImageUploader';
import styles from './BeneficiaryStepTwoForm.component.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

class BeneficiaryStepTwoForm extends React.Component  {

	state = {
		file: null,
		image_string: null,
	}

	fileInputHandler = (file, image_string) => {
		this.setState({
			file: file,
			image_string: image_string,
		});
	}

	onSubmit = () => {
		this.props.onSubmit(this.state.file, this.state.image_string);
	}

	render () {

		let button;

		if (this.state.file !== null) {
			button = (
				<div className={styles.button}>
					<CustomButton onClick={this.onSubmit} >
						Next {" "}
						<FaArrowRight />
					</CustomButton>
				</div>
			);
		}

		return (
			<Fragment>
				<Card title="Image Uploader" style={{width: '100%'}}>
					<form onSubmit={this.props.handleSubmit}>
						<ImageUploader fileInputHandler={this.fileInputHandler} />
					</form>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col className="gutter-row" span={12}>
							<div className="pull-left">
								<button className="btn btn-lg btn-secondary" onClick={this.props.previousStep}>
									<FaArrowLeft /> {" "}
									Previous
								</button>
							</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div className="pull-right">
								{ button }
							</div>
						</Col>
					</Row>
				</Card>
			</Fragment>
		);
	}
}

export default BeneficiaryStepTwoForm;