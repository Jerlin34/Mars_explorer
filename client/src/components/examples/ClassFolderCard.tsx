import { ClassFolderCard } from '../ClassFolderCard';

export default function ClassFolderCardExample() {
  const mockClass = {
    name: 'ground',
    cleanName: 'ground',
    count: 602,
    description: {
      description: 'Martian soil and surface terrain',
      scientific_interest: 'Geological composition, habitability',
      color: '#D2691E'
    },
    images: [{ id: 1 } as any],
    type: 'geological' as const
  };
  
  return (
    <div className="p-4 max-w-sm">
      <ClassFolderCard 
        classInfo={mockClass} 
        onClick={() => console.log('Card clicked')} 
      />
    </div>
  );
}
