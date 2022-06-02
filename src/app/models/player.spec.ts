import { Player } from './player';

describe('Player', () => {
  it('should create an instance', () => {
    expect(new Player("test","12345","nickname",0,0)).toBeTruthy();
  });
});
