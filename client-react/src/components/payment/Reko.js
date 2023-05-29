import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
};

const Reko = () => {
  const [picture, setPicture] = useState('');
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, []);

  const retake = () => {
    setPicture('');
  };

  const submitPhoto = () => {
    const submitUrl = ' http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/auth/payment/';
        // Convert the picture data to a Blob object
        const blob = dataURItoBlob(picture);

        // Create a FormData object and append the captured photo as a file
        const formData = new FormData();
        formData.append('photo', blob, 'photo.jpg');
    
        // Send the photo to the submit URL using Axios
        axios
          .post(submitUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
      };
    
      // Helper function to convert a data URI to a Blob object
      const dataURItoBlob = dataURI => {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
      };
    
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h2 className="mb-5">React Photo Capture using Webcam Example</h2>
        <div>
          {picture === '' ? (
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              width={400}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={picture} alt="Captured" />
          )}
        </div>
        <div>
          {picture !== '' ? (
            <>
              <button onClick={retake} className="btn btn-primary mt-3 me-3">
                Retake
              </button>
              <button onClick={submitPhoto} className="btn btn-success mt-3">
                Submit
              </button>
            </>
          ) : (
            <button onClick={capture} className="btn btn-danger mt-3">
              Capture
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reko;