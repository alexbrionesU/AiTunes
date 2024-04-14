import React, { useState } from 'react';
import headphones from './headphones.png';

function App() {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  // const [inputValue, setInputValue] = useState('');
  const [showTrack, setShowTrack] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('');

  const tracks = [
    "https://open.spotify.com/track/0CTwVocVcXONwAbRxk4r24?si=7f1e35b574704251",
    "https://open.spotify.com/track/3pEuO9J2MTEmec8kUfYYvl?si=8287fe8a19ed492f",
    "https://open.spotify.com/track/65gFUBEh59KEBCznPKQnbG?si=7eb75dded8994596",
    "https://open.spotify.com/track/5bFuHlXKw66Uu2cHKn5bf8?si=5a23fba2295a401a",
    "https://open.spotify.com/track/7dQeS4ErW1iWvnKdrtKwKr?si=b1c3d7df1b6d489e",
    "https://open.spotify.com/track/11LmqTE2naFULdEP94AUBa?si=06d30cd919774c48",
    "https://open.spotify.com/track/1G391cbiT3v3Cywg8T7DM1?si=fb28b31071db44fc",
    "https://open.spotify.com/track/5Z3trOR982mBrJcPfrLUsq?si=52963b4c04164a7e",
    "https://open.spotify.com/track/5bFuHlXKw66Uu2cHKn5bf8?si=5a23fba2295a401a",
    "https://open.spotify.com/track/7dQeS4ErW1iWvnKdrtKwKr?si=b1c3d7df1b6d489e",
    "https://open.spotify.com/track/11LmqTE2naFULdEP94AUBa?si=06d30cd919774c48",
    "https://open.spotify.com/track/1G391cbiT3v3Cywg8T7DM1?si=fb28b31071db44fc",
    "https://open.spotify.com/track/5Z3trOR982mBrJcPfrLUsq?si=52963b4c04164a7e"
  ];

  const handleSubmit = async () => {
    if (!songName || !artistName) {
      alert('Please enter both a song name and an artist');
      return;
    }

    console.log('Submitting:', songName, artistName);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song_name: songName, artist: artistName })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from Flask:', data);
        
        setSelectedTrack(`https://open.spotify.com/track/${data.song_uri}`);
        setShowTrack(true);
      } else {
        console.error('HTTP error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    
    setSongName(''); // Clear the song name field
    setArtistName(''); // Clear the artist name field
  };
  // TEST URI'S 
  // 57wp7VFnV8X0pSVnYArGeJ
  // 2y4ZR0BUAVePljHSsZyIgj
  

  return (
    <div className="bg-white">
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
            <img src={headphones} alt="Headphones Icon" className="w-16 h-16" />
              <div className="text-3xl font-bold">AiTunes</div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Tune Your Mood: Discover, Connect, Play
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              is a visionary project by students at Arizona State University, designed to revolutionize the way we experience music. This AI-powered Music Recommender system is not just a tool; it's a musical companion that understands and adapts to your current vibe of music, offering a seamless journey through the world of sound. Whether you're looking to discover new tunes, connect with songs that match your current genre/song of enjoyment, or simply play your heart out, this system brings a personalized soundtrack to your life. Developed with the passion and ingenuity of ASU students, it promises a new era of musical discovery.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="https://github.com/alexbrionesU/AiTunes/blob/main/README.md"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Documentation
                </a>
                <a href="https://github.com/alexbrionesU/AiTunes" className="text-sm font-semibold leading-6 text-gray-900">
                  View on GitHub <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg md:rounded-3xl overflow-hidden bg-cyan-500 relative pb-16">
        <input 
            type="text" 
            className="mt-16 mx-16 p-4 border border-gray-400 rounded-lg w-3/4"
            value={songName} 
            onChange={(e) => setSongName(e.target.value)} 
            placeholder="Song Name"
          />
          <input 
            type="text" 
            className="mt-4 mx-16 p-4 border border-gray-400 rounded-lg w-3/4"
            value={artistName} 
            onChange={(e) => setArtistName(e.target.value)} 
            placeholder="Artist Name"
          />
  <button onClick={handleSubmit} className="absolute bottom-0 right-0 mb-4 mr-16 p-2 bg-gray-900 text-white rounded-lg">Submit</button>
  <div className="bg-cyan-500">
    <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
      <div className="max-w-2xl md:mx-0 md:max-w-none">
        <div className="overflow-hidden rounded-tl-xl bg-gray-900 md:max-w-xl lg:max-w-2xl">
          <div className="px-6 pb-14 pt-6">
            <div className="container mx-auto p-4">
              {showTrack ? (
                <iframe 
                  title="Spotify Embedded Track"
                  className="rounded-lg w-full h-[382px]"
                  style={{ height: '382px' }}
                  src={selectedTrack.replace("open.spotify.com/track", "open.spotify.com/embed/track")} 
                  frameBorder="0" 
                  allowFullScreen 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy">
                </iframe>
              ) : (
                <div className="h-[352px]"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </div>
  </div>
    // <div className="container">
    //   <img src={headphones} alt="Headphones Icon" className="headphones-icon" />
    //   <div className="title">AiTunes</div>
    //   <input 
    //     type="text" 
    //     className="input-box"
    //     value={inputValue} 
    //     onChange={(e) => setInputValue(e.target.value)} 
    //     placeholder="Give us an idea"
    //   />
    //   <button onClick={handleSubmit} className="submit-button">Submit</button>
    //   {showTrack && (
    //     <iframe 
    //       title="Spotify Embedded Track"
    //       style={{borderRadius: '12px', marginTop: '20px'}} 
    //       src={selectedTrack.replace("open.spotify.com/track", "open.spotify.com/embed/track")} 
    //       width="700px" 
    //       height="352" 
    //       frameBorder="0" 
    //       allowFullScreen 
    //       allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
    //       loading="lazy">
    //     </iframe>
    //   )}
    // </div>
  );
}


// #comments
export default App;
