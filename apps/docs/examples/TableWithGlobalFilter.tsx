import { Card, Grid, Input, Table } from '@mantine/core';
import React from 'react';
import { useFlexysearch, FlexysearchProvider } from 'flexysearch-react'

interface Element {
  name: string;
  mass: number;
}

const data = [
  { name: 'Testing', mass: 100 },
]

export default function Module() {
  return (
    <FlexysearchProvider>
      <TableWithGlobalFilter />
    </FlexysearchProvider>
  );
}

function TableWithGlobalFilter() {
  const { filtered_data, updateGlobalSearch } = useFlexysearch<Element>({ data }) 
  console.log("🚀 ~ file: TableWithGlobalFilter.tsx:24 ~ TableWithGlobalFilter ~ filtered_data:", filtered_data)

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