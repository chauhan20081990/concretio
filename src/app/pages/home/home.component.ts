import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products = [];
  public brands;
  public features;
  public categories;
  public selectedFeature;
  public selectedBrand;
  public categoryId;

  constructor( private http: HttpService, private route: ActivatedRoute, private router: Router, private spinnerService: Ng4LoadingSpinnerService ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.categoryId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id') : 0;
    forkJoin([this.http.get('categories', false), this.categoryId ? this.http.get('products?category_id='+this.categoryId, false) : this.http.get('products', false), this.http.get('brands', false), this.http.get('features')]).subscribe(
      results => {
        this.spinnerService.hide();
        this.categories = results[0];
        this.products = results[1];
        this.brands = results[2];
        this.features = results[3];
      }
    )
  }

  selectFilter () {
    let url = this.categoryId ? "?category_id=" + this.categoryId + "&" : "?";
    if(this.selectedFeature) {
      url = url + "feature_id=" + this.selectedFeature + "&";
    }

    if(this.selectedBrand) {
      url = url + "brand_id=" + this.selectedBrand + "&";
    }

    this.http.get('products' + url).subscribe(
      result => {
        this.products = result;
      }
    )
  }

  detail (id) {
    this.router.navigateByUrl("/home/" + id);
  }

  categoryName () {
    let name = "";
    if(this.categoryId)
    this.categories.map(category => {
      if(this.categoryId == category.id) name = category.name;
    })
    else name = "All";

    return name;
  }

}
