import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import {
  first,
  Observable,
  ReplaySubject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { TeamStanding } from './models';
import { LeaguesService } from './leagues.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
})
export class LeaguesComponent implements OnInit, OnDestroy {
  tableColumns = [
    '',
    '',
    'Name',
    'Games',
    'W',
    'L',
    'D',
    'Goal Difference',
    'Points',
  ];
  items?: TeamStanding[];

  private route = inject(ActivatedRoute);
  private leaguesService = inject(LeaguesService);
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(0);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((res: ParamMap) => {
          const id = res.get('id') ?? '';
          return this.getLeagueStats(+id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.items = res;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private getLeagueStats(id: number): Observable<TeamStanding[]> {
    return this.leaguesService
      .getStandingsForLeague(id)
      .pipe(first(), takeUntil(this.destroy$));
  }
}
