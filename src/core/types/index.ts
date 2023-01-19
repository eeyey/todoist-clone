export interface IProject {
  id: number;
  title: string;
  color: string;
  archive: boolean;
  createdAt: number;
}

export interface ITodo {
  id: number;
  title: string;
  descr: string;
  projectId: number;
  labelsId: number[];
  priority: number;
  term: number | null;
  complete: boolean;
  createdAt: number;
}

export type GetProps<T> = T extends React.ComponentType<infer Props>
  ? Props
  : unknown;
