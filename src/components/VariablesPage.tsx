import { Payment, columns } from "./columns.tsx"
import { DataTableDemo } from "./data-table.tsx"

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default function VariablesPage() {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      {/* <DataTableDemo columns={columns} data={data} /> */}
      <DataTableDemo />
    </div>
  )
}
