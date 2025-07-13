# discvault

🌐 [discvault.vercel.app](https://discvault.vercel.app/)

## description

log albums you’ve listened to from start to finish, rate them, and keep your own listening history. with a minimalist interface that puts each artwork front and center, **discvault** turns your curiosity for discovering music into a unique visual archive.

## tech stack

- **[Next.js 15](https://nextjs.org/)** - react framework with app router
- **[TypeScript](https://www.typescriptlang.org/)** - static typing
- **[Tailwind CSS](https://tailwindcss.com/)** - utility-first styling
- **[Supabase](https://supabase.com/)** - database
- **[Radix UI](https://radix-ui.com/)** - primitive components
- **[Lucide React](https://lucide.dev/)** - icons
- **[Vercel](https://vercel.com/)** - hosting

## project structure

```
src/
├── app/                 # next.js app router
│   ├── globals.css     # global styles
│   ├── layout.tsx      # main layout
│   └── page.tsx        # main page
├── components/         # react components
│   ├── ui/            # reusable ui components
│   ├── add-album-modal.tsx
│   ├── album-card.tsx
│   ├── album-grid.tsx
│   └── ...
├── lib/               # utilities and configurations
│   ├── supabase.ts    # supabase client
│   └── utils.ts       # utility functions
├── services/          # api services
│   ├── albumService.ts
│   └── musicApi.ts
├── types/             # typescript definitions
│   └── album.ts
└── data/              # sample data
    └── sample-albums.ts
```

## contributions

if you want to contribute to the project:

1. fork the repository
2. create a branch for your feature (`git checkout -b feature/new-feature`)
3. commit your changes (`git commit -m 'add new feature'`)
4. push the branch (`git push origin feature/new-feature`)
5. open a pull request

## license

this project is under the MIT license.
