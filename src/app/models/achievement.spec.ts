import { Achievement } from './achievement';

describe('Achievement', () => {
  it('should create an instance', () => {
    expect(new Achievement(0,"test","some desc", 5)).toBeTruthy();
  });
});
