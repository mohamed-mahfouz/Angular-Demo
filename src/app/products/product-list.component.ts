import { Component, OnDestroy, OnInit } from "@angular/core";
import { observable, Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy{
  
    private _listFilter:string = '';
    pageTitle:string = "Product List";
    imageWidth:number = 50;
    imageMargin:number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    products: IProduct[] = [];
    sub!: Subscription;
    
    constructor(private productService: ProductService) {}
    
    get listFilter():string{
      return this._listFilter;
    }
    
    set listFilter(value:string){
      this._listFilter = value;
      this.filteredProducts =  this.performFilter(value);
    }
    
    performFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      
      
      return this.products.filter
      (
        (product: IProduct)=> product.productName.toLocaleLowerCase().includes(this._listFilter)
        );
      }
      
      filteredProducts: IProduct[] = [];
      
      
      toggleImage():void{
        this.showImage = !this.showImage;
      }
      
      clickEvent(value: string){
        this.pageTitle = 'product list: '+ value;
      }
      
      ngOnInit(): void 
      {
          this.sub =  this.productService.getProducts().subscribe({
          next: products =>
          {
            this.products = products;
            this.filteredProducts = this.products;
            
          },
          error: err => this.errorMessage = err
        });
        
      }
      ngOnDestroy(): void {
        this.sub.unsubscribe();
      }

}