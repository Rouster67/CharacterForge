import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { QuizQuestion, StatName } from '@shared/schema';
import { STAT_CONFIG } from '@/lib/statCalculator';

interface QuizScreenProps {
  currentQuestion: number;
  totalQuestions: number;
  question: QuizQuestion;
  statWins: number[];
  onSelectOption: (stat: StatName) => void;
}

export function QuizScreen({ 
  currentQuestion, 
  totalQuestions, 
  question, 
  statWins,
  onSelectOption 
}: QuizScreenProps) {
  const progressPercent = Math.round((currentQuestion / totalQuestions) * 100);

  const getStatColor = (stat: StatName) => {
    const colors = {
      STR: 'text-red-400',
      DEX: 'text-green-400', 
      CON: 'text-orange-400',
      INT: 'text-blue-400',
      WIS: 'text-purple-400',
      CHA: 'text-pink-400'
    };
    return colors[stat];
  };

  const getStatBorderColor = (stat: StatName) => {
    const colors = {
      STR: 'hover:border-red-500',
      DEX: 'hover:border-green-500',
      CON: 'hover:border-orange-500', 
      INT: 'hover:border-blue-500',
      WIS: 'hover:border-purple-500',
      CHA: 'hover:border-pink-500'
    };
    return colors[stat];
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-slate-300">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-slate-300">
            {progressPercent}% Complete
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-dnd-surface p-8 border border-slate-700 shadow-2xl mb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-3">Which would you prefer?</h2>
          <p className="text-slate-300">Choose the option that better reflects your character concept or personal preference</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => onSelectOption(question.statA)}
            className={`group bg-slate-800 hover:bg-dnd-primary/20 border-2 border-slate-600 ${getStatBorderColor(question.statA)} h-auto p-6 text-left transition-all duration-200 transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-dnd-primary uppercase tracking-wide">Option A</span>
              <i className={`fas ${question.optionA.icon} text-dnd-primary opacity-50 group-hover:opacity-100 transition-opacity`}></i>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">{question.optionA.title}</h3>
            <p className="text-slate-300 text-sm mb-4">{question.optionA.description}</p>
            <div className="text-xs text-slate-400 bg-slate-700 px-3 py-1 rounded-full inline-block">
              <i className={`fas ${STAT_CONFIG[question.statA].icon} mr-1`}></i>
              {STAT_CONFIG[question.statA].fullName} Focus
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => onSelectOption(question.statB)}
            className={`group bg-slate-800 hover:bg-dnd-secondary/20 border-2 border-slate-600 ${getStatBorderColor(question.statB)} h-auto p-6 text-left transition-all duration-200 transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-dnd-secondary uppercase tracking-wide">Option B</span>
              <i className={`fas ${question.optionB.icon} text-dnd-secondary opacity-50 group-hover:opacity-100 transition-opacity`}></i>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">{question.optionB.title}</h3>
            <p className="text-slate-300 text-sm mb-4">{question.optionB.description}</p>
            <div className="text-xs text-slate-400 bg-slate-700 px-3 py-1 rounded-full inline-block">
              <i className={`fas ${STAT_CONFIG[question.statB].icon} mr-1`}></i>
              {STAT_CONFIG[question.statB].fullName} Focus
            </div>
          </Button>
        </div>
      </Card>

      {/* Current Stats Preview */}
      <Card className="bg-dnd-surface p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-300">Current Preferences</h4>
          <i className="fas fa-chart-pie text-slate-400"></i>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center text-sm">
          {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as StatName[]).map((stat, index) => (
            <div key={stat} className="stat-preview">
              <div className={`font-bold ${getStatColor(stat)}`}>{statWins[index]}</div>
              <div className="text-slate-400">{stat}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
