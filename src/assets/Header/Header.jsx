import React, { useState, useEffect } from 'react';
import './Header.css'
import { Transition } from '@mantine/core';
import { Link } from 'react-router-dom';

const Header = () => {
  const [rendered, setRendered] = useState(false)
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
        <div className='header-main' style={styles}>
          <Link to='/'>
            <p>HEM</p>
          </Link>
          <Link to='/info'>
            <p>INFORMATION</p>
          </Link>
          <Link to='/osa'>
            <p>OSA</p>
          </Link>
          <Link to='/kontakt'>
            <p>KONTAKT</p>
          </Link>
        </div>
      )}
    </Transition>
  );
};

export default Header;