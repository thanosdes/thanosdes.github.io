export interface TeamStanding {
  id: number;
  rank: number;
  logo: string;
  name: string;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsDiff: number;
  points: number;
}

export interface StandingsResponse {
  response: Array<{ league: League }>;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Array<Standing[]>;
}

interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: GameStats;
  home: GameStats;
  away: GameStats;
  update: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface GameStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}

interface Goals {
  for: number;
  against: number;
}
