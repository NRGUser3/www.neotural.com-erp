import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogConfig, MatDialog } from "@angular/material";
import { AddUserMgtComponent } from '../addusermgt/addusermgt.component';
import { UserManagementService } from "../../services/usermanagement.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-usermgt",
  templateUrl: "./usermgt.component.html",
  styleUrls: ["./usermgt.component.scss"],
  // providers: [NgbModalConfig, NgbModal]
})
export class UserManagementComponent implements OnInit {
  activeTab: number = 0;
  dialogConfig = new MatDialogConfig();

  userList: any = [];
  model: any = {};
  menuList: any = {};
  submenuList:any = {};
  enable: boolean;
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private userMgtService: UserManagementService,
    config: NgbModalConfig, private modalService: NgbModal,
    private SpinnerService: NgxSpinnerService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit() {
    this.userList = '';
    this.SpinnerService.show();  
    this.getMenuName1("MEN10000");
    this.getMenuName2("MEN10001");
    this.getMenuName3("MEN10002");
    this.getMenuName4("MEN10003");
    this.getMenuName5("MEN10004");
    this.getMenuName6("MEN10005");
    this.getMenuName7("MEN10006");
    this.getMenuName8("MEN10007");
    this.getPurchaseSubMenuName1("SUBMEN10001");
    this.getPurchaseSubMenuName2("SUBMEN10002");
    this.getPurchaseSubMenuName3("SUBMEN10003");
    this.getProductSubMenuName1("SUBMEN10004");
    this.getProductSubMenuName2("SUBMEN10005");
    this.getProductSubMenuName3("SUBMEN10006");
    this.getSalesSubMenuName1("SUBMEN10007");
    this.getSalesSubMenuName2("SUBMEN10008");
    this.getSalesSubMenuName3("SUBMEN10009");
    this.getSalesSubMenuName4("SUBMEN10010");
    this.getSalesSubMenuName5("SUBMEN10011");
    this.enable = false;
    this.load();
  }
  menulable:string = "Show Menu";
  showMenu(){
    if(this.menulable == "Show Menu") {
      this.menulable = "Hide Menu";
    } else {
      this.menulable = "Show Menu";

    }
  }
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { windowClass: 'modal-class'});
  }
  load(){
    this.userMgtService.load().subscribe(
      data => { 
        this.userList = data;
        this.SpinnerService.hide();
        if(this.userList.length > 0){
          this.enable = true;
        }else {
          this.enable = false;
        }
      },
      error => {
        this.SpinnerService.hide();
      }
    );
  }

  addUserMgt(){
    const modalRef = this.modalService.open(AddUserMgtComponent, { windowClass: 'modal-class'});
    modalRef.result.then((result) => {
      //this.ngOnInit();
    }, (reason) => {
      this.ngOnInit(); 
    }); 
  }

  getMenuName1(menu1){
    this.userMgtService.getMenu(menu1)
    .subscribe(
      data => {
        this.menuList = data;
        this.model.menu1 = this.menuList[0].menuname;
      });
  }

  getMenuName2(menu2){
    this.userMgtService.getMenu(menu2)
    .subscribe(
      data => {
        this.menuList = data;
        this.model.menu2 = this.menuList[0].menuname;
      });
  }

  getMenuName3(menu3){
    this.userMgtService.getMenu(menu3)
    .subscribe(
      data => {
        this.menuList = data;
        this.model.menu3 = this.menuList[0].menuname;
      });
  }

  getMenuName7(menu7){
    this.userMgtService.getMenu(menu7)
    .subscribe(
      data => {
        this.menuList = data;
        this.model.menu7 = this.menuList[0].menuname;
      });
  }

  getMenuName8(menu8){
    this.userMgtService.getMenu(menu8)
    .subscribe(
      data => {
        this.menuList = data;
        this.model.menu8 = this.menuList[0].menuname;
      });
  }

  getMenuName4(menu4){
    this.userMgtService.getMenu(menu4)
    .subscribe(
      data => {
        this.menuList = data;
        this.model.menu4 = this.menuList[0].menuname;
      });
  }

  getMenuName5(menu5){
    this.userMgtService.getMenu(menu5)
    .subscribe(
      data => {
        this.menuList = data;
        this.model.menu5 = this.menuList[0].menuname;
      });
  }

  getMenuName6(menu6){
    this.userMgtService.getMenu(menu6)
    .subscribe(
      data => {
        this.menuList = data;
        this.model.menu6 = this.menuList[0].menuname;
      });
  }

  getPurchaseSubMenuName1(purchasesubmenu1){
    this.userMgtService.getSubMenu(purchasesubmenu1)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.purchasesubmenu1 = this.submenuList[0].submenuname;
      });
  }

  getPurchaseSubMenuName2(purchasesubmenu2){
    this.userMgtService.getSubMenu(purchasesubmenu2)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.purchasesubmenu2 = this.submenuList[0].submenuname;
      });
  }

  getPurchaseSubMenuName3(purchasesubmenu3){
    this.userMgtService.getSubMenu(purchasesubmenu3)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.purchasesubmenu3 = this.submenuList[0].submenuname;
      });
  }

  getProductSubMenuName1(productsubmenu1){
    this.userMgtService.getSubMenu(productsubmenu1)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.productsubmenu1 = this.submenuList[0].submenuname;
      });
  }

  getProductSubMenuName2(productsubmenu2){
    this.userMgtService.getSubMenu(productsubmenu2)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.productsubmenu2 = this.submenuList[0].submenuname;
      });
  }

  getProductSubMenuName3(productsubmenu3){
    this.userMgtService.getSubMenu(productsubmenu3)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.productsubmenu3 = this.submenuList[0].submenuname;
      });
  }

  getSalesSubMenuName1(salessubmenu1){
    this.userMgtService.getSubMenu(salessubmenu1)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.salessubmenu1 = this.submenuList[0].submenuname;
      });
  }

  getSalesSubMenuName2(salessubmenu2){
    this.userMgtService.getSubMenu(salessubmenu2)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.salessubmenu2 = this.submenuList[0].submenuname;
      });
  }

  getSalesSubMenuName3(salessubmenu3){
    this.userMgtService.getSubMenu(salessubmenu3)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.salessubmenu3 = this.submenuList[0].submenuname;
      });
  }

  getSalesSubMenuName4(salessubmenu4){
    this.userMgtService.getSubMenu(salessubmenu4)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.salessubmenu4 = this.submenuList[0].submenuname;
      });
  }

  getSalesSubMenuName5(salessubmenu5){
    this.userMgtService.getSubMenu(salessubmenu5)
    .subscribe(
      data => {
        this.submenuList = data;
        this.model.salessubmenu5 = this.submenuList[0].submenuname;
      });
  }

  removeuser(id:string){
    this.userMgtService.remove(id)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("User Deleted Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.load();
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
