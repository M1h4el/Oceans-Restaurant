import DataTable from "react-data-table-component";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { Invoice } from "../../utils/invoices";

const columns = [
  {
    name: "ID",
    selector: (row: Invoice) => row.id,
    sortable: true,
    width: "80px",
  },
  {
    name: "FECHA",
    selector: (row: Invoice) => row.createdAt,
    format: (row: Invoice) =>
      format(parseISO(row.createdAt), "dd-MM-yyyy", { locale: es }),
    sortable: true,
  },
  {
    name: "ESTADO",
    selector: (row: Invoice) => row.order_status,
    cell: (row: Invoice) => (
      <span
        style={{
          color:
            row.order_status === "Entregado"
              ? "#2ecc71"
              : row.order_status === "Cancelado"
              ? "#e74c3c"
              : "#f39c12",
          fontWeight: 500,
        }}
      >
        {row.order_status}
      </span>
    ),
    sortable: true,
  },
  {
    name: "PRODUCTOS",
    selector: (row: Invoice) => row.items.length,
    sortable: true,
  },
  {
    name: "TOTAL",
    selector: (row: Invoice) => row.total,
    format: (row: Invoice) => `$${Number(row.total).toFixed(2)}`,
    sortable: true,
    right: true,
  },
  {
    name: "DETALLE",
    button: true,
    cell: (row: Invoice) => (
      <button
        onClick={() => alert(`Ver detalles de factura ${row.id}`)}
        style={{
          padding: "4px 8px",
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Ver
      </button>
    ),
  },
];

const InvoiceTable = ({ data }: { data: Invoice[] }) => {
  const ExpandedComponent = ({ data }: { data: Invoice }) => (
    <div style={{ padding: "20px" }}>
      <h4 style={{ margin: "5px 0" }}>Productos ({data.items.length})</h4>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8f9fa" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Código</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Producto</th>
            <th style={{ padding: "8px", textAlign: "right" }}>Cantidad</th>
            <th style={{ padding: "8px", textAlign: "right" }}>P. Unitario</th>
            <th style={{ padding: "8px", textAlign: "right" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px", textAlign: "left" }}>{item.code}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{item.name}</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                {item.quantity}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ${item.unit_price.toFixed(2)}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ${item.total_price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <DataTable
      title="Historial de Facturas"
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      striped
      responsive
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      defaultSortFieldId={1}
      customStyles={{
        headCells: {
          style: {
            backgroundColor: "#2c3e50",
            color: "white",
            fontSize: "1rem",
          },
        },
        rows: {
          highlightOnHoverStyle: {
            backgroundColor: "#e8f4fd",
          },
        },
      }}
    />
  );
};

export default InvoiceTable;
