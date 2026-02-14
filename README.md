# 🦺 K3 VR Training - Portal Simulasi Keselamatan Kerja 360°

Portal pelatihan Keselamatan dan Kesehatan Kerja (K3) berbasis web yang menggunakan teknologi Virtual Reality 360° untuk memberikan pengalaman immersive dalam simulasi situasi berbahaya di tempat kerja.

![Status](https://img.shields.io/badge/Status-Fase%201%20(Frontend)-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![A-Frame](https://img.shields.io/badge/A--Frame-WebVR-orange)

---

## 📋 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)
- [Peta Navigasi](#-peta-navigasi)
- [Struktur Proyek](#-struktur-proyek)
- [Fitur Utama](#-fitur-utama)
- [Catatan Pengembangan](#-catatan-pengembangan)
- [Troubleshooting](#-troubleshooting)

---

## 🛠 Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **Next.js** | 15.x | Framework React dengan App Router |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **A-Frame** | Latest | WebVR framework untuk video 360° |
| **Lucide React** | Latest | Icon library |
| **React** | 19.x | UI library |

---

## 🚀 Instalasi & Menjalankan

### Prerequisites

- Node.js 18.x atau lebih baru
- npm atau yarn
- Browser modern (Chrome, Firefox, Edge)

### Langkah Instalasi

1. **Clone repository**
```bash
   git clone <repository-url>
   cd k3-vr-training
```

2. **Install dependencies**
```bash
   npm install --legacy-peer-deps
```
   
   > **⚠️ PENTING:** Gunakan flag `--legacy-peer-deps` karena A-Frame memiliki peer dependency conflicts dengan Next.js 15.

3. **Siapkan file video VR 360°**
   
   Buat folder `public/videos/` dan tambahkan file video dummy:
```bash
   mkdir -p public/videos
```
   
   Lalu masukkan file video 360° Anda dengan nama `dummy-360.mp4` ke folder tersebut.
   
   > **📹 Format Video:**
   > - Format: MP4 (H.264 codec)
   > - Resolusi minimal: 1920x1080 (ideal: 4K)
   > - Harus memiliki metadata spherical 360°
   > - Ukuran: < 50MB untuk testing

4. **Jalankan development server**
```bash
   npm run dev
```
   
   Aplikasi akan berjalan di: **http://localhost:3000**

---

## 🗺 Peta Navigasi

### Direct Links ke Semua Halaman

Karena autentikasi belum aktif (masih dummy), Anda dapat **langsung mengakses** halaman manapun dengan URL berikut:

| Halaman | Role | URL | Keterangan |
|---------|------|-----|------------|
| 🏠 **Homepage** | Public | `http://localhost:3000/` | Landing page dengan link login/register |
| 🔐 **Login** | Public | `http://localhost:3000/login` | Form login (dummy authentication) |
| 📝 **Register** | Public | `http://localhost:3000/register` | Form registrasi (dummy) |
| 📊 **Admin Dashboard** | Admin | `http://localhost:3000/admin/dashboard` | Dashboard overview admin |
| 📚 **Manajemen Modul** | Admin | `http://localhost:3000/admin/modules` | CRUD modul training |
| ✏️ **Edit Modul** | Admin | `http://localhost:3000/admin/modules/1` | Edit detail modul (ID: 1-8) |
| 👥 **Manajemen User** | Admin | `http://localhost:3000/admin/users` | Daftar pengguna |
| 📈 **Laporan** | Admin | `http://localhost:3000/admin/reports` | Laporan & analytics |
| 🏠 **Worker Dashboard** | Worker | `http://localhost:3000/worker/dashboard` | Dashboard pekerja |
| 📖 **Daftar Modul** | Worker | `http://localhost:3000/worker/modules` | List modul training tersedia |
| 📄 **Detail Modul** | Worker | `http://localhost:3000/worker/modules/1` | Preview modul (ID: 1-8) |
| 🎮 **VR Player** | Worker | `http://localhost:3000/worker/modules/1/play` | Simulasi VR 360° |
| 🏆 **Progress Tracker** | Worker | `http://localhost:3000/worker/progress` | Tracking progress pekerja |

### Quick Access untuk Testing

**Testing sebagai Admin:**
```
1. Buka: http://localhost:3000/admin/dashboard
2. Atau login dengan NIK: "admin"
```

**Testing sebagai Worker:**
```
1. Buka: http://localhost:3000/worker/dashboard
2. Atau login dengan NIK apapun selain "admin"
```

**Testing VR Player:**
```
http://localhost:3000/worker/modules/1/play
```

---

## 📁 Struktur Proyek
```
k3-vr-training/
├── app/
│   ├── (auth)/                 # Auth group routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/            # Dashboard group routes
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   ├── modules/
│   │   │   │   └── [id]/      # Dynamic module ID
│   │   │   ├── users/
│   │   │   └── reports/
│   │   └── worker/
│   │       ├── dashboard/
│   │       ├── modules/
│   │       │   └── [id]/
│   │       │       ├── page.tsx      # Module detail
│   │       │       └── play/         # VR Player
│   │       └── progress/
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── layout/                 # Layout components
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── vr/                     # VR specific components
│       ├── VRPlayer.tsx
│       └── VRControls.tsx
├── lib/                        # Utilities
│   ├── db/                     # Database (Fase 2)
│   └── utils/
├── public/
│   ├── videos/                 # ⚠️ TARUH VIDEO 360° DI SINI
│   │   └── dummy-360.mp4
│   └── images/
├── types/                      # TypeScript types
└── tailwind.config.ts
```

---

## ✨ Fitur Utama

### Sprint 1: Authentication ✅
- [x] Login page dengan glassmorphic design
- [x] Register page dengan multi-step form
- [x] Role selection (Admin/Worker)
- [x] Dummy authentication (redirect based on NIK)

### Sprint 2: Dashboard Foundations ✅
- [x] Admin dashboard dengan stats overview
- [x] Worker dashboard dengan progress tracking
- [x] Sidebar navigation dengan dynamic menu
- [x] Responsive navbar

### Sprint 3: Module Management ✅
- [x] Admin: CRUD modul training
- [x] Admin: Module detail/edit form
- [x] Worker: Module list dengan filter & search
- [x] Card-based UI dengan status badges

### Sprint 4: VR Player Integration ✅
- [x] A-Frame integration (SSR-safe)
- [x] 360° video player
- [x] Custom video controls overlay
- [x] Progress tracking
- [x] Auto-hide controls

---

## 📌 Catatan Pengembangan

### Fase 1: Frontend & UI/UX ✅ **SELESAI**

**Status:** Semua halaman sudah dibuat dengan dummy data.

**Yang Sudah Dikerjakan:**
- ✅ Semua halaman autentikasi (Login, Register)
- ✅ Dashboard Admin & Worker
- ✅ Manajemen modul (CRUD)
- ✅ VR Player dengan A-Frame
- ✅ Controls overlay dengan progress bar
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Glassmorphism design system
- ✅ Route navigation lengkap

**Dummy Data:**
- 8 modul training dengan data lengkap
- Dummy users (admin & worker)
- Dummy progress tracking
- Dummy stats & analytics

---

### Fase 2: Backend & Database 🚧 **BELUM MULAI**

**Rencana:**
- [ ] Setup MySQL database lokal
- [ ] Buat database schema (users, modules, user_progress)
- [ ] API routes dengan `mysql2/promise`
- [ ] Real authentication dengan session
- [ ] Upload video functionality
- [ ] Progress tracking ke database
- [ ] Certificate generation
- [ ] Analytics & reporting

**File yang Akan Dibuat:**
```
lib/
├── db/
│   ├── connection.ts      # MySQL connection pool
│   └── queries.ts         # Parameterized queries
└── auth/
    └── session.ts         # Session management
```

**Database Schema:**
- `users` - User accounts
- `modules` - Training modules
- `user_progress` - Tracking completion
- `certificates` - Generated certificates

---

## 🐛 Troubleshooting

### Error: "Module not found: aframe"

**Solusi:**
```bash
npm install aframe --legacy-peer-deps
```

### Error: "window is not defined" (A-Frame SSR Error)

**Penyebab:** A-Frame tidak support SSR.

**Solusi:** Komponen VR sudah menggunakan `dynamic` import dengan `ssr: false`. Pastikan tidak ada direct import A-Frame di component lain.

### Video 360° Tidak Muncul / Loading Terus

**Checklist:**
1. ✅ File `dummy-360.mp4` ada di `public/videos/`
2. ✅ Format video: MP4 (H.264)
3. ✅ Video memiliki metadata spherical 360°
4. ✅ Browser mendukung WebGL

**Test URL:**
```
http://localhost:3000/worker/modules/1/play
```

### Controls Tidak Muncul di Bawah Video

**Penyebab:** CSS positioning issue.

**Solusi:** Pastikan VRControls menggunakan `absolute` positioning di dalam container `relative`.

### Port 3000 Sudah Digunakan

**Solusi:**
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9

# Atau jalankan di port lain
npm run dev -- -p 3001
```

### Peer Dependency Warnings

**Solusi:**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 🚀 Next Steps

Untuk melanjutkan ke **Fase 2 (Backend)**:

1. Setup MySQL di Ubuntu:
```bash
   sudo apt update
   sudo apt install mysql-server
   sudo mysql
```

2. Buat database:
```sql
   CREATE DATABASE k3_vr_training;
   CREATE USER 'k3_user'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON k3_vr_training.* TO 'k3_user'@'localhost';
   FLUSH PRIVILEGES;
```

3. Install dependencies backend:
```bash
   npm install mysql2 bcrypt iron-session
```

4. Buat file `.env.local`:
```env
   DB_HOST=localhost
   DB_USER=k3_user
   DB_PASSWORD=password
   DB_NAME=k3_vr_training
   DB_PORT=3306
```

*Terakhir diupdate: 14-feb-2026*