"use client";

import React, { useState } from "react";

import BadalRequestModal, {
  type BadalRequestPayload,
  type BadalServiceType,
} from "./BadalRequestModal";

type Props = {
  serviceType: BadalServiceType;
  label: string;
  className?: string;

  onComplete?: (payload: BadalRequestPayload) => void | Promise<void>;
};

export default function BadalRequestButton({
  serviceType,
  label,
  className,
  onComplete,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>

      <BadalRequestModal
        open={open}
        serviceType={serviceType}
        onComplete={
          onComplete ?? ((payload) => console.log("badal request:", payload))
        }
        onOpenChange={(nextOpen) => setOpen(nextOpen)}
      />
    </>
  );
}
