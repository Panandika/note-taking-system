const { solveEquation } = require('../equationSolver');

describe('Equation Solver', () => {
  test('solves simple linear equation with addition', () => {
    expect(solveEquation('x + 3 = 7')).toBe(4);
  });

  test('solves simple linear equation with subtraction', () => {
    expect(solveEquation('x - 2 = 5')).toBe(7);
  });

  test('solves equation with coefficient', () => {
    expect(solveEquation('2x + 3 = 7')).toBe(2);
  });

  test('solves equation with negative coefficient', () => {
    expect(solveEquation('-3x + 6 = 0')).toBe(2);
  });

  test('solves equation with variable on right side', () => {
    expect(solveEquation('5 = x + 2')).toBe(3);
  });

  test('solves equation with variables on both sides', () => {
    expect(solveEquation('2x + 3 = x + 5')).toBe(2);
  });

  test('returns null for invalid equation format', () => {
    expect(solveEquation('2x + 3 + 7')).toBe(null);
  });

  test('returns null when coefficient is zero', () => {
    expect(solveEquation('0x = 5')).toBe(null);
  });

  test('returns null when no variable is found', () => {
    expect(solveEquation('2 + 3 = 5')).toBe(null);
  });
});