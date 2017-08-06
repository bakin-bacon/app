export class BaconOptimizer {
  constructor() {
  }

  optimize(bacon_bits, bops){
    // TODO: use bops
    const initial_duration = 20 * 60;
    const initial_delta = 2 * 60;
    let bits = bacon_bits
      .slice()
      .sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
      .filter(bit => bit.bsi !=0)
      .reverse().concat({duration: initial_duration, bsi: 0}).reverse();

    let directionChanges = bits
      .map((bit, index) => ({original: bit, next: bits[index+1]}))
      .slice(0, -1)
      .filter(pair => pair.original.bsi != pair.next.bsi)
      .length - 1; // adjust for "fake" first base case

    directionChanges = Math.min(Math.max(0, directionChanges), 2);
      
    let delta = initial_delta / Math.pow(2, directionChanges);
    let lastBit = bits.pop();

    return lastBit.duration + lastBit.bsi * delta;
  }
}