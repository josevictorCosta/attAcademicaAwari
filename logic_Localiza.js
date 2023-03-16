const fs = require("fs");
const os = require("os")

const UsersdataBase = "improvised_Database/UsersReg.txt"
const CarsdataBase = "improvised_Database/CarsReg.txt"

let Clients = [];
let C_Reg = [];

const writeIn = (Clients) => {

  let formatReg = [""];
  Clients.forEach(Clients => {
  formatReg += `Nome: ${Clients.Name}${os.EOL}Endereço: ${Clients.Address}${os.EOL}Telefone: ${Clients.Number}`
  });

  fs.writeFileSync(UsersdataBase,JSON.stringify(Clients, null, 2));
};




class U_Data {

  constructor(Name,Address,Number,cpf, cnh){

      this.Name = Name;
      this.Address = Address;
      this.Number =  Number;
      this.cpf = cpf;
      this.cnh =cnh;

      Clients.push({

        Nome:this.Name,
        Endereco:this.Address,
        Celular: this.Number,
        CPF:this.cpf,
        CNH:this.cnh,
        
      });
      writeIn(Clients)
    };
};


class Cars {

  constructor(model,l_plate,year,colour,kmH,dayly,type = "Passeio"){

    
    this.model = model;
    this.l_plate = l_plate;
    this.year = year;
    this.colour= colour;
    this.kmH = kmH;
    this.dayly = dayly;
    this.type = type;

    };

  regNewCar(l_plate){


    switch (C_Reg.some( i => i.Placa === this.l_plate)) {



    case (true):

    console.log('\x1b[31mHUMM! \u{1F914}  \x1b[0m\x1b[31mCarro de Mesma Placa Encontrado! - Favor Verificar! Placas em Conflito:', `\x1b[1m${this.l_plate}\x1b[0m`);

    break;

    case(false):


    C_Reg.push({

      "TIPO DE VEÍCULO": this.type,
      Modelo: this.model,
      Placa: this.l_plate,
      Cor: this.colour,
      Ano: this.year,
      "Km/h": this.kmH,
      "Diária": this.dayly,

      "N° Passageiros":this.nPassagers,
      "Bagageiro":this.baggage,
      Autonomia:this.economy,


      "0-100km/H":this.TopSpeed,
      "N° Melhorias":this.attachments

    });


    //let FormatNewCar = `Novo Carro Registrado - Modelo: ${model} Placa n°: ${l_plate}\n`;
    fs.writeFileSync(CarsdataBase,JSON.stringify(C_Reg, null, 2));
    console.log('Novo carro adicionado ao registro.');

    break;

    };

  };

};


class utilityCars extends Cars {

  constructor(model,l_plate,year,colour,kmH,dayly,nPassagers,baggage,economy,type){
    
     super(model,l_plate,year,colour,kmH,dayly,type);

    this.nPassagers =nPassagers;
    this.baggage = baggage;
    this.economy=economy;

    if (this.nPassagers >= 4 && this.baggage >= 400 ){super.type = "Veículo Utilitário"};

  };

};

class sportCars extends Cars {

constructor(model,l_plate,year,colour,kmH,dayly,TopSpeed,attachments,type){

  super(model,l_plate,year,colour,kmH,dayly,type);

  this.TopSpeed = TopSpeed;
  this.attachments = attachments;

  if (this.attachments >= 1 && this.TopSpeed <= 10) {super.type = "Veículo Esportivo"};

  };


};

//CLIENTES

const New_Client01 = new U_Data ("Ana", "Rua 45 - Jardim Goías", "(84) X 35X4-X853","7584026-9","4503817");  
const New_Client02 = new U_Data ("João", "Rua Bandeirantes - Nova Esperança", "(48) X 33X4-X855");  
const New_Client03 = new U_Data ("Mike Wazowski", "Rua 45 - Prol.Paulo Bandeira", "(97) X X5X4-5X83");  
const New_Client04 = new U_Data ("Geraldo", "Rua 45 - Jardim Helena", "(17) X 35X4-X487");



//CARROS DE PASSEIO

const Palio = new Cars ("Pálio","QWE-6843", 2008,"Branco",200,"R$45");
Palio.regNewCar();

const Fusca = new Cars ("Fusca","JKT-8214", 1997,"Vermelho",180,"R$30");
Fusca.regNewCar();

const CitroenC4Cactus = new Cars ("Citroen C4 Cactus","JKT-8214", 2018,"Ciano",240,"R$90");
CitroenC4Cactus.regNewCar();

//CARROS UTILITARIOS

const FordTransit = new utilityCars("Ford Transit","GHF-6487",2016,"Grafite",165,"R$60",6,400,"12 km/l");
FordTransit.regNewCar();

//CARROS ESPORTIVOS

const FordFusion = new sportCars ("FordFusion","MKN-6518", 2019 ,"Branco",200,"R$240",9,2);
FordFusion.regNewCar();

const Fiat500Abarth = new sportCars ("Fiat 500 Abarth","NKT-6215", 2019 ,"Preto",208,"R$240",7.6,5);
Fiat500Abarth.regNewCar();