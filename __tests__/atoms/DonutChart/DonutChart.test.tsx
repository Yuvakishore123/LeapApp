import React from 'react';
import {render} from '@testing-library/react-native';
import Donut from '../../../src/components/atoms/DonutChart/DonutChart';
describe('Donut Component', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(
      <Donut
        refreshTrigger={null}
        percentage={50}
        radius={30}
        strokeWidth={10}
        duration={500}
        color="tomato"
        delay={500}
        max={1000}
        textcolor="black"
      />,
    );

    const svgCircle = getByTestId('svg-circle');
    expect(svgCircle).toBeDefined();
  });
  it('renders when finishes correctly', () => {
    const {getByTestId} = render(
      <Donut
        refreshTrigger={null}
        percentage={200}
        radius={30}
        strokeWidth={10}
        duration={500}
        color="tomato"
        delay={500}
        max={200}
        textcolor="black"
      />,
    );

    const svgCircle = getByTestId('svg-circle');
    expect(svgCircle).toBeDefined();
  });
});
