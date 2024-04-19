import { Component, computed, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CardsService } from './cards.service'
import { CardComponent } from './card.component'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { toSignal } from '@angular/core/rxjs-interop'
import { Pet, Item } from './data.types';
import { PetService } from './pets.service'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CardComponent, MatPaginatorModule],
  template: `
   <div class="container">
      <div class="centered">
       
        @for (item of $displayedItems(); track $index) {
            <app-card [$item]=item />
        }@empty {
          
        }
        <mat-paginator
          [length]="$data().length"
          [pageSize]="pageSize"
          [hidePageSize]="false"
          (page)="handlePage($event)">
        </mat-paginator>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        /* Center horizontally */
        margin: 0 auto;
        width: 400px;
        height: 100vh;
        /* Setup to center vertically */
        position: relative;
      }
      .centered {
        /* Center vertically */
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
      }
    `,
  ],
})
  
export class AppComponent {
  readonly #title = inject(Title);

  readonly pet_service = inject(PetService);
  readonly pageSize = 5;
  $pageIndex = signal(0);

  $data = toSignal(this.pet_service.get_cards$, { initialValue: [] as Pet[] });
 

  constructor() {
    effect(() => {
      this.#title.setTitle(this.$displayedItems()[0]?.title || 'No Pets');
    });
  }

  $displayedItems = computed(() => {
    const startIndex = this.$pageIndex() * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.$data().slice(startIndex, endIndex);
  });

  handlePage(event: PageEvent) {
    this.$pageIndex.set(event.pageIndex);
  }
}
// export class AppComponent {
//   readonly #title = inject(Title);
//   readonly card_service = inject(CardsService);
//   readonly pet_service = inject(CatService);

//   //$data = toSignal(this.card_service.get_cards$, { initialValue: [] as Item[] });
//   $data = toSignal(this.card_service.get_cards$, { initialValue: [] as Item[] });
//   $displayed_index = signal(0);
//   $displayed_Item = computed(() => {
//     return this.$data()[this.$displayed_index()];
//   });
//   constructor() { 
   
//     effect(() => this.#title.setTitle(this.$displayed_Item().title))
//   }
//   handlePage(event:PageEvent) {
//     this.$displayed_index.set(event.pageIndex);
//   }
// }
