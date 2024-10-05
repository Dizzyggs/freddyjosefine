import React, { useEffect, useState } from 'react';
import './Home.css';
import { MantineProvider, Transition, Modal } from '@mantine/core';
import Header from '../Header/Header';
import '@mantine/core/styles.css';
import { cssVariablesResolver } from '../utils/utils';
import { Link } from 'react-router-dom';

const Home = () => {
  const [rendered, setRendered] = useState(false);
  const [renderInfo, setRenderInfo] = useState(false);
  const [renderTracker, setRenderTracker] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const welcomeDuration = 400

  useEffect(() => {
    setRendered(true);
    const timer = setTimeout(() => {
      setRenderInfo(true);
      setTimeout(() => {
        setRenderTracker(true)
      }, (welcomeDuration + 100));
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);
  

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
                <div className='hero-section' style={{marginTop: renderTracker ? '4rem' : '0rem'}}>
                  <h1>Josefine & Freddy</h1>
                  <p className='font'>Våran dag</p>
                </div>
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
                        Varmt välkommen att fira vigseln mellan oss Lördagen den XX maj 2025, klockan 15.00 i Styrstad Kyrka.
                      </p>
                      <br/>
                    
                      <p>
                        <span style={{textDecoration: 'underline'}}>Klädsel:</span> Ej specificerad
                      </p>
                      <Link to={'/osa'}>
                        <p>
                          <span style={{textDecoration: 'underline'}}>OSA</span> på hemsidan senast den XX XX 2025.
                        </p>
                      </Link>
                      <p>
                        Se fliken <Link to={'/info'}><span style={{textDecoration: 'underline'}}>Information</span></Link> för en mer detaljerad tidplan samt Q/A.
                      </p>
                      <br/>
                      <p>
                        Den största gåvan för oss är ditt deltagande under vår stora dag. Vill du ändå lämna en present tar vi tacksamt emot ett bidrag till vår bröllopsresa.
                      </p>
                      {/* <p>
                        Efter ceremonin i kyrkan rör vi oss utåt mot{' '}
                        <span className='fat'>Manheims Säteri</span>, där blir det lite
                        mingel, mat och fest framåt kvällen!
                      </p> */}
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
