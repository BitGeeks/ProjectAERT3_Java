import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private titleMeta: Title
  ) {
  }

  ngOnInit() {
    this.titleMeta.setTitle('Trang này không tồn tại');
    this.route.data.subscribe(
      (data: Data) =>
        this.errorMessage = data.message
    );
  }

}
