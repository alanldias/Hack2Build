using { Hack2Build as my } from '../db/schema.cds';

@path: '/service/hack2Build'
service hack2BuildSrv {

  entity Vehicle as projection on my.Vehicle {
    ID,
    licensePlate,
    driverName,
    company,
    productCode,
    productName
  };
  @odata.draft.enabled
  entity Product as projection on my.Product;
  @odata.draft.enabled
  entity Scale as projection on my.Scale;
  
  entity Weighing as projection on my.Weighing{
    key ID,
    *,
    contractID
  };

  entity Classification as projection on my.Classification;

  // Define an entity named 'transgenics' as a projection of the 'my.transgenics' entity
  entity Transgenics as projection on my.Transgenics;

  entity ACMContracts as projection on my.ACMContracts;

  entity ACMContractProducts as projection on my.ACMContractProducts;
  entity ACMContractVehicles as projection on my.ACMContractVehicles;

  
 

  entity WeighingSummary as select from Weighing {
    ID                          as weighingKeyID,
    timestamp                   as date,
    timestamp                   as time,
    vehicle.licensePlate        as plate,
    contract.contractNumber     as contract,
    product.productID           as productCode,
    product.productName         as productName,
    vehicle.company             as supplier,
    netWeight
  }  

  entity WeighingDetails as select from Weighing {
    ID                          as weighingID,
    timestamp                   as weighingDate,
    vehicleLicensePlate         as vehiclePlate,
    product.productID           as productID,
    company                     as supplier,
    contractID,
    
    contract                    ,
    netWeight,
    productCode as material,
    productName as materialName
  }where contractID is null;



entity viewWSummary as select from Weighing {
    ID                          as weighingKeyID,
    timestamp                   as date,
    timestamp                   as time,
    vehicle.licensePlate        as plate,
    contract.contractNumber     as contract,
    product.productID           as productCode,
    product.productName         as productName,
    vehicle.company             as supplier,
    netWeight
}
where contract.ID is null;


  

  // entity viewWSummary as select from WeighingSummary{
  //   weighingKeyID,
  //   date,
  //   time,
  //   plate,
  //   contract,
  //   productCode,
  //   productName,
  //   supplier,
  //   netWeight

  // }where contract is null;

 
  

}

service hack2BuildVW {

    
  
  
  //   entity ContractProductVehicleView as select from my.ACMContractProducts as cp {
  //   key cp.ID as ID,
  //   cp.contract.contractNumber       as contractNumber,
  //   cp.contract.material             as material,
  //   cp.product.productName           as productName,
  //   cp.contract.vehicles[0].vehicle.licensePlate as vehiclePlate,
  //   cp.contract.vehicles[0].vehicle.company      as supplier
  // };

//   entity WeighingView as select from my.Weighing as w {
//   key w.ID,
//   w.weighingID,
//   w.vehicle.company         as company,
//   w.contract.contractNumber as contractNumber,
//   w.product as productID,
//   w.productName     as productName,
//   w.netWeight
// };

  entity ContractVehicleListView as select from my.ACMContracts as cv {
  key cv.ID as ID,
  cv.contractNumber  as contractNumber,
  cv.material        as material,
  cv.materialName    as materialName,
  cv.vehicles        as vehiclePlate,
  cv.customer          as supplier,
  cv.amount           
  
};



// entity ContractSummaryView as select from my.ACMContracts as c {
//   key c.ID                              as ID,
//   c.contractNumber                      as contract,
//   c.material                            as productCode,
//   c.products[0].product.productName     as productName,
//   c.vehicles[0].vehicle.company         as supplier,
//   c.amount                              as contractAmount
//   //c.amount - sum(c.weighings.netWeight) as pendingAmount
// }
// group by
//   c.ID, c.contractNumber, c.material,
//   c.products[0].product.productName,
//   c.vehicles[0].vehicle.company, c.amount
}


