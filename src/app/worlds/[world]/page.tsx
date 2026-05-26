import WorldPageTemplate from '@/components/worlds/WorldPageTemplate';

type WorldPageProps = {
  params: {
    world: string;
  };
};

export default function WorldPage({ params }: WorldPageProps) {
  return <WorldPageTemplate worldId={params.world} />;
}