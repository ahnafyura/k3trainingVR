export default function WorkerModuleDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900">VR Training: {params.id}</h1>
      <p className="text-slate-600 mt-2">To be implemented</p>
    </div>
  );
}
