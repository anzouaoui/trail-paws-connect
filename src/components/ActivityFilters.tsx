
import React, { useState } from "react";
import { Calendar, ChevronDown, Filter, MapPin, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { DatePicker } from "@/components/ui/date-picker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActivityType } from "@/components/ActivityCard";
import { Badge } from "@/components/ui/badge";

export interface FilterOptions {
  activityType: ActivityType | 'all';
  dateRange: {
    start?: Date;
    end?: Date;
  };
  locationOption: 'nearby' | 'custom' | '';
  customLocation?: string;
  difficulty: string;
  distance: string;
  elevation: string;
  eventType: string;
  isPremiumUser: boolean;
  savedFilters?: string[];
  showOnlyWithDogs?: boolean;
}

interface ActivityFiltersProps {
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onApplyFilters: () => void;
  resultCount: number;
  isPremiumUser?: boolean;
}

const ActivityFilters = ({
  filterOptions,
  setFilterOptions,
  onApplyFilters,
  resultCount,
  isPremiumUser = false
}: ActivityFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleActivityTypeChange = (value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      activityType: value as ActivityType | 'all'
    }));
  };

  const handleDateRangeChange = (value: string) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const weekend = new Date(today);
    const daysTillSaturday = 6 - today.getDay(); // 6 is Saturday
    weekend.setDate(today.getDate() + daysTillSaturday);
    
    let startDate;
    let endDate;
    
    switch (value) {
      case 'today':
        startDate = today;
        endDate = today;
        break;
      case 'weekend':
        startDate = weekend;
        const endWeekend = new Date(weekend);
        endWeekend.setDate(weekend.getDate() + 1); // Sunday
        endDate = endWeekend;
        break;
      case 'next7':
        startDate = today;
        endDate = nextWeek;
        break;
      default:
        // Custom date range is handled separately through DatePicker
        return;
    }
    
    setFilterOptions(prev => ({
      ...prev,
      dateRange: { start: startDate, end: endDate }
    }));
  };
  
  const handleStartDateChange = (date: Date | undefined) => {
    setFilterOptions(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, start: date }
    }));
  };
  
  const handleEndDateChange = (date: Date | undefined) => {
    setFilterOptions(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, end: date }
    }));
  };

  const handleLocationOptionChange = (value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      locationOption: value as 'nearby' | 'custom' | ''
    }));
  };

  const handleCustomLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions(prev => ({
      ...prev,
      customLocation: e.target.value
    }));
  };

  const handleResetFilters = () => {
    setFilterOptions({
      activityType: 'all',
      dateRange: {},
      locationOption: '',
      difficulty: '',
      distance: '',
      elevation: '',
      eventType: '',
      isPremiumUser: isPremiumUser
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
          </Button>
          
          {filterOptions.activityType !== 'all' && (
            <Badge variant="outline" className="flex gap-1 items-center">
              {filterOptions.activityType}
              <button 
                className="ml-1 hover:text-destructive" 
                onClick={() => handleActivityTypeChange('all')}
              >
                ✕
              </button>
            </Badge>
          )}
          
          {filterOptions.dateRange.start && (
            <Badge variant="outline" className="flex gap-1 items-center">
              Date Filter
              <button 
                className="ml-1 hover:text-destructive" 
                onClick={() => setFilterOptions(prev => ({ ...prev, dateRange: {} }))}
              >
                ✕
              </button>
            </Badge>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          {resultCount} results
        </div>
      </div>

      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="rounded-md border border-border mb-4">
        <CollapsibleContent className="p-4 space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="activity-type">
              <AccordionTrigger className="py-2">Activity Type</AccordionTrigger>
              <AccordionContent>
                <ToggleGroup 
                  type="single" 
                  value={filterOptions.activityType} 
                  onValueChange={handleActivityTypeChange}
                  className="flex flex-wrap justify-start gap-2"
                >
                  <ToggleGroupItem value="all" className="rounded-md">All</ToggleGroupItem>
                  <ToggleGroupItem value="canicross" className="rounded-md">Canicross</ToggleGroupItem>
                  <ToggleGroupItem value="cani-hiking" className="rounded-md">Cani-hiking</ToggleGroupItem>
                  <ToggleGroupItem value="cani-MTB" className="rounded-md">Cani-MTB</ToggleGroupItem>
                </ToggleGroup>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="date-range">
              <AccordionTrigger className="py-2">Date Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <ToggleGroup 
                    type="single" 
                    onValueChange={handleDateRangeChange}
                    className="flex flex-wrap justify-start gap-2"
                  >
                    <ToggleGroupItem value="today" className="rounded-md">Today</ToggleGroupItem>
                    <ToggleGroupItem value="weekend" className="rounded-md">This Weekend</ToggleGroupItem>
                    <ToggleGroupItem value="next7" className="rounded-md">Next 7 days</ToggleGroupItem>
                  </ToggleGroup>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Custom Range:</p>
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="flex-1">
                        <DatePicker 
                          date={filterOptions.dateRange.start} 
                          setDate={handleStartDateChange} 
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-sm">to</span>
                      </div>
                      <div className="flex-1">
                        <DatePicker 
                          date={filterOptions.dateRange.end} 
                          setDate={handleEndDateChange}
                          className="w-full" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="location">
              <AccordionTrigger className="py-2">Location</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <ToggleGroup 
                    type="single" 
                    value={filterOptions.locationOption}
                    onValueChange={handleLocationOptionChange}
                    className="flex flex-wrap justify-start gap-2"
                  >
                    <ToggleGroupItem value="nearby" className="rounded-md">Nearby</ToggleGroupItem>
                    <ToggleGroupItem value="custom" className="rounded-md">Custom Location</ToggleGroupItem>
                  </ToggleGroup>
                  
                  {filterOptions.locationOption === 'custom' && (
                    <div className="pt-2">
                      <Input 
                        placeholder="Enter location..." 
                        value={filterOptions.customLocation || ''} 
                        onChange={handleCustomLocationChange}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="difficulty">
              <AccordionTrigger className="py-2">Difficulty Level</AccordionTrigger>
              <AccordionContent>
                <Select 
                  value={filterOptions.difficulty}
                  onValueChange={(value) => setFilterOptions(prev => ({ ...prev, difficulty: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any difficulty</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="distance">
              <AccordionTrigger className="py-2">Distance</AccordionTrigger>
              <AccordionContent>
                <Select
                  value={filterOptions.distance}
                  onValueChange={(value) => setFilterOptions(prev => ({ ...prev, distance: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any distance</SelectItem>
                    <SelectItem value="short">Short (< 5km)</SelectItem>
                    <SelectItem value="medium">Medium (5-15km)</SelectItem>
                    <SelectItem value="long">Long (> 15km)</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="elevation">
              <AccordionTrigger className="py-2">Elevation Gain</AccordionTrigger>
              <AccordionContent>
                <Select
                  value={filterOptions.elevation}
                  onValueChange={(value) => setFilterOptions(prev => ({ ...prev, elevation: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select elevation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any elevation</SelectItem>
                    <SelectItem value="low">Low (< 100m)</SelectItem>
                    <SelectItem value="medium">Medium (100-500m)</SelectItem>
                    <SelectItem value="high">High (> 500m)</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="event-type">
              <AccordionTrigger className="py-2">Event Type</AccordionTrigger>
              <AccordionContent>
                <Select
                  value={filterOptions.eventType}
                  onValueChange={(value) => setFilterOptions(prev => ({ ...prev, eventType: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any event</SelectItem>
                    <SelectItem value="training">Training Session</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                    <SelectItem value="meetup">Community Meetup</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            
            {isPremiumUser && (
              <AccordionItem value="premium-options">
                <AccordionTrigger className="py-2">Premium Options</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="show-dogs" className="text-sm">
                        Only show activities with dogs
                      </label>
                      <Switch 
                        id="show-dogs"
                        checked={filterOptions.showOnlyWithDogs}
                        onCheckedChange={(checked) => 
                          setFilterOptions(prev => ({ ...prev, showOnlyWithDogs: checked }))
                        }
                      />
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Saved Filter Sets</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Load
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Morning Run</DropdownMenuItem>
                            <DropdownMenuItem>Weekend Hikes</DropdownMenuItem>
                            <DropdownMenuItem>Competition Events</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        Save Current Filter Set
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
          
          <div className="flex justify-between pt-2 border-t">
            <Button variant="outline" onClick={handleResetFilters}>
              Reset All
            </Button>
            <Button onClick={onApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ActivityFilters;
