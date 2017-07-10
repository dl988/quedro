import {
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  Output,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'item-product',
  styleUrls: ['./item-product.component.scss'],
  templateUrl: './item-product.component.html'
})

export class ItemProductComponent implements OnInit {
  @Input() product;
  @Output() selected = new EventEmitter();

  public menuState : string = 'out';

  constructor( public route: ActivatedRoute, public router: Router ) {}

  public ngOnInit() {}
}