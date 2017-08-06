import React from 'react';
import App from './App';

//import renderer from 'react-test-renderer';
import {BaconOptimizer} from './BaconOptimizer';

describe('BaconOptimizer', () => {
  const optimizer = new BaconOptimizer();

  describe('The Base Case', () => {
    it('returns 20 minutes', () => {
      const duration = optimizer.optimize([], {});

      expect(duration).toBe(20 * 60);
    });
  });

  describe('One Bacon Bit', () => {
    it('returns 20 minutes with initial BSI 0', () => {
      const theBit = {bsi: 0, duration: 20 * 60, timestamp: 0};
      const duration = optimizer.optimize([theBit], {});

      expect(duration).toBe(20 * 60);
    });
    it('returns 18 minutes with initial BSI -1 (too crispy)', () => {
      const theBit = {bsi: -1, duration: 20 * 60, timestamp: 0};
      const duration = optimizer.optimize([theBit], {});

      expect(duration).toBe(18 * 60);
    });
    it('returns 22 minutes with initial BSI 1 (too floppy)', () => {
      const theBit = {bsi: 1, duration: 20 * 60, timestamp: 0};
      const duration = optimizer.optimize([theBit], {});

      expect(duration).toBe(22 * 60);
    });
  });

  describe('Some Bacon Bits', () => {
    it('is makin bacon', () => {
      const duration = optimizer.optimize([
        {bsi: -1, duration: 20  * 60, timestamp: 0},
        {bsi: -1, duration: 18  * 60, timestamp: 1},
        {bsi: +1, duration: 16  * 60, timestamp: 2},
        {bsi: -1, duration: 17  * 60, timestamp: 3},
        {bsi:  0, duration: 16.5* 60, timestamp: 4},
        {bsi: -1, duration: 16.5* 60, timestamp: 5},
      ], {});

      expect(duration).toBe(16 * 60);
    });
  });

});