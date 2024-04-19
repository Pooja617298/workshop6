import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core'
import { Pet } from './data.types'

@Injectable(
    {
        providedIn: 'root'
    }
)

export class PetService {
    readonly #http = inject(HttpClient)
    get_cards$ = this.#http.get<Pet[]>('https://6621eaf927fcd16fa6c83a7b.mockapi.io/api/pets/getPets')
}
