import { inject, Injectable } from '@angular/core';
import { StandingsResponse, TeamStanding } from './models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BASE_URL } from '../../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  apiUrl = BASE_URL + '/standings';
  httpService = inject(HttpClient);

  getStandingsForLeague(leagueId: number): Observable<TeamStanding[]> {
    let params = new HttpParams();
    const currentSeason = new Date().getFullYear();
    params = params.append('league', leagueId).append('season', currentSeason);

    return this.httpService
      .get<StandingsResponse>(this.apiUrl, {
        params: params,
      })
      .pipe(
        map((res) =>
          res.response[0].league.standings[0].map((standing) => {
            return {
              id: standing.team.id,
              rank: standing.rank,
              logo: standing.team.logo,
              name: standing.team.name,
              win: standing.all.win,
              draw: standing.all.draw,
              lose: standing.all.lose,
              played: standing.all.played,
              goalsDiff: standing.goalsDiff,
              points: standing.points,
            };
          })
        )
      );
  }
}
