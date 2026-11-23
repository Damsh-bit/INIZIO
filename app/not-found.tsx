import Button from "@/components/Button";
export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col justify-center pt-24">
      <p className="label text-stone">Error 404</p>
      <h1 className="display mt-6 text-[16vw] md:text-[9vw]">Esta página <em>no está en el plano</em></h1>
      <div className="mt-10"><Button href="/">Volver al inicio</Button></div>
    </section>
  );
}
