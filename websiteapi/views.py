from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AccountSerializer, EhiSerializer, LessonSerializer, PostSerializer, ToolSerializer, TechNewsSerializer, RecaptchaSerializer
from main.models import Account, Ehi, Lesson, Post, Tool, TechNews
from datetime import datetime
from django.views import View
from django.http import JsonResponse
from django.http.request import QueryDict
from django.shortcuts import redirect
from requests import get

# Account.objects.get(id=2).socialaccount_set.all()[0].extra_data['picture']

class UserApiView(APIView):
    serializer_class = AccountSerializer
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = Account.objects.get(email=request.user.email)
            serializer = AccountSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = Account.objects.get(email=request.user.email)
            serializer = AccountSerializer(instance=user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class LessonsApiView(APIView):
    serializer_class = LessonSerializer
    def get(self, request, *args, **kwargs):
        lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LessonApiView(APIView):
    serializer_class = LessonSerializer
    def get(self, request, primary_key, *args, **kwargs):
        lesson = get_object_or_404(Lesson, id=primary_key)
        serializer = LessonSerializer(lesson, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostsApiView(APIView):
    serializer_class = PostSerializer
    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            data = dict(request.data)
            serializer = RecaptchaSerializer(data=request.data, many=False)
            if serializer.is_valid():
                if data['image']:
                    image = data['image']
                else:
                    image = ''
                post = Post(title=data['title'], image=image, description=data['description'], content=data['content'], author=request.user)
                try:
                    post.save()
                    return Response(data, status=status.HTTP_201_CREATED)
                except:
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class PostApiView(APIView):
    serializer_class = PostSerializer
    def get(self, request, primary_key, *args, **kwargs):
        post = get_object_or_404(Post, id=primary_key)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, primary_key, *args, **kwargs):
        if request.user.is_authenticated:
            post = get_object_or_404(Post, id=primary_key)
            if request.user.id == post.author.id:
                request.data['author'] = request.user.id
                serializer = PostSerializer(instance=post, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, primary_key, *args, **kwargs):
        if request.user.is_authenticated:
            post = get_object_or_404(Post, id=primary_key)
            if request.user.id == post.author.id:
                post.delete()
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class ToolsApiView(APIView):
    serializer_class = ToolSerializer
    def get(self, request, *args, **kwargs):
        tools = Tool.objects.all()
        serializer = ToolSerializer(tools, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            request.data['author'] = request.user.id
            serializer = ToolSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class ToolApiView(APIView):
    serializer_class = ToolSerializer
    def get(self, request, primary_key, *args, **kwargs):
        tool = get_object_or_404(Tool, id=primary_key)
        serializer = ToolSerializer(tool, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, primary_key, *args, **kwargs):
        if request.user.is_authenticated:
            tool = get_object_or_404(Tool, id=primary_key)
            if request.user.id == tool.author.id:
                request.data['author'] = request.user.id
                serializer = ToolSerializer(instance=tool, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class TechNewsView(APIView):
    serializer_class = TechNewsSerializer
    def get(self, request, *args, **kwargs):
        news = get_object_or_404(TechNews, source='techcrunch')
        return Response(eval(news.data), status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):
        if request.data.get('data') == 'kariponnaya':
            techcrunchdata = get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e4158e76f9b04f0293995be6328537fa').json()
            ns = TechNews.objects.filter(source='techcrunch')
            if ns:
                technews = TechNews.objects.get(source='techcrunch')
                technews.data = techcrunchdata
                technews.save()
            else:
                news = TechNews(source='techcrunch', data=str(techcrunchdata))
                news.save()
            return Response(techcrunchdata, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

class EhiApiView(APIView):
    serializer_class = Ehi
    def get(self, request, *args, **kwargs):
        ehis = Ehi.objects.all()
        serializer = EhiSerializer(ehis, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


