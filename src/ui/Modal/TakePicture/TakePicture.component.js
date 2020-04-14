import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../Modal.action';
import { store_picture } from './TakePicture.action';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import { Button } from 'reactstrap';
import { FaCamera, FaUpload, FaCheck } from 'react-icons/fa';
import './TakePicture.component.module.css';

class TakePicture extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.cameraPhoto = null;
        this.videoRef = React.createRef();
        this.state = {
            dataUri: '',
            pictureTaken: false,
        }
    };

    componentDidMount() {
        this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    };

    openCamera = () => {
        let facingMode = FACING_MODES.ENVIRONMENT;
        let idealResolution = { width: 640, height: 480 };

        this.cameraPhoto.startCamera(facingMode, idealResolution)
        .then(() => {
            console.log('camera is started !');
        })
        .catch((error) => {
            console.error('Camera not started!', error);
        });
    };

    takePhoto = () => {
        const config = {
            sizeFactor: 1
        };
        let dataUri = this.cameraPhoto.getDataUri(config);

        this.setState({
            dataUri: dataUri,
            pictureTaken: true
        });
    };

    dataURItoBlob = (dataURI) => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    };

    blobToFile = (theBlob, fileName) => {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    };

    finishTaken = () => {
        this.cameraPhoto.stopCamera()
        .then(() => {
            var file = this.blobToFile(this.dataURItoBlob(this.state.dataUri), "picture.png");

            this.props.store_picture({
                file: file,
                image_string: this.state.dataUri
            });
        })
        .catch((error) => {
            console.log('No camera to stop!:', error);
        });
    };

    render() {
        let container = (
            <Fragment>
                <div className="imageContainer">
                    <video className="video" ref={this.videoRef} autoPlay={true}/>
                </div>
                <div className="buttons">
                    <Button size="md" color="primary" className="mr-3" onClick={this.openCamera}><FaCamera /> Start</Button>
                    <Button size="md" color="success" className="ml-2" onClick={this.takePhoto}><FaUpload /> Snap</Button>
                </div>
            </Fragment>
        );

        {this.state.pictureTaken && (
            container = (
                <Fragment>
                    <div className="imageContainer">
                        <img src={this.state.dataUri} />
                    </div>

                    <div className="buttons">
                        <Button size="md" color="success" onClick={this.finishTaken}><FaCheck /> Finish</Button>
                    </div>
                </Fragment>
            )
        )}

        return (
            <div style={{
                background: 'rgba(0,0,0,.5)',
                position: 'absolute',
                zIndex: '50',
                width: '100%',
                height: '100vh' 
            }}>
                <div style={{
                    width: '50%',
                    maxHeight: '90%',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    margin: '150px auto',
                    padding: '25px 25px'
                }}>
                    <div>
                        <div className="action">
                            <div className="goBack" onClick={this.props.closeModal}>
                                <i className="fa fa-close" aria-hidden="true"></i>  Close
                            </div>
                        </div>
                        {container}
                    </div>
                </div>
            </div>
        );
    };
};


const mapStateToProps = state => {
    return {
        modalToggle: state.modalToggle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        store_picture: payload => dispatch( store_picture(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakePicture);