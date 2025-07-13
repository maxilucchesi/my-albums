# discvault

🌐 [discvault.vercel.app](https://discvault.vercel.app/)

## Descripción

discvault es una aplicación simple para organizar y trackear álbumes musicales. Está pensada para registrar álbumes que escuchaste por primera vez de principio a fin, permitiendo calificarlos y mantener un registro personal de tus escuchas. La interfaz es minimalista y directa, buscando destacar el arte de tapa de cada disco.

## Stack tecnológico

- **[Next.js 15](https://nextjs.org/)** - Framework de React con App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos utilitarios
- **[Supabase](https://supabase.com/)** - Base de datos
- **[Radix UI](https://radix-ui.com/)** - Componentes primitivos
- **[Lucide React](https://lucide.dev/)** - Iconos
- **[Vercel](https://vercel.com/)** - Hosting

## Estructura del proyecto

```
src/
├── app/                 # App Router de Next.js
│   ├── globals.css     # Estilos globales
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página principal
├── components/         # Componentes React
│   ├── ui/            # Componentes UI reutilizables
│   ├── add-album-modal.tsx
│   ├── album-card.tsx
│   ├── album-grid.tsx
│   └── ...
├── lib/               # Utilidades y configuraciones
│   ├── supabase.ts    # Cliente de Supabase
│   └── utils.ts       # Funciones utilitarias
├── services/          # Servicios API
│   ├── albumService.ts
│   └── musicApi.ts
├── types/             # Definiciones de TypeScript
│   └── album.ts
└── data/              # Datos de ejemplo
    └── sample-albums.ts
```

## Contribuciones

Si querés contribuir al proyecto:

1. Hacé fork del repositorio
2. Creá una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commiteá tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Pusheá la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrí un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
