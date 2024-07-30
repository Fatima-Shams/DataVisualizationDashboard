
import pandas as pd
from django.core.management.base import BaseCommand
from movies.models import Movie

class Command(BaseCommand):
    help = 'Load movies data from CSV file'

    def handle(self, *args, **kwargs):
        # Path to your CSV file
        csv_file_path = r'C:\Users\MY PC\Desktop\My Projects\DataVizassignment\movie_dashboard\movie_dashboard\cleaned_movies.csv'
        
        # Load the CSV file into a DataFrame
        df = pd.read_csv(csv_file_path)

        # Iterate over the DataFrame and create Movie objects
        for _, row in df.iterrows():
            movie = Movie(
                MOVIES=row['MOVIES'],
                YEAR=row['YEAR'],
                GENRE=row['GENRE'],
                RATING=row['RATING'],
                ONE_LINE=row['ONE_LINE'],
                STARS=row['STARS'],
                VOTES=row['VOTES'],
                RunTime=row['RunTime'],
                Gross=row['Gross']
            )
            movie.save()

        self.stdout.write(self.style.SUCCESS('Successfully loaded data'))
