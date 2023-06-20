import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./screens/home/home.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { SignupFormComponent } from "./components/signup-form/signup-form.component";
import { IdentityComponent } from "./screens/identity/identity.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonComponent } from "./components/button/button.component";
import { InputTextFieldComponent } from "./components/input-text-field/input-text-field.component";
import { InputPasswordFieldComponent } from "./components/input-password-field/input-password-field.component";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HeaderComponent } from "./screens/header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HomepageCategoryCardsComponent } from "./components/homepage-category-cards/homepage-category-cards.component";
import { SwiperModule } from "swiper/angular";
import { SliderHomepageComponent } from "./components/slider-homepage/slider-homepage.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatNativeDateModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatMenuTrigger } from "@angular/material/menu";
import { BoxImageComponent } from "./components/box-image/box-image.component";
import { ProductsSliderComponent } from "./components/products-slider/products-slider.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PreFooterComponent } from "./components/pre-footer/pre-footer.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductsListComponent } from "./screens/products-list/products-list.component";
import { SelectComponent } from "./components/select/select.component";
import { SliderComponent } from "./components/slider/slider.component";
import { MatSliderModule } from "@angular/material/slider";
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { WishlistComponent } from "./screens/wishlist/wishlist.component";
import { PersonalDataComponent } from "./screens/personal-data/personal-data.component";
import { UserInfoComponent } from "./screens/user-info/user-info.component";
import { AddressListComponent } from "./screens/address-list/address-list.component";
import { SingleProductComponent } from "./screens/single-product/single-product.component";
import { SingleProductSliderComponent } from "./components/single-product-slider/single-product-slider.component";
import { InfoProductBoxComponent } from "./components/info-product-box/info-product-box.component";
import { AccordionItemComponent } from "./components/accordion-item/accordion-item.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { CartComponent } from "./screens/cart/cart.component";
import { CartHeaderComponent } from "./components/cart-header/cart-header.component";
import { MatCardModule } from "@angular/material/card";
import { BrandsComponent } from "./screens/brands/brands.component";
import { CheckoutComponent } from "./screens/checkout/checkout.component";
import { OrderCardComponent } from "./components/order-card/order-card.component";
import { WishlistProductCardComponent } from "./components/wishlist-product-card/wishlist-product-card.component";
import { OrderListComponent } from "./screens/order-list/order-list.component";
import { OrderListAccordionComponent } from "./components/order-list-accordion/order-list-accordion.component";
import { GlobalStateService } from "./services/global-state.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

// Interceptors
import { interceptorProvider } from "./interceptor";
import { AddressDialogComponent } from "./components/address-dialog/address-dialog.component";
import { AddressFormComponent } from "./components/address-form/address-form.component";
import { SearchComponent } from "./screens/search/search.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    SignupFormComponent,
    IdentityComponent,
    ButtonComponent,
    InputTextFieldComponent,
    InputPasswordFieldComponent,
    HeaderComponent,
    HomepageCategoryCardsComponent,
    SliderHomepageComponent,
    BoxImageComponent,
    ProductsSliderComponent,
    ProductCardComponent,
    FooterComponent,
    PreFooterComponent,
    ProductsListComponent,
    SelectComponent,
    SliderComponent,
    PaginatorComponent,
    WishlistComponent,
    PersonalDataComponent,
    UserInfoComponent,
    AddressListComponent,
    SingleProductComponent,
    SingleProductSliderComponent,
    InfoProductBoxComponent,
    AccordionItemComponent,
    CartComponent,
    CartHeaderComponent,
    BrandsComponent,
    CheckoutComponent,
    OrderCardComponent,
    WishlistProductCardComponent,
    OrderListComponent,
    OrderListAccordionComponent,
    SearchComponent,
    AddressDialogComponent,
    AddressFormComponent,
    // MatSelectModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: "it",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatListModule,
    FlexLayoutModule,
    MatDatepickerModule,
    SwiperModule,
    MatTabsModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSliderModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    interceptorProvider,
    MatFormFieldModule,
    MatMenuTrigger,
    GlobalStateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
