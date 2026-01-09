import React from 'react';
import { Download } from 'lucide-react';
import { PaymentRecord } from '../types/lease.types';
import { formatDate, formatCurrency } from '../utils/formatters';
import './PaymentRecordsTable.css';

interface PaymentRecordsTableProps {
  records: PaymentRecord[];
  onDownloadReceipt: (record: PaymentRecord) => void;
}

export const PaymentRecordsTable: React.FC<PaymentRecordsTableProps> = ({
  records,
  onDownloadReceipt,
}) => {
  if (!records || records.length === 0) {
    return (
      <div className="payment-records-empty">
        <p>No payment records available.</p>
      </div>
    );
  }

  return (
    <div className="payment-records-table-wrapper">
      <table className="payment-records-table">
        <thead>
          <tr>
            <th>Scheduled Date</th>
            <th>Actual Date</th>
            <th>Rent</th>
            <th>Maint. Fee</th>
            <th>Damage Deposit</th>
            <th>Total</th>
            <th>Bank Transaction #</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{formatDate(record.scheduledDate)}</td>
              <td>
                {record.actualDateOfPayment
                  ? formatDate(record.actualDateOfPayment)
                  : '-'}
              </td>
              <td>{formatCurrency(record.rent)}</td>
              <td>{formatCurrency(record.maintenanceFee)}</td>
              <td>{formatCurrency(record.damageDeposit)}</td>
              <td className="total-cell">{formatCurrency(record.totalPaidToHost)}</td>
              <td>{record.bankTransactionNumber || '-'}</td>
              <td>
                {record.receiptUrl ? (
                  <button
                    className="download-receipt-btn"
                    onClick={() => onDownloadReceipt(record)}
                    aria-label="Download receipt"
                  >
                    <Download size={16} />
                  </button>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentRecordsTable;
