export default function Footer() {
  return (
    <footer
      className="text-center py-3 mt-5"
      style={{ backgroundColor: "#7A4DF0", color: "white" }}
    >
      © {new Date().getFullYear()} Veterinaria Online — Todos los derechos reservados
    </footer>
  );
}