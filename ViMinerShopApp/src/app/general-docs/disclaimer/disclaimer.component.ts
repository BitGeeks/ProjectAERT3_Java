import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {

  constructor(
    private title: Title,
    private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    this.title.setTitle(this.translatePipe.transform('Tuyên bố từ chối trách nhiệm'));
  }

}
