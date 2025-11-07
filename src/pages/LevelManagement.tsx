/** @format */

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Layers } from "lucide-react";
import type { Level } from "../types/index.js";
import { levelApi } from "../api/api.js";
import LevelForm from "../components/LevelForm.js";

const LevelManagement: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    try {
      const response = await levelApi.getAll();
      setLevels(response.data);
    } catch (error) {
      console.error("Error loading levels:", error);
    }
  };

  const handleCreate = () => {
    setEditingLevel(null);
    setShowForm(true);
  };

  const handleEdit = (level: Level) => {
    setEditingLevel(level);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this level?")) {
      try {
        await levelApi.delete(id);
        loadLevels();
      } catch (error) {
        console.error("Error deleting level:", error);
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    loadLevels();
  };

  const filteredLevels = levels.filter(
    (level) =>
      level.levelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.buildingName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Level Management</h1>
          <p className="text-gray-600">Manage building levels and floors</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Level</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search levels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLevels.map((level) => (
          <div
            key={level.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Layers className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {level.levelName}
                  </h3>
                  <p className="text-sm text-gray-500">{level.buildingName}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(level)}
                  className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(level.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center space-x-2">
                <span className="font-medium">Level Number:</span>
                <span>{level.levelNumber}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="font-medium">Total Rooms:</span>
                <span>{level.totalRooms || 0}</span>
              </p>
              <p className="text-xs text-gray-400">
                Created: {new Date(level.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLevels.length === 0 && (
        <div className="text-center py-12">
          <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No levels found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by creating your first level"}
          </p>
          {!searchTerm && (
            <button
              onClick={handleCreate}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Level
            </button>
          )}
        </div>
      )}

      {/* Level Form Modal */}
      {showForm && (
        <LevelForm
          level={editingLevel}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default LevelManagement;
