import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http/http-service';
import { Session } from '../../models/session.model';
import { SessionForm } from '../../components/session-form/session-form';
import { DishForm } from '../../components/dish-form/dish-form';
import { Dish } from '../../models/dish.model';
import { DishDetail } from '../../components/dish-detail/dish-detail';

@Component({
  selector: 'app-edit',
  imports: [RouterLink, SessionForm, DishForm, DishDetail],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit {
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpService);

  sessionID = signal<string>('');
  session = signal<Session | null>(null);
  dishes = signal<Dish[]>([]);
  selectedDish = signal<Dish | null>(null);
  isEditing = signal<boolean>(false);
  isAddingDishes = signal<boolean>(false);
  isListingDishes = signal<boolean>(false);
  isEditingDish = signal<boolean>(false);

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
    this.http.get(`/session/${id}`).subscribe((session) => {
      this.session.set(session);
    });
    this.http.get(`/dish/sessionID/${id}`).subscribe((dishes) => {
      dishes.sort((a: Dish, b: Dish) =>
        a.dishTypeID.localeCompare(b.dishTypeID)
      );
      this.dishes.set(dishes);
    });
  }

  resetComponent() {
    this.selectedDish.set(null);
    this.isEditing.set(false);
    this.isAddingDishes.set(false);
    this.isListingDishes.set(false);
    this.isEditingDish.set(false);
    this.loadData();
  }

  selectDish(dish: Dish) {
    if (this.selectedDish() === dish) {
      this.selectedDish.set(null);
    } else {
      this.selectedDish.set(dish);
    }
  }

  deleteDish() {
    if (confirm('ATTENTION - êtes-vous sûr de vouloir supprimer le plat ?')) {
      const id = this.selectedDish()?.dishID;
      this.http.delete(`/dish/${id}`).subscribe({
        next: () => {
          this.resetComponent();
        },
        error: (err: unknown) => {
          console.error('Error deleting Dish :', err);
        },
      });
    }
  }
}
