import React, { useRef } from "react";
import RowSlider from "./RowSlider";

export interface Feature {
  id: string;
  label: string;
  description: string;
  timeBack: number;
  timeFront: number;
  color: string;

  previews: string;
  tags: string[];

  sectionId: number;
}
export interface Section {
  id: number;
  name: string;
  description: string;
  features: Feature[];
}

interface ListProps {
  sections: Section[];
}

export default function ItemList({ sections }: ListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="flex-grow overflow-y-auto">
      {sections?.map((section,index) => {
        
        const categoryRef = React.createRef<HTMLDivElement>();

        return (
          <RowSlider categoryRef={categoryRef} section={section} key={index}/>
        );
      })}
    </div>
  );
}
