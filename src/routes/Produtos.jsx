import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Essa estrutura de JSON abaixo finge ser um banco de dados de produtos "fake"
 */
import produtosData from "../produtos.json";

export default function Produtos() {
  // a variável-state abaixo irá armazenar nossos produtos do sistema para listarmos em tela
  const [items] = useState(produtosData);

  return (
    <div className="p-6">
      <h2 className="mb-5 text-3xl font-semibold text-gray-700">Produtos</h2>

      <nav>
        <ul className="space-y-3">
          {items.map(item => (
            <li key={item.id} className="text-xl">
              <Link to={`/produto/${item.id}`} className="hover:underlined hover:text-red-700">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
