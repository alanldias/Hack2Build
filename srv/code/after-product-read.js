/**
 * The custom logic attached to the Product entity to perform calculations or data transformations after reading product records, particularly in relation to trading contracts.
 * @After(event = { "READ" }, entity = "hack2BuildSrv.Product")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(results, request) {
    // Check if results are undefined or empty
    if (!results) return;

    // Ensure results is an array for consistent processing
    const products = Array.isArray(results) ? results : [results];

    // Perform calculations or data transformations
    products.forEach(product => {
        // Example transformation: Add a property indicating trading eligibility
        // Hypothetical condition: If productName contains 'Trade', it's eligible
        product.isEligibleForTrading = product.productName.includes('Trade');
    });
};
