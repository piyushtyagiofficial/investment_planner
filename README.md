# Personal Investment Planner 

A modern, interactive React app that generates personalized investment strategies using Google Gemini AI. Visualize your financial plan, download reports, and explore your investment history—all in a beautiful, responsive UI.

---

## Screenshots:
![Landing_Image](https://drive.google.com/uc?export=view&id=1euThDbYJ9iPDxRus9wMAWN1xHiywwZpv)

![Investment_Plan_Image](https://drive.google.com/uc?export=view&id=1r1At2PkJBzgqBI03ISF2VOsLPYQdvVVM)

---

## Features

- **AI-Powered Planning:** Get investment suggestions based on your income and risk profile (Gemini API)
- **Interactive Charts:** Visualize your allocations with Pie Charts (Chart.js)
- **Download as PDF:** Export your plan for future reference
- **Investment History:** Review your previous strategies
- **Modern UI:** Responsive, animated, and accessible (Tailwind CSS, Framer Motion)
- **State Management:** Fast and simple state with Zustand

---

## Tech Stack

- **Frontend:** React, Zustand, Chart.js, jsPDF, Tailwind CSS, Framer Motion, Lucide Icons
- **AI:** Google Gemini API (direct client-side integration)
- **Build Tool:** Vite

---

## Installation

1. **Clone the repository**
    ```
    git clone https://github.com/your-username/investment_planner.git
    cd investment_planner
    ```

2. **Install dependencies**
    ```
    npm install
    ```

3. **Set up your Gemini API key**

    Create a `.env` file in the project root:
    ```
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```

4. **Start the development server**
    ```
    npm run dev
    ```
    The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Usage

1. Select your risk level and enter your monthly income.
2. Click **"Get Investment Plan"** to receive a personalized strategy.
3. View your plan in the interactive chart and investment history.
4. Download your plan as a PDF for future reference.

---



