// IMPORTAÇÃO DAS BIBLIOTECAS
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

// CRIA UM ICONE DE PERSONALIZADO
const customIcon = new L.Icon({
  iconUrl: 'https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png',
  iconSize: [30, 30],
});

//TIPAGEM DAS PORPS DO COMPONENTE
interface Props {
  position: [number, number];
}

const MapComponent: React.FC<Props> = ({ position }) => {

  //RESGATA AS VARIAVEIS GLOBAIS
  const states:any = useMyContext()

  //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
  const { theme } = states

  return (
    <div className={`min-h-[280px] h-auto flex items-start justify-center w-full sm:w-[80%] sm:rounded-[10px] overflow-hidden rounded z-[1] border-[1px] ${theme == 'light' ? 'border-my-black' : 'border-my-white'}`}>
      <MapContainer center={position} zoom={13} style={{ height: '250px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>Museu da História do Brasil</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
