"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slider as RadixSlider, SliderTrack, SliderRange, SliderThumb } from "@radix-ui/react-slider";

interface SliderProps {
  defaultValue?: number[];
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

const Slider: React.FC<SliderProps> = ({ defaultValue = [0], max = 100, step = 1, onValueChange }) => {
  return (
    <RadixSlider
      className="relative flex items-center select-none touch-none w-full h-5"
      defaultValue={defaultValue}
      max={max}
      step={step}
      onValueChange={onValueChange}
    >
      <SliderTrack className="bg-gray-200 relative flex-grow rounded-full h-1">
        <SliderRange className="absolute bg-green-500 rounded-full h-full" />
      </SliderTrack>
      <SliderThumb className="block w-5 h-5 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" />
    </RadixSlider>
  );
};

export { Slider };
