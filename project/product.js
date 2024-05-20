window.onload = function () {
    var productsTable = document.getElementById('productsTable');
    var expiredCheckbox = document.getElementById('expiredCheckbox');
    var lowStockCheckbox = document.getElementById('lowStockCheckbox');
    var itemCountLabel = document.getElementById('itemCount');

    function fetchProducts() {
        var a = new XMLHttpRequest();
        a.open('GET', 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products', true);
        a.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status !== 200) return;
            var products = JSON.parse(this.responseText);
            displayProducts(products);
        };
        a.send();
    }

    function displayProducts(products) {
        var tbody = document.querySelector('#productsTable tbody');
        tbody.innerHTML = ''; 

        var filteredProducts = products.filter(function (product) {
            var isExpired = isProductExpired(product.expiryDate);
            var isLowStock = product.stock < 100;

            return (expiredCheckbox.checked || !isExpired) && (lowStockCheckbox.checked || !isLowStock);
        });

        itemCountLabel.textContent = filteredProducts.length;

        filteredProducts.forEach(function (product) {
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + product.id + '</td><td>' + product.medicineName + '</td><td>' + product.medicineBrand + '</td><td>' + product.expiryDate + '</td><td>' + product.unitPrice + '</td><td>' + product.prescriptionRequired + '</td><td>' + product.stock + '</td>';
            tbody.appendChild(row);
        });
    }

    function isProductExpired(expiryDate) {
        var currentDate = new Date();
        var productExpiryDate = new Date(expiryDate);
        return productExpiryDate < currentDate;
    }

    expiredCheckbox.addEventListener('change', fetchProducts);
    lowStockCheckbox.addEventListener('change', fetchProducts);

    function logout(){
        document.getElementById('logout_btn').addEventListener("click",function(){
            localStorage.clear();
            window.location.href = 'login.html';
        })
    }

    logout();

    fetchProducts();
};