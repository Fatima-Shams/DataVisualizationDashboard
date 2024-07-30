
from django.db import models  

class Movie(models.Model):
    MOVIES = models.CharField(max_length=255)
    YEAR = models.IntegerField()
    GENRE = models.CharField(max_length=255)  
    RATING = models.FloatField()  
    ONE_LINE = models.CharField(max_length=255)  
    STARS = models.CharField(max_length=255)  
    VOTES = models.IntegerField()  
    RunTime = models.IntegerField()  
    Gross = models.IntegerField()  

    def __str__(self):
        return self.title