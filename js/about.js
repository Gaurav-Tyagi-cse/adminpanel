// About 

const aboutUsList = document.querySelector("#about-us-list ul");
const newAboutUsInput = document.getElementById("new-about-us");
const addBtn = document.getElementById("add-btn");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editAboutUsInput = document.getElementById("edit-about-us");
let editingIndex = null;

// Sample Data
let aboutUsEntries = [
    "Our company was founded in 2010 with a mission to innovate.",
    "We strive to provide the best solutions to our clients.",
    "Our team consists of dedicated professionals."
];

// Render List
const renderList = () => {
    aboutUsList.innerHTML = "";
    aboutUsEntries.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
            <span>${entry}</span>
            <div>
                <span class="btn-edit text-primary me-2" data-index="${index}"><i class="fas fa-edit"></i></span>
                <span class="btn-delete text-danger" data-index="${index}"><i class="fas fa-trash"></i></span>
            </div>
        `;
        aboutUsList.appendChild(listItem);
    });
};

// Add New Entry
addBtn.addEventListener("click", () => {
    const newEntry = newAboutUsInput.value.trim();
    if (newEntry) {
        aboutUsEntries.push(newEntry);
        newAboutUsInput.value = "";
        renderList();
    }
});

// Edit Entry
aboutUsList.addEventListener("click", (e) => {
    if (e.target.closest(".btn-edit")) {
        editingIndex = e.target.closest(".btn-edit").dataset.index;
        editAboutUsInput.value = aboutUsEntries[editingIndex];
        editModal.show();
    }
});

// Save Edited Entry
document.getElementById("save-btn").addEventListener("click", () => {
    const updatedEntry = editAboutUsInput.value.trim();
    if (updatedEntry) {
        aboutUsEntries[editingIndex] = updatedEntry;
        editModal.hide();
        renderList();
    }
});

// Delete Entry
aboutUsList.addEventListener("click", (e) => {
    if (e.target.closest(".btn-delete")) {
        const index = e.target.closest(".btn-delete").dataset.index;
        aboutUsEntries.splice(index, 1);
        renderList();
    }
});

// Initial Render
renderList();
