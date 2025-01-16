const sliderCounts = { home: 0, about: 0, contact: 0 };

function addNewSlider(page) {
    document.getElementById('sliderForm').reset();
    document.getElementById('sliderModalLabel').innerText = `Add New ${capitalize(page)} Slider`;
    document.getElementById('editSliderId').value = '';
    document.getElementById('sliderPage').value = page;
    const modal = new bootstrap.Modal(document.getElementById('sliderModal'));
    modal.show();
}

function editSlider(id, page) {
    const row = document.querySelector(`tr[data-id='${id}'][data-page='${page}']`);
    document.getElementById('sliderModalLabel').innerText = `Edit ${capitalize(page)} Slider`;
    document.getElementById('editSliderId').value = id;
    document.getElementById('sliderPage').value = page;
    const modal = new bootstrap.Modal(document.getElementById('sliderModal'));
    modal.show();
}

function removeSlider(id, page) {
    if (confirm(`Are you sure you want to delete this ${page} slider?`)) {
        const row = document.querySelector(`tr[data-id='${id}'][data-page='${page}']`);
        if (row) row.remove();
        alert('Slider deleted successfully!');
    }
}

function saveSlider() {
    const fileInput = document.getElementById('sliderImage');
    const editId = document.getElementById('editSliderId').value;
    const page = document.getElementById('sliderPage').value;

    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (editId) {
                const row = document.querySelector(`tr[data-id='${editId}'][data-page='${page}']`);
                row.querySelector('img').src = e.target.result;
                alert(`${capitalize(page)} slider updated successfully!`);
            } else {
                sliderCounts[page]++;
                const newRow = `
                    <tr data-id="${sliderCounts[page]}" data-page="${page}">
                        <td>${sliderCounts[page]}</td>
                        <td><img src="${e.target.result}" alt="${capitalize(page)} Slider ${sliderCounts[page]}" width="100"></td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editSlider(${sliderCounts[page]}, '${page}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="removeSlider(${sliderCounts[page]}, '${page}')">Delete</button>
                        </td>
                    </tr>
                `;
                document.getElementById(`${page}SliderTableBody`).insertAdjacentHTML('beforeend', newRow);
                alert(`${capitalize(page)} slider added successfully!`);
            }
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Please select an image.');
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('sliderModal'));
    modal.hide();
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}