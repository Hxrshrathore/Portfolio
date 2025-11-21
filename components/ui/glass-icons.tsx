"use client"

import { Grid, Globe, Palette, Brain, ImageIcon } from "lucide-react"

export interface GlassIconsProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function GlassIcons({ categories, selectedCategory, onCategoryChange }: GlassIconsProps) {
  const getIcon = (category: string) => {
    switch (category) {
      case "All":
        return <Grid className="w-5 h-5" />
      case "Web Designs":
        return <Globe className="w-5 h-5" />
      case "UI/UX Designs":
        return <Palette className="w-5 h-5" />
      case "AI/ML Projects":
        return <Brain className="w-5 h-5" />
      case "Graphics":
        return <ImageIcon className="w-5 h-5" />
      default:
        return <Grid className="w-5 h-5" />
    }
  }

  const getColor = (category: string) => {
    switch (category) {
      case "All":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "Web Designs":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "UI/UX Designs":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "AI/ML Projects":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Graphics":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-200
            ${
              selectedCategory === category
                ? `${getColor(category)} scale-105`
                : "bg-gray-800/30 text-gray-400 border-gray-700/30 hover:bg-gray-700/30"
            }
          `}
        >
          {getIcon(category)}
          <span className="text-sm font-medium">{category}</span>
        </button>
      ))}
    </div>
  )
}
