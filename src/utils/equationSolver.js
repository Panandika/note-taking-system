/**
 * Equation Solver
 * Solves basic mathematical equations
 */

/**
 * Parses and solves a basic linear equation
 * @param {string} equation - The equation to solve (e.g., "2x + 3 = 7")
 * @returns {number|null} - The value of the variable or null if invalid
 */
function solveEquation(equation) {
  try {
    // Remove all spaces
    equation = equation.replace(/\s+/g, '');
    
    // Split by equals sign
    const parts = equation.split('=');
    if (parts.length !== 2) {
      throw new Error('Invalid equation format: must contain exactly one equals sign');
    }
    
    const leftSide = parts[0];
    const rightSide = parts[1];
    
    // Find the variable (assuming single letter variable)
    const variableMatch = leftSide.match(/[a-zA-Z]/);
    if (!variableMatch) {
      throw new Error('No variable found in equation');
    }
    
    const variable = variableMatch[0];
    
    // Parse the equation into coefficient and constant
    let coefficient = 0;
    let constant = 0;
    
    // Process left side
    const leftTerms = leftSide.replace(/-/g, '+-').split('+').filter(Boolean);
    
    for (const term of leftTerms) {
      if (term.includes(variable)) {
        // Term with variable
        const coefStr = term.replace(variable, '');
        const coef = coefStr === '-' ? -1 : coefStr === '' ? 1 : parseFloat(coefStr);
        coefficient += coef;
      } else {
        // Constant term
        constant -= parseFloat(term);
      }
    }
    
    // Process right side (move to left with sign change)
    const rightTerms = rightSide.replace(/-/g, '+-').split('+').filter(Boolean);
    
    for (const term of rightTerms) {
      if (term.includes(variable)) {
        // Term with variable
        const coefStr = term.replace(variable, '');
        const coef = coefStr === '-' ? -1 : coefStr === '' ? 1 : parseFloat(coefStr);
        coefficient -= coef;
      } else {
        // Constant term
        constant += parseFloat(term);
      }
    }
    
    // Solve for the variable
    if (coefficient === 0) {
      throw new Error('Coefficient of variable is zero, no unique solution');
    }
    
    return constant / coefficient;
  } catch (error) {
    console.error('Error solving equation:', error.message);
    return null;
  }
}

module.exports = {
  solveEquation
};