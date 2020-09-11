import { Component, OnInit, OnChanges, Input, ViewChild ,ElementRef,Inject,Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { CompleterData, CompleterService } from 'ng2-completer';
import { PercentPipe } from '../../../../../../node_modules/@angular/common';
import { VendorService } from 'src/app/templates/modules/vendor-and-customer/services/vendor.service';
import { CategoryproductService } from '../services/categoryproduct.service';
import { Category, Product } from '../../../../core/common/_models';
import { Discount } from '../../../../core/common/_models/discount';
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { ProductSlideComponent } from './../productslide/productslide.component';

// addnewcategory start
@Component({
  selector: 'addnewcategory',
  styleUrls: ['./addnewcategory.scss'],
  templateUrl: './addnewcategory.html', 
})
export class AddnewcategoryComponent {
  countryList:any;
  priorityList:any;
  local_data:any;
  model: any = {};
  category:Category;
  categorycode:string;
  name:string;
  description:string;
  btnlabel:string;
  show:boolean;
  @Input() fromParent: UsersData;

  constructor(
    private catprodservice: CategoryproductService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    //public dialogRef: MatDialogRef<AddnewcategoryComponent>,
    private snackBar: MatSnackBar,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,

    ) {
      console.log(data);
      /* this.local_data = {...data};
      this.categorycode = this.local_data.categorycode;
      this.name = this.local_data.name;
      this.description = this.local_data.desc;
      this.model.categorycode = this.categorycode;
      this.model.name = this.name;
      this.model.description = this.description;
      if(this.categorycode!=null){
       // alert("Yes code");
        this.btnlabel="Update";
        this.show=true;
      }else {
        this.btnlabel="Save";
        this.show=false;
        //alert("No code");
      } */
    }

    ngOnInit() {
      this.categorycode = this.fromParent.categorycode;
      this.name = this.fromParent.name;
      this.description = this.fromParent.desc;
      this.model.categorycode = this.categorycode;
      this.model.name = this.name;
      this.model.description = this.description;
      if(this.categorycode!=null){
        this.btnlabel="Update";
        this.show=true;
      }else {
        this.btnlabel="Save";
        this.show=false;
      } 
      
    }

    closeModal() {
      this.activeModal.close();
    }

    saveCategory(){
      console.log("Inside saveCategory method");
      console.log("Category Name-->"+this.model.categorycode);
      console.log("Category Name-->"+this.model.name);
      console.log("Category Desc-->"+this.model.description);
      this.catprodservice.save(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Category Saved Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top',
              duration: undefined,      
            });
          });
          this.modalService.dismissAll();
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        }); 
      });  
    }
    
  /* close(e) {
    this.dialogRef.close();
  } */
}
// addnewcategory end


// categoryeditdelete start
@Component({
  selector: 'categoryeditdelete',
  styleUrls: ['./categoryeditdelete.scss'],
  templateUrl: './categoryeditdelete.html', 
})
export class CategoryeditdeleteComponent {
  countryList:any;
  categorylist:any;
  model: any = {};
  tempid=null;
  category: Category = new Category;
  constructor(
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
    private catprodservice: CategoryproductService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
     // this.countryList = require("../../../assets/country.json");
    
    this.categorylist=data;
    console.log(this.categorylist);
    }

    onChangeCategory(categorycode: string){
      for(let i=0;i<this.categorylist.length;i++){
        if(this.categorylist[i].categorycode==categorycode){
          this.model.name=this.categorylist[i].name;
          this.model.description=this.categorylist[i].description;
        }
      }
     }
    
     saveCategoryeditdelete(){
      this.catprodservice.update(this.model)
      .subscribe(
        data => {
          this.category =   data;  
          this.dialogRef.close();
          setTimeout(() => {
            this.snackBar.open("Category Saved Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
       
          this.dialogRef.close();
          console.log("saveCategoryeditdelete"); 
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });           }
        );
    }

    categorydelete(categorycode: string){
      this.catprodservice.remove(categorycode)
      .subscribe(
        data => {
          this.category =  data;  
          if(this.category.status == "Success"){
          this.dialogRef.close();
          setTimeout(() => {
            this.snackBar.open("Category is Removed Successfully", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });

        }else if(this.category.status == "failure"){
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
        }
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });         }
    );
  }
    close() {
    this.dialogRef.close();
  }
}
// categoryeditdelete end
export interface UsersData {
  title: string;
  key: string;
  categorycode: string;
  name: string;
  desc:string;
  prodcode:string;
  vendorcode: string;
  prodheaderlabel: string;
  prodbtnlabel: string;
  btnlabel: string;
}

