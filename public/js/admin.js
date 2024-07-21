document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const closeButtons = document.querySelectorAll('.close');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            password: loginForm.password.value
        };
        fetch('/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => {
            if (response.status === 200) {
                loginModal.style.display = 'none';
                loadAdminEntries();
                loadRSVPEntries();
            } else {
                alert('비밀번호가 틀렸습니다.');
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    function loadAdminEntries() {
        fetch('/all-entries')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('adminEntriesContainer');
            container.innerHTML = '';
            data.entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry');
                const date = new Date(entry.timestamp);
                const kstDate = new Date(date.getTime());
                const formattedDate = kstDate.toLocaleString();
                entryDiv.innerHTML = `
                    <p><strong>From. ${entry.name}</strong></p>
                    <p>${entry.message}</p>
                    <p>비밀번호: ${entry.password}</p>
                    <p>${formattedDate}</p>
                    <button onclick="deleteEntry(${entry.id})">삭제</button>
                `;
                container.appendChild(entryDiv);
            });
        });
    }

    function loadRSVPEntries() {
        fetch('/rsvps')
        .then(response => response.json())
        .then(entries => {
            const container = document.getElementById('rsvpEntriesContainer');
            container.innerHTML = '';
            entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry');
                const date = new Date(entry.timestamp);
                const kstDate = new Date(date.getTime());
                const formattedDate = kstDate.toLocaleString();
                entryDiv.innerHTML = `
                    <p><strong>${entry.name}</strong></p>
                    <p>동행인 수: ${entry.companions}</p>
                    <p>동행인: ${entry.details}</p>
                    <p>${formattedDate}</p>
                `;
                container.appendChild(entryDiv);
            });
        });
    }

    window.deleteEntry = function(id) {
        const password = prompt('비밀번호를 입력하세요:');
        if (password) {
            fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, password })
            }).then(response => {
            if (response.status === 200) {
                loadAdminEntries();
            } else {
                alert('비밀번호가 틀렸습니다.');
            }
            });
        }
    }

    // Show login modal on page load
    loginModal.style.display = 'block';
});
