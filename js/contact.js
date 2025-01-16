        const contactList = document.querySelector("#contact-list tbody");
        const addContactForm = document.getElementById("add-contact-form");
        const editModal = new bootstrap.Modal(document.getElementById("editModal"));
        const editName = document.getElementById("edit-name");
        const editEmail = document.getElementById("edit-email");
        const editPhone = document.getElementById("edit-phone");
        const editMessage = document.getElementById("edit-message");
        let editingIndex = null;

        // Sample Contact Data
        let contacts = [
            { name: "Artiasta", email: "artiasta94@gmail.com", phone: "1234567890", message: "Hello there!" },
            { name: "Artiasta", email: "arti-asta@example.com", phone: "098765432", message: "I need help with my order." }
        ];

        // Render Contact List
        const renderList = () => {
            contactList.innerHTML = "";
            contacts.forEach((contact, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.message}</td>
                    <td>
                        <span class="btn-edit text-primary me-2" data-index="${index}"><i class="fas fa-edit"></i></span>
                        <span class="btn-delete text-danger" data-index="${index}"><i class="fas fa-trash"></i></span>
                    </td>
                `;
                contactList.appendChild(row);
            });
        };

        // Add New Contact
        addContactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newContact = {
                name: document.getElementById("new-name").value.trim(),
                email: document.getElementById("new-email").value.trim(),
                phone: document.getElementById("new-phone").value.trim(),
                message: document.getElementById("new-message").value.trim()
            };
            contacts.push(newContact);
            addContactForm.reset();
            renderList();
        });

        // Edit Contact
        contactList.addEventListener("click", (e) => {
            if (e.target.closest(".btn-edit")) {
                editingIndex = e.target.closest(".btn-edit").dataset.index;
                const contact = contacts[editingIndex];
                editName.value = contact.name;
                editEmail.value = contact.email;
                editPhone.value = contact.phone;
                editMessage.value = contact.message;
                editModal.show();
            }
        });

        // Save Edited Contact
        document.getElementById("save-btn").addEventListener("click", () => {
            contacts[editingIndex] = {
                name: editName.value.trim(),
                email: editEmail.value.trim(),
                phone: editPhone.value.trim(),
                message: editMessage.value.trim()
            };
            editModal.hide();
            renderList();
        });

        // Delete Contact
        contactList.addEventListener("click", (e) => {
            if (e.target.closest(".btn-delete")) {
                const index = e.target.closest(".btn-delete").dataset.index;
                contacts.splice(index, 1);
                renderList();
            }
        });

        // Initial Render
        renderList();
    