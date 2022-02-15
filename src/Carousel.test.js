import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it('it renders without crashing', () => {
  render(<Carousel />)
})

// snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


it('works when you click the left arrow on the second image', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />)

  // move forward in the carousel
  fireEvent.click(queryByTestId("right-arrow"));

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();


  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the third
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
})

it('hides left arrow on first image, shows second', () => {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");

  // expect first image to not show left arrow
  expect(leftArrow).toHaveClass("hidden");

  // expect second image to have left arrow
  fireEvent.click(queryByTestId("right-arrow"));
  expect(leftArrow).not.toHaveClass("hidden");

})

it('hides right arrow on last image, shows on first', () => {
  const { queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");

  // expect first image to  show right arrow
  expect(rightArrow).not.toHaveClass("hidden");

  // expect last image to hide right arrow
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(rightArrow).toHaveClass("hidden");
})