import { useContext } from "react";
import { TitleContext } from "../App";

const CadastroProdutos = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Novo produto");

  return (
    <>
      <div className="grid md:grid-cols-2 gap-7">
        <Field
          label="Nome do Peixe"
          placeholder="Digite o nome do peixe a ser cadastrado"
        />
        <Field
          label="Família do Peixe"
          placeholder="Digite o nome da família do peixe a ser cadastrado"
        />
        <Field
          label="Origem do Peixe"
          placeholder="Digite o nome da origem do peixe a ser cadastrado"
        />
        <Field
          label="pH do Peixe"
          placeholder="Digite o pH do peixe a ser cadastrado"
        />
        <Field
          label="Expectativa da Vida do Peixe"
          placeholder="Digite a expectativa de vida do peixe a ser cadastrado"
        />
        <Field
          label="Tamanho Adulto do Peixe"
          placeholder="Digite o tamanho adulto do peixe a ser cadastrado"
        />
        <Field
          label="Temperatura do Peixe"
          placeholder="Digite a temperatura do peixe a ser cadastrado"
        />
        <Field
          label="Descrição de Especificação do Peixe"
          placeholder="Digite a descrição do peixe a ser cadastrado"
        />
      </div>

      <div className="flex flex-row justify-end p-4 gap-4 mt-5">
        <button className="action">Cadastrar</button>
        <button className="alternate">Limpar</button>
      </div>
    </>
  );
};

function Field({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-1 ">
      <label htmlFor={`txt-${label}`}>{label}</label>
      <input
        placeholder={placeholder}
        className="py-1 px-3 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic "
        type="text"
        id={`txt-${label}`}
      />
    </div>
  );
}

export default CadastroProdutos;
