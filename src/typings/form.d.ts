export interface SortableAddAnotherChildProps {
  onDeleteFn: (index: number) => void;
  sortIndexMap: Map<string, number>;
  fieldId: string;
  postSortIndex: number;
}
