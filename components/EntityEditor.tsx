"use client";

// #IMPORTS
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Save } from 'lucide-react';
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

  const [formData, setFormData] = useState({ name: '', description: '' });

  // #EFFECTS
  useEffect(() => {
    const entity = entities.find((e) => e.id === selectedEntityId);
    if (entity) {
      setFormData({ name: entity.name, description: entity.description });
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

  // #RENDER
  return (
    <div className="w-full h-full bg-white p-10 overflow-y-auto">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        
        {/* #HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <button 
            onClick={() => setSelectedEntityId(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {activeView}s</span>
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

        {/* #FORM */}
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
              placeholder={`Enter ${activeView} name...`}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all min-h-[200px] resize-y"
              placeholder={`Write a detailed description for this ${activeView}...`}
            />
          </div>
        </div>

      </div>
    </div>
  );
}