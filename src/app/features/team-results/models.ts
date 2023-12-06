export interface GameResults {
  home: Team;
  away: Team;
}

export interface FixturesResponse {
  response: Array<FixtureItem>;
}

export interface FixtureItem {
  fixture: Fixture;
  league: League;
  teams: {
    home: CompetingTeam;
    away: CompetingTeam;
  };
  goals: Score;
  score: {
    halftime: Score;
    fulltime: Score;
    extratime: Score;
    penalty: Score;
  };
}

interface Fixture {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number;
    second: number;
  };
  venue: Venue;
  status: Status;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

interface Venue {
  id: number;
  name: string;
  city: string;
}

interface Status {
  long: string;
  short: string;
  elapsed: number;
}

interface CompetingTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

interface Team {
  logo: string;
  name: string;
  score: number;
}

interface Score {
  home: number;
  away: number;
}
