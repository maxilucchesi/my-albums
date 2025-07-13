# discvault

🌐 [discvault.vercel.app](https://discvault.vercel.app/)

## descripción

discvault es una aplicación simple para organizar y trackear álbumes musicales. está pensada para registrar álbumes que escuchaste por primera vez de principio a fin, permitiendo calificarlos y mantener un registro personal de tus escuchas. la interfaz es minimalista y directa, buscando destacar el arte de tapa de cada disco.

## stack tecnológico

- **[Next.js 15](https://nextjs.org/)** - framework de React con App Router
- **[TypeScript](https://www.typescriptlang.org/)** - tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - estilos utilitarios
- **[Supabase](https://supabase.com/)** - base de datos
- **[Radix UI](https://radix-ui.com/)** - componentes primitivos
- **[Lucide React](https://lucide.dev/)** - iconos
- **[Vercel](https://vercel.com/)** - hosting

## estructura del proyecto

```
src/
├── app/                 # app router de next.js
│   ├── globals.css     # estilos globales
│   ├── layout.tsx      # layout principal
│   └── page.tsx        # página principal
├── components/         # componentes react
│   ├── ui/            # componentes ui reutilizables
│   ├── add-album-modal.tsx
│   ├── album-card.tsx
│   ├── album-grid.tsx
│   └── ...
├── lib/               # utilidades y configuraciones
│   ├── supabase.ts    # cliente de supabase
│   └── utils.ts       # funciones utilitarias
├── services/          # servicios api
│   ├── albumService.ts
│   └── musicApi.ts
├── types/             # definiciones de typescript
│   └── album.ts
└── data/              # datos de ejemplo
    └── sample-albums.ts
```

## contribuciones

si querés contribuir al proyecto:

1. hacé fork del repositorio
2. creá una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. commiteá tus cambios (`git commit -m 'agregar nueva funcionalidad'`)
4. pusheá la rama (`git push origin feature/nueva-funcionalidad`)
5. abrí un pull request

## licencia

este proyecto está bajo la licencia MIT.
