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
          coming.push(guest); // Add guest to "isComing" array
        } else {
          notComing.push(guest); // Add guest to "isNotComing" array
        }
      });

      setIsComing(coming); // Update the isComing state with the filtered list
      setIsNotComing(notComing); // Update the isNotComing state with the filtered list
    }
  }, [guests]); // Runs whenever guests change

  useEffect(() => {
    setTimeout(() => {
      setLoadingResults(false);
    }, 1500);
  }, []);

  return (
    <MantineProvider cssVariablesResolver={cssVariablesResolver}>
      <div className='adminmain' style={{justifyContent: loadingResults ? 'center' : 'flex-start'}}>
        <Header />
        {loadingResults ? (
          <>
          <Loader size={'md'} /> 
          <p>Laddar data...</p>
          <p>{import.meta.env.VITE_admin_pw}</p>
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
              <div className='isComing-div'>
                {isComing?.length > 0 ? (
                  isComing.map((guest, index) => (
                    <div className='guest-div' key={index}>
                      <div className='guest-name'>
                        {guest?.namn}
                      </div>
                      <div className='guest-status'>
                        {guest?.specialkost}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No guests are coming.</p>
                )}
              </div>
              {isNotComing?.length > 0 && (
                <div className='isComing-div'>
                  <h2>❌ Kommer Inte</h2>
                  {isNotComing.map((guest, index) => (
                    <div className='guest-div' key={index}>
                      <div className='guest-name'>
                        {guest?.namn}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </MantineProvider>
  );
};

export default AdminPage;
