import { ClassBadge } from '../ClassBadge';

export default function ClassBadgeExample() {
  return (
    <div className="flex gap-2 flex-wrap p-4">
      <ClassBadge type="geological" count={602} />
      <ClassBadge type="equipment" count={54} />
      <ClassBadge type="instruments" count={12} />
      <ClassBadge type="sample" count={50} />
    </div>
  );
}
