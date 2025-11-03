import { API_GET_FILE, API_UPLOAD_FILE } from "@/constants/api/general";

interface UploadResponse {
  message: string;
  fileId: string;
  fileUrl: string;
}

interface UploadError {
  error: string;
  fileName: string;
}

type UploadResult = UploadResponse | UploadError;

// Function to upload multiple images and return their URLs
export async function uploadFiles(images: File[]): Promise<string[]> {
  const uploadResults: UploadResult[] = [];

  // Upload each image sequentially
  for (const image of images) {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await fetch(API_UPLOAD_FILE, {
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data: UploadResponse = await response.json();
      uploadResults.push(data);
    } catch (error) {
      uploadResults.push({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        fileName: image.name,
      });
    }
  }

  // Filter successful uploads and return their URLs
  const successfulUploads = uploadResults.filter(
    (result): result is UploadResponse => "fileId" in result
  );
  return successfulUploads.map((result) => API_GET_FILE + result.fileId);
}
