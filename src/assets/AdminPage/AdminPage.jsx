import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import { GetGuestsList } from '../FirebaseApp/FirebaseApp';
import { Loader, MantineProvider } from '@mantine/core';
import { cssVariablesResolver } from '../utils/utils';
import Header from '../Header/Header';

const AdminPage = () => {
  const [guests, setGuests] = useState([]);
  const [isComing, setIsComing] = useState([]);
  const [isNotComing, setIsNotComing] = useState([]);
  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const guestsx = await GetGuestsList(); // Wait for the promise to resolve
        setGuests(guestsx); // Set the guests array state
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };

    fetchGuests();
  }, []);

  useEffect(() => {
    if (guests?.length > 0) {
      const coming = [];
      const notComing = [];

      guests.forEach((guest) => {
        if (guest.coming === true) {
          coming.push(guest);
        } else {
          notComing.push(guest);
        }
      });

      setIsComing(coming);
      setIsNotComing(notComing);
    }
  }, [guests]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingResults(false);
    }, 1500);
  }, []);

  return (
    <MantineProvider cssVariablesResolver={cssVariablesResolver}>
      <div className='adminmain' style={{ justifyContent: loadingResults ? 'center' : 'flex-start' }}>
        {!loadingResults && <Header />}
        {loadingResults ? (
          <>
            <Loader size={'md'} />
            <p>Laddar data...</p>
          </>
        ) : (
          <>
            <div className='total'>
              <h1>Totalt Kommer: {isComing?.length}</h1>
              <h1>Totalt Kommer Inte: {isNotComing?.length}</h1>
            </div>
            <div className='adminpage'>
              <div className='answer-header'>
                <h2>✅ Kommer</h2>
                <p>Specialkost ?</p>
              </div>
              {isComing?.length > 0 && (
                <div className='guests-coming'>
                  {isComing.map((guest, index) => (
                    <div className='guest-div' key={index}>
                      <div className='guest-name'>
                        {guest?.namn}
                      </div>
                      <div className='guest-status'>
                        {guest?.specialkost}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isNotComing?.length > 0 && (
                <div className='isComing-div'>
                  <div className='answer-header'>
                    <h2>❌ Kommer Inte</h2>
                  </div>
                  {isNotComing.map((guest, index) => (
                    <div className='guest-div' key={index}>
                      <div className='guest-name'>
                        {guest?.namn}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isComing?.length == 0 && isNotComing?.length == 0 &&
                <div className='no-guests-osat'>
                  <h2>Inga har osat ännu.</h2>
                </div>
              }
            </div>
          </>
        )}
      </div>
    </MantineProvider>
  );
};

export default AdminPage;
