// ==========================================
// DONNÉES ET CONFIGURATION
// ==========================================

const CHALLENGES = [
    {
        id: 1,
        type: 'quiz',
        question: 'Quelle est la capitale de la France ?',
        options: ['Paris', 'Londres', 'Berlin', 'Madrid'],
        correctAnswer: 0,
        basePoints: 100,
    },
    {
        id: 2,
        type: 'quiz',
        question: 'Combien font 7 x 8 ?',
        options: ['54', '56', '58', '64'],
        correctAnswer: 1,
        basePoints: 100,
    },
    {
        id: 3,
        type: 'quiz',
        question: 'Quel est le plus grand océan ?',
        options: ['Atlantique', 'Indien', 'Arctique', 'Pacifique'],
        correctAnswer: 3,
        basePoints: 100,
    },
    {
        id: 4,
        type: 'quiz',
        question: 'Qui a peint la Joconde ?',
        options: ['Picasso', 'Léonard de Vinci', 'Van Gogh', 'Monet'],
        correctAnswer: 1,
        basePoints: 100,
    },
];

const EXPRESS_CHALLENGES = [
    {
        id: 1,
        title: 'Trouve l\'intrus !',
        question: 'Quel mot n\'a rien à voir avec les autres ?',
        options: ['Banane', 'Pomme', 'Carotte', 'Orange'],
        correctAnswer: 2,
        timeLimit: 15,
        points: 50,
    },
    {
        id: 2,
        title: 'Calcul mental',
        question: '15 + 28 - 7 = ?',
        options: ['34', '36', '38', '40'],
        correctAnswer: 1,
        timeLimit: 10,
        points: 50,
    },
    {
        id: 3,
        title: 'Devinette',
        question: 'Je suis jaune et je brille dans le ciel. Qui suis-je ?',
        options: ['La lune', 'Le soleil', 'Une étoile', 'Un avion'],
        correctAnswer: 1,
        timeLimit: 12,
        points: 50,
    },
    {
        id: 4,
        title: 'Association',
        question: 'Paris est la capitale de quel pays ?',
        options: ['Espagne', 'Italie', 'France', 'Belgique'],
        correctAnswer: 2,
        timeLimit: 8,
        points: 50,
    },
];

// Variables globales
let currentGroup = null;
let currentChallenge = null;
let currentTimer = null;
let timeLeft = 0;
let challengeStartTime = 0;

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadCurrentGroup();
    updateHomeScreen();
    
    // Enregistrer le Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker enregistré'))
            .catch(err => console.log('Erreur Service Worker:', err));
    }
});

// ==========================================
// GESTION DU STOCKAGE
// ==========================================

function loadCurrentGroup() {
    const groupData = localStorage.getItem('currentGroup');
    if (groupData) {
        currentGroup = JSON.parse(groupData);
    }
}

function saveCurrentGroup(group) {
    currentGroup = group;
    localStorage.setItem('currentGroup', JSON.stringify(group));
    
    // Sauvegarder aussi dans la liste des groupes
    localStorage.setItem(`group_${group.code}`, JSON.stringify(group));
}

function getGroup(code) {
    const groupData = localStorage.getItem(`group_${code}`);
    return groupData ? JSON.parse(groupData) : null;
}

// ==========================================
// NAVIGATION
// ==========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function goToHome() {
    updateHomeScreen();
    showScreen('homeScreen');
}

function goToGroup() {
    if (!currentGroup) {
        showModal('Erreur', 'Aucun groupe actif');
        return;
    }
    updateGroupScreen();
    showScreen('groupScreen');
}

function goToChallenge() {
    loadChallenge();
    showScreen('challengeScreen');
}

function goToExpress() {
    loadExpressChallenge();
    showScreen('expressScreen');
}

// ==========================================
// ÉCRAN D'ACCUEIL
// ==========================================

function updateHomeScreen() {
    const currentGroupCard = document.getElementById('currentGroupCard');
    const currentGroupText = document.getElementById('currentGroupText');
    
    if (currentGroup) {
        currentGroupCard.classList.remove('hidden');
        currentGroupText.textContent = `Tu es dans : ${currentGroup.name}`;
    } else {
        currentGroupCard.classList.add('hidden');
    }
}

function toggleMode(mode) {
    const createToggle = document.getElementById('createToggle');
    const joinToggle = document.getElementById('joinToggle');
    const createForm = document.getElementById('createForm');
    const joinForm = document.getElementById('joinForm');
    const infoText = document.getElementById('infoText');
    
    if (mode === 'create') {
        createToggle.classList.add('active');
        joinToggle.classList.remove('active');
        createForm.classList.remove('hidden');
        joinForm.classList.add('hidden');
        infoText.textContent = '💡 Tu recevras un code à partager avec tes amis';
    } else {
        createToggle.classList.remove('active');
        joinToggle.classList.add('active');
        createForm.classList.add('hidden');
        joinForm.classList.remove('hidden');
        infoText.textContent = '💡 Demande le code à 6 chiffres à ton ami';
    }
}

function generateGroupCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function createGroup() {
    const playerName = document.getElementById('createPlayerName').value.trim();
    const groupName = document.getElementById('createGroupName').value.trim();
    
    if (!playerName || !groupName) {
        showModal('Erreur', 'Remplis tous les champs !');
        return;
    }
    
    const code = generateGroupCode();
    const newGroup = {
        code: code,
        name: groupName,
        members: [{
            id: '1',
            name: playerName,
            score: 0,
            isAdmin: true,
        }],
        createdAt: new Date().toISOString(),
    };
    
    saveCurrentGroup(newGroup);
    
    showModal(
        'Groupe créé ! 🎉',
        `Code du groupe : ${code}\n\nPartage ce code avec tes amis !`,
        () => goToGroup()
    );
}

function joinGroup() {
    const playerName = document.getElementById('joinPlayerName').value.trim();
    const groupCode = document.getElementById('joinGroupCode').value.trim();
    
    if (!playerName || !groupCode) {
        showModal('Erreur', 'Remplis tous les champs !');
        return;
    }
    
    if (groupCode.length !== 6) {
        showModal('Erreur', 'Le code doit contenir 6 chiffres');
        return;
    }
    
    const group = getGroup(groupCode);
    
    if (!group) {
        showModal('Erreur', 'Ce groupe n\'existe pas');
        return;
    }
    
    if (group.members.length >= 15) {
        showModal('Erreur', 'Ce groupe est complet (15 membres max)');
        return;
    }
    
    if (group.members.some(m => m.name === playerName)) {
        showModal('Erreur', 'Ce nom est déjà pris dans le groupe');
        return;
    }
    
    const newMember = {
        id: Date.now().toString(),
        name: playerName,
        score: 0,
        isAdmin: false,
    };
    
    group.members.push(newMember);
    saveCurrentGroup(group);
    
    showModal(
        'Bienvenue ! 👋',
        `Tu as rejoint le groupe "${group.name}"`,
        () => goToGroup()
    );
}

function leaveGroup() {
    showModal(
        'Quitter le groupe ?',
        'Es-tu sûr de vouloir quitter ce groupe ?',
        () => {
            localStorage.removeItem('currentGroup');
            currentGroup = null;
            goToHome();
        },
        () => {},
        'Quitter',
        'Annuler'
    );
}

// ==========================================
// ÉCRAN GROUPE
// ==========================================

function updateGroupScreen() {
    document.getElementById('groupName').textContent = currentGroup.name;
    document.getElementById('groupCode').textContent = currentGroup.code;
    document.getElementById('memberCount').textContent = 
        `${currentGroup.members.length} membre${currentGroup.members.length > 1 ? 's' : ''}`;
    
    updateLeaderboard();
}

