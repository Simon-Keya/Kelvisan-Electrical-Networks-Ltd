// app/page.tsx (or any other page)
import Subscribe from '../../components/Subscribe';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Other content */}
      <Subscribe />
      {/* Other content */}
    </main>
  );
}