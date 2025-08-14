import { BrandedLoader } from "./branded-loader";

interface FullscreenLoaderProps {
  text?: string;
  show: boolean;
}

export const FullscreenLoader = ({ text = "Cargando...", show }: FullscreenLoaderProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <BrandedLoader text={text} />
    </div>
  );
};