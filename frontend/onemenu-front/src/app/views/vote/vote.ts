import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http/http-service';
import { Session } from '../../models/session.model';
import { Dish } from '../../models/dish.model';
import { AuthService } from '../../services/auth/auth-service';
import { switchMap } from 'rxjs';
import { Vote as VoteModel } from '../../models/vote.model';
import { SessionDetail } from '../../components/session-detail/session-detail';
import { FormsModule } from '@angular/forms';
import { DishDetail } from '../../components/dish-detail/dish-detail';
import { DishType } from '../../models/dishType.model';

@Component({
  selector: 'app-vote',
  imports: [SessionDetail, DishDetail, FormsModule, RouterLink],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
})
export class Vote {
  private activatedRoute = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private http = inject(HttpService);
  private router = inject(Router);

  sessionID = signal<string>('');
  session = signal<Session | null>(null);
  dishTypes = signal<DishType[]>([]);
  dishes = signal<Dish[]>([]);
  votes = signal<Record<string, number>>({}); // dishID -> note
  possibleNotes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    const id = this.sessionID();
    const userID = this.auth.currentUserSignal()!.userID;
    this.http.get(`/session/${id}`).subscribe((session: Session) => {
      this.session.set(session);
    });
    this.http.get(`/dishType`).subscribe((dishTypes: DishType[]) => {
      console.log(dishTypes);
      this.dishTypes.set(dishTypes);
    });
    this.http.get(`/dish/sessionID/${id}`).subscribe((dishes: Dish[]) => {
      dishes.sort((a: Dish, b: Dish) =>
        a.dishTypeID.localeCompare(b.dishTypeID)
      );
      this.dishes.set(dishes);
      dishes.forEach((dish: Dish) => {
        const dishID = dish.dishID!;
        this.http.get(`/vote/${dishID}/${userID}`).subscribe({
          next: (vote: VoteModel) => {
            if (vote) this.vote(dishID, vote.note);
          },
        });
      });
    });
  }

  hasDishesOfType(typeID: string): boolean {
    return this.dishes().some((dish) => dish.dishTypeID === typeID);
  }

  vote(dishID: string, note: number) {
    const updated = { ...this.votes() }; // copy
    updated[dishID] = Number(note);
    this.votes.set(updated);
  }

  submitVotes() {
    const userID = this.auth.currentUserSignal()!.userID;
    const voteMap = this.votes();
    const totalDishes = this.dishes().length;
    const totalVotes = Object.keys(voteMap).length;
    if (totalVotes < totalDishes) {
      alert('Veuillez noter tous les plats avant de valider.');
      return;
    }
    Object.entries(voteMap).forEach((entry) => {
      const [dishID, note] = entry;
      this.http
        .get(`/vote/${dishID}/${userID}`)
        .pipe(
          switchMap((vote) => {
            const newVote: VoteModel = {
              dishID: dishID,
              userID: userID,
              note: note,
            };
            if (!vote) return this.http.post('/vote', newVote);
            else return this.http.put(`/vote/${dishID}/${userID}`, newVote);
          })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/result', this.sessionID()]);
          },
          error: (err: unknown) => console.error('Error voting:', err),
        });
    });
    alert('Notes validées avec succès !');
  }
}
