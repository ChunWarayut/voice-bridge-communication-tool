# Smart Voice – A Smart Communication Tool for Intubated Patients

## Developer

Developed by **ChunWarayut (Warayut Taekrathok)** – 2025

---

## Project Description

**Smart Voice** is a communication app designed specifically for intubated patients who are unable to speak. It allows patients to express their needs, feelings, and questions through a touchscreen interface that combines **images**, **text**, and **Text-to-Speech (TTS)**. The app supports **three languages**: Thai, Burmese, and English.

---

## Key Features & Flow

### ✅ Language Selection Page
- Users can choose between **Thai**, **Burmese**, and **English**

### ✅ Home Screen
- Displays 5 main categories as large, touch-friendly buttons:
  1. **Pain**
  2. **Feelings**
  3. **Needs**
  4. **Questions**
  5. **Beliefs**

---

## 🔹 Category 1: Pain
- Interactive **body map** for selecting pain location
- Pain severity using **Numeric Rating Scale (NRS)**:
  - 0 = No pain
  - 1–3 = Mild pain
  - 4–6 = Moderate pain
  - 7–10 = Severe pain
- Each level includes icon illustration

## 🔹 Category 2: Feelings
- Each option includes **image**, **text**, and **voice playback**:
  1. Cold
  2. Hot
  3. Tired
  4. Scared
  5. Itchy
  6. Dizzy
  7. Nauseous
  8. Thank you

## 🔹 Category 3: Needs
- Each option includes **image**, **text**, and **voice playback**
- Examples:  
  Change position, Blanket, See relatives, Drink water, Eat, See doctor, Turn lights on/off, Go home, Change clothes, Adjust bed, Suction, Urinate, Defecate, Untie hands, Remove breathing tube

## 🔹 Category 4: Patient Questions
- Example questions:
  - What’s wrong with me?
  - What day is it today?
  - How long will I be treated?
  - When can I go home?
  - Will I recover?
  - Where am I?
  - Who are you?
  - Is my family outside?

## 🔹 Category 5: Beliefs
- Example statements:
  - I want to chant
  - Listen to Dhamma
  - I trust the medical team
  - I want to perform a religious ritual

---

## ✅ Technical Requirements

- Text-to-Speech output in selected language
- Language switch available on all screens
- Clear, simple, **touch-friendly UI**
- **Responsive design** for mobile & tablet
- Easily extensible content system

---

## Technologies Used

- React (Next.js + TypeScript)
- Tailwind CSS
- shadcn-ui
- Text-to-Speech Web API
- i18n (Multilingual support)

---

## Development & Deployment

You can edit this project directly on [Lovable](https://lovable.dev/projects/5fca6518-65b0-40f5-95b8-4c179bdac920) or use your own IDE:

### To run locally:
```sh
git clone <YOUR_GIT_URL>
cd smart-voice
npm install
npm run dev
```

### Deploy:
On Lovable: Share → Publish  
Or manually via Vercel, Netlify, etc.

---

## Custom Domain

Yes! You can connect your custom domain in:  
**Project → Settings → Domains → Connect Domain**

More info: [Lovable Docs – Custom Domains](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

## 📱 Access the App via QR Code

Scan the QR code below to open the app directly:

![Smart Voice QR Code](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://easy-talk-phi.vercel.app/)

**URL:** [https://easy-talk-phi.vercel.app/](https://easy-talk-phi.vercel.app/)
