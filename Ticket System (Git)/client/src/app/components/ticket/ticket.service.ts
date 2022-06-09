import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Api } from '../constants/api';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  selectedTicket: Ticket;
  Tickets : Ticket[];
  baseURL = Api.API_ENDPOINT + '/tickets';

  constructor(private http: HttpClient) { }

  getTicketList() {
    return this.http.get(this.baseURL);
  }

  createTicket(Ticket: Ticket) {
    console.log(Ticket);
    return this.http.post(this.baseURL, Ticket);
  }

  editTicket(Ticket: Ticket) {
    return this.http.put(this.baseURL+ `/${Ticket._id}`, Ticket);
  }

  deleteTicket(Ticket: Ticket) {
    return this.http.post(this.baseURL+ `/delete/${Ticket._id}`, Ticket);
  }
}
