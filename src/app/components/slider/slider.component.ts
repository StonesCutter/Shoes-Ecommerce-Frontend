import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Output() priceRangeChanged: EventEmitter<{ minPrice: number, maxPrice: number }> = new EventEmitter();

  formatLabel(value: number): string {
    return `${value}€`;
  }

  onPriceRangeChange(): void {
    const startInput = document.querySelector('input[matSliderStartThumb]') as HTMLInputElement;
    const endInput = document.querySelector('input[matSliderEndThumb]') as HTMLInputElement;
    const minPrice = parseInt(startInput.value, 10);
    const maxPrice = parseInt(endInput.value, 10);
    this.priceRangeChanged.emit({ minPrice, maxPrice });
  }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-slider',
//   templateUrl: './slider.component.html',
//   styleUrls: ['./slider.component.scss']
// })
// export class SliderComponent {

//   formatLabel(value: number): string {
//     return `${value}€`;
//   }

// }
