# Swift Finance 💰

Modern desktop finance management application with clean architecture.

## ✨ Features

- 📊 **Financial Dashboard** - Real-time overview of your finances
- 💳 **Transaction Management** - Add, edit, delete transactions
- 🔍 **Advanced Filtering** - Search by text, type, date range
- 📈 **Visual Charts** - Track income vs expenses over time
- 🌙 **Dark Mode** - Eye-friendly interface
- 💾 **Smart Storage** - LocalStorage with TTL support
- ✅ **Type-Safe** - Full TypeScript coverage
- 🎨 **Responsive** - Works on all screen sizes

## 🛠️ Tech Stack

- **Svelte 5** - Reactive UI framework
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **Vite** - Build tool

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── services/        # Business logic
│   ├── stores/          # State management
│   └── components/      # UI components
├── routes/              # Pages
└── shared/types/        # TypeScript types
```

## 🎯 Architecture

Built with clean architecture principles:

- **Service Layer**: StorageService, ValidationService, ExportService
- **Store Layer**: Reactive state management with Svelte stores
- **Component Layer**: Atomic, reusable UI components
- **Type Layer**: Full TypeScript coverage

See `ARCHITECTURE.md` for details.

## 📄 License

MIT

## 👨‍💻 Author

Ioan - [GitHub](https://github.com/ioan-nomad)