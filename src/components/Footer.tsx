import { Link } from "react-router-dom";
import { MatrixTypeText } from "./ui/matrix-type-text";

const footerLinks = {
  LayerZero: [{ name: "About", href: "/about" }],
};

export function Footer() {
  return (
    <footer className="relative min-h-[200px] w-full ">
      <div className="container relative z-10 flex flex-col gap-8 py-8 max-w-[1400px] mx-auto">
        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8  p-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className=" text-md">
                      <MatrixTypeText text={link.name} isActive={false} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Team Section */}
      </div>
    </footer>
  );
}
