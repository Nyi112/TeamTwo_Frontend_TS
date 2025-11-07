/** @format */

export interface Branch {
  id: number;
  branchName: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface Building {
  id: number;
  branchId: number;
  branchName: string;
  buildingName: string;
  buildingCode: string;
  totalFloors: number;
  totalLeasableArea: number;
  createdAt: string;
  updatedAt: string;
}

export interface Level {
  id: number;
  buildingId: number;
  buildingName: string;
  levelName: string;
  levelNumber: number;
  totalRooms: number;
  createdAt: string;
  updatedAt: string;
}
