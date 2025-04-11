namespace Hack2Build;
using { cuid } from '@sap/cds/common';


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

@assert.unique: { weighingID: [weighingID] }
entity Weighing : cuid {
  weighingID: String(20) @mandatory;
  vehicleLicensePlate: String(20);
  tareWeight: Decimal(10,2);
  grossWeight: Decimal(10,2);
  netWeight: Decimal(10,2);
  timestamp: String(30);
  vehicle: Association to Vehicle;
  product: Association to Product;
  scale: Association to Scale;
}

entity Classification : cuid {
  weighing : Association to Weighing @assert.unique;

  // Valores principais
  humidity         : Decimal(5,2);
  impurity         : Decimal(5,2);
  damaged          : Decimal(5,2);
  greenish         : Decimal(5,2);

  // Resultados
  resultHumidity   : Decimal(5,2);
  resultImpurity   : Decimal(5,2);
  resultDamaged    : Decimal(5,2);
  resultGreenish   : Decimal(5,2);

  // Descontos
  discountHumidity : Decimal(5,2);
  discountImpurity : Decimal(5,2);
  discountDamaged  : Decimal(5,2);
  discountGreenish : Decimal(5,2);

  // Checkboxes
  declared          : Boolean;
  participant       : Boolean;
  rrConvention      : Boolean;
  testedNegative    : Boolean;
  testedPositive    : Boolean;
}

