"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";

type ButtonIntent =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "negative"
  | "neutral";

type ButtonVariant = "solid" | "outline" | "ghost" | "soft";

interface Props {
  id: string;
  label: string;
  intent?: ButtonIntent;
  accept?: string;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
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
  variant,
  className,
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
        variant={variant}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        loading={isLoading}
        className={className}
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
