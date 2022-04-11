import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../store/auth/auth.reducer';
import * as AuthActions from '../store/auth/auth.actions';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isAdmin = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Admin panel');
    /*this.store.select('auth').pipe(take(1), map((authState: fromAuth.AuthState) => {
      this.isAdmin = authState.isAdmin;
    }));*/
    this.store.select('auth')
      .subscribe(data => {
        if (!data.authenticated) {
          this.router.navigate(['/login']);
        }
        else if (!data.isAdmin) {
          this.router.navigate(['/']);
        }
      });
  }

}
