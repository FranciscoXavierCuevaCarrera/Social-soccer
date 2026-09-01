import ky from "ky";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_BYTES } from "./validation";

type AllowedFileTypes = (typeof ALLOWED_FILE_TYPES)[number];
export type FileWithValidType = File & { type: AllowedFileTypes };

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function uploadFileWithProgress({
  file,
  s3UploadUrl,
  s3UploadFields,
  setUploadProgressPercent,
}: {
  file: FileWithValidType;
  s3UploadUrl: string;
  s3UploadFields: Record<string, string>;
  setUploadProgressPercent: (percentage: number) => void;
}) {
  if (
    !s3UploadUrl ||
    s3UploadUrl.startsWith("mock://") ||
    s3UploadUrl.includes("your-bucket-name") ||
    s3UploadUrl.includes("dummy-bucket")
  ) {
    setUploadProgressPercent(50);
    const dataUrl = await readFileAsDataUrl(file);
    setUploadProgressPercent(100);
    return { ok: true, status: 200, dataUrl };
  }

  const formData = getFileUploadFormData(file, s3UploadFields);

  return ky.post(s3UploadUrl, {
    body: formData,
    onUploadProgress: (progress) => {
      const percentage = Math.round(progress.percent * 100);
      setUploadProgressPercent(percentage);
    },
  });
}

function getFileUploadFormData(
  file: File,
  s3UploadFields: Record<string, string>,
) {
  const formData = new FormData();
  Object.entries(s3UploadFields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("file", file);
  return formData;
}

export function validateFile(file: File): FileWithValidType {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      `File size exceeds ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB limit.`,
    );
  }

  if (!isFileWithAllowedFileType(file)) {
    throw new Error(`File type '${file.type}' is not supported.`);
  }

  return file;
}

function isFileWithAllowedFileType(file: File): file is FileWithValidType {
  return ALLOWED_FILE_TYPES.includes(file.type as AllowedFileTypes);
}
