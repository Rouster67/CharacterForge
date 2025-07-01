import { useState, useEffect } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { QuizScreen } from '@/components/QuizScreen';
import { ResultsScreen } from '@/components/ResultsScreen';
import { generateQuestions } from '@/lib/questionBank';
import { formatResults, STAT_NAMES } from '@/lib/statCalculator';
import type { QuizQuestion, StatName } from '@shared/schema';

type Screen = 'welcome' | 'quiz' | 'results';

export default function Quiz() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [statWins, setStatWins] = useState<number[]>([0, 0, 0, 0, 0, 0]); // STR, DEX, CON, INT, WIS, CHA

  const startQuiz = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setStatWins([0, 0, 0, 0, 0, 0]);
    setCurrentScreen('quiz');
  };

  const selectOption = (selectedStat: StatName) => {
    const statIndex = STAT_NAMES.indexOf(selectedStat);
    const newStatWins = [...statWins];
    newStatWins[statIndex]++;
    setStatWins(newStatWins);

    if (currentQuestionIndex + 1 >= questions.length) {
      // Quiz complete
      setCurrentScreen('results');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const retakeQuiz = () => {
    setCurrentScreen('welcome');
    setCurrentQuestionIndex(0);
    setStatWins([0, 0, 0, 0, 0, 0]);
  };

  const results = formatResults(statWins);
  const totalCost = results.reduce((sum, stat) => sum + stat.cost, 0);

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStartQuiz={startQuiz} />;
  }

  if (currentScreen === 'quiz') {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      return <div>Loading question...</div>;
    }

    return (
      <QuizScreen
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        question={currentQuestion}
        statWins={statWins}
        onSelectOption={selectOption}
      />
    );
  }

  if (currentScreen === 'results') {
    return (
      <ResultsScreen
        results={results}
        totalCost={totalCost}
        onRetakeQuiz={retakeQuiz}
      />
    );
  }

  return null;
}
