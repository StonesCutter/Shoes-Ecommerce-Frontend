import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalStateService } from 'src/app/services/global-state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

  selectedLanguage: string = 'it';

  menu = [
    {
      header: 'Belle Scarpe',
      list: [
        {
          anchor: "footer.whoWeAre",
          path: 'assistenza'
        },
        {
          anchor: 'userMenuNav.logIn',
          path: 'accedi'
        },
        {
          anchor: 'footer.registration',
          path: 'accedi/registrati'
        }
      ]
    },
    {
      header: 'footer.privacyAndCookies',
      list: [
        {
          anchor: 'Privacy Policy',
          path: 'assistenza/privacy-policy'
        },
        {
          anchor: 'Cookie Policy',
          path: 'assistenza/cookie-policy'
        }
      ]
    },
    {
      header: 'footer.contacts',
      list: [
        {
          anchor: 'footer.serviceClient',
          path: 'assistenza'
        },
        {
          anchor: 'FAQ',
          path: 'assistenza/faq'
        },
        {
          anchor: 'footer.termAndConditions',
          path: 'assistenza/termini-condizioni'
        },
        {
          anchor: 'footer.returns',
          path: 'assistenza/resi'
        }
      ]
    }
  ];

  constructor(private translateService: TranslateService, 
    private router: Router, 
    private route: ActivatedRoute,  
    private globalStateService: GlobalStateService){
    this.translateService.setDefaultLang('it');
  }

  goTo(path: string): void {
    // Implement your navigation logic here
  }

  // changeLanguageIt() {
  //   this.translateService.use("it");
  //   this.globalStateService.setLanguage('it');
  //   console.log("Language chosen: It")
  // }
  // changeLanguageEn() {
  //   console.log("Language chosen: En")
  //   this.globalStateService.setLanguage('en');
  //   this.translateService.use("en");
  // }


  changeLanguageIt() {
    this.updateLanguage('it', 'en');
    console.log("Language chosen: It")
  }

  changeLanguageEn() {
    this.updateLanguage('en', 'it');
    console.log("Language chosen: En")
  }

  private updateLanguage(newLang: string, oldLang: string): void {
    this.translateService.use(newLang);
    this.globalStateService.setLanguage(newLang);

    // const currentUrl = this.router.url;
    // const updatedUrl = currentUrl.replace(`/${oldLang}/`, `/${newLang}/`);
    
    // this.router.navigateByUrl(updatedUrl);
    // console.log(`Language changed: ${newLang}`);
  }

}




// selectLanguage(code: string): void {
//   const currentLang = this.route.snapshot.paramMap.get('lang');
//   const currentPath = this.router.url;

//   if (currentPath === `/${currentLang}`) {
//     this.router.navigate([currentPath.replace(`/${currentLang}`, '')]);
//   } else {
//     this.router.navigate([`/${code}${currentPath.replace(`/${currentLang}/`, '')}`]);
//   }
// }