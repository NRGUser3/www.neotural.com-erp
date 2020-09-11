import { Router } from '@angular/router';
import { MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { CategoryproductService } from '../services/categoryproduct.service';
import { Component, OnInit, Inject,Optional,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

export interface UsersData {
  productImage: string;
  productname: string;
  productcode: string;
  categoryname: string;
  price: string;
  unit: string;
  tax: string;
  margin: string;
  sellingprice: string;
  description: string;
  createdDate: string;
}

@Component({
  selector: 'app-productslide',
  templateUrl: './productslide.component.html',
  styleUrls: ['./productslide.component.scss']
})

export class ProductSlideComponent implements OnInit {
  model: any = {};
  local_data:any;
  btnsave:string;
  @Input() fromParent: UsersData;
  div1: boolean;
  div2: boolean;
  div3: boolean;
  div4: boolean;
  imageObject: Array<object> = [ ];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    public activeModal: NgbActiveModal,
    private _sanitizer: DomSanitizer,
  ) { 
   
  }

  ngOnInit() {  
    this.model.productImage=this.fromParent.productImage;
	  this.model.productname=this.fromParent.productname;
    this.model.productcode=this.fromParent.productcode;  
	  this.model.categoryname=this.fromParent.categoryname;
	  this.model.price=this.fromParent.price;
	  this.model.unit=this.fromParent.unit;
	  this.model.tax=this.fromParent.tax;
    this.model.margin=this.fromParent.margin;  
    this.model.sellingprice=this.fromParent.sellingprice;
	  this.model.description=this.fromParent.description;
    this.model.createdDate=this.fromParent.createdDate;

    if(this.model.productImage[0]!=undefined){
      this.div1 = true;
    }           

    if(this.model.productImage[1]!=undefined){
      this.div2 = true;
    }
    if(this.model.productImage[2]!=undefined){
      this.div3 = true;
    }
    if(this.model.productImage[3]!=undefined){
      this.div4 = true;
    }

  }

  getImage(imgData) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(imgData);
  }

  closeModal() {
    this.activeModal.close();
  }

}
