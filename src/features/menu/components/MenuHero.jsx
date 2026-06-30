import OptimizedImage from "../../../components/common/OptimizedImage.jsx";

export default function MenuHero({ brand }) {
  return (
    <section className="menu-hero" aria-label={brand.name}>
      <OptimizedImage
        alt={`${brand.name} header`}
        className="menu-hero__image"
        fallbackSrc={brand.headerImage || brand.optimizedLogo || brand.logo}
        height={280}
        loading="eager"
        src={brand.optimizedHeaderImage || brand.headerImage}
        width={640}
      />
    </section>
  );
}
