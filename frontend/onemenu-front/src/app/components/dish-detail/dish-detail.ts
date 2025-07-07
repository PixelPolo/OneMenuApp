import { Component, effect, inject, input, signal } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { DishType } from '../../models/dishType.model';
import { HttpService } from '../../services/http/http-service';

@Component({
  selector: 'app-dish-detail',
  imports: [],
  templateUrl: './dish-detail.html',
  styleUrl: './dish-detail.scss',
})
export class DishDetail {
  private http = inject(HttpService);

  dish = input.required<Dish>();
  dishType = signal<DishType | null>(null);

  constructor() {
    effect(() => {
      const dish = this.dish();
      if (dish) {
        this.http
          .get(`/dishType/${this.dish().dishTypeID}`)
          .subscribe((dishType) => {
            this.dishType.set(dishType);
          });
      }
    });
  }
}
