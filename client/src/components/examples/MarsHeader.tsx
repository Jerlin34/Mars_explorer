import { MarsHeader } from '../MarsHeader';

export default function MarsHeaderExample() {
  return (
    <div>
      <MarsHeader 
        title="Mars Image Explorer"
        subtitle="NASA Space Apps Challenge"
        onBack={() => console.log('Back clicked')}
        showMenu={true}
      />
      <div className="p-8">
        <p className="text-muted-foreground">Content below header...</p>
      </div>
    </div>
  );
}
