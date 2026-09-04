import {
  CheckCircle2,
  CreditCard,
  History,
  QrCode,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../client/components/ThemeToggle";

export function PaymentsPage() {
  const [paymentStatus, setPaymentStatus] = useState<"PENDING" | "COMPLETED">(
    "PENDING",
  );
  const [selectedMethod, setSelectedMethod] = useState<
    "DEUNA" | "CARD" | "TRANSFER"
  >("DEUNA");
  const [showTicketModal, setShowTicketModal] = useState(false);

  const transactions = [
    {
      id: "PAY-9041",
      date: "27 de Julio, 2026",
      concept: "Vocalía Partido vs Atlético San Roque",
      amount: 5.0,
      method: "Deuna (QR)",
      status: "COMPLETED",
    },
    {
      id: "PAY-8820",
      date: "15 de Julio, 2026",
      concept: "Inscripción Anual Torneo Interligas 2026",
      amount: 25.0,
      method: "Tarjeta de Crédito",
      status: "COMPLETED",
    },
    {
      id: "PAY-7102",
      date: "02 de Julio, 2026",
      concept: "Multa Tarjeta Amarilla (Fecha 4)",
      amount: 2.5,
      method: "Transferencia",
      status: "COMPLETED",
    },
  ];

  const handlePayVocalia = () => {
    setPaymentStatus("COMPLETED");
  };

  return (
    <div className="bg-background text-foreground min-h-screen p-4 transition-colors duration-300 md:p-8">
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-4xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-bold tracking-tight">
              Fintech & Ticketing Digital
            </h1>
          </div>

          <p className="text-muted-foreground text-sm">
            Cobro transparente de vocalías ($5.00), multas y entradas con Deuna
            / Tarjeta
          </p>
        </div>

        <ThemeToggle />
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* Vocalía Pay Card (2 Cols) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-all duration-300 md:col-span-2 dark:border-slate-700 dark:bg-[#2E3138]">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                Pago de Vocalía de Partido
              </span>

              <h2 className="text-lg font-bold text-[#1D3557] dark:text-white">
                Fecha 5: El Batán vs San Roque
              </h2>
            </div>

            <span className="text-2xl font-black text-[#1D3557] dark:text-[#FF6B35]">
              $5.00 USD
            </span>
          </div>

          <p className="text-muted-foreground mb-6 text-xs">
            Elimina el uso de efectivo en los complejos deportivos. Paga tu
            cuota de vocalía de forma directa y segura.
          </p>

          {/* Payment Method Selector */}
          <div className="mb-6 space-y-3">
            <span className="text-muted-foreground text-xs font-semibold uppercase">
              Selecciona Método de Pago:
            </span>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedMethod("DEUNA")}
                type="button"
                className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all ${
                  selectedMethod === "DEUNA"
                    ? "border-[#0B5FA5] bg-[#0B5FA5]/10 text-[#0B5FA5] dark:border-[#FF6B35] dark:bg-[#FF6B35]/20 dark:text-[#FF6B35]"
                    : "text-muted-foreground border-slate-200 dark:border-slate-700"
                }`}
              >
                <span>📱 Botón Deuna</span>
                <span className="text-[10px] font-normal">QR Inmediato</span>
              </button>

              <button
                onClick={() => setSelectedMethod("CARD")}
                type="button"
                className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all ${
                  selectedMethod === "CARD"
                    ? "border-[#0B5FA5] bg-[#0B5FA5]/10 text-[#0B5FA5] dark:border-[#FF6B35] dark:bg-[#FF6B35]/20 dark:text-[#FF6B35]"
                    : "text-muted-foreground border-slate-200 dark:border-slate-700"
                }`}
              >
                <span>💳 Tarjeta</span>
                <span className="text-[10px] font-normal">Débito/Crédito</span>
              </button>

              <button
                onClick={() => setSelectedMethod("TRANSFER")}
                type="button"
                className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all ${
                  selectedMethod === "TRANSFER"
                    ? "border-[#0B5FA5] bg-[#0B5FA5]/10 text-[#0B5FA5] dark:border-[#FF6B35] dark:bg-[#FF6B35]/20 dark:text-[#FF6B35]"
                    : "text-muted-foreground border-slate-200 dark:border-slate-700"
                }`}
              >
                <span>🏦 Transferencia</span>
                <span className="text-[10px] font-normal">Banca Web</span>
              </button>
            </div>
          </div>

          {/* Pay Button / Status */}
          {paymentStatus === "COMPLETED" ? (
            <div className="flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-50 p-4 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>¡Vocalía de $5.00 Pagada Exitosamente!</span>
              </div>

              <span className="rounded bg-emerald-200 px-2 py-0.5 font-mono text-[10px] uppercase dark:bg-emerald-900">
                Comprobante #9041
              </span>
            </div>
          ) : (
            <button
              onClick={handlePayVocalia}
              type="button"
              className="w-full cursor-pointer rounded-xl bg-[#1D3557] px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#1D3557]/90 dark:bg-[#0B5FA5] dark:hover:bg-[#0B5FA5]/80"
            >
              Pagar Vocalía de $5.00 USD con {selectedMethod}
            </button>
          )}
        </div>

        {/* Ticket Store Box (1 Col) */}
        <div className="flex flex-col justify-between rounded-xl border bg-gradient-to-br from-[#1D3557] to-slate-900 p-6 text-white shadow-xl dark:border-slate-700 dark:from-[#2E3138] dark:to-[#0B5FA5]/40">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Ticket className="h-6 w-6 text-[#F4A261] dark:text-[#FF6B35]" />

              <h3 className="text-base font-bold">Entradas Digitales</h3>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-slate-200">
              Reserva y compra entradas con QR para familiares e hinchada en
              partidos definitorios o finales de liga.
            </p>

            <div className="mb-4 rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
              <span className="block text-[10px] font-bold uppercase text-[#F4A261]">
                Próximo Gran Partido
              </span>

              <span className="text-sm font-bold">
                Gran Final Interligas Quito 2026
              </span>

              <span className="mt-1 block text-xs font-semibold text-slate-300">
                Precio: $3.00 USD por entrada
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowTicketModal(true)}
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#F4A261] px-3 py-2.5 text-xs font-bold text-slate-900 transition-all hover:bg-[#F4A261]/90"
          >
            <QrCode className="h-4 w-4" />
            <span>Comprar Ticket Digital ($3.00)</span>
          </button>
        </div>

        {/* Transaction History (3 Cols) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg md:col-span-3 dark:border-slate-700 dark:bg-[#2E3138]">
          <div className="mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-[#0B5FA5] dark:text-[#FF6B35]" />

            <h3 className="text-base font-bold">
              Historial Transaccional Transparente
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-slate-200 font-semibold dark:border-slate-700">
                  <th className="px-3 py-2.5">ID Transacción</th>
                  <th className="px-3 py-2.5">Fecha</th>
                  <th className="px-3 py-2.5">Concepto</th>
                  <th className="px-3 py-2.5">Método</th>
                  <th className="px-3 py-2.5">Monto</th>
                  <th className="px-3 py-2.5">Estado</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium dark:divide-slate-700/60">
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-3 py-3 font-mono font-bold text-[#1D3557] dark:text-[#FF6B35]">
                      {tx.id}
                    </td>

                    <td className="text-muted-foreground px-3 py-3">
                      {tx.date}
                    </td>

                    <td className="px-3 py-3 font-semibold">{tx.concept}</td>

                    <td className="px-3 py-3">{tx.method}</td>

                    <td className="px-3 py-3 font-bold">
                      ${tx.amount.toFixed(2)}
                    </td>

                    <td className="px-3 py-3">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 text-center shadow-2xl dark:border-slate-700 dark:bg-[#2E3138]">
            <Ticket className="mx-auto mb-2 h-10 w-10 text-[#FF6B35]" />

            <h3 className="mb-1 text-lg font-bold">Ticket Digital Emitido</h3>

            <p className="text-muted-foreground mb-4 text-xs">
              Muestra este código QR en la puerta del estadio
            </p>

            <div className="my-3 rounded-xl border bg-white p-4">
              <svg
                className="mx-auto h-32 w-32 text-slate-900"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <rect
                  x="15"
                  y="15"
                  width="70"
                  height="70"
                  fill="currentColor"
                />
                <rect x="25" y="25" width="50" height="50" fill="white" />
                <rect
                  x="35"
                  y="35"
                  width="30"
                  height="30"
                  fill="currentColor"
                />
              </svg>
            </div>

            <span className="my-2 block font-mono text-xs font-bold text-[#0B5FA5] dark:text-[#FF6B35]">
              TICKET-QR-FINAL-2026
            </span>

            <button
              onClick={() => setShowTicketModal(false)}
              type="button"
              className="mt-3 w-full cursor-pointer rounded-lg bg-slate-200 py-2 text-xs font-bold dark:bg-slate-700"
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
