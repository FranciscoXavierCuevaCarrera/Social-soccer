import React, { useState } from 'react';
import { QrCode, Shield, UserCheck, Copy, Check, Award, AlertCircle } from 'lucide-react';
import ThemeToggle from '../client/components/ThemeToggle';

export function IdentityPage() {
  const [copied, setCopied] = useState(false);
  const [passStatus] = useState<'ACTIVE' | 'PENDING_TRANSFER' | 'LOCKED'>('ACTIVE');

  const playerInfo = {
    fullName: 'Mateo Sebastían Silva',
    cedula: '1724589031',
    club: 'Club Deportivo El Batán',
    position: 'Mediocampista Creativo',
    number: 10,
    qrToken: 'SS-PLAYER-2026-9814-BATAN',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    league: 'Liga Barrial El Batán / Interligas Quito',
  };

  const handleCopy = () => {
    (navigator as unknown as { clipboard: { writeText: (text: string) => Promise<void> } }).clipboard.writeText(playerInfo.qrToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-7 h-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-bold tracking-tight">DataWallet — Carnet Digital</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Identidad Única e Historial Deportivo Interligas Autonómico
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Main Player Card Container */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Digital ID Card (2 Cols) */}
        <div className="md:col-span-2 relative overflow-hidden rounded-xl border p-6 shadow-xl transition-all duration-300
          bg-gradient-to-br from-white via-slate-50 to-[#F4A261]/10 border-[#1D3557]/20
          dark:from-[#2E3138] dark:via-[#2E3138] dark:to-[#0B5FA5]/30 dark:border-[#0B5FA5]/40"
        >
          {/* Card Header Badge */}
          <div className="flex justify-between items-center mb-6 border-b pb-4 border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D3557] dark:text-[#FF6B35]">
                SocialSoccer ID Oficial
              </span>
            </div>
            {/* Pass Status Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
              bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/30"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{passStatus === 'ACTIVE' ? 'Pase Autonómico Habilitado' : passStatus}</span>
            </div>
          </div>

          {/* Card Content Grid */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Player Photo */}
            <div className="relative">
              <img
                src={playerInfo.photoUrl}
                alt={playerInfo.fullName}
                className="w-28 h-36 object-cover rounded-xl border-2 shadow-md border-[#1D3557] dark:border-[#0B5FA5]"
              />
              <span className="absolute -bottom-2 -right-2 bg-[#1D3557] dark:bg-[#0B5FA5] text-white text-xs font-bold px-2 py-0.5 rounded-full border border-white dark:border-slate-800">
                #{playerInfo.number}
              </span>
            </div>

            {/* Player Details */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold mb-1 text-[#1D3557] dark:text-white">
                {playerInfo.fullName}
              </h2>
              <p className="text-sm font-semibold text-[#F4A261] dark:text-[#FF6B35] mb-4">
                {playerInfo.position}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                  <span className="block text-muted-foreground text-[10px] uppercase font-semibold">Cédula ID</span>
                  <span className="font-mono font-medium">{playerInfo.cedula}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                  <span className="block text-muted-foreground text-[10px] uppercase font-semibold">Club Actual</span>
                  <span className="font-semibold text-ellipsis overflow-hidden">{playerInfo.club}</span>
                </div>
                <div className="col-span-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                  <span className="block text-muted-foreground text-[10px] uppercase font-semibold">Liga Afiliada</span>
                  <span className="font-medium">{playerInfo.league}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Warning / info */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-[11px]">
              <AlertCircle className="w-3.5 h-3.5 text-[#FF6B35]" /> Validez Interligas Autónoma (Sin Retención de Dirigente)
            </span>
            <span className="font-mono text-[10px]">VERIFICADO 2026</span>
          </div>
        </div>

        {/* Verification QR Panel (1 Col) */}
        <div className="rounded-xl border p-6 shadow-xl flex flex-col items-center justify-between text-center
          bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700"
        >
          <div>
            <div className="p-3 rounded-full bg-[#1D3557]/10 dark:bg-[#0B5FA5]/20 text-[#1D3557] dark:text-[#FF6B35] w-fit mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base mb-1">Escáner de Verificación</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Presenta este código QR en puerta o vocalía para validación en cancha
            </p>
          </div>

          {/* QR Box Visual */}
          <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-200 my-2">
            <svg className="w-36 h-36 mx-auto text-slate-900" viewBox="0 0 100 100" fill="currentColor">
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
          <div className="w-full mt-4">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all
                bg-[#1D3557] text-white hover:bg-[#1D3557]/90
                dark:bg-[#0B5FA5] dark:hover:bg-[#0B5FA5]/80"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Token Copiado!' : 'Copiar Token Único'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentityPage;
