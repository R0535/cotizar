'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useAppSelector } from '@/lib/hooks'

const sections = [
  { id: 1, name: 'Section 1' },
  { id: 2, name: 'Section 2' },
  { id: 3, name: 'Section 3' },
]

export default function FeatureIndex() {
  const features = useAppSelector(state => state.features.features)

  const [filters, setFilters] = useState({
    section: '',
    tag: '',
    color: '',
    minTime: 0,
    maxTime: 20,
  })
  const [groupBy, setGroupBy] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAndGroupedFeatures = useMemo(() => {
    let result = features?.filter(feature => 
      (filters.section ? feature.sectionId === parseInt(filters.section) : true) &&
      (filters.tag ? feature.tags === filters.tag : true) &&
      (filters.color ? feature.color === filters.color : true) &&
      (feature.timeBack + feature.timeFront >= filters.minTime) &&
      (feature.timeBack + feature.timeFront <= filters.maxTime) &&
      (searchTerm ? feature.label.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    )

    if (groupBy) {
      const grouped = result.reduce((acc, feature) => {
        const key = groupBy === 'section' ? sections.find(s => s.id === feature.sectionId)?.name :
                    groupBy === 'tag' ? feature.tags :
                    groupBy === 'color' ? feature.color : 'All'
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(feature)
        return acc
      }, {} as Record<string, typeof features>)
      return Object.entries(grouped)
    }

    return [['All', result]]
  }, [features, filters, groupBy, searchTerm])

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Features</h1>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/features/create">
              <Plus className="mr-2 h-4 w-4" /> Add New Feature
            </Link>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Customize your feature view
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="section">Section</Label>
                    <Select value={filters.section} onValueChange={(value) => handleFilterChange('section', value)}>
                      <SelectTrigger id="section" className="col-span-2 h-8">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Sections</SelectItem>
                        {sections.map(section => (
                          <SelectItem key={section.id} value={section.id.toString()}>{section.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="tag">Tag</Label>
                    <Select value={filters.tag} onValueChange={(value) => handleFilterChange('tag', value)}>
                      <SelectTrigger id="tag" className="col-span-2 h-8">
                        <SelectValue placeholder="Select tag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Tags</SelectItem>
                        <SelectItem value="UI">UI</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      type="color"
                      value={filters.color}
                      onChange={(e) => handleFilterChange('color', e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time Range</Label>
                    <Slider
                      min={0}
                      max={20}
                      step={0.1}
                      value={[filters.minTime, filters.maxTime]}
                      onValueChange={([min, max]) => {
                        handleFilterChange('minTime', min)
                        handleFilterChange('maxTime', max)
                      }}
                    />
                    <div className="flex justify-between text-sm">
                      <span>{filters.minTime.toFixed(1)}h</span>
                      <span>{filters.maxTime.toFixed(1)}h</span>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <Input
          type="text"
          placeholder="Search features..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={groupBy} onValueChange={setGroupBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Group by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Grouping</SelectItem>
            <SelectItem value="section">Section</SelectItem>
            <SelectItem value="tag">Tag</SelectItem>
            <SelectItem value="color">Color</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAndGroupedFeatures.map(([group, groupFeatures]) => (
        <div key={group} className="mb-8">
          {groupBy && <h2 className="text-2xl font-semibold mb-4">{group}</h2>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupFeatures.map((feature) => (
              <Card key={feature.id} className="flex flex-col">
                <div className="h-32 bg-gray-200 relative">
                  {feature.previews[0] && (
                    <img
                      src={feature.previews[0]}
                      alt={feature.label}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div
                    className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: feature.color }}
                  ></div>
                </div>
                <CardContent className="flex-grow p-4">
                  <h3 className="text-lg font-semibold mb-2">{feature.label}</h3>
                  <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Back: {feature.timeBack.toFixed(1)}h</span>
                    <span>Front: {feature.timeFront.toFixed(1)}h</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-medium">{sections.find(s => s.id === feature.sectionId)?.name}</span>
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded">{feature.tags}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}