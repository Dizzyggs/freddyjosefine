import React, { useEffect, useState } from 'react';
import './Info.css';
import Header from '../Header/Header';
import { MantineProvider, Transition } from '@mantine/core';

const Info = () => {
  const [rendered, setRendered] = useState(false)
  const cssVariablesResolver = (theme) => ({
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
    setRendered(true)
  }, [])

  const imgLink = "https://www.svenskakyrkan.se/bilder/1608160086(2).jpg?DoProcessing=&w=1680"
  const säteri = 'https://golflivet.se/wp-content/uploads/2023/07/bravikens-gk.jpg'
  return (
    <MantineProvider
      defaultColorScheme="light"
      cssVariablesResolver={cssVariablesResolver}
      withCssVariables
    >
        <Header />
      <div className="info-main">
        <div className="flowerpic" />
        <Transition
          mounted={rendered}
          transition="fade"
          duration={800}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles} className='mainwrapp'>
                <h1>Information</h1>
            </div>
          )}
        </Transition>
      </div>
    </MantineProvider>
  );
};

export default Info;