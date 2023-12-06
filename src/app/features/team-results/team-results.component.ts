import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, switchMap, takeUntil } from 'rxjs';
import { TeamResultsService } from './team-results.service';
import { GameResults } from './models';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss'],
})
export class TeamResultsComponent implements OnInit, OnDestroy {
  results?: GameResults[];

  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private teamResultsService = inject(TeamResultsService);
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(0);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((res: ParamMap) => {
          const id = res.get('id') ?? '';
          return this.getGameResults(+id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.results = res;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  navigateBack() {
    this.location.back();
  }

  private getGameResults(id: number): Observable<GameResults[]> {
    return this.teamResultsService
      .getGameResults(id)
      .pipe(takeUntil(this.destroy$));
  }
}
