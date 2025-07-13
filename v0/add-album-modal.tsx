"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Album } from "@/types/album"
import { RatingStars } from "./rating-stars"
import { searchAlbums, getHighResArtwork, type iTunesAlbum } from "@/lib/itunes-api"

interface AddAlbumModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (album: Partial<Album>) => void
  editingAlbum?: Album | null
}

export function AddAlbumModal({ isOpen, onClose, onSave, editingAlbum }: AddAlbumModalProps) {
  const [searchQuery, setSearchQuery] = useState(editingAlbum ? `${editingAlbum.artist} ${editingAlbum.title}` : "")
  const [rating, setRating] = useState(editingAlbum?.rating || 0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<iTunesAlbum[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<iTunesAlbum | null>(null)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (query.length > 2) {
      setIsLoading(true)
      const results = await searchAlbums(query, 8)
      setSearchResults(results)
      setShowResults(results.length > 0)
      setIsLoading(false)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleSelectAlbum = (album: iTunesAlbum) => {
    setSelectedAlbum(album)
    setSearchQuery(`${album.artistName} - ${album.collectionName}`)
    setShowResults(false)
  }

  const handleSave = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)

    let albumData: Partial<Album>

    if (selectedAlbum) {
      albumData = {
        id: editingAlbum?.id || selectedAlbum.collectionId.toString(),
        title: selectedAlbum.collectionName,
        artist: selectedAlbum.artistName,
        artwork_url: getHighResArtwork(selectedAlbum.artworkUrl100, 600),
        rating,
        itunes_id: selectedAlbum.collectionId.toString(),
        created_at: editingAlbum?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    } else {
      // Fallback for manual entry
      const parts = searchQuery.split(" - ")
      albumData = {
        id: editingAlbum?.id || Date.now().toString(),
        title: parts[1] || searchQuery,
        artist: parts[0] || "Unknown Artist",
        artwork_url: "",
        rating,
        created_at: editingAlbum?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    onSave(albumData)
    setIsLoading(false)
    onClose()
    setSearchQuery("")
    setRating(0)
    setSelectedAlbum(null)
    setSearchResults([])
    setShowResults(false)
  }

  const handleClose = () => {
    onClose()
    setSearchQuery("")
    setRating(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md font-mono">
        <DialogHeader>
          <DialogTitle className="text-center font-normal">
            {editingAlbum ? "EDITAR ÁLBUM" : "AGREGAR ÁLBUM"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2 relative">
            <Label htmlFor="search" className="text-sm font-normal">
              Artista o Álbum
            </Label>
            <Input
              id="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar..."
              className="font-mono"
              disabled={isLoading}
            />

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((album) => (
                  <div
                    key={album.collectionId}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSelectAlbum(album)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={album.artworkUrl100 || "/placeholder.svg"}
                        alt={album.collectionName}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{album.collectionName}</div>
                        <div className="text-xs text-gray-600 truncate">{album.artistName}</div>
                        <div className="text-xs text-gray-400">{new Date(album.releaseDate).getFullYear()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isLoading && searchQuery.length > 2 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400 mx-auto"></div>
                <div className="text-sm text-gray-600 mt-2">Buscando...</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-normal">Rating</Label>
            <div className="flex justify-center">
              <RatingStars rating={rating} onChange={setRating} interactive size="lg" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            disabled={!searchQuery.trim() || isLoading}
            className="bg-black text-white hover:bg-gray-800 font-mono px-8"
          >
            {isLoading ? "GUARDANDO..." : "GUARDAR"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
