import React from 'react';
import { CurrencyInput } from "react-accounting-textfield"
import { ScrollArea, Box, Text } from '@mantine/core'

interface Events {
  eventname: string;
  payload: any;
}

export default function App() {
  const [events, setEvents] = React.useState<Array<Events>>([]);
  const [value, setValue] = React.useState<string>('0');

  const pushEvent = (eventname, payload) => {
    setEvents((events) => [{ eventname, payload }, ...events]);
  }

  return (
    <>
      <Text>2 Point floating</Text>
      <CurrencyInput
        value={value}
        onBlurCurrency={(data) => {
          pushEvent('onBlurCurrency', data)
        }}
        onChangeCurrency={(data) => {
          pushEvent('onChangeCurrency', data)
          setValue(data.value)}
        }
      />

      <Text mt='lg'>4 Point floating</Text>
      <CurrencyInput
        value={value}
        onBlurCurrency={(data) => {
          pushEvent('onBlurCurrency', data)
        }}
        onChangeCurrency={(data) => {
          pushEvent('onChangeCurrency', data)
          setValue(data.value)}
        }
        maximumFractionDigits={4}
      />

    <Text mt='lg'>Uncontrolled</Text>
      <CurrencyInput
        defaultValue='1123,9934'
        onBlurCurrency={(data) => {
          pushEvent('onBlurCurrency', data)
        }}
        onChangeCurrency={(data) => {
          pushEvent('onChangeCurrency', data)
          setValue(data.value)}
        }
      />

      <Box mt='lg' h={400}>
      <Text>Events will show here:</Text>
      <ScrollArea mt='lg' h={250} >
        {
          events.map((event, index) => (
            <div key={index}>
              <strong>{event.eventname} - {events.length - index}</strong>
              <pre>{JSON.stringify(event.payload, null, 2)}</pre>
            </div>
          ))
        }
      </ScrollArea>
      </Box>
    </>
  );
}
