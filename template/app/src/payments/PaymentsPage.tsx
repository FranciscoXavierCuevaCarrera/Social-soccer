import React, { useState } from 'react';
import { CreditCard, DollarSign, Ticket, CheckCircle2, History, QrCode, ArrowUpRight } from 'lucide-react';
import ThemeToggle from '../client/components/ThemeToggle';

export function PaymentsPage() {
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'COMPLETED'>('PENDING');
  const [selectedMethod, setSelectedMethod] = useState<'DEUNA' | 'CARD' | 'TRANSFER'>('DEUNA');
  const [showTicketModal, setShowTicketModal] = useState(false);

  const transactions = [
    {
      id: 'PAY-9041',
      date: '27 de Julio, 2026',
      concept: 'Vocalía Partido vs Atlético San Roque',
      amount: 5.00,
      method: 'Deuna (QR)',
      status: 'COMPLETED',
    },
    {
      id: 'PAY-8820',
      date: '15 de Julio, 2026',
      concept: 'Inscripción Anual Torneo Interligas 2026',
      amount: 25.00,
      method: 'Tarjeta de Crédito',
      status: 'COMPLETED',
    },
    {
      id: 'PAY-7102',
      date: '02 de Julio, 2026',
      concept: 'Multa Tarjeta Amarilla (Fecha 4)',
      amount: 2.50,
      method: 'Transferencia',
      status: 'COMPLETED',
    },
  ];

  const handlePayVocalia = () => {
    setPaymentStatus('COMPLETED');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-7 h-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-bold tracking-tight">Fintech & Ticketing Digital</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Cobro transparente de vocalías ($5.00), multas y entradas con Deuna / Tarjeta
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vocalía Pay Card (2 Cols) */}
        <div className="md:col-span-2 rounded-xl border p-6 shadow-xl transition-all duration-300
          bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700"
        >
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#FF6B35]">Pago de Vocalía de Partido</span>
              <h2 className="text-lg font-bold text-[#1D3557] dark:text-white">Fecha 5: El Batán vs San Roque</h2>
            </div>
            <span className="text-2xl font-black text-[#1D3557] dark:text-[#FF6B35]">$5.00 USD</span>
          </div>

          <p className="text-xs text-muted-foreground mb-6">
            Elimina el uso de efectivo en los complejos deportivos. Paga tu cuota de vocalía de forma directa y segura.
          </p>

          {/* Payment Method Selector */}
          <div className="space-y-3 mb-6">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Selecciona Método de Pago:</span>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedMethod('DEUNA')}
                type="button"
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                  selectedMethod === 'DEUNA'
                    ? 'border-[#0B5FA5] bg-[#0B5FA5]/10 text-[#0B5FA5] dark:border-[#FF6B35] dark:bg-[#FF6B35]/20 dark:text-[#FF6B35]'
                    : 'border-slate-200 dark:border-slate-700 text-muted-foreground'
                }`}
              >
                <span>📱 Botón Deuna</span>
                <span className="text-[10px] font-normal">QR Inmediato</span>
              </button>

              <button
                onClick={() => setSelectedMethod('CARD')}
                type="button"
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                  selectedMethod === 'CARD'
                    ? 'border-[#0B5FA5] bg-[#0B5FA5]/10 text-[#0B5FA5] dark:border-[#FF6B35] dark:bg-[#FF6B35]/20 dark:text-[#FF6B35]'
                    : 'border-slate-200 dark:border-slate-700 text-muted-foreground'
                }`}
              >
                <span>💳 Tarjeta</span>
                <span className="text-[10px] font-normal">Débito/Crédito</span>
              </button>

              <button
                onClick={() => setSelectedMethod('TRANSFER')}
                type="button"
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                  selectedMethod === 'TRANSFER'
                    ? 'border-[#0B5FA5] bg-[#0B5FA5]/10 text-[#0B5FA5] dark:border-[#FF6B35] dark:bg-[#FF6B35]/20 dark:text-[#FF6B35]'
                    : 'border-slate-200 dark:border-slate-700 text-muted-foreground'
                }`}
              >
                <span>🏦 Transferencia</span>
                <span className="text-[10px] font-normal">Banca Web</span>
              </button>
            </div>
          </div>

          {/* Pay Button / Status */}
          {paymentStatus === 'COMPLETED' ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-500/40 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>¡Vocalía de $5.00 Pagada Exitosamente!</span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded">Comprobante #9041</span>
            </div>
          ) : (
            <button
              onClick={handlePayVocalia}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white transition-all shadow-md cursor-pointer
                bg-[#1D3557] hover:bg-[#1D3557]/90
                dark:bg-[#0B5FA5] dark:hover:bg-[#0B5FA5]/80"
            >
              Pagar Vocalía de $5.00 USD con {selectedMethod}
            </button>
          )}
        </div>

        {/* Ticket Store Box (1 Col) */}
        <div className="rounded-xl border p-6 shadow-xl flex flex-col justify-between
          bg-gradient-to-br from-[#1D3557] to-slate-900 text-white
          dark:from-[#2E3138] dark:to-[#0B5FA5]/40 dark:border-slate-700"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Ticket className="w-6 h-6 text-[#F4A261] dark:text-[#FF6B35]" />
              <h3 className="font-bold text-base">Entradas Digitales</h3>
            </div>
            <p className="text-xs text-slate-200 mb-4 leading-relaxed">
              Reserva y compra entradas con QR para familiares e hinchada en partidos definitorios o finales de liga.
            </p>
            <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 mb-4">
              <span className="block text-[10px] uppercase font-bold text-[#F4A261]">Próximo Gran Partido</span>
              <span className="font-bold text-sm">Gran Final Interligas Quito 2026</span>
              <span className="block text-xs font-semibold text-slate-300 mt-1">Precio: $3.00 USD por entrada</span>
            </div>
          </div>

          <button
            onClick={() => setShowTicketModal(true)}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all bg-[#F4A261] text-slate-900 hover:bg-[#F4A261]/90 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Comprar Ticket Digital ($3.00)</span>
          </button>
        </div>

        {/* Transaction History (3 Cols) */}
        <div className="md:col-span-3 rounded-xl border p-6 shadow-lg
          bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h3 className="font-bold text-base">Historial Transaccional Transparente</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-muted-foreground font-semibold">
                  <th className="py-2.5 px-3">ID Transacción</th>
                  <th className="py-2.5 px-3">Fecha</th>
                  <th className="py-2.5 px-3">Concepto</th>
                  <th className="py-2.5 px-3">Método</th>
                  <th className="py-2.5 px-3">Monto</th>
                  <th className="py-2.5 px-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-mono font-bold text-[#1D3557] dark:text-[#FF6B35]">{tx.id}</td>
                    <td className="py-3 px-3 text-muted-foreground">{tx.date}</td>
                    <td className="py-3 px-3 font-semibold">{tx.concept}</td>
                    <td className="py-3 px-3">{tx.method}</td>
                    <td className="py-3 px-3 font-bold">${tx.amount.toFixed(2)}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {tx.status} ✓
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#2E3138] rounded-xl border border-slate-200 dark:border-slate-700 p-6 max-w-sm w-full shadow-2xl text-center">
            <Ticket className="w-10 h-10 text-[#FF6B35] mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-1">Ticket Digital Emitido</h3>
            <p className="text-xs text-muted-foreground mb-4">Muestra este código QR en la puerta del estadio</p>
            <div className="bg-white p-4 rounded-xl border my-3">
              <svg className="w-32 h-32 mx-auto text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                <rect x="15" y="15" width="70" height="70" fill="currentColor" />
                <rect x="25" y="25" width="50" height="50" fill="white" />
                <rect x="35" y="35" width="30" height="30" fill="currentColor" />
              </svg>
            </div>
            <span className="block font-mono text-xs font-bold my-2 text-[#0B5FA5] dark:text-[#FF6B35]">TICKET-QR-FINAL-2026</span>
            <button
              onClick={() => setShowTicketModal(false)}
              className="w-full mt-3 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs font-bold cursor-pointer"
            >
              Cerrar Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentsPage;