// add promostion start
@Component({
  selector: 'addpromotion',
  styleUrls: ['./addpromotion.scss'],
  templateUrl: './addpromotion.html', 
})
export class AddpromotionComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  allcategorylist:any= {};
  allitemnamelist:any= {};
  discount:Discount;
  //protected dataService: CompleterData;
  public dataService: CompleterData;
  title:string;
  key:string;
  discountShow:boolean;
  freegiftShow:boolean;
  otherShow:boolean;

  freegiftLabel:boolean;
  discountLabel:boolean;

  local_data:any;
  @Input() fromParent: UsersData;

  constructor(
    //public dialogRef: MatDialogRef<AddpromotionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private catprodservice: CategoryproductService,
    private completerService: CompleterService,
    private snackBar: MatSnackBar,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    ) {
      
      this.catprodservice.load()
      .subscribe(
         data => {
           this.allcategorylist = data;
           console.log("category name"+this.allcategorylist);
         },
        error => {
        	setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
       }
      );

      //all item load
      this.catprodservice.loadItemName()
      .subscribe(
         data => {
           this.allitemnamelist = data;
           this.dataService = completerService.local(this.allitemnamelist);  
         },
        error => {
        	setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
        }
      );
 
    }

    ngOnInit(){
      this.title = this.fromParent.title;
      this.key = this.fromParent.key;
      if(this.key == "freegift") {
        this.discountLabel = false;
        this.freegiftLabel = true;
      }
      if(this.key == "discount") {
        this.discountLabel = true;
        this.freegiftLabel = false;
      } 
    }

    savePromotion(){
      console.log("Category Name -->"+this.model.categorycode);
      console.log("Item Name -->"+this.model.productname);
      console.log("discount from date-->"+this.model.fromdate_promotionperiod);
      console.log("discount to date-->"+this.model.todate_promotionperiod);
      console.log("discount type -->"+this.model.discountType);
      console.log("discount qty  -->"+this.model.qty);
      console.log("Free gift  -->"+this.model.freegift);
      console.log("Other item  -->"+this.model.others);

      this.catprodservice.addpromotionsave(this.model)
      .subscribe(
        data => {
          this.discount =  data; 
          this.modalService.dismissAll();
          setTimeout(() => {
            this.snackBar.open("Promotion created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top',
              duration: undefined     
            });
          });
          /*if(this.discount.status=="success"){
            setTimeout(() => {
              this.snackBar.open("Promotion created Successfully", "", {
                panelClass: ["success"],
                verticalPosition: 'top',
                duration: undefined     
              });
            });
           
          } 
          if(this.discount.status=="failure"){
            setTimeout(() => {
              this.snackBar.open("Network error: server is temporarily unavailable", "", {
                panelClass: ["error"],
                verticalPosition: 'top'      
              });
            });   
          } */
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
        }
      ); 
    }

    freediscountBox(title:string){
      this.model.discountType = '';
      if(title == "Add Free Gift"){
        this.freegiftShow = true;
        this.discountShow = false;
        this.otherShow = false;
        this.model.discountType = "freegift";
      }else if(title == "Add Discount"){
        this.freegiftShow = false;
        this.discountShow = true;
        this.otherShow = false;
        this.model.discountType = "discount";
      }
    }

    otherBox(){
      this.freegiftShow = false;
      this.discountShow = false;
      this.otherShow = true;
    }

    closeModal() {
      this.activeModal.close();
    }

}
// add promostion end

//discountedit start
@Component({
  selector: 'discountedit',
  styleUrls: ['./discountedit.css'],
  templateUrl: './discountedit.html', 
})
export class DiscounteditComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  alldiscountlist: any={};
  allcategorylist:any= {};
  vendornamelist: any = {};
  discount: Discount;
  constructor(
    public dialogRef: MatDialogRef<DiscounteditComponent>,
    private catprodservice:CategoryproductService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.catprodservice.load()
     .subscribe(
        data => {
          this.allcategorylist = data;
          console.log("category name"+this.allcategorylist);
        },
       error => {
        	
		setTimeout(() => {
      this.snackBar.open("Network error: server is temporarily unavailable", "", {
        panelClass: ["error"],
        verticalPosition: 'top'      
      });
    });   

      }
     );
    this.loadDiscount();

    }


    loadDiscount(){
      let discount="discount"
      this.catprodservice.loadDiscount(discount)
      .subscribe(
        data => {
          this.alldiscountlist = data;
          console.log("discountedit code -->"+this.alldiscountlist[0].discountcode);
          for(let k=0;k<this.alldiscountlist.length;k++){
            if(this.alldiscountlist[k].discountcode==this.data){
              this.model.productname=this.alldiscountlist[k].productname;
              this.model.discount=this.alldiscountlist[k].discount;
              this.model.qty=this.alldiscountlist[k].qty;
              this.model.fromdate_promotionperiod=this.alldiscountlist[k].fromdate_promotionperiod;
              this.model.todate_promotionperiod=this.alldiscountlist[k].todate_promotionperiod;
              this.model.promotionperiod=this.model.fromdate_promotionperiod + "-"+ this.model.todate_promotionperiod;
              this.model.discountcode=this.alldiscountlist[k].discountcode;
            }
          }
        },
        error => {
         	
		setTimeout(() => {
      this.snackBar.open("Network error: server is temporarily unavailable", "", {
        panelClass: ["error"],
        verticalPosition: 'top'      
      });
    });   

        }
      );
    }
  updateDiscount(){
    console.log("category after update"+this.model.discountcode);
    this.catprodservice.updateDiscount(this.model)
    .subscribe(
      data => {
        this.discount =   data;
        this.dialogRef.close();
        setTimeout(() => {
          this.snackBar.open("Discount Updated Successfully", "", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });

        this.dialogRef.close();
      },
      error => {
	
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });   
		      }
      );
    }

    close(e) {
    this.dialogRef.close();
  }
}
//discountedit end

//discountdelete start
@Component({
  selector: 'discountdelete',
  styleUrls: ['./discountdelete.css'],
  templateUrl: './discountdelete.html', 
})
export class DiscountdeleteComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    public dialogRef: MatDialogRef<DiscountdeleteComponent>,
    ) {
    }

    close() {
    this.dialogRef.close();
  }
}
//discountdelete end

// addnewproduct start
@Component({
  selector: 'addnewproduct',
  styleUrls: ['./addnewproduct.scss'],
  templateUrl: './addnewproduct.html', 
})
export class AddnewproductComponent {
  model: any = {};
  allcategorylist:any = {};
  categorylist:any = {};
  vendornamelist: any = {};
  allUnitlist:any = {};
  unitlist: any = {};
  data: any = {};
  category:Category;
  product:Product;
  selectedFiles: any = {};
  allproducedittlist:any = {};

  isImageSaved0: boolean;
  isImageSaved1:boolean;
  isImageSaved2: boolean;
  isImageSaved3:boolean;
  
