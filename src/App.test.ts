import { describe, it, expect } from 'vitest'; 
import { sum } from './main.tsx'; 
import App from './App';


describe('test main.tsx file', () => {
  it('sums 1+2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3); 
  });
});
