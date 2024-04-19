import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core'
import { Item } from './data.types'

@Injectable(
    {
        providedIn: 'root'
    }
)

export class CardsService {
    readonly #http = inject(HttpClient)
    get_cards$ = this.#http.get<Item[]>('https://jsonplaceholder.typicode.com/photos')
}
