import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private title: Title,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.translatePipe.transform('Liên hệ'));
  }

}
