# 📂 link-it-share-it

A simple and secure file-sharing SaaS platform built using modern web technologies and Supabase. "link-it-share-it" allows users to upload files and generate unique download links that can be shared with anyone. No account is needed to download the shared files, but uploading and managing files require user authentication powered by Supabase.

---

## 🚀 Features

- 🔐 **Authentication with Supabase**  
  Users can sign up, log in, and securely manage their sessions using Supabase Authentication.

- 📁 **File Uploads**  
  Once authenticated, users are redirected to their personalized dashboard where they can upload any type of file (within the size limit).

- 🔗 **Unique Shareable Links**  
  After uploading, the platform instantly generates a unique URL that can be copied and shared with anyone.

- 📥 **One-Click File Downloads**  
  Anyone with the unique link can view basic file info and download the file with a single click—no login required.

- 🌐 **Public File Access**  
  Recipients do not need an account to download files, making the process fast and frictionless.

- 🧰 **Supabase Storage Integration**  
  All uploaded files are securely stored and retrieved via Supabase Storage with real-time access.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js / React.js
- **Backend-as-a-Service**: Supabase
- **Authentication**: Supabase Auth (Email/Password, Social Login Optional)
- **Storage**: Supabase Bucket Storage
- **Styling**: Tailwind CSS

---

## 📂 Project Structure

```
link-it-share-it/
├── components/          # Reusable React components
├── pages/               # Next.js pages (e.g., index.js, dashboard.js)
├── supabase/            # Supabase client config and helpers
├── styles/              # CSS / Tailwind files
├── utils/               # Utility functions (e.g., link generator)
└── public/              # Public assets
```

---

## 🔧 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/pranavbafna586/link-it-share-it.git
   cd link-it-share-it
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Supabase**

   - Create a new project on [Supabase](https://supabase.com/).
   - Copy the project `URL` and `anon/public key`.
   - In your project, create a `.env.local` file and add:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up Supabase Storage**

   - Create a bucket (e.g., `user-files`) in the Supabase dashboard.
   - Configure the bucket with public access (or custom rules if preferred).

5. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 🧪 How It Works (User Flow)

1. **User signs up/logs in** using the Supabase Auth system.
2. After login, they are redirected to the dashboard.
3. On the dashboard, the user uploads a file.
4. A **unique URL** is generated and displayed.
5. The user shares the link with others.
6. The recipient opens the link → sees file info → clicks **Download**.
7. File download begins directly.

---
