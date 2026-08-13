import React, { useState } from 'react';
import { Wallet, CreditCard, Clock, CheckCircle2, AlertCircle, DollarSign, ArrowUpRight } from 'lucide-react';
import { useAuth } from 'wasp/client/auth';
import { useQuery, useAction, getPaymentHistory, processPayment } from 'wasp/client/operations';

export function PaymentsPage() {
  const { data: user } = useAuth();
  const { data: paymentList, isLoading, error, refetch } = useQuery(getPaymentHistory);
  const executePayment = useAction(processPayment);

  const [amount, setAmount] = useState<number>(10);
  const [concept, setConcept] = useState('Cuota de Vocalía / Arbitraje');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0B5FA5] dark:border-[#FF6B35]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-red-50 dark:bg-[#2E3138] border border-[#E63946] rounded-xl text-center">
        <p className="text-[#E63946] font-medium">Error al cargar las transacciones de pago.</p>
      </div>
    );
  }

  const payments = Array.isArray(paymentList) ? paymentList : [];

  const totalPaid = payments
    .filter((p: any) => p.status === 'COMPLETED')
    .reduce((acc: number, p: any) => acc + (p.amount || 0), 0);

  const totalPending = payments
    .filter((p: any) => p.status === 'PENDING')
    .reduce((acc: number, p: any) => acc + (p.amount || 0), 0);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setMessage({ type: 'error', text: 'Monto inválido para procesar el pago.' });
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(null);
      await executePayment({
        amount: Number(amount),
        concept,
        paymentMethod: 'DIGITAL_WALLET',
      });
      setMessage({ type: 'success', text: 'Pago procesado exitosamente.' });
      refetch();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error al procesar el pago.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-[#1A1C20] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-7 h-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1D3557] dark:text-white">
              Billetera & Cuotas
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gestión transparente de cuotas de arbitraje, vocalía y sanciones de equipo.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`max-w-5xl mx-auto mb-6 p-4 rounded-xl border text-sm font-medium ${
            message.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/30 text-[#E63946] border-[#E63946]'
              : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-500'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#1D3557] to-[#0B5FA5] text-white p-6 rounded-2xl shadow-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
            Pagos Realizados
          </span>
          <div className="text-3xl font-black">${totalPaid.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4" /> Al día con vocalía
          </div>
        </div>

        <div className="bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
            Cuotas Pendientes
          </span>
          <div className="text-3xl font-black text-[#E63946]">${totalPending.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-xs text-[#E63946]">
            <Clock className="w-4 h-4" /> {totalPending > 0 ? 'Pendiente de cancelación' : 'Sin pendientes'}
          </div>
        </div>

        <div className="bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
            Usuario Sincronizado
          </span>
          <div className="text-lg font-bold truncate text-[#1D3557] dark:text-white">
            {user?.username || user?.email || 'Jugador'}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#FF6B35] font-semibold">
            <DollarSign className="w-4 h-4" /> Pagos Verificados por Pasarela
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-xl font-bold text-[#1D3557] dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#0B5FA5] dark:text-[#FF6B35]" />
            Historial de Transacciones
          </h2>

          {payments.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                No hay movimientos ni registros de pago aún.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-gray-900 dark:text-white">
                      {p.concept || p.description || 'Pago de Arbitraje/Vocalía'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      📅 {new Date(p.createdAt).toLocaleDateString()} — {new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="font-extrabold text-base text-[#1D3557] dark:text-white block">
                      ${p.amount?.toFixed(2)}
                    </span>
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] font-black rounded-full uppercase ${
                        p.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                      }`}
                    >
                      {p.status === 'COMPLETED' ? 'COMPLETADO' : 'PENDIENTE'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md space-y-4 h-fit">
          <h2 className="text-xl font-bold text-[#1D3557] dark:text-white flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-[#FF6B35]" />
            Abonar Cuota
          </h2>

          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-2">
                Concepto / Detalle
              </label>
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#0B5FA5] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-2">
                Monto ($ USD)
              </label>
              <input
                type="number"
                min={1}
                step={0.5}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#0B5FA5] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-[#FF6B35] hover:opacity-90 text-white font-bold rounded-xl shadow transition-all disabled:opacity-50 text-sm"
            >
              {isProcessing ? 'Procesando Pago...' : 'Pagar Cuota Ahora'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentsPage;