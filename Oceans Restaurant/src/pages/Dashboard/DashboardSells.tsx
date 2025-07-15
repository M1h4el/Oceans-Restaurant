import InvoiceTable from '../../components/InvoiceTable/InvoiceTable'
import styles from './DashboardSells.module.scss'
import type { Invoice, InvoiceItem } from '../../utils/invoices';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/fetchData';

interface ApiResponse {
  data?: { data?: Invoice[] };
  ok: boolean;
  status: number;
}

interface NormalizedInvoice extends Omit<Invoice, 'items' | 'total'> {
  items: NormalizedInvoiceItem[];
  total: number;
}

interface NormalizedInvoiceItem extends Omit<InvoiceItem, 'unit_price' | 'total_price'> {
  unit_price: number;
  total_price: number;
}

function DashboardSells() {
  const [invoices, setInvoices] = useState<NormalizedInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response: ApiResponse = await fetchData('/invoices/', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const normalizeInvoiceData = (data: Invoice): NormalizedInvoice => ({
          ...data,
          total: typeof data.total === 'string' ? parseFloat(data.total) : data.total,
          items: data.items.map(item => ({
            ...item,
            unit_price: typeof item.unit_price === 'string' ? parseFloat(item.unit_price) : item.unit_price,
            total_price: typeof item.total_price === 'string' ? parseFloat(item.total_price) : item.total_price,
          })),
        });

        let invoicesData: Invoice[] = [];
        
        if (Array.isArray(response.data)) {
          invoicesData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          invoicesData = response.data.data;
        }

        setInvoices(invoicesData.map(normalizeInvoiceData));
      } catch (err) {
        console.error('Error fetching invoices:', err);
        setError('Error al cargar las facturas');
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return <div className={styles.container}>Cargando facturas...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <InvoiceTable data={invoices} />
    </div>
  );
}

export default DashboardSells;