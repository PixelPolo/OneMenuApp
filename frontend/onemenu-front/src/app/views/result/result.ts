import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Session } from '../../models/session.model';
import { HttpService } from '../../services/http/http-service';
import { SessionDetail } from '../../components/session-detail/session-detail';
import { Dish } from '../../models/dish.model';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Vote } from '../../models/vote.model';
import { DishType } from '../../models/dishType.model';
import { DishDetail } from '../../components/dish-detail/dish-detail';
import { Invitation } from '../../models/invitation.model';

interface DishStat {
  dish: Dish;
  dishTypeID: string;
  gradesTotal: number;
  gradesAVG: number;
}

interface ResultObject {
  dishType: DishType;
  bestDish: Dish;
  gradesTotal: number;
  gradesAVG: number;
}

@Component({
  selector: 'app-result',
  imports: [RouterLink, SessionDetail, DishDetail],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpService);

  sessionID = signal<string>('');
  session = signal<Session | null>(null);
  dishes = signal<Dish[]>([]);
  dishTypes = signal<DishType[]>([]);
  results = signal<ResultObject[]>([]);
  votersCount = signal<number>(0);
  totalInvitations = signal<number>(0);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.sessionID.set(params['sessionID']);
    });
    effect(() => {
      const id = this.sessionID();
      if (id) this.loadData();
    });
  }

  private loadData() {
    const sessionID = this.sessionID();
    this.http.get(`/session/${sessionID}`).subscribe((session) => {
      this.session.set(session);
    });
    this.http
      .get(`/invitation/session/${sessionID}`)
      .subscribe((invitations: Invitation[]) => {
        this.totalInvitations.set(invitations.length);
      });
    this.getDishStats(sessionID)
      .pipe(
        switchMap((dishStats: DishStat[]) => {
          const bestByType: Map<string, DishStat> =
            this.groupBestDishByType(dishStats);
          return this.buildResultObjects(bestByType);
        })
      )
      .subscribe((resultObjects: ResultObject[]) => {
        resultObjects.sort((a, b) =>
          a.dishType.dishTypeID.localeCompare(b.dishType.dishTypeID)
        );
        this.results.set(resultObjects);
      });
  }

  private getDishStats(sessionID: string) {
    // Get all dishes of the session
    return this.http.get(`/dish/sessionID/${sessionID}`).pipe(
      switchMap((dishes: Dish[]) => {
        this.dishes.set(dishes);
        const allVoterIDs = new Set<string>();
        // Get all votes for each dish and store a DishStat
        // i.e, the dish, its type, the grades avg and total
        const voteStats$ = dishes.map((dish: Dish) =>
          this.http.get(`/vote/dish/${dish.dishID}`).pipe(
            map((votes: Vote[]) => {
              // Keep track of voters quantity
              votes.forEach((v) => allVoterIDs.add(v.userID));
              return {
                dish,
                dishTypeID: dish.dishTypeID,
                gradesAVG: this.computeAverage(votes),
                gradesTotal: votes.reduce((sum, v) => sum + v.note, 0),
              } as DishStat;
            })
          )
        );
        // Return the requests to be executed
        return forkJoin(voteStats$).pipe(
          map((dishStats: DishStat[]) => {
            this.votersCount.set(allVoterIDs.size);
            return dishStats;
          })
        );
      })
    );
  }

  private groupBestDishByType(dishStats: DishStat[]) {
    // Map to store dishTypeID -> DishStat
    const bestMap = new Map<string, DishStat>();
    for (const stat of dishStats) {
      const current = bestMap.get(stat.dishTypeID);
      // keeping only the one with the heighest gradesAVG
      if (!current || stat.gradesAVG > current.gradesAVG) {
        bestMap.set(stat.dishTypeID, stat);
      }
    }
    return bestMap;
  }

  private buildResultObjects(
    bestMap: Map<string, DishStat>
  ): Observable<ResultObject[]> {
    const dishTypeIDs = Array.from(bestMap.keys());
    return forkJoin(
      // For each best Dish
      dishTypeIDs.map((dishTypeID) =>
        // Get its complete type from its dishTypeID
        this.http.get(`/dishType/${dishTypeID}`).pipe(
          map((dishType: DishType) => {
            const stat = bestMap.get(dishTypeID)!;
            // Build a ResultObject for the view
            return {
              dishType,
              bestDish: stat.dish,
              gradesTotal: stat.gradesTotal,
              gradesAVG: stat.gradesAVG,
            } as ResultObject;
          })
        )
      )
    );
  }

  private computeAverage(votes: Vote[]): number {
    if (!votes.length) return 0;
    const total = votes.reduce((sum, v) => sum + v.note, 0);
    const avg = total / votes.length;
    return Number(avg.toFixed(2));
  }
}
