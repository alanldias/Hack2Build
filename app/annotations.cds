using { hack2BuildSrv } from '../srv/service.cds';

annotate hack2BuildSrv.Vehicle with @UI.HeaderInfo: { TypeName: 'Vehicle', TypeNamePlural: 'Vehicles', Title: { Value: licensePlate } };
annotate hack2BuildSrv.Vehicle with {
  ID @UI.Hidden @Common.Text: { $value: licensePlate, ![@UI.TextArrangement]: #TextOnly }
};
annotate hack2BuildSrv.Vehicle with @UI.Identification: [{ Value: licensePlate }];
annotate hack2BuildSrv.Vehicle with {
  licensePlate @title: 'License Plate';
  driverName @title: 'Driver Name';
  company @title: 'Company'
};

annotate hack2BuildSrv.Vehicle with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: licensePlate },
 { $Type: 'UI.DataField', Value: driverName },
 { $Type: 'UI.DataField', Value: company }
];

annotate hack2BuildSrv.Vehicle with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: licensePlate },
 { $Type: 'UI.DataField', Value: driverName },
 { $Type: 'UI.DataField', Value: company }
  ]
};

annotate hack2BuildSrv.Vehicle with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate hack2BuildSrv.Vehicle with @UI.SelectionFields: [
  licensePlate
];

annotate hack2BuildSrv.Product with @UI.HeaderInfo: { TypeName: 'Product', TypeNamePlural: 'Products', Title: { Value: productID } };
annotate hack2BuildSrv.Product with {
  ID @UI.Hidden @Common.Text: { $value: productID, ![@UI.TextArrangement]: #TextOnly }
};
annotate hack2BuildSrv.Product with @UI.Identification: [{ Value: productID }];
annotate hack2BuildSrv.Product with {
  productID @title: 'ID';
  productName @title: 'Product Name'
};

annotate hack2BuildSrv.Product with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: productID },
 { $Type: 'UI.DataField', Value: productName }
];

annotate hack2BuildSrv.Product with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: productID },
 { $Type: 'UI.DataField', Value: productName }
  ]
};

annotate hack2BuildSrv.Product with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate hack2BuildSrv.Product with @UI.SelectionFields: [
  productID
];

annotate hack2BuildSrv.Scale with @UI.HeaderInfo: { TypeName: 'Scale', TypeNamePlural: 'Scales', Title: { Value: scaleID } };
annotate hack2BuildSrv.Scale with {
  ID @UI.Hidden @Common.Text: { $value: scaleID, ![@UI.TextArrangement]: #TextOnly }
};
annotate hack2BuildSrv.Scale with @UI.Identification: [{ Value: scaleID }];
annotate hack2BuildSrv.Scale with {
  scaleID @title: 'ID';
  status @title: 'Status';
  currentWeight @title: 'Current Weight'
};

annotate hack2BuildSrv.Scale with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: scaleID },
 { $Type: 'UI.DataField', Value: status },
 { $Type: 'UI.DataField', Value: currentWeight }
];

annotate hack2BuildSrv.Scale with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: scaleID },
 { $Type: 'UI.DataField', Value: status },
 { $Type: 'UI.DataField', Value: currentWeight }
  ]
};

annotate hack2BuildSrv.Scale with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate hack2BuildSrv.Scale with @UI.SelectionFields: [
  scaleID
];

annotate hack2BuildSrv.Weighing with @UI.HeaderInfo: { TypeName: 'Weighing', TypeNamePlural: 'Weighings', Title: { Value: weighingID } };
annotate hack2BuildSrv.Weighing with {
  ID @UI.Hidden @Common.Text: { $value: weighingID, ![@UI.TextArrangement]: #TextOnly }
};
annotate hack2BuildSrv.Weighing with @UI.Identification: [{ Value: weighingID }];
annotate hack2BuildSrv.Weighing with {
  vehicle @Common.ValueList: {
    CollectionPath: 'Vehicle',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: vehicle_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'licensePlate'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'driverName'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'company'
      },
    ],
  }
};
annotate hack2BuildSrv.Weighing with {
  product @Common.ValueList: {
    CollectionPath: 'Product',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: product_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'productID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'productName'
      },
    ],
  }
};
annotate hack2BuildSrv.Weighing with {
  scale @Common.ValueList: {
    CollectionPath: 'Scale',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: scale_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'scaleID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'status'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'currentWeight'
      },
    ],
  }
};
annotate hack2BuildSrv.Weighing with {
  weighingID @title: 'ID';
  vehicleLicensePlate @title: 'Vehicle License Plate';
  tareWeight @title: 'Tare Weight';
  grossWeight @title: 'Gross Weight';
  netWeight @title: 'Net Weight';
  timestamp @title: 'Timestamp'
};

annotate hack2BuildSrv.Weighing with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: weighingID },
 { $Type: 'UI.DataField', Value: vehicleLicensePlate },
 { $Type: 'UI.DataField', Value: tareWeight },
 { $Type: 'UI.DataField', Value: grossWeight },
 { $Type: 'UI.DataField', Value: netWeight },
 { $Type: 'UI.DataField', Value: timestamp },
    { $Type: 'UI.DataField', Label: 'Vehicle', Value: vehicle_ID },
    { $Type: 'UI.DataField', Label: 'Product', Value: product_ID },
    { $Type: 'UI.DataField', Label: 'Scale', Value: scale_ID }
];

annotate hack2BuildSrv.Weighing with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: weighingID },
 { $Type: 'UI.DataField', Value: vehicleLicensePlate },
 { $Type: 'UI.DataField', Value: tareWeight },
 { $Type: 'UI.DataField', Value: grossWeight },
 { $Type: 'UI.DataField', Value: netWeight },
 { $Type: 'UI.DataField', Value: timestamp },
    { $Type: 'UI.DataField', Label: 'Vehicle', Value: vehicle_ID },
    { $Type: 'UI.DataField', Label: 'Product', Value: product_ID },
    { $Type: 'UI.DataField', Label: 'Scale', Value: scale_ID }
  ]
};

annotate hack2BuildSrv.Weighing with {
  vehicle @Common.Text: { $value: vehicle.licensePlate, ![@UI.TextArrangement]: #TextOnly };
  product @Common.Text: { $value: product.productID, ![@UI.TextArrangement]: #TextOnly };
  scale @Common.Text: { $value: scale.scaleID, ![@UI.TextArrangement]: #TextOnly }
};

annotate hack2BuildSrv.Weighing with {
  vehicle @Common.Label: 'Vehicle';
  product @Common.Label: 'Product';
  scale @Common.Label: 'Scale'
};

annotate hack2BuildSrv.Weighing with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate hack2BuildSrv.Weighing with @UI.SelectionFields: [
  vehicle_ID,
  product_ID,
  scale_ID
];

