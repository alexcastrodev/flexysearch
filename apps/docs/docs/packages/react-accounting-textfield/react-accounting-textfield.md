---
sidebar_position: 2
---

import Textfield from '../../../examples/Textfield'

# React Accounting Textfield

## Create your first React Page

Create a file at `src/components/textfield.tsx`:

<Textfield />

## Code

```jsx title="src/components/textfield.tsx"
import React from 'react';
import { CurrencyInput } from 'react-accounting-textfield';

export default function App({ appProps }) {
  return (
     <TextField
        value={value}
        onBlurCurrency={(data) => {
          pushEvent('onBlurCurrency', data)
        }}
        onChangeCurrency={(data) => {
          pushEvent('onChangeCurrency', data)
          setValue(data.value)}
        }
        maximumFractionDigits={2} // default 2
      />
  );
}
```
