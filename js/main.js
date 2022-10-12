let lists = document.querySelectorAll(".side-nav li");
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".side-nav");
let main = document.querySelector(".main");

let addProductContainer=$(".get-product-data");
let productName =$("#productName");
let productNameError =$("#productNameError");
let productCategory =$("#productCategory");
let productCategoryError =$("#productCategoryError");
let productPrice =$("#productPrice");
let productPriceError =$("#productPriceError");
let productQuantity =$("#productQuantity");
let productQuantityError =$("#productQuantityError");
let productDiscription =$("#productDiscription");
let productDiscriptionError =$("#productDiscriptionError");
let productSample =$("#productSample");
let imgPreview=$("#imgPreview");
let productSampleError =$("#productSampleError");

let productsView=$("#productsView");
let addProduct=$("#addProBtn");



let productDetails=[];
let prodcutCatData=["choose category", "Originals", "Fall Favorite","Bestsellers","cleansers & Moistures"]
let editIndex;
displayProduct();

$(document).ready(()=>{
  productSample.change(function(evt){
   let img=URL.createObjectURL(evt.target.files[0]);
   imgPreview.attr("src",img)
    // const file=this.files[0];
    // console.log(file);
    // if(file){
    //   let reader= new FileReader();
    //   reader.onload=function (event){
    //     console.log(event.target.result);
    //     imgPreview.attr("src",event.target.result);
    //   }
    //   reader.readAsDataURL(file);
    // }
    localStorage.setItem("product", JSON.stringify(productDetails));
  })
  displayProduct();
})

// siden nav
function activeLink() {
  lists.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");

}
lists.forEach((item) => item.addEventListener("mouseover", activeLink));


toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};


// populating product category drop down
window.onload=categoryPopulate();
function categoryPopulate(){
  let prdCategory=document.getElementById("productCategory")
  prdCategory.innerHTML="";
  prodcutCatData.forEach(items=>{
    opt=document.createElement("option");
    opt.textContent=items;
    productCategory.append(opt);
  })
}


// managining product
addProductContainer.hide();
$("#newProduct").on("click",()=>{
  addProductContainer.show();
})
$("#close").on("click",()=>{
  addProductContainer.hide();
})

addProduct.on("click", validateProductForm);
productsView.on("click",".delete-btn", deleteProduct);
productsView.on("click",".edit-btn", editProduct);

function validateProductForm(){
  if(productName.val()==""&&!isNaN(productName.val())){
    productNameError.html("<i>please enter the product name</i>");
    productName.css("outline","3px solid red");
  }else{
    productNameError.html("");
    productName.css("outline","none");
  }
  if(productCategory.val()==""&&!isNaN(productCategory.val())){
    productCategoryError.html("<i>please enter the product name</i>");
    productCategory.css("outline","3px solid red");
  }else{
    productCategoryError.html("");
    productCategory.css("outline","none");
  }
  if(productPrice.val()==""&&!isNaN(productPrice.val())){
    productPriceError.html("<i>please enter the product name</i>");
    productPrice.css("outline","3px solid red");
  }else{
    productPriceError.html("");
    productPrice.css("outline","none");
  }
  if(productQuantity.val()==""&&!isNaN(productQuantity.val())){
    productQuantityError.html("<i>please enter the product name</i>");
    productQuantity.css("outline","3px solid red");
  }else{
    productQuantityError.html("");
    productQuantity.css("outline","none");
  }
  if(productDiscription.val()==""&&!isNaN(productDiscription.val())){
    productDiscriptionError.html("<i>please enter the product name</i>");
    productDiscription.css("outline","3px solid red");
  }else{
    productDiscriptionError.html("");
    productDiscription.css("outline","none");
  }
  if(productSample.val()==""&&!isNaN(productSample.val())){
    productSampleError.html("<i>please enter the product name</i>");
    productSample.css("outline","3px solid red");
  }else{
    productSampleError.html("");
    productSample.css("outline","none");
  }

if(productName.val()!=""&&productCategory.val()!="" && productPrice.val()!=""&&productQuantity.val()!=""&&productDiscription.val()!=""&&productSample.val()!=""){
  if(editIndex !=null){
    updateProduct();
  }else{
    createProduct();
  }
}

}
function createProduct(){
productObj={
  "image": imgPreview.attr("src"),
  "name": productName.val(),
  "category": productCategory.val(),
  "price": productPrice.val(),
  "quantity": productQuantity.val(),
  "description": productDiscription.val(),
};
productDetails.push(productObj);
localStorage.setItem("product", JSON.stringify(productDetails));

displayProduct();
addProductContainer.hide();
}
function displayProduct(){
  let productStorage=localStorage.getItem("product");
  if(productStorage !=null){
    productDetails=JSON.parse(productStorage);
  }
  let productView="";
  for(let i=0;i<productDetails.length;i++){
    productView+=` <tr>
<td>${i+1}</td>
<td>${productDetails[i]["name"]}</td>
<td class="mobi-disabled">${productDetails[i]["description"]}</td>
<td class="mobi2-disabled">
    <div class="img-con"><img src=${productDetails[i]["image"]} alt="" id="imgDis"></div>
</td>  
<td>$${productDetails[i]["price"]}</td>
<td>${productDetails[i]["category"]}</td>
<td class="mobi-disabled">${productDetails[i]["quantity"]}</td>
<td><a href="#" class="edit-btn" index="${i}"><ion-icon name="pencil-outline"></ion-icon></a></td>
<td><a href="#" class="delete-btn" index="${i}"><ion-icon name="trash-outline"></ion-icon></a></td>
</tr>`

  }
  productsView.html(productView);

}
function deleteProduct(){
  let i=$(this).attr("index");
  productDetails.splice(i,1);
  localStorage.setItem("product",JSON.stringify(productDetails));
  displayProduct();
}
function editProduct(){
  editIndex=$(this).attr("index");
  addProductContainer.show();
  addProduct.text("UPDATE");


productSample.val(productDetails[editIndex]["image"]);
productName.val(productDetails[editIndex]["name"]);
productCategory.val(productDetails[editIndex]["category"]);
productPrice.val(productDetails[editIndex]["price"])
productQuantity.val(productDetails[editIndex]["quantity"]);
productDiscription.val(productDetails[editIndex]["description"]);

addProductContainer.hide();

}
function updateProduct(){
  editedProduct={
    "image": imgPreview.attr("src"),
    "name": productName.val(),
    "category": productCategory.val(),
    "price": productPrice.val(),
    "quantity": productQuantity.val(),
    "description": productDiscription.val(),
  };
  productDetails[editIndex]=(editedProduct);
  localStorage.setItem("product",JSON.stringify(productDetails));
  displayProduct();
  addProductContainer.hide();
addProduct.text("ADD PRODUCT")
  editIndex=null;
  
}

