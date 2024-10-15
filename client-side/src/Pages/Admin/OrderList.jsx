function OrderList() {
  return (
    <div className="min-h-screen my-5">
      <h1 className="text-3xl font-bold text-center">OrderList</h1>
      <div className="overflow-x-auto my-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200 shadow-xl text-xl rounded-lg">
              <th>Name</th>
              <th>Email</th>
              <th>Sevices</th>
              <th>Pay With</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
