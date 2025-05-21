"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import MenuDetailItem from "./MenuDetailItem";
import NextImage from "next/image";

type MenuDetailImageFieldProps = {
  image_url?: string;
  value: File | undefined;
  setValue: React.Dispatch<SetStateAction<File | undefined>>;
};

const MenuDetailImageField: React.FC<MenuDetailImageFieldProps> = ({
  image_url,
  value,
  setValue,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    image_url
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 画像urlの更新
  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewImageUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (image_url) {
      setPreviewImageUrl(image_url);
    } else {
      setPreviewImageUrl("");
    }
  }, [value, image_url]);

  const handleImage = async (file: File) => {
    const resized = await resizeImage(file);
    const compressedFile = new File([resized], file.name, {
      type: "image/jpeg",
    });
    setValue(compressedFile);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImage(file);
  };

  const resizeImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const MAX_WIDTH = 800;
        const scale = MAX_WIDTH / img.width;
        const width = MAX_WIDTH;
        const height = img.height * scale;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Failed to get canvas context"));
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob)
              return reject(new Error("Failed to convert canvas to blob"));
            resolve(blob);
          },
          "image/jpeg",
          0.8
        );
      };
      img.onerror = () => reject(new Error("failed to load image"));
    });
  };

  // TODO HEICの対策追加
  // TODO 圧縮が正しいか確認

  return (
    <MenuDetailItem title="画像">
      <div
        className={`w-60 h-40 border-2 border-dashed rounded-md flex items-center justify-center relative cursor-pointer transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {previewImageUrl ? (
          <NextImage
            src={previewImageUrl}
            alt="プレビュー"
            fill
            className="rounded border object-cover"
          />
        ) : (
          <span className="material-symbols-rounded text-gray-500 text-4xl">
            add_photo_alternate
          </span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        name="image"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </MenuDetailItem>
  );
};

export default MenuDetailImageField;
