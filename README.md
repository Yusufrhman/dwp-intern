# DWP Intern Test

Aplikasi web berbasis React + Typescript + Vite dengan backend menggunakan JSON Server untuk simulasi API.

## 📋 Prerequisites

Pastikan sistem Anda sudah terinstall:
- [Node.js](https://nodejs.org/) (versi 14 atau lebih tinggi)
- npm (biasanya sudah terinstall bersama Node.js)

## 🚀 Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/Yusufrhman/dwp-intern.git
   cd dwp-intern
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🎯 Menjalankan Aplikasi

Aplikasi ini membutuhkan 2 proses yang berjalan secara bersamaan:

### 1. Jalankan JSON Server (Backend)

Buka terminal pertama dan jalankan:

```bash
npx json-server db.json
```

JSON Server akan berjalan di `http://localhost:3000`

### 2. Jalankan React App (Frontend)

Buka terminal kedua dan jalankan:

```bash
npm run dev
```

Aplikasi React akan berjalan di `http://localhost:5173` (atau port lain yang tersedia)

## 👤 Akun Login

2 akun untuk testing:
### Admin Account
- **Role**: Admin
- **Phone**: 083183000267
- **Password**: `123456`

### Customer Account
- **Role**: Customer
- **Phone**: 08123456789
- **Password**: `123456`

## 🔧 Technologies Used

- **React** - Library Typescript untuk membangun UI
- **Vite** - Build tool yang cepat untuk modern web projects
- **JSON Server** - Simulasi REST API dengan JSON file
- **ESLint** - Linting tool untuk menjaga kualitas kode

## 📞 Support

Jika mengalami masalah, silakan buat issue di [GitHub Repository](https://github.com/Yusufrhman/dwp-intern/issues)

---

**Happy Coding! 🚀**
