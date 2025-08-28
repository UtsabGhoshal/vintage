import { useState, useMemo } from "react";
import { BusSpottingRecord, busSpottingData, getUniqueBusStands, getBusesByStand, getBusCountByStand, getModelCountByStand } from "@shared/bus-spotting-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Bus, Eye, Target, Hash, Clock, RotateCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Index() {
  const [selectedBusStand, setSelectedBusStand] = useState<string>("");
  
  const busStands = useMemo(() => getUniqueBusStands(), []);
  const busesAtStand = useMemo(() => selectedBusStand ? getBusesByStand(selectedBusStand) : [], [selectedBusStand]);
  const busCountByStand = useMemo(() => getBusCountByStand(), []);
  const modelCountAtStand = useMemo(() => selectedBusStand ? getModelCountByStand(selectedBusStand) : new Map(), [selectedBusStand]);

  const clearSelection = () => {
    setSelectedBusStand("");
  };

  const getScheduleIcon = (type: string) => {
    if (type.includes('FIXED') || type.includes('F(')) {
      return <Clock className="w-4 h-4 text-blue-500" />;
    }
    return <RotateCw className="w-4 h-4 text-green-500" />;
  };

  const getScheduleColor = (type: string) => {
    if (type.includes('FIXED') || type.includes('F(')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getScheduleType = (type: string) => {
    if (type.includes('FIXED') || type.includes('F(')) {
      return 'FIXED';
    }
    if (type === 'N/A') {
      return 'N/A';
    }
    return 'ROTATION';
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-transport-blue rounded-xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bengal Bus Spotting</h1>
                <p className="text-sm text-gray-600">Bus Enthusiast Spotting Guide</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span>Find buses at any bus stand across West Bengal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Spot <span className="text-transport-blue">Vintage Buses</span> at Any Stand
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Find all buses operating from specific bus stands across West Bengal. Perfect for enthusiasts who want to spot TATA 1210, 1510, and other classic models at their favorite locations.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <Card className="bg-transport-blue text-white">
              <CardContent className="p-4 text-center">
                <Bus className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{busSpottingData.length}</div>
                <div className="text-sm opacity-90">Total Buses</div>
              </CardContent>
            </Card>
            <Card className="bg-transport-green text-white">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{busStands.length}</div>
                <div className="text-sm opacity-90">Bus Stands</div>
              </CardContent>
            </Card>
            <Card className="bg-transport-orange text-white">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-90">Bus Models</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 text-white">
              <CardContent className="p-4 text-center">
                <Eye className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">SPOT</div>
                <div className="text-sm opacity-90">& Document</div>
              </CardContent>
            </Card>
          </div>

          {/* Bus Stand Selector */}
          <Card className="max-w-4xl mx-auto shadow-lg border-blue-100">
            <CardHeader className="bg-gradient-to-r from-transport-blue to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                Bus Stand Spotting Guide
              </CardTitle>
              <CardDescription className="text-blue-100">
                Select any bus stand to see all buses operating from that location
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Select Bus Stand</label>
                  <Select value={selectedBusStand} onValueChange={setSelectedBusStand}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a bus stand to explore" />
                    </SelectTrigger>
                    <SelectContent>
                      {busStands.map(stand => (
                        <SelectItem key={stand} value={stand}>
                          {stand} ({busCountByStand.get(stand) || 0} buses)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={clearSelection} 
                    variant="outline" 
                    className="flex-1"
                    disabled={!selectedBusStand}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
              
              {selectedBusStand && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      📍 {selectedBusStand} Bus Stand
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div className="text-blue-800">
                        <strong>{busesAtStand.length}</strong> buses spotted
                      </div>
                      <div className="text-blue-800">
                        <strong>{modelCountAtStand.size}</strong> different models
                      </div>
                      <div className="text-blue-800">
                        <strong>{new Set(busesAtStand.map(b => b.destination)).size}</strong> destinations
                      </div>
                      <div className="text-blue-800">
                        <strong>{busesAtStand.filter(b => getScheduleType(b.type) === 'FIXED').length}</strong> fixed schedules
                      </div>
                    </div>
                  </div>

                  {/* Model Breakdown */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Models at this stand:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(modelCountAtStand.entries()).map(([model, count]) => (
                        <Badge key={model} variant="outline" className="text-xs">
                          {model} ({count})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bus Spotting Grid */}
        {selectedBusStand && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Buses at <span className="text-transport-blue">{selectedBusStand}</span> Bus Stand
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {busesAtStand.map((bus) => {
                return (
                  <Card key={bus.id} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-gray-200 overflow-hidden group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-900 mb-1 font-mono">
                            {bus.regNo}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className={`text-xs ${getScheduleColor(bus.type)}`}>
                              {getScheduleIcon(bus.type)}
                              {getScheduleType(bus.type)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-transport-blue font-mono">{bus.model}</div>
                          <div className="text-xs text-gray-500">Model</div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Route Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">From:</span>
                          <span className={`font-medium font-mono px-2 py-1 rounded ${bus.source === selectedBusStand ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-transport-blue'}`}>
                            {bus.source}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">To:</span>
                          <span className={`font-medium ${bus.destination === selectedBusStand ? 'bg-orange-50 text-orange-800 px-2 py-1 rounded' : ''}`}>
                            {bus.destination || 'N/A'}
                          </span>
                        </div>
                        {bus.source === selectedBusStand && bus.destination && (
                          <div className="text-xs text-green-600 font-medium">
                            🚌 Departing from this stand
                          </div>
                        )}
                        {bus.destination === selectedBusStand && bus.destination && (
                          <div className="text-xs text-orange-600 font-medium">
                            🏁 Arriving at this stand
                          </div>
                        )}
                        {bus.type !== 'ROTATION' && bus.type !== 'N/A' && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Schedule:</span>
                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                              {bus.type.replace('FIXED', '').replace('F', '')}
                            </span>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Spotting Info */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Spotting Info</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 bg-gray-50 rounded">
                            <div className="font-medium text-gray-900">Registration</div>
                            <div className="text-gray-600 font-mono">{bus.regNo}</div>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <div className="font-medium text-gray-900">Bus Model</div>
                            <div className="text-gray-600 font-mono">{bus.model}</div>
                          </div>
                        </div>
                      </div>

                      {/* Spotting Action */}
                      <div className="pt-2 border-t">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full group-hover:bg-transport-green group-hover:text-white transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Mark as Spotted
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* No buses message */}
        {!selectedBusStand && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Bus Stand</h3>
              <p className="text-gray-600 mb-4">
                Choose any bus stand from the dropdown above to see all buses operating from that location.
              </p>
              <p className="text-sm text-gray-500">
                Perfect for planning your next bus spotting adventure!
              </p>
            </div>
          </div>
        )}

        {/* Spotting Tips */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 border-transport-blue/20">
            <div className="w-12 h-12 bg-transport-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Bus Stand Spotting</h3>
            <p className="text-gray-600 text-sm">
              Find all buses operating from any bus stand. Perfect for planning spotting trips to specific locations.
            </p>
          </Card>
          
          <Card className="text-center p-6 border-transport-green/20">
            <div className="w-12 h-12 bg-transport-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Model Hunting</h3>
            <p className="text-gray-600 text-sm">
              Track down rare TATA 1210s, 1510s, and other vintage models. Rarity indicators help you find the gems.
            </p>
          </Card>
          
          <Card className="text-center p-6 border-transport-orange/20">
            <div className="w-12 h-12 bg-transport-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Registration Tracking</h3>
            <p className="text-gray-600 text-sm">
              Complete registration numbers and schedules for accurate spotting and documentation.
            </p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-transport-blue rounded-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Bengal Bus Spotting</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate guide for bus spotting across West Bengal
            </p>
            <div className="text-sm text-gray-500">
              Spot • Document • Share • {busSpottingData.length} buses across {busStands.length} stands
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
