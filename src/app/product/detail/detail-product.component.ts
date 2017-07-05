import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'detail-product',
  styleUrls: [ './detail-product.component.scss' ],
  templateUrl: './detail-product.component.html'
})

export class DetailProductComponent implements OnInit {
  public item = {
    street: '123',
    zip: 'zip',
    city: 'city',
    type: 'type',
    price: '123',
    status: 'SOLD'
  }

  constructor( public route: ActivatedRoute, public router: Router ) {}

  public ngOnInit() {}

  public close () {}
}
