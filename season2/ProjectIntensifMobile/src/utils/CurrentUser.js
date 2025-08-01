export function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export function setDestinationUser(destUser) {
    localStorage.setItem('destinationUser', JSON.stringify(destUser));
}

export function getDestinationUser() {
    return JSON.parse(localStorage.getItem('destinationUser'));
}

export function setDestPseudo(destPseudo) {
    localStorage.setItem('destPseudo', destPseudo.toString());
}