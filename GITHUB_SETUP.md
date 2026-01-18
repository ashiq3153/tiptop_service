# GitHub এ Push করার নির্দেশনা

## Step 1: GitHub এ Repository তৈরি করুন

1. **GitHub এ login করুন**: https://github.com
2. **New repository** তৈরি করুন:
   - উপরের ডান কোণে "+" icon এ click করুন
   - "New repository" select করুন
3. **Repository details** দিন:
   - **Repository name**: `tiptop_service` (বা আপনার পছন্দমতো নাম)
   - **Description**: (optional) "Loan Application System"
   - **Public** বা **Private** select করুন
   - **DON'T** initialize with README, .gitignore, বা license (কারণ আমরা ইতিমধ্যে file আছে)
4. **"Create repository"** button click করুন

## Step 2: GitHub থেকে Repository URL copy করুন

Repository তৈরি করার পর GitHub আপনাকে URL দেখাবে:
- HTTPS: `https://github.com/YOUR_USERNAME/tiptop_service.git`
- SSH: `git@github.com:YOUR_USERNAME/tiptop_service.git`

**HTTPS URL copy করুন** (সাধারণত এটা সহজ)

## Step 3: Terminal এ Remote Add করুন

নিচের command টি run করুন (YOUR_USERNAME এবং YOUR_REPO_NAME replace করুন):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/tiptop_service.git
```

## Step 4: Code Push করুন

```bash
git branch -M main
git push -u origin main
```

আপনার GitHub username এবং password (বা token) দিতে হবে।

---

**Note:** যদি remote আগে থেকেই add করা থাকে, তাহলে `git remote -v` দিয়ে check করুন, এবং `git remote set-url origin <NEW_URL>` দিয়ে update করতে পারেন।
