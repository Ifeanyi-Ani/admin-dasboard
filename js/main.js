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
let productSamp =$("#productSample");
let imgPreview=$("#imgPreview");
let productSampleError =$("#productSampleError");

let productsView=$("#productsView");
let addProduct=$("#addProBtn");

let userCard=$("#userCard");

let dasboardProductView=$(".quickView");
let dasboardUserView=$(".dashboardUserView");


let productDetails=[];
let prodcutCatData=["Originals", "Fall Favorite","Bestsellers","cleansers & Moistures"]
let editedIndex;


let userDetails=[];
let userDetailsDashboard=[];
let productDetailsDashboard=[];
dashboardProduct();
dashboardUser();
displayProduct();
displayUser();

productSamp.on("change", showImg)
function showImg(){
  imgPreview.attr("src", productSamp.val())
}
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
  categoryPopulate();
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
  if(productCategory.val()==""){
    productCategoryError.html("<i>please enter the product name</i>");
    productCategory.css("outline","3px solid red");
  }else{
    productCategoryError.html("");
    productCategory.css("outline","none");
  }
  if(productPrice.val()==""){
    productPriceError.html("<i>please enter the product name</i>");
    productPrice.css("outline","3px solid red");
  }else{
    productPriceError.html("");
    productPrice.css("outline","none");
  }
  if(productQuantity.val()==""){
    productQuantityError.html("<i>please enter the product name</i>");
    productQuantity.css("outline","3px solid red");
  }else{
    productQuantityError.html("");
    productQuantity.css("outline","none");
  }
  if(productDiscription.val()==""){
    productDiscriptionError.html("<i>please enter the product name</i>");
    productDiscription.css("outline","3px solid red");
  }else{
    productDiscriptionError.html("");
    productDiscription.css("outline","none");
  }
  if(productSamp.val()==""){
    productSampleError.html("<i>please enter the product name</i>");
    productSamp.css("outline","3px solid red");
  }else{
    productSampleError.html("");
    productSamp.css("outline","none");
  }

if(productName.val()!=""&&productCategory.val()!="" && productPrice.val()!=""&&productQuantity.val()!=""&&productDiscription.val()!=""&&productSamp.val()!=""){
  if(editedIndex !=null){
    updateProduct();
  }else{
    createProduct();
  }
}

}
function createProduct(){
let productObj={
  "image": productSamp.val(),
  "name": productName.val(),
  "category": productCategory.val(),
  "price": productPrice.val(),
  "quantity": productQuantity.val(),
  "description": productDiscription.val(),
};
$.ajax({
  type:"post",
  url:"http://159.65.21.42:9000/create/product",
  data:productObj,
  success:function(response){
    if(response["error"]){
      alert(response["error"])
    }else{
      alert(`${response["name"]} product added`)
    }

  },
  error:function(error){
    console.log(error);
    alert(error.statusText)
  }
})
displayProduct();
addProductContainer.hide();
}

