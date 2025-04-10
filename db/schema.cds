namespace Hack2Build;
using { cuid } from '@sap/cds/common';

@assert.unique: { licensePlate: [licensePlate] }
entity Vehicle : cuid {
  licensePlate: String(20) @mandatory;
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

