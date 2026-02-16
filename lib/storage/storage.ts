// Firebase Storage Functions — K3 VR Training
// Untuk upload & kelola video 360° dan thumbnail
import { storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

// ============================================================
// UPLOAD VIDEO 360°
// ============================================================
export function uploadVideo(
  file: File,
  moduleId: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Simpan di folder: videos/{moduleId}/{namafile}
    const storageRef = ref(storage, `videos/${moduleId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Hitung progress upload (0-100)
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) onProgress(progress);
      },
      (error) => {
        // Error
        reject(error);
      },
      async () => {
        // Selesai — ambil URL download
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

// ============================================================
// UPLOAD THUMBNAIL
// ============================================================
export function uploadThumbnail(
  file: File,
  moduleId: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Simpan di folder: thumbnails/{moduleId}/{namafile}
    const storageRef = ref(storage, `thumbnails/${moduleId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

// ============================================================
// HAPUS FILE
// ============================================================
export async function deleteFile(filePath: string) {
  const fileRef = ref(storage, filePath);
  await deleteObject(fileRef);
}

// ============================================================
// AMBIL URL DOWNLOAD
// ============================================================
export async function getFileURL(filePath: string) {
  const fileRef = ref(storage, filePath);
  return await getDownloadURL(fileRef);
}

// ============================================================
// LIST SEMUA VIDEO UNTUK SATU MODULE
// ============================================================
export async function listModuleVideos(moduleId: string) {
  const listRef = ref(storage, `videos/${moduleId}`);
  const result = await listAll(listRef);
  const urls = await Promise.all(
    result.items.map((item) => getDownloadURL(item))
  );
  return urls;
}
