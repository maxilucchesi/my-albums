"use client"

import { useState, useEffect } from "react"
import type { Album } from "@/types/album"
import { AlbumCard } from "./album-card"
import { AddAlbumModal } from "./add-album-modal"
import { AlbumInfoModal } from "./album-info-modal"
import { albumService } from "@/services/albumService"

export function AlbumGrid() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load albums from Supabase on component mount
  useEffect(() => {
    loadAlbums()
  }, [])

  const loadAlbums = async () => {
    try {
      setIsLoading(true)
      const data = await albumService.getAlbums()
      setAlbums(data)
    } catch (error) {
      console.error('Error loading albums:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveAlbum = async (albumData: Partial<Album>) => {
    try {
      if (editingAlbum) {
        // Edit existing album
        const updatedAlbum = await albumService.updateAlbum(editingAlbum.id, albumData)
        if (updatedAlbum) {
          setAlbums((prev) => prev.map((album) => (album.id === editingAlbum.id ? updatedAlbum : album)))
        }
      } else {
        // Add new album
        const newAlbum = await albumService.addAlbum(albumData as Omit<Album, 'id' | 'created_at' | 'updated_at'>)
        if (newAlbum) {
          setAlbums((prev) => [newAlbum, ...prev])
        }
      }
      setEditingAlbum(null)
    } catch (error) {
      console.error('Error saving album:', error)
    }
  }

  const handleDeleteAlbum = async (album: Album) => {
    try {
      const success = await albumService.deleteAlbum(album.id)
      if (success) {
        setAlbums((prev) => prev.filter((a) => a.id !== album.id))
      }
    } catch (error) {
      console.error('Error deleting album:', error)
    }
  }

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album)
    setIsInfoModalOpen(true)
  }

  const handleEditFromInfo = (album: Album) => {
    setEditingAlbum(album)
    setIsAddModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingAlbum(null)
    setIsAddModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black font-mono text-sm">Cargando álbumes...</div>
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
        {albums.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 font-mono text-sm">No hay álbumes guardados</div>
            <div className="text-gray-400 font-mono text-xs mt-2">Haz click en "AGREGAR" para comenzar</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
            {albums.map((album, index) => (
              <AlbumCard 
                key={album.id} 
                album={album} 
                onEdit={handleAlbumClick}
                priority={index === 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* Album Info Modal */}
      <AlbumInfoModal
        album={selectedAlbum}
        isOpen={isInfoModalOpen}
        onClose={() => {
          setIsInfoModalOpen(false)
          setSelectedAlbum(null)
        }}
        onEdit={handleEditFromInfo}
        onDelete={handleDeleteAlbum}
      />

      {/* Add/Edit Modal */}
      <AddAlbumModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingAlbum(null)
        }}
        onSave={handleSaveAlbum}
        editingAlbum={editingAlbum}
      />
    </div>
  )
}
