# ✅ Pre-Commit Checklist

Before committing, make sure you go through each item:

### 🔄 Update & Sync

* [ ] Pull the latest changes before starting work.
* [ ] Run `pnpm i` after pulling to ensure all packages are installed.
* [ ] Resolve any merge conflicts.

### 🧩 Component Reuse

* [ ] Check if the component already exists in `components/UI`.
* [ ] If not, check Shadcn docs before creating a new one.
* [ ] **Do not re-create these components** (already added to `components/UI`):

  * `Button`, `Form`, `Input`, `Select`, `Dropdown`, `Combobox`, `Tabs`, `Tables`,
  * `Avatar`, `Toast`, `Badge`, `Calendar`, `Card`, `Checkbox`,
  * `Collapsible`, `DatePicker`, `DateSelector`, and more.

### 🛡️ Forms & Validation

* [ ] Use `react-hook-form` with `zod` for validation.
* [ ] Follow existing examples (`RegisterForm`, `LoginForm`, `CreateCourse`).

### 🎨 Consistent UI

* [ ] Use unified UI components from `components/UI`.
* [ ] Avoid raw HTML inputs and duplicate styles.

### 📦 Code Quality

* [ ] Types are clear (no unnecessary `any`).
* [ ] No duplicate logic or repeated components.
* [ ] Add comments where logic may confuse others.

### 👤 User-Friendly

* [ ] Test in the browser: check responsiveness, alignment, and spacing.
* [ ] Ensure errors are displayed clearly (form vs. server errors).

### 🛠️ Pre-Commit Commands

* [ ] Run `npm run check-all` before committing (lint, type-check, format, etc.).
* [ ] Run `npm run build` to ensure the project builds successfully.

---

⚡ **Final Check:**
👉 Would another teammate easily understand and extend this code?

