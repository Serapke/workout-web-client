import * as React from "react";

type AllProps = any;

const RoutineSliderItem: React.FC<AllProps> = ({ item }) => {
  return (
    <div>
      <div>{item.title}</div>
    </div>
  );
};

export default RoutineSliderItem;
