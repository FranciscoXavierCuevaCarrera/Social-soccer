import {
  AlertCircle,
  Award,
  Check,
  Copy,
  QrCode,
  Shield,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../client/components/ThemeToggle";

export function IdentityPage() {
  const [copied, setCopied] = useState(false);
  const [passStatus] = useState<"ACTIVE" | "PENDING_TRANSFER" | "LOCKED">(
    "ACTIVE",
  );

  const playerInfo = {
    fullName: "Mateo Sebastían Silva",
    cedula: "1724589031",
    club: "Club Deportivo El Batán",
    position: "Mediocampista Creativo",
    number: 10,
    qrToken: "SS-PLAYER-2026-9814-BATAN",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    league: "Liga Barrial El Batán / Interligas Quito",
  };

  const handleCopy = () => {
    (
      navigator as unknown as {
        clipboard: { writeText: (text: string) => Promise<void> };
      }
    ).clipboard.writeText(playerInfo.qrToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-background text-foreground min-h-screen p-4 transition-colors duration-300 md:p-8">
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-4xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Shield className="h-7 w-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-bold tracking-tight">
              DataWallet — Carnet Digital
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Identidad Única e Historial Deportivo Interligas Autonómico
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Main Player Card Container */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* Digital ID Card (2 Cols) */}
        <div className="relative overflow-hidden rounded-xl border border-[#1D3557]/20 bg-gradient-to-br from-white via-slate-50 to-[#F4A261]/10 p-6 shadow-xl transition-all duration-300 md:col-span-2 dark:border-[#0B5FA5]/40 dark:from-[#2E3138] dark:via-[#2E3138] dark:to-[#0B5FA5]/30">
          {/* Card Header Badge */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#FF6B35]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D3557] dark:text-[#FF6B35]">
                SocialSoccer ID Oficial
              </span>
            </div>
            {/* Pass Status Badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              <UserCheck className="h-3.5 w-3.5" />
              <span>
                {passStatus === "ACTIVE"
                  ? "Pase Autonómico Habilitado"
                  : passStatus}
              </span>
            </div>
          </div>

          {/* Card Content Grid */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Player Photo */}
            <div className="relative">
              <img
                src={playerInfo.photoUrl}
                alt={playerInfo.fullName}
                className="h-36 w-28 rounded-xl border-2 border-[#1D3557] object-cover shadow-md dark:border-[#0B5FA5]"
              />
              <span className="absolute -bottom-2 -right-2 rounded-full border border-white bg-[#1D3557] px-2 py-0.5 text-xs font-bold text-white dark:border-slate-800 dark:bg-[#0B5FA5]">
                #{playerInfo.number}
              </span>
            </div>

            {/* Player Details */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="mb-1 text-xl font-bold text-[#1D3557] dark:text-white">
                {playerInfo.fullName}
              </h2>
              <p className="mb-4 text-sm font-semibold text-[#F4A261] dark:text-[#FF6B35]">
                {playerInfo.position}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-slate-800/80">
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase">
                    Cédula ID
                  </span>
                  <span className="font-mono font-medium">
                    {playerInfo.cedula}
                  </span>
                </div>
                <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-slate-800/80">
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase">
                    Club Actual
                  </span>
                  <span className="overflow-hidden text-ellipsis font-semibold">
                    {playerInfo.club}
                  </span>
                </div>
                <div className="col-span-2 rounded-lg bg-slate-100 p-2.5 dark:bg-slate-800/80">
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase">
                    Liga Afiliada
                  </span>
                  <span className="font-medium">{playerInfo.league}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Warning / info */}
          <div className="text-muted-foreground mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs dark:border-slate-700">
            <span className="flex items-center gap-1 text-[11px]">
              <AlertCircle className="h-3.5 w-3.5 text-[#FF6B35]" /> Validez
              Interligas Autónoma (Sin Retención de Dirigente)
            </span>
            <span className="font-mono text-[10px]">VERIFICADO 2026</span>
          </div>
        </div>

        {/* Verification QR Panel (1 Col) */}
        <div className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white p-6 text-center shadow-xl dark:border-slate-700 dark:bg-[#2E3138]">
          <div>
            <div className="mx-auto mb-3 w-fit rounded-full bg-[#1D3557]/10 p-3 text-[#1D3557] dark:bg-[#0B5FA5]/20 dark:text-[#FF6B35]">
              <QrCode className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-base font-bold">
              Escáner de Verificación
            </h3>
            <p className="text-muted-foreground mb-4 text-xs">
              Presenta este código QR en puerta o vocalía para validación en
              cancha
            </p>
          </div>

          {/* QR Box Visual */}
          <div className="my-2 rounded-xl border border-slate-200 bg-white p-4 shadow-inner">
            <svg
              className="mx-auto h-36 w-36 text-slate-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <rect x="10" y="10" width="25" height="25" fill="currentColor" />
              <rect x="15" y="15" width="15" height="15" fill="white" />
              <rect x="18" y="18" width="9" height="9" fill="currentColor" />
              <rect x="65" y="10" width="25" height="25" fill="currentColor" />
              <rect x="70" y="15" width="15" height="15" fill="white" />
              <rect x="73" y="18" width="9" height="9" fill="currentColor" />
              <rect x="10" y="65" width="25" height="25" fill="currentColor" />
              <rect x="15" y="70" width="15" height="15" fill="white" />
              <rect x="18" y="73" width="9" height="9" fill="currentColor" />
              <rect x="40" y="40" width="20" height="20" fill="currentColor" />
              <rect x="45" y="10" width="10" height="20" fill="currentColor" />
              <rect x="75" y="45" width="15" height="40" fill="currentColor" />
              <rect x="45" y="70" width="20" height="15" fill="currentColor" />
            </svg>
          </div>

          {/* Copy Token Button */}
          <div className="mt-4 w-full">
            <button
              onClick={handleCopy}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1D3557] px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-[#1D3557]/90 dark:bg-[#0B5FA5] dark:hover:bg-[#0B5FA5]/80"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? "¡Token Copiado!" : "Copiar Token Único"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentityPage;
