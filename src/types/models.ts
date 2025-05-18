export interface Hero {
  name: string;
  status: boolean;
  species: string;
  type: string;
  gender: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface HeroesList {
  info: Info;
  results: Hero[];
}

export interface Pagination {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
}

export interface RequestProp {
  pagination: Pagination;
  filter: string | object;
  getCellValue: () => void;
}

export enum StatusBadgeColor {
  Alive = 'green',
  Dead = 'red',
  unknown = 'orange',
  None = 'grey',
}

export interface Episode {
  episode: string;
  name: string;
}

export interface Origin {
  type: string;
  name: string;
}

export interface Location {
  type: string;
  name: string;
}
