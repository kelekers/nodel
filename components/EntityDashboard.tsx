"use client";

// #IMPORTS
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  UserRound, 
  ToolCase, 
  MountainSnow, 
  MoreHorizontal,
  Search,
  X
} from 'lucide-react';
import useStore from '../store/useStore';
import EntityEditor from './EntityEditor';

// #COMPONENT
export default function EntityDashboard() {
  // #STATE
  const activeView = useStore((state) => state.activeView);
  const entities = useStore((state) => state.entities);
  const addEntity = useStore((state) => state.addEntity);
  const selectedEntityId = useStore((state) => state.selectedEntityId);
  const setSelectedEntityId = useStore((state) => state.setSelectedEntityId);

  // Local state for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // #EFFECTS
  // Reset search and filter when switching views (e.g., from Character to Item)
  useEffect(() => {
    setSearchQuery('');
    setSelectedTag(null);
  }, [activeView]);

  // #DERIVED_DATA
  const baseEntities = entities.filter(e => e.type === activeView);
  
  // Extract all unique tags for the filter UI
  const allTags = Array.from(new Set(baseEntities.flatMap(e => e.tags || []))).sort();

  // Apply search and tag filters
  const filteredEntities = baseEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (entity.description && entity.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag ? (entity.tags && entity.tags.includes(selectedTag)) : true;
    
    return matchesSearch && matchesTag;
  });

  // #HANDLERS
  const handleAddNew = () => {
    if (activeView === 'canvas') return;
    
    const newId = Math.random().toString();
    addEntity({
      id: newId,
      type: activeView as 'character' | 'item' | 'location',
      name: `Untitled ${activeView}`,
      description: '',
      content: '',
      imageUrl: '',
      tags: [],
      attributes: []
    });
    setSelectedEntityId(newId);
  };

  const getIcon = () => {
    switch (activeView) {
      case 'character': return <UserRound className="w-8 h-8 text-gray-400" />;
      case 'item': return <ToolCase className="w-8 h-8 text-gray-400" />;
      case 'location': return <MountainSnow className="w-8 h-8 text-gray-400" />;
      default: return null;
    }
  };

  // #RENDER
  if (selectedEntityId) {
    return <EntityEditor />;
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-white p-10">
      
      {/* #HEADER */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            {getIcon()}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize tracking-tight">
            {activeView}s
          </h1>
        </div>
        
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#f97316] text-white px-8 py-2 rounded-lg shadow-sm hover:bg-[#ea580c] transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New</span>
        </button>
      </div>

      {/* #SEARCH_AND_FILTER */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs flex-shrink-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder={`Search ${activeView}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all bg-gray-50 focus:bg-white"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">Filter:</span>
            <button 
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                selectedTag === null 
                  ? 'bg-gray-800 text-white border-gray-800 shadow-sm' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  selectedTag === tag 
                    ? 'bg-[#fff7ed] text-[#ea580c] border-[#f97316]/30 shadow-sm' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* #GALLERY_GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEntities.map((entity) => (
          <div 
            key={entity.id} 
            onClick={() => setSelectedEntityId(entity.id)}
            className="group flex flex-col bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-[#f97316]/50 transition-all cursor-pointer overflow-hidden min-h-[220px]"
          >
            {/* #CARD_IMAGE */}
            {entity.imageUrl ? (
              <div className="w-full h-32 bg-gray-100 relative border-b border-gray-100">
                <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 text-white bg-black/30 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-5 pb-0 flex items-start justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
                  {activeView === 'character' && <UserRound className="w-5 h-5 text-gray-500" />}
                  {activeView === 'item' && <ToolCase className="w-5 h-5 text-gray-500" />}
                  {activeView === 'location' && <MountainSnow className="w-5 h-5 text-gray-500" />}
                </div>
                <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* #CARD_CONTENT */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {entity.name}
              </h3>
              
              {/* #CARD_TAGS */}
              {entity.tags && entity.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {entity.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                  {entity.tags.length > 2 && (
                    <span className="text-[10px] font-medium bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded">
                      +{entity.tags.length - 2}
                    </span>
                  )}
                </div>
              )}

              <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-1">
                {entity.description || 'No description provided.'}
              </p>

              {/* #CARD_ATTRIBUTES_PREVIEW */}
              {entity.attributes && entity.attributes.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-1.5">
                  {entity.attributes.slice(0, 2).map(attr => (
                    <div key={attr.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-medium truncate pr-2 w-1/3">{attr.key}</span>
                      <span className="text-gray-700 truncate text-right w-2/3">{attr.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredEntities.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-sm">
              {searchQuery || selectedTag ? `No ${activeView}s match your search or filter.` : `No ${activeView}s created yet.`}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}