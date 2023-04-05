---
sidebar_position: 3
---

import TableWithGlobalFilter from '../../examples/TableWithSSRdata'

# SSR Data

## Create your first React Page

Create a file at `src/pages/my-react-page.js`:

<TableWithGlobalFilter />

## Code

<a target='_blank' alt='project-link' href='https://stackblitz.com/edit/react-ts-s8gvyy?file=App.tsx'>Show full code</a>

```jsx title="src/pages/my-react-page.tsx"
import React from 'react';
import { useFlexysearch, FlexysearchProvider } from 'flexysearch-react';

// Each Table should have the FlexysearchProvider
export default function App({ appProps }) {
  return (
    // You can set default data here
    // <FlexysearchProvider data={[] as Element[]}>
    <FlexysearchProvider data={appProps.table.data}>
      <TableWithGlobalFilter />
    </FlexysearchProvider>
  );
}
```
