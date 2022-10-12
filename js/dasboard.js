let dasboardProductView=$("#quickView");
productDetails=[];
dashboardProduct();


function dashboardProduct(){
    let dashboardProductStorage=localStorage.getItem("product");
    if(dashboardProductStorage!=null){
        productDetails=JSON.parse(dashboardProductStorage);
    }

      let quickView="";
  for (let i=0; i<productDetails.length; i++){
    quickView+=`<tr>
    <td>${productDetails[i]["name"]}</td>
    <td>$${productDetails[i]["price"]}</td>
    <td>${productDetails[i]["category"]}</td>
    <td>${productDetails[i]["quantity"]}</td>
</tr>`
  };
dasboardProductView.html(quickView);
}