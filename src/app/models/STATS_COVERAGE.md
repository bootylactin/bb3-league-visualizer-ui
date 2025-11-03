# Blood Bowl 3 Statistics Coverage

This document verifies all statistics mentioned in the requirements are accounted for in the models.

## ✅ Player Stats - Fully Covered

### SPP
- ✅ `spp.total` - Total SPP
- ✅ `spp.fromMvp` - Track total MVPs
- ✅ `spp.fromTouchdowns` - Track how SPPs were earned
- ✅ `spp.fromCasualties` - Track how SPPs were earned
- ✅ `spp.fromCompletions` - Track how SPPs were earned
- ✅ `spp.fromInterceptions` - Track how SPPs were earned
- ✅ `trackSppEarned` - Flag to enable detailed SPP tracking

### Offense
- ✅ `offense.touchdowns` - Touchdowns Scored
- ✅ `offense.yardsRunning` - Yards running with the ball (Rushing)
- ✅ `offense.yardsPassing` - Yards passing

### Passing
- ✅ `passing.passes` - Passes (success/attempts)
- ✅ `passing.longBombs` - Long Bomb (success/attempts)
- ✅ `passing.longPasses` - Long pass (success/attempts)
- ✅ `passing.shortPasses` - Short passes (success/attempts)
- ✅ `passing.quickPasses` - Quick passes (calculated via difference)
- ✅ `passing.interceptionActionsSustained` - Interception actions sustained

### Receiving
- ✅ `receiving.passesReceived` - Passes received (success/attempts)

### Defense
- ✅ `defense.interceptions` - Interceptions (success/attempts)

### Agility
- ✅ `agility.pickUp` - Pick up (success/attempts)
- ✅ `agility.dodges` - Dodges (success/attempts)
- ✅ `agility.handOff` - Hand-off (success/attempts) - Note: Hand-off is always successful, catch is the issue
- ✅ `agility.jumpOver` - Jump Over (success/attempts)
- ✅ `agility.rush` - Rush/GFI (success/attempts)
- ✅ `agility.yardsRushing` - Yards rushing (GFI) - May not be tracked, optional
- ✅ `agility.ballCatches` - Ball Catches (success/attempts) - Hand-off receptions, scatters, kick-offs, etc.

### Strength
- ✅ `strength.blockActionsDone` - Block actions done
- ✅ `strength.blitzActionsDone` - Blitz actions done
- ✅ `strength.blockActionsSustained` - Block actions sustained
- ✅ `strength.playersPushedIntoCrowd` - Players pushed into the crowd

### Violence Inflicted
- ✅ `violenceInflicted.avRollsSuccessful` - AV rolls successful (broken)
- ✅ `violenceInflicted.casualties` - Casualties
- ✅ `violenceInflicted.kills` - Kills
- ✅ `violenceInflicted.injuries` - Injuries
- ✅ `violenceInflicted.koResults` - KO results
- ✅ `violenceInflicted.stunned` - Stunned
- ✅ `violenceInflicted.foulActions` - Foul actions

### Violence Sustained
- ✅ `violenceSustained.casualties` - Casualties
- ✅ `violenceSustained.koResults` - KO results
- ✅ `violenceSustained.injuries` - Injuries
- ✅ `violenceSustained.deathResults` - 'Death' results
- ✅ `violenceSustained.deathResultsPrevented` - 'Death' results prevented
- ✅ `violenceSustained.stunned` - Stunned (calculated via difference if not tracked)
- ✅ `violenceSustained.foulActions` - Foul Actions
- ✅ `violenceSustained.expulsions` - Expulsions
- ✅ `violenceSustained.missedMatches` - Missed matches

### Special Actions
- ✅ `specialActions.chainsaw` - Chainsaw (success/attempts)
- ✅ `specialActions.hypnoticGaze` - Hypnotic Gaze (success/attempts)
- ✅ `specialActions.projectileVomit` - Projectile Vomit (success/attempts)
- ✅ `specialActions.stab` - Stab (success/attempts)
- ✅ `specialActions.throwTeamMate` - Successful Throw Team-Mate (success/attempts)
- ✅ `specialActions.regeneration` - Regeneration (success/attempts)
- ✅ `specialActions[key]` - Index signature allows additional special actions

## Team Stats - Fully Covered

### Team Statistics
- ✅ `stats.wins` - Wins
- ✅ `stats.draws` - Draws
- ✅ `stats.losses` - Losses
- ✅ `stats.touchdownsFor` - Touchdowns For
- ✅ `stats.touchdownsAgainst` - Touchdowns Against
- ✅ `stats.casualtiesFor` - Casualties For
- ✅ `stats.casualtiesAgainst` - Casualties Against

### Financials
- ✅ `financials.treasury` - Treasury
- ✅ `financials.teamValue` - Team Value

### Team-Coach Relationship
- ✅ `coachId` - Reference to coach ID (primary)
- ✅ `coach` - Legacy coach name field (backward compatibility)

## Coach Stats - Fully Covered

### Coach Statistics
- ✅ `stats.totalWins` - Total wins across all teams
- ✅ `stats.totalDraws` - Total draws across all teams
- ✅ `stats.totalLosses` - Total losses across all teams
- ✅ `stats.totalTouchdownsFor` - Total touchdowns for across all teams
- ✅ `stats.totalTouchdownsAgainst` - Total touchdowns against across all teams
- ✅ `stats.totalCasualtiesFor` - Total casualties inflicted across all teams
- ✅ `stats.totalCasualtiesAgainst` - Total casualties sustained across all teams
- ✅ `stats.seasonsCoached` - Number of seasons coached (optional)
- ✅ `stats.championships` - Number of championships won (optional)

## League Stats - Fully Covered

- ✅ League name and ID
- ✅ Season information
- ✅ League configuration
- ✅ Teams array

## Match Stats - Fully Covered

- ✅ Match details (date, week, round)
- ✅ Home and away team performance
- ✅ Individual player performances per match
- ✅ Final scores
- ✅ Match status

## Notes on Optional Fields

All optional fields are marked with `?` in TypeScript. These include:
- Calculated/derived stats (e.g., `quickPasses`, `stunned` sustained)
- Stats that may not always be tracked (e.g., `yardsRushing`, `deathResultsPrevented`)
- Special actions that vary by player/team abilities

## Implementation Notes

1. **Backward Compatibility**: The `Player` interface includes legacy fields (`spp`, `touchdowns`, etc.) for compatibility with existing code
2. **Success/Attempts Pattern**: Most action-based stats use the `SuccessAttempts` interface for consistency
3. **Extensibility**: Special actions use an index signature to allow additional actions without modifying the interface
4. **Type Safety**: All fields are properly typed with optional markers where appropriate

