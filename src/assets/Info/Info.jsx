import React, { useEffect, useState } from 'react';
import './Info.css';
import Header from '../Header/Header';
import { MantineProvider, Transition } from '@mantine/core';
import useMobileDetect from '../hooks/useMobileDetect';

const Info = () => {
  const [rendered, setRendered] = useState(false)
  const isMobile = useMobileDetect();
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

  return (
    <MantineProvider
      defaultColorScheme="light"
      cssVariablesResolver={cssVariablesResolver}
      withCssVariables
    >
        <Header />
      <div className="info-main">
        {!isMobile &&
          <div className="flowerpic" />
        }
        <Transition
          mounted={rendered}
          transition="fade"
          duration={800}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles} className='mainwrapp'>
                <div className='info-content'>
                <h1>Information</h1>
                <p>
                  <span className='underline'>Tider:</span> vigseln i Matteus kyrka är mellan 16.00-17.00. Därefter ses vi omgående på Manheims Säteri för en kväll med middag och fest. Festen avrundas vid 01.00.
                </p>
                <p>
                  <span className='underline'>Klädsel:</span> det absolut viktigaste för oss är att du känner dig snygg och bekväm! Klädkoden kommer således inte vara specificerad.
                </p>
                <p>
                  <span className='underline'>Tal/underhållning:</span> tal och annat anmäles på förhand (senast den 1 februari) till toastmaster Simon Istgren tel. 07XXXXXXX. Vi önskar om möjligt att tiden för tal begränsas till max 5 minuter.
                </p>
                <p>
                  <span className='underline'>Bröllopsgåva:</span> din närvaro är mer än tillräcklig. Vill du ändå ge en bröllopspresent så önskar vi oss ett bidrag till bröllopet. Bidrag kan swishas/överföras till brudens bror, Daniel Tollin tel. 07XXXXXXX.
                </p>
                <p>
                  <span className='underline'>Transport:</span> till Manheims säteri kan man ta sig genom att på förhand ordna skjuts, beställa taxi alternativt kika på om det går en passande buss (linje 444). Din bil kan stå parkerad på Manheims över natten och hämtas dagen därpå. Parkering är kostnadsfri. Det kan också vara en bra idé att samåka. Använd gärna Facebook-gruppen för den typen av förfrågningar.
                </p>
                <p>
                  <span className='underline'>Övernattning:</span> det finns ett begränsat antal rum att hyra på Manheims säteri. Ett dubbelrum kostar 600 kr/natt inklusive frukost. Du behöver ha med dig egna sängkläder. Du behöver också göra en enklare städning innan utcheckning. Vill man vara fler än två personer i rummet kan man hyra till en extrabädd för +200 kr/person. Vill du hyra ett rum, vänligen kontakta Freddy eller Josefine senast 1 februari då vi har tillgång till ett rabatterat pris på rumsbokning när den sker via oss.
                </p>
                <p>
                  <span className='underline'>Självkostnad:</span> vi kommer att bjuda på ett glas bubbel och snittar vid ankomst, buffé till middag inklusive ett glas öl/vin/cider/alkoholfritt samt tårta och kaffe. Utöver detta handlar du dryck till självkostnadspris i Manheims bar.
                </p>
                
                </div>
            </div>
          )}
        </Transition>
      </div>
    </MantineProvider>
  );
};

export default Info;