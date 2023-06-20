
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() label?: string;
  @Input() selectStyle: string = '';
  @Input() content?: string[];

  selected = 'none';

  @Output() optionSelected = new EventEmitter<string>(); // Add this line

  onOptionSelected(option: string): void {
    console.log(option);
    this.optionSelected.emit(option); // Emit the selected option value
  }
}

// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-select',
//   templateUrl: './select.component.html',
//   styleUrls: ['./select.component.scss']
// })
// export class SelectComponent {
//   @Input() label?: string;
//   @Input() selectStyle: string = '';  // Provide a default value here
//   @Input() content?: string[];

//   selected = 'none';

//   onOptionSelected(option: string): void {
//     console.log(option);
//   }
// }
