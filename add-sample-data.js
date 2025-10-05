// Script to add sample appliance data to the Home Appliance Tracker
// This script will add several appliances with different data to demonstrate the application

const appliances = [
  {
    name: "Samsung Refrigerator",
    brand: "Samsung",
    model: "RF28R7351SR",
    purchase_date: "2022-03-15",
    warranty_years: 2,
    serial_number: "RF28R7351SR123456",
    purchase_location: "Best Buy",
    service_contacts: [
      {
        name: "Samsung Service Center",
        phone: "(800) 757-0258",
        email: "support@samsung.com"
      }
    ],
    maintenance_tasks: [
      {
        name: "Clean Condenser Coils",
        date: "2023-09-20",
        frequency: "Every 6 months"
      }
    ]
  },
  {
    name: "LG Washing Machine",
    brand: "LG",
    model: "WM3900HWA",
    purchase_date: "2021-11-30",
    warranty_years: 3,
    serial_number: "1234567890LGWM",
    purchase_location: "Home Depot",
    service_contacts: [
      {
        name: "LG Customer Support",
        phone: "(800) 243-0000",
        email: "support@lg.com"
      }
    ],
    maintenance_tasks: [
      {
        name: "Clean Lint Filter",
        date: "2023-10-15",
        frequency: "Monthly"
      }
    ]
  },
  {
    name: "Bosch Dishwasher",
    brand: "Bosch",
    model: "SHPM88Z75N",
    purchase_date: "2023-01-10",
    warranty_years: 1,
    serial_number: "BOSCH987654321",
    purchase_location: "Amazon",
    service_contacts: [
      {
        name: "Bosch Service",
        phone: "(877) 267-2489",
        email: "support@bosch-home.com"
      }
    ],
    maintenance_tasks: [
      {
        name: "Replace Water Filter",
        date: "2023-11-01",
        frequency: "Every 3 months"
      }
    ]
  },
  {
    name: "Nest Thermostat",
    brand: "Google",
    model: "T3017US",
    purchase_date: "2022-08-22",
    warranty_years: 2,
    serial_number: "NT00123456789",
    purchase_location: "Google Store",
    service_contacts: [
      {
        name: "Google Nest Support",
        phone: "(844) 954-6378",
        email: "nest-support@google.com"
      }
    ],
    maintenance_tasks: [
      {
        name: "Firmware Update Check",
        date: "2023-10-30",
        frequency: "Quarterly"
      }
    ]
  }
];

// Function to add appliances via the API
async function addAppliances() {
  console.log("Adding sample appliances to the Home Appliance Tracker...\n");
  
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
      } else {
        console.error(`✗ Failed to add ${appliance.name}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`✗ Error adding ${appliance.name}: ${error.message}`);
    }
  }
  
  console.log("\nSample data addition complete!");
  console.log("You can now view these appliances in your Home Appliance Tracker application.");
}

// Run the function
addAppliances();