import React, { useState, useEffect } from 'react';
import { QrCode, Shield, UserCheck, Copy, Check, Award, AlertCircle } from 'lucide-react';
import { useAuth } from 'wasp/client/auth';
import { useQuery, useAction, getPlayerProfile, updatePlayerProfile } from 'wasp/client/operations';

export function IdentityPage() {
  const { data: user } = useAuth();
  const { data: profile, isLoading, error, refetch } = useQuery(getPlayerProfile);
  const updateProfile = useAction(updatePlayerProfile);

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Estados de formulario mapeados al esquema de Prisma
  const [cedula, setCedula] = useState('');
  const [currentClub, setCurrentClub] = useState('');
  const [position, setPosition] = useState('Mediocampista');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (profile) {
      setCedula(profile.cedula || '');
      setCurrentClub(profile.currentClub || '');
      setPosition(profile.position || 'Mediocampista');
      setPhotoUrl(profile.photoUrl || '');
    }
  }, [profile]);

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
        <p className="text-[#E63946] font-medium">Error al cargar la identidad digital.</p>
      </div>
    );
  }

  const passStatus = profile?.passStatus || 'ACTIVE';
  const qrToken = profile?.qrCode || `SS-PLAYER-${user?.id || 'GUEST'}-${profile?.cedula || '0000'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(qrToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setMessage(null);
      await updateProfile({ cedula, currentClub, position, photoUrl });
      setMessage({ type: 'success', text: 'Carnet digital actualizado con éxito.' });
      setIsEditing(false);
      refetch();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error al actualizar perfil.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-[#1A1C20] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-7 h-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-extrabold tracking-tight text-[#1D3557] dark:text-white">
              DataWallet — Carnet Digital
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Identidad Única e Historial Deportivo Interligas Autonómico
          </p>
        </div>
      </div>

      {message && (
        <div className={`max-w-4xl mx-auto mb-6 p-4 rounded-xl border text-sm font-medium ${
          message.type === 'error'
            ? 'bg-red-50 dark:bg-red-950/30 text-[#E63946] border-[#E63946]'
            : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-500'
        }`}>
          {message.text}
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Digital ID Card */}
        <div className="md:col-span-2 relative overflow-hidden rounded-2xl border p-6 shadow-xl transition-all duration-300
          bg-gradient-to-br from-white via-slate-50 to-[#F4A261]/10 border-[#1D3557]/20
          dark:from-[#2E3138] dark:via-[#2E3138] dark:to-[#0B5FA5]/30 dark:border-[#0B5FA5]/40"
        >
          <div className="flex justify-between items-center mb-6 border-b pb-4 border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D3557] dark:text-[#FF6B35]">
                SocialSoccer ID Oficial
              </span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              passStatus === 'ACTIVE'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/30'
                : 'bg-red-100 text-[#E63946] dark:bg-red-950/80 border border-[#E63946]/30'
            }`}>
              <UserCheck className="w-3.5 h-3.5" />
              <span>{passStatus === 'ACTIVE' ? 'Pase Autonómico Habilitado' : passStatus}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0">
              {profile?.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile?.fullName || user?.username || 'Foto de perfil'}
                  className="w-28 h-36 object-cover rounded-xl border-2 shadow-md border-[#1D3557] dark:border-[#0B5FA5]"
                />
              ) : (
                <div className="w-28 h-36 bg-slate-200 dark:bg-slate-700 rounded-xl border-2 border-[#1D3557] dark:border-[#0B5FA5] flex items-center justify-center text-4xl">
                  👤
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <h2 className="text-xl font-extrabold text-[#1D3557] dark:text-white">
                  {profile?.fullName || user?.username || user?.email?.split('@')[0] || 'Jugador Registrado'}
                </h2>
                <p className="text-sm font-semibold text-[#FF6B35]">
                  {profile?.position || 'Sin Posición Definida'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                  <span className="block text-gray-500 dark:text-gray-400 text-[10px] uppercase font-semibold">Cédula ID</span>
                  <span className="font-mono font-medium">{profile?.cedula || 'Sin registrar'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                  <span className="block text-gray-500 dark:text-gray-400 text-[10px] uppercase font-semibold">Club Actual</span>
                  <span className="font-semibold truncate block">{profile?.currentClub || 'Libre'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 text-[11px]">
              <AlertCircle className="w-3.5 h-3.5 text-[#FF6B35]" /> Validez Interligas Autónoma
            </span>
            <span className="font-mono text-[10px]">VERIFICADO 2026</span>
          </div>
        </div>

        {/* Verification QR Panel */}
        <div className="rounded-2xl border p-6 shadow-xl flex flex-col items-center justify-between text-center bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700">
          <div>
            <div className="p-3 rounded-full bg-[#1D3557]/10 dark:bg-[#0B5FA5]/20 text-[#1D3557] dark:text-[#FF6B35] w-fit mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base mb-1 text-[#1D3557] dark:text-white">Escáner de Verificación</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Presenta este código QR en vocalía para validación en cancha
            </p>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-inner border border-slate-200 my-2">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrToken}`}
              alt="QR Code"
              className="w-36 h-36 mx-auto"
            />
          </div>

          <button
            onClick={handleCopy}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all bg-[#1D3557] text-white hover:opacity-90 dark:bg-[#0B5FA5]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Token Copiado!' : 'Copiar Token Único'}</span>
          </button>
        </div>
      </div>

      {/* Formulario de Edición */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1D3557] dark:text-white">
            Editar Perfil de Jugador
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-[#1D3557] dark:text-gray-200 transition-colors"
          >
            {isEditing ? 'Cancelar' : 'Actualizar Información'}
          </button>
        </div>

        {isEditing && (
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Cédula ID
                </label>
                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Club Actual
                </label>
                <input
                  type="text"
                  value={currentClub}
                  onChange={(e) => setCurrentClub(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Posición
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="Portero">Portero</option>
                  <option value="Defensa">Defensa</option>
                  <option value="Mediocampista">Mediocampista</option>
                  <option value="Delantero">Delantero</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                  URL Fotografía
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#1D3557] dark:bg-[#0B5FA5] text-white font-bold rounded-xl hover:opacity-90 text-sm disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default IdentityPage;