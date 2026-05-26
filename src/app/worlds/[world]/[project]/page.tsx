interface PageProps {
  params: Promise<{
    world: string;
    project: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { world, project } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center text-white">
      <div>
        <h1 className="text-4xl font-bold">
          {world} / {project}
        </h1>
      </div>
    </main>
  );
}