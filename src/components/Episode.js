import React from 'react';

const Episode = (props) => {
  const { episode } = props;
  const { id, image, name, season, number, summary, runtime } = episode;
  const imgsrc = image || 'https://i.ibb.co/2FsfXqM/stranger-things.png';

  console.log("episode: ", episode);

  return (
    <div className="episode" data-testid="episode-list-item" key={id} >
      <img className="episode-image" src={imgsrc} alt={imgsrc} data-testid="episode-image"/>
      <div className="episode-info">
        <p className="episode-number">Season {season}, Episode {number}</p>
        <h3 data-testid="episode">{name}</h3>
        <p>{summary}</p>
        <div className="flex-spacer" />
        <p className="episode-runtime">{runtime} minutes</p>
      </div>
    </div>
  )
}

export default Episode;