function displayProduct(){
  productsView.html(" <h2>Loading data ..........</h2>")
  $.ajax({
    type:"get",
    url:"http://159.65.21.42:9000/products",
    success:function(response){
      console.log(response)
      productDetails=response
      productDetails=productDetails.reverse()
      let productView="";
      for(let i=0;i<productDetails.length;i++){
        if(productDetails[i]["category"]=="Bestsellers" ||productDetails[i]["category"]=="Fall Favorite"||productDetails[i]["category"]=="Originals"||productDetails[i]["category"]=="cleansers & Moistures" ){
        productView+=` <tr>
    <td>${i+1}</td>
    <td>${productDetails[i]["name"]}</td>
    <td class="mobi-disabled">${productDetails[i]["description"]}</td>
    <td class="mobi2-disabled">
        <div class="img-con"><img src="${productDetails[i]["image"]}" alt="" id="imgDis"></div>
    </td>  
    <td>$${productDetails[i]["price"]}</td>
    <td>${productDetails[i]["category"]}</td>
    <td class="mobi-disabled">${productDetails[i]["quantity"]}</td>
    <td><a href="#" class="edit-btn" index="${i}"><ion-icon name="pencil-outline"></ion-icon></a></td>
    <td><a href="#" class="delete-btn" index="${i}"><ion-icon name="trash-outline"></ion-icon></a></td>
    </tr>`
    $(".productItems").text(`${productDetails.length}`)
        }
      }
      productsView.html(productView);
    },
    error:function(error){
      alert(error.statusText)
    }
  })
}
function deleteProduct(){
  let i=$(this).attr("index");
  $.ajax({
    type:"delete",
    url:"http://159.65.21.42:9000/product/"+productDetails[i]["_id"],
    success:function(response){
      
  
      if(response["success"]){
        alert(`${response["success"]}`)
        //window.location.href=""
        displayProduct();
      }
    },
    error:function(error){
      console.log(error);
      alert(error.statusText)
    }
  })
}
function editProduct(){
  editedIndex=$(this).attr("index");
  addProductContainer.show();
  addProduct.text("UPDATE");
  categoryPopulate();

productSamp.val(productDetails[editedIndex]["image"]);
productName.val(productDetails[editedIndex]["name"]);
productCategory.val(productDetails[editedIndex]["category"]);
productPrice.val(productDetails[editedIndex]["price"])
productQuantity.val(productDetails[editedIndex]["quantity"]);
productDiscription.val(productDetails[editedIndex]["description"]);

}
function updateProduct(){
 let reviewProduct={
    "image": productSamp.val(),
    "product_id":productDetails[editedIndex]["_id"],
    "name": productName.val(),
    "category": productCategory.val(),
    "price": productPrice.val(),
    "quantity": productQuantity.val(),
    "description": productDiscription.val(),
  };
  $.ajax({
    type:"put",
    url:"http://159.65.21.42:9000/update/product",
    data:reviewProduct,
    success:function(response){
      
  
      if(response["error"]){
        alert(response["error"])
      }else{
        alert(`${response["name"]} successfully updated`)
        displayProduct();
       addProductContainer.hide();
      addProduct.text("ADD PRODUCT")
      editedIndex=null;
      }
  
    },
    error:function(error){
      console.log(error);
      alert(error.statusText)
    }
  })
  
}

// for managing user
let formUser=$("#formUser")
let nameNerror = $("#nameNerror");
let nameN = $("#nameN");
let phoneNerror = $("#phoneNerror");
let phoneN = $("#phoneN");
let EmailNerror = $("#EmailNerror");
let EmailN = $("#EmailN");
let passwordNerror = $("#passwordNerror");
let passwordN = $("#passwordN");
let confirmNerror = $("#confirmNerror");
let confirmN = $("#confirmN");
let updatUser = $("#updatUser");
let idex;

formUser.hide();
$("#editUser").on("click",()=>formUser.show());
$("#exit").on("click",()=>formUser.hide())


