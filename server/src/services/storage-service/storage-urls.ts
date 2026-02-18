import { supabase } from "@config/supabase";

export async function generateSignedDocumentUrl(storagePath: string) {
  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(storagePath, 60 * 60 * 24);

  if (error) {
    throw new Error("Failed to generate signed URL");
  }

  return data.signedUrl;
}
