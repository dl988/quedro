import {
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  Output,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'form-product',
  styles: [``],
  templateUrl: './form-product.component.html',
})

export class FormProductComponent implements OnInit {
  @Input() producForm;

  constructor ( 
    public route: ActivatedRoute, 
    public router: Router
  ) {}

  public ngOnInit() {}
}