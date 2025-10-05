import { FilterBar } from '../FilterBar';

export default function FilterBarExample() {
  return (
    <div className="p-4">
      <FilterBar
        onSearchChange={(search) => console.log('Search:', search)}
        onSortChange={(sort) => console.log('Sort:', sort)}
        onCameraFilter={(camera) => console.log('Camera:', camera)}
        onClassTypeFilter={(type) => console.log('Type:', type)}
      />
    </div>
  );
}
