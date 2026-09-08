# Nodel

**Interactive Story & World-Building Canvas**

Nodel adalah aplikasi perencanaan narasi dan *world-building* visual yang dirancang khusus untuk penulis, *game developer*, dan *dungeon master*. Aplikasi ini menggabungkan kemudahan manajemen *database* (seperti Notion) dengan fleksibilitas kanvas berpemetaan alur (seperti *node-based editor*), memungkinkan kreator untuk memvisualisasikan adegan, karakter, dan benda ajaib dalam satu ruang kerja yang terhubung.

---

## ✨ Fitur Utama

* 🗺️ **Infinite Story Canvas:** Rancang alur cerita, plot bercabang, atau *timeline* kejadian dengan antarmuka kanvas tanpa batas. Tarik garis koneksi antar-adegan untuk menentukan urutan narasi.
* 🗃️ **Entity Database:** Buat dan kelola ensiklopedia duniamu secara terpusat. Mendukung entitas **Character**, **Item**, dan **Location** lengkap dengan gambar sampul, tag, dan tabel atribut kustom (Key-Value) yang dinamis.
* 🖱️ **Drag & Drop Assignment:** Seret entitas (Item atau Lokasi) dari *Floating Action Menu* dan lepaskan (drop) langsung ke dalam *Story Node* atau *Character Node* di kanvas untuk menautkannya.
* 📝 **Inline Rich Text Editing:** Tulis draf cerita langsung di dalam kotak *node* adegan di kanvas tanpa perlu membuka jendela baru. Dilengkapi editor *Rich Text* (mendukung *Bold, Italic, List*) untuk pengalaman menulis yang rapi.
* 💾 **Zero-Click Auto-Save:** Seluruh data kanvas, posisi *node*, dan *database* entitas disimpan secara instan ke *Local Storage* peramban. Tidak perlu khawatir kehilangan mahakarya saat *browser* tidak sengaja dimuat ulang.
* 📤 **One-Click Compilation:** Algoritma Nodel akan menelusuri garis alur ceritamu (dari ujung ke ujung) dan menggabungkan seluruh teks adegan menjadi satu naskah utuh yang siap diunduh dalam format Markdown (`.md`).

---

## 🛠️ Tech Stack

* **Framework:** React (Next.js dengan direktif `"use client"`)
* **State Management:** Zustand (dengan *middleware* `persist`)
* **Canvas Engine:** React Flow
* **Rich Text Editor:** React Quill
* **Styling:** Tailwind CSS
* **Icons:** Lucide React

---

## 🚀 Cara Instalasi

Pastikan kamu sudah menginstal Node.js di sistem kamu.

1. Kloning repositori ini:
```bash
git clone https://github.com/username/nodel.git
cd nodel

```


2. Instal dependensi:
```bash
npm install

```


*(Pastikan paket utama seperti `reactflow`, `zustand`, `react-quill`, dan `lucide-react` telah terinstal)*
3. Jalankan *server* pengembangan:
```bash
npm run dev

```


4. Buka `http://localhost:3000` di peramban.

---

## 📖 Panduan Penggunaan Dasar

1. **Membangun Database:**
* Klik ikon *Character*, *Item*, atau *Location* di *Sidebar* untuk masuk ke mode *Database*.
* Klik tombol **New** untuk membuat entitas baru. Unggah gambar, tambahkan atribut spesifik (misal: "Senjata: Pedang Api"), dan tulis latar belakangnya.


2. **Merangkai Scene di Kanvas:**
* Kembali ke menu **Sequel** (Kanvas).
* Klik tombol oranye (Plus/FAB) di sudut kanan atas, lalu pilih **Story** untuk membuat *node* adegan baru.
* Tulis judul dan draf adegan langsung di dalam *node* tersebut.


3. **Memasukkan Properti Cerita:**
* Buka kembali tombol oranye (FAB), buka kategori *Item* atau *Location*.
* Klik dan seret (drag) item/lokasi tersebut, lalu lepaskan di atas kotak *Story Node* untuk memasangkannya.


4. **Menyambungkan Alur:**
* Arahkan kursor ke titik koneksi (bulatan oranye di sisi kanan/kiri *node*). Tarik garis dari *node* pertama ke *node* kedua untuk merangkai kronologi.


5. **Kompilasi Naskah:**
* Buka *Sidebar* kiri.
* Klik tombol **Compile & Export** di bagian bawah. Aplikasi akan membaca alur graf ceritamu dan mengunduhnya sebagai file Markdown.



---

## 📂 Struktur Folder Utama

```text
nodel/
├── app/
│   └── page.tsx              // Antarmuka utama & inisialisasi React Flow
├── components/
│   ├── EntityDashboard.tsx   // Galeri grid untuk melihat database entitas
│   ├── EntityEditor.tsx      // Form detail untuk mengedit atribut entitas
│   ├── FabMenu.tsx           // Menu floating untuk insert node & drag-and-drop
│   ├── Sidebar.tsx           // Navigasi kiri dan tombol kompilasi ekspor
│   └── nodes/
│       ├── StoryNode.tsx     // Komponen node adegan (Rich Text & slot entitas)
│       ├── CharacterNode.tsx // Komponen node karakter (Thumbnail & slot item)
│       └── ChapterNode.tsx   // Komponen pengelompokan kanvas
└── store/
    └── useStore.ts           // Zustand store dengan auto-save lokal

```

---

## 🗺️ Roadmap (Upcoming Features)

* [ ] **Database Search & Filter:** Penambahan bilah pencarian cerdas di *dashboard* untuk memfilter entitas berdasarkan tag.
* [ ] **Cloud Syncing:** Integrasi *backend* (misal: Supabase/Firebase) untuk menyimpan naskah di awan agar bisa diakses antar-perangkat.
* [ ] **Collaboration:** Mode *multiplayer* agar beberapa penulis bisa menyunting kanvas yang sama secara *real-time*.

---

## 📄 Lisensi

Nodel dirilis di bawah [MIT License](https://www.google.com/search?q=LICENSE). Silakan gunakan, modifikasi, dan distribusikan secara bebas untuk mahakaryamu selanjutnya.