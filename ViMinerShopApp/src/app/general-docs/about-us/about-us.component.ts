import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private title: Title,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.translatePipe.transform('Về chúng tôi'));
  }

}
