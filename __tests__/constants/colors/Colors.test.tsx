import colors from '../../../src/constants/Colors';

describe('Colors', () => {
  it('should have the correct value for "main"', () => {
    expect(colors.main).toEqual('#F5F5F5');
  });

  it('should have the correct value for "primary"', () => {
    expect(colors.primary).toEqual('#f54');
  });

  it('should have the correct value for "Inputtext"', () => {
    expect(colors.Inputtext).toEqual('rgba(255, 255, 255, 0.5)');
  });

  it('should have the correct value for "Textinput"', () => {
    expect(colors.Textinput).toEqual('rgba(255, 255, 255, 0.2)');
  });

  it('should have the correct value for "buttonColor"', () => {
    expect(colors.buttonColor).toEqual('#9747FF');
  });

  it('should have the correct value for "primaryDark"', () => {
    expect(colors.primaryDark).toEqual('#f54');
  });

  it('should have the correct value for "accent"', () => {
    expect(colors.accent).toEqual('#7fc');
  });

  it('should have the correct value for "blue"', () => {
    expect(colors.blue).toEqual('#5555ff');
  });

  it('should have the correct value for "white"', () => {
    expect(colors.white).toEqual('#fff');
  });

  it('should have the correct value for "iconscolor"', () => {
    expect(colors.iconscolor).toEqual('#3E54AC');
  });

  it('should have the correct value for "black"', () => {
    expect(colors.black).toEqual('#000');
  });

  it('should have the correct value for "gray"', () => {
    expect(colors.gray).toEqual('#666');
  });

  it('should have the correct value for "darkGray"', () => {
    expect(colors.darkGray).toEqual('#999');
  });

  it('should have the correct value for "green"', () => {
    expect(colors.green).toEqual('#4BB543');
  });

  it('should have the correct value for "red"', () => {
    expect(colors.red).toEqual('red');
  });
});
