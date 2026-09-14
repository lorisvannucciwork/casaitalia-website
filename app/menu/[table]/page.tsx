import { redirect } from 'next/navigation';

export default async function MenuTableRedirect({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const cleanTable = table.replace(/\D/g, '') || table;
  redirect(`/menu?table=${encodeURIComponent(cleanTable)}`);
}
