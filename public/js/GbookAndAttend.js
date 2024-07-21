document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const openRSVPModalBtn = document.getElementById('openRSVPModalBtn');
    const entryModal = document.getElementById('entryModal');
    const deleteModal = document.getElementById('deleteModal');
    const allEntriesModal = document.getElementById('allEntriesModal');
    const rsvpModal = document.getElementById('rsvpModal');
    const closeButtons = document.querySelectorAll('.close');
    const entryForm = document.getElementById('entryForm');
    const deleteForm = document.getElementById('deleteForm');
    const rsvpForm = document.getElementById('rsvpForm');
    const showAllBtn = document.getElementById('showAllBtn');

    let currentPage = 1;
    let totalPages = 1;
    const entriesPerPage = 5;

    openModalBtn.addEventListener('click', () => {
        entryModal.style.display = 'block';
    });

    openRSVPModalBtn.addEventListener('click', () => {
        rsvpModal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === entryModal) {
            entryModal.style.display = 'none';
        }
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
        if (event.target === allEntriesModal) {
            allEntriesModal.style.display = 'none';
        }
        if (event.target === rsvpModal) {
            rsvpModal.style.display = 'none';
        }
    });

    entryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            name: entryForm.name.value,
            message: entryForm.message.value,
            password: entryForm.password.value
        };
        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(() => {
                entryModal.style.display = 'none';
                entryForm.reset();
                loadEntries();
            });
    });

    deleteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            id: deleteForm.id.value,
            password: deleteForm.password.value
        };
        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.text())
            .then(() => {
                deleteModal.style.display = 'none';
                deleteForm.reset();
                loadEntries();
            });
    });

    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            name: rsvpForm.name.value,
            companions: rsvpForm.companions.value,
            details: rsvpForm.details.value
        };
        fetch('/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(() => {
                rsvpModal.style.display = 'none';
                rsvpForm.reset();
            });
    });

    showAllBtn.addEventListener('click', () => {
        currentPage = 1; // 전체보기를 눌렀을 때 처음 페이지로 설정
        loadAllEntries(currentPage);
    });

    document.getElementById('prevPageBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadAllEntries(currentPage);
        }
    });

    document.getElementById('nextPageBtn').addEventListener('click', () => {
        if (currentPage < totalPages) { // totalPages를 비교
            currentPage++;
            loadAllEntries(currentPage);
        }
    });

    function loadEntries() {
        fetch('/entries')
            .then(response => response.json())
            .then(entries => {
                const container = document.getElementById('entries-container');
                container.innerHTML = '';
                entries.forEach(entry => {
                    const entryDiv = document.createElement('div');
                    entryDiv.classList.add('entry');
                    const date = new Date(entry.timestamp);
                    const kstDate = new Date(date.getTime());
                    const formattedDate = kstDate.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
                    entryDiv.innerHTML = `
                        <div class="entryInnerWrap">
                            <p>From. ${entry.name}</p>
                            <div class="entryDateDeleteWrap">
                                <p>${formattedDate}</p>
                                <img src="/img/delete.png" onclick="openDeleteModal(${entry.id})">
                            </div>
                        </div>
                        <p>${entry.message}</p>
                    `;
                    container.appendChild(entryDiv);
                });
            });
    }

    function loadAllEntries(page) {
        fetch(`/all-entries?page=${page}&limit=${entriesPerPage}`)
            .then(response => response.json())
            .then(data => {
                if (data.entries && Array.isArray(data.entries)) {
                    const container = document.getElementById('allEntriesContainer');
                    container.innerHTML = '';
                    data.entries.forEach(entry => {
                        const entryDiv = document.createElement('div');
                        entryDiv.classList.add('entry');
                        const date = new Date(entry.timestamp);
                        const kstDate = new Date(date.getTime());
                        const formattedDate = kstDate.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
                        entryDiv.innerHTML = `
                            <div class="entryInnerWrap">
                                <p>From. ${entry.name}</p>
                                <div class="entryDateDeleteWrap">
                                    <p>${formattedDate}</p>
                                    <img src="/img/delete.png" onclick="openDeleteModal(${entry.id})">
                                </div>
                            </div>
                            <p>${entry.message}</p>
                        `;
                        container.appendChild(entryDiv);
                    });

                    document.getElementById('currentPage').textContent = data.currentPage;

                    totalPages = data.totalPages; // totalPages 업데이트

                    document.getElementById('prevPageBtn').disabled = data.currentPage === 1;
                    document.getElementById('nextPageBtn').disabled = data.currentPage === data.totalPages;

                    if(data.currentPage === 1){
                        document.getElementById('prevPageBtn').classList.add('opacity05');
                    } else {
                        document.getElementById('prevPageBtn').classList.remove('opacity05');
                    }
                    if(data.currentPage === data.totalPages){
                        document.getElementById('nextPageBtn').classList.add('opacity05');
                    } else {
                        document.getElementById('nextPageBtn').classList.remove('opacity05');
                    }

                    allEntriesModal.style.display = 'block';
                } else {
                    console.error('Invalid data structure:', data);
                }
            }).catch(error => {
                console.error('Error fetching entries:', error);
            });
    }

    loadEntries();
});

function openDeleteModal(id) {
    const deleteModal = document.getElementById('deleteModal');
    const deleteIdInput = document.getElementById('deleteId');
    deleteIdInput.value = id;
    deleteModal.style.display = 'block';
}
