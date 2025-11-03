# Blood Bowl 3 Data Models

This folder contains TypeScript interfaces for all Blood Bowl 3 data structures.

## Model Structure

### Player Models (`player.model.ts`)
- **Player**: Complete player information including all statistics
- **PlayerStats**: Aggregated statistics broken down by category
- **SppBreakdown**: Detailed SPP tracking
- **SuccessAttempts**: Helper interface for success/attempt tracking

### Team Models (`team.model.ts`)
- **Team**: Complete team information with stats and financials
- **TeamStats**: Team-level statistics
- **TeamFinancials**: Treasury and team value information

### League Models (`league.model.ts`)
- **League**: Complete league information
- **SeasonInfo**: Season-specific information
- **LeagueConfig**: League configuration and ruleset

### Match Models (`match.model.ts`)
- **Match**: Individual match/game information
- **MatchTeamPerformance**: Team performance in a specific match
- **MatchPlayerPerformance**: Individual player performance in a match

## Stat Tracking Notes

### Native Stats (Reported by Game)
- SPP (total)
- Touchdowns
- Yards running with ball
- Yards passing
- Passes (success/attempts)
- Long Bomb (success/attempts)
- Long pass (success/attempts)
- Short passes (success/attempts)
- Passes received (success/attempts)
- Interceptions (success/attempts)
- Pick up (success/attempts)
- Dodges (success/attempts)
- Hand-off (success/attempts)
- Jump Over (success/attempts)
- Rush/GFI (success/attempts)
- Ball Catches (success/attempts)
- Block actions done
- Blitz actions done
- Block actions sustained
- Players pushed into crowd
- AV rolls successful (broken armor)
- Casualties inflicted
- Kills
- Injuries inflicted
- KO results inflicted
- Stunned inflicted
- Foul actions inflicted
- Casualties sustained
- KO results sustained
- Injuries sustained
- Death results
- Foul actions sustained
- Expulsions
- Missed matches
- Special actions (Chainsaw, Hypnotic Gaze, etc.)

### Calculated/Derived Stats (Marked with `?` in interfaces)
- **Quick passes**: Can be calculated as difference: Total passes - (Long Bomb + Long Pass + Short Pass)
- **Stunned (sustained)**: Can be calculated if total violence sustained is tracked
- **SPP Breakdown**: If tracking how SPPs were earned is enabled

### Stats That May Not Be Tracked
- **Yards rushing (GFI)**: May not be tracked - total squares from GFI
- **Death results prevented**: May not always be tracked
- Some special actions may vary by team/player abilities

## Usage

Import models from the index file:

From components/pages (relative path):
```typescript
import { Player, Team, League, Match } from '../../models';
```

From services (relative path):
```typescript
import { Player, Team, League, Match } from '../models';
```

Or import specific interfaces from specific files:
```typescript
import { Player, PlayerStats, SppBreakdown } from '../../models/player.model';
```

## Optional Fields

Fields marked with `?` are optional and may not always be present:
- Either not tracked natively by the game
- Calculated/derived from other stats
- Only available under certain conditions

Always check for existence before accessing optional fields:

```typescript
if (player.stats.passing?.quickPasses) {
  // Use quick passes
}
```

