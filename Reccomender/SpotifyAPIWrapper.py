import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.exceptions import SpotifyException
import pandas as pd
import sys
import time
from datetime import timedelta
from spotipy.oauth2 import SpotifyOAuth

GLOBAL_CLIENT_ID = '45bccfc1fe70457dbce6335a5572ee7d'
GLOBAL_CLIENT_SECRET = '7aeb2ef5e07440528b92d17b512afddf'

spotify = None

class SpotifyAPIWrapper:
    def __init__(self):
        authenticator = Authenticator(GLOBAL_CLIENT_ID, GLOBAL_CLIENT_SECRET)
        self.spotify = authenticator.doAuth()

    def getUsersPlaylists(self,username):

        playlists = self.spotify.user_playlists(username)
        playlist_uris = []
        playlist_names = []

        for playlist in playlists['items']:
            playlist_names.append(playlist['name'])
            playlist_uris.append(playlist['uri'].split(':')[2])

        return pd.DataFrame({'name': playlist_names, 'uris': playlist_uris}, columns=['name', 'uris'])

        

    def getName(self, tracks, song_list):
        '''
        
        returns a list of trakcs with 
        song_name, uri, genres, artist_name

        Where the genres are the genres that artist caters towards
        
        '''
        track_data = []
        for i, item in enumerate(tracks['items']):
                
            track = item['track']
            song_name = track['name']
            uri = track['uri']
            artist_name = track['artists'][0]['name']
            result = self.spotify.search(artist_name)
            track = result['tracks']['items'][0]
            artist = self.spotify.artist(track["artists"][0]["external_urls"]["spotify"])
            genres = artist["genres"]
            track_data.append((song_name, uri.split(':')[2], genres, artist_name))

        return track_data

    def getSongsFromPlaylist(self, uri, username, name=""):

        song_list = []
        results = self.spotify.user_playlist(username, uri)
        tracks = results['tracks']
        song_list.extend(self.getName(tracks, song_list))

        while(tracks['next']):
            tracks = self.spotify.next(tracks)
            song_list.extend(self.getName(tracks, song_list))

        song_names = [tuple[0] for tuple in song_list]
        uris = [tuple[1] for tuple in song_list]
        genres = [tuple[2] for tuple in song_list]
        artists = [tuple[3] for tuple in song_list]

        return pd.DataFrame(data={'name':song_names, 'uri':uris, 'genres':genres, 'artists':artists})

    def getFeatures(self, songsDF):
        names = []
        danceability = []
        energy = []
        acousticness = []
        danceability = []
        energy = []
        instrumentalness = []
        liveness = []
        loudness = []
        speechiness = []
        tempo = []
        valence = []


        for _, row in songsDF.iterrows():
            uri = row['uri']
            if(not isinstance(uri,str)):
                continue
            name = row['name']
            features = self.spotify.audio_features(uri)
            if features != [None]:
                names.append(name)
                acousticness.append(features[0]['acousticness'])
                danceability.append(features[0]['danceability'])
                energy.append(features[0]['energy'])
                instrumentalness.append(features[0]['instrumentalness'])
                liveness.append(features[0]['liveness'])
                loudness.append(features[0]['loudness'])
                speechiness.append(features[0]['speechiness'])
                tempo.append(features[0]['tempo'])
                valence.append(features[0]['valence'])
        


        data = {
            'name' : names,
            'acousticness' : acousticness,
            'danceability' : danceability,
            'energy' : energy,
            'instrumentalness' : instrumentalness,
            'liveness' : liveness,
            'loudness' : loudness,
            'speechiness' : speechiness,
            'tempo': tempo,
            'valence' : valence
        }

        return pd.DataFrame(data)

class Authenticator:
    def __init__(self, client_id, client_secret):
        self.CLIENT_ID = client_id
        self.CLIENT_SECRET = client_secret
    
    def doAuth(self):
        credentialManager = SpotifyClientCredentials(client_id=self.CLIENT_ID, client_secret=self.CLIENT_SECRET)
        spotify = spotipy.Spotify(client_credentials_manager=credentialManager)
        return spotify
