import React, { useEffect, useState } from 'react';
import './Home.css';
import { MantineProvider, Transition, Modal } from '@mantine/core';
import Header from '../Header/Header';
import '@mantine/core/styles.css';
import { cssVariablesResolver } from '../utils/utils';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [rendered, setRendered] = useState(false);
  const [renderInfo, setRenderInfo] = useState(false);
  const [renderTracker, setRenderTracker] = useState(false)
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
          <Helmet>
          <link rel="preload" href="../bg.png" as="image" />
        </Helmet>
        <Header />
        <img className='flowerpic' src={"../bg.png"} alt='bg' loading='lazy'/>
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
                  <p className='font'>Vår dag</p>
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
                        Varmt välkommen att fira vigseln mellan Josefine och Freddy, lördagen den 22 mars 2025, klockan 16.00 i Matteus Kyrka.
                      </p>
                      <br/>
                      <Link to={'/osa'}>
                        <p>
                          <span style={{textDecoration: 'underline'}}>OSA</span> på denna hemsida senast 1 februari. Barn är välkomna på vår vigsel, men under middag och fest väljer vi att fira utan dem små. Undantag för de som ammar.
                        </p>
                      </Link>
                      <p style={{margin: '.5rem 0'}}>
                        <span style={{textDecoration: 'underline'}}>Klädsel:</span> Ej specificerad
                      </p>
                      <p>
                        Se fliken <Link to={'/info'}><span style={{textDecoration: 'underline'}}>Information</span></Link> för mer ingående info om dagen.
                      </p>
                      <br/>
                      <p>
                        Den största gåvan för oss är ditt deltagande under vår stora dag. Vill du ändå lämna en present tar vi tacksamt emot ett bidrag.
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
