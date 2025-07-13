import InvoiceTable from '../../components/InvoiceTable/InvoiceTable'
import styles from './DashboardSells.module.scss'
import { invoices } from '../../utils/invoices';

function DashboardSells() {
  return (
    <div className={styles.container}>
      <h1>Gestor de Facturas</h1>
      <InvoiceTable data={invoices} />
    </div>
  )
}

export default DashboardSells