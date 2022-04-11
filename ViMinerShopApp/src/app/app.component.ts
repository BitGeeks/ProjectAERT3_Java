import { Component, OnInit } from '@angular/core';
import * as AuthActions from './store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import { CanonicalService } from './services/canonical.service';
import { Meta } from '@angular/platform-browser';
import { I18nService } from './i18n';
import { config } from 'src/config/local';
import { get } from 'scriptjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>,
    private canonicalService: CanonicalService,
    private meta: Meta,
    private i18nService: I18nService,
  ) {
  }

  ngOnInit(): void {
    this.canonicalService.setCanonicalURL();
    this.store.dispatch(new AuthActions.CheckIfLoggedIn());
    this.store.dispatch(new AuthActions.RequestAdminRole());
    this.meta.addTag( { name: 'description', content: 'Vĩ Miner Shop là web shop bán máy đào của Lê Song Vĩ' } );

    this.i18nService.init(config.defaultLanguage, config.supportedLanguages);

    get('https://embed.tawk.to/60f9c900649e0a0a5ccd7f2b/1fb7ribfo', () => {
      // @ts-ignore
      //const Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    });

    console.group(),
    console.log('%cHola! Xin chào! Hello!', 'color: #E00;font-size: 16px'),
    console.log('%cNhững thứ bạn đang chuẩn bị làm, thật sự là không nên đâu', 'color: #E00;font-size: 30px'),
    console.log('%cWhat you are about to do, really shouldn\'t be', 'color: #E00;font-size: 30px'),
    console.groupEnd();
  }

  onActivate($event) {
    window.scroll(0, 0);
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
