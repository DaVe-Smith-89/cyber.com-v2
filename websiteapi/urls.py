from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import *

urlpatterns = [
    path('user/', UserApiView.as_view(), name='accountApi'),
    path('lessons/', LessonsApiView.as_view(), name='lessonsApi'),
    path('lessons/<int:primary_key>', LessonApiView.as_view(), name='lessonApi'),
    path('posts/', PostsApiView.as_view(), name='postsApi'),
    path('posts/<int:primary_key>', PostApiView.as_view(), name='post'),
    path('tools/', ToolsApiView.as_view(), name='toolsApi'),
    path('tools/<int:primary_key>', ToolApiView.as_view(), name='toolApi'),
    path('technews/', TechNewsView.as_view(), name='technewsApi'),
    path('ehi/', EhiApiView.as_view(), name='ehiApi'),
]

format_suffix_patterns(urlpatterns)
