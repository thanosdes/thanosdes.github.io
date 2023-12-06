import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BASE_URL } from '../../../environments/env';
import { FixturesResponse, GameResults } from './models';

@Injectable({ providedIn: 'root' })
export class TeamResultsService {
  apiUrl = BASE_URL + '/fixtures';
  httpService = inject(HttpClient);

  getGameResults(teamId: number): Observable<GameResults[]> {
    let params = new HttpParams();
    const currentSeason = new Date().getFullYear();
    params = params
      .append('team', teamId)
      .append('season', currentSeason)
      .append('last', 10);

    return this.httpService
      .get<FixturesResponse>(this.apiUrl, {
        params: params,
      })
      .pipe(
        map((res) =>
          res.response.map((fx) => {
            return {
              home: {
                logo: fx.teams.home.logo,
                name: fx.teams.home.name,
                score: fx.score.fulltime.home,
              },
              away: {
                logo: fx.teams.away.logo,
                name: fx.teams.away.name,
                score: fx.score.fulltime.away,
              },
            };
          })
        )
      );
  }
}
