// Simple localStorage-backed mock auth. No backend, no DB.
const KEY = 'nexora_user';

export function getUser() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}

export function isAuthed() {
    return !!getUser();
}

export function signIn({ name, email, role = 'Founder' }) {
    const user = {
        id: 'u_' + Math.random().toString(36).slice(2, 9),
        name: name || (email ? email.split('@')[0] : 'Founder'),
        email: email || 'founder@nexora.co',
        role,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
        headline: role === 'Founder' ? 'Building the future.' : role,
    };
    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
}

export function signOut() {
    localStorage.removeItem(KEY);
}
