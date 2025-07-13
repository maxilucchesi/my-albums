"use client"

import { useState } from "react"
import type { Album } from "@/types/album"
import { AlbumCard } from "./album-card"
import { AddAlbumModal } from "./add-album-modal"

interface AlbumGridProps {
  albums: Album[]
}

export function AlbumGrid({ albums: initialAlbums }: AlbumGridProps) {
  const [albums, setAlbums] = useState(initialAlbums)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null)

  const handleSaveAlbum = (albumData: Partial<Album>) => {
    if (editingAlbum) {
      // Edit existing album
      setAlbums((prev) => prev.map((album) => (album.id === editingAlbum.id ? { ...album, ...albumData } : album)))
    } else {
      // Add new album
      setAlbums((prev) => [...prev, albumData as Album])
    }
    setEditingAlbum(null)
  }

  const handleEditAlbum = (album: Album) => {
    setEditingAlbum(album)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingAlbum(null)
    setIsModalOpen(true)
  }

  if (!initialAlbums || initialAlbums.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
          <div className="text-sm text-gray-600 font-mono">Cargando álbumes...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Add button */}
      <div className="text-center py-8">
        <button onClick={handleAddNew} className="text-black font-mono text-sm hover:opacity-70 transition-opacity">
          AGREGAR
        </button>
      </div>

      {/* Albums grid */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} onEdit={handleEditAlbum} />
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AddAlbumModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingAlbum(null)
        }}
        onSave={handleSaveAlbum}
        editingAlbum={editingAlbum}
      />
    </div>
  )
}
