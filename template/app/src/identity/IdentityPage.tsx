import QRCode from "react-qr-code";
import {
  AlertCircle,
  Award,
  Check,
  Copy,
  Edit3,
  ImagePlus,
  QrCode,
  Save,
  Shield,
  UserCheck,
  X,
} from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  addFileToDb,
  createFileUploadUrl,
  getDownloadFileSignedURL,
  getPlayerProfile,
  updatePlayerProfile,
  useAction,
  useQuery,
} from "wasp/client/operations";
import ThemeToggle from "../client/components/ThemeToggle";
import {
  uploadFileWithProgress,
  validateFile,
} from "../file-upload/fileUploading";

type ProfileForm = {
  fullName: string;
  cedula: string;
  currentClub: string;
  position: string;
  number: string;
  photoUrl: string;
};

export function IdentityPage() {
  const {
    data: playerProfile,
    isLoading,
    error,
    refetch,
  } = useQuery(getPlayerProfile);

  const updateProfile = useAction(updatePlayerProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadProgressPercent, setUploadProgressPercent] = useState(0);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    cedula: "",
    currentClub: "Libre",
    position: "Mediocampista",
    number: "",
    photoUrl: "",
  });

  useEffect(() => {
    if (!playerProfile) return;

    setForm({
      fullName: playerProfile.fullName ?? "",
      cedula: playerProfile.cedula ?? "",
      currentClub: playerProfile.currentClub ?? "Libre",
      position: playerProfile.position ?? "Mediocampista",
      number:
        playerProfile.number !== null &&
        playerProfile.number !== undefined
          ? String(playerProfile.number)
          : "",
      photoUrl: playerProfile.photoUrl ?? "",
    });
  }, [playerProfile]);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSaveError("");
  };

  const handleEdit = () => {
    setSaveError("");
    setPhotoError("");
    setSaved(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!playerProfile) return;

    setForm({
      fullName: playerProfile.fullName ?? "",
      cedula: playerProfile.cedula ?? "",
      currentClub: playerProfile.currentClub ?? "Libre",
      position: playerProfile.position ?? "Mediocampista",
      number:
        playerProfile.number !== null &&
        playerProfile.number !== undefined
          ? String(playerProfile.number)
          : "",
      photoUrl: playerProfile.photoUrl ?? "",
    });

    setSaveError("");
    setPhotoError("");
    setIsEditing(false);
  };

  const handlePhotoChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setPhotoError("");
      setIsUploadingPhoto(true);
      setUploadProgressPercent(0);

      const validatedFile = validateFile(file);

      if (
        validatedFile.type !== "image/jpeg" &&
        validatedFile.type !== "image/png"
      ) {
        throw new Error("La foto debe estar en formato JPG o PNG.");
      }

      const { s3UploadUrl, s3UploadFields, s3Key } =
        await createFileUploadUrl({
          fileType: validatedFile.type,
          fileName: validatedFile.name,
        });

      await uploadFileWithProgress({
        file: validatedFile,
        s3UploadUrl,
        s3UploadFields,
        setUploadProgressPercent,
      });

      await addFileToDb({
        s3Key,
        fileType: validatedFile.type,
        fileName: validatedFile.name,
      });

      const signedUrl = await getDownloadFileSignedURL({ s3Key });

      setForm((current) => ({
        ...current,
        photoUrl: signedUrl,
      }));

      setSaved(false);
    } catch (error) {
      console.error("Error al subir la foto:", error);

      const message =
        error instanceof Error
          ? error.message
          : "No se pudo subir la fotografía.";

      setPhotoError(message);
    } finally {
      setIsUploadingPhoto(false);
      setUploadProgressPercent(0);
      event.target.value = "";
    }
  };

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      setSaveError("El nombre completo es obligatorio.");
      return;
    }

    if (
      form.number.trim() &&
      (!Number.isInteger(Number(form.number)) ||
        Number(form.number) < 0 ||
        Number(form.number) > 99)
    ) {
      setSaveError("El número debe estar entre 0 y 99.");
      return;
    }

    try {
      setSaveError("");
      setIsSaving(true);

      await updateProfile({
        fullName: form.fullName.trim(),
        cedula: form.cedula.trim() || undefined,
        currentClub: form.currentClub.trim() || "Libre",
        position: form.position.trim() || "Mediocampista",
        number: form.number.trim() ? Number(form.number) : undefined,
        photoUrl: form.photoUrl.trim() || undefined,
      });

      await refetch();

      setIsEditing(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);

      setSaveError("No se pudo guardar el perfil. Inténtalo nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!playerProfile?.qrCode) return;

    try {
      await navigator.clipboard.writeText(playerProfile.qrCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("No se pudo copiar el código:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background text-foreground flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Cargando perfil...
        </p>
      </div>
    );
  }

  if (error || !playerProfile) {
    return (
      <div className="bg-background text-foreground flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
          <p className="font-semibold text-red-700 dark:text-red-300">
            No se pudo cargar tu perfil.
          </p>

          <p className="text-muted-foreground mt-2 text-sm">
            Inténtalo nuevamente.
          </p>
        </div>
      </div>
    );
  }

  const photoUrl =
    playerProfile.photoUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";

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

        <div className="flex flex-wrap items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              <Check className="h-4 w-4" />
              Guardado
            </span>
          )}

          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-lg bg-[#1D3557] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1D3557]/90 dark:bg-[#0B5FA5] dark:hover:bg-[#0B5FA5]/80"
            >
              <Edit3 className="h-4 w-4" />
              Editar perfil
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving || isUploadingPhoto}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || isUploadingPhoto}
                className="flex items-center gap-2 rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#FF6B35]/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Guardando..." : "Guardar"}
              </button>
            </>
          )}

          <ThemeToggle />
        </div>
      </div>

      {/* Main Player Card */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* Digital ID Card */}
        <div className="relative overflow-hidden rounded-xl border border-[#1D3557]/20 bg-gradient-to-br from-white via-slate-50 to-[#F4A261]/10 p-6 shadow-xl transition-all duration-300 md:col-span-2 dark:border-[#0B5FA5]/40 dark:from-[#2E3138] dark:via-[#2E3138] dark:to-[#0B5FA5]/30">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#FF6B35]" />

              <span className="text-xs font-bold uppercase tracking-wider text-[#1D3557] dark:text-[#FF6B35]">
                SocialSoccer ID Oficial
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              <UserCheck className="h-3.5 w-3.5" />

              <span>
                {playerProfile.passStatus === "ACTIVE"
                  ? "Pase Autonómico Habilitado"
                  : playerProfile.passStatus}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Player Photo */}
            <div className="relative flex-shrink-0">
              <img
                src={isEditing ? form.photoUrl || photoUrl : photoUrl}
                alt={playerProfile.fullName}
                className="h-36 w-28 rounded-xl border-2 border-[#1D3557] object-cover shadow-md dark:border-[#0B5FA5]"
              />

              {playerProfile.number !== null &&
                playerProfile.number !== undefined && (
                  <span className="absolute -bottom-2 -right-2 rounded-full border border-white bg-[#1D3557] px-2 py-0.5 text-xs font-bold text-white dark:border-slate-800 dark:bg-[#0B5FA5]">
                    #{playerProfile.number}
                  </span>
                )}

              {isEditing && (
                <label className="absolute inset-0 flex cursor-pointer items-end justify-center rounded-xl bg-black/40 pb-2 opacity-0 transition hover:opacity-100">
                  <span className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-semibold text-slate-900">
                    <ImagePlus className="h-3.5 w-3.5" />
                    Cambiar foto
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoChange}
                    disabled={isUploadingPhoto}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              {!isEditing ? (
                <>
                  <h2 className="mb-1 text-xl font-bold text-[#1D3557] dark:text-white">
                    {playerProfile.fullName}
                  </h2>

                  <p className="mb-4 text-sm font-semibold text-[#F4A261] dark:text-[#FF6B35]">
                    {playerProfile.position}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-slate-800/80">
                      <span className="text-muted-foreground block text-[10px] font-semibold uppercase">
                        Cédula ID
                      </span>

                      <span className="font-mono font-medium">
                        {playerProfile.cedula || "No registrada"}
                      </span>
                    </div>

                    <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-slate-800/80">
                      <span className="text-muted-foreground block text-[10px] font-semibold uppercase">
                        Club Actual
                      </span>

                      <span className="overflow-hidden text-ellipsis font-semibold">
                        {playerProfile.currentClub}
                      </span>
                    </div>

                    <div className="col-span-2 rounded-lg bg-slate-100 p-2.5 dark:bg-slate-800/80">
                      <span className="text-muted-foreground block text-[10px] font-semibold uppercase">
                        Código de jugador
                      </span>

                      <span className="break-all font-mono text-[11px] font-medium">
                        {playerProfile.qrCode}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="text-left">
                    <span className="text-muted-foreground mb-1 block text-xs font-semibold">
                      Nombre completo
                    </span>

                    <input
                      value={form.fullName}
                      onChange={(event) =>
                        handleChange("fullName", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0B5FA5] dark:border-slate-600 dark:bg-slate-800"
                    />
                  </label>

                  <label className="text-left">
                    <span className="text-muted-foreground mb-1 block text-xs font-semibold">
                      Cédula
                    </span>

                    <input
                      value={form.cedula}
                      onChange={(event) =>
                        handleChange("cedula", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0B5FA5] dark:border-slate-600 dark:bg-slate-800"
                    />
                  </label>

                  <label className="text-left">
                    <span className="text-muted-foreground mb-1 block text-xs font-semibold">
                      Club actual
                    </span>

                    <input
                      value={form.currentClub}
                      onChange={(event) =>
                        handleChange("currentClub", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0B5FA5] dark:border-slate-600 dark:bg-slate-800"
                    />
                  </label>

                  <label className="text-left">
                    <span className="text-muted-foreground mb-1 block text-xs font-semibold">
                      Posición
                    </span>

                    <input
                      value={form.position}
                      onChange={(event) =>
                        handleChange("position", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0B5FA5] dark:border-[#FF6B35] dark:bg-slate-800"
                    />
                  </label>

                  <label className="text-left">
                    <span className="text-muted-foreground mb-1 block text-xs font-semibold">
                      Número
                    </span>

                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={form.number}
                      onChange={(event) =>
                        handleChange("number", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0B5FA5] dark:border-slate-600 dark:bg-slate-800"
                    />
                  </label>

                  <div className="text-left sm:col-span-2">
                    <span className="text-muted-foreground mb-1 block text-xs font-semibold">
                      Fotografía
                    </span>

                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700">
                      <ImagePlus className="h-4 w-4" />

                      {isUploadingPhoto
                        ? `Subiendo ${uploadProgressPercent}%`
                        : "Seleccionar foto JPG o PNG"}

                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handlePhotoChange}
                        disabled={isUploadingPhoto}
                        className="hidden"
                      />
                    </label>

                    {photoError && (
                      <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                        {photoError}
                      </p>
                    )}

                    <p className="text-muted-foreground mt-1 text-[10px]">
                      Máximo 5 MB.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {saveError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {saveError}
            </div>
          )}

          <div className="text-muted-foreground mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs dark:border-slate-700">
            <span className="flex items-center gap-1 text-[11px]">
              <AlertCircle className="h-3.5 w-3.5 text-[#FF6B35]" />
              Validez Interligas Autónoma (Sin Retención de Dirigente)
            </span>

            <span className="font-mono text-[10px]">
              PERFIL ACTIVO
            </span>
          </div>
        </div>

        {/* QR Panel */}
        <div className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white p-6 text-center shadow-xl dark:border-slate-700 dark:bg-[#2E3138]">
          <div>
            <div className="mx-auto mb-3 w-fit rounded-full bg-[#1D3557]/10 p-3 text-[#1D3557] dark:bg-[#0B5FA5]/20 dark:text-[#FF6B35]">
              <QrCode className="h-6 w-6" />
            </div>

            <h3 className="mb-1 text-base font-bold">
              Verificación de jugador
            </h3>

            <p className="text-muted-foreground mb-4 text-xs">
              Escanea este código QR para identificar al jugador.
            </p>
          </div>

          <div className="my-2 rounded-xl border border-slate-200 bg-white p-4 shadow-inner">
            <QRCode
              value={playerProfile.qrCode}
              size={160}
              bgColor="#FFFFFF"
              fgColor="#0F172A"
              level="M"
            />
          </div>

          <div className="mt-4 w-full">
            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1D3557] px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-[#1D3557]/90 dark:bg-[#0B5FA5] dark:hover:bg-[#0B5FA5]/80"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}

              <span>
                {copied ? "¡Código Copiado!" : "Copiar Código"}
              </span>
            </button>
          </div>

          <p className="text-muted-foreground mt-3 text-[10px]">
            Identificador único: {playerProfile.qrCode}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IdentityPage;