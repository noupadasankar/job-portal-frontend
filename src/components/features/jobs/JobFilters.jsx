import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const JobFilters = ({ filters, onFiltersChange, onReset }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const jobTypes = [
    { id: 'full-time', label: 'Full-time' },
    { id: 'part-time', label: 'Part-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'internship', label: 'Internship' },
  ];

  const experienceLevels = [
    { id: 'entry', label: 'Entry Level' },
    { id: 'mid', label: 'Mid Level' },
    { id: 'senior', label: 'Senior Level' },
    { id: 'lead', label: 'Lead/Principal' },
  ];

  const workplaceTypes = [
    { id: 'remote', label: 'Remote' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'onsite', label: 'On-site' },
  ];

  const handleCheckboxChange = (filterKey, value, checked) => {
    const currentValues = filters[filterKey] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onFiltersChange({ [filterKey]: newValues });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Job title, keywords..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="City, state, or country"
            value={filters.location || ''}
            onChange={(e) => onFiltersChange({ location: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      {/* Job Type */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Job Type</Label>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={filters.jobType?.includes(type.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('jobType', type.id, checked)
                }
              />
              <Label
                htmlFor={type.id}
                className="text-sm font-normal cursor-pointer"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Workplace Type */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Workplace Type</Label>
        <div className="space-y-2">
          {workplaceTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`workplace-${type.id}`}
                checked={filters.workplaceType?.includes(type.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('workplaceType', type.id, checked)
                }
              />
              <Label
                htmlFor={`workplace-${type.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Experience Level</Label>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <div key={level.id} className="flex items-center space-x-2">
              <Checkbox
                id={`exp-${level.id}`}
                checked={filters.experienceLevel?.includes(level.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('experienceLevel', level.id, checked)
                }
              />
              <Label
                htmlFor={`exp-${level.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {level.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">
          Salary Range (USD)
        </Label>
        <div className="space-y-4">
          <Slider
            value={filters.salaryRange || [0, 200000]}
            onValueChange={(value) => onFiltersChange({ salaryRange: value })}
            min={0}
            max={300000}
            step={10000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${(filters.salaryRange?.[0] || 0).toLocaleString()}</span>
            <span>${(filters.salaryRange?.[1] || 200000).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Date Posted */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Date Posted</Label>
        <Select
          value={filters.postedDate || 'any'}
          onValueChange={(value) => onFiltersChange({ postedDate: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any time</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="3d">Last 3 days</SelectItem>
            <SelectItem value="7d">Last week</SelectItem>
            <SelectItem value="30d">Last month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="w-full" onClick={onReset}>
        <X className="w-4 h-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <Card className="glass sticky top-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg"
          onClick={() => setShowMobileFilters(true)}
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters
          {Object.values(filters).filter(Boolean).length > 0 && (
            <Badge className="ml-2" variant="destructive">
              {Object.values(filters).filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default JobFilters;
