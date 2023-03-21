---
sidebar_position: 2
---

import TableWithGlobalFilter from '../../examples/TableWithGlobalFilter'

# Global filter


## Create your first React Page

Create a file at `src/pages/my-react-page.js`:

<TableWithGlobalFilter />

## Code

<a href='https://github.com/AlexcastroDev/flexysearch'>Show full code</a>

```jsx title="src/pages/my-react-page.tsx"
import React from 'react';
import { useFlexysearch, FlexysearchProvider } from 'flexysearch-react'

const data = [
  { name: 'Testing', mass: 100 },
]

// Each Table should have the FlexysearchProvider
export default function Module() {
  return (
    <FlexysearchProvider>
      <TableWithGlobalFilter />
    </FlexysearchProvider>
  );
}

function TableWithGlobalFilter() {
  const { filtered_data, updateGlobalSearch } = useFlexysearch<Element>({ data }) 

  const rows = filtered_data.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    updateGlobalSearch(value);
  }
  
  return (
    <Card>
      <Grid>
        <Grid.Col span={6}>
          <Input placeholder="Search..." onChange={handleSearchChange} />
        </Grid.Col>
      </Grid>
      <Table striped withBorder mt='lg'>
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ width: '100%' }}>Mass</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
}
```