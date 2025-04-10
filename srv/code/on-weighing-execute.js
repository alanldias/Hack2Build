/**
 * The custom logic attached to the Weighing entity to execute goods movements based on weighing records, ensuring proper application of trading contracts.
 * @On(event = { "execute" }, entity = "hack2BuildSrv.Weighing")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
  const { Weighing, Vehicle, Product, Scale } = cds.entities;

  // Extract the weighing ID from the request parameters
  const weighingID = request.data.weighingID;
  if (!weighingID) {
    return request.reject(400, 'Weighing ID is required');
  }

  // Retrieve the weighing record
  const weighingRecord = await SELECT.one.from(Weighing).where({ weighingID });
  if (!weighingRecord) {
    return request.reject(404, 'Weighing record not found');
  }

  // Retrieve associated vehicle, product, and scale details
  const vehicleRecord = await SELECT.one.from(Vehicle).where({ licensePlate: weighingRecord.vehicleLicensePlate });
  const productRecord = await SELECT.one.from(Product).where({ ID: weighingRecord.product_ID });
  const scaleRecord = await SELECT.one.from(Scale).where({ ID: weighingRecord.scale_ID });

  if (!vehicleRecord || !productRecord || !scaleRecord) {
    return request.reject(404, 'Associated records not found');
  }

  // Calculate net weight if not already calculated
  if (weighingRecord.netWeight === undefined) {
    weighingRecord.netWeight = weighingRecord.grossWeight - weighingRecord.tareWeight;
  }

  // Ensure proper application of trading contracts (business logic can be added here)
  // For example, check if the net weight meets certain criteria or update related records

  // Respond with the updated weighing record
  return weighingRecord;
}
