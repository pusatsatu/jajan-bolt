# PRD - Product Requirements Document
---
## Nama Aplikasi
**jajan.app**
***Aplikasi Hosting Microsite GRATIS***
## Teknologi Stack
- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM dengan SQLite
- **Authentication**: NextAuth.js
- **State Management**: Zustand untuk client state, TanStack Query untuk server state
- **UI Components**: shadcn/ui dengan Lucide icons
- **Theme**: next-themes untuk light/dark mode
- **Deployment**: Vercel atau platform yang mendukung Next.js
---
## Konsistensi Aplikasi
### Aturan Umum
- **Setiap kali melakukan perubahan harus selalu berdasarkan PRD ini**
- **Dilarang untuk mengimplementasikan apapun yang tidak tercantum pada PRD ini**
- **Tidak ada hal yang berkaitan dengan email dan sub-domain pada aplikasi ini**
- **Semua link internal tidak boleh reload halaman**
- **Semua link external harus membuka di tab baru (`_blank`)**
- **Logo Aplikasi**: Logo disimpan di folder public dengan nama logo.png. Logo di-download dari URL https://i.postimg.cc/X7QLBW3b/logo-jajan.png dan digunakan sebagai favicon juga. Semua tampilan logo yang masih diwakili oleh text harus diubah semua menjadi logo ini.
- **Theme Selector**:
  - Light (warna hijau-hijauan yang menyehatkan mata)
  - Dark (warna tanah yang menenangkan)
- **Branding Visual**: Motif kain batik kraton tradisional Jawa sebagai latar dan aksen di semua bagian yang relevan
- **Copywriting**: Profesional, Persuasif, Santai, Kekinian, namun mudah dimengerti oleh semua kalangan. Ditujukan bagi pihak-pihak yang akan sangat terbantu dengan memiliki microsite, microste dengan nilai tambah yang lebih dari sekedar microsite bio biasa. Agar semakin jelas manfaat apa saja yang didapatkan, dan manfaat apa saja yang ditawarkan.
- **Navigasi**: Konsisten di semua halaman kecuali halaman Microsite milik user. Ditampilkan dengan Hamburger drop-down menu. Posisi Hamburger di pojok kiri atas sebelum logo. Ditampilkan selalu baik saat diakses oleh desktop ataupun oleh mobile.
- **Responsive dengan pendekatan Mobile-First namun seolah-olah native-mobile sekaligus native-desktop**: Jika diakses oleh desktop, maka akan menampilkan native-desktop seolah-olah memang dibuat khusus untuk desktop. Tapi Jika  diakses oleh mobile, maka akan menampilkan native-mobile seolah-olah memang dibuat khusus untuk mobile.

### Aturan Penampilan Data
- Terdapat Filter dan Pencarian
- Menampilkan "Load more" per 10 data
---
## Sistem Role
### Admin Role
1. **admin**
   - Super admin dengan akses penuh
2. **staff**
   - Dibawah admin
   - Hak akses masing-masing bisa diatur oleh admin
### User Role
1. **trial**
   - Default user role pasca registrasi
   - Masa berlaku ditentukan oleh admin
   - Memiliki semua hak yang sama dengan role pro
   - Jika masa berlaku habis, otomatis berubah menjadi free
2. **free**
   - Default user role yang tidak melakukan upgrade ke pro
   - Memiliki masa berlaku yang ditentukan oleh admin
   - Masa berlaku reset ke pengaturan admin setiap kali free melakukan login sebelum masa berlaku habis
   - Jika tidak melakukan login setelah masa berlaku habis, system akan otomatis menghapus akunnya
3. **pro**
   - User role yang pembayarannya sudah di-approve oleh admin
   - Masa berlaku 30 hari jika bulanan dan 1 tahun jika tahunan
   - Saat masa berlaku habis, otomatis berubah menjadi free
---
## Area Aplikasi
### 1. Admin Area (/admin)
#### Dashboard
- Menampilkan:
  - Total User trial
  - Total User free
  - Total User pro
#### Management User
- CRUD User
- Filter dan pencarian user
- Load more per 10 data
#### Management Konfirmasi Pembayaran
- Approve atau Reject Pembayaran
- Jika Approve maka User menjadi pro
- Filter dan pencarian pembayaran
- Load more per 10 data
#### Ticketing System
- Ticketing system untuk konfirmasi pembayaran dari User
- Filter dan pencarian ticket
- Load more per 10 data
#### Management Keuangan
- History Income:
  - Hari ini
  - Bulan ini
  - Tahun ini
- Total Income:
  - Hari ini
  - Bulan ini
  - Tahun ini
