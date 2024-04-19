import { JsonPipe, SlicePipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { Pet } from './data.types';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [SlicePipe, MatCardModule],
    template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title>{{
          $item().title.length > 35
            ? ($item().title | slice : 0 : 35) + '...'
            : $item().title
        }}</mat-card-title>
      </mat-card-header>
      <img mat-card-image [src]="$item().thumbnailUrl" [alt]="$item().title" />
      <mat-card-content>
        <p>
          {{ $item().title | slice : 0 : 35 }}
        </p>
      </mat-card-content>
    </mat-card>
  `,
    styles: `.card {
    max-width: 400px;
  }`,
})
export class CardComponent {
    $item = input.required<Pet>();
}
