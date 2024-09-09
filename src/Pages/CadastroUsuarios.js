import { useContext, useState } from "react";
import { TitleContext } from "../App";

const CadastroUsuarios = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Cadastro de Usuários");

  const [formData, setFormData] = useState({
    nome: "",
    estado: "",
    email: "",
    cidade: "",
    telefone: "",
    endereço: "",
    cpfCnpj: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleClear = () => {
    setFormData({
      nome: "",
      estado: "",
      email: "",
      cidade: "",
      telefone: "",
      endereco: "",
      cpfCnpj: ""
    });
  };

  return (
    <>
      <div className="p-5">
        <div className="text-3xl text-sky-950 font-bold">Cadastro de Usuário</div><br></br>
        <div className="grid md:grid-cols-2 gap-7">
          {Object.keys(formData).map(key => (
            <Field
              key={key}
              id={key}
              label={capitalizeFirstLetter(key)}
              placeholder={`Digite o ${key} do usuário a ser cadastrado`}
              value={formData[key]}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="flex flex-row justify-end p-4 gap-4 mt-5">
          <button className="action">Cadastrar</button>
          <button
            type="button"
            onClick={handleClear}
            className="alternate"
          >
            Limpar
          </button>
        </div>
      </div>
    </>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(/([A-Z])/g, ' $1');
};

function Field({ id, label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`txt-${id}`}>{label}</label>
      <input
        placeholder={placeholder}
        className="py-1 px-3 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
        type="text"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CadastroUsuarios;
