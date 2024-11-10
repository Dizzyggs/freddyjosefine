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
                  <span className='underline'>Klädsel:</span> Det absolut viktigaste för oss är att du känner dig snygg och bekväm! Klädkoden kommer således inte vara specificerad.
                </p>
                <p>
                  <span className='underline'>Tal/underhållning:</span> tal och annat anmäles på förhand (senast den XX XX) till toastmaster Simon Istgren tel. 07XXXXXXX. Vi önskar om möjligt att tiden för tal begränsas till max 5 minuter.
                </p>
                <p>
                  <span className='underline'>Bröllopsgåva:</span> din närvaro är mer än tillräcklig. Vill du ändå ge en bröllopspresent så önskar vi oss ett bidrag till vår bröllopsresa. Bidrag kan swishas/överföras till brudens bror, Daniel Tollin tel. 07XXXXXXX.
                </p>
                <p>
                  <span className='underline'>Transport:</span> Styrstad kyrka ligger 13 minuter med bil från centrala Norrköping. Det går tyvärr inga bra bussförbindelser dit. Vi rekommenderar därför att man tar egen bil till kyrkan, för att därefter enkelt kunna ta sig till lokalen som endast ligger fem minuter bort med bil. Det är dessvärre inte gångavstånd mellan kyrkan och lokalen. Hem kan man ta sig genom att på förhand ordna skjuts, beställa taxi alt kika på om det går en passande buss (linje 444). Din bil kan stå parkerad på Manheims över natten och hämtas dagen därpå. Parkering är kostnadsfri. Det kan också vara en idé att samåka. Använd gärna Facebook-gruppen för den typen av förfrågningar.
                </p>
                <p>
                  <span className='underline'>Övernattning:</span> det finns ett begränsat antal rum att hyra på Manheims säteri. Ett dubbelrum kostar 600 kr/natt inklusive frukost. Du behöver ha med dig egna sängkläder. Du behöver också göra en enklare städning innan utcheckning. Vill man vara fler än två personer i rummet kan man hyra till en extrabädd för +200 kr/person. Vill du hyra ett rum, vänligen kontakta Freddy eller Josefine senast den XX XX då vi har tillgång till ett rabatterat pris på rumsbokning när den sker via oss.
                </p>
                <p>
                  <span className='underline'>Självkostnad:</span> vi kommer att bjuda på ett glas bubbel och snittar vid ankomst, buffé till middag inklusive ett glas öl/vin/cider/alkoholfritt, tårta och kaffe samt pizzaslice till vickning. Utöver detta handlar du dryck till självkostnadspris i Manheims bar.
                </p>
                <div className='tidplan-div'>
                  <h3>Tidsplan</h3>
                  <p><span className='underline'>15.00-15.40:</span> Vigsel i Styrstad kyrka</p>
                  <p><span className='underline'>15.40-16.15:</span> Mingel och gruppfotografering utanför kyrkan</p>
                  <p><span className='underline'>16.30:</span> Gästerna anländer till Manheims säteri där det bjuds på ett glas bubbel och snittar</p>
                  <p><span className='underline'>17.15:</span> Brudparet anländer</p>
                  <p><span className='underline'>18.00-19.30:</span> middag (buffé) på övervåningen</p>
                  <p><span className='underline'>19.30-20.30:</span> dessert och kaffe</p>
                  <p><span className='underline'>20.30:</span> Fest på nedervåningen (med DJ XX)</p>
                  {/* <p><span className='underline'>23.00:</span> Pizzaslice</p> */}
                  <p><span className='underline'>01.00:</span> Festen rundas av</p>
                </div>
                </div>
                {/* <div className='info-content'>
                  <p>
                  Klädsel: det viktigaste för oss är att du känner dig snygg och bekväm! Klädkoden kommer således inte vara specificerad.
                  </p>
                  <p>
                  Tal/underhållning: tal och annat anmäles på förhand (senast den XX XX) till toastmaster Simon Istgren tel. 07XXXXXXX. Vi önskar om möjligt att tiden för tal begränsas till max 5 minuter.
                  </p>
                  <p>
                  Bröllopsgåva: din närvaro är mer än tillräcklig. Vill du ändå ge en bröllopspresent så önskar vi oss ett bidrag till vår bröllopsresa. Bidrag kan swishas/överföras till brudens bror, Daniel Tollin tel. 07XXXXXXX.
                  </p>
                  <p>
                  Transport: Styrstad kyrka ligger 13 minuter med bil från centrala Norrköping. Det går tyvärr inga bra bussförbindelser dit. Vi rekommenderar därför att man tar egen bil till kyrkan, för att därefter enkelt kunna ta sig till lokalen som endast ligger fem minuter bort med bil. Det är dessvärre inte gångavstånd mellan kyrkan och lokalen. Hem kan man ta sig genom att på förhand ordna skjuts, beställa taxi alt kika på om det går en passande buss (linje 444). Din bil kan stå parkerad på Manheims över natten och hämtas dagen därpå. Parkering är kostnadsfri. Det kan också vara en idé att samåka. Använd gärna Facebook-gruppen för den typen av förfrågningar.
                  </p>
                  <p>
                  Övernattning: det finns ett begränsat antal rum att hyra på Manheims säteri. Ett dubbelrum kostar 600 kr/natt inklusive frukost. Du behöver ha med dig egna sängkläder. Du behöver också göra en enklare städning innan utcheckning. Vill man vara fler än två personer i rummet kan man hyra till en extrabädd för +200 kr/person. Vill du hyra ett rum, vänligen kontakta Freddy eller Josefine senast den XX XX då vi har tillgång till ett rabatterat pris på rumsbokning när den sker via oss.
                  </p>
                  <p>
                  Självkostnad: vi kommer att bjuda på ett glas bubbel och snittar vid ankomst, buffé till middag inklusive ett glas öl/vin/cider/alkoholfritt, tårta och kaffe samt pizzaslice till vickning. Utöver detta handlar du dryck till självkostnadspris i Manheims bar.
                  </p>
                  <p>
                  Tidplan
                    15-15.40: Vigsel i Styrstad kyrka
                    <br/>
                    15.40-16.15: Mingel och gruppfotografering utanför kyrkan
                    16.30: gästerna anländer till Manheims säteri där det bjuds på ett glas bubbel och snittar
                    17.15: brudparet anländer
                    18.00-19.30: middag (buffé) på övervåningen
                    19.30-20.30: dessert och kaffe
                    20.30: fest på nedervåningen (med DJ XX)
                    23.00: pizzaslice
                    01.00: festen rundas av
                  </p>
                </div> */}
            </div>
          )}
        </Transition>
      </div>
    </MantineProvider>
  );
};

export default Info;