import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ReactCrop from 'react-image-crop';
import swal from 'sweetalert';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageUploader.component.module.css';

import { openModal, closeModal } from '../Modal/Modal.action';
import TakePictureComponent, { TakePicture } from '../Modal/TakePicture';
import { Button, Card, CardImg } from 'reactstrap';
import { FaCamera, FaFileUpload, FaCheck } from 'react-icons/fa';
import { imageValidator } from '../../shared/utils/validation';

class ImageUploader extends React.Component {
    state = {
        imageUri: require('../../assets/images/no-image.png'),
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 16 / 16,
        },
        modal: false,
        makeSelection: false,
        file: null,
        croppedImageUrl: null,
    };

    getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return canvas.toDataURL('image/jpeg');
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob(blob => {
        //         if (!blob) {
        //             console.error('Canvas is empty');
        //             return;
        //         }
        //         blob.name = fileName;
        //         window.URL.revokeObjectURL(this.fileUrl);
        //         this.fileUrl = window.URL.createObjectURL(blob);
        //         resolve(this.fileUrl);
        //     }, 'image/jpeg');
        // });
    };

    onSelectFile = async e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            let file = e.target.files[0];
            let validator = imageValidator(file, this);

            if(!validator[0]){
                await swal({
                    title: validator[2] === "type" ? "Invalid image type" : "Invalid image size",
                    text: validator[1],
                    icon: "error",
                    closeOnClickOutside: false
                });
                return;
            }
        
            reader.addEventListener('load', () =>
                this.setState({ 
                    src: reader.result,
                    file: file
                })
            );
            reader.readAsDataURL(file);
        }
    };

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            
            this.setState({
                croppedImageUrl: croppedImageUrl,
                makeSelection: true
            });
        }
    };

    triggerInputFile = () => this.fileInput.click();

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    openModal = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.props.openModal(TakePicture, {});
    };

    setImage = (file, image_string) => {
        this.props.closeModal();
        this.setState({
            src: image_string
        }, () => {
            this.props.fileInputHandler(file, image_string);
            this.setState({ croppedImageUrl: image_string});
        });
    };

    makeSelection = async () => {
        this.setState({
            src: null,
            imageUri: this.state.croppedImageUrl,
            makeSelection: false
        });
        let file = null;
        if (this.state.file === null) {
            this.setState({file: this.props.file});
            file = this.props.file;
        } else file = this.state.file;

        let image_string = await this.toBase64(file);

        return this.props.fileInputHandler(this.state.file, this.state.croppedImageUrl);
    };

    componentWillReceiveProps(nextProps) {
        this.setImage(nextProps.file, nextProps.image_string);
    };

    render() {
        const { src, crop, croppedImageUrl, makeSelection } = this.state;

        let formbutton = (
            <React.Fragment>
                <Button size="sm" color="primary" className="form-control mb-2" onClick={this.triggerInputFile}>
                    <FaFileUpload /> {" "}
                    <span>Upload from device</span>
                    <input style={{display:'none'}} type="file" accept="image/*" ref={fileInput => this.fileInput = fileInput} onChange={this.onSelectFile} className={styles.upload_image} />
                </Button>
                <Button size="sm" color="primary" className="mr-2 mb-2 form-control" onClick={this.openModal}>
                    <FaCamera />{" "}
                    <span>Take a picture with camera</span>
                </Button>
            </React.Fragment>
        )

        if (croppedImageUrl && makeSelection) {
            formbutton = (
                <Button size="sm" color="success" className="form-control" onClick={this.makeSelection}>
                    <FaCheck /> {" "}
                    <span>Finish crop</span>
                </Button>
            );
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <Card>
                            {src && (
                                <ReactCrop
                                    src={src}
                                    crop={crop}
                                    ruleOfThirds
                                    onImageLoaded={this.onImageLoaded}
                                    onComplete={this.onCropComplete}
                                    onChange={this.onCropChange}
                                />
                            )} 
                            {!src && <CardImg top width="100%" src={this.state.imageUri} alt="Card image cap" style={{padding: '20px'}}/>}
                        </Card>
                        <div className="pt-4 text-center">
                            { formbutton }
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
};

ImageUploader.defaultProps = {
    size: 128000
};

const mapStateToProps = state => {
    return {
        file: state.takePictureReducer.file,
        image_string: state.takePictureReducer.image_string
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        openModal: (modalType, modalProp) => dispatch(openModal(modalType, modalProp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);