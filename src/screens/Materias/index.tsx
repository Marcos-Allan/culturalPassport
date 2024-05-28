//IMPORTAÇÃO DOS COMPONENTES
import Menu from "../../components/Menu";
import MenuBUtton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import MaterialCard from "../../components/MaterialCard";
import BottomNavigation from "../../components/BottomNavigation";

export default function Materias() {

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Materias`}
                />
                <MenuBUtton />
            </Navbar>

            <MaterialCard ContentMateria={'Geometria Plana'} TitleMateria={'Matemática'} background={0} />

            <MaterialCard ContentMateria={'Reprodução Sexuada'} TitleMateria={'Biologia'} background={1} />
            
            <MaterialCard ContentMateria={'Ondulatória'} TitleMateria={'Fisíca'} background={2} />
            
            <MaterialCard ContentMateria={'Ambiguidade'} TitleMateria={'Português'} background={3} />
            
            <MaterialCard ContentMateria={'Guerra Fria'} TitleMateria={'História'} background={4} />
            
            <MaterialCard ContentMateria={'Tabela Periódica'} TitleMateria={'Quimica'} background={5} />
            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}