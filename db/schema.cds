namespace Hack2Build;
using { cuid, managed } from '@sap/cds/common';

entity Vehicle : cuid {
  licensePlate: String(20);
  driverName: String(100);
  company: String(100);
}

@assert.unique: { productID: [productID] }
entity Product : cuid {
  productID: String(20) @mandatory;
  productName: String(100);
}

@assert.unique: { scaleID: [scaleID] }
entity Scale : cuid {
  scaleID: String(20) @mandatory;
  status: String(20);
  currentWeight: Decimal(10,2);
}

entity Weighing : cuid {
  weighingID: String(20);
  vehicleLicensePlate: String(20);
  tareWeight: Decimal(10,2);
  grossWeight: Decimal(10,2);
  netWeight: Decimal(10,2);
  timestamp: String(30);
  productCode: String(20);
  productName: String(100);
  company: String(100);


  vehicle        : Association to Vehicle;
  product        : Association to Product;
  scale          : Association to Scale;
  contract       : Association to ACMContracts;
  classification : Association to Classification;
  transgenics    : Association to Transgenics;

}

entity Classification : cuid {
  weighing : Association to Weighing @assert.unique;

  humidity         : Decimal(5,2);
  impurity         : Decimal(5,2);
  damaged          : Decimal(5,2);
  greenish         : Decimal(5,2);

  resultHumidity   : Decimal(5,2);
  resultImpurity   : Decimal(5,2);
  resultDamaged    : Decimal(5,2);
  resultGreenish   : Decimal(5,2);

  discountHumidity : Decimal(5,2);
  discountImpurity : Decimal(5,2);
  discountDamaged  : Decimal(5,2);
  discountGreenish : Decimal(5,2);
}

entity Transgenics : cuid {
  weighing : Association to Weighing @assert.unique;

  declared        : Boolean;
  participant     : Boolean;
  rrConvention    : Boolean;
  testedNegative  : Boolean;
  testedPositive  : Boolean;
}

entity ACMContracts : cuid, managed {
  contractNumber : String(10) @mandatory;
  contractType   : String(4); 
  customer       : String(100);
  material       : String(18);
  materialName   : String(100);
  plant          : String(4);
  amount         : Decimal(20,2);

  weighings : Composition of many Weighing on weighings.contract = $self;
  products  : Association to many ACMContractProducts on products.contract = $self;
  vehicles  : Association to many ACMContractVehicles on vehicles.contract = $self;
}

entity ACMContractProducts : cuid {
  contract : Association to ACMContracts;
  product  : Association to Product;
}

entity ACMContractVehicles : cuid {
  contract : Association to ACMContracts;
  vehicle  : Association to Vehicle;
}
