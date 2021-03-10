export const columns = [
    {
      name: "ManufacturerName",
      label: "Manufacturer Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EnergyDelivedInKWh",
      label: "kW delived",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
        name: "TotalKm",
        label: "Total Km",
        options: {
          filter: true,
          sort: false,
        },
      },
    {
        name: "EnergyCostPerKm",
        label: "Mean energy cost per km",
        options: {
          filter: true,
          sort: false,
        },
     },
];