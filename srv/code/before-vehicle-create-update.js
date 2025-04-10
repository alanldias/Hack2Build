/**
 * The custom logic attached to the Vehicle entity to validate data before creating or updating vehicle records, ensuring compliance with business rules related to trading contracts.
 * @Before(event = { "CREATE","UPDATE" }, entity = "hack2BuildSrv.Vehicle")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
  const { Vehicle } = cds.entities;
  const { licensePlate, driverName, company } = request.data;

  // Ensure licensePlate is provided and valid
  if (!licensePlate) {
    return request.reject(400, 'License plate is mandatory.');
  }

  // Check if the vehicle with the same license plate already exists
  const existingVehicle = await SELECT.one.from(Vehicle).where({ licensePlate });
  if (existingVehicle && request.event === 'CREATE') {
    return request.reject(400, 'A vehicle with this license plate already exists.');
  }

  // Validate driverName and company if provided
  if (driverName && driverName.length > 100) {
    return request.reject(400, 'Driver name exceeds maximum length of 100 characters.');
  }

  if (company && company.length > 100) {
    return request.reject(400, 'Company name exceeds maximum length of 100 characters.');
  }

  // Additional business rules related to trading contracts can be implemented here
};
