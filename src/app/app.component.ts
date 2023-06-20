import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from './services/global-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentLanguage: string | undefined;
  language: string | undefined;
  title = 'e_commerce_shoes_fe_angular';

  constructor(private globalStateService: GlobalStateService) {

  }

  //   ngOnInit(): void {
  //     //this.lang = "it";
  //     this.globalStateService.lang$.subscribe((lang) => {
  //       this.currentLanguage = lang;
  //       console.log('Global state APP COMPONENT:', this.currentLanguage);
  //     });

  // }
}
