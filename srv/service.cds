using { Hack2Build as my } from '../db/schema.cds';

@path: '/service/hack2Build'
@requires: 'authenticated-user'
service hack2BuildSrv {

  entity Vehicle as projection on my.Vehicle {
    ID,
    licensePlate,
    driverName,
    company
  };
  @odata.draft.enabled
  entity Product as projection on my.Product;
  @odata.draft.enabled
  entity Scale as projection on my.Scale;
  
  entity Weighing as projection on my.Weighing;

  entity Classification as projection on my.Classification;

  // Define an entity named 'transgenics' as a projection of the 'my.transgenics' entity
  entity Transgenics as projection on my.Transgenics;

}