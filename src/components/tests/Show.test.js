import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Show from './../Show';

const testShow = {
    name: 'testShow',
    summary: 'this is a test show',
    seasons: [
        {id: '01', 
        name: 'test season 1',
        episodes: []    
        },
        {id: '02', 
        name: 'test season 2',
        episodes: [
           { airdate: "2017-10-27",
            airstamp: "2017-10-27T12:00:00+00:00",
            airtime:"",
            id:909345,
            image:"https://static.tvmaze.com/uploads/images/medium_landscape/342/855799.jpg",
            name:"Chapter Five: Dig Dug",
            number: 5,
            rating:{average: 8.2},
            runtime:58,
            season:2,
            summary:"Jim is trapped in the Upside Down, and Joyce enlists Bob to help find him. Meanwhile, Nancy and Jonathan go to Murray, and El learns about the circumstances surrounding her birth.",
            type:"regular",
            url:"https://www.tvmaze.com/episodes/909345/stranger-things-2x05-chapter-five-dig-dug"
           }
        ]
    }
]
}

test('renders without errors', () => {
    render(<Show show={testShow} selectedSeason={"none"}/>);
 });

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={'none'}/>);
    const value = screen.queryByText(/fetching data/i);
    expect(value).not.toBeNull();
 });

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testShow} selectedSeason={"none"}/>);
    const seasons = screen.queryAllByTestId('season-option');
    expect(seasons).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn(()=>{});

    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect}/>);
    const selectEl = screen.getByTestId('select-list');
    fireEvent.change(selectEl, { target: { value: 'test season 1' } });
    expect(handleSelect).toHaveBeenCalledTimes(1);
 });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show={testShow} selectedSeason={"none"} />);
    const epComp = screen.queryAllByTestId('episode');
    expect(epComp).toHaveLength(0);

    rerender(<Show show={testShow} selectedSeason={1} />);
    const epComp2 = screen.queryAllByTestId('episode-list-item');
    expect(epComp2).toHaveLength(1);
});