function updateLeaderboard() {
    const sortedMembers = [...currentGroup.members].sort((a, b) => b.score - a.score);
    const leaderboardList = document.getElementById('leaderboardList');
    
    leaderboardList.innerHTML = sortedMembers.map((member, index) => {
        const medals = ['🥇', '🥈', '🥉'];
        const rank = index < 3 ? medals[index] : index + 1;
        const className = ['first', 'second', 'third'][index] || '';
        
        return `
            <div class="member-card ${className}">
                <div class="member-rank">${rank}</div>
                <div class="member-info">
                    <div class="member-name">${member.name}${member.isAdmin ? ' 👑' : ''}</div>
                    <div class="member-score">${member.score} points</div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// CHALLENGE (QUIZ)
// ==========================================

function loadChallenge() {
    currentChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    timeLeft = 30;
    challengeStartTime = Date.now();
    
    document.getElementById('challengeQuestion').textContent = currentChallenge.question;
    document.getElementById('maxPoints').textContent = 
        `Points max : ${currentChallenge.basePoints + 50}`;
    
    const optionsContainer = document.getElementById('challengeOptions');
    optionsContainer.innerHTML = currentChallenge.options.map((option, index) => `
        <button class="option-btn" onclick="answerChallenge(${index})">${option}</button>
    `).join('');
    
    document.getElementById('bonusInfo').classList.remove('hidden');
    startTimer('challenge');
}

function answerChallenge(answerIndex) {
    clearInterval(currentTimer);
    
    const buttons = document.querySelectorAll('#challengeOptions .option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    const isCorrect = answerIndex === currentChallenge.correctAnswer;
    
    buttons[answerIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
        buttons[currentChallenge.correctAnswer].classList.add('correct');
    }
    
    if (isCorrect) {
        const points = calculatePoints(timeLeft, currentChallenge.basePoints);
        updateScore(points);
        
        setTimeout(() => {
            showModal(
                'Bravo ! 🎉',
                `Tu as gagné ${points} points !\n(${currentChallenge.basePoints} points + ${points - currentChallenge.basePoints} bonus de rapidité)`,
                () => goToGroup()
            );
        }, 500);
    } else {
        setTimeout(() => {
            showModal(
                'Raté ! 😅',
                'Ce n\'était pas la bonne réponse. Réessaye !',
                () => loadChallenge()
            );
        }, 500);
    }
    
    document.getElementById('bonusInfo').classList.add('hidden');
}

function calculatePoints(timeLeft, basePoints) {
    const speedBonus = Math.floor((timeLeft / 30) * 50);
    return basePoints + speedBonus;
}

// ==========================================
// EXPRESS CHALLENGE
// ==========================================

function loadExpressChallenge() {
    currentChallenge = EXPRESS_CHALLENGES[Math.floor(Math.random() * EXPRESS_CHALLENGES.length)];
    timeLeft = currentChallenge.timeLimit;
    
    document.getElementById('expressTitle').textContent = currentChallenge.title;
    document.getElementById('expressQuestion').textContent = currentChallenge.question;
    document.getElementById('expressPoints').textContent = 
        `🎯 ${currentChallenge.points} points si tu réponds correctement !`;
    
    const optionsContainer = document.getElementById('expressOptions');
    optionsContainer.innerHTML = currentChallenge.options.map((option, index) => `
        <button class="option-btn" onclick="answerExpress(${index})">${option}</button>
    `).join('');
    
    startTimer('express');
}

function answerExpress(answerIndex) {
    clearInterval(currentTimer);
    
    const buttons = document.querySelectorAll('#expressOptions .option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    const isCorrect = answerIndex === currentChallenge.correctAnswer;
    
    buttons[answerIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
        buttons[currentChallenge.correctAnswer].classList.add('correct');
    }
    
    if (isCorrect) {
        updateScore(currentChallenge.points);
        
        setTimeout(() => {
            showModal(
                '⚡ Express réussi !',
                `Tu as gagné ${currentChallenge.points} points !\n\nTu as répondu en ${currentChallenge.timeLimit - timeLeft} secondes !`,
                () => goToGroup()
            );
        }, 500);
    } else {
        setTimeout(() => {
            showModal(
                '❌ Raté !',
                'Mauvaise réponse ! Pas de points cette fois.',
                () => goToGroup()
            );
        }, 500);
    }
}

function abandonExpress() {
    showModal(
        'Abandonner ?',
        'Es-tu sûr de vouloir quitter ce défi ?',
        () => {
            clearInterval(currentTimer);
            goToGroup();
        },
        () => {},
        'Oui',
        'Non'
    );
}

// ==========================================
// TIMER
// ==========================================

function startTimer(type) {
    const timerElement = document.getElementById(type === 'challenge' ? 'challengeTimer' : 'expressTimer');
    
    currentTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 5) {
            timerElement.classList.add(type === 'challenge' ? 'warning' : 'critical');
        }
        
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            handleTimeout(type);
        }
    }, 1000);
}

function handleTimeout(type) {
    if (type === 'challenge') {
        showModal(
            'Temps écoulé ! ⏰',
            'Tu as mis trop de temps à répondre. Pas de points cette fois !',
            () => goToGroup()
        );
    } else {
        showModal(
            '⏰ Temps écoulé !',
            'Trop lent ! Le défi express est terminé.',
            () => goToGroup()
        );
    }
}

// ==========================================
// SCORE
// ==========================================

function updateScore(points) {
    // Trouver le membre actuel (premier membre pour le proto)
    if (currentGroup && currentGroup.members.length > 0) {
        currentGroup.members[0].score += points;
        saveCurrentGroup(currentGroup);
    }
}

// ==========================================
// MODAL
// ==========================================

function showModal(title, message, callback1, callback2, btn1Text = 'OK', btn2Text = 'Annuler') {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalBtn1 = document.getElementById('modalBtn1');
    const modalBtn2 = document.getElementById('modalBtn2');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalBtn1.textContent = btn1Text;
    
    modalBtn1.onclick = () => {
        closeModal();
        if (callback1) callback1();
    };
    
    if (callback2) {
        modalBtn2.textContent = btn2Text;
        modalBtn2.classList.remove('hidden');
        modalBtn2.onclick = () => {
            closeModal();
            callback2();
        };
    } else {
        modalBtn2.classList.add('hidden');
    }
    
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Fermer modal en cliquant à l'extérieur
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});
