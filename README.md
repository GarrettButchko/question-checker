# Question Maker (Spec-Compliant)

A lightweight web tool for creating **multiple-choice questions** that conform exactly to the formatting and behavioral requirements of our course’s question system.

This tool was built to prevent common formatting errors and invalid question states before submission.

---

## Why This Exists

The course’s question system is **very strict** about:

- The number of answers per question  
- Marking answers as correct or incorrect  
- Maintaining a consistent structure across all questions  

This tool enforces those rules directly in the UI, ensuring questions work correctly with the professor’s system.

---

## Features

- Create questions with a fixed number of answers
- Mark answers as **Correct / Incorrect**
- Prevent invalid question configurations
- Simple, fast, distraction-free interface
- Used by multiple students and shared by course staff

---

## Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

Bootstrapped with `create-next-app` and customized for this specific use case.

---

## Getting Started (Local Development)

Install dependencies:

```bash
npm install

Run Developer Server
npm run dev

Then open your browser at:
http://localhost:3000

You can edit the main page here:
app/page.tsx
```

---

## Intended Use

This tool is intended for:
-- **Drafting questions before submission**
-- **Validating question structure**
-- **Avoiding formatting mistakes**

It does not submit questions automatically — it prepares them correctly.

---

## Disclaimer

This tool is not an official course product.
It is a student-built utility designed to assist with question preparation.



