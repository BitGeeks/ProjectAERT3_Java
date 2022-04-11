import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent implements OnInit {

  constructor(
    private title: Title,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.translatePipe.transform('Tham gia với chúng tôi'));
  }

}
