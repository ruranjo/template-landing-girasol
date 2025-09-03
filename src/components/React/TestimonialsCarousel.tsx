import { useEffect, useState, useRef } from "react";

interface Testimonial {
  nombre: string;
  cargo: string;
  texto: string;
  estrellas: string | number;
  emoji: string;
}

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true); // <--- estado loading
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timer | null>(null);

  const SHEET_TESTIMONIALS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTl9frA7rBruwk69u5ub9Ywbv4Ucqk7pN9LuYdK0qCmVg4aCyn5fqLkA8Jd8J7fgS2aMB2FNqbh41l1/pub?output=tsv&gid=1355462707";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(SHEET_TESTIMONIALS_URL);
        const text = await res.text();
        const rows = text.trim().split("\n").map((line) => line.split("\t"));
        const headers = rows.shift() ?? [];

        const data = rows.map((row) =>
          Object.fromEntries(
            row.map((cell, i) => [
              headers[i].trim().replace(/\r/g, ""),
              cell.trim().replace(/\r/g, "")
            ])
          )
        );

        setTestimonials(data as any);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false); // <--- terminó la carga
      }
    };

    fetchTestimonials();
  }, []);

  // Funciones del carousel
  const slidesPerView = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

  const updateCarousel = () => {
    if (!trackRef.current) return;
    const spv = slidesPerView();
    const totalSlides = testimonials.length;
    let newIndex = index;
    const maxIndex = totalSlides - spv;
    if (newIndex < 0) newIndex = maxIndex;
    if (newIndex > maxIndex) newIndex = 0;
    trackRef.current.style.transform = `translateX(${-newIndex * (100 / spv)}%)`;
  };

  const slide = (direction: number) => { setIndex((prev) => prev + direction); startAutoSlide(); };
  const startAutoSlide = () => { stopAutoSlide(); autoSlideRef.current = setInterval(() => setIndex((prev) => prev + 1), 5000); };
  const stopAutoSlide = () => { if (autoSlideRef.current) clearInterval(autoSlideRef.current as any); };

  useEffect(() => { updateCarousel(); }, [index, testimonials]);
  useEffect(() => {
    const handleResize = () => updateCarousel();
    window.addEventListener("resize", handleResize);
    startAutoSlide();
    return () => { window.removeEventListener("resize", handleResize); stopAutoSlide(); };
  }, [testimonials]);

  // Render
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="animate-spin border-4 border-yellow-500 border-t-transparent rounded-full w-12 h-12"></span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div ref={trackRef} className="flex transition-transform duration-500 ease-in-out">
        {testimonials.map((t) => (
          <div key={t.nombre} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full">
              <div className="flex text-yellow-400 mb-3">
                {"★".repeat(Number(t.estrellas))}{"☆".repeat(5 - Number(t.estrellas))}
              </div>
              <p className="text-gray-700 italic mb-4">"{t.texto}"</p>
              <p className="font-semibold text-gray-900 mt-auto flex items-center gap-2">
                <span>{t.emoji}</span> {t.nombre}
              </p>
              <p className="text-sm text-gray-500">{t.cargo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones */}
      <button
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full shadow hover:bg-yellow-600"
        onClick={() => slide(-1)}
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full shadow hover:bg-yellow-600"
        onClick={() => slide(1)}
      >
        ›
      </button>
    </div>
  );
}
