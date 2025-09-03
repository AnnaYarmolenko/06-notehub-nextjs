import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import css from './page.module.css';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/app/lib/api';

type Props = {
  params: {
    id: string;
  };
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: async () => fetchNoteById(id),
  });
  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id} />
      </HydrationBoundary>
    </div>
  );
}
