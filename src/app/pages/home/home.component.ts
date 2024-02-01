import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productList:any[]=[]
  newProductList:any[]=[]
  filterCategory:any[]=[]
  

  // categoryList:any[]=[]
  cartObj : any = {
    "CartId": 0,
    "CustId": 1,
    "ProductId": 0,
    "Quantity": 0,
    "AddedDate": "2023-04-27T07:12:40.926Z"
  };

  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
    debugger;
    this.loadAllProducts();
    for (let index = 0; index < this.productList.length; index++) {
      const element = this.productList[index];
      if (element.productPrice >1000 && element.productId !==11) {
        this.newProductList.push(element)
      }
      
    }

    this.filterCategory=this.newProductList

    this.newProductList.forEach(element => {
      if (element.categoryName==="iphone 15") {
        element.categoryName="Mobile"
      }
    });
    
 
    
   
  }

  

  loadAllProducts() {
    debugger;
    this.productService.getAllProducts().subscribe((result: any)=>{
      this.productList = result.data;
    })
}
 addItemToCart(productId: number) {
    debugger;
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe((result: any)=>{
        if(result.result) {
        alert("Product Added To Cart");
        this.productService.cartAddedSubject.next(true);
      }
   })
}

filter(category:string){
  this.filterCategory=this.newProductList.filter((item:any)=>{
    if (item.categoryName===category|| category=='') {
      return item
    } 
  })
  if (category=="a") {
    this.filterCategory=this.newProductList
  }
}

}