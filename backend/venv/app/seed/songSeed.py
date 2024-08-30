# app/seed/songSeed.py

import click
from flask.cli import with_appcontext
from app.models import Song, db

@click.command("seed-songs")
@with_appcontext
def seed_songs():
    """Seed the database with initial song data."""
    songs = [
        # {
        #     'title': 'AwayInAManager',
        #     'artist': 'Artist Name',
        #     'album': 'Album Name',
        #     'file_path': "songsList/AwayInAManager.mp3",
        #     'lyrics':'sdfsfdsfrefdsferfdferfdsf'
        # },
        {
            'title': 'தென் கிழக்கு',
            'artist': 'மலர் மீகா',
            'album': 'வாழை',
            'file_path': 'songsList/ThenKizhakku.mp3',
            'lyrics':'பெண் : தேன்கிழக்கு தான் சிட்டு செம்பருத்தி பூ மொட்டு செல்லம் கொஞ்சுதே தாழாத்தா\nவிசில் : ........... யில் அடிக்கும் நாள் வரைக்கும் கூட புடிப்பேன் உன் தாயாக\nபெண் : நீ சொல்லும் கதை நான் நான் கேட்கும் வர நாம் ஆவோம் மாய பறைவாகலே\nபெண் : தேன்கிழக்கு தேன் சிட்டு செம்பருத்தி பூ மொத்து செல்லம் கொஞ்சுதே தாலாட்ட\nவிசிலடித்தல் : ………… ira kolam Solleduthu veesatho unna ரசிச்சு\nபெண் : தெரிஞ்சே நீ செய்யும் சேட்டை தெளிவாக உன்ன காட்ட அடில் கொடி ராகம் நானும் சந்தித்த\nபெண் : தெருவெங்கும் தேற ஓட்ட மரமெல்லாம் ஊஞ்சல் ஆட்ட பெருகாதோ காலம் வேகம் கூட்ட\nபெண் : பனக்கருக்கும் பால் சுரக்கும் நீ வாழ வேண்டும் அந்தே நீ கூத்தாடு\nஆண் : ஹம்மிங்…. \nபெண் : பனக்கருக்கும் பால் சுரக்கும் அதா நினைவே நீ கொண்டாடு பசி மறக்கும் நாள் பிறக்கும்\nபெண் : பனக்கருக்கும் (நீ நீ சொல்லும் கதை) பால் சுரக்கும் (நான் கேட்கும் வரை நீ) க்கும் (நீ நீ சொல்லும் கதை) நாள் பிறக்கும் (நான் கேட்கும் வரை)\nவாலி மறந்தே நீ கூத்தாடு (நாம் ஆவோம் மாய பறவைகளே)\nபெண் : பணக்கருக்கும் பால் சுரக்கும் வாலி மறந்தே நீ கூத்தாடு'
        },
        {
            'title': 'ஆனா ஊனா',
            'artist': 'மலர் மீகா',
            'album': 'ஆனா ஊனா',
            'file_path': 'songsList/AanaOona.mp3',
            'lyrics':'Aana oona naana nee\nNaan nee naan\nAana oona naana nee\nNaan nee naan\nHey raama chaama chutti poo\nChutti konjam seekirama\nRendum kandum ippodhaan\nKottum pottum paarththidu\nAana oona naana nee\nNaan nee naan\nAana oona naana nee\nNaan nee naan\nVaruma varumaa venumaa venumaa\nAadi paadi thelivaa\nOodi vaadi palithaa\nAana oona naana nee\nNaan nee naan\nAana oona naana nee\nNaan nee naan\nKattipudi kutti paapa\nAda adi vaal kuththarukka\nPaava kutti paakipidi\nPala pala pala pala vaaththikidichu\nThathu kutti kudu kudu\nKuthththithaan aadipidu\nAana oona naana nee\nNaan nee naan\nAana oona naana nee\nNaan nee naan'
        },
        {
        "title": "தங்கலான்",
        "artist": "அனிருத்",
        "album": "தங்கலான்",
        "file_path": "songsList/MinikkiMinikki.mp3",
        "lyrics": "பெண் : அன்னக்கிளி\nகோரஸ் : ஆஆஆ…. அன்னக்கிளி\nபெண் : அன்னகிளி\nகோரஸ் : அன்னகிளி\nபெண் : சாஞ்ஜாதுர\nகோரஸ் : சாயாகிலி\nபெண் : அண்ணனாட மின்னலிடா\nமுன் வந்தாளே\nபுது வேகம் வந்து\nமாமன் இப்போ சொக்கி நின்னானே\n\nகோரஸ் : மினிக்கி மினிக்கி\nமேனா மினிக்கி\nமினுக்க நடந்த திண்ணகூட\nசிலுப்பி சிலுப்பி ஜிகுனா சிலுப்பி சிலுக்கா\nஜொலிச்சா தின்னகூடா\n\nFemale : Paalathu thanni ippo\nChorus : Pavusaa jolikkudhu\nFemale : Paasangu paarvaiyila\nChorus : Iyira kulikkudhu\n\nFemale : Kaathottam pannura maman\nThalappaa neliyudhu\nThavulondu thandhidalaanu\nThazhunbu kozhaiyudhu\n\nFemale : Peranangu ippo vandhaa munnaala\nPeyaaduthu kannnu edhukku thannaala\nChorus : Piththam pudhichi ippo vandhaane pinnaala\n\nபெண் : ஹே ஹே ஹே ஹே\nஹே ஹே ஹே ஹே\n\nகோரஸ் : மினிக்கி மினிக்கி\nமேனா மினிக்கி\nமினுக்க நடந்த திண்ணகூட\nசிலுப்பி சிலுப்பி ஜிகுனா சிலுப்பி சிலுக்கா\nஜொலிச்சா தின்னகூடா\n\nபெண் : ஹே ஹே ஹே ஹே\nஹே ஹே ஹே ஹே\n\nFemale : Anjaaru jalldda kannu\nChorus : Jalichu sirikkudhu\nFemale : Aadu maadu thalli ninnu\nChorus : Thegachi moraikkudhu\nFemale : Solakaattu bomma yellam\nChorus : Sokka thiriyudhu\n\nFemale : Sokka potta akka paathu\nKaka meraludhu\nKumbal koodum megam\nMazhaya peyyadho\n\nபெண் : கட்டி வச்ச சோகம்\nகரைஞ்சி போவதோ\n\nChorus : Kottum panaiyaa\nVandhu kondaadu kondaadu\n\nகோரஸ் : மினிக்கி மினிக்கி\nமேனா மினிக்கி\nமினுக்க நடந்த திண்ணகூட\nசிலுப்பி சிலுப்பி ஜிகுனா சிலுப்பி சிலுக்கா\nஜொலிச்சா தின்னகூடா\n\nபெண் : ஹே ஹே ஹே ஹே\nஹே ஹே ஹே ஹே\n\nபெண் : அன்னக்கிளி\nகோரஸ் : ஆஆஆ…. அன்னக்கிளி\nபெண் : அன்னக்கிளி\nகோரஸ் : அன்னக்கிளி\nபெண் : சாஞ்சதுர\nகோரஸ் : சாயாகிலி\nபெண் : அண்ணனாட மின்னலிடா\nமுன் வந்தாளே புது வேகம் வந்து\nமாமன் இப்போ சொக்கி நின்னானே\nகோரஸ் : ஹம்மிங்"
        }

    ]

    for song_data in songs:
        song = Song(
            title=song_data['title'],
            artist=song_data['artist'],
            album=song_data['album'],
            file_path=song_data['file_path'],
            lyrics=song_data['lyrics']
        )
        db.session.add(song)

    db.session.commit()
    print("Database seeded!")
