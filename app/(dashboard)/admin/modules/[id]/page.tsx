export default function AdminModuleDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900">Module Detail: {params.id}</h1>
      <p className="text-slate-600 mt-2">To be implemented</p>
    </div>
  );
}
