import { ReactNode } from "react";
import React from "react";

export default function LoadingPlaceHolder({children, isLoading}: OwnProps) {
  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  return <>{children}</>;
}

interface OwnProps {
  children: ReactNode;
  isLoading: boolean;
}