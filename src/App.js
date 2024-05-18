import logo from './logo512.png'; //importar imagem
import { IoIosPersonAdd } from "react-icons/io";
import { FaFishFins } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GiDoubleFish } from "react-icons/gi";
import { MdOutlineLibraryBooks } from "react-icons/md";

export default function App() {
  return (
    <main className="flex-row align-center justify-center px-10 pt-10">
      <div className="NavBar flex space-x-[40%] h-10 bg-gray-600">
        <img src={logo} alt="est" height="20" width="40"/>
        <h1>Cadastro de Produtos</h1>
        <img src={logo} alt="est" height="20" width="40"/>
      </div>
      <div className="flex flex-row pt-5 space-x-5 text-sm">
        <div className="NavBarLateral flex flex-col bg-gray-600 h-full w-[25%] text-center">
          <h1 className="py-2">Menu</h1>
          <hr className=""></hr>
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

        <div className="flex flex-col bg-gray-600 pb-10 h-full w-screen">
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
      <div className="flex flex-row  items-center justify-end p-4">
        
        
      </div>
    </main>
  );
}
