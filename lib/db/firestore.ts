// Firestore Database Functions — K3 VR Training
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

// ============================================================
// USERS
// ============================================================

// Ambil semua users
export async function getUsers() {
  const snapshot = await getDocs(
    query(collection(db, "users"), orderBy("created_at", "desc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Ambil user berdasarkan ID
export async function getUserById(userId: string) {
  const docSnap = await getDoc(doc(db, "users", userId));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

// Ambil user berdasarkan NIK (untuk login)
export async function getUserByNik(nik: string) {
  const snapshot = await getDocs(
    query(collection(db, "users"), where("nik", "==", nik), limit(1))
  );
  if (snapshot.empty) return null;
  const userDoc = snapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() };
}

// Ambil users berdasarkan role
export async function getUsersByRole(role: "admin" | "worker") {
  const snapshot = await getDocs(
    query(collection(db, "users"), where("role", "==", role), orderBy("created_at", "desc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Tambah user baru
export async function createUser(data: {
  nik: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "admin" | "worker";
  department?: string;
}) {
  // Cek apakah NIK sudah ada
  const existing = await getUserByNik(data.nik);
  if (existing) {
    throw new Error("NIK sudah terdaftar");
  }

  const docRef = await addDoc(collection(db, "users"), {
    ...data,
    status: "active",
    avatar_url: "",
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
  return docRef.id;
}

// Update user
export async function updateUser(userId: string, data: Record<string, any>) {
  await updateDoc(doc(db, "users", userId), {
    ...data,
    updated_at: serverTimestamp(),
  });
}

// Hapus user + semua progress-nya
export async function deleteUser(userId: string) {
  const progressSnapshot = await getDocs(
    query(collection(db, "user_progress"), where("user_id", "==", userId))
  );
  for (const progressDoc of progressSnapshot.docs) {
    await deleteDoc(progressDoc.ref);
  }
  await deleteDoc(doc(db, "users", userId));
}

// ============================================================
// MODULES
// ============================================================

// Ambil semua modules
export async function getModules() {
  const snapshot = await getDocs(
    query(collection(db, "modules"), orderBy("order", "asc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Ambil modules aktif saja (untuk worker)
export async function getActiveModules() {
  const snapshot = await getDocs(
    query(collection(db, "modules"), where("status", "==", "active"), orderBy("order", "asc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Ambil module berdasarkan ID
export async function getModuleById(moduleId: string) {
  const docSnap = await getDoc(doc(db, "modules", moduleId));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

// Tambah module baru
export async function createModule(data: {
  title: string;
  description: string;
  category: string;
  video_url: string;
  thumbnail?: string;
  duration_minutes: number;
  difficulty?: string;
  order?: number;
  created_by?: string;
}) {
  const docRef = await addDoc(collection(db, "modules"), {
    ...data,
    status: "draft",
    thumbnail: data.thumbnail || "",
    difficulty: data.difficulty || "beginner",
    order: data.order || 0,
    created_by: data.created_by || "",
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
  return docRef.id;
}

// Update module
export async function updateModule(moduleId: string, data: Record<string, any>) {
  await updateDoc(doc(db, "modules", moduleId), {
    ...data,
    updated_at: serverTimestamp(),
  });
}

// Hapus module + semua progress terkait
export async function deleteModule(moduleId: string) {
  const progressSnapshot = await getDocs(
    query(collection(db, "user_progress"), where("module_id", "==", moduleId))
  );
  for (const progressDoc of progressSnapshot.docs) {
    await deleteDoc(progressDoc.ref);
  }
  await deleteDoc(doc(db, "modules", moduleId));
}

// ============================================================
// USER PROGRESS
// ============================================================

// Ambil semua progress milik satu user
export async function getProgressByUser(userId: string) {
  const snapshot = await getDocs(
    query(collection(db, "user_progress"), where("user_id", "==", userId))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Ambil progress spesifik (1 user + 1 module)
export async function getProgress(userId: string, moduleId: string) {
  const snapshot = await getDocs(
    query(
      collection(db, "user_progress"),
      where("user_id", "==", userId),
      where("module_id", "==", moduleId),
      limit(1)
    )
  );
  if (snapshot.empty) return null;
  const progressDoc = snapshot.docs[0];
  return { id: progressDoc.id, ...progressDoc.data() };
}

// Ambil semua progress untuk satu module (untuk admin statistik)
export async function getProgressByModule(moduleId: string) {
  const snapshot = await getDocs(
    query(collection(db, "user_progress"), where("module_id", "==", moduleId))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Mulai atau update progress (upsert)
export async function upsertProgress(data: {
  user_id: string;
  user_nik: string;
  module_id: string;
  status: "not_started" | "in_progress" | "completed";
  completion_percentage: number;
  last_position_seconds: number;
  score?: number;
}) {
  const existing = await getProgress(data.user_id, data.module_id);

  if (existing) {
    const updateData: Record<string, any> = {
      status: data.status,
      completion_percentage: data.completion_percentage,
      last_position_seconds: data.last_position_seconds,
      updated_at: serverTimestamp(),
    };
    if (data.score !== undefined) updateData.score = data.score;
    if (data.status === "completed") updateData.completed_at = serverTimestamp();

    await updateDoc(doc(db, "user_progress", existing.id), updateData);
    return existing.id;
  } else {
    const docRef = await addDoc(collection(db, "user_progress"), {
      ...data,
      score: data.score || 0,
      started_at: serverTimestamp(),
      completed_at: data.status === "completed" ? serverTimestamp() : null,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    return docRef.id;
  }
}

// Hapus progress
export async function deleteProgress(progressId: string) {
  await deleteDoc(doc(db, "user_progress", progressId));
}

// ============================================================
// STATISTIK (untuk admin dashboard & reports)
// ============================================================

// Hitung total users berdasarkan role
export async function countUsersByRole(role: "admin" | "worker") {
  const snapshot = await getDocs(
    query(collection(db, "users"), where("role", "==", role))
  );
  return snapshot.size;
}

// Hitung total modules aktif
export async function countActiveModules() {
  const snapshot = await getDocs(
    query(collection(db, "modules"), where("status", "==", "active"))
  );
  return snapshot.size;
}

// Hitung total progress completed
export async function countCompletedProgress() {
  const snapshot = await getDocs(
    query(collection(db, "user_progress"), where("status", "==", "completed"))
  );
  return snapshot.size;
}

// Rata-rata skor
export async function getAverageScore() {
  const snapshot = await getDocs(
    query(collection(db, "user_progress"), where("status", "==", "completed"))
  );
  if (snapshot.empty) return 0;
  const total = snapshot.docs.reduce((sum, d) => sum + (d.data().score || 0), 0);
  return Math.round(total / snapshot.size);
}
