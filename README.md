# 🎵 DiscVault

**Tu colección musical personal, organizada y elegante.**

DiscVault es una aplicación web moderna para gestionar y catalogar tu colección de álbumes musicales. Busca, agrega, califica y organiza tus álbumes favoritos en una interfaz intuitiva y hermosa.

## 🚀 Demo en Vivo

**[🎧 Visita DiscVault](https://discvault.vercel.app/)**

## ✨ Características Principales

- **🔍 Búsqueda inteligente** - Encuentra álbumes desde iTunes y MusicBrainz
- **⭐ Sistema de calificaciones** - Califica tus álbumes con 1-5 estrellas
- **🎨 Interfaz elegante** - Diseño limpio y responsivo
- **📱 Completamente responsiva** - Funciona perfectamente en móviles y desktop
- **💾 Persistencia de datos** - Guarda tu colección en Supabase
- **🎵 Artwork de alta calidad** - Imágenes optimizadas de portadas de álbumes
- **⚡ Rendimiento optimizado** - Construido con Next.js 15 y Turbopack

## 🛠️ Tecnologías Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework de React con App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos utilitarios
- **[Supabase](https://supabase.com/)** - Base de datos y autenticación
- **[Radix UI](https://radix-ui.com/)** - Componentes primitivos accesibles
- **[Lucide React](https://lucide.dev/)** - Iconos SVG
- **[Vercel](https://vercel.com/)** - Deployment y hosting

## 📸 Capturas de Pantalla

### Página Principal
- Visualización en grid de tu colección
- Búsqueda y filtros intuitivos
- Interfaz limpia y organizada

### Agregar Álbum
- Búsqueda en tiempo real
- Autocompletado desde APIs musicales
- Selección de artwork automática

### Detalles del Álbum
- Información completa del álbum
- Sistema de calificaciones
- Opciones de edición y eliminación

## 🚀 Instalación Local

### Prerrequisitos
- Node.js 18+ instalado
- Una cuenta en [Supabase](https://supabase.com/)

### 1. Clona el repositorio
```bash
git clone https://github.com/maxilucchesi/my-albums.git
cd my-albums
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura las variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 4. Configura la base de datos
Ejecuta el siguiente SQL en tu proyecto de Supabase:

```sql
-- Crear tabla de álbumes
CREATE TABLE albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  artist VARCHAR NOT NULL,
  artwork_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  itunes_id VARCHAR,
  musicbrainz_id VARCHAR,
  release_year VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

-- Crear política para acceso público (ajusta según tus necesidades)
CREATE POLICY "Allow public access" ON albums FOR ALL USING (true);
```

### 5. Ejecuta la aplicación
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

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

## 🎯 Cómo Usar

1. **Agregar álbumes**: Haz clic en "AGREGAR" y busca tu álbum favorito
2. **Calificar**: Usa las estrellas para calificar tus álbumes
3. **Ver detalles**: Haz clic en cualquier álbum para ver más información
4. **Organizar**: Tu colección se guarda automáticamente

## 🚀 Deployment

La aplicación está desplegada en Vercel. Para tu propia instancia:

1. Haz fork del repositorio
2. Conecta tu repo a Vercel
3. Configura las variables de entorno en Vercel
4. ¡Deploy automático!

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejoras:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **[iTunes API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)**
- **[MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)**
- **[Supabase](https://supabase.com/)** por la increíble plataforma
- **[Vercel](https://vercel.com/)** por el hosting gratuito
- **[shadcn/ui](https://ui.shadcn.com/)** por los componentes base

---

**Desarrollado con ❤️ para amantes de la música** 🎵

¿Encontraste algún problema? [Reporta un issue](https://github.com/maxilucchesi/my-albums/issues)
