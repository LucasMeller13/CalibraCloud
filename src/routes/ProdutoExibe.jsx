import { useState } from "react";
import { Link, useParams } from "react-router-dom";

/**
 * Essa estrutura de JSON abaixo finge ser um banco de dados de produtos "fake"
 */
import produtosData from "../produtos.json";

/**
 * Esta página agora serve de exemplo de adaptação dinâmica a URLs com parametros.
 * Neste caso precisamos receber um código (:id) na URL para saber qual produto
 * essa página deve se adaptar e exibir.
 *
 * Para obtermos algum "pedaço/informação" do endereço aberto no navegador, usamos
 * o hook `useParams` do React Router DOM.
 */
export default function ProdutoExibe() {
  // a variável-state abaixo irá armazenar nossos produtos do sistema para listarmos em tela
  const [items] = useState(produtosData);

  const { id } = useParams();

  // após obtermos o código-id da URL na linha anterior, abaixo faço uma "busca-fake" na lista de produtos
  // para achar qual produto queremos exibir
  const produto = items.find(item => item.id === Number(id));

  return (
    <div className="p-6">
      <h2 className="mb-5 text-3xl font-semibold text-gray-700">Produtos #{id}</h2>
      <h3 className="mb-3 text-xl font-semibold text-gray-700">{produto.name}</h3>
      <p className="mb-6">R$ {produto.price}</p>
      <Link to="/produtos" className="text-sm text-teal-600 hover:text-red-700">
        Voltar
      </Link>
    </div>
  );
}
