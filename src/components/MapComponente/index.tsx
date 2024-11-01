/**
 * MIT License with Additional Restrictions
 * 
 * Copyright (c) 2024 Marcos Allan Santos Menezes
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * 2. The Software may not be used, modified, or distributed without the prior
 * written permission of the copyright holder.
 * 
 * 3. The Software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the Software or the use or other dealings in the
 * Software.
 * 
 * By using the Software, you agree to these terms and conditions.
 */

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
