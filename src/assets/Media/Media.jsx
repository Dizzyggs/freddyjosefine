import React, { useEffect, useState, useRef } from 'react';
import { handleUpload } from '../FirebaseApp/FirebaseApp';
import { Transition, MantineProvider } from '@mantine/core';
import GridGallery from './GridGallery';
import { DummyImages } from '../DummyData/images';
import { getAllImages } from '../FirebaseApp/FirebaseApp';
import './Media.css';

const Media = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [weddingImages, setWeddingImages] = useState([]);
  const [focusedImg, setFocusedImg] = useState(null)
  const focusedImgRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    try {
      const url = await handleUpload(file);
      setUploadedUrl(url); 
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const myWeddingImages = await getAllImages();
      setWeddingImages(myWeddingImages);
      console.log(weddingImages)
    };
  
    fetchImages();
  }, []);

  const handleClickCallback = (imgSrc) => {
    if (imgSrc) {
      setFocusedImg(imgSrc)
    }
  }

  const handleOutsideClick = (e) => {
    if (focusedImgRef.current && !focusedImgRef.current.contains(e.target)) {
      setFocusedImg(null);
    }
  };

  const cssVariablesResolver = () => ({
    variables: {
      '--mantine-color-body': 'transparent',
    },
    light: {
      '--mantine-color-body': 'transparent',
    },
    dark: {
      '--mantine-color-body': 'transparent',
      '--mantine-color-scheme': 'light',
    },
  });


  useEffect(() => {
    if (focusedImg) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [focusedImg]);

  return (
    <MantineProvider
      defaultColorScheme='dark'
      cssVariablesResolver={cssVariablesResolver}
      withCssVariables
    >
      <div className='media-main'>
        <div className="flowerpic" />
        <Transition
          mounted={focusedImg !== null}
          transition="fade"
          duration={800}
          timingFunction="ease"
        >
          {(styles) =>
            <div className='focusedImgWrapper' style={styles}>
              <span className='exit' onClick={() => setFocusedImg(null)}>X</span>
              <img src={focusedImg} alt="Focused" ref={focusedImgRef} />
            </div>

          }
        </Transition>
        <h1 className='media-header'>Media</h1>
        <p>Här inne kommer alla få möjligheten att ladda upp bilder från bröllopet!</p>
        <input type="file" onChange={handleFileChange} className='upload-input'/>
        {file && <button onClick={handleFileUpload} type='button'>Ladda upp bild</button>}
        <Transition
          mounted={weddingImages?.length > 0}
          transition="rotate-right"
          duration={800}
          timingFunction="ease"
        >
        {(styles) =>
            <div className='grid-gallery-wrapper' style={{ opacity: focusedImg !== null ? '0.2' : '1', ...styles}}>
            <GridGallery imageUrls={weddingImages} handleClick={handleClickCallback} />
          </div>
        }
        </Transition>
      </div>
    </MantineProvider>
  );
};

export default Media;
