// ==========================================
// DONNÉES
// ==========================================

let currentUser = {
    pseudo: '',
    group: null
};

// ==========================================
// NAVIGATION
// ==========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function createGroupPage() {
    const pseudo = document.getElementById('pseudoInput').value.trim();
    if (!pseudo) {
        showModal('Erreur', 'Entre ton pseudo d\'abord !');
        return;
    }
    currentUser.pseudo = pseudo;
    showScreen('createScreen');
}

function joinGroupPage() {
    const pseudo = document.getElementById('pseudoInput').value.trim();
    if (!pseudo) {
        showModal('Erreur', 'Entre ton pseudo d\'abord !');
        return;
    }
    currentUser.pseudo = pseudo;
    showScreen('joinScreen');
}

function backToPseudo() {
    showScreen('pseudoScreen');
}

function goToFeed() {
    showScreen('feedScreen');
    loadActivityFeed();
}

// ==========================================
// CRÉER UN GROUPE
// ==========================================

function generateGroup() {
    const groupName = document.getElementById('groupNameInput').value.trim();
    const difficulty = document.getElementById('difficultySelect').value;
    
    if (!groupName) {
        showModal('Erreur', 'Entre un nom de groupe !');
        return;
    }
    
    // Générer code 5 chiffres
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    
    // Créer le groupe
    const newGroup = {
        code: code,
        name: groupName,
        difficulty: difficulty,
        members: [
            {
                pseudo: currentUser.pseudo,
                score: 0,
                isAdmin: true
            }
        ],
        activities: [
            `Le groupe ${groupName} a été créé`
        ],
        createdAt: new Date().toISOString()
    };
    
    // Sauvegarder
    localStorage.setItem(`group_${code}`, JSON.stringify(newGroup));
    currentUser.group = newGroup;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Afficher le code
    document.getElementById('generatedCode').textContent = code;
    document.getElementById('groupCodeDisplay').classList.remove('hidden');
    document.getElementById('createBtn').classList.add('hidden');
    document.getElementById('continueBtn').classList.remove('hidden');
    
    showModal('Groupe créé ! 🎉', `Code du groupe : ${code}\n\nPartage ce code avec tes amis !`);
}

// ==========================================
// REJOINDRE UN GROUPE
// ==========================================

function joinGroupWithCode() {
    const code = document.getElementById('joinCodeInput').value.trim();
    
    if (!code || code.length !== 5) {
        showModal('Erreur', 'Entre un code valide à 5 chiffres !');
        return;
    }
    
    // Récupérer le groupe
    const groupData = localStorage.getItem(`group_${code}`);
    
    if (!groupData) {
        showModal('Erreur', 'Ce groupe n\'existe pas !');
        return;
    }
    
    const group = JSON.parse(groupData);
    
    // Vérifier si déjà membre
    if (group.members.some(m => m.pseudo === currentUser.pseudo)) {
        showModal('Erreur', 'Tu es déjà dans ce groupe !');
        return;
    }
    
    // Ajouter le membre
    group.members.push({
        pseudo: currentUser.pseudo,
        score: 0,
        isAdmin: false
    });
    
    // Ajouter activité
    group.activities.push(`${currentUser.pseudo} a rejoint le groupe`);
    
    // Sauvegarder
    localStorage.setItem(`group_${code}`, JSON.stringify(group));
    currentUser.group = group;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showModal('Bienvenue ! 👋', `Tu as rejoint le groupe "${group.name}"`, goToFeed);
}

// ==========================================
// FEED D'ACTIVITÉ
// ==========================================

function loadActivityFeed() {
    if (!currentUser.group) return;
    
    // Mettre à jour le header
    document.getElementById('groupNameHeader').textContent = currentUser.group.name;
    document.getElementById('memberBadge').textContent = currentUser.group.members.length;
    
    // Charger les activités
    const feedContainer = document.getElementById('activityFeed');
    feedContainer.innerHTML = currentUser.group.activities.map(activity => 
        `<div class="activity-item">${activity}</div>`
    ).join('');
}

// ==========================================
// NAVIGATION BOTTOM BAR
// ==========================================

function showLeaderboard() {
    showModal('Classement', 'Fonctionnalité en cours de développement...');
}

function showChallenges() {
    showModal('Défis', 'Fonctionnalité en cours de développement...');
}

// ==========================================
// MODAL
// ==========================================

function showModal(title, message, callback) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('modal').classList.remove('hidden');
    
    if (callback) {
        const btn = document.querySelector('.btn-modal');
        btn.onclick = () => {
            closeModal();
            callback();
        };
    }
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Fermer modal en cliquant à l'extérieur
document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Charger l'utilisateur
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        
        // Si déjà dans un groupe, aller au feed
        if (currentUser.group) {
            // Recharger le groupe depuis le storage
            const groupData = localStorage.getItem(`group_${currentUser.group.code}`);
            if (groupData) {
                currentUser.group = JSON.parse(groupData);
                showScreen('feedScreen');
                loadActivityFeed();
            }
        }
    }
    
    // Enregistrer le Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .catch(err => console.log('SW error:', err));
    }
});

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================

// Formater le code en input
document.getElementById('joinCodeInput')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});
