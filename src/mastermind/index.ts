interface IColors {
  [key: string]: {
    totalSecretColors: number;
    currentCount: number;
  }
}

/**
 * Evaluate the combination of colors are correct.
 * @param colors
 * @param guess
 * @return Array of 2 numbers : [wellplaced, misplaced]
 */
function evaluate(colors: string[], guess: string[]): [number, number] {
  let wellplaced: number = 0;
  let misplaced: number = 0;
  let colorsObj: IColors = {};

  const secretColors: string[] = colors.map(function trimAndConvertToLowerCase(color) {
    return color.trim().toLowerCase();
  });
  const guessedColors: string[] = guess.map(function trimAndConvertToLowerCase(color) {
    return color.trim().toLowerCase();
  });

  secretColors.forEach(function setColorsObjAndCountColors(color: string) {
    if (colorsObj[color] == null) {
      colorsObj[color] = {
        totalSecretColors: 1,
        currentCount: 0,
      };
    } else {
      colorsObj[color].totalSecretColors = colorsObj[color].totalSecretColors + 1;
    }

    return;
  });

  guessedColors.forEach(function countWellplacedAndMisplaced(guessedColor: string, index: number) {
    const isGuessedColorEqualsSecretColorAtTheSameIndex = guessedColor === secretColors[index];

    if (isGuessedColorEqualsSecretColorAtTheSameIndex) {
      colorsObj[guessedColor].currentCount = colorsObj[guessedColor].currentCount + 1;
      wellplaced++;
      return;
    } else {
      if (!secretColors.includes(guessedColor)) {
        return;
      } else {
        const isOnlyOneGuessedColorInSecretColors = secretColors.indexOf(guessedColor) === secretColors.lastIndexOf(guessedColor);

        if (isOnlyOneGuessedColorInSecretColors) {
          const isGuessedColorInColorsObjUndefinedOrLesserThanOne = Boolean(!colorsObj[guessedColor].currentCount) || colorsObj[guessedColor].currentCount < 1;
          if (!isGuessedColorInColorsObjUndefinedOrLesserThanOne) {
            return;
          } else {
            colorsObj[guessedColor].currentCount = 1;
            misplaced++;
            return;
          }
        } else {
          const isGuessedColorInColorsObjUndefined = Boolean(!colorsObj[guessedColor].currentCount);
          const isGuessedColorCounterLesserThanTotalColorInColorObj = colorsObj[guessedColor].currentCount < colorsObj[guessedColor].totalSecretColors

          if (isGuessedColorInColorsObjUndefined) {
            colorsObj[guessedColor].currentCount = 1;
            misplaced++;
            return;
          } else if (isGuessedColorCounterLesserThanTotalColorInColorObj) {
            colorsObj[guessedColor].currentCount = colorsObj[guessedColor].currentCount + 1;
            misplaced++;
            return;
          } else {
            return;
          }
        }
      }
    }

    return;
  });

  return [wellplaced, misplaced];
}

/* Test cases */
const res1 = evaluate(['blue', 'red'], ['red']);
const expectedRes1 = [0, 1];
console.log('Cas 1: ', areEqual(res1, expectedRes1));

const res2 = evaluate(['blue'], ['red']);
const expectedRes2 = [0, 0];
console.log('Cas 2: ', areEqual(res2, expectedRes2));

const res3 = evaluate(['blue'], ['blue']);
const expectedRes3 = [1, 0];
console.log('Cas 3: ', areEqual(res3, expectedRes3));

const res4 = evaluate(['red', 'yellow'], ['blue', 'red']);
const expectedRes4 = [0, 1];
console.log('Cas 4: ', areEqual(res4, expectedRes4));

const res5 = evaluate(['blue', 'red', 'green', 'pink'], ['yellow', 'red', 'blue', 'purple']);
const expectedRes5 = [1, 1];
console.log('Cas 5: ', areEqual(res5, expectedRes5));

const res6 = evaluate(['blue', 'blue', 'blue'], ['blue', 'blue', 'blue']);
const expectedRes6 = [3, 0];
console.log('Cas 6: ', areEqual(res6, expectedRes6));

const res7 = evaluate(['blue', 'red', 'yellow', 'red', 'green', 'green', 'yellow', 'yellow'], ['yellow', 'red', 'blue', 'yellow', 'yellow', 'pink', 'pink', 'yellow']);
const expectedRes7 = [2, 4];
console.log('Cas 7: ', areEqual(res7, expectedRes7));

const res8 = evaluate(['blue', 'blue', 'green', 'red'], ['blue', 'red', 'yellow', 'red', 'yellow', 'green', 'green', 'green', 'blue', 'blue', 'red']);
const expectedRes8 = [2, 3];
console.log('Cas 8: ', areEqual(res8, expectedRes8));

function areEqual(res: number[], expectedRes: number[]): boolean {
  const areResAndExpectedResEqual = res.every(function isSame(value, index) {
    return value === expectedRes[index];
  });

  return areResAndExpectedResEqual && res.length === res.length;
}