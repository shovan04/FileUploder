# 🗂️ Custom File Uploader — Like AWS S3 Pre-Signed URLs

A lightweight, secure, and self-hosted file uploader built with **Express**, **TypeScript**, and **Multer**, inspired by AWS S3’s pre-signed URL concept — but without any external cloud dependencies.

Admins (or authorized clients) can request a **signed upload URL** with an expiry time and a one-time encrypted filename.
Clients then upload directly to your VPS using this signed link — no direct backend file handling, no unsafe endpoints.

---

## ⚙️ Features

* 🔐 **Pre-Signed Upload URLs**

  * Upload files securely using temporary signed links.
  * Prevent unauthorized or expired uploads.

* 🧩 **Encrypted Filename System**

  * File names are generated, salted, and encrypted before upload.
  * Verification occurs server-side to ensure authenticity.

* 🕵️ **Signature Verification**

  * HMAC-SHA256 signing based on a secret key, expiry, and file metadata.
  * Every upload request is verified and time-bound.

* 🧱 **Multer Integration**

  * Handles single and multiple file uploads.
  * Supports MIME type validation and file size restrictions.

* 🧮 **DTO-Based Validation**

  * Built using `class-validator` and `class-transformer` for request data safety.

* ⚡ **Global Error Handling**

  * Structured `ResponseDTO` and `ErrorResponseDTO` provide uniform error responses across routes.

---

## 🧰 Tech Stack

* **Node.js** + **TypeScript**
* **Express.js**
* **Multer**
* **Class-Validator**
* **Crypto (HMAC-SHA256)**
* **dotenv**
* **CORS & Cookie-Parser**

---

## 🚀 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/shovan04/FileUploder.git
cd FileUploder
```

### 2. Install dependencies

Using **pnpm** (recommended):

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

### 3. Create an `.env` file

```bash
PORT=8000
HOST=localhost
BASE_API_PATH=/api/v1
BACKEND_URI=http://localhost:8000
COOKIE_SECRET=cookie_secret
FILE_UPLOAD_SIGNATURE_SECRET=your-super-secret-key
FILE_ENCRYPTION_KEY=your-super-secret-key
FILE_UPLOADER_ISE=your-super-secret

```

### 4. Run the project

```bash
pnpm dev
```

Build & start for production:

```bash
pnpm build && pnpm start
```

---

## 🧩 How It Works

1. **Client requests** a pre-signed upload URL with filename, type, and expiry.
2. **Server generates** a secure HMAC signature and returns the upload URL:

   ```
   /api/v1/files/presigned-file-upload?filename=<encrypted_name>&type=multiple&expiry=<timestamp>&sig=<signature>
   ```
3. **Client uploads** directly to that URL using multipart/form-data.
4. **Middleware validates** the signature, expiry, and upload policy.
5. **Multer stores** files locally in the `/files` directory (configurable).

---

## 🛡️ Security Design

* All filenames are **encrypted** and **validated** against tampering.
* Upload requests expire automatically after their signed timestamp.
* Unauthorized, expired, or malformed requests are rejected instantly.
* Prevents re-uploads using already used filenames.

---

## 🧱 Project Structure

```
src/
├── constants/
│   └── FileUploadOptions.ts
├── controllers/
│   └── fileUpload.controller.ts
├── middleware/
│   ├── multer.middleware.ts
│   ├── validateDTOs.ts
│   ├── globalErrorHandler.ts
│   └── fileUpload.middleware.ts
├── DTOs/
│   ├── response.DTO.ts
│   ├── errorResponse.DTO.ts
│   └── constraintValidationErrorResponse.DTO.ts
├── utils/
│   └── signature.ts
├── routes/
│   └── file.routes.ts
└── bin/
    └── app.ts
```

---

## 🧪 Example Response

**✅ Success**

```json
{
  "status": true,
  "message": "File uploaded successfully",
  "data": {
    "files": [
      "secure_filename_1761639926665_chatgpt_image.png"
    ]
  }
}
```

**❌ Error**

```json
{
  "status": false,
  "message": "An error occurred",
  "data": {
    "status": 400,
    "apiPath": "/api/v1/files/presigned-file-upload",
    "message": "Invalid signature.",
    "timestamp": "2025-10-28T06:30:46.559Z"
  }
}
```

---

## 🧑‍💻 Developer Notes

* Uses **HMAC-SHA256** to sign and verify data integrity.
* Upload requests are **self-contained**, needing no database check.
* Can easily integrate with a **frontend or admin dashboard** to issue signed links dynamically.

---

## 🪪 License

This project is licensed under the **MIT License**.

---

## 💬 Author

**Shovan Mondal (Shovan04)**
🚀 Backend Developer | Cybersecurity Enthusiast
🌐 [GitHub](https://github.com/shovan04) | 💭 “If it’s tech or taste, I’m always bringing flavor to the table.”
