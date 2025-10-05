// Script to add 20 appliances with different purchase dates and warranty periods
// Categorizing them into active warranties, expiring soon, and expired

// Helper function to generate random dates
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate 20 appliances with different statuses
const appliances = [
  // Active warranties (purchased 1-2 years ago with 3-year warranties)
  {
    name: "Samsung Smart TV",
    brand: "Samsung",
    model: "QN65Q80TAFXZA",
    purchase_date: "2023-05-15",
    warranty_years: 3,
    serial_number: "SAMSUNG12345",
    purchase_location: "Best Buy",
    service_contacts: [
      { name: "Samsung Support", phone: "(800) 757-0258", email: "support@samsung.com" }
    ],
    maintenance_tasks: [
      { name: "Firmware Update", date: "2024-05-15", frequency: "Annual" }
    ]
  },
  {
    name: "Whirlpool Refrigerator",
    brand: "Whirlpool",
    model: "WRX735SDHZ",
    purchase_date: "2022-11-20",
    warranty_years: 3,
    serial_number: "WHIRLPOOL67890",
    purchase_location: "Home Depot",
    service_contacts: [
      { name: "Whirlpool Service", phone: "(800) 253-1301", email: "service@whirlpool.com" }
    ],
    maintenance_tasks: [
      { name: "Clean Condenser Coils", date: "2024-11-20", frequency: "Semi-Annual" }
    ]
  },
  {
    name: "Bosch Dishwasher",
    brand: "Bosch",
    model: "SHPM88Z75N",
    purchase_date: "2023-01-10",
    warranty_years: 2,
    serial_number: "BOSCH54321",
    purchase_location: "Amazon",
    service_contacts: [
      { name: "Bosch Customer Support", phone: "(877) 267-2489", email: "support@bosch-home.com" }
    ],
    maintenance_tasks: [
      { name: "Replace Water Filter", date: "2024-07-10", frequency: "Quarterly" }
    ]
  },
  {
    name: "LG Washing Machine",
    brand: "LG",
    model: "WM4000HWA",
    purchase_date: "2022-08-30",
    warranty_years: 3,
    serial_number: "LG987654321",
    purchase_location: "Lowe's",
    service_contacts: [
      { name: "LG Support", phone: "(800) 243-0000", email: "support@lg.com" }
    ],
    maintenance_tasks: [
      { name: "Clean Lint Filter", date: "2024-02-28", frequency: "Monthly" }
    ]
  },
  {
    name: "KitchenAid Stand Mixer",
    brand: "KitchenAid",
    model: "KSM150PSER",
    purchase_date: "2023-03-22",
    warranty_years: 1,
    serial_number: "KITCHENAID11111",
    purchase_location: "Williams Sonoma",
    service_contacts: [
      { name: "KitchenAid Service", phone: "(800) 541-6390", email: "service@kitchenaid.com" }
    ],
    maintenance_tasks: [
      { name: "Lubricate Motor", date: "2024-03-22", frequency: "Annual" }
    ]
  },
  
  // Expiring soon (warranties ending within 30 days)
  {
    name: "Dyson Vacuum Cleaner",
    brand: "Dyson",
    model: "V11 Absolute",
    purchase_date: "2021-11-10",
    warranty_years: 2,
    serial_number: "DYSON22222",
    purchase_location: "Dyson Store",
    service_contacts: [
      { name: "Dyson Support", phone: "(866) 973-2739", email: "support@dyson.com" }
    ],
    maintenance_tasks: [
      { name: "Replace Filter", date: "2024-10-20", frequency: "Annual" }
    ]
  },
  {
    name: "Ninja Blender",
    brand: "Ninja",
    model: "BN801",
    purchase_date: "2022-12-01",
    warranty_years: 1,
    serial_number: "NINJA33333",
    purchase_location: "Target",
    service_contacts: [
      { name: "Ninja Support", phone: "(800) 458-2273", email: "support@ninja.com" }
    ],
    maintenance_tasks: [
      { name: "Clean Blades", date: "2024-10-25", frequency: "Monthly" }
    ]
  },
  {
    name: "Cuisinart Coffee Maker",
    brand: "Cuisinart",
    model: "DCC-3200",
    purchase_date: "2022-10-25",
    warranty_years: 3,
    serial_number: "CUISINART44444",
    purchase_location: "Bed Bath & Beyond",
    service_contacts: [
      { name: "Cuisinart Service", phone: "(800) 727-1888", email: "service@cuisinart.com" }
    ],
    maintenance_tasks: [
      { name: "Descaling", date: "2024-10-30", frequency: "Monthly" }
    ]
  },
  
  // Expired warranties (purchased 3+ years ago with 1-2 year warranties)
  {
    name: "Panasonic Microwave",
    brand: "Panasonic",
    model: "NN-SN966S",
    purchase_date: "2020-06-15",
    warranty_years: 1,
    serial_number: "PANASONIC55555",
    purchase_location: "Costco",
    service_contacts: [
      { name: "Panasonic Support", phone: "(800) 211-7262", email: "support@panasonic.com" }
    ],
    maintenance_tasks: [
      { name: "Clean Interior", date: "2023-06-15", frequency: "Monthly" }
    ]
  },
  {
    name: "Black & Decker Toaster",
    brand: "Black & Decker",
    model: "TR2000B",
    purchase_date: "2019-03-10",
    warranty_years: 2,
    serial_number: "B&D66666",
    purchase_location: "Walmart",
    service_contacts: [
      { name: "B&D Support", phone: "(800) 428-4384", email: "support@blackanddecker.com" }
    ],
    maintenance_tasks: [
      { name: "Clean Crumb Tray", date: "2021-03-10", frequency: "Monthly" }
    ]
  },
  {
    name: "Hamilton Beach Food Processor",
    brand: "Hamilton Beach",
    model: "70725",
    purchase_date: "2020-09-05",
    warranty_years: 2,
    serial_number: "HAMILTON77777",
    purchase_location: "Kmart",
    service_contacts: [
      { name: "Hamilton Beach Service", phone: "(800) 851-8900", email: "service@hamiltonbeach.com" }
    ],
    maintenance_tasks: [
      { name: "Sharpen Blades", date: "2022-09-05", frequency: "Annual" }
    ]
  },
  {
    name: "Oster Rice Cooker",
    brand: "Oster",
    model: "CKSTRCQSV2",
    purchase_date: "2021-01-20",
    warranty_years: 1,
    serial_number: "OSTER88888",
    purchase_location: "Amazon",
    service_contacts: [
      { name: "Oster Support", phone: "(800) 548-6900", email: "support@oster.com" }
    ],
    maintenance_tasks: [
      { name: "Clean Heating Plate", date: "2022-01-20", frequency: "Monthly" }
    ]
  },
  {
    name: "Breville Coffee Machine",
    brand: "Breville",
    model: "BES870XL",
    purchase_date: "2020-12-12",
    warranty_years: 1,
    serial_number: "BREVILLE99999",
    purchase_location: "Bed Bath & Beyond",
    service_contacts: [
      { name: "Breville Service", phone: "(866) 273-8455", email: "service@breville.com" }
    ],
    maintenance_tasks: [
      { name: "Descale Machine", date: "2021-12-12", frequency: "Monthly" }
    ]
  },
  {
    name: "Vitamix Blender",
    brand: "Vitamix",
    model: "5200",
    purchase_date: "2019-07-18",
    warranty_years: 7,
    serial_number: "VITAMIX10101",
    purchase_location: "Vitamix Store",
    service_contacts: [
      { name: "Vitamix Support", phone: "(800) 848-2649", email: "support@vitamix.com" }
    ],
    maintenance_tasks: [
      { name: "Tighten Blade Base", date: "2024-07-18", frequency: "Annual" }
    ]
  },
  {
    name: "Instant Pot",
    brand: "Instant Pot",
    model: "DUO60VC",
    purchase_date: "2021-04-30",
    warranty_years: 1,
    serial_number: "INSTANT11112",
    purchase_location: "Costco",
    service_contacts: [
      { name: "Instant Pot Support", phone: "(877) 296-7668", email: "support@instantpot.com" }
    ],
    maintenance_tasks: [
      { name: "Check Sealing Ring", date: "2022-04-30", frequency: "Monthly" }
    ]
  },
  {
    name: "Keurig Coffee Maker",
    brand: "Keurig",
    model: "K-Classic",
    purchase_date: "2020-02-14",
    warranty_years: 1,
    serial_number: "KEURIG12121",
    purchase_location: "Target",
    service_contacts: [
      { name: "Keurig Service", phone: "(866) 599-8153", email: "service@keurig.com" }
    ],
    maintenance_tasks: [
      { name: "Descale Machine", date: "2021-02-14", frequency: "Monthly" }
    ]
  },
  {
    name: "Nespresso Machine",
    brand: "Nespresso",
    model: "VertuoPlus",
    purchase_date: "2021-08-22",
    warranty_years: 2,
    serial_number: "NESPRESSO13131",
    purchase_location: "Nespresso Boutique",
    service_contacts: [
      { name: "Nespresso Support", phone: "(800) 551-1515", email: "support@nespresso.com" }
    ],
    maintenance_tasks: [
      { name: "Clean Machine", date: "2023-08-22", frequency: "Monthly" }
    ]
  },
  {
    name: "Crock-Pot Slow Cooker",
    brand: "Crock-Pot",
    model: "SCV700C",
    purchase_date: "2019-11-11",
    warranty_years: 1,
    serial_number: "CROCKPOT14141",
    purchase_location: "Walmart",
    service_contacts: [
      { name: "Crock-Pot Service", phone: "(800) 879-9275", email: "service@crockpot.com" }
    ],
    maintenance_tasks: [
      { name: "Check Cord", date: "2020-11-11", frequency: "Annual" }
    ]
  },
  {
    name: "Roku Streaming Device",
    brand: "Roku",
    model: "Ultra LT",
    purchase_date: "2020-05-01",
    warranty_years: 1,
    serial_number: "ROKU15151",
    purchase_location: "Best Buy",
    service_contacts: [
      { name: "Roku Support", phone: "(888) 729-7658", email: "support@roku.com" }
    ],
    maintenance_tasks: [
      { name: "Update Software", date: "2024-05-01", frequency: "Quarterly" }
    ]
  },
  {
    name: "Sonos Speaker",
    brand: "Sonos",
    model: "S12",
    purchase_date: "2021-03-17",
    warranty_years: 1,
    serial_number: "SONOS16161",
    purchase_location: "Sonos Store",
    service_contacts: [
      { name: "Sonos Support", phone: "(888) 766-6711", email: "support@sonos.com" }
    ],
    maintenance_tasks: [
      { name: "Firmware Update", date: "2024-03-17", frequency: "Annual" }
    ]
  }
];