- Filter dan pencarian transaksi
- Load more per 10 data
#### Pengaturan
- Harga pro bulanan (default Rp. 30.000,-) masa berlaku pro 30 hari
- Harga pro tahunan (default Rp. 300.000,-) masa berlaku pro 1 tahun
- Masa berlaku trial 7 sampai 30 hari (default 7 hari) sebelum berubah menjadi free
- Masa berlaku free 7 sampai 30 hari (default 7 hari) sebelum dihapus dari system
- QRIS untuk ditampilkan saat user upgrade ke pro (default "00020101021126690021ID.CO.BANKMANDIRI.WWW01189360000801592617310211715926173110303UKE51440014ID.CO.QRIS.WWW0215ID10243270644070303UKE5204274153033605802ID5916Dagang Jujur Com6013Cimahi (Kota)61054052562070703A016304946D")
- Nomer WhatsApp Customer Service untuk public (Menggunakan format `+62` di awal. Contoh: +6285221212223)
#### Management Admin
- CRUD admin
- CRUD staff
- Pengaturan hak akses staff
- Filter dan pencarian admin/staff
- Load more per 10 data
#### Trailing Log
- Pencatatan semua event yang merubah data yang dilakukan oleh siapapun
- Menampilkan informasi: siapa yang melakukan dan apa yang telah dilakukan
- Filter dan pencarian log
- Load more per 10 data
### 2. User Area (/user)
#### Dashboard
- Menampilkan analytics microsite
- Menampilkan status masa berlaku saat ini:
  - Jika trial: menampilkan kapan berakhirnya trial, dan anjuran untuk upgrade ke pro
  - Jika free: menampilkan kapan berakhirnya free, dan anjuran untuk upgrade ke pro
  - Jika pro: menampilkan kapan berakhirnya pro
