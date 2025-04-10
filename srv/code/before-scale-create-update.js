/**
 * The custom logic attached to the Scale entity to validate data before creating or updating scale records, ensuring that the correct trading contract is applied.
 * @Before(event = { "CREATE","UPDATE" }, entity = "hack2BuildSrv.Scale")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
  const { Scale } = cds.entities;
  const { scaleID, status, currentWeight } = request.data;

  // Ensure scaleID is unique
  const existingScale = await SELECT.one.from(Scale).where({ scaleID });
  if (existingScale && request.event === 'CREATE') {
    request.reject(400, `Scale with ID ${scaleID} already exists.`);
  }

  // Validate status and currentWeight according to business rules
  if (status === undefined || currentWeight === undefined) {
    request.reject(400, 'Status and current weight must be provided.');
  }

  // Example business rule: currentWeight must be positive
  if (currentWeight <= 0) {
    request.reject(400, 'Current weight must be a positive number.');
  }

  // Additional business logic can be added here
};
