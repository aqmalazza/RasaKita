import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

export default function PageHeader({ backTo, description, title }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
      return;
    }

    navigate(-1);
  };

  return (
    <header className="page-header">
      <div className="page-header__top">
        {backTo !== undefined ? (
          <Button
            aria-label="Kembali"
            className="button--icon"
            onClick={handleBack}
            variant="ghost"
          >
            <ArrowLeft size={18} />
          </Button>
        ) : null}
        <h1>{title}</h1>
      </div>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