#### Management Produk (khusus untuk pro)
- Nama Produk
- Gambar Produk (1 gambar untuk 1 produk)
- Deskripsi Produk
- Harga Produk
- Maksimal 30 produk
- Filter dan pencarian produk
- Load more per 10 data
#### Management Kustom Link (khusus untuk pro)
- Nama Link
- URL Link
- Maksimal 30 kustom link
- Filter dan pencarian link
- Load more per 10 data
#### Ticketing System
- Ticketing system hanya untuk konfirmasi pembayaran ke admin
- Pada ticket hanya ada 1 field yaitu text area
- Filter dan pencarian ticket
- Load more per 10 data
#### Pengaturan
- Deskripsi atau Bio
- Nomor WhatsApp (Menggunakan format `+62` di awal. Contoh: +6285221212223)
- URL Pin Point Google Map (Contoh: [https://maps.app.goo.gl/RtMAVNz2g1qepiUT9](https://maps.app.goo.gl/RtMAVNz2g1qepiUT9))
### 3. Microsite (/i/[username])
#### Header
- username
- Deskripsi
- Tombol Aksi dengan Icon Whatsapp
- Tombol Aksi dengan Icon Google Map
- Tombol Aksi dengan Icon Share
#### Produk (pro & trial)
- Katalog Produk
- Keranjang Belanja
- Checkout melalui pesan WhatsApp
#### Kustom Link (pro & trial)
- Daftar kustom link yang telah dibuat oleh user
### 4. Registrasi (/registrasi)
- Hanya perlu username dan password:
  - username (huruf kecil, angka, tanda '-', dan tanda '_', minimal 6 karakter)
  - password (minimal 6 karakter)
- Hanya user yang bisa registrasi, admin dan staff tidak bisa, hanya bisa dibuat oleh admin
### 5. Login untuk User (/login)
- Hanya perlu username dan password:
  - username (huruf kecil, angka, tanda '-', dan tanda '_', minimal 6 karakter)
  - password (minimal 6 karakter)
### 6. Login untuk Admin (/login-as-admin)
- Hanya perlu username dan password:
  - username (huruf kecil, angka, tanda '-', dan tanda '_', minimal 6 karakter)
  - password (minimal 6 karakter)
### 7. Landing Page (/)
#### Hero
- Menampilkan cek username apakah sudah ada atau belum
- Harus tekan tombol 'Cari' untuk validasi
- Jika username belum ada akan muncul tulisan 'Selamat! username bisa digunakan'
- Muncul tombol aksi untuk lanjut pendaftaran ke halaman pendaftaran dengan username yang diinginkan
#### Tentang jajan.app?
- Apa yang membuat jajan.app berbeda dengan yang lain?
- Menampilkan berbagai manfaat bagi penjual
- Menampilkan berbagai manfaat bagi pembeli
#### Fitur
- Menampilkan fitur-fitur utama aplikasi
#### Demo
- Menampilkan gambar sebuah smartphone yang sedang menampilkan simulasi realistis dan relevan dari satu microsite demo
#### Harga
- Menampilkan paket harga (hanya free dan pro)
- Highlight pada paket pro
- Tanpa Tombol Aksi
#### FAQ
- Lengkap dan accordion
#### Testimoni
- Lengkap, bintang 5, tanpa foto
#### CTA
- Call to action untuk registrasi
---
## User Flow
### Flow Registrasi User
1. User membuka halaman landing page
2. User mengecek ketersediaan username di bagian hero
3. Jika username tersedia, user klik tombol untuk lanjut ke halaman registrasi
4. User mengisi form registrasi dengan username dan password
5. System membuat user dengan role trial
6. User diarahkan ke halaman login
7. User login dengan username dan password
8. User diarahkan ke halaman user dashboard
### Flow Upgrade ke Pro
1. User (trial/free) membuka halaman user dashboard
2. User klik tombol upgrade ke pro
3. User memilih paket (bulanan/tahunan)
4. System menampilkan QRIS untuk pembayaran
5. User melakukan pembayaran
6. User mengupload bukti pembayaran
7. System membuat ticket untuk konfirmasi pembayaran
8. Admin menerima notifikasi ada pembayaran yang perlu dikonfirmasi
9. Admin melakukan approve/reject pembayaran
10. Jika approve, system mengubah role user menjadi pro dan mengirim notifikasi ke user
11. Jika reject, system mengirim notifikasi ke user dengan alasan reject
### Flow Management Produk (Pro)
1. User pro membuka halaman user area
2. User masuk ke menu management produk
3. User bisa menambah, mengedit, menghapus produk
4. Produk akan ditampilkan di microsite user
### Flow Management Kustom Link (Pro)
1. User pro membuka halaman user area
2. User masuk ke menu management kustom link
3. User bisa menambah, mengedit, menghapus kustom link
4. Kustom link akan ditampilkan di microsite user
---
## Technical Requirements
### Database Schema
- User
- Admin
- Product
- CustomLink
- Ticket
- Payment
- Settings
- Log
- Analytics
### Authentication
- User authentication menggunakan username dan password
- Admin authentication menggunakan username dan password
- Session management menggunakan NextAuth.js dengan JWT
- Separate authentication untuk user dan admin
- Role-based access control (RBAC)
### UI/UX Requirements
- Responsive design untuk mobile dan desktop
- Theme switching antara light dan dark dengan next-themes
- Batik pattern untuk branding menggunakan CSS custom properties
- shadcn/ui components untuk consistency
- Consistent padding dan spacing (p-4, p-6, gap-4, gap-6)
- Loading state untuk async operations dengan skeleton components
- Error handling yang user-friendly dengan toast notifications
- Smooth transitions dengan Framer Motion
- Proper semantic HTML untuk accessibility
### API Requirements
- API Routes menggunakan Next.js App Router
- RESTful API untuk CRUD operations
- Proper error handling dengan consistent response format
- Input validation dengan Zod schemas
- Rate limiting dengan upstash/ratelimit atau custom middleware
- Authentication middleware untuk protected routes
- Authorization checks berdasarkan user role
- Server actions untuk server-side operations
- Proper TypeScript types untuk API responses
### Security Requirements
- Password hashing dengan bcrypt
- SQL injection prevention dengan Prisma ORM
- XSS prevention dengan proper escaping dan sanitization
- CSRF protection dengan Next.js built-in CSRF protection
- Proper authorization checks dengan middleware
- Environment variables untuk sensitive data
- CORS configuration untuk API routes
- Secure headers dengan next-headers
- Input validation dengan Zod schemas
- Rate limiting untuk brute force protection
## Non-Functional Requirements
### Performance
- Load time < 3 seconds dengan Next.js optimization
- Proper caching strategy dengan Next.js caching
- Optimized images dengan Next.js Image component
- Code splitting dengan dynamic imports
- Lazy loading untuk components dan images
- Proper bundle analysis dengan @next/bundle-analyzer
- Efficient database queries dengan Prisma
- Client-side navigation dengan Next.js Link component
### Scalability
- Serverless architecture dengan Next.js API routes
- Database indexing yang proper dengan Prisma
- Efficient queries dengan Prisma query optimization
- Horizontal scaling dengan serverless functions
- Proper connection pooling dengan Prisma
- Caching strategy dengan React Query dan Next.js caching
- Database connection management dengan environment variables
- Load balancing dengan deployment platform
### Availability
- 99.9% uptime dengan proper monitoring
- Proper error handling dengan error boundaries
- Graceful degradation dengan fallback components
- Health check endpoints untuk monitoring
- Proper logging dengan Winston atau custom logger
- Database backup strategy
- Redundancy untuk critical components
- Proper timeout handling untuk external services
### Maintainability
- Clean code architecture dengan feature-based structure
- Proper documentation dengan JSDoc comments
- Consistent coding standards dengan ESLint dan Prettier
- ESLint configuration dengan Next.js recommended rules
- TypeScript strict mode untuk type safety
- Component composition untuk reusability
- Proper folder structure dengan App Router conventions
- Automated testing setup dengan Jest and Testing Library
- CI/CD pipeline dengan GitHub Actions