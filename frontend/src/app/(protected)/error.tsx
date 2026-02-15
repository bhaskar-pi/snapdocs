"use client";

import ErrorForm from "@/components/error";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <ErrorForm error={error} reset={reset} />;
};

export default Error;
