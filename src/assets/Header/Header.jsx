import React, { useState, useEffect } from 'react';
import './Header.css'
import { Transition, Modal } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconPhone, IconHome } from '@tabler/icons-react';
import useMobileDetect from '../hooks/useMobileDetect';

const Header = (props) => {
  const { positionType } = props
  const [rendered, setRendered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const isMobile = useMobileDetect();

  useEffect(() => {
    setRendered(true)
  }, [])

  return (
    <Transition
      mounted={rendered}
      transition="slide-down"
      duration={1300}
      timingFunction="ease"
    >
      {(styles) => (
        <div className='wrapper' style={{position: positionType == 'absolute' ? 'absolute' : 'relative', height: positionType == 'absolute' ? '100%' : ''}}>
           <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="" size={isMobile? '90vw' : '40vw'} centered transitionProps={{ transition: 'fade-down', duration: 350 }}>
              <div className='modalmain'>
                <div className="flowerpic2" />
                <h1 className='normal-font' style={{ marginTop: isMobile ? '-5rem' : '0' }}>Kontakt</h1>
                <div className='people-kontakt'>
                  <div className='person'>
                    <h2 style={{margin: '0'}}>Josefine</h2>
                    <a href="tel:0734332234" style={{ textDecoration: 'underline', color: 'white'}}>
                      <span style={{ display: 'flex', flexDirection: 'row', fontSize: '.5rem', alignItems: 'center' }}>
                        <IconPhone style={{ color: 'black' }} />
                        <p style={{margin: '0 0 0 .3rem'}}>073-4332234</p> {/* Add margin: 0 to remove default margin from <p> */}
                      </span>
                    </a>
                  </div>
                  <div className='person'>
                    <h2 style={{margin: '0'}}>Freddy</h2>
                    <a href="tel:0733698223" style={{ textDecoration: 'underline', color: 'white' }}>
                      <span style={{ display: 'flex', flexDirection: 'row', fontSize: '.5rem', alignItems: 'center' }}>
                        <IconPhone style={{ color: 'black'}} />
                        <p style={{margin: '0 0 0 .3rem'}}>073-3698223</p>
                      </span>
                    </a>
                  </div>
                </div>
                <h2 style={{ margin: '0', marginTop: '2rem' }}>Toastmaster Simon</h2>
                  <a href="tel:011340098" style={{ textDecoration: 'underline',  color: 'white' }}>
                  <span style={{ display: 'flex', flexDirection: 'row', fontSize: '.5rem', alignItems: 'center' }}>
                      <IconPhone style={{ color: 'black' }} />
                      <p style={{margin: '0 0 0 .3rem'}}>073-4187605</p>
                    </span>
                  </a>
              </div>
           </Modal>
           {!modalOpen &&
                      <div className='header-main' style={styles}>
                      <div className='header-items-wrapper'>
                        <Link to='/'>
                          <p>HEM</p>
                        </Link>
                        <Link to='/info'>
                          <p>INFORMATION</p>
                        </Link>
                        <Link to='/osa'>
                          <p>OSA</p>
                        </Link>
                        <div onClick={() => setModalOpen(true)} className='kontaktanchor'>
                          <p>KONTAKT</p>
                        </div>
                        <Link to='/media'>
                          <p>MEDIA</p>
                        </Link>
                      </div>
                    </div>
           }
        </div>
      )}
    </Transition>
  );
};

export default Header;