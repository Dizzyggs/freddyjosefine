import React, { useState, useEffect } from 'react';
import { MantineProvider, Button, Transition, Radio, RadioGroup } from '@mantine/core';
import emailjs from 'emailjs-com';
import './OSA.css';
import Header from '../Header/Header';
import { addOsa } from '../FirebaseApp/FirebaseApp';
import { cssVariablesResolver } from '../utils/utils';

const OSA = () => {
  const [kost, setKost] = useState('');
  const [names, setNames] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [willCome, setWillCome] = useState('yes'); // Will map to RadioGroup value
  const [sentEmail, setSentEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sentEmail) {
      setTimeout(() => {
        setSentEmail(false);
      }, 3000);
    }
  }, [sentEmail]);

  const handleSendAnswer = () => {
    if (names === '') {
      setInvalid(true);
      return;
    }

    setLoading(true); // Set loading to true while sending the email
    const kosten = kost == '' ? `Ingen specialkost.` : `Specialkost: ${kost}`
    const kostenAdmin = kost == '' ? `` : `${kost}`
    const templateParams = {
      to_name: 'Freddy & Josefine',
      from_name: names,
      message: kost,
      kost: kosten == '' ? `Ingen specialkost.` : `Specialkost: ${kost}`
    };

    emailjs.send('service_d0fwyle', 'template_9cewfa5', templateParams, 'user_CsWVm2lpWvSgIf8U7QkIh')
      .then((response) => {
        const isComing = willCome == 'no' ? false : true
        setLoading(false); // Set loading to false after successful response
        setSentEmail(true);
        addOsa(names, isComing, kostenAdmin)
        setWillCome(true);
        setNames('')
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setLoading(false); // Set loading to false after error
      });
  };

  useEffect(() => {
    if (invalid) {
      setTimeout(() => {
        setInvalid(false);
      }, 3000);
    }
  }, [invalid]);

  return (
    <MantineProvider defaultColorScheme="dark" cssVariablesResolver={cssVariablesResolver} withCssVariables>
      <div className='osa-main'>
        <Header positionType='absolute' />
        <div className="flowerpic" />
        <div className='osa-content'>
          {!sentEmail && (
            <>
              <h1>Låt oss veta om du/ni kommer!</h1>
              <div className='input-wrapper'>
                <label>
                  Namn
                  <input
                    type="text"
                    name="from_name"
                    onChange={(e) => setNames(e.target.value)}
                    value={names}
                    required
                    placeholder='Om ni är två fyll i bådas namn.'
                  />
                </label>
                <label style={{ marginTop: '.5rem' }}>
                  Specialkost
                  <input
                    type="text"
                    name="kost"
                    placeholder='T.ex: 1 Vegetarian (Om inget, lämna blankt)'
                    onChange={(e) => setKost(e.target.value)}
                    value={kost}
                  />
                </label>

                {/* Use RadioGroup for radio buttons */}
                <RadioGroup
                  value={willCome}
                  onChange={setWillCome}
                  style={{ marginTop: '1rem', color: 'white' }}
                >
                  <Radio value="yes" label="Jag/vi kommer" />
                  <Radio value="no" label="Jag/vi kommer inte" />
                </RadioGroup>
              </div>
              <Button style={{ marginTop: '1.5rem' }} onClick={handleSendAnswer} loading={loading}>
                Skicka svar
              </Button>

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
            </>
          )}
            {sentEmail && <h1 className='answersent'>Tack för du skickade ditt/erat svar!</h1>}
        </div>
      </div>
    </MantineProvider>
  );
};

export default OSA;
