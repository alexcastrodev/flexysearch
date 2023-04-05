import { Button, Card, Grid, Input, Table } from '@mantine/core';
import React from 'react';
import { useFlexysearch, FlexysearchProvider } from 'flexysearch-react';
import { IRule, RuleNumberOptions, RuleOperator } from 'flexysearch';

interface Element {
  name: string;
  power: number;
}

const mockDataServ = [
  { name: 'Madara', power: 100 },
  { name: 'Naruto', power: 60 },
  { name: 'Sasuke', power: 48 },
  { name: 'Sakura', power: 10 },
];

export default function Module() {
  return (
    // You can set default data here
    // <FlexysearchProvider data={[] as Element[]}>
    <FlexysearchProvider>
      <TableWithGlobalFilter />
    </FlexysearchProvider>
  );
}

function TableWithGlobalFilter() {
  const {
    filtered_data,
    updateGlobalSearch,
    setData,
    updateFilterRules,
    searchValue,
    rules,
  } = useFlexysearch<Element>();

  React.useEffect(() => {
    setData(mockDataServ);
  }, []);

  const rows = filtered_data.map((element, key) => (
    <tr key={key}>
      <td>{element.name}</td>
      <td>{element.power}</td>
    </tr>
  ));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    updateGlobalSearch(value);
  };

  const handleFilterUpper = () => {
    const rules: IRule[] = [
      {
        field: 'power',
        type: 'number',
        term: 50,
        role: RuleNumberOptions.biggerOrEquals,
        operator: RuleOperator.AND,
      },
    ];
    updateFilterRules(rules);
  };

  const handleFilterLower = () => {
    const rules: IRule[] = [
      {
        field: 'power',
        type: 'number',
        term: 50,
        role: RuleNumberOptions.smallerOrEquals,
        operator: RuleOperator.AND,
      },
    ];
    updateFilterRules(rules);
  };

  const clear = () => {
    const rules: IRule[] = [];
    updateFilterRules(rules);
    updateGlobalSearch('');
  };

  return (
    <Card>
      <Grid>
        <Grid.Col span={6}>
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            mr="sm"
            onClick={handleFilterLower}
            disabled={rules.some(
              (item) => item.role === RuleNumberOptions.smallerOrEquals
            )}
          >
            Filter Lower 50
          </Button>
          <Button
            onClick={handleFilterUpper}
            disabled={rules.some(
              (item) => item.role === RuleNumberOptions.biggerOrEquals
            )}
          >
            {' '}
            Filter Upper 50{' '}
          </Button>
          <Button variant="subtle" onClick={clear}>
            Clear
          </Button>
        </Grid.Col>
      </Grid>
      <Table striped withBorder mt="lg">
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ width: '100%' }}>power</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
}