  imageError: string;
  inputproductcode:string;
  vendorcode:string;
  public div1 = false;
  public div2 = false;
  public div3 = false;
  public div4 = false;
  productImage: Array<any> = [];
  imageIndex0:boolean = false;
  imageIndex1:boolean = false;
  imageIndex2:boolean = false;
  imageIndex3:boolean = false;

  imgBase64Path:any;
  @Input() fromParent: UsersData;
  prodheaderlabel: string;
  prodbtnlabel: string;

  constructor(
    //public dialogRef: MatDialogRef<AddnewproductComponent>,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router, config: NgbModalConfig, 
    private modalService: NgbModal,
    private _sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal,

    ) { 
      
      //this.catprodservice.load()
      this.categorylist="";
      this.catprodservice.loadCategoryName()
      .subscribe(
        data => {
          this.categorylist = data;
        },
        error => {	
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
        }
     );

     //this.vendorservice.load()
     this.vendornamelist = '';
     this.vendorservice.loadvendornamecode()
     .subscribe(
        data => {
          this.vendornamelist = data;
          console.log("category name"+this.vendornamelist);
        },
       error => {	
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });   
      }
     );
     
     //--load unitList
     let id = "all";
     this.allUnitlist = '';
     this.catprodservice.loadUnitList(id)
      .subscribe(
        data => {
          this.allUnitlist = data;
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
        }
      );
      this.model.sellingprice = 0;
  }

  ngOnInit() {
    this.prodheaderlabel = this.fromParent.prodheaderlabel;
    this.prodbtnlabel = this.fromParent.prodbtnlabel;
    if(this.prodbtnlabel == 'Add'){

    }else if(this.prodbtnlabel == 'Update'){
      this.allproducteditcall(this.fromParent.prodcode,this.fromParent.vendorcode);
    }
  }

  fileChangeEvent(fileInput: any,imageNumber:number) {
    console.log("Add Product");
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

      
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                 
                    return false;
                } else {
                    this.imgBase64Path = e.target.result;
                   // this.cardImageBase64 = imgBase64Path;
                   if(this.productImage[imageNumber]!=null){
                     console.log("no value...");
                   }
                   if(imageNumber==0){
                      if(this.imageIndex1==false){
                        console.log("First Time");
                        this.productImage.push(this.imgBase64Path);
                        this.isImageSaved0 = true;
                        this.div1 = false;
                        this.imageIndex1=true;
                        console.log("First time Base 64 array1 value-->"+this.productImage[0]);
                      }
                      else{
                        console.log("else");
                        console.log("Second time Before update Base 64 array value-->"+this.productImage[0]);
                        console.log("Second time Base 64-->"+this.imgBase64Path);
                        this.productImage[0] = this.imgBase64Path;
                        this.isImageSaved0 = true;
                        console.log("Second time Base 64 array1 value-->"+this.productImage[0]);
                        //this.imageIndex1=true;
                      }
                  }
                  // Second Image
                  if(imageNumber==1){
                    if(this.imageIndex1==false){
                      console.log("First Time");
                      this.productImage.push(this.imgBase64Path);
                      this.isImageSaved1 = true;
                      this.imageIndex1=true;
                      console.log("First time Base 64 array2 value-->"+this.productImage[1]);
                    }
                    else{
                      console.log("else");
                      console.log("Second time Before update Base 64 array value-->"+this.productImage[1]);
                      console.log("Second time Base 64-->"+this.imgBase64Path);
                      this.productImage[1] = this.imgBase64Path;
                      this.isImageSaved1 = true;
                      console.log("Second time Base 64 array2 value-->"+this.productImage[1]);
                    }
                }

                // Third Image
                if(imageNumber==2){
                  if(this.imageIndex2==false){
                    console.log("First Time");
                    this.productImage.push(this.imgBase64Path);
                    this.isImageSaved2 = true;
                    this.imageIndex2=true;
                    console.log("First time Base 64 array3 value-->"+this.productImage[2]);
                  }
                  else{
                    console.log("else");
                    console.log("Third time Before update Base 64 array value-->"+this.productImage[2]);
                    console.log("Third time Base 64-->"+this.imgBase64Path);
                    this.productImage[2] = this.imgBase64Path;
                    this.isImageSaved2 = true;
                    console.log("Third time Base 64 array3 value-->"+this.productImage[2]);
                  }
              }

              // Fourth Image
              if(imageNumber==3){
                if(this.imageIndex3==false){
                  console.log("First Time");
                  this.productImage.push(this.imgBase64Path);
                  this.isImageSaved3 = true;
                  this.imageIndex3=true;
                  console.log("First time Base 64 array4 value-->"+this.productImage[1]);
                }
                else{
                  console.log("else");
                  console.log("Fourth time Before update Base 64 array value-->"+this.productImage[3]);
                  console.log("Fourth time Base 64-->"+this.imgBase64Path);
                  this.productImage[3] = this.imgBase64Path;
                  this.isImageSaved3 = true;
                  console.log("Fourth time Base 64 array4 value-->"+this.productImage[1]);
                }
              }else{	
                console.log("Old Image Added productImage -->");
                this.productImage.push(this.model.productImage[0]);	
                this.productImage.push(this.model.productImage[1]);	
                this.productImage.push(this.model.productImage[2]);	
                this.productImage.push(this.model.productImage[3]);	
              }      
            }
          };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage(i:number) {
    this.productImage[i]=null;
    if(i==0){
      this.isImageSaved0 = false;
    }
    if(i==1){
      this.isImageSaved1 = false;
    }
    if(i==2){
      this.isImageSaved2 = false;
    }
    if(i==3){
      this.isImageSaved3 = false;
    }
  }

  marginPrice:any;
  taxPrice:any;
  getSellingPrice(price:string,tax:string,margin:string){
    console.log("price-->"+price + "--- Tax --->"+tax+"-- Margin ---->"+margin);
    if(tax == null || tax == undefined){
      if(margin == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else if(margin == null || tax == undefined){
      if(tax == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else{
      this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
      this.taxPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
      this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice)+Number.parseInt(this.taxPrice);
    }
  }

  saveNewProduct(prodbtnlabel: string){
    if(prodbtnlabel == "Add"){
      this.model.productImage = this.productImage;
      this.model.productImage1 = this.productImage[0];
      console.log("Selling Price -->"+this.model.sellingprice);
      this.catprodservice.producsave(this.model)
      .subscribe(
        data => {
          this.product = data; 
          setTimeout(() => {
            this.snackBar.open("Product saved Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.model.sellingprice = 0;
          this.modalService.dismissAll();
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
      
        }
      ); 
    }else if(prodbtnlabel == "Update"){
      console.log("Product Code-->"+this.inputproductcode);
      if(this.productImage.length == 0){
        this.model.productImage1 = this.model.productImage[0];
      }else{
        this.model.productImage = this.productImage;
        this.model.productImage1 = this.productImage[0];
      }
      
      this.model.prodcode=this.inputproductcode;
      this.catprodservice.setItem(this.model)
      .subscribe(
        data => {
          this.product =   data;
          setTimeout(() => {
            this.snackBar.open("Product Updated Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.modalService.dismissAll();
          console.log(" --- productedit ----"); 
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });      
        }
      );
    }
  }

  getImage(imgData) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(imgData);
  }

  allproducteditcall(prodcode: string,vendorcode:string){  
    console.log("allproducteditcall");
    this.inputproductcode = prodcode;
    this.model.vendorcode = vendorcode;

    this.catprodservice.loadEditItem(this.model.vendorcode)
    .subscribe(
      data => {
        this.allproducedittlist = data;
        console.log("productedit code -->"+this.allproducedittlist[0].prodcode);
        for(let k=0;k<this.allproducedittlist.length;k++){
          if(this.allproducedittlist[k].prodcode==this.inputproductcode){
            this.model.productname=this.allproducedittlist[k].productname;
            this.model.description=this.allproducedittlist[k].description;
            this.model.price=this.allproducedittlist[k].price;
            this.model.tax=this.allproducedittlist[k].tax;
            this.model.margin=this.allproducedittlist[k].margin;
            this.model.sellingprice=this.allproducedittlist[k].sellingprice;
            this.model.vendorcode=this.allproducedittlist[k].vendorcode;
            this.model.vendorname=this.allproducedittlist[k].vendorname;
            this.model.categorycode=this.allproducedittlist[k].categorycode;
            this.model.categoryname=this.allproducedittlist[k].categoryname;
            console.log("category name -->"+this.model.categoryname);
            console.log("category code -->"+this.model.categorycode);
            this.model.categorycode=this.allproducedittlist[k].categoryname+"-"+this.allproducedittlist[k].categorycode;
            console.log("category code & name -->"+this.model.categorycode);
            console.log("vendor name -->"+this.model.vendorname);
            console.log("vendor code -->"+this.model.vendorcode);
            this.model.vendorcode=this.allproducedittlist[k].vendorname+"-"+this.allproducedittlist[k].vendorcode;
            console.log("vendor name & code -->"+this.model.vendorcode);
            this.model.unit=this.allproducedittlist[k].unit;
            this.model.productImage=this.allproducedittlist[k].productImage;

            if(this.model.productImage[0]!=undefined){
              this.div1 = true;
              this.isImageSaved0 = false;
            }           

            if(this.model.productImage[1]!=undefined){
              this.div2 = true;
              this.isImageSaved1 = false;
            }
            if(this.model.productImage[2]!=undefined){
              this.div3 = true;
              this.isImageSaved2 = false;
            }
            if(this.model.productImage[3]!=undefined){
              this.div4 = true;
              this.isImageSaved3 = false;
            }
          }
        }
        this.model.prodcode=this.allproducedittlist[0].prodcode;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });   
		
      }
    );
  }

  closeModal() {
    this.activeModal.close();
  }

}
// addnewproduct end

//allproduct edit start
@Component({
  selector: 'allproductedit',
  styleUrls: ['./allproductedit.scss'],
  templateUrl: './allproductedit.html', 
})
export class AllproducteditComponent {
  model: any = {};
  dialogConfig: any;
  dialog: any;
  allcategorylist:any= {};
  vendornamecodelist: any = {};
  allproducedittlist: any = {};
  allUnitlist:any = {};
  category:Category;
  product:Product;
  inputproductcode:string;
  isImageSaved0:boolean;
  isImageSaved1:boolean;
  isImageSaved2:boolean;
  isImageSaved3:boolean;

  vendorcode:string;
  local_data:any;
  public div1 = false;
  public div2 = false;
  public div3 = false;
  public div4 = false;
  imageError: string;
  productImage: Array<any> = [];
  imageIndex0:boolean = false;
  imageIndex1:boolean = false;
  imageIndex2:boolean = false;
  imageIndex3:boolean = false;
  imgBase64Path:any;

  constructor(
    public dialogRef: MatDialogRef<AllproducteditComponent>,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    private snackBar: MatSnackBar,
    private _sanitizer: DomSanitizer,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    ) {
      console.log(data);
      this.local_data = {...data};
      this.inputproductcode = this.local_data.prodcode;
      this.vendorcode = this.local_data.vendorcode;
      this.model.vendorcode = this.vendorcode;
      //alert(data);
      this.catprodservice.loadCategoryName()
      .subscribe(
         data => {
           this.allcategorylist = data;
           console.log("category name & code -->"+this.allcategorylist);
         },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
      
       }
      );
     
      this.vendorservice.loadvendornamecode()
      .subscribe(
         data => {
           this.vendornamecodelist = data;
           console.log("Vendor name & code -->"+this.vendornamecodelist);
         },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
      
       }
      );

      //--load unitList
     let id = "all";
     this.catprodservice.loadUnitList(id)
      .subscribe(
        data => {
          this.allUnitlist = data;
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
        }
      );

       //this.allproductlist="";
    this.catprodservice.loadEditItem(this.model.vendorcode)
    .subscribe(
      data => {
        this.allproducedittlist = data;
        console.log("productedit code -->"+this.allproducedittlist[0].prodcode);
        for(let k=0;k<this.allproducedittlist.length;k++){
          if(this.allproducedittlist[k].prodcode==this.inputproductcode){
            this.model.productname=this.allproducedittlist[k].productname;
            this.model.description=this.allproducedittlist[k].description;
            this.model.price=this.allproducedittlist[k].price;
            this.model.tax=this.allproducedittlist[k].tax;
            this.model.margin=this.allproducedittlist[k].margin;
            this.model.sellingprice=this.allproducedittlist[k].sellingprice;
            this.model.vendorcode=this.allproducedittlist[k].vendorcode;
            this.model.vendorname=this.allproducedittlist[k].vendorname;
            this.model.categorycode=this.allproducedittlist[k].categorycode;
            this.model.categoryname=this.allproducedittlist[k].categoryname;
            console.log("category name -->"+this.model.categoryname);
            console.log("category code -->"+this.model.categorycode);
            this.model.categorycode=this.allproducedittlist[k].categoryname+"-"+this.allproducedittlist[k].categorycode;
            console.log("category code & name -->"+this.model.categorycode);
            console.log("vendor name -->"+this.model.vendorname);
            console.log("vendor code -->"+this.model.vendorcode);
            this.model.vendorcode=this.allproducedittlist[k].vendorname+"-"+this.allproducedittlist[k].vendorcode;
            console.log("vendor name & code -->"+this.model.vendorcode);
            this.model.unit=this.allproducedittlist[k].unit;
            this.model.createddate=this.allproducedittlist[k].createddate;
            this.model.productImage=this.allproducedittlist[k].productImage;
            if(this.model.productImage[0]!=undefined){
              this.div1 = true;
              this.isImageSaved0 = false;
              //alert(this.div1);
            }           

            if(this.model.productImage[1]!=undefined){
              this.div2 = true;
              this.isImageSaved1 = false;
            }
            if(this.model.productImage[2]!=undefined){
              this.div3 = true;
              this.isImageSaved2 = false;
            }
            if(this.model.productImage[3]!=undefined){
              this.div4 = true;
              this.isImageSaved3 = false;
            }
          }
        }
        this.model.prodcode=this.allproducedittlist[0].prodcode;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });   
		
      }
    );
     
  }
  getImage(imgData) {
    //if (Array.isArray(imgData)){
      return this._sanitizer.bypassSecurityTrustResourceUrl(imgData);
    //}    
  }
  fileChangeEvent(fileInput: any,imageNumber:number) {
    console.log("Edit Product");
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';
            return false;
        }

      
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                 
                    return false;
                } else {
                    this.imgBase64Path = e.target.result;
                   // this.cardImageBase64 = imgBase64Path;
                   if(this.productImage[imageNumber]!=null){
                     console.log("no value...");
                   }
                   if(imageNumber==0){
                      if(this.imageIndex1==false){
                        console.log("First Time");
                        this.productImage.push(this.imgBase64Path);
                        this.isImageSaved0 = true;
                        this.div1 = false;
                        this.imageIndex1=true;
                        console.log("First time Base 64 array value-->"+this.productImage[0]);
                      }
                      else{
                        console.log("else");
                        console.log("Second time Before update Base 64 array value-->"+this.productImage[0]);
                        console.log("Second time Base 64-->"+this.imgBase64Path);
                        this.productImage[0] = this.imgBase64Path;
                        this.isImageSaved0 = true;
                        console.log("Second time Base 64 array value-->"+this.productImage[0]);
                        //this.imageIndex1=true;
                      }
                  }
                  // Second Image
                  if(imageNumber==1){
                    if(this.imageIndex1==false){
                      console.log("First Time");
                      this.productImage.push(this.imgBase64Path);
                      this.isImageSaved1 = true;
                      this.imageIndex1=true;
                      console.log("First time Base 64 array value-->"+this.productImage[1]);
                    }
                    else{
                      console.log("else");
                      console.log("Second time Before update Base 64 array value-->"+this.productImage[1]);
                      console.log("Second time Base 64-->"+this.imgBase64Path);
                      this.productImage[1] = this.imgBase64Path;
                      this.isImageSaved1 = true;
                      console.log("Second time Base 64 array value-->"+this.productImage[1]);
                    }
                }

                // Third Image
                if(imageNumber==2){
                  if(this.imageIndex2==false){
                    console.log("First Time");
                    this.productImage.push(this.imgBase64Path);
                    this.isImageSaved2 = true;
                    this.imageIndex2=true;
                    console.log("First time Base 64 array value-->"+this.productImage[2]);
                  }
                  else{
                    console.log("else");
                    console.log("Third time Before update Base 64 array value-->"+this.productImage[2]);
                    console.log("Third time Base 64-->"+this.imgBase64Path);
                    this.productImage[2] = this.imgBase64Path;
                    this.isImageSaved2 = true;
                    console.log("Third time Base 64 array value-->"+this.productImage[2]);
                  }
              }

              // Fourth Image
              if(imageNumber==3){
                if(this.imageIndex3==false){
                  console.log("First Time");
                  this.productImage.push(this.imgBase64Path);
                  this.isImageSaved3 = true;
                  this.imageIndex3=true;
                  console.log("First time Base 64 array value-->"+this.productImage[1]);
                }
                else{
                  console.log("else");
                  console.log("Fourth time Before update Base 64 array value-->"+this.productImage[3]);
                  console.log("Fourth time Base 64-->"+this.imgBase64Path);
                  this.productImage[3] = this.imgBase64Path;
                  this.isImageSaved3 = true;
                  console.log("Fourth time Base 64 array value-->"+this.productImage[1]);
                }
            }else{
              this.productImage.push(this.model.productImage[0]);
              this.productImage.push(this.model.productImage[1]);
              this.productImage.push(this.model.productImage[2]);
              this.productImage.push(this.model.productImage[3]);
            }
                 
              }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
  } 

  removeImage(i:number) {
    this.productImage[i]=null;
    if(i==0){
      this.isImageSaved0 = false;
    }
    if(i==1){
      this.isImageSaved1 = false;
    }
    if(i==2){
      this.isImageSaved2 = false;
    }
    if(i==3){
      this.isImageSaved3 = false;
    }
  }
  addProductEditClose(){
    this.dialogRef.close();
  }

  marginPrice:any;
  taxPrice:any;
 
  getSellingPrice(price:string,tax:string,margin:string){
    console.log("price-->"+price + "--- Tax --->"+tax+"-- Margin ---->"+margin);
    if(tax == null || tax == undefined){
      if(margin == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else if(margin == null || tax == undefined){
      if(tax == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else{
      this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
      this.taxPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
      this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice)+Number.parseInt(this.taxPrice);
    }
  }
 
  ngOnInit() {
  }
  setItem(){
    console.log("Product Code-->"+this.inputproductcode);
    this.model.productImage = this.productImage;
    this.model.prodcode=this.inputproductcode;
    this.catprodservice.setItem(this.model)
    .subscribe(
      data => {
        this.product =   data;
        this.dialogRef.close();
        setTimeout(() => {
          this.snackBar.open("Product Updated Successfully", "", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });
        console.log("saveproducteditdelete"); 
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });      }
      );
  }

    close() {
      this.dialogRef.close();
    }
}
//allproduct edit end

// productview start
@Component({
  selector: 'productview',
  styleUrls: ['./productview.css'],
  templateUrl: './productview.html', 
})
export class ProductviewComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    public dialogRef: MatDialogRef<ProductviewComponent>,
    ) {
    }
}
// productview end

