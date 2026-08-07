// export function getCurrentUser() {
//   if (typeof window === "undefined") return null;
//   try {
//     return JSON.parse(localStorage.getItem("currentUser"));
//   } catch {
//     return null;
//   }
// }

// export function setCurrentUser(user) {
//   if (typeof window === "undefined") return;
//   localStorage.setItem("currentUser", JSON.stringify(user));
// }

// export function clearCurrentUser() {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem("currentUser");
// }
// Stores/reads the logged-in user's info in localStorage.
// No JWT - the stored user object (specifically its "id") is what the
// frontend sends as the "x-user-id" header on requests that need to
// know who's logged in (see api.js and cart.js).

function normalizeUser(user) {
  if (!user || typeof user !== "object") return null;
  if (user.id) return user;
  if (user._id) {
    return {
      ...user,
      id: String(user._id),
    };
  }
  return user;
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    return normalizeUser(storedUser);
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") return;
  const normalized = normalizeUser(user);
  if (!normalized) return;
  localStorage.setItem("currentUser", JSON.stringify(normalized));
}

export function clearCurrentUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("currentUser");
}