function validateUpdateInfo(){
  if (nameN.val()==""){
    nameNerror.html("field is required")
    nameN.css("outline","3px solid red");
  }else{
    nameNerror.html("");
    nameN.css("outline","none");
  }
  if (phoneN.val()==""){
    phoneNerror.html("field is required")
    phoneN.css("outline","3px solid red");
  }else{
    phoneNerror.html("");
    phoneN.css("outline","none");
  }
  if (EmailN.val()==""){
    EmailNerror.html("field is required")
    EmailN.css("outline","3px solid red");
  }else{
    EmailNerror.html("");
    EmailN.css("outline","none");
  }
  if (passwordN.val()==""){
    passwordNerror.html("field is required")
    passwordN.css("outline","3px solid red");
  }else{
    passwordNerror.html("");
    passwordN.css("outline","none");
  }
  if (confirmN.val()!=passwordN.val()){
    confirmNerror.html("password does not match")
    confirmN.css("outline","3px solid red");
  }else{
    confirmNerror.html("");
    confirmN.css("outline","none");
  }
  if(nameN.val()!=""&&
    phoneN.val()!=""&&
    EmailN.val()!=""&&
    passwordN.val()!=""&&
    confirmN.val()===passwordN.val()){
      if (idex != null){
        loadUpdateUser();
      }
    }
}
function displayUser(){

  userCard.html(" <h2>Loading data ..........</h2>")
  $.ajax({
    type:"get",
    url:"http://159.65.21.42:9000/users",
    success:function(response){
      userDetails=response
      userDetails=userDetails.reverse()
      $(".userNo").text(`${userDetails.length}`)
      let userView="";
      for(let i=0;i<userDetails.length;i++){
        userView+=` <div class="user-card">
        <div class="img-container">
            <img src="images/profile.jpg" alt="">
        </div>
    
        <div class="details">
            <div class="name">${userDetails[i]["name"]}</div>
            <div class="email">${userDetails[i]["email"]}</div>
            <div class="phone">${userDetails[i]["phone"]}</div>
            <div class="address">No 34 adewakeli street Onisha</div>
            <div class="btnOp"><button type="button" id="editUser" class="editUser" index="${i}">EDIT</button><button type="button" class="deleteUser" index="${i}">REMOVE</button></div>
        </div>
    </div>`
    }
    userCard.html(userView);
    },
    error:function(error){
      alert(error.statusText)
    }
  })
  }
  function removeUser(){
    let i=$(this).attr("index");
    $.ajax({
      type:"delete",
      url:"http://159.65.21.42:9000/user/"+userDetails[i]["_id"],
      success:function(response){
        
    
        if(response["success"]){
          alert(`${response["success"]}`)
          displayUser();
        }
      },
      error:function(error){
        alert(error.statusText)
      }
    })

  }
  function changeInfo(){
    idex=$(this).attr("index");
    formUser.show();

    nameN.val(userDetails[idex]["name"]);
    EmailN.val(userDetails[idex]["email"]);
    phoneN.val(userDetails[idex]["phone"]);
    passwordN.val(userDetails[idex]["password"]);
  }
  function loadUpdateUser(){
    let reviewUser={
      "name": nameN.val(),
      "email": EmailN.val(),
      "phone": phoneN.val(),
      "password": passwordN.val(),
    };
    $.ajax({
      type:"put",
      url:"http://159.65.21.42:9000/user/"+userDetails[idex]["_id"],
      data:reviewUser,
      success:function(response){
        
    
        if(response["error"]){
          alert(response["error"])
        }else{
          alert(`${response["name"]} successfully updated`)
          displayProduct();
         formUser.hide();
        idex=null;
        }
  },
      error:function(error){
      console.log(error);
      alert(error.statusText)
  }
})

}
  updatUser.on("click", validateUpdateInfo)
  userCard.on("click",".deleteUser", removeUser)
  userCard.on("click",".editUser", changeInfo)
  

  // dash board view
 
  
  function dashboardProduct(){
    dasboardProductView.html(" <h2>Loading data ..........</h2>")
    $.ajax({
      type:"get",
      url:"http://159.65.21.42:9000/products",
      success:function(response){
        productDetailsDashboard=response
        productDetailsDashboard=productDetailsDashboard.reverse()
        let quickView="";
        for (let i=0; i<productDetailsDashboard.length; i++){
          if(productDetailsDashboard[i]["category"]=="Bestsellers" ||productDetailsDashboard[i]["category"]=="Fall Favorite"||productDetailsDashboard[i]["category"]=="Originals"||productDetailsDashboard[i]["category"]=="cleansers & Moistures" ){
            $(".productItems").text(`${productDetailsDashboard.length}`)
          quickView+=`<tr>
          <td>${productDetailsDashboard[i]["name"]}</td>
          <td>$${productDetailsDashboard[i]["price"]}</td>
          <td>${productDetailsDashboard[i]["category"]}</td>
          <td>${productDetailsDashboard[i]["quantity"]}</td>
      </tr>`
          }
        };
      dasboardProductView.html(quickView);
      },
      error:function(error){
        alert(error.statusText)
      }
    })
  }
  function dashboardUser(){
    
    dasboardUserView.html(" <h2>Loading data ..........</h2>")
    $.ajax({
      type:"get",
      url:"http://159.65.21.42:9000/users",
      success:function(response){
        userDetails=response
        userDetails=userDetails.reverse()
        $(".userNo").text(`${userDetails.length}`)
        let userView="";
        for(let i=0;i<userDetails.length;i++){
          userView+=` <tr>
          <td width="60px">
              <div class="imgBx"><img src="images/profile.jpg" alt=""></div>
          </td>
          <td>
              <h4>${userDetails[i]["name"]}<br> <span>${userDetails[i]["email"]}</span></h4>
          </td>
      </tr>
           <div class="user-card">
          <div class="img-container">
              <img src="images/profile.jpg" alt="">
          </div>`
      }
      dasboardUserView.html(userView);
      },
      error:function(error){
        alert(error.statusText)
      }
    })
  }

