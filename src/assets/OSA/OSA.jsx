import React from 'react';
import { useState, useEffect } from 'react';
import { MantineProvider, Button, Transition, Radio } from '@mantine/core';
import '../Header/Header'
import '@mantine/core/styles.css';
import './OSA.css';
import Header from '../Header/Header';

const OSA = () => {
  const [kost, setKost] = useState('')
  const [names, setNames] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [willCome, setWillCome] = useState(true)

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

  const handleSendAnswer = () => {
    if(names == '') {
      setInvalid(true)
      return;
    }
  }

  useEffect(() => {
    if(invalid) {
      setTimeout(() => {
        setInvalid(false)
      }, 3000);
    }
  }, [invalid])


  return (
    <MantineProvider defaultColorScheme="dark" cssVariablesResolver={cssVariablesResolver} withCssVariables>
      <div className='osa-main'>
        <Header/>
        <div className="flowerpic" />
        <div className='content'>
          <h1>Låt oss veta om du/ni kommer!</h1>
          <div className='input-wrapper'>
            <label> 
              Namn
              <input type="text" name="name" onChange={(e) => setNames(e.target.value)} value={names}/>
            </label>
            <label style={{marginTop: '.5rem'}}> 
              Specialkost
              <input type="text" name="kost" placeholder='T.ex: Vegetarian' onChange={(e) => setKost(e.target.value)} value={kost}/>
            </label>
            <Radio
              label="Jag/vi kommer"
              onChange={(event) => setWillCome(event.currentTarget.checked)}
              checked={willCome}
              style={{color: 'white', marginTop: '1rem'}}
            />
            <Radio
              label="Jag/vi kommer inte"
              onChange={(event) => setWillCome(false)}
              checked={!willCome}
              style={{color: 'white', marginTop: '.6rem'}}
            />
          </div>
          <Button style={{marginTop: '1.5rem'}} onClick={handleSendAnswer}>Skicka Svar</Button>
          <Transition
            mounted={invalid}
            transition="slide-down"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles} className='error-div'>
                Du måste fylla i namn!
              </div>
            )}
          </Transition>
        </div>
      </div>
    </MantineProvider>
  );
};

export default OSA;