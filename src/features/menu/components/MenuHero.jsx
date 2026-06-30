import OptimizedImage from "../../../components/common/OptimizedImage.jsx";

export default function MenuHero({ brand }) {
  return (
    <section className="menu-hero" aria-label={brand.name}>
      <div className="menu-hero__media">
        <OptimizedImage
          alt={`${brand.name} header`}
          className="menu-hero__image"
          fallbackSrc={brand.headerImage || brand.optimizedLogo || brand.logo}
          height={280}
          loading="eager"
          src={brand.optimizedHeaderImage || brand.headerImage}
          width={640}
        />
      </div>
      <div className="menu-hero__content">
        <h1>{brand.name}</h1>
        <p>{brand.tagline}</p>
      </div>
    </section>
  );
}
