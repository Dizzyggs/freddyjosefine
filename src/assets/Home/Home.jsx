import React, { useEffect, useState } from 'react';
import './Home.css';
import { MantineProvider, Transition } from '@mantine/core';
import Header from '../Header/Header';
import '@mantine/core/styles.css';

const Home = () => {
  const [rendered, setRendered] = useState(false);
  const [renderInfo, setRenderInfo] = useState(false);

  useEffect(() => {
    setRendered(true);
    const timer = setTimeout(() => {
      setRenderInfo(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const cssVariablesResolver = (theme) => ({
    light: {
      '--mantine-color-body': 'transparent',
    },
    dark: {
      '--mantine-color-body': 'transparent',
    },
  });

  return (
    <MantineProvider cssVariablesResolver={cssVariablesResolver}>
      <div className="main">
        <Header />
        <div className="flowerpic" />
        <div className="welcomediv">
          <Transition
            mounted={rendered}
            transition="slide-down"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles} className="welcome-content">
                <h1>Josefine & Freddy</h1>
                <p className='font'>Våran dag</p>
                <br />
                <Transition
                  mounted={renderInfo}
                  transition="fade-up"
                  duration={600}
                  timingFunction="ease"
                  enterDelay={500}
                >
                  {(infostyles) => (
                    <div className="info" style={infostyles}>
                      <p>
                        Nu är det äntligen dags! Välkommen till vårat bröllop den
                        29e Maj 2025.{' '}
                        <span className='fat'>Vi samlas i tingstad kyrka 15:00.</span>
                      </p>
                      <p>
                        Efter ceremonin i kyrkan rör vi oss utåt mot{' '}
                        <span className='fat'>Manheims Säteri</span>, där blir det lite
                        mingel, mat och fest framåt kvällen!
                      </p>
                    </div>
                  )}
                </Transition>
              </div>
            )}
          </Transition>
        </div>
      </div>
    </MantineProvider>
  );
};

export default Home;
