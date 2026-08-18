import {
  AlertCircle,
  Award,
  Check,
  Copy,
  QrCode,
  Shield,
  UserCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "wasp/client/auth";
import {
  getPlayerProfile,
  updatePlayerProfile,
  useAction,
  useQuery,
} from "wasp/client/operations";

export function IdentityPage() {
  const { data: user } = useAuth();
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery(getPlayerProfile);
  const updateProfile = useAction(updatePlayerProfile);

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  // Estados de formulario mapeados al esquema de Prisma
  const [cedula, setCedula] = useState("");
  const [currentClub, setCurrentClub] = useState("");
  const [position, setPosition] = useState("Mediocampista");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (profile) {
      setCedula(profile.cedula || "");
      setCurrentClub(profile.currentClub || "");
      setPosition(profile.position || "Mediocampista");
      setPhotoUrl(profile.photoUrl || "");
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#0B5FA5] dark:border-[#FF6B35]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-12 max-w-xl rounded-xl border border-[#E63946] bg-red-50 p-6 text-center dark:bg-[#2E3138]">
        <p className="font-medium text-[#E63946]">
          Error al cargar la identidad digital.
        </p>
      </div>
    );
  }

  const passStatus = profile?.passStatus || "ACTIVE";
  const qrToken =
    profile?.qrCode ||
    `SS-PLAYER-${user?.id || "GUEST"}-${profile?.cedula || "0000"}`;

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

      await updateProfile({
        cedula,
        currentClub,
        position,
        photoUrl,
      });

      setMessage({
        type: "success",
        text: "Carnet digital actualizado con éxito.",
      });
      setIsEditing(false);
      refetch();
    } catch (err: unknown) {
      const messageText =
        err instanceof Error ? err.message : "Error al actualizar perfil.";

      setMessage({
        type: "error",
        text: messageText,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900 transition-colors duration-300 md:p-8 dark:bg-[#1A1C20] dark:text-gray-100">
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-4xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Shield className="h-7 w-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
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
        <div
          className={`mx-auto mb-6 max-w-4xl rounded-xl border p-4 text-sm font-medium ${
            message.type === "error"
              ? "border-[#E63946] bg-red-50 text-[#E63946] dark:bg-red-950/30"
              : "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Main Container */}
      <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* Digital ID Card */}
        <div className="relative overflow-hidden rounded-2xl border border-[#1D3557]/20 bg-gradient-to-br from-white via-slate-50 to-[#F4A261]/10 p-6 shadow-xl transition-all duration-300 md:col-span-2 dark:border-[#0B5FA5]/40 dark:from-[#2E3138] dark:via-[#2E3138] dark:to-[#0B5FA5]/30">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#FF6B35]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D3557] dark:text-[#FF6B35]">
                SocialSoccer ID Oficial
              </span>
            </div>

            <div
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                passStatus === "ACTIVE"
                  ? "border border-emerald-500/30 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                  : "border border-[#E63946]/30 bg-red-100 text-[#E63946] dark:bg-red-950/80"
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>
                {passStatus === "ACTIVE"
                  ? "Pase Autonómico Habilitado"
                  : passStatus}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              {profile?.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile?.fullName || user?.username || "Foto de perfil"}
                  className="h-36 w-28 rounded-xl border-2 border-[#1D3557] object-cover shadow-md dark:border-[#0B5FA5]"
                />
              ) : (
                <div className="flex h-36 w-28 items-center justify-center rounded-xl border-2 border-[#1D3557] bg-slate-200 text-4xl dark:border-[#0B5FA5] dark:bg-slate-700">
                  👤
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <h2 className="text-xl font-extrabold text-[#1D3557] dark:text-white">
                  {profile?.fullName ||
                    user?.username ||
                    user?.email?.split("@")[0] ||
                    "Jugador Registrado"}
                </h2>

                <p className="text-sm font-semibold text-[#FF6B35]">
                  {profile?.position || "Sin Posición Definida"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-slate-800/80">
                  <span className="block text-[10px] font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Cédula ID
                  </span>
                  <span className="font-mono font-medium">
                    {profile?.cedula || "Sin registrar"}
                  </span>
                </div>

                <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-slate-800/80">
                  <span className="block text-[10px] font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Club Actual
                  </span>
                  <span className="block truncate font-semibold">
                    {profile?.currentClub || "Libre"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-gray-500 dark:border-slate-700 dark:text-gray-400">
            <span className="flex items-center gap-1 text-[11px]">
              <AlertCircle className="h-3.5 w-3.5 text-[#FF6B35]" />
              Validez Interligas Autónoma
            </span>

            <span className="font-mono text-[10px]">VERIFICADO 2026</span>
          </div>
        </div>

        {/* Verification QR Panel */}
        <div className="flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl dark:border-slate-700 dark:bg-[#2E3138]">
          <div>
            <div className="mx-auto mb-3 w-fit rounded-full bg-[#1D3557]/10 p-3 text-[#1D3557] dark:bg-[#0B5FA5]/20 dark:text-[#FF6B35]">
              <QrCode className="h-6 w-6" />
            </div>

            <h3 className="mb-1 text-base font-bold text-[#1D3557] dark:text-white">
              Escáner de Verificación
            </h3>

            <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
              Presenta este código QR en vocalía para validación en cancha
            </p>
          </div>

          <div className="my-2 rounded-xl border border-slate-200 bg-white p-3 shadow-inner">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrToken}`}
              alt="QR Code"
              className="mx-auto h-36 w-36"
            />
          </div>

          <button
            onClick={handleCopy}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-3 py-2.5 text-xs font-semibold text-white transition-all hover:opacity-90 dark:bg-[#0B5FA5]"
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

      {/* Formulario de Edición */}
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-[#2E3138]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#1D3557] dark:text-white">
            Editar Perfil de Jugador
          </h3>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold text-[#1D3557] transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {isEditing ? "Cancelar" : "Actualizar Información"}
          </button>
        </div>

        {isEditing && (
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  Cédula ID
                </label>

                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  Club Actual
                </label>

                <input
                  type="text"
                  value={currentClub}
                  onChange={(e) => setCurrentClub(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  Posición
                </label>

                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="Portero">Portero</option>
                  <option value="Defensa">Defensa</option>
                  <option value="Mediocampista">Mediocampista</option>
                  <option value="Delantero">Delantero</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  URL Fotografía
                </label>

                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-[#1D3557] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 dark:bg-[#0B5FA5]"
            >
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default IdentityPage;