// productedit start
@Component({
  selector: 'productedit',
  styleUrls: ['./productedit.scss'],
  templateUrl: './productedit.html', 
})
export class ProducteditComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  tempid=null;
  constructor(
    public dialogRef: MatDialogRef<ProducteditComponent>,
    private snackBar: MatSnackBar

  ) {
    }
   
  saveProductEdit(){
    //  this.alertService.success("Saved Successfully");
   //   setTimeout(() => {
     //   this.alertService.clear();
   //   }, 2000);

      setTimeout(() => {
        this.snackBar.open("Saved Successfully", "", {
          panelClass: ["success"],
          verticalPosition: 'top'      
        });
      });

    this.dialogRef.close();
    console.log("saveProductEdit");
    }
    close(e) {
    this.dialogRef.close();
  }
 
}
// productedit end

// categorytable start
@Component({
  selector: 'categorytable',
  styleUrls: ['./categorytable.css'],
  templateUrl: './categorytable.html', 
})
export class CategorytableComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  tempid=null;
  constructor(
    public dialogRef: MatDialogRef<CategorytableComponent>,
  ) {
    }
 
}
// categorytable end







// Main compoent
@Component({
  selector: 'app-categoryitem',
  templateUrl: './categoryitem.component.html',
  styleUrls: ['./categoryitem.component.scss'],
  // providers: [NgbModalConfig, NgbModal]

})
export class CategoryItemComponent implements OnInit {
  allproductlist : any= {};// Product;  
  categorylist: any= {};
  product:Product;
  model: any = {};
  alldiscountlist: any= {};
  allfreegiftlist: any= {};
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  discount:Discount;
  itemtitle:string="All Items";
  loadinggif:boolean = false;
  public productTable = false;
  inputproductcode:string;

