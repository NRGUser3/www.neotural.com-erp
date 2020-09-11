import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 

// Components
import { 
  CategoryItemComponent, 
  AddpromotionComponent, 
  DiscounteditComponent, 
  DiscountdeleteComponent, 
  CategoryeditdeleteComponent, 
  AddnewcategoryComponent, 
  AddnewproductComponent ,
  ProductviewComponent, 
  ProducteditComponent, 
  AllproducteditComponent, 
  CategorytableComponent} from './categoryitem/categoryitem.component';
import { UnitsComponent } from './units/units.component';
import { AddunitsComponent } from './addunits/addunits.component';
import { CategoryComponent } from './category/category.component';
import { PromotionListComponent } from '././promotionlist/promotionlist.component';
import { ProductSlideComponent } from './productslide/productslide.component';

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
     component: CategoryItemComponent,
  },

  {
    path: 'units',
    component: UnitsComponent,
    pathMatch: 'full'
  },
  {
    path: 'addunits',
    component: AddunitsComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'promotionlist',
    component: PromotionListComponent,
  },
  {
    path: 'productslide',
    component: ProductSlideComponent,
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryProductRoutingModule {}
