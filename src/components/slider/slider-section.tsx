import * as React from "react";
import Slider from "react-slick";
import RoutineSliderItem from "./slider-items/routine";
import WorkoutSliderItem from "./slider-items/workout";

import { Box, Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";

export enum ItemType {
  ROUTINE = "routine",
  WORKOUT = "workout",
}

interface OwnProps {
  title: string;
  addHref: string;
  addTitle: string;
  items: any[];
  type: ItemType;
}

const itemTypeToSliderItem = {
  routine: RoutineSliderItem,
  workout: WorkoutSliderItem,
};

const settings = {
  dots: true,
  speed: 500,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
      },
    },
  ],
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: theme.spacing(2),
    },
  })
);

const SliderSection: React.FunctionComponent<OwnProps> = ({ title, addHref, addTitle, items, type }) => {
  const classes = useStyles();
  const SliderItem = itemTypeToSliderItem[type];

  const renderItems = () => {
    if (items.length === 0) {
      return `No ${type}s found`;
    }
    return (
      <Slider {...settings}>
        {items.map((item) => (
          <SliderItem item={item} key={item.id} />
        ))}
      </Slider>
    );
  };

  return (
    <div className={classes.container}>
      <Box display="flex" justifyContent="space-between">
        <h2>{title}</h2>
        <Button color="secondary" component={Link} to={addHref} state={{ new: true }}>
          {addTitle}
        </Button>
      </Box>
      {renderItems()}
    </div>
  );
};

export default SliderSection;
