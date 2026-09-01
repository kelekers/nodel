"use client";

// #IMPORTS
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Trash2, Save, Image as ImageIcon, X, Plus } from 'lucide-react';
import useStore from '../store/useStore';

// #COMPONENT
export default function EntityEditor() {
  // #STATE
  const activeView = useStore((state) => state.activeView);
  const entities = useStore((state) => state.entities);
  const selectedEntityId = useStore((state) => state.selectedEntityId);
  const updateEntity = useStore((state) => state.updateEntity);
  const deleteEntity = useStore((state) => state.deleteEntity);
  const setSelectedEntityId = useStore((state) => state.setSelectedEntityId);

  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    content: '', 
    imageUrl: '', 
    tags: [] as string[],
    attributes: [] as { id: string, key: string, value: string }[]
  });
  const [tagInput, setTagInput] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // #EFFECTS
  useEffect(() => {
    const entity = entities.find((e) => e.id === selectedEntityId);
    if (entity) {
      setFormData({ 
        name: entity.name || '', 
        description: entity.description || '',
        content: entity.content || '',
        imageUrl: entity.imageUrl || '',
        tags: entity.tags || [],
        attributes: entity.attributes || []
      });
    }
  }, [selectedEntityId, entities]);

  // #HANDLERS
  const handleSave = () => {
    if (selectedEntityId) {
      updateEntity(selectedEntityId, formData);
      setSelectedEntityId(null);
    }
  };

  const handleDelete = () => {
    if (selectedEntityId) {
      deleteEntity(selectedEntityId);
      setSelectedEntityId(null);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { id: Math.random().toString(), key: '', value: '' }]
    });
  };

  const handleUpdateAttribute = (id: string, field: 'key' | 'value', newValue: string) => {
    setFormData({
      ...formData,
      attributes: formData.attributes.map(attr => 
        attr.id === id ? { ...attr, [field]: newValue } : attr
      )
    });
  };

  const handleRemoveAttribute = (id: string) => {
    setFormData({
      ...formData,
      attributes: formData.attributes.filter(attr => attr.id !== id)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData({ ...formData, imageUrl: '' });
  };

  // #RENDER
  return (
    <div className="w-full h-full bg-white p-10 overflow-y-auto">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-20">
        
        {/* #HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <button 
            onClick={() => setSelectedEntityId(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="capitalize">Back to {activeView}s</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-red-100"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#f97316] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-[#ea580c] transition-colors text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* #FORM_CORE */}
        <div className="flex gap-6 mt-2">
          {/* #IMAGE_PLACEHOLDER */}
          <div className="flex-shrink-0 relative">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div 
              onClick={handleImageClick}
              className="w-40 h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer group overflow-hidden relative"
            >
              {formData.imageUrl ? (
                <>
                  <img src={formData.imageUrl} alt="Entity cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Change</span>
                  </div>
                  <button 
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Add Image</span>
                </>
              )}
            </div>
          </div>

          {/* #BASIC_INFO */}
          <div className="flex-1 flex flex-col gap-4">
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-0 py-2 border-none bg-transparent text-3xl font-bold text-gray-900 focus:outline-none focus:ring-0 placeholder-gray-300"
              placeholder={`Untitled ${activeView}`}
            />
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Short Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all resize-none"
                placeholder="A brief summary..."
                rows={2}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tags</label>
              <div className="flex flex-wrap gap-2 items-center min-h-[36px] px-3 py-1.5 border border-gray-200 rounded-lg bg-white focus-within:ring-2 focus-within:ring-[#f97316]/20 focus-within:border-[#f97316] transition-all">
                {formData.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="flex-1 min-w-[100px] bg-transparent text-sm focus:outline-none"
                  placeholder={formData.tags.length === 0 ? "Type and press Enter to add tags..." : ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100 my-2" />

        {/* #MAIN_CONTENT */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">Content / Notes</label>
          <textarea 
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all min-h-[300px] resize-y leading-relaxed"
            placeholder="Write backstory, detailed lore, or extended notes here..."
          />
        </div>

        <div className="h-px w-full bg-gray-100 my-2" />

        {/* #ATTRIBUTES_SECTION */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">Attributes</label>
            <button 
              onClick={handleAddAttribute}
              className="flex items-center gap-1.5 text-sm text-[#f97316] hover:text-[#ea580c] font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Attribute</span>
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            {formData.attributes.map((attr) => (
              <div key={attr.id} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={attr.key}
                  onChange={(e) => handleUpdateAttribute(attr.id, 'key', e.target.value)}
                  placeholder="e.g. Look, Age, Material"
                  className="w-1/3 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all bg-gray-50"
                />
                <input 
                  type="text" 
                  value={attr.value}
                  onChange={(e) => handleUpdateAttribute(attr.id, 'value', e.target.value)}
                  placeholder="Value..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
                />
                <button 
                  onClick={() => handleRemoveAttribute(attr.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {formData.attributes.length === 0 && (
              <div className="py-6 border-2 border-dashed border-gray-100 rounded-xl text-center flex flex-col items-center justify-center gap-2 text-gray-400">
                <span className="text-sm">No custom attributes defined.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}