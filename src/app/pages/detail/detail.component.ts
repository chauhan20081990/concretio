import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public product;

  constructor( private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.http.get('products?id=' + this.route.snapshot.paramMap.get('id')).subscribe(
      result => {
        this.product = result[0];
      }
    )
  }

}
