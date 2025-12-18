// ==========================================
// DONNÉES
// ==========================================

let currentUser = {
    pseudo: '',
    group: null
};

const SAMPLE_CHALLENGES = [
    "🎯 Défi du jour : Quelle est la capitale de la France ?",
    "⚡ Défi express : Trouve 3 mots qui riment avec 'bonheur' en 30 secondes !",
    "🎨 Défi créatif : Dessine ta journée en 5 emojis",
    "🏃 Défi sportif : Fais 20 pompes et envoie une photo !"
];

const SAMPLE_MEMBERS = [
    { name: 'Alex', score: 60, streak: 5, online: false, avatar: 'images/Photo-3.png' },
    { name: 'Manon', score: 50, streak: 4, online: true, avatar: 'images/Photo.png' },
    { name: 'Luna', score: 0, streak: 0, online: true, avatar: 'images/Photo-1.png' },
    { name: 'Anaïs', score: 0, streak: 0, online: false, avatar: 'images/Photo-2.png' }
];

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

function showFeed() {
    showScreen('feedScreen');
    loadActivityFeed();
}

function showLeaderboard() {
    showScreen('leaderboardScreen');
    loadLeaderboard();
}

function showGames() {
    showScreen('gamesScreen');
}

function showSettings() {
    showScreen('settingsScreen');
}

function showSoiree() {
    showScreen('soireeScreen');
}

function showProfile() {
    showScreen('profileScreen');
    loadMembersList();
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
        members: SAMPLE_MEMBERS.map((m, i) => ({
            ...m,
            isAdmin: i === 0
        })),
        activities: [
            `Le groupe ${groupName} a été créé`,
            `Luna a rejoint le groupe`,
            `Alex a rejoint le groupe`,
            `Anaïs a rejoint le groupe`,
            ...SAMPLE_CHALLENGES
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
    if (group.members.some(m => m.name === currentUser.pseudo)) {
        showModal('Erreur', 'Tu es déjà dans ce groupe !');
        return;
    }
    
    // Ajouter le membre
    group.members.push({
        name: currentUser.pseudo,
        score: 0,
        streak: 0,
        online: true,
        avatar: 'images/Photo.png',
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
// CLASSEMENT
// ==========================================

function loadLeaderboard() {
    if (!currentUser.group) {
        // Données par défaut pour le proto
        currentUser.group = {
            members: SAMPLE_MEMBERS
        };
    }
    
    const sortedMembers = [...currentUser.group.members].sort((a, b) => b.score - a.score);
    const leaderboardList = document.getElementById('leaderboardList');
    
    const medals = ['🥇', '🥈', '🥉'];
    
    leaderboardList.innerHTML = sortedMembers.map((member, index) => {
        const rank = index < 3 ? medals[index] : (index + 1);
        
        return `
            <div class="leaderboard-item">
                <div class="leaderboard-rank">${rank}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${member.name}</div>
                    <div class="leaderboard-score">${member.score} points</div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// MEMBRES
// ==========================================

function loadMembersList() {
    if (!currentUser.group) {
        currentUser.group = { members: SAMPLE_MEMBERS };
    }
    
    const membersList = document.getElementById('membersList');
    
    membersList.innerHTML = currentUser.group.members.map(member => `
        <div class="member-card-large">
            <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
            <div class="member-name-large">${member.name}</div>
            <div class="member-status ${member.online ? 'online' : ''}">${member.online ? 'En ligne' : 'Hors ligne'}</div>
            <div class="member-streak">${member.streak}🔥</div>
        </div>
    `).join('');
}

// ==========================================
// QUITTER LE GROUPE
// ==========================================

function leaveGroup() {
    showModal(
        'Quitter le groupe ?',
        'Es-tu sûr de vouloir quitter ce groupe ?',
        () => {
            localStorage.removeItem('currentUser');
            currentUser = { pseudo: '', group: null };
            showScreen('pseudoScreen');
        },
        () => {},
        'Quitter',
        'Annuler'
    );
}

// ==========================================
// MODAL
// ==========================================

function showModal(title, message, callback1, callback2, btn1Text = 'OK', btn2Text = 'Annuler') {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('modal').classList.remove('hidden');
    
    const modalBtn = document.querySelector('.btn-modal');
    modalBtn.textContent = btn1Text;
    
    modalBtn.onclick = () => {
        closeModal();
        if (callback1) callback1();
    };
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

// ==========================================
// En cours de dév
// ==========================================

function showPrenium() {
    showModal('Prenium', 'Fonctionnalité en cours de développement...');
}

// Sélectionner le toggle switch
const toggleSwitch = document.querySelector('.toggle-switch');
const toggleText = document.querySelector('.toggle-text');

// Ajouter l'événement de clic
toggleSwitch.addEventListener('click', function() {
    // Basculer la classe 'active'
    this.classList.toggle('active');
    
    // Mettre à jour le texte
    if (this.classList.contains('active')) {
        toggleText.textContent = 'ON';
    } else {
        toggleText.textContent = 'OFF';
    }
});