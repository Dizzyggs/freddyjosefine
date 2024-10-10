import React, { useEffect, useState, useRef } from 'react';
import { handleUpload } from '../FirebaseApp/FirebaseApp';
import { Transition, MantineProvider, Loader } from '@mantine/core';
import GridGallery from './GridGallery';
import { getAllImages } from '../FirebaseApp/FirebaseApp';
import { IconCheck } from '@tabler/icons-react';
import Header from '../Header/Header'
import './Media.css';

const Media = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [weddingImages, setWeddingImages] = useState([]);
  const [focusedImg, setFocusedImg] = useState(null)
  const focusedImgRef = useRef(null);
  const [successfullyUploaded, setSuccessfullyUploaded] = useState(false)
  const [loadingImages, setLoadingImages] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fetchImages = async () => {
    const myWeddingImages = await getAllImages();
    setWeddingImages(myWeddingImages);
  };

  const handleFileUpload = async () => {
    try {
      const url = await handleUpload(file);
      setUploadedUrl(url);
      setSuccessfullyUploaded(true)
      fetchImages();
      setFile(null)
      setTimeout(() => {
        setSuccessfullyUploaded(false)
      }, 4000);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    fetchImages();
    setLoadingImages(true)
    setTimeout(() => {
      setLoadingImages(false)
    }, 2500);
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
      <Header />
      <div className='media-main'>
        <Transition
          mounted={successfullyUploaded}
          transition="slide-down"
          duration={500}
          timingFunction="ease"
        >
          {(styles) =>
            <div className='successfullyuploaded' style={styles}>
              <IconCheck style={{ marginRight: '.5rem', color: 'green' }} />
              Din bild har laddats upp! Tack!
            </div>
          }
        </Transition>
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
        {!loadingImages ? (
          <>
            <input type="file" onChange={handleFileChange} className='upload-input' />
            {file && (
              <button onClick={handleFileUpload} type='button' className='upload-btn'>
                Ladda upp bild
              </button>
            )}
            <Transition
              mounted={weddingImages?.length > 0}
              transition="rotate-right"
              duration={800}
              timingFunction="ease"
            >
              {(styles) => (
                <div
                  className='grid-gallery-wrapper'
                  style={{ opacity: focusedImg !== null ? '0.2' : '1', ...styles }}
                >
                  <GridGallery images={weddingImages} handleClick={handleClickCallback} />
                </div>
              )}
            </Transition>
          </>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}>
          <Loader size='md' />
          <p style={{margin: '.5rem 0 0 0', fontSize: '.95rem'}}>Laddar bilder..</p>
          </div>
        )}
        {!loadingImages && weddingImages?.length == 0 && <p style={{margin: '.5rem 0 0 0', fontSize: '.95rem'}}>Inga bilder har laddats upp ännu.</p>}
      </div>
    </MantineProvider>
  );
};

export default Media;
