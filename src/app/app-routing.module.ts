
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./screens/home/home.component";
import { IdentityComponent } from "./screens/identity/identity.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { SignupFormComponent } from "./components/signup-form/signup-form.component";
import { HeaderComponent } from "./screens/header/header.component";
import { CartComponent } from "./screens/cart/cart.component";
import { ProductsListComponent } from "./screens/products-list/products-list.component";
import { PersonalDataComponent } from "./screens/personal-data/personal-data.component";
import { UserInfoComponent } from "./screens/user-info/user-info.component";
import { WishlistComponent } from "./screens/wishlist/wishlist.component";
import { AddressListComponent } from "./screens/address-list/address-list.component";
import { SingleProductComponent } from "./screens/single-product/single-product.component";
import { BrandsComponent } from "./screens/brands/brands.component";
import { OrderListComponent } from "./screens/order-list/order-list.component";
import { CheckoutComponent } from "./screens/checkout/checkout.component";
import { SearchComponent } from "./screens/search/search.component";

const routes: Routes = [

  { path: "", component: HomeComponent },
  { path: "header", component: HeaderComponent },
  { path: "cart", component: CartComponent },
  { path: "single-product", component: SingleProductComponent },
  //{ path: "scarpe", component: ProductsListComponent },
  { path: "scarpa/:id", component: SingleProductComponent },
  { path: "brand", component: BrandsComponent},
  {
    path: "scarpe",
    component: ProductsListComponent,
    children: [
      { path: "", component: ProductsListComponent },
      { path: ":uno", component: ProductsListComponent },
      { path: ":uno/:due", component: ProductsListComponent },
    ],
  },
{
    path: "area-personale",
    component: UserInfoComponent,
    children: [
      { path: "", component: PersonalDataComponent },
      { path: "indirizzi", component: AddressListComponent },
      { path: "lista-desideri", component: WishlistComponent },
      { path: "lista-ordini", component: OrderListComponent },
    ],
  },
  {
    path: "accedi",
    component: IdentityComponent,
    children: [
      { path: "", component: LoginFormComponent },
      { path: "registrati", component: SignupFormComponent },
    ],
  },
  { path: "checkout", component: CheckoutComponent },
  { path: "ricerca", component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


// import { NgModule } from "@angular/core";
// import { RouterModule, Routes } from "@angular/router";
// import { HomeComponent } from "./screens/home/home.component";
// import { IdentityComponent } from "./screens/identity/identity.component";
// import { LoginFormComponent } from "./components/login-form/login-form.component";
// import { SignupFormComponent } from "./components/signup-form/signup-form.component";
// import { HeaderComponent } from "./screens/header/header.component";
// import { CartComponent } from "./screens/cart/cart.component";
// import { ProductsListComponent } from "./screens/products-list/products-list.component";
// import { PersonalDataComponent } from "./screens/personal-data/personal-data.component";
// import { UserInfoComponent } from "./screens/user-info/user-info.component";
// import { WishlistComponent } from "./screens/wishlist/wishlist.component";
// import { AddressListComponent } from "./screens/address-list/address-list.component";
// import { SingleProductComponent } from "./screens/single-product/single-product.component";
// import { BrandsComponent } from "./screens/brands/brands.component";

// const routes: Routes = [
//   { path: ":lang", component: HomeComponent },
//   { path: ":lang/header", component: HeaderComponent },
//   { path: ":lang/cart", component: CartComponent },
//   { path: ":lang/single-product", component: SingleProductComponent },
//   { path: ":lang/scarpe", component: ProductsListComponent },
//   { path: ":lang/brand", component: BrandsComponent },
//   {
//     path: ":lang/area-personale",
//     component: UserInfoComponent,
//     children: [
//       { path: "", component: PersonalDataComponent },
//       { path: "indirizzi", component: AddressListComponent },
//       { path: "lista-desideri", component: WishlistComponent },
//     ],
//   },
//   {
//     path: ":lang/accedi",
//     component: IdentityComponent,
//     children: [
//       { path: "", component: LoginFormComponent },
//       { path: "registrati", component: SignupFormComponent },
//     ],
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