  productfilterList: any = {};
  allproduclist: any = {};

  // All Product
  displayedColumns: string[] = [
    'productname',
    'description',
    'vendorcode',
    'sellingprice',
    'price',
    'editdelete'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
 
  // Free Gift Data table
  displayedColumns2: string[] = [
    'productname',
    'discounttime'
    ,'action'
  ];
  dataSource2: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{ static: true }) paginator2: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort2: MatSort;

  //Discount Table
  displayedColumns3: string[] = [
    'Product',
    'discount'
    ,'discounttime',
    'Qty',
    'price',
    'Action'
  ];
  dataSource3: MatTableDataSource<any>;
  //ngAfterViewInit() {
  //  this.dataSource2.paginator = this.paginator2;
   // this.dataSource2.sort = this.sort2;
  //}
  tempid=null;
  tempnumber=null;
  public leftdetails=false;
  public discountdetails='none';
  public editdeletediv=false;
  public fiberdetails='none';
  public alldetails='none';
  public freegiftdetails='none';

  successdialog = 'none';
   // masterlist
   masterlist:  any =[
  {
    number:'01',
    name:'All Product',
  },
  {
    number:'02',
    name:'Discount',
  },
  {
    number:'03',
    name:'Free Gifts',
  },
]; 
  dialogRef: any;
 
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    private snackBar: MatSnackBar,
    private printDialogService: PrintDialogService,
    config: NgbModalConfig, private modalService: NgbModal,
    private _sanitizer: DomSanitizer,

    ) { 

      this.dataSource = new MatTableDataSource(this.allproductlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
    }

   
  //  public NAMES = [];

  ngOnInit() {
    this.productTable = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.leftdetails=true;
    this.allcategorylist();
    this.allproductList();
    //this.alldetails='block';
    this.alldiscountList();
    this.allfreegiftList();

  /*  for (let i = 1; i < 100; i++) {
      let newName = {
         id:i.toString(),
         value1:"Ubalton",
         value2:"+91 88704662431",
         value3:"alex@gmail.com",
         value4:"Tamil Nadu",
         value5:"India",
         value6:"+91 4763212",
         value7:"10000",
         value8:"MCA",
         value9:"Male",
         value10:"Active",
         value11:"Delhi",
      };
      this.NAMES.push(newName);
  } */
  }

  getImage(imgData) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(imgData);
  }

  printPage(data) {
    this.printDialogService.openDialog(data);
  }

  allcategorylist(){
    this.categorylist="";
    //this.catprodservice.load()
    this.catprodservice.loadCategoryName()
    .subscribe(
      data => {
        this.categorylist = data;
        console.log("Category code-->"+this.categorylist[0].categorycode)
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
    );
  }

  allproductList(){
    this.loadinggif=true;
    this.productTable = false;
    this.catprodservice.loadItem("all")
    .subscribe(
      data => {
        this.allproductlist = data;
        this.productfilterList = this.allproductlist;
        this.loadinggif=false;
        this.productTable = true;
        console.log("Product length -->"+this.allproductlist.length);
        this.dataSource = new MatTableDataSource(this.allproductlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.loadinggif=false;
        this.productTable = true;
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
    );
  }

  alldiscountList(){
    let discount="discount";
    this.catprodservice.loadDiscount(discount)
    .subscribe(
      data => {
        this.alldiscountlist = data;
        console.log("discount code -->"+this.alldiscountlist.discountcode);
        this.dataSource3 = new MatTableDataSource(this.alldiscountlist);
        this.dataSource.paginator = this.paginator;
      },
      error => {
          setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
    );
  }

  allfreegiftList(){
    console.log("free gift");
    let discount="freegift";
    this.catprodservice.loadDiscount(discount)
    .subscribe(
      data => {
        this.allfreegiftlist = data;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
    );
  }


  allproductFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  freegiftFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showCategoryItems(categorycode:string,categoryname:string){
    console.log("Category code -->"+categorycode);
    console.log("Category name -->"+categoryname);
    this.itemtitle=categoryname;
    console.log("Inside showCategoryItems");
    this.catprodservice.loadItem(categorycode)
    .subscribe(
      data => {
        this.allproductlist = data;
        console.log("Product length -->"+this.allproductlist.length);
        this.dataSource = new MatTableDataSource(this.allproductlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
    );
    //this.allproductList();
    this.alldetails='block';
    this.discountdetails='none';
    this.freegiftdetails='none';
    this.editdeletediv=false;

  }
categorydetails(number: string){
  console.log("Inside categorydetails");
  if(this.tempid!==null){
    document.getElementById(this.tempid).style.backgroundColor='#272E34';
  }
  this.tempid=number;
  document.getElementById(this.tempid).style.backgroundColor='#5B6065';
  this.leftdetails=true;
// All item tab click
  if(number=='01'){
    console.log("Inside all items");
    this.itemtitle="All Items";
    this.allproductList();
    this.alldetails='block';
    this.discountdetails='none';
    this.freegiftdetails='none';
    this.editdeletediv=false;
  }

  // Discount tab click
  if(number=='02'){
    this.alldiscountList();
    console.log("Inside discount");
    this.alldetails='none';
   this.discountdetails='block';
    this.alldetails='none';
    this.freegiftdetails='none';
    this.editdeletediv =false;
  }

  // Free gift tab click
  if(number=='03'){
    this.allfreegiftList();
    console.log("Inside free gift");
    this.dataSource2 = new MatTableDataSource(this.allfreegiftlist);
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
    this.freegiftdetails='block';
    this.itemtitle="Free Gift";
    this.leftdetails=true;
    this.alldetails='none';
    this.discountdetails='none';
    //this.fiberdetails='block';
    this.editdeletediv=false;
  }
}

productlist(number: string){
  if(this.tempnumber!==null){
    document.getElementById(this.tempnumber).style.backgroundColor='#272E34';
  }
  this.tempnumber=number;
  document.getElementById(this.tempnumber).style.backgroundColor='#5B6065';
  this.leftdetails=true;

  if(number=='PROD1'){
    this.alldetails='none';
  }
  if(number=='PROD2'){
    this.alldetails='none';
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD3'){
    this.alldetails='none';
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD4'){
    this.alldetails='none';
    //this.fiberdetails=false;
    //this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD5'){
    this.alldetails='none';
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
}


  editdelete(){
    this.editdeletediv=true;
   // this.discountdetails=false;
  }
  addNewCategory(){
    //this.successdialog = 'block';
    let categorycode = null;
    const modalRef = this.modalService.open(AddnewcategoryComponent, { windowClass: 'my-class'});

    let data = { categorycode: categorycode }

    modalRef.componentInstance.fromParent = data;
    
    // this.dialogConfig.disableClose = true;
    // this.dialogConfig.autoFocus = true;
    // this.dialogConfig.position = {
    //   'top': '100',
    //    'left': '100',
    //    'right': '0'
    // };
    // this.dialog.open(AddnewcategoryComponent,{
    //   //height:'55vh',
    //   width:'90vh',
    //   //height:'40vh',
    //   panelClass: 'addnewcategory',
    //   disableClose: true,
    //   //hasBackdrop: true
    //  // data: {dialogTitle: "hello", dialogText: "text"},
    // })
    // .afterClosed().subscribe(result => {
    //   this.allcategorylist();
    // }
    // );
  }

  addpromotion(title:string,show:string){
    const modalRef = this.modalService.open(AddpromotionComponent, { windowClass: 'promotion-class'});
  
    let data = {title: title, key: show}

    modalRef.componentInstance.fromParent = data;

    /* this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AddpromotionComponent,{
      panelClass: 'addpromotion',
      width:'120vh',
      //height:'70vh',
      data: {title: title, key: show},
      disableClose: true,
     // hasBackdrop: true
    })
    .afterClosed().subscribe(result => {
      this.alldiscountList();
    }); */      
  }

  
  categoryEditDelete(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(CategoryeditdeleteComponent,{
      width:'90vh',
      data: this.categorylist,
      panelClass: 'categoryeditdelete'

    })
    .afterClosed().subscribe(result => {
      this.allcategorylist();
    });
  }

  discountEdit(discountcode:string){
    console.log("discount code --> "+discountcode);
    console.log("inside discountEdit ");
    //this.successdialog = 'block';
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(DiscounteditComponent,{
      width:'120vh',
      height:'70vh',
      panelClass: 'discountedit',
      data: discountcode,
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  discountDelete(discountcode: string){
    console.log("discount detlete - promotion code -->"+discountcode);
    this.catprodservice.discountremove(discountcode)
      .subscribe(
        data => {
          this.discount =  data;  
          if(this.discount.status == "Success"){
            setTimeout(() => {
              this.snackBar.open("Discount Deleted Successfully", "", {
                panelClass: ["error"],
                verticalPosition: 'top'      
              });
            });      
        }else if(this.discount.status == "failure"){
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });
         
        }
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });      }
    );
  }

  prodheaderlabel:any;
  prodbtnlabel:any;
  addNewProduct(){
    this.prodheaderlabel = "Add New Product";
    this.prodbtnlabel = "Add";
    let data = { prodheaderlabel: this.prodheaderlabel, prodbtnlabel: this.prodbtnlabel }

    const modalRef = this.modalService.open(AddnewproductComponent, { windowClass: 'addproduct-class'});
    modalRef.componentInstance.fromParent = data;
    
    modalRef.result.then((result) => {
      //this.allproductList();
    }, (reason) => {
      this.allproductList();
    }); 
    // this.modalService.open(addnewproduct);

    /*this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {


//      'top': '100',
  //    left: '100'
    };
    this.dialog.open(AddnewproductComponent,{ 
      height:'95%',
    //  width:'150vh',
      panelClass: 'addnewproduct',
      disableClose: true,
     // hasBackdrop: true
    })
    .afterClosed().subscribe(result => {
      this.allproductList();
    }); 
  }

  productview(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(ProductviewComponent,{ 
      width:'120vh',
      height:'70vh',
      panelClass: 'productview'
    })
    .afterClosed().subscribe(result => {
    }); */
  }

  productEdit(){
    this.prodheaderlabel = "Edit Product";
    this.prodbtnlabel = "Update";
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(ProducteditComponent,{ 
      width:'120vh',
      height:'70vh',
      panelClass: 'productedit'
    })
    .afterClosed().subscribe(result => {
      this.allproductList();
    }); 
  }

  itemeditcall(prodcode: string,vendorcode:string){  
    console.log("itemeditcall");

    this.inputproductcode = prodcode;
    this.model.vendorcode = vendorcode;

    this.prodheaderlabel = "Edit Product";
    this.prodbtnlabel = "Update";
    let data = { prodheaderlabel: this.prodheaderlabel, prodbtnlabel: this.prodbtnlabel,
      prodcode: prodcode, vendorcode: vendorcode }
    
    const modalRef = this.modalService.open(AddnewproductComponent, { windowClass: 'addproduct-class'});
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      //this.allproductList();
    }, (reason) => {
      this.allproductList();
    }); 

    /* this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AllproducteditComponent,{
      panelClass: 'allproductedit',
      data: {prodcode:prodcode,vendorcode:vendorcode}
      
    })
    .afterClosed().subscribe(result => {
      this.allproductList();

    });*/

  }

  allproductdelete(prodcode: string){
    console.log("detete product");
    this.catprodservice.productremove(prodcode)
      .subscribe(
        data => {
          this.product =  data;  
          //if(this.product.status == "Success"){
            setTimeout(() => {
              this.snackBar.open("Product Deleted Successfully", "", {
                panelClass: ["error"],
                verticalPosition: 'top'      
              });
            });
            this.allproductList();
          /*}else if(this.product.status == "failure"){
            setTimeout(() => {
              this.snackBar.open("Network error: server is temporarily unavailable", "", {
                panelClass: ["error"],
                verticalPosition: 'top'      
              });
          }); 
        }*/ 

      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });      
      }
    ); 
  }

  onSearchChange(searchValue: string): void {  
    this.allproductlist = this.productfilterList.filter(product =>
    product.productname.toLowerCase().indexOf(searchValue.toLowerCase()) !==-1)
  }

  slideshow(item:any){    
    this.catprodservice.loadEditItem(item.vendorcode)
    .subscribe(
      data => {
        this.allproduclist = data;
        for(let k=0;k<this.allproduclist.length;k++){
          if(this.allproduclist[k].prodcode==item.prodcode){
            this.model.productImage=this.allproduclist[k].productImage;

            let data = { productImage: this.model.productImage,productname: item.productname,productcode: item.prodcode,
              categoryname: item.categoryname,price: item.price,unit: item.unit,tax: item.tax,margin: item.margin,
              sellingprice: item.sellingprice,description: item.description,createdDate: item.createdDate }
            
            const modalRef = this.modalService.open(ProductSlideComponent, { windowClass: 'productsilde-class'});
            modalRef.componentInstance.fromParent = data;
            
          }
        }
      },
      error => {	}
    );
    
  }

}
