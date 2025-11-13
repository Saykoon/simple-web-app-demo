// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Contact form handler
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleContactForm);
});

// Check server status
// eslint-disable-next-line no-unused-vars
async function checkServerStatus() {
    const resultDiv = document.getElementById('status-result');
    resultDiv.innerHTML = '<div class="loading"></div> Sprawdzanie statusu...';
    
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (response.ok) {
            resultDiv.innerHTML = `
                <div class="success">
                    <strong>✅ Serwer działa poprawnie!</strong><br>
                    Status: ${data.status}<br>
                    Wiadomość: ${data.message}<br>
                    Czas: ${new Date(data.timestamp).toLocaleString('pl-PL')}
                </div>
            `;
        } else {
            throw new Error(data.error || 'Nieznany błąd');
        }
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error">
                <strong>❌ Błąd połączenia z serwerem</strong><br>
                ${error.message}
            </div>
        `;
    }
}

// Load users from API
// eslint-disable-next-line no-unused-vars
async function loadUsers() {
    const usersDiv = document.getElementById('users-list');
    usersDiv.innerHTML = '<div class="loading"></div> Ładowanie użytkowników...';
    
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        
        if (response.ok) {
            usersDiv.innerHTML = users.map(user => `
                <div class="user-card">
                    <h4>👤 ${user.name}</h4>
                    <p>📧 ${user.email}</p>
                    <p>🆔 ID: ${user.id}</p>
                </div>
            `).join('');
        } else {
            throw new Error('Nie udało się załadować użytkowników');
        }
    } catch (error) {
        usersDiv.innerHTML = `
            <div class="error">
                <strong>❌ Błąd ładowania użytkowników</strong><br>
                ${error.message}
            </div>
        `;
    }
}

// Handle contact form submission
async function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    const resultDiv = document.getElementById('contact-result');
    resultDiv.innerHTML = '<div class="loading"></div> Wysyłanie wiadomości...';
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            resultDiv.innerHTML = `
                <div class="success">
                    <strong>✅ ${result.message}</strong>
                </div>
            `;
            e.target.reset(); // Clear form
        } else {
            throw new Error(result.error || 'Nieznany błąd');
        }
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error">
                <strong>❌ Błąd wysyłania wiadomości</strong><br>
                ${error.message}
            </div>
        `;
    }
}

// Utility function to show notifications
// eslint-disable-next-line no-unused-vars
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}