// Function to add appliances via the API
async function addAppliances() {
  console.log("Adding 20 appliances to the Home Appliance Tracker...\n");
  
  let activeCount = 0;
  let expiringSoonCount = 0;
  let expiredCount = 0;
  
  for (const appliance of appliances) {
    try {
      const response = await fetch('http://localhost:5000/api/appliances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appliance)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✓ Added ${appliance.name} (ID: ${result.id})`);
        
        // Categorize for reporting
        const purchaseDate = new Date(appliance.purchase_date);
        const warrantyEndDate = new Date(purchaseDate);
        warrantyEndDate.setFullYear(purchaseDate.getFullYear() + appliance.warranty_years);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((warrantyEndDate - today) / (1000 * 60 * 60 * 24));
        
        if (warrantyEndDate > today) {
          if (daysUntilExpiry <= 30) {
            expiringSoonCount++;
          } else {
            activeCount++;
          }
        } else {
          expiredCount++;
        }
      } else {
        console.error(`✗ Failed to add ${appliance.name}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`✗ Error adding ${appliance.name}: ${error.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(50));
  console.log("APPLIANCE WARRANTY SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total Appliances Added: ${appliances.length}`);
  console.log(`Active Warranties: ${activeCount}`);
  console.log(`Expiring Soon (≤30 days): ${expiringSoonCount}`);
  console.log(`Expired Warranties: ${expiredCount}`);
  console.log("=".repeat(50));
  console.log("\nData addition complete!");
  console.log("You can now view these appliances in your Home Appliance Tracker application.");
}

// Run the function
addAppliances();