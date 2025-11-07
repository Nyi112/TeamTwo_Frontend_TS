/** @format */

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Level, Building } from "../types/index.js";
import { levelApi, buildingApi } from "../api/api.js";

interface LevelFormProps {
  level?: Level | null;
  onClose: () => void;
  onSubmit: () => void;
}

const LevelForm: React.FC<LevelFormProps> = ({ level, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    buildingId: 0,
    levelName: "",
    levelNumber: 0,
    totalRooms: 0,
  });
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBuildings();
    if (level) {
      setFormData({
        buildingId: level.buildingId,
        levelName: level.levelName,
        levelNumber: level.levelNumber,
        totalRooms: level.totalRooms || 0,
      });
    }
  }, [level]);

  const loadBuildings = async () => {
    try {
      const response = await buildingApi.getAll();
      setBuildings(response.data);
    } catch (error) {
      console.error("Error loading buildings:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (level) {
        await levelApi.update(level.id, formData);
      } else {
        await levelApi.create(formData);
      }
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error saving level:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "buildingId" || name === "levelNumber" || name === "totalRooms"
          ? Number(value)
          : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {level ? "Edit Level" : "Add New Level"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Building *
            </label>
            <select
              name="buildingId"
              value={formData.buildingId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={0}>Select a building</option>
              {buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.buildingName} - {building.branchName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level Name *
            </label>
            <input
              type="text"
              name="levelName"
              value={formData.levelName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level Number *
            </label>
            <input
              type="number"
              name="levelNumber"
              value={formData.levelNumber}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Rooms
            </label>
            <input
              type="number"
              name="totalRooms"
              value={formData.totalRooms}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : level ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LevelForm;
