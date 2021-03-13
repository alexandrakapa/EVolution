export const columns = [
    {
      name: "CarID",
      label: "Car ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Model",
      label: "Model",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "EnergyCost",
      label: "Energy Cost (kWh/km)",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
        name: "TotalKm",
        label: "Total km",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "TotalEnergyConsumed",
        label: "Total Energy Consumed (kWh)",
        options: {
          filter: true,
          sort: false,
        },
      }
    ];