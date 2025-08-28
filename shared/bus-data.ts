export interface BusRoute {
  id: string;
  regNo: string;
  source: string;
  destination: string;
  operatorName: string;
  busModel: string;
  busType: 'AC' | 'Non-AC' | 'Sleeper' | 'Semi-Sleeper' | 'Volvo' | 'Mini Bus';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: string;
  fare: number;
  seats: number;
  amenities: string[];
  contactNumber: string;
  routeCode: string;
}

export const westBengalCities = [
  'Kolkata',
  'Siliguri', 
  'Durgapur',
  'Asansol',
  'Kharagpur',
  'Malda',
  'Burdwan',
  'Cooch Behar',
  'Jalpaiguri',
  'Krishnanagar',
  'Barasat',
  'Haldia',
  'Raiganj',
  'Purulia',
  'Bankura',
  'Bishnupur',
  'Tamluk',
  'Balurghat',
  'Contai',
  'Diamond Harbour'
];

export const busData: BusRoute[] = [
  {
    id: '1',
    regNo: 'WB 02 AC 1234',
    source: 'Kolkata',
    destination: 'Siliguri',
    operatorName: 'North Bengal State Transport Corporation',
    busModel: 'Volvo B7R',
    busType: 'Volvo',
    departureTime: '06:30',
    arrivalTime: '18:00',
    duration: '11h 30m',
    distance: '584 km',
    fare: 850,
    seats: 49,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle', 'Blanket'],
    contactNumber: '+91 9876543210',
    routeCode: 'KOL-SIL-01'
  },
  {
    id: '2',
    regNo: 'WB 19 PA 5678',
    source: 'Kolkata',
    destination: 'Durgapur',
    operatorName: 'West Bengal Surface Transport Corporation',
    busModel: 'Tata 1512',
    busType: 'AC',
    departureTime: '08:00',
    arrivalTime: '11:30',
    duration: '3h 30m',
    distance: '160 km',
    fare: 280,
    seats: 40,
    amenities: ['AC', 'Reclining Seats'],
    contactNumber: '+91 9876543211',
    routeCode: 'KOL-DUR-02'
  },
  {
    id: '3',
    regNo: 'WB 06 AB 9012',
    source: 'Siliguri',
    destination: 'Cooch Behar',
    operatorName: 'Royal Cruiser',
    busModel: 'Ashok Leyland Viking',
    busType: 'Non-AC',
    departureTime: '09:15',
    arrivalTime: '12:45',
    duration: '3h 30m',
    distance: '145 km',
    fare: 180,
    seats: 45,
    amenities: ['Reclining Seats', 'Music System'],
    contactNumber: '+91 9876543212',
    routeCode: 'SIL-COO-03'
  },
  {
    id: '4',
    regNo: 'WB 02 AC 3456',
    source: 'Kolkata',
    destination: 'Malda',
    operatorName: 'Shyamoli Paribahan',
    busModel: 'Mercedes-Benz OH1623',
    busType: 'AC',
    departureTime: '22:30',
    arrivalTime: '06:00',
    duration: '7h 30m',
    distance: '347 km',
    fare: 520,
    seats: 42,
    amenities: ['AC', 'Semi-Sleeper', 'Blanket', 'Water Bottle'],
    contactNumber: '+91 9876543213',
    routeCode: 'KOL-MAL-04'
  },
  {
    id: '5',
    regNo: 'WB 04 BC 7890',
    source: 'Asansol',
    destination: 'Kolkata',
    operatorName: 'Calcutta State Transport Corporation',
    busModel: 'Bharat Benz 1217C',
    busType: 'Non-AC',
    departureTime: '05:45',
    arrivalTime: '09:30',
    duration: '3h 45m',
    distance: '213 km',
    fare: 220,
    seats: 52,
    amenities: ['Reclining Seats', 'Reading Light'],
    contactNumber: '+91 9876543214',
    routeCode: 'ASA-KOL-05'
  },
  {
    id: '6',
    regNo: 'WB 19 PA 1122',
    source: 'Kharagpur',
    destination: 'Kolkata',
    operatorName: 'South Bengal State Transport',
    busModel: 'Tata Marcopolo',
    busType: 'AC',
    departureTime: '14:00',
    arrivalTime: '17:15',
    duration: '3h 15m',
    distance: '118 km',
    fare: 250,
    seats: 36,
    amenities: ['AC', 'WiFi', 'Charging Point'],
    contactNumber: '+91 9876543215',
    routeCode: 'KHA-KOL-06'
  },
  {
    id: '7',
    regNo: 'WB 02 AC 3344',
    source: 'Kolkata',
    destination: 'Burdwan',
    operatorName: 'Eastern Railway Road Transport',
    busModel: 'Volvo B9R',
    busType: 'Volvo',
    departureTime: '07:30',
    arrivalTime: '10:00',
    duration: '2h 30m',
    distance: '108 km',
    fare: 320,
    seats: 45,
    amenities: ['AC', 'WiFi', 'Entertainment System', 'Water Bottle'],
    contactNumber: '+91 9876543216',
    routeCode: 'KOL-BUR-07'
  },
  {
    id: '8',
    regNo: 'WB 10 CD 5566',
    source: 'Jalpaiguri',
    destination: 'Siliguri',
    operatorName: 'Hill Queen Transport',
    busModel: 'Eicher Skyline Pro',
    busType: 'Mini Bus',
    departureTime: '11:30',
    arrivalTime: '13:00',
    duration: '1h 30m',
    distance: '42 km',
    fare: 85,
    seats: 25,
    amenities: ['Music System'],
    contactNumber: '+91 9876543217',
    routeCode: 'JAL-SIL-08'
  },
  {
    id: '9',
    regNo: 'WB 02 AC 7788',
    source: 'Kolkata',
    destination: 'Purulia',
    operatorName: 'Green Line Paribahan',
    busModel: 'Scania Metrolink',
    busType: 'Semi-Sleeper',
    departureTime: '23:00',
    arrivalTime: '07:30',
    duration: '8h 30m',
    distance: '297 km',
    fare: 450,
    seats: 40,
    amenities: ['Semi-Sleeper', 'Blanket', 'Pillow', 'Water Bottle'],
    contactNumber: '+91 9876543218',
    routeCode: 'KOL-PUR-09'
  },
  {
    id: '10',
    regNo: 'WB 19 PA 9900',
    source: 'Bankura',
    destination: 'Kolkata',
    operatorName: 'Bishnupur Express',
    busModel: 'Force Traveller',
    busType: 'Non-AC',
    departureTime: '16:45',
    arrivalTime: '20:30',
    duration: '3h 45m',
    distance: '195 km',
    fare: 190,
    seats: 17,
    amenities: ['Reclining Seats'],
    contactNumber: '+91 9876543219',
    routeCode: 'BAN-KOL-10'
  },
  {
    id: '11',
    regNo: 'WB 02 AC 1010',
    source: 'Kolkata',
    destination: 'Haldia',
    operatorName: 'Port City Transport',
    busModel: 'Mahindra Tourister',
    busType: 'AC',
    departureTime: '12:15',
    arrivalTime: '15:45',
    duration: '3h 30m',
    distance: '132 km',
    fare: 275,
    seats: 35,
    amenities: ['AC', 'Charging Point', 'Water Bottle'],
    contactNumber: '+91 9876543220',
    routeCode: 'KOL-HAL-11'
  },
  {
    id: '12',
    regNo: 'WB 06 AB 1212',
    source: 'Raiganj',
    destination: 'Malda',
    operatorName: 'North Bengal Express',
    busModel: 'Isuzu NPR',
    busType: 'Non-AC',
    departureTime: '10:30',
    arrivalTime: '12:15',
    duration: '1h 45m',
    distance: '68 km',
    fare: 95,
    seats: 32,
    amenities: ['Music System'],
    contactNumber: '+91 9876543221',
    routeCode: 'RAI-MAL-12'
  },
  {
    id: '13',
    regNo: 'WB 19 PA 1313',
    source: 'Krishnanagar',
    destination: 'Kolkata',
    operatorName: 'Nadia District Transport',
    busModel: 'Tata 1618',
    busType: 'Non-AC',
    departureTime: '06:00',
    arrivalTime: '09:00',
    duration: '3h 00m',
    distance: '105 km',
    fare: 135,
    seats: 50,
    amenities: ['Reclining Seats', 'Reading Light'],
    contactNumber: '+91 9876543222',
    routeCode: 'KRI-KOL-13'
  },
  {
    id: '14',
    regNo: 'WB 02 AC 1414',
    source: 'Kolkata',
    destination: 'Balurghat',
    operatorName: 'South Dinajpur Express',
    busModel: 'Volvo B11R',
    busType: 'Volvo',
    departureTime: '21:45',
    arrivalTime: '08:15',
    duration: '10h 30m',
    distance: '398 km',
    fare: 680,
    seats: 44,
    amenities: ['AC', 'WiFi', 'Entertainment System', 'Blanket', 'Pillow'],
    contactNumber: '+91 9876543223',
    routeCode: 'KOL-BAL-14'
  },
  {
    id: '15',
    regNo: 'WB 19 PA 1515',
    source: 'Barasat',
    destination: 'Kolkata',
    operatorName: 'North 24 Parganas Transport',
    busModel: 'Ashok Leyland Lynx',
    busType: 'Non-AC',
    departureTime: '08:30',
    arrivalTime: '10:15',
    duration: '1h 45m',
    distance: '52 km',
    fare: 75,
    seats: 42,
    amenities: ['Music System'],
    contactNumber: '+91 9876543224',
    routeCode: 'BAR-KOL-15'
  }
];

export const getUniqueSourcesAndDestinations = () => {
  const sources = new Set<string>();
  const destinations = new Set<string>();
  
  busData.forEach(bus => {
    sources.add(bus.source);
    destinations.add(bus.destination);
  });
  
  return {
    sources: Array.from(sources).sort(),
    destinations: Array.from(destinations).sort()
  };
};

export const filterBuses = (source?: string, destination?: string) => {
  return busData.filter(bus => {
    const sourceMatch = !source || bus.source === source;
    const destinationMatch = !destination || bus.destination === destination;
    return sourceMatch && destinationMatch;
  });
};
