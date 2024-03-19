import {useCallback, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import type {
  CurrencyCode,
  Customer,
} from '@shopify/hydrogen-react/storefront-api-types';

import {useCustomer, useGlobal} from '~/hooks';

export function useDataLayerAccount({
  currencyCode,
  DEBUG,
  generateUserProperties,
  userDataEvent,
  userDataEventTriggered,
}: {
  currencyCode?: CurrencyCode | undefined;
  DEBUG?: boolean;
  generateUserProperties: (arg0: any) => any;
  userDataEvent: (arg0: any) => void;
  userDataEventTriggered: boolean;
}) {
  const {emitter} = useGlobal();
  const customer = useCustomer();

  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  const loggedInEvent = useCallback(({userProperties}: any) => {
    const event = {
      event: 'login',
      event_id: uuidv4(),
      event_time: new Date().toISOString(),
      user_properties: userProperties,
    };

    if (window.gtag) window.gtag('event', event.event, event);
    if (DEBUG) console.log(`DataLayer:gtag:${event.event}`, event);
    setLoggedIn(false);
  }, []);

  const registeredEvent = useCallback(({userProperties}: any) => {
    const event = {
      event: 'sign_up',
      event_id: uuidv4(),
      event_time: new Date().toISOString(),
      user_properties: userProperties,
    };

    if (window.gtag) window.gtag('event', event.event, event);
    if (DEBUG) console.log(`DataLayer:gtag:${event.event}`, event);
    setRegistered(false);
  }, []);

  const getUserPropertiesAndTriggerLoggedInEvents = useCallback(
    async ({
      customer: _customer,
      currencyCode: _currencyCode,
    }: {
      customer: Customer;
      currencyCode?: CurrencyCode | undefined;
    }) => {
      const userProperties = await generateUserProperties({
        customer: _customer,
      });
      loggedInEvent({userProperties});
      userDataEvent({currencyCode: _currencyCode, userProperties});
    },
    [],
  );

  const getUserPropertiesAndTriggerRegisterEvents = useCallback(
    async ({
      customer: _customer,
      currencyCode: _currencyCode,
    }: {
      customer: Customer;
      currencyCode?: CurrencyCode | undefined;
    }) => {
      const userProperties = await generateUserProperties({
        customer: _customer,
      });
      registeredEvent({userProperties});
      userDataEvent({currencyCode: _currencyCode, userProperties});
    },
    [],
  );

  // Subscribe to EventEmitter topics for 'login' and 'sign_up' events
  useEffect(() => {
    emitter?.on('CUSTOMER_LOGGED_IN', () => {
      setLoggedIn(true);
    });
    emitter?.on('CUSTOMER_REGISTERED', () => {
      setRegistered(true);
    });
    return () => {
      emitter?.off('CUSTOMER_LOGGED_IN', () => {
        setLoggedIn(true);
      });
      emitter?.off('CUSTOMER_REGISTERED', () => {
        setRegistered(true);
      });
    };
  }, []);

  // Generate new base data after customer login and customer profile is ready
  // Trigger 'user_data' and 'login' events
  useEffect(() => {
    if (!customer || !currencyCode || !loggedIn || !userDataEventTriggered)
      return;
    getUserPropertiesAndTriggerLoggedInEvents({
      customer,
      currencyCode,
    });
  }, [!!customer, !!currencyCode, loggedIn, userDataEventTriggered]);

  // Generate new base data after customer register and customer profile is ready
  // Trigger 'user_data' and 'sign_up' events
  useEffect(() => {
    if (!customer || !currencyCode || !registered || !userDataEventTriggered)
      return;
    getUserPropertiesAndTriggerRegisterEvents({
      customer,
      currencyCode,
    });
  }, [!!customer, !!currencyCode, registered, userDataEventTriggered]);
}
