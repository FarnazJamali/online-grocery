const products = [{
        productName: "Peach",
        productPrice: 100,
        productId: 1001,
        productPic: "1.jpg",
    },
    {
        productName: "Mango",
        productPrice: 40,
        productId: 1002,
        productPic: "2.jpg",
    },
    {
        productName: "Strawberry",
        productPrice: 50,
        productId: 1003,
        productPic: "3.jpg",
    },
    {
        productName: "Melon",
        productPrice: 30,
        productId: 1004,
        productPic: "4.jpg",
    },
    {
        productName: "Water melon",
        productPrice: 30,
        productId: 1005,
        productPic: "5.jpg",
    },
    {
        productName: "Lettuce",
        productPrice: 10,
        productId: 1006,
        productPic: "6.jpg",
    },
    {
        productName: "Tomato",
        productPrice: 20,
        productId: 1007,
        productPic: "7.jpg",
    },
    {
        productName: "Garlic",
        productPrice: 15,
        productId: 1008,
        productPic: "8.jpg",
    }
];


function fillProductsGrid() {
    let rows = products.map(function (product, productIndex) {

        return `<div class="col text-center">
                    <div class="card">
                        <img src="images/${product.productPic}" class="card-img-top">
                        <div class="card-body">
                            <p class="card-text fw-bold">${product.productName}</p>
                            <p class="card-text">${product.productPrice}$</p>
                            <input type="button" value="Add to Card" class="btn btn-success"
                                onclick="addToCard(${productIndex})">
                        </div>
                    </div>
                </div>`

        console.log(rows)
    })

    document.getElementById("productsGrid").innerHTML = rows.join(" ");
}


let basketCount = document.getElementById("basketCount");

let shoppingCard = [];

function addToCard(...args) {
    let productIndex = shoppingCard.findIndex((productObject) =>
        productObject.productId === products[args[0]].productId
    );
    console.log(productIndex);



    if (productIndex < 0) {
        shoppingCard.push(products[args[0]]);
        shoppingCard[shoppingCard.length - 1].productQuantity = 1;
    } else {
        shoppingCard[productIndex].productQuantity++
    }

    basketCount.innerHTML = shoppingCard.length;
    console.log(shoppingCard);
    createRows();
}

function createRows() {
    let rows = shoppingCard.map(function (product, productIndex) {

        return `<tr>
           <td>${product.productName}</td>
           <td>${product.productPrice}$</td>
           <td><i class="fa-solid fa-plus btn btn-success text-light me-3"
                   onclick="addQuantity(${productIndex})"></i>${product.productQuantity}<i
                   class="fa-solid fa-minus btn btn-danger text-light ms-3"
                   onclick="removeQuantity(${productIndex})"></i></td>
           <td>${shoppingCard[productIndex].productPrice * shoppingCard[productIndex].productQuantity}
           </td>
           <td><i class="fa-solid fa-trash-can text-danger" onclick="deleteItem(${product.productIndex})"></i></td>
       </tr>`;
    })


    let sumTotal = shoppingCard.reduce(function (acc, curr) {
        return acc + (curr.productQuantity * curr.productPrice)
    }, 0)


    document.querySelector('tbody').innerHTML = rows.join(" ");
    document.querySelector('tfoot').innerHTML = `<tr class="table-info text-center fw-bold">
           <td colspan="3">Sum</td>
           <td colspan="2">${sumTotal}</td>
       </tr>`;
}


function deleteItem(productIndex) {
    shoppingCard.splice(productIndex, 1);
    createRows()

}