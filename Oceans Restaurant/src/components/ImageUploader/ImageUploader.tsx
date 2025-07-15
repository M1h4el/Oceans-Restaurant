import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  onUploadStart?: () => void;
  currentImageUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadComplete,
  currentImageUrl = "",
  onUploadStart,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setProgress(0);
    handleUpload(selectedFile);
  };

  const handleUpload = async (fileToUpload: File) => {
    setIsUploading(true);
    onUploadStart?.();
    const storageRef = ref(
      storage,
      `products/${Date.now()}_${fileToUpload.name}`
    );
    console.log("Iniciando subida a:", storageRef.fullPath);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        console.log(`Progreso de subida: ${prog}%`, {
          bytesTransferred: snapshot.bytesTransferred,
          totalBytes: snapshot.totalBytes,
          state: snapshot.state,
        });
      },
      (error) => {
        console.error("Error detallado en subida:", {
          code: error.code,
          message: error.message,
          serverResponse: error.serverResponse,
          fullPath: storageRef.fullPath,
        });
        setIsUploading(false);
        onUploadComplete("");
        setPreviewUrl("");
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Subida completada exitosamente", {
            fullPath: uploadTask.snapshot.ref.fullPath,
            downloadURL: downloadURL,
            metadata: {
              size: uploadTask.snapshot.metadata?.size,
              contentType: uploadTask.snapshot.metadata?.contentType,
              timeCreated: uploadTask.snapshot.metadata?.timeCreated,
            },
          });

          setPreviewUrl(downloadURL);
          onUploadComplete(downloadURL);
          setIsUploading(false);
        } catch (error) {
          console.error("Error al obtener URL descargable:", {
            error: error,
            fullPath: uploadTask.snapshot.ref.fullPath,
          });
          setIsUploading(false);
          onUploadComplete("");
        }
      }
    );
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl("");
    setProgress(0);
    onUploadComplete("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {previewUrl && (
        <Box sx={{ position: "relative", width: "fit-content" }}>
          <Avatar
            src={previewUrl}
            variant="rounded"
            sx={{ width: 150, height: 150 }}
          />
          <IconButton
            onClick={handleRemove}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}

      <Button
        component="label"
        variant="outlined"
        startIcon={
          isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />
        }
        disabled={isUploading}
        sx={{ width: "fit-content" }}
      >
        {isUploading ? "Subiendo..." : "Seleccionar imagen"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
          disabled={isUploading}
        />
      </Button>

      {isUploading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ flexGrow: 1 }}
          />
          <Typography variant="body2">{progress}%</Typography>
        </Box>
      )}

      {!previewUrl && !isUploading && (
        <Typography variant="caption" color="textSecondary">
          Imagen requerida para el producto
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploader;
