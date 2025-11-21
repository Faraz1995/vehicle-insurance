# Vehicle Insurance

A tool to check vehicle plate information and calculate the insurance quote.  
Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🚗 Features

- Check and validate vehicle plate numbers
- **Input masking for Iranian plate format** (e.g., `##ب###-##`)
- **Auto-convert Farsi digits** as the user types
- **RTL support** for Persian users
- **Clean Persian typography**
- Loading and error states
- Fetch vehicle data from a Mockoon-powered backend
- Calculate an estimated insurance quote
- Includes unit tests for the `insuranceQuoteCalculator` function

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Mockoon CLI** (for backend mock API)

---

## 📦 Installation

### 1. Clone the project

```bash
git clone https://github.com/Faraz1995/vehicle-insurance
cd vehicle-insurance
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Run Frontend

```bash
npm run dev
```

### 4. Run Backend

install mockoon cli

```bash
npm install -g @mockoon/cli
```

run mockoon server

```bash
npm run start-api
```

the server will be running on port 3000

---

## 📝 Testing

1. Unit tests
   for the `insuranceQuoteCalculator` function

```bash
npm run test
```

---

## 📝 Usage

1.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
