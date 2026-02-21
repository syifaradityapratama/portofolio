# SOP: Security Configuration for Sanity Studio

## 1. Network-Level Protection (Implemented)

Middleware (`src/middleware.ts`) melindungi route `/studio` dengan HTTP Basic Authentication.

### Setup Environment Variables (Production)

```env
STUDIO_AUTH_USER=admin
STUDIO_AUTH_PASS=<generate-strong-password>
```

Generate password aman:

```bash
openssl rand -base64 32
```

> ⚠️ **WAJIB**: Set kedua variabel ini di platform hosting (Vercel/Railway) sebelum deploy.

---

## 2. Sanity Account Security (Manual — Admin Required)

### 2.1 Aktifkan MFA di Sanity

1. Login ke [manage.sanity.io](https://manage.sanity.io)
2. Klik avatar profil → **Account Settings**
3. Buka tab **Security**
4. Klik **Enable Two-Factor Authentication**
5. Pilih metode: **Authenticator App** (minimum) atau **Security Key/FIDO2** (recommended)
6. Scan QR code / daftarkan security key
7. Simpan **backup codes** di lokasi aman

### 2.2 Aktifkan FIDO2 / Security Key (Recommended)

1. Buka **Account Settings → Security**
2. Di bagian **Security Keys**, klik **Add Security Key**
3. Ikuti prompt browser untuk mendaftarkan key (YubiKey, Titan, dll)
4. **Tambahkan minimal 2 key** sebagai backup

### 2.3 Konfigurasi SSO (Enterprise)

Jika menggunakan Sanity Teams/Enterprise:

1. Buka **Organization Settings → Authentication**
2. Konfigurasi SSO provider (Google Workspace, Okta, dll)
3. Nonaktifkan login password setelah SSO aktif

---

## 3. CORS Configuration

1. Buka [manage.sanity.io](https://manage.sanity.io) → Project → **API** → **CORS Origins**
2. Pastikan **hanya domain production** yang terdaftar:
   - `https://syifaraditya.com`
   - `https://www.syifaraditya.com`
3. **Hapus** `http://localhost:*` sebelum production deploy (tambahkan kembali saat development)

---

## 4. API Token Rotation

1. Buka **API → Tokens**
2. Buat token baru dengan nama deskriptif + tanggal: `production-2026-02`
3. Update environment variable di hosting
4. **Revoke token lama** setelah memverifikasi token baru berfungsi
5. Ulangi setiap **90 hari** (quarterly rotation)

---

## 5. Security Checklist

| Item                               | Status       | Frequency       |
| ---------------------------------- | ------------ | --------------- |
| Basic Auth on /studio              | ☐ Configured | Once            |
| MFA enabled on Sanity account      | ☐ Configured | Once            |
| FIDO2 security key registered (2+) | ☐ Configured | Once            |
| CORS origins = production only     | ☐ Verified   | Per deploy      |
| API token rotation                 | ☐ Rotated    | Quarterly       |
| Backup codes stored securely       | ☐ Stored     | After MFA setup |
| Environment variables in hosting   | ☐ Verified   | Per deploy      |

> **Kebijakan Toleransi Nol**: Setiap admin yang mengakses CMS WAJIB memiliki MFA aktif.
> Kelalaian dalam konfigurasi keamanan adalah pelanggaran prosedur operasional.
