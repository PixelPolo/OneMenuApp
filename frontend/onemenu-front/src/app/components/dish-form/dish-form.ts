import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../services/http/http-service';
import { AuthService } from '../../services/auth/auth-service';
import { Dish } from '../../models/dish.model';
import { DishType } from '../../models/dishType.model';

@Component({
  selector: 'app-dish-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dish-form.html',
  styleUrl: './dish-form.scss',
})
export class DishForm {
  private http = inject(HttpService);
  private auth = inject(AuthService);

  sessionID = input.required<string>();
  dishToEdit = input<Dish | null>(null);
  dishTypes = signal<DishType[]>([]);
  possibleCurrencies = ['CHF', 'EUR', 'USD'];

  cancelEvent = output<void>();
  saveEvent = output<void>();

  dishForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    currency: new FormControl('', Validators.required),
    dishTypeID: new FormControl('', Validators.required),
  });

  constructor() {
    this.http.get<DishType[]>('/dishType').subscribe((types) => {
      this.dishTypes.set(types);
    });
    effect(() => {
      const dish = this.dishToEdit();
      if (dish) {
        this.dishForm.patchValue({
          name: dish.name,
          description: dish.description,
          price: dish.price.toString(),
          currency: dish.currency,
          dishTypeID: dish.dishTypeID,
        });
      }
    });
  }

  onSubmit() {
    // Get the values to post/put a Dish
    const form = this.dishForm.value;
    const dishToSend: Dish = {
      name: form.name!,
      description: form.description!,
      price: Number(form.price!),
      currency: form.currency!,
      dishTypeID: form.dishTypeID!,
      sessionID: this.sessionID(),
      userID: this.auth.currentUserSignal()!.userID,
    };
    // Post or put the Dish
    const request$ = this.dishToEdit()
      ? this.http.put(`/dish/${this.dishToEdit()!.dishID}`, dishToSend)
      : this.http.post('/dish', dishToSend);
    // Make the request
    request$.subscribe({
      next: () => {
        this.dishForm.reset();
        this.saveEvent.emit();
      },
      error: (err: unknown) => console.error('Error saving Dish:', err),
    });
  }
}
