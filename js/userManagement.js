// Dummy User Data
let users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
];

const userTableBody = document.getElementById("userTableBody");
const addUserForm = document.getElementById("addUserForm");
const editUserForm = document.getElementById("editUserForm");

// Render User Table
function renderUserTable() {
    userTableBody.innerHTML = users.map((user, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join("");
}

// Add User
addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const role = document.getElementById("userRole").value;
    const status = document.getElementById("userStatus").value;

    users.push({ id: Date.now(), name, email, role, status });
    renderUserTable();
    addUserForm.reset();
    bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
});

// Edit User
function editUser(id) {
    const user = users.find(u => u.id === id);
    document.getElementById("editUserId").value = user.id;
    document.getElementById("editUserName").value = user.name;
    document.getElementById("editUserEmail").value = user.email;
    document.getElementById("editUserRole").value = user.role;
    document.getElementById("editUserStatus").value = user.status;

    const editModal = new bootstrap.Modal(document.getElementById("editUserModal"));
    editModal.show();
}

// Save Edited User
editUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById("editUserId").value);
    const name = document.getElementById("editUserName").value;
    const email = document.getElementById("editUserEmail").value;
    const role = document.getElementById("editUserRole").value;
    const status = document.getElementById("editUserStatus").value;

    const userIndex = users.findIndex(u => u.id === id);
    users[userIndex] = { id, name, email, role, status };
    renderUserTable();
    bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
});

// Delete User
function deleteUser(id) {
    users = users.filter(u => u.id !== id);
    renderUserTable();
}

// Initial Render
renderUserTable();
