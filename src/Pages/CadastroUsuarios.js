import { useContext } from "react";
import { TitleContext } from "../App";

const CadastroUsuarios = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Cadastro de Usuários");
  return (
  <>
  <div className="grid md:grid-cols-2 gap-7 ">
    <Field 
      label="Nome"
      placeholder="Digite o nome do usuário a ser cadastrado"
    />
    <Field
      label="Estado"
      placeholder="Digite o Estado do usuário a ser cadastrado"
    />
     <Field
      label="Email"
      placeholder="Digite o email do usuário a ser cadastrado"
    />
    <Field
      label="Cidade"
      placeholder="Digite a cidade do usuário a ser cadastrado"
    />
    <Field
      label="Telefone"
      placeholder="Digite o telefone do usuário a ser cadastrado"
    />
    <Field
      label="Endereço"
      placeholder="Digite por exemplo: Rua da Tereza, 40 (e complemento se tiver) " 
    />
    
    <Field
      label="CPF ou CNPJ"
      placeholder="Digite o CPF ou CNPJ do usuário a ser cadastrado"
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
<div className="flex flex-col gap-1">
  <label htmlFor={`txt-${label}`}>{label}</label>
  <input
    placeholder={placeholder}
    className="py-1 px-3 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
    type="text"
    id={`txt-${label}`}
  />
</div>
);
}

export default CadastroUsuarios;
