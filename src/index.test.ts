import { describe, it, expect } from 'vitest';
import { svgs } from './data/svgs';

describe('Get svgs by category', () => {
  it('should have a category named "Social"', () => {
    expect(svgs.find((svg) => svg.category === 'Social')).toBeDefined();
  });
});

describe('Get a specific svg', () => {
  it('should have a svg named "Discord"', () => {
    expect(svgs.find((svg) => svg.title === 'Discord')).toBeDefined();
  });
});
