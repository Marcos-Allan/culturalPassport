//IMPORTAÇÃO DA INICIALIZAÇÃO DA APLICAÇÃO E DOS SERVIÇOS DO FIREBASE
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";

//CONFIGURAÇÃO DA CONTA DO FIREBASE PARA CONSEGUIR USAR OS SERVIÇOS
const firebaseConfig = {
  apiKey: "AIzaSyCeSH-qr4HpnIcwNiHsbQ-wsQ8F85IsWvE",
  authDomain: "cultural-passport-78148.firebaseapp.com",
  projectId: "cultural-passport-78148",
  storageBucket: "cultural-passport-78148.appspot.com",
  messagingSenderId: "418419777954",
  appId: "1:418419777954:web:86105e4a534747a5e092fb"
};

//INICIA A APLICAÇÃO DO FIREBASE
const app = initializeApp(firebaseConfig);
//INICIA O SERVIÇO DE AUTENTICAÇÃO DO FIREBASE
const auth = getAuth(app);

//INICIA O PROVEDOR DO GOOGLE
const provider = new GoogleAuthProvider();

//EXPORTA AS FUNÇÕES CRIADAS ACIMA
export { signInWithRedirect, auth, provider, getRedirectResult, GoogleAuthProvider }