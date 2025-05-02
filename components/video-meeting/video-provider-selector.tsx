"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { VideoProvider } from "@/lib/video-conferencing/video-service"
import { Video, Monitor, Calendar } from "lucide-react"

interface VideoProviderSelectorProps {
  onSelect: (provider: VideoProvider | null) => void
  selectedProvider: VideoProvider | null
}

export function VideoProviderSelector({ onSelect, selectedProvider }: VideoProviderSelectorProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base">Video Conferencing Platform</Label>
      <RadioGroup
        value={selectedProvider || ""}
        onValueChange={(value) => onSelect(value ? (value as VideoProvider) : null)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div
          className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-colors ${selectedProvider === "zoom" ? "border-teal-600 bg-teal-50" : "border-gray-200 hover:border-teal-300"}`}
        >
          <RadioGroupItem value="zoom" id="zoom" className="sr-only" />
          <Label htmlFor="zoom" className="cursor-pointer flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-medium">Zoom</span>
          </Label>
        </div>

        <div
          className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-colors ${selectedProvider === "teams" ? "border-teal-600 bg-teal-50" : "border-gray-200 hover:border-teal-300"}`}
        >
          <RadioGroupItem value="teams" id="teams" className="sr-only" />
          <Label htmlFor="teams" className="cursor-pointer flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Monitor className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-medium">Microsoft Teams</span>
          </Label>
        </div>

        <div
          className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-colors ${selectedProvider === "google-meet" ? "border-teal-600 bg-teal-50" : "border-gray-200 hover:border-teal-300"}`}
        >
          <RadioGroupItem value="google-meet" id="google-meet" className="sr-only" />
          <Label htmlFor="google-meet" className="cursor-pointer flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-medium">Google Meet</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
