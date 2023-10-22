import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from  "../../api/fetchShow";
jest.mock("../../api/fetchShow");

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

test('renders without errors with no props', async () => {
    render(<Display />);
 });

test('renders Show component when the button is clicked ', async () => { 
       
    render(<Display />);
    mockFetchShow.mockResolvedValueOnce(testShow);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const labelText = await screen.findByText(/select a season/i);
    expect(labelText).toBeInTheDocument();
})

test('renders show season options matching your data when the button is clicked', async () => {
    render(<Display />);
    mockFetchShow.mockResolvedValueOnce(testShow);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const optionsList = await screen.findAllByTestId('season-option');
    expect(optionsList).toHaveLength(2);
 });
