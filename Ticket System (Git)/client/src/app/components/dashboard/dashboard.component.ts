import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import moment from 'moment';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SigninService } from '../_services/signin.service';
import { TicketService } from '../ticket/ticket.service';
import { Ticket } from '../ticket/ticket.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  updated = true;

  displayedColumns = [
    'ticket_no',
    'usrname',
    'ticket_desc',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'Edit',
    'Delete'
  ];

  dataSource = new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getTickets();
  }

  constructor(
    public signin: SigninService,
    public ticketservice: TicketService,
    public flashMessageService: FlashMessagesService,
    private router: Router
  ) {
    if(this.signin.logIn()) {
      this.signin.islogIn = true;
      this.router.navigateByUrl('/home')
    }

    else {
      this.router.navigateByUrl('/signin')
    }

    this.ticketservice.selectedTicket = {
      _id: '',
      ticket_no: '',
      usrname: signin.user.usrname,
      ticket_desc:'',
      created_At: '',
      updatedAt: '',
      deleted_At: ''
    }
  }

  // Get tickets from Back-end
  getTickets() {
    this.ticketservice.getTicketList().subscribe((res) => {
      this.ticketservice.Tickets = res as Ticket[];
      this.dataSource = new MatTableDataSource(this.ticketservice.Tickets);
      this.dataSource.paginator = this.paginator;
    })
  }

  //Reset Ticket Form
  resetForm(form?: NgForm) {
    this.ticketservice.selectedTicket._id= '';
    this.ticketservice.selectedTicket.usrname= this.signin.user.usrname;
    this.ticketservice.selectedTicket.ticket_desc = '';
  }

  //Submit Ticket Form
  onSubmit(form: NgForm) {
    form.value.usrname = this.signin.user.usrname;

    if(form.value._id == '' || form.value._id == null) {
      this.ticketservice.createTicket(form.value).subscribe((res) => {
        this.resetForm();
        this.flashMessageService.show('Ticket Created.',{
          cssClass: 'alert-success toast-box',
          timeout: 2500
        })
        this.getTickets();
      });
    }
    else
    {
      this.ticketservice.editTicket(form.value).subscribe((res) => {
        this.resetForm();

        this.getTickets();
      })
    }

  }

  //Edit Ticket
  onEdit(Ticket: Ticket) {
    this.ticketservice.selectedTicket = Ticket;
  }

  //Clear Form after closing TIcket
  onClose() {
    this.getTickets();
    this.resetForm();
  }

  //Resolve Ticket
  onDelete(element: Ticket) {
    if(confirm("Are you sure to resolve this ticket?") === true) {
      this.ticketservice.deleteTicket(element).subscribe((res) => {
        this.updated = false;
        this.getTickets();
      });
    }

  }

  //Filter
  applySearch(event: Event) {
    const searchValue = (event?.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  //Convert to moment
  moment(element: any) {
    return moment(element).fromNow();
  }

  //Convert to date format
  toDate(element: any) {
    return moment(element).format("L");
  }


}
