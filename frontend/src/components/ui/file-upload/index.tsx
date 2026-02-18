"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  label: string;
  intent?:
    | "primary"
    | "secondary"
    | "neutral"
    | "success"
    | "info"
    | "warning"
    | "negative";
  accept?: string;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  onFileSelect: (file: File) => void;
}

export function FileUploadButton({
  id,
  label,
  intent = "primary",
  accept = ".pdf,.jpg,.jpeg,.png,.doc,.docx",
  disabled = false,
  isLoading = false,
  icon,
  onFileSelect,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFileSelect(file);

    // reset input so same file can be re-selected
    e.target.value = "";
  };

  return (
    <>
      <Button
        icon={icon}
        intent={intent}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        loading={isLoading}
      >
        {label}
      </Button>

      <input
        ref={inputRef}
        type="file"
        hidden
        id={id}
        accept={accept}
        onChange={handleChange}
      />
    </>
  );
}
