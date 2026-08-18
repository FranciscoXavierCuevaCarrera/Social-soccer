import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Wallet,
} from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "wasp/client/auth";
import {
  getPaymentHistory,
  processPayment,
  useAction,
  useQuery,
} from "wasp/client/operations";
import type { Payment } from "wasp/entities";

export function PaymentsPage() {
  const { data: user } = useAuth();
  const {
    data: paymentList,
    isLoading,
    error,
    refetch,
  } = useQuery(getPaymentHistory);

  const executePayment = useAction(processPayment);

  const [amount, setAmount] = useState<number>(10);
  const [concept, setConcept] = useState("Cuota de Vocalía / Arbitraje");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#0B5FA5] dark:border-[#FF6B35]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-12 max-w-xl rounded-xl border border-[#E63946] bg-red-50 p-6 text-center dark:bg-[#2E3138]">
        <p className="font-medium text-[#E63946]">
          Error al cargar las transacciones de pago.
        </p>
      </div>
    );
  }

  const payments: Payment[] = Array.isArray(paymentList) ? paymentList : [];

  const totalPaid = payments
    .filter((payment) => payment.status === "COMPLETED")
    .reduce((acc, payment) => acc + (payment.amount || 0), 0);

  const totalPending = payments
    .filter((payment) => payment.status === "PENDING")
    .reduce((acc, payment) => acc + (payment.amount || 0), 0);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount <= 0) {
      setMessage({
        type: "error",
        text: "Monto inválido para procesar el pago.",
      });
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(null);

      await executePayment({
        amount: Number(amount),
        concept,
        paymentMethod: "DIGITAL_WALLET",
      });

      setMessage({
        type: "success",
        text: "Pago procesado exitosamente.",
      });

      refetch();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al procesar el pago.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900 transition-colors duration-300 md:p-8 dark:bg-[#1A1C20] dark:text-gray-100">
      <div className="mx-auto mb-8 flex max-w-5xl flex-col items-start justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center dark:border-gray-700">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Wallet className="h-7 w-7 text-[#0B5FA5] dark:text-[#FF6B35]" />

            <h1 className="text-3xl font-extrabold tracking-tight text-[#1D3557] dark:text-white">
              Billetera & Cuotas
            </h1>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gestión transparente de cuotas de arbitraje, vocalía y sanciones de
            equipo.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`mx-auto mb-6 max-w-5xl rounded-xl border p-4 text-sm font-medium ${
            message.type === "error"
              ? "border-[#E63946] bg-red-50 text-[#E63946] dark:bg-red-950/30"
              : "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-2 rounded-2xl bg-gradient-to-br from-[#1D3557] to-[#0B5FA5] p-6 text-white shadow-xl">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-300">
            Pagos Realizados
          </span>

          <div className="text-3xl font-black">${totalPaid.toFixed(2)}</div>

          <div className="flex items-center gap-1 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            Al día con vocalía
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-[#2E3138]">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Cuotas Pendientes
          </span>

          <div className="text-3xl font-black text-[#E63946]">
            ${totalPending.toFixed(2)}
          </div>

          <div className="flex items-center gap-1 text-xs text-[#E63946]">
            <Clock className="h-4 w-4" />
            {totalPending > 0 ? "Pendiente de cancelación" : "Sin pendientes"}
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-[#2E3138]">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Usuario Sincronizado
          </span>

          <div className="truncate text-lg font-bold text-[#1D3557] dark:text-white">
            {user?.username || user?.email || "Jugador"}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#FF6B35]">
            <DollarSign className="h-4 w-4" />
            Pagos Verificados por Pasarela
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:col-span-2 dark:border-gray-700 dark:bg-[#2E3138]">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#1D3557] dark:text-white">
            <CreditCard className="h-5 w-5 text-[#0B5FA5] dark:text-[#FF6B35]" />
            Historial de Transacciones
          </h2>

          {payments.length === 0 ? (
            <div className="space-y-2 rounded-xl border border-dashed border-gray-300 py-10 text-center dark:border-gray-700">
              <AlertCircle className="mx-auto h-8 w-8 text-gray-400" />

              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                No hay movimientos ni registros de pago aún.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {payment.concept || "Pago de Arbitraje/Vocalía"}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      📅 {new Date(payment.createdAt).toLocaleDateString()} —{" "}
                      {new Date(payment.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="space-y-1 text-right">
                    <span className="block text-base font-extrabold text-[#1D3557] dark:text-white">
                      ${payment.amount.toFixed(2)}
                    </span>

                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                        payment.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
                      }`}
                    >
                      {payment.status === "COMPLETED"
                        ? "COMPLETADO"
                        : "PENDIENTE"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-fit space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-[#2E3138]">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#1D3557] dark:text-white">
            <ArrowUpRight className="h-5 w-5 text-[#FF6B35]" />
            Abonar Cuota
          </h2>

          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                Concepto / Detalle
              </label>

              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5FA5] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                Monto ($ USD)
              </label>

              <input
                type="number"
                min={1}
                step={0.5}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5FA5] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-xl bg-[#FF6B35] py-3 text-sm font-bold text-white shadow transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isProcessing ? "Procesando Pago..." : "Pagar Cuota Ahora"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentsPage;
