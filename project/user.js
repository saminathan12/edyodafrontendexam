window.onload = function () {
    var usersTable = document.getElementById('usersTable');
    var searchInput = document.getElementById('searchInput');
    var resetButton = document.getElementById('resetButton');

    function fetchAllUsers() {
        var url = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users';
        fetchUsers(url);
    }

    function fetchUsers(url) {
        var a = new XMLHttpRequest();
        a.open('GET', url, true);
        a.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status !== 200) return; 
            var users = JSON.parse(this.responseText);
            displayUsers(users);
        };
        a.send();
    }

    function displayUsers(users) {
        var tbody = document.querySelector('#usersTable tbody');
        tbody.innerHTML = ''; 

        users.forEach(function (user) {
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + user.id + '</td><td><img src="' + user.profilePic + '" alt="Profile Pic"></td><td>' + user.fullName + '</td><td>' + user.dob + '</td><td>' + user.gender + '</td><td>' + user.currentCity + '</td><td>' + user.currentCountry + '</td>';
            tbody.appendChild(row);
        });
    }

    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    resetButton.addEventListener('click', function () {
        
        searchInput.value = '';
        
        fetchAllUsers();
    });

    function performSearch() {
        var searchValue = searchInput.value.trim();
        if (searchValue.length >= 2) {
            var url = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=' + searchValue;
            fetchUsers(url);
        } else {
            alert('Please enter at least 2 characters');
        }
    }

    function logout(){
        document.getElementById('logout_btn').addEventListener("click",function(){
            localStorage.clear();
            window.location.href = 'login.html';
        })
    }

    logout();


    fetchAllUsers();
};