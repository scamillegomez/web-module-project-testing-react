import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

const exampleEpisodeData = {
    airdate: "2016-07-15",
    airstamp: "2016-07-15T12:00:00+00:00",
    airtime: "",
    id: 553946,
    image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
    name: "Chapter One: The Vanishing of Will Byers",
    number: 1,
    rating: { average: 8.2 },
    runtime: 49,
    season: 1,
    summary:
      "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
    type: "regular",
    url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
  };

test("renders without error", () => {
    render(<Episode episode={exampleEpisodeData}/>);
});

test("renders the summary test passed as prop", () => {
    const { rerender } = render(<Episode episode={{}}/>);
    let episodeObject = screen.queryByTestId('episode');
    expect(episodeObject).toBeEmptyDOMElement();

    rerender(<Episode  episode={exampleEpisodeData}/>);
    episodeObject = screen.queryByTestId('episode');
    expect(episodeObject).not.toBeEmptyDOMElement();

    const epObj2 = {...exampleEpisodeData, summary: "test summary 2"}
    rerender(<Episode episode={epObj2} />);
    const epDiv2 = screen.queryByText('test summary 2');
    expect(epDiv2).toBeVisible();

    const epObj3 = {...exampleEpisodeData, summary: "test summary 3"}
    rerender(<Episode episode={epObj3} />);
    const epDiv3 = screen.queryByText('test summary 3');
    expect(epDiv3).toBeVisible();

    const epObj4 = {...exampleEpisodeData, summary: "test summary 4"}
    rerender(<Episode episode={epObj4} />);
    const epDiv4 = screen.queryByText('test summary 4');
    expect(epDiv4).toBeVisible();
});

test("renders default image when image is not defined", () => {
    render(<Episode episode={{}} />);
    let episodeImg = screen.queryByTestId('episode-image');
    expect(episodeImg.src).not.toBeNull();

});

// ----- EXAMPLE EPISODE TEST OBJECT -----



