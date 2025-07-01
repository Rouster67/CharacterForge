import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

export function WelcomeScreen({ onStartQuiz }: WelcomeScreenProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-dnd-primary rounded-full mb-6">
          <i className="fas fa-dice-d20 text-3xl text-white"></i>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-dnd-primary to-dnd-secondary bg-clip-text text-transparent">
          D&D Stat Generator
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          A fair and personalized way to generate your D&D ability scores through comparative choices
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-dnd-surface p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <i className="fas fa-brain text-dnd-primary text-2xl mr-3"></i>
            <h3 className="text-xl font-semibold">How It Works</h3>
          </div>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start">
              <span className="text-dnd-primary font-bold mr-2">1.</span>
              Answer 90 comparative questions
            </li>
            <li className="flex items-start">
              <span className="text-dnd-primary font-bold mr-2">2.</span>
              Each choice adds a point to one ability score
            </li>
            <li className="flex items-start">
              <span className="text-dnd-primary font-bold mr-2">3.</span>
              Your preferences determine final stat distribution
            </li>
            <li className="flex items-start">
              <span className="text-dnd-primary font-bold mr-2">4.</span>
              Results follow official D&D point-buy rules
            </li>
          </ul>
        </Card>

        <Card className="bg-dnd-surface p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <i className="fas fa-chart-bar text-dnd-secondary text-2xl mr-3"></i>
            <h3 className="text-xl font-semibold">The Six Abilities</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span>STR - Strength</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>DEX - Dexterity</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              <span>CON - Constitution</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span>INT - Intelligence</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              <span>WIS - Wisdom</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
              <span>CHA - Charisma</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          onClick={onStartQuiz}
          className="bg-dnd-primary hover:bg-dnd-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <i className="fas fa-play mr-2"></i>
          Start Quiz (90 Questions)
        </Button>
        <p className="text-slate-400 text-sm mt-3">Takes approximately 5-10 minutes</p>
      </div>
    </div>
  );
}
