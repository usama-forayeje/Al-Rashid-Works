export default function HomeDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 border shadow-sm p-3 rounded">
        <span>Total Categories</span>
        <h2 className="text-2xl font-semibold">120</h2>
      </div>
      <div className="col-span-4 border shadow-sm p-3 rounded">
        <span>Total Products</span>
        <h2 className="text-2xl font-semibold">120</h2>
      </div>
      <div className="col-span-4 border shadow-sm p-3 rounded">
        <span>Total Users</span>
        <h2 className="text-2xl font-semibold">1200</h2>
      </div>
    </div>
  );
}
