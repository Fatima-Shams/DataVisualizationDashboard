# # views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from movies.models import Movie
from movies.serializers import MovieSerializer

class MovieViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['get'], url_path='top-gross-movies/(?P<year>[0-9]{4})')
    def top_gross_movies(self, request, year=None):
        movies = Movie.objects.filter(year=year).order_by('-gross')[:5]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='top-voted-movies')
    def top_voted_movies(self, request):
        movies = Movie.objects.order_by('-votes')[:5]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='top-rated-movies/(?P<year>[0-9]{4})')
    def top_rated_movies(self, request, year=None):
        movies = Movie.objects.filter(year=year).order_by('-rating')[:10]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    

    @action(detail=False, methods=['get'], url_path='available-years')
    def available_years(self, request):
        years = Movie.objects.values_list('year', flat=True).distinct().order_by('year')
        return Response(years)
