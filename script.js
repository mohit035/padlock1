let correctOneDigitWithWrongPosition1 = [1, 4, 7];
    const correctOneDigitWithRightPosition = [1, 8, 9];
    let correctOneDigitWithWrongPosition2 = [2, 8, 6];
    const correctTwoDigitWithWrongPosition = [9, 6, 4];
    const allWrongDigit = [5, 2, 3];

    const correctArray = [NaN, NaN, NaN];

    const occupiedIndex = [];

    const incorrectIndexOfCorrectOneDigitWithRightPosition = [];
    correctOneDigitWithRightPosition.filter(key => {
      const matchedDigit1 = correctOneDigitWithWrongPosition1.find(x => key === x);
      const matchedDigit2 = correctOneDigitWithWrongPosition2.find(x => key === x);

      if (matchedDigit1 && correctOneDigitWithWrongPosition1.indexOf(matchedDigit1)
        === correctOneDigitWithRightPosition.indexOf(matchedDigit1)) {
        incorrectIndexOfCorrectOneDigitWithRightPosition.push(correctOneDigitWithRightPosition.indexOf(matchedDigit1));
      }

      if (matchedDigit2 && correctOneDigitWithWrongPosition2.indexOf(matchedDigit2)
        === correctOneDigitWithRightPosition.indexOf(matchedDigit2)) {
        incorrectIndexOfCorrectOneDigitWithRightPosition.push(correctOneDigitWithRightPosition.indexOf(matchedDigit2));
      }
      if (matchedDigit1 && correctOneDigitWithRightPosition.indexOf(matchedDigit1) === correctOneDigitWithWrongPosition1.indexOf(matchedDigit1)) {
        correctOneDigitWithWrongPosition1[correctOneDigitWithWrongPosition1.indexOf(matchedDigit1)] = NaN;
      }

      if (matchedDigit1 && correctOneDigitWithRightPosition.indexOf(matchedDigit1) === correctOneDigitWithWrongPosition2.indexOf(matchedDigit1)) {
        correctOneDigitWithWrongPosition2[correctOneDigitWithWrongPosition2.indexOf(matchedDigit1)] = NaN;
      }

      if (matchedDigit2 && correctOneDigitWithRightPosition.indexOf(matchedDigit2) === correctOneDigitWithWrongPosition1.indexOf(matchedDigit2)) {
        correctOneDigitWithWrongPosition2[correctOneDigitWithWrongPosition1.indexOf(matchedDigit2)] = NaN;
      }

      if (matchedDigit2 && correctOneDigitWithRightPosition.indexOf(matchedDigit2) === correctOneDigitWithWrongPosition2.indexOf(matchedDigit2)) {
        correctOneDigitWithWrongPosition2[correctOneDigitWithWrongPosition2.indexOf(matchedDigit2)] = NaN;
      }
    });
    const correctItem1 = correctOneDigitWithRightPosition.find(key => {
      const currentIndex = correctOneDigitWithRightPosition.indexOf(key);
      return incorrectIndexOfCorrectOneDigitWithRightPosition.includes(currentIndex) ? false : true;
    }) || 0;
    correctArray[correctOneDigitWithRightPosition.indexOf(correctItem1)] = correctItem1;

    occupiedIndex.push(correctOneDigitWithRightPosition.indexOf(correctItem1));

    allWrongDigit.forEach((key, index) => {
      const wrongDigitIndex1 = correctOneDigitWithWrongPosition1.findIndex(x => key === x);
      if (wrongDigitIndex1 >= 0) { correctOneDigitWithWrongPosition1[wrongDigitIndex1] = NaN; }
      const wrongDigitIndex2 = correctOneDigitWithWrongPosition2.findIndex(x => key === x);
      if (wrongDigitIndex2 >= 0) { correctOneDigitWithWrongPosition2[wrongDigitIndex2] = NaN; }
      const wrongDigitIndex3 = correctTwoDigitWithWrongPosition.findIndex(x => key === x);
      if (wrongDigitIndex3 >= 0) { correctTwoDigitWithWrongPosition[wrongDigitIndex3] = NaN; }
    });


    const twoRightDigitWithWrongPosition = [];

    correctTwoDigitWithWrongPosition.forEach((key, index) => {
      twoRightDigitWithWrongPosition.push({ digit: key, wrongIndex: [index] });
    });

    twoRightDigitWithWrongPosition.forEach((key, index) => {
      const wrongIndex1 = correctOneDigitWithWrongPosition1.indexOf(key.digit);
      const wrongIndex2 = correctOneDigitWithWrongPosition2.indexOf(key.digit);

      if (wrongIndex1 > 0 && !twoRightDigitWithWrongPosition.find(x => wrongIndex1 === x)) { twoRightDigitWithWrongPosition[index].wrongIndex.push(wrongIndex1); }

      if (wrongIndex2 > 0 && !twoRightDigitWithWrongPosition.find(x => wrongIndex2 === x)) { twoRightDigitWithWrongPosition[index].wrongIndex.push(wrongIndex2); }

    });

    const tempArr1 = [];
    correctOneDigitWithWrongPosition1.forEach((key, index) => {
      if (key) { tempArr1.push(key); }
    });
    correctOneDigitWithWrongPosition1 = tempArr1;

    const tempArr2 = [];
    correctOneDigitWithWrongPosition2.forEach((key, index) => {
      if (key) { tempArr2.push(key); }
    });
    correctOneDigitWithWrongPosition2 = tempArr2;

    let correctDigit2 = NaN;
    if (correctOneDigitWithWrongPosition1.length === 1) {
      correctDigit2 = correctOneDigitWithWrongPosition1[0];
      correctOneDigitWithWrongPosition1.splice(0, 1);
    } else if (correctOneDigitWithWrongPosition2.length === 1) {
      correctDigit2 = correctOneDigitWithWrongPosition2[0];
      correctOneDigitWithWrongPosition2.splice(0, 1);
    }

    const correctIndexArray = [0, 1, 2];
    let correctIndexDigit2 = NaN;
    const a = twoRightDigitWithWrongPosition.find(key => key.digit === correctDigit2);
    if (a) {
      correctIndexArray.forEach(x => {
        if (a.wrongIndex.indexOf(x) < 0) {
          correctIndexDigit2 = x;
        }
      });
    }

    occupiedIndex.push(correctIndexDigit2);

    if (correctIndexDigit2 >= 0) { correctArray[correctIndexDigit2] = correctDigit2; }

    let correctDigit3 = NaN;
    if (correctOneDigitWithWrongPosition1.length >= 1) {
      correctOneDigitWithWrongPosition1.forEach(key => {
        if (twoRightDigitWithWrongPosition.find(x => x.digit !== key)) {
          correctDigit3 = key;
        }
      });
    } else if (correctOneDigitWithWrongPosition2.length >= 1) {
      correctOneDigitWithWrongPosition2.forEach(key => {
        if (twoRightDigitWithWrongPosition.find(x => x.digit !== key)) {
          correctDigit3 = key;
        }
      });
    }

    let correctIndex3;
    correctIndexArray.forEach(key => {
      if (occupiedIndex.indexOf(key) < 0) { correctIndex3 = key; }
    });

    if (correctIndex3) { correctArray[correctIndex3] = correctDigit3; }

    console.log(correctArray);