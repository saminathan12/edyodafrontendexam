window.onload = function () {
    var ordersTable = document.getElementById('ordersTable');
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    var countElement = document.querySelector('.check_box_div p');

    

    function fetchOrders() {
        var a = new XMLHttpRequest();
        a.open('GET', 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders', true);
        a.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status !== 200) return;
            var orders = JSON.parse(this.responseText);
            displayOrders(orders);
        };
        a.send();
    }

    function displayOrders(orders) {
        var tbody = document.querySelector('#ordersTable tbody');
        tbody.innerHTML = '';

        var filteredOrders = orders.filter(shouldDisplayOrder);

        filteredOrders.forEach(function (order) {
            var row = document.createElement('tr');
            row.innerHTML = '<td class = "id">' + order.id + '</td><td>' + order.customerName + '</td><td class = "id">' + order.orderDate + '<br>' +  order.orderTime + '</td><td class = "id">' + '$'+order.amount + '</td><td>' + order.orderStatus + '</td>';
            tbody.appendChild(row);
        });

        updateCount(filteredOrders.length);
    }

    function shouldDisplayOrder(order) {
        return Array.from(checkboxes).every(function (checkbox) {
            return checkbox.checked || order.orderStatus.toLowerCase() !== checkbox.id.replace('Checkbox', '').toLowerCase();
        });
    }

    function updateCount(count) {
        countElement.innerHTML = 'Count: ' + count;
    }

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', fetchOrders);
    });

    function logout(){
        document.getElementById('logout_btn').addEventListener("click",function(){
            localStorage.clear();
            window.location.href = 'login.html';
        })
    }

    logout();

    fetchOrders();
};

