import { render } from '@testing-library/react';

import FlexysearchReact from './flexysearch-react';

describe('FlexysearchReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlexysearchReact />);
    expect(baseElement).toBeTruthy();
  });
});
