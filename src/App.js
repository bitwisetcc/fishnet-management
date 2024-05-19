import logo from './Logo.png'; //importar imagem
import perfilphoto from './Perfil.png';
import { IoIosPersonAdd } from "react-icons/io";
import { FaFishFins } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GiDoubleFish } from "react-icons/gi";
import { MdOutlineLibraryBooks } from "react-icons/md";

export default function App() {
  return (
    <main className="flex-row align-center justify-center px-10 pt-10">
      <div className="NavBar flex flex-row h-[130px] items-center justify-between">
        <img className="rounded-lg" src={logo} alt="est" width="150"/>
        <h1 className="text-3xl whitespace-nowrap">Cadastro de Produtos</h1>
        <img className="rounded-full" src={perfilphoto} alt="est" width="60"/> {/*Seria a foto de alguem, ou um icon????????????*/}
      </div>
      <div className="flex flex-row pt-5 space-x-5 text-sm">
        <div className="NavBarLateral flex flex-col bg-gray-200 h-[500px] w-[25%] text-center rounded">
          <h1 className="py-2 font-medium">MENU</h1>
          <hr className="border-black"></hr>
          <div className="flex flex-col space-y-5 pt-3 items-center">
            <button>
              <div className="flex flex-row items-center">
                <IoIosPersonAdd size={30} />
                <span className="pl-2">Cadastro de Usuário</span>
              </div>
            </button>
            <button>
              <div className="flex flex-row items-center">
                <FaFishFins size={30}/>
                <span className="pl-2">Cadastro de Produtos</span>
              </div>
            </button>
            <button>
              <div className="flex flex-row items-center">
                <FaUsers size={30}/>
                <span className="pl-2">Listagem de Usuários</span>
              </div>
            </button>
            <button>
              <div className="flex flex-row items-center">
                <GiDoubleFish size={30}/>
                <span className="pl-2">Listagem de Vendas</span>
              </div>
            </button>
            <button>
              <div className="flex flex-row items-center">
                <MdOutlineLibraryBooks size={30}/>
                <span className="pl-2">Detalhes do Produto</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col pb-10 h-full w-screen">
          <h1 className="text-xl font-medium">Novo Produto</h1>
          <label 
          for="NomePeixe" 
          className="pt-3 flex flex-col"
          >
            <span>Nome do Peixe</span>
            <input
            placeholder="Digite o nome do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text" 
            id="NomePeixe" 
            />
          </label>
          <label 
          for="FamiliaPeixe" 
          className="pt-3 flex flex-col"
          >
            <span>Familia do Peixe</span>
            <input 
            placeholder="Digite o nome da familia do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text" 
            id="FamiliaPeixe" 
            />
          </label>
          <label 
          for="OrigemPeixe" 
          className="pt-3 flex flex-col"
          >
            <span>Origem do Peixe</span>
            <input
            placeholder="Digite o nome da origem do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text" 
            id="OrigemPeixe" 
            />
          </label>
          <label 
          for="PhPeixe"
          className="pt-3 flex flex-col"
          >
            <span>pH do Peixe</span>
            <input
            placeholder="Digite o pH do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text" 
            id="PhPeixe" 
            />
          </label>
          <label 
          for="ExpectativaVidaPeixe" 
          className="pt-3 flex flex-col"
          >
            <span>Expectativa da Vida do Peixe</span>
            <input
            placeholder="Digite a expectativa de vida do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text" 
            id="ExpectativaVidaPeixe" 
            />
          </label>
          <label 
          for="TamanhoAdultoPeixe" 
          className="pt-3 flex flex-col"
          >
            <span>Tamanho Adulto do Peixe</span>
            <input
            placeholder="Digite o tamanho adulto do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text" 
            id="TamanhoAdultoPeixe" 
            />
          </label>
          <label 
          for="TemperaturaPeixe" 
          className="pt-3 flex flex-col"
          >
            <span>Temperatura do Peixe</span>
            <input
            placeholder="Digite a temperatura do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text" 
            id="TemperaturaPeixe" 
            />
          </label>
          <label 
          for="DescricaoEspecPeixe" 
          className="pt-3 flex flex-col"
          >
            <span>Descrição de Especificação do Peixe</span>
            <input
            placeholder="Digite a descrição do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text" 
            id="DescricaoEspecPeixe" 
            />
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-end p-4 space-x-8">
        <button className="h-10 w-[140px] bg-gray-300">LIMPAR</button>
        <button className="h-10 w-[140px] bg-gray-300">ENVIAR</button>
      </div>
    </main>
  );
}
