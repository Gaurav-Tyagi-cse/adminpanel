
let products = [];
let editIndex = null;

const productTableBody = document.querySelector("#productTable tbody");
const addProductForm = document.getElementById("addProductForm");
const editProductForm = document.getElementById("editProductForm");

function renderProducts() {
    productTableBody.innerHTML = "";
    products.forEach((product, index) => {
        const row = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td><img src="${product.image}" class="product-image" alt="Product Image"></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
        productTableBody.insertAdjacentHTML("beforeend", row);
    });
}

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageFile = document.getElementById("productImage").files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const product = {
            image: reader.result,
            name: document.getElementById("productName").value,
            category: document.getElementById("category").value,
            price: document.getElementById("price").value,
            stock: document.getElementById("stock").value,
        };
        products.push(product);
        renderProducts();
        addProductForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addProductModal")).hide();
    };
    reader.readAsDataURL(imageFile);
});

function editProduct(index) {
    editIndex = index;
    const product = products[index];
    document.getElementById("editProductName").value = product.name;
    document.getElementById("editCategory").value = product.category;
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editStock").value = product.stock;
    const editProductModal = new bootstrap.Modal(document.getElementById("editProductModal"));
    editProductModal.show();
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        renderProducts();
    }
}
