import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Routine } from "../../../../store/types";

type OwnProps = RouteComponentProps & {
  item: Routine;
};

const RoutineSliderItem: React.FC<OwnProps> = ({ item }) => {
  return (
    <div>
      <div>{item.title}</div>
    </div>
  );
};

export default withRouter(RoutineSliderItem);
