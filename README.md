# D&D Stat Generator - Comparative Quiz

A fair and personalized way to generate D&D ability scores through a 90-question comparative quiz system.

## Features

- **90-Question Quiz**: Comprehensive comparative questions covering all stat pairings
- **Fair Algorithm**: Direct port of C++ algorithm ensuring exactly 27 point-buy budget
- **Personalized Results**: Your choices determine stat distribution preferences
- **D&D Compliant**: Results follow official D&D 5e point-buy rules
- **Dark Theme UI**: Immersive D&D-themed interface with progress tracking
- **Export Functionality**: Download your generated stats for character creation

## How It Works

1. **Answer 90 Questions**: Each question presents two scenarios tied to different ability scores
2. **Make Choices**: Select the option that better fits your character concept
3. **Algorithm Calculates**: Your preferences are converted to a 27-point budget distribution
4. **Get Results**: Receive personalized ability scores ranging from 6-16

## Technical Details

### Algorithm
- Based on proven C++ implementation
- Uses official D&D point-buy cost table
- Greedy adjustment ensures exactly 27 points total
- Validates all scores within legal 6-16 range

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express
- **UI Framework**: Shadcn/ui with Tailwind CSS
- **Build Tool**: Vite
- **Database**: PostgreSQL with Drizzle ORM

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dnd-stat-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── lib/           # Utilities and algorithms
│   │   └── pages/         # Application pages
├── server/                # Express backend
├── shared/                # Shared types and schemas
└── package.json          # Dependencies and scripts
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Algorithm Details

The stat generation algorithm follows these steps:

1. **Question Generation**: 90 questions covering all 15 unique stat pairings (6 questions per pairing)
2. **Point Distribution**: Each choice awards 1 point to the selected stat
3. **Percentage Calculation**: Win counts converted to percentages, multiplied by 27
4. **Initial Mapping**: Raw costs mapped to scores using D&D point-buy table
5. **Greedy Adjustment**: Fine-tune scores until total cost equals exactly 27 points

## Point-Buy Cost Table

| Score | Cost | Score | Cost | Score | Cost |
|-------|------|-------|------|-------|------|
| 6     | -2   | 10    | 2    | 14    | 7    |
| 7     | -1   | 11    | 3    | 15    | 9    |
| 8     | 0    | 12    | 4    | 16    | 12   |
| 9     | 1    | 13    | 5    |       |      |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Based on original C++ algorithm implementation
- Inspired by D&D 5e point-buy system
- UI components from Shadcn/ui library