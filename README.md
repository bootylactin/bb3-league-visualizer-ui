# Blood Bowl 3 League Visualizer

A comprehensive web application for visualizing and analyzing Blood Bowl 3 league data. Track standings, view team statistics, analyze player performance, and discover insights about your league.

## Features

The application provides a suite of tools for league management and analysis:

- **Current Standings** - Real-time league standings with wins, losses, and points
- **Match History** - View all matches for leagues, teams, and coaches with links to detailed match pages
- **Match Details** - Comprehensive match pages showing casualties (who inflicted on whom), game logs, and player performances
- **Team Viewer** - Detailed team rosters, player statistics, team history, and match history
- **Coach Profiles** - View coach career statistics, teams coached across seasons, and match history
- **League MVPs** - Top performers across the league with achievements and star player points
- **Most Yards Ran** - Track ground-gaining leaders
- **Most Passes Completed** - Passing statistics and completion rates
- **Most Casualties Inflicted** - Dangerous players tracker
- **Touchdown Leaders** - Top scorers and touchdown statistics
- **Performance Analytics** - Advanced metrics and data visualization

## Technologies

- **Angular 20.3** - Modern web framework with standalone components
- **Bootstrap 5.3** - Responsive UI framework
- **ng-bootstrap 19.0** - Angular Bootstrap component library
- **TypeScript 5.9** - Type-safe development
- **RxJS 7.8** - Reactive programming

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bb3-league-visualizer-ui
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for production (outputs to `dist/`)
- `npm run watch` - Build and watch for changes in development mode
- `npm test` - Run unit tests with Karma
- `ng generate component <name>` - Generate a new component

## Building for Production

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. The production build is optimized for performance.

## Project Structure

```
src/
├── app/
│   ├── models/         # Data models (Player, Team, Coach, League, Match)
│   ├── pages/          # Page components (home, league, team, player, coach, match)
│   ├── services/       # Services (data service for API calls)
│   ├── app.ts          # Root component
│   ├── app.config.ts   # Application configuration
│   └── app.routes.ts   # Routing configuration
├── index.html          # Main HTML file
├── main.ts            # Application entry point
└── styles.css         # Global styles
```

## Future Development

This is the initial version of the league visualizer. Planned enhancements include:

- Integration with Blood Bowl 3 replay data processor
- Real-time league data fetching
- Interactive charts and visualizations
- Team comparison tools
- Historical statistics tracking
- Export functionality for league reports

## License

This project is private.

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [ng-bootstrap Documentation](https://ng-bootstrap.github.io)